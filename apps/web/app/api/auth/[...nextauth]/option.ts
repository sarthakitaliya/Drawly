import { NextAuthOptions } from "next-auth/";
import GoogleProvider from "next-auth/providers/google";
import { prismaClient } from "@repo/db/client";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

export const authOption: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" ? "__Secure-next-auth.session-token" : "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
      },
    },
  },
  jwt: {
    encode: async ({ token, secret }) => {
      //@ts-ignore
      return jwt.sign(token, secret, { algorithm: "HS256" });
    },
    decode: (params) => {
      //@ts-ignore
      return jwt.verify(params.token, params.secret) as JWT;
    },
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
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
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
  secret: process.env.NEXTAUTH_SECRET || "THESECRETISIAMTHEBEAST",
};
