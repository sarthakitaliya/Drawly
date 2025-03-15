import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    name?: string;
    email?: string;
    image?: string;
    accessToken?: string;
  }
  interface Session {
    user: {
      id?: string;
      email?: string;
      name?: string;
      image?: string;
      token?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    image?: string;
    email?: string;
    name?: string;
    picture?: string;
    accessToken?: string
  }
}
