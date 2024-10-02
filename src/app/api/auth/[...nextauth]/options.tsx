import { AuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import { connect } from "@/db/config";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
import { Model } from "mongoose";
import { CustomUser, CustomSession } from "@/type";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "User Management",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials, req) {
        connect();
        const user = await User.findOne({ email: credentials?.email });
        if (!user) {
          return null;
        } else {
          return user;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async signIn(params) {
      const { user, account, profile, email, credentials } = params;
      const incomingUser = user;

      if (account?.provider != "credentials") {
        connect();
        await User.findOne({ email: email ?? incomingUser.email }).then(async (user) => {
          if (user) {
            return true;
          } else {
            const randomPassword = Math.random().toString(36).slice(-8);
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(randomPassword, salt);
            await User.create({
              email: incomingUser?.email,
              password: hash,
              name: incomingUser?.name,
              avatar: incomingUser?.image,
            })
              .then((user) => {
                return true;
              })
              .catch((err) => {
                console.log(err);
                return false;
              });
          }
        });
      }
      return true;
    },

    async jwt({ token, user }: { token: JWT; user: CustomUser }) {
      if (user) {
        user.role = user.role ?? "user";
        token.user = user;
      }
      return token;
    },

    async session({
      session,
      token,
      user,
    }: {
      session: CustomSession;
      token: JWT;
      user: CustomUser;
    }) {
      session.user = token.user as CustomUser;
      const fetchedUser = await User.findOne({ email: session.user.email });
      if (fetchedUser) {
        session.user.role = fetchedUser.role;
      }
      return session;
    },
  },
};
