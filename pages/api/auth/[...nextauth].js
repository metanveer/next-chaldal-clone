import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { verifyPassword } from "../../../utils/auth";
import dbConnect from "../../../db/dbConnect";
import { ObjectId } from "mongodb";

export default NextAuth({
  site: process.env.NEXTAUTH_URL,

  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await dbConnect();
        const User = client.db().collection("users");

        const user = await User.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        if (user.authProvider !== "credentials") {
          client.close();
          throw new Error("Can't log you in! Try log in with Facebook");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Password didn't match!");
        }
        client.close();
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
          const client = await dbConnect();
          const User = client.db().collection("users");
          const userExists = await User.findOne({
            email: user.email,
          });
          if (userExists) {
            user._id = userExists._id;
            user.role = userExists.role;
            client.close();
            return true;
          }

          const userName = user.name ? user.name : user.email.split("@")[0];

          await User.insertOne({
            name: userName,
            phone: "01MYPHONENO",
            gender: "",
            email: user.email,
            authProvider: "facebook",
            role: "customer",
            addresses: [],
          });

          const newUser = await User.findOne({ email: user.email });

          if (newUser) {
            user._id = newUser._id;
            user.role = newUser.role;
            client.close();
            return true;
          }
          client.close();
          return false;
        }
      }

      if (account.type === "credentials") {
        const client = await dbConnect();
        const User = client.db().collection("users");
        const userExists = await User.findOne({
          email: user.email,
        });

        client.close();

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
      const client = await dbConnect();
      const User = client.db().collection("users");
      const dbUser = await User.findOne({ _id: ObjectId(token._id) });
      client.close();

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
      console.log("session Callback", session);
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
