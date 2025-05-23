"use client";
import { useCanvasStore, useLoadingStore, useSocketStore } from "@repo/store";
import Navbar from "../../../components/Navbar";
import Card from "../../../components/Card";
import { Plus, LogIn } from "lucide-react";
import Document from "../../../components/Document";
import { useEffect, useState } from "react";
import PopupModel from "../../../components/PopupModel";
import { api } from "@repo/utils/api";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { timeAgo } from "../../../utils/timeAgo";
import Loading from "../../../components/Loading";

interface documentType {
  id: string;
  ownerId: string;
  slug: string;
  owner: {
    id: string;
    name: string;
  };
  members: {
    id: string;
    role: string;
    user: {
      id: string;
      name: string;
      image: string;
    };
  }[];
  createdAt: string;
}
export default function Dashboard() {
  const { setError, loading, setLoading } = useLoadingStore();
  const { connectToSocket } = useSocketStore();

  const router = useRouter();
  const {
    createDocument,
    documentID,
    setDocumentID,
    deleteDocument,
    renameDocument,
  } = useCanvasStore();
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<"create" | "join" | "none">("create");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [inputText, setInputText] = useState("");
  const [documents, setDocuments] = useState<documentType[]>();
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    const fetchDoc = async () => {
      try {
        setLoading(true);
        const res = await api.get("/documents");

        if (res.data.success === false) {
          setError("Internal server error");
          setLoading(false);
          return;
        }
        setDocuments(res.data.documents);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Internal server error");
      }
    };
    fetchDoc();
  }, []);
  useEffect(() => {
    if (loading === false) {
      setIsOpen(false);
    }
  }, [loading]);

  const openPopup = (type: "create" | "join") => {
    setIsOpen(true);
    if (type === "create") {
      setType("create");
      setTitle("Create New Drawing");
      setSubTitle("Enter a title for your new drawing.");
    } else if (type === "join") {
      setType("join");
      setTitle("Join Shared Drawing");
      setSubTitle("Enter the room ID to join a shared drawing session.");
    }
    setInputText("");
  };

  const handleOnConfirm = async () => {
    if (type === "create") {
      if (!inputText) {
        setError("Document name cannot be empty");
        setInputText("");
        return;
      }
      if (inputText.length > 20) {
        setError("Document name cannot be more than 20 characters");
        setInputText("");
        return;
      }
      createDocument(inputText).then((id) => {
        if (id) {
          setDocumentID(id);
          router.push(`/document/${id}`);
        } else {
          setError("Document creation failed");
        }
      });
    } else if (type === "join") {
      if (inputText.length !== 25) {
        setError("Invalid document ID");
        setInputText("");
        return;
      }
      router.push(`/document/${inputText}`);
    }
  };
  const handleDocumentClick = (documentId: string) => {
    router.push(`/document/${documentId}`);
  };

  const handleRenameDocument = async (documentId: string, newName: string) => {
    console.log("Renaming document", documentId, "to", newName);
    if (!newName) {
      setError("Document name cannot be empty");
      return;
    }
    if (newName.length > 20) {
      setError("Document name cannot be more than 20 characters");
      return;
    }

    try {
      await renameDocument(documentId, newName);
      setDocuments((prev) => {
        return prev?.map((doc) =>
          doc.id === documentId ? { ...doc, slug: newName } : doc
        );
      });
    } catch (error: any) {
      console.log(error);
    }
  };
  const handleDeleteDocument = async (documentId: string) => {
    console.log("Deleting document", documentId);
    try {
      await deleteDocument(documentId);
      setDocuments((prev) => {
        return prev?.filter((doc) => doc.id !== documentId);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-[#101217] flex flex-col gap-10 w-full min-h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center md:flex-row m-10 gap-7">
        <Card
          CardIcon={Plus}
          title="Start a New Drawing"
          onClick={() => openPopup("create")}
        />
        <Card
          CardIcon={LogIn}
          title="Join Shared Drawing"
          onClick={() => openPopup("join")}
        />
      </div>
      <div className="flex flex-col justify-center items-center mx-20 overflow-visible">
        <div className="w-full bg-[#1A1F2B] text-white uppercase flex justify-between items-center p-4 rounded-t-xl">
          <h1 className="flex-4">Name</h1>
          <h1 className="flex-2 text-center">Created</h1>
          <h1 className="flex-1 text-center">Author</h1>
          <h1 className="flex-2 text-right">MEMBERS</h1>
          <h1 className="flex-1 text-right"></h1>
        </div>
        <div className="flex flex-col justify-between items-center w-full rounded-b-xl">
          {loading && <Loading />}

          {documents && documents.length === 0 && (
            <h1 className="text-white text-2xl mt-10">No documents found</h1>
          )}
          {documents?.map((document) => (
            <Document
              key={document.id}
              documentId={document.id}
              name={document.slug}
              created={timeAgo(document.createdAt)}
              author={document.owner.name}
              members={document.members}
              onClick={() => {
                handleDocumentClick(document.id);
              }}
              onRename={handleRenameDocument}
              onDelete={handleDeleteDocument}
            />
          ))}
        </div>
      </div>
      <PopupModel
        isOpen={isOpen}
        title={title}
        subTitle={subTitle}
        setInputText={setInputText}
        inputText={inputText}
        mode={type}
        onClose={() => setIsOpen(false)}
        onConfirm={handleOnConfirm}
      />
    </div>
  );
}
