"use client";
import { useUserStore, useCanvasStore, useLoadingStore } from "@repo/store";
import Navbar from "../../../components/Navbar";
import Card from "../../../components/Card";
import { Plus, Users, LogIn } from "lucide-react";
import Document from "../../../components/Document";
import { JSX, use, useEffect, useState } from "react";
import PopupModel from "../../../components/PopupModel";
import { api } from "@repo/utils/api";
import { redirect } from "next/navigation";
import { checkDocumentAccess } from "../../../utils/checkDocumentAccess";

const documents = [
  {
    id: "1asd",
    name: "Untitled Document",
    createdAt: "2 minutes ago",
    members: [
      { id: "1", name: "You", color: "#22c55e" },
      { id: "2", name: "John Doe", color: "#3b82f6" },
    ],
  },
  {
    id: "fefe2",
    name: "Project Wireframes",
    createdAt: "2 days ago",
    members: [{ id: "1", name: "You", color: "#8b5cf6" }],
  },
  {
    id: "2asfnme3",
    name: "Project Wireframes",
    createdAt: "2 days ago",
    members: [{ id: "1", name: "You", color: "#8b5cf6" }],
  },
];

export default function Dashboard() {
  const { setUser, user } = useUserStore();
  const {setError} = useLoadingStore();

  const { loading } = useLoadingStore();
  const { createDocument, documentID, setDocumentID } = useCanvasStore();
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<"create" | "collaborate" | "join" | "none">(
    "create"
  );
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    document.body.style.overflowX = "hidden";
  }, []);
  useEffect(() => {
    if (loading === false) {
      setIsOpen(false);
    }
  }, [loading]);

  useEffect(() => {
    if (documentID) {
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
          {documents.map((document) => (
            <Document
              key={document.id}
              name={document.name}
              created={document.createdAt}
              author="John Doe"
              members={document.members}
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
