import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { verifyPassword } from "../../../utils/auth";
import dbConnect from "../../../db/dbConnect";
import User from "../../../models/userModel";

export default NextAuth({
  site: process.env.NEXTAUTH_URL,

  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error("No user found!");
        }

        if (user.authProvider !== "credentials") {
          throw new Error("Can't log you in! Try log in with Facebook");
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

  callbacks: {
    async signIn(user, account, profile) {
      if (account.type === "oauth") {
        if (account.provider === "facebook") {
          await dbConnect();
          const userExists = await User.findOne({
            email: user.email,
          });
          if (userExists) {
            user._id = userExists._id;
            user.role = userExists.role;
            return true;
          }

          const newUser = await User.create({
            name: user.name,
            email: user.email,
            authProvider: "facebook",
          });

          if (newUser) {
            user._id = newUser._id;
            user.role = newUser.role;
            return true;
          }
          return false;
        }
      }

      if (account.type === "credentials") {
        await dbConnect();
        const userExists = await User.findOne({
          email: user.email,
        });
        if (userExists) {
          user._id = userExists._id;
          user.role = userExists.role;
          return true;
        }
        return false;
      }

      return false;
    },

    async jwt(token, user) {
      if (user) {
        token = {
          _id: user._id,
        };
      }
      return token;
    },

    async session(session, token) {
      await dbConnect();
      const dbUser = await User.findOne({ _id: token._id });
      if (!dbUser) {
        return null;
      }
      session.user = {
        _id: dbUser._id,
        name: dbUser.name,
        email: dbUser.email,
        phone: dbUser.phone,
        role: dbUser.role,
        provider: dbUser.authProvider,
      };
      return session;
    },
  },

  secret: process.env.SECRET,

  session: {
    jwt: true,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
  },
});
