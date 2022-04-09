import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import BungieProvider from "next-auth/providers/bungie"
// import TencentQQ from "next-auth/providers/tencent-qq";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { refreshBungieToken } from "../../../lib/getBungieToken.js"

function TencentQQ(options) {
  return {
    id: "qq",
    name: "QQ",
    type: "oauth",
    authorization: "https://graph.qq.com/oauth2.0/authorize",
    token: {
      url: "https://graph.qq.com/oauth2.0/token",
      async request(context) {
        const response = await fetch('https://graph.qq.com/oauth2.0/token',{
          method: 'POST',
          body: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: context.provider.clientId,
            client_secret: context.provider.clientSecret,
            code: context.params.code,
            redirect_uri: context.provider.callbackUrl,
            fmt: 'json',
          }),
        });
        const tokens = await response.json()
        return { tokens }
      },
    },
    userinfo: {
      url: "https://graph.qq.com/oauth2.0/me",
      async request(context) {
        const response = await fetch('https://graph.qq.com/oauth2.0/me?' + 
        new URLSearchParams({
          access_token: context.tokens.access_token,
          fmt: 'json'
        }), {
          method: 'GET',
        });
        const openIDInfo = await response.json();
        const userInfoResponse = await fetch('https://graph.qq.com/user/get_user_info?' + 
        new URLSearchParams({
          access_token: context.tokens.access_token,
          oauth_consumer_key: openIDInfo.client_id,
          openid: openIDInfo.openid ,
        }), {
          method: 'GET',
        });
        return {...await userInfoResponse.json(), openid: openIDInfo.openid};
      },
    },

    profile(profile) {
      return {
        id: profile.openid,
        name: profile.nickname,
        email: null,
        image: profile.figureurl_qq_2 || profile.figureurl_qq_1
      };
    },

    options
  };
}

const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    BungieProvider({
      clientId: process.env.BUNGIE_CLIENT_ID,
      clientSecret: process.env.BUNGIE_CLIENT_SECRET,
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
      profile(profile) {
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
    TencentQQ({
      clientId: process.env.TENCENT_ID,
      clientSecret: process.env.TENCENT_APP_KEY,
    })
  ],
  pages: {
    signIn: '/auth/signin',
    // signOut: '/auth/signout',
  },
  callbacks: {
    async session({ session, user }) {
      const userInfo = await prisma.user.findUnique({
        where: {
          id: user.id
        },
        include: {
          accounts: {
            select: {
              id: true, 
              provider: true,
              providerAccountId: true,
              refresh_token: true,
              access_token: true,
              expires_at: true,
              refresh_expires_in: true
            }
          }
        }
      })
      userInfo.accounts= userInfo.accounts.map((account)=> {
        if (account.provider==='bungie') {
          return refreshBungieToken(account)

        }
        else return account
      })
      session.user = userInfo;
      return session // The return type will match the one returned in `useSession()`
    },
  },
})