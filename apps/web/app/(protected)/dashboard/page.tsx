"use client";
import { useUserStore, useCanvasStore, useLoadingStore } from "@repo/store";
import Navbar from "../../../components/Navbar";
import Card from "../../../components/Card";
import { Plus, Users, LogIn } from "lucide-react";
import Document from "../../../components/Document";
import { useEffect, useState } from "react";
import PopupModel from "../../../components/PopupModel";
import { api } from "@repo/utils/api";
import { redirect } from "next/navigation";
import { timeAgo } from "../../../utils/timeAgo";
import { getToken } from "next-auth/jwt";

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
    name: string;
  }[];
  createdAt: string;
}
export default function Dashboard() {
  const { setUser, user } = useUserStore();
  const { setError, loading, setLoading, error } = useLoadingStore();
  const { createDocument, documentID, setDocumentID } = useCanvasStore();
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<"create" | "collaborate" | "join" | "none">(
    "create"
  );
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

  useEffect(() => {
    if (documentID && documentID !== "dashboard") {
      redirect(`/document/${documentID}`);
    }
  }, [documentID]);

  const openPopup = (type: "create" | "collaborate" | "join") => {
    setIsOpen(true);
    if (type === "create") {
      setType("create");
      setTitle("Create New Drawing");
      setSubTitle("Enter a title for your new drawing.");
    } else if (type === "collaborate") {
      setType("collaborate");
      setTitle("Start a Collaborative Drawing");
      setSubTitle("Create a document that others can join.");
    } else if (type === "join") {
      setType("join");
      setTitle("Join Shared Drawing");
      setSubTitle("Enter the room ID to join a shared drawing session.");
    }
    setInputText("");
  };

  const handleOnConfirm = async () => {
    if (type === "create") {
      createDocument(inputText);
    } else if (type === "collaborate") {
      console.log("Collaborate Document");
    } else if (type === "join") {
      console.log("Join Document");
    }
  };
  return (
    <div className="bg-[#101217] flex flex-col gap-10 w-full min-h-screen">
      <Navbar />
      <div className="flex flex-col justify-between items-center md:flex-row m-20 gap-7">
        <Card
          CardIcon={Plus}
          title="Start a New Drawing"
          onClick={() => openPopup("create")}
        />
        <Card
          CardIcon={Users}
          title="Start a Collaborative Drawing"
          onClick={() => openPopup("collaborate")}
        />
        <Card
          CardIcon={LogIn}
          title="Join Shared Drawing"
          onClick={() => openPopup("join")}
        />
      </div>
      <div className="flex flex-col justify-center items-center mx-20">
        <div className="w-[80vw] bg-[#1A1F2B] text-white uppercase flex justify-between items-center p-4 rounded-t-xl">
          <h1 className="flex-4">Name</h1>
          <h1 className="flex-2 text-center">Created</h1>
          <h1 className="flex-1 text-center">Author</h1>
          <h1 className="flex-2 text-right">MEMBERS</h1>
        </div>
        <div className="flex flex-col justify-between items-center">
          {error && (
            <h1 className="text-white text-2xl mt-10">{error}</h1>
          )}
          {loading && (
            <h1 className="text-white text-2xl mt-10">Loading...</h1>
          )}

          {documents && documents.length === 0 && (
            <h1 className="text-white text-2xl mt-10">No documents found</h1>
          )}
          {documents?.map((document) => (
            <Document
              key={document.id}
              name={document.slug}
              created={timeAgo(document.createdAt)}
              author={document.owner.name}
              members={document.members}
              onClick={() => {
                setDocumentID(document.id);
              }}
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
