"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SiExcalidraw } from "react-icons/si";

export default function SigninPage() {
  const { data: session, status } = useSession();
  if (status == "loading") return <h1>Loading...</h1>;
  if (session) {
    redirect("/dashboard")
  }
  return (
    <div className="w-full h-full bg-linear-to-r from-[#f0f7ff] to-[#cee5ff] flex flex-col justify-center items-center">
      <div className="shadow-2xl m-5 sm:w-xl h-2/4 bg-white rounded-2xl flex items-center justify-center">
        <div className="flex flex-col items-center justify-center h-full w-full p-5 gap-10">
          <div className="text-center">
            <h1 className="sm:text-4xl text-2xl gap-2 flex items-center justify-center">Welcome to Drawly <SiExcalidraw style={{color: "blue"}}/></h1>
            <p className="text-sm text-gray-600 mt-2">Sign in to start creating and collaborating</p>
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="cursor-pointer border rounded-md px-12 py-3 flex items-center justify-center text-gray-700 font-medium hover:bg-gray-50 border-gray-300"
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>
          <div className="text-sm text-gray-600 text-center">
            <p>By signing in, you agree to our</p>
            <div>
            <Link href="#" className="text-blue-600 hover:text-blue-800">Terms of Service </Link>
            {' & '}
            <Link href="#" className="text-blue-600 hover:text-blue-800">Privacy Policy</Link>
            </div>
          </div>
        </div>
        
      </div>
      <footer className="mx-auto px-4 py-6 text-center text-gray-600 text-sm">
        <p>© 2025 Drawly. All rights reserved.</p>
      </footer>
    </div>
  );
}
