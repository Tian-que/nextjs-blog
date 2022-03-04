import { getProviders, signIn } from "next-auth/react"
import { useSession } from "next-auth/react"
import { ButtonGroup, Button, VisuallyHidden, Center, Text } from "@chakra-ui/react"
import Layout from '../components/layout.js'
import Image from "next/image"
import { PrismaClient } from "@prisma/client"
import { getTodayUserToken, getTodayInfo, g } from "../lib/getBungieToken.js"



export default function Login({ a }) {
  const { data: session, status } = useSession()
  return (
    <Layout>
      test
    </Layout>
  )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const todayUserToken = await getTodayUserToken()
  const test2 = await getTodayInfo(todayUserToken)
  const test = 0
  return {
    props: {
      a:1
    },
  }
}
