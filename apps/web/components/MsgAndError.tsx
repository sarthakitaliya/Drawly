"use client";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useLoadingStore } from "@repo/store";

const MsgAndError = () => {
  const { error, setError, msg, setMsg } = useLoadingStore();

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "bottom-right", duration: 4000 });
      setTimeout(() => setError(null), 4000);
    }
    if (msg) {
      toast.success(msg, { position: "bottom-right", duration: 4000 });
      setTimeout(() => setMsg(null), 4000);
    }
  }, [error, setError, msg, setMsg]);

  return null;
};

export default MsgAndError;