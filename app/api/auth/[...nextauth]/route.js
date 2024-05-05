import NextAuth from "next-auth";
import { connectDB } from "@utils/database";
import User from "@model/user";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { signIn } from "next-auth/react";
// With Username and password
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { username, password } = credentials;
        try {
          await connectDB();
          const user = await User.findOne({ username });
          if (!user) new Response("No User found", { status: 500 });
          const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
          );

          if (!isPasswordMatched) {
            new Response("Wrong Password", { status: 500 });
          }
          return user;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.username = sessionUser.username;
      session.user.id = sessionUser._id.toString();
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  // callbacks: {
  //   async session({ session }) {
  //     const sessionUser = await User.findOne({
  //       email: session.user.email,
  //     });
  //     session.user.id = sessionUser._id.toString();
  //     return session;
  //   },
  // },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// import GoogleProvider from "next-auth/providers/google";
// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     async session({ session }) {
//       const sessionUser = await User.findOne({
//         email: session.user.email,
//       });
//       session.user.id = sessionUser._id.toString();
//       return session;
//     },
//     async signIn({ profile }) {
//       try {
//         // serverless ->Lambda ->dynamodb
//         await connectDB();

//         // Check if user already exist
//         const userExists = await User.findOne({
//           email: profile.email,
//         });
//         // if user is new then create a new profile
//         if (!userExists) {
//           await User.create({
//             email: profile.email,
//             username: profile.name.replace(" ", "").toLowerCase(),
//             image: profile.picture,
//           });
//         }
//         return true;
//       } catch (error) {
//         console.log(error);
//         return false;
//       }
//     },
//   },
// });
