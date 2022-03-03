import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import BungieProvider from "next-auth/providers/bungie"
// import TencentQQ from "next-auth/providers/tencent-qq";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"



async function refreshBungieToken(token) {
  try {
    const url =
      "https://www.bungie.net/Platform/App/OAuth/token/"
      
    console.log(url)
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-API-KEY": process.env.BUNGIE_API_KEY,
      },
      method: "POST",
      body: new URLSearchParams({
        client_secret: process.env.BUNGIE_CLIENT_SECRET,
        client_id: process.env.BUNGIE_CLIENT_ID,
        grant_type: "refresh_token",
        refresh_token: token.refresh_token,
      })
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }
    console.log(parseInt(Date.now()/1000), parseInt(Date.now()/1000) + refreshedTokens.expires_in)
    const updateBungieToken = await prisma.account.update({
      where: {
        id: token.id
      },
      data: {
        access_token: refreshedTokens.access_token,
        expires_at: Number(parseInt(Date.now()/1000)+ refreshedTokens.expires_in),
        refresh_token: refreshedTokens.refresh_token,
        refresh_expires_in: refreshedTokens.refresh_expires_in
      }
    })
    
    if (!updateBungieToken) {
      throw updateBungieToken
    }
    console.log(updateBungieToken)
    return {
      ...token,
      refresh_token: updateBungieToken.refresh_token ?? token.refreshToken,
      access_token: updateBungieToken.access_token,
      expires_at: updateBungieToken.expires_at,
      refresh_expires_in: updateBungieToken.refresh_expires_in
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
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
    {
      clientId: process.env.TENCENT_ID,
      clientSecret: process.env.TENCENT_APP_KEY,
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
              client_id: process.env.TENCENT_ID,
              client_secret: process.env.TENCENT_APP_KEY,
              code: context.params.code,
              redirect_uri: 'https://data.tianque.top/api/auth/callback/qq',
              // redirect_uri: context.provider.callbackUrl,
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
          console.log(context.tokens)
          const response = await fetch('https://graph.qq.com/oauth2.0/me', {
            method: 'GET',
            body: new URLSearchParams({
              access_token: context.tokens.access_token,
            }),
          });
          OpenID = await response.json();
          const userInfoResponse = await fetch('https://graph.qq.com/user/get_user_info', {
            method: 'GET',
            body: new URLSearchParams({
              access_token: context.tokens.access_token,
              oauth_consumer_key: OpenID.client_id,
              openid: OpenID.openid ,
            }),
          });
          return {...await userInfoResponse.json(), openid: OpenID.openid};
        },
      },
  
      profile(profile) {
        return {
          id: profile.openid,
          name: profile.nickname,
          image: profile.figureurl_qq_2 || profile.figureurl_qq_1
        };
      },
    },
    // ...add more providers here
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
          console.log(Date.now(), account.expires_at*1000, (Date.now() < account.expires_at*1000))
          if (Date.now() < account.expires_at*1000)
            return account
          else {
            // console.log(account)
            return refreshBungieToken(account)
          }

        }
        else return account
      })
      session.user = userInfo;
      return session // The return type will match the one returned in `useSession()`
    },
  },
  debug: true,
})