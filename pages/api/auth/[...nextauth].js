import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import BungieProvider from "next-auth/providers/bungie"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    BungieProvider({
      clientId: process.env.BUNGIE_CLIENT_ID,
      clientSecret: process.env.BUNGIE_SECRET,
      headers: {
          "X-API-KEY": process.env.BUNGIE_API_KEY
      },
      authorization: {
          url: "https://www.bungie.net/en/OAuth/Authorize?response_type=code",
          params: { scope: "" }
      },
      userinfo: {
          url: "https://www.bungie.net/platform/User/GetMembershipsForCurrentUser/",
          async request(context) {

              const response = await fetch('https://www.bungie.net/platform/User/GetMembershipsForCurrentUser/', {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      'authorization': `Bearer ${context.tokens.access_token}`,
                      'x-api-key': process.env.BUNGIE_API_KEY
                  }
              });

              return await response.json();
          }
      },
      profile(profile, tokens) {
          const { bungieNetUser: user } = profile.Response;
          return {
              id: user.membershipId,
              membershipId: user.membershipId,
              name: user.displayName,
              email: null,
              image: `https://www.bungie.net${user.profilePicturePath.startsWith("/") ? "" : "/"}${user.profilePicturePath}`,
          }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/auth/signin',
    // signOut: '/auth/signout',
  },    
  callbacks: {
    async session({ session, token, user }) {
        session.user = user;
        return session // The return type will match the one returned in `useSession()`
    },
},
})