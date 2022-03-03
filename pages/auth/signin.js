import { getProviders, signIn } from "next-auth/react"
import { useSession } from "next-auth/react"
import MyLogin from "../../components/login/MyLogin.js"
import { GitHubIcon, GoogleIcon, TwitterIcon } from '../../components/login/ProviderIcons'
import { ButtonGroup, Button, VisuallyHidden, Center, Text } from "@chakra-ui/react"
import Layout from '../../components/layout.js'
import QQ from "../../icons/QQ.svg"
import Ghost from "../../destiny-icons/explore/ghost.svg"
import Image from "next/image"
const providerIcons = {
  'Bungie': {
    icon: <img src={Ghost} alt=''/>
  } ,
  'QQ': {
    icon:  <img pl='-5' src={QQ} width='25rem' alt=''/>
  } ,
  'GitHub': {
    icon: <GitHubIcon boxSize="5" />,
    colorScheme: 'facebook'
  } ,
}


export default function SignIn({ providers }) {
  const { data: session, status } = useSession()


  return (
    <Layout>
      <MyLogin>
          {Object.values(providers).map((provider) => (
            <Center p={4}>
              <Button 
              w={'full'} 
              maxW={'md'} 
              colorScheme={providerIcons[provider.name].colorScheme} 
              leftIcon={providerIcons[provider.name].icon} 
              key={provider.name} 
              onClick={() => signIn(provider.id)} 
              isFullWidth>
                <Center>
                  {(status === "authenticated") ? 
                  <Text>绑定 {provider.name} 账户</Text> :
                  <Text>使用 {provider.name} 账户登录</Text>}
                </Center>
              </Button>
            </Center>
          ))}
      </MyLogin>
    </Layout>
  )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
