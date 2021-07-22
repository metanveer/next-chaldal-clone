import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { verifyPassword } from "../../../utils/auth";
import dbConnect from "../../../db/dbConnect";
import User from "../../../models/userModel";

export default NextAuth({
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        dbConnect();
        const user = await User.findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Login failed!");
        }
        return { email: user.email };
      },
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  jwt: {
    secret: "2ffb5528a5f458f6d532796f50602888",
    encryption: true,
  },
  // pages: {
  //   signIn: "/account/login", // Displays signin buttons
  //   // signOut: '/auth/signout', // Displays form with sign out button
  //   // error: '/auth/error', // Error code passed in query string as ?error=
  //   // verifyRequest: '/auth/verify-request', // Used for check email page
  //   // newUser: null // If set, new users will be directed here on first sign in
  // },
});
