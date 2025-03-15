import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth/";
import GoogleProvider from "next-auth/providers/google";
import { prismaClient } from "@repo/db/client";
import jwt from "jsonwebtoken";

export const authOption: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt", // Or "database" if you prefer session storage in DB
    maxAge: 7 * 24 * 60 * 60, // 7 days (adjust as needed)
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;

        //custom JWT token
        token.accessToken = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET as string
        );

      }

      let existingUser = await prismaClient.user.findUnique({
        where: {
          //@ts-ignore
          email: token.email,
        },
      });

      if (!existingUser) {
        existingUser = await prismaClient.user.create({
          data: {
            //@ts-ignore
            email: token.email,
            name: token.name,
            image: token.picture,
          },
        });
      }
      token.id = existingUser.id;

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.picture;
        session.user.token = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
  secret: process.env.NEXTAUTH_SECRET || "THESECRETISIAMTHEBEAST",
};
