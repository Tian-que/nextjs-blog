import { PrismaClient } from "@prisma/client"
import { getProfile, HttpClientConfig } from 'bungie-api-ts/destiny2';
import { DestinyComponentType, BungieMembershipType } from "bungie-api-ts/destiny2";
import { getMembershipDataForCurrentUser } from "bungie-api-ts/user";
import { getDestinyManifestSlice, getVendors, getCharacter, getDestinyEntityDefinition } from 'bungie-api-ts/destiny2';

const prisma = new PrismaClient()

const bungieAuthedFetch = (accessToken) => async (
  config
) => {
  try {
    const headers = {
      "x-api-key": process.env.BUNGIE_API_KEY_PRO
    };
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    const url = `${config.url}${
      config.params
        ? "?" +
          Object.entries(config.params).map(
            ([key, value]) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(
                value
              )}`
          ).join("&")
        : ""
    }`;
    // console.log(`Fetching: ${url}`);
    const response = await fetch(url, { headers, credentials: "include" });
    const res = await response.json();
    if (res.ErrorCode === 1) 
      return res.Response
    else
      console.error(res)
      return {}
  } catch (e) {
    console.error(e);
    return {};
  }
};

export async function getTodayUserToken() {
  const todayUserToken = await prisma.account.findFirst({
    where: {
      providerAccountId: '22306110',
    },
    select: {
      id: true, 
      provider: true,
      providerAccountId: true,
      refresh_token: true,
      access_token: true,
      expires_at: true,
      refresh_expires_in: true
    }
  })

  return await refreshBungieToken(todayUserToken)
}

export async function refreshBungieToken(token) {
  if (Date.now() < token.expires_at*1000)
    return token
  else {
    try {
      const url =
        "https://www.bungie.net/Platform/App/OAuth/token/"
        
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-API-KEY": process.env.BUNGIE_API_KEY_PRO,
        },
        method: "POST",
        body: new URLSearchParams({
          client_secret: process.env.BUNGIE_CLIENT_SECRET_PRO,
          client_id: process.env.BUNGIE_CLIENT_ID_PRO,
          grant_type: "refresh_token",
          refresh_token: token.refresh_token,
        })
      })

      const refreshedTokens = await response.json()

      if (!response.ok) {
        throw refreshedTokens
      }
      // console.log(parseInt(Date.now()/1000), parseInt(Date.now()/1000) + refreshedTokens.expires_in)
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
}

export async function getTodayInfo(token){
  const vendorsSells = await getVendors(bungieAuthedFetch(token.access_token), {
    characterId: '2305843009503735098',
    components: [
      DestinyComponentType.VendorSales, 
      DestinyComponentType.ItemInstances,
      DestinyComponentType.ItemObjectives,
      DestinyComponentType.ItemSockets,
      DestinyComponentType.ItemCommonData,
      DestinyComponentType.ItemPlugStates,
      DestinyComponentType.ItemReusablePlugs,
      DestinyComponentType.ItemTalentGrids
    ],
    destinyMembershipId: '4611686018489755635',
    membershipType: BungieMembershipType.TigerSteam,
    filter: 0
  });
  const sells = {
    sales: {
      672118013: vendorsSells.sales.data[672118013],
      350061650: vendorsSells.sales.data[350061650],
      2255782930: vendorsSells.sales.data[2255782930],
      3361454721: vendorsSells.sales.data[3361454721],
      1841717884 : vendorsSells.sales.data[1841717884],
    },
    itemComponents: {
      672118013: vendorsSells.itemComponents[672118013],
      350061650: vendorsSells.itemComponents[350061650],
      2255782930: vendorsSells.itemComponents[2255782930],
      3361454721: vendorsSells.itemComponents[3361454721],
      1841717884 : vendorsSells.itemComponents[1841717884],
    }
  }
  const characterActivities = await getCharacter(bungieAuthedFetch(token.access_token), {
    characterId: '2305843009503735098',
    components: [
      DestinyComponentType.CharacterActivities, 
    ],
    destinyMembershipId: '4611686018489755635',
    membershipType: BungieMembershipType.TigerSteam,
    filter: 0
  });
  const activitiesPromise = characterActivities.activities.data.availableActivities.map((x) => {
    return getDestinyEntityDefinition(bungieAuthedFetch(token.access_token), {
      entityType: "DestinyActivityDefinition",
      hashIdentifier: x.activityHash
    })
  })
  const activities = await Promise.all(activitiesPromise)
  const test = 0
}

