"use client";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useLoadingStore } from "@repo/store";

const ErrorHandler = () => {
  const { error, setError } = useLoadingStore();

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "bottom-right", duration: 4000 });
      setTimeout(() => setError(null), 4000);
    }
  }, [error, setError]);

  return null;
};

export default ErrorHandler;