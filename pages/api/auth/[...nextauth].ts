import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import AppleProvider from 'next-auth/providers/apple';

// Sequelize ---- //
import SequelizeAdapter from "@next-auth/sequelize-adapter"
import { Sequelize } from "sequelize";
//export const sequelize = new Sequelize("sqlite::memory:");
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite', // or ':memory:'
});

export async function getUsers() {
  const [accounts, aMetadata] = await sequelize.query("SELECT * FROM accounts");
  const [users, uMetadata] = await sequelize.query("SELECT * FROM users"); 

  return {accounts, users};
};

export async function deleteUsers() {
  const [accounts, aMetadata] = await sequelize.query("DELETE FROM accounts");
  const [users, uMetadata] = await sequelize.query("DELETE FROM users"); 

  return; 
}

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    AppleProvider({
      clientId: process.env.APPLE_ID!,
      clientSecret: process.env.APPLE_SECRET!,
      authorization: {
        params: {
          scope: "name email",
          response_mode: "form_post",
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  adapter: SequelizeAdapter(sequelize),
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
    
  },
}

export default NextAuth(authOptions)
