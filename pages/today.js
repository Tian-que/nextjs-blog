import { Grid, ButtonGroup, Button, VisuallyHidden, Center, Text, Box, Divider, Img, Flex, chakra, Spacer} from "@chakra-ui/react"
import Image from "next/image"
import { Image as ChakraImage}  from "@chakra-ui/react"
import Head from "next/head"
import style from '../components/today/today.module.css'
import { cs } from "date-fns/locale"

const jiaohenColor = {
  烈日: 'rgb(240,99,30)',
  电弧: 'rgb(122,236,243)',
  虚空: 'rgb(177,133,223)',
}

export default function Login() {
  const shieldDatas = [
    {
      name: "烈日",
      icon: "https://bungie.net/common/destiny2_content/icons/DestinyDamageTypeDefinition_2a1773e10968f2d088b97c22b22bba9e.png",
      count: 8,
    },
    {
      name: "电弧",
      icon: "https://bungie.net/common/destiny2_content/icons/DestinyDamageTypeDefinition_092d066688b879c807c3b460afdd61e6.png",
      count: 2,
    },
  ]
  const shieldDatasDS = [
    {
      name: "烈日",
      icon: "https://bungie.net/common/destiny2_content/icons/DestinyDamageTypeDefinition_2a1773e10968f2d088b97c22b22bba9e.png",
      count: 8,
    },
    {
      name: "电弧",
      icon: "https://bungie.net/common/destiny2_content/icons/DestinyDamageTypeDefinition_092d066688b879c807c3b460afdd61e6.png",
      count: 1,
    },
  ]
  const championDatas = [
    {
      name: "屏障勇士",
      icon: "https://www.bungie.net/common/destiny2_content/icons/2ac9bcf4a961c3b3e31da7b76a5a87f9.png",
      count: 3,
    },
    {
      name: "过载勇士",
      icon: "https://www.bungie.net/common/destiny2_content/icons/c4d9c4f1ec3167e272286bb155dc15f4.png",
      count: 2,
    },
  ]
  const championDatasDS = [
    {
      name: "屏障勇士",
      icon: "https://www.bungie.net/common/destiny2_content/icons/2ac9bcf4a961c3b3e31da7b76a5a87f9.png",
      count: 4,
    },
    {
      name: "过载勇士",
      icon: "https://www.bungie.net/common/destiny2_content/icons/c4d9c4f1ec3167e272286bb155dc15f4.png",
      count: 6,
    },
  ]
  const banxiDatas = [
    {
      name: '平衡枪托',
      type: '武器模组',
      icon: 'https://www.bungie.net/common/destiny2_content/icons/c537bdf090f114963cce60636c98d7c2.jpg',
      perks: [
        {
          name: '平衡枪托',
          description: '降低武器的后坐力偏转。',
          icon: 'https://www.bungie.net/common/destiny2_content/icons/1a61b0f2c0c1707a0d53b90264f84a3d.png'
        }
      ]
    },
    {
      name: '小型规格',
      type: '武器模组',
      icon: 'https://www.bungie.net/common/destiny2_content/icons/02c21091a41663aeaff7e26ab233bc20.jpg',
      perks: [
        {
          name: '小型规格',
          description: '对普通敌人造成额外伤害。',
          icon: 'https://www.bungie.net/common/destiny2_content/icons/0a4ec1d5bb185c972f9bbdf4ebecedc5.png'
        }
      ]
    },
    {
      name: '瞄准协调器',
      type: '武器模组',
      icon: 'https://www.bungie.net/common/destiny2_content/icons/34959be63128a82fe6382b800b2d775d.jpg',
      perks: [
        {
          name: '瞄准协调器',
          description: '武器具有更好的目标获取能力。',
          icon: 'https://www.bungie.net/common/destiny2_content/icons/ecd83da9150cf023cbc859b2c8331f2c.png'
        }
      ]
    },
    {
      name: '蜻蜓规格',
      type: '武器模组',
      icon: 'https://www.bungie.net/common/destiny2_content/icons/bb2c1c71fa26132557b1e75515df8c45.jpg',
      perks: [
        {
          name: '蜻蜓规格',
          description: '提高蜻蜓的爆炸范围和伤害。',
          icon: 'https://www.bungie.net/common/destiny2_content/icons/86c5f912278f57c5089039f9425969c3.png'
        }
      ]
    },
  ]

  const csm = [
    {'description': '锁定装备\n匹配游戏\n护盾加成',
     'hasIcon': true,
     'icon': '/common/destiny2_content/icons/45f40693f3014d50ea78d5f3f8fe2e04.png',
     'iconSequences': [{'frames': ['/common/destiny2_content/icons/45f40693f3014d50ea78d5f3f8fe2e04.png',
                                   '/common/destiny2_content/icons/ffd3ac18af4d4e9320b12189c278d092.png']}],
     'name': '传说难度修改器'},
     {'description': '造成和受到的虚空伤害+50%。',
      'hasIcon': true,
      'icon': '/common/destiny2_content/icons/250f9c4b9f31891b086a8647dc6cda3e.png',
      'iconSequences': [{'frames': ['/common/destiny2_content/icons/250f9c4b9f31891b086a8647dc6cda3e.png',
                                    '/common/destiny2_content/icons/560ce03111c93052b07629ec6eba726b.png']}],
      'name': '虚空焦痕'},
    {'description': '堕落者侦察机现在拥有烈日护盾',
  'hasIcon': true,
  'icon': '/common/destiny2_content/icons/2e33702388430d35daf00ea364890a88.png',
  'iconSequences': [{'frames': ['/common/destiny2_content/icons/2e33702388430d35daf00ea364890a88.png',
                                '/common/destiny2_content/icons/cedda72ef4b270a1a799e5cd66b5316e.png']}],
  'name': '炽热刀刃'},
 {'description': '活动开始后，您将无法更换装备。',
  'hasIcon': true,
  'icon': '/common/destiny2_content/icons/3e2501508484b8531f31ca4cea497110.png',
  'iconSequences': [{'frames': ['/common/destiny2_content/icons/3e2501508484b8531f31ca4cea497110.png',
                                '/common/destiny2_content/icons/3e2501508484b8531f31ca4cea497110.png']},
                    {'frames': ['/common/destiny2_content/icons/e1aaed9cfbf632293c6adfd6b72aff20.png']}],
  'name': '装备锁定'},
 {'description': '敌人护盾对所有元素不吻合的伤害具有很强的抗性。',
  'hasIcon': true,
  'icon': '/common/destiny2_content/icons/d9337bf6883df7dff9190cff413e6fde.png',
  'iconSequences': [{'frames': ['/common/destiny2_content/icons/d9337bf6883df7dff9190cff413e6fde.png']},
                    {'frames': ['/common/destiny2_content/icons/bccf16e06ea092dcc13250a3c9b8786f.png']}],
  'name': '连连看'},
 {'description': '火力战队的复活次数受限。击败勇士可获得额外的复活次数。',
  'hasIcon': true,
  'icon': '/common/destiny2_content/icons/be42fd65184d2a22579a170ff1abed28.png',
  'iconSequences': [{'frames': ['/common/destiny2_content/icons/be42fd65184d2a22579a170ff1abed28.png',
                                '/common/destiny2_content/icons/38b7463eb439f539efdbb121bd70cb82.png']}],
  'name': '有限复活'}]
  const csmHalf = Math.ceil(csm.length / 2)
  const leftCSM = csm.slice(0, csmHalf)
  const rightCSM = csm.slice(-csmHalf)

  const dsm = [
    {'description': '额外勇士\n锁定装备\n元素匹配\n额外护盾',
     'hasIcon': true,
     'icon': '/common/destiny2_content/icons/05546f508343b402f6499fee3b29ed5c.png',
     'iconSequences': [{'frames': ['/common/destiny2_content/icons/05546f508343b402f6499fee3b29ed5c.png',
                                   '/common/destiny2_content/icons/68efd8aad39b5de9733c214dfb48d2fc.png']}],
     'name': '大师难度修改器'},
    {'description': '造成和受到的虚空伤害+50%。',
     'hasIcon': true,
     'icon': '/common/destiny2_content/icons/250f9c4b9f31891b086a8647dc6cda3e.png',
     'iconSequences': [{'frames': ['/common/destiny2_content/icons/250f9c4b9f31891b086a8647dc6cda3e.png',
                                   '/common/destiny2_content/icons/560ce03111c93052b07629ec6eba726b.png']}],
     'name': '虚空焦痕'},
     {'description': '堕落者侦察机现在拥有烈日护盾',
  'hasIcon': true,
  'icon': '/common/destiny2_content/icons/2e33702388430d35daf00ea364890a88.png',
  'iconSequences': [{'frames': ['/common/destiny2_content/icons/2e33702388430d35daf00ea364890a88.png',
                                '/common/destiny2_content/icons/cedda72ef4b270a1a799e5cd66b5316e.png']}],
  'name': '炽热刀刃'},
 {'description': '雷达已禁用。',
  'hasIcon': true,
  'icon': '/common/destiny2_content/icons/256f65f21e36787d0dc5088f0ad38bae.png',
  'iconSequences': [{'frames': ['/common/destiny2_content/icons/256f65f21e36787d0dc5088f0ad38bae.png']},
                    {'frames': ['/common/destiny2_content/icons/92cec07a31fd53abdd562800d7d41d12.png']}],
  'name': '戏弄'},
 {'description': '活动开始后，您将无法更换装备。',
  'hasIcon': true,
  'icon': '/common/destiny2_content/icons/3e2501508484b8531f31ca4cea497110.png',
  'iconSequences': [{'frames': ['/common/destiny2_content/icons/3e2501508484b8531f31ca4cea497110.png',
                                '/common/destiny2_content/icons/3e2501508484b8531f31ca4cea497110.png']},
                    {'frames': ['/common/destiny2_content/icons/e1aaed9cfbf632293c6adfd6b72aff20.png']}],
  'name': '装备锁定'},
 {'description': '敌人护盾对所有元素不吻合的伤害具有很强的抗性。',
  'hasIcon': true,
  'icon': '/common/destiny2_content/icons/d9337bf6883df7dff9190cff413e6fde.png',
  'iconSequences': [{'frames': ['/common/destiny2_content/icons/d9337bf6883df7dff9190cff413e6fde.png']},
                    {'frames': ['/common/destiny2_content/icons/bccf16e06ea092dcc13250a3c9b8786f.png']}],
  'name': '连连看'},
 {'description': '火力战队的复活次数受限。击败勇士可获得额外的复活次数。',
  'hasIcon': true,
  'icon': '/common/destiny2_content/icons/be42fd65184d2a22579a170ff1abed28.png',
  'iconSequences': [{'frames': ['/common/destiny2_content/icons/be42fd65184d2a22579a170ff1abed28.png',
                                '/common/destiny2_content/icons/38b7463eb439f539efdbb121bd70cb82.png']}],
  'name': '有限复活'},
  {'description': '此模式包含额外的勇士。',
   'hasIcon': true,
   'icon': '/common/destiny2_content/icons/b9955d70ff4eea2500e3972b30bbd62b.png',
   'iconSequences': [{'frames': ['/common/destiny2_content/icons/b9955d70ff4eea2500e3972b30bbd62b.png']},
                     {'frames': ['/common/destiny2_content/icons/efc32267a9f1c53719c88d02a23d5b36.png']}],
  'name': '勇士：暴徒'}]
  const dsmHalf = Math.ceil(dsm.length / 2)
  const leftDSM = dsm.slice(0, dsmHalf)
  const rightDSM = dsm.slice(-dsmHalf)

  

  return (
    <Center bg='rgb(14, 21, 27)' width='100vw' color='white'>
      <Head>  
        <title>命运2日报</title>
      </Head>
      <Box  maxW='1920px' width='100vw' bgSize='contain' bgRepeat='no-repeat' padding='0rem 0px 0px' bgImage={'url("https://images.contentstack.io/v3/assets/blte410e3b15535c144/blt58ebe92f5c2985f3/620be743510c6b1c87b8a9d7/story-bg.jpg")'}>
        <Box pt='20vw' pl='7.5vw' width='80vw' >
          <Box w='9vw' height='0.8vw' bg='cyan.300' color='white'/>
          <Box fontSize='7.2vw' pt='3vw' fontWeight='bold'>
            《命运2》日报
          </Box>
        </Box>
        <Center pt='3vw'>
          <Box w='80%'>
            <Flex fontSize='2vw' fontWeight='light' opacity='0.5'>
              <chakra.span>2022年3月13日</chakra.span>
              <Spacer/>
              <chakra.span>苏生赛季第3周</chakra.span>
            </Flex>
          </Box>
        </Center>
        <Divider orientation='horizontal' pt='0.3vw' opacity='0.4'/>
        <Center pt='3.5vw' display='grid'>
          <Flex 
            width='85vw' 
            h='17vw' 
            borderColor='rgb(60,60,60)' 
            borderWidth='0.2vw' 
            borderRadius='sm'
            bgImg={'linear-gradient(90deg, rgb(14, 21, 27) 0%, rgba(0,0,0,0) 25%), url("https://bungie.net/img/destiny_content/pgcr/moon_k1_logistics.jpg")'}
            bgSize='60vw'
            bgClip='content-box'
            bgPos='25vw center'
            bgRepeat='no-repeat'
            // bgGradient='linear(to-r, rgba(14, 21, 27, 1) 40%, rgba(14, 21, 27, 0))'
          >
            <Box
              maxW='40%'
              h='100%'
              bgRepeat='no-repeat'
              bgSize='15vw'
              bgPos = '3vw'
              bgImg={'linear-gradient(90deg, rgba(14,21,27,90%) 0%, rgba(14,21,27,90%) 80%), url("https://bungie.net/common/destiny2_content/icons/DestinyActivityModeDefinition_7d11acd7d5a3daebc0a0c906452932d6.png")'}
            >
              <Box pl='3vw' pt='2vw'>
                <Text fontSize='2vw' fontWeight='light' className={style.opacityText}>遗失区域</Text>
                <Divider opacity='0.3' pt='0.4vw' />
                <Text fontSize='5vw' lineHeight='1.3' fontWeight='light' >K1后勤区</Text>
                <Flex>
                  <ChakraImage w='3vw' className={style.opacityText} src='https://bungie.net/common/destiny2_content/icons/c60303e278aa5fc566a04e98c3d8024c.png' />
                  <Text fontSize='2vw' fontWeight='light' className={style.opacityText}>月球 · 地狱深渊</Text>
                </Flex>
              </Box>
            </Box>
            <Spacer><Center pl='10%' h='100%'><Divider variant='dashed'/></Center></Spacer>
            <Box w='30%'>
              <Flex pt='25%'>
                <Box>
                  <ChakraImage boxSize='5.2vw' src={'https://bungie.net/common/destiny2_content/icons/763634b78eb22168ac707500588b7333.jpg'}/>
                </Box>
                <Box pl='5%' lineHeight='1.2' maxW='100%'>
                  <Text color='lightgrey' fontWeight='light' fontSize='1.8vw' >如若单人</Text>
                  <Text fontSize='2.6vw' color='#c3a019' fontWeight='bold' lineHeight='1.2' >异域腿甲</Text>
                </Box>
              </Flex>
            </Box>
          </Flex>
          <Center mt='1.3vw' w='100%' h='5.6vw' bg='#513065' >
            <chakra.span pl='3vw' fontSize='3vw' fontWeight='bold' opacity='0.83' >传说遗失区域</chakra.span>
            <Spacer />
            <Center pr='3vw' h='100%' lineHeight='1.3' textAlign='right' pt='0.3vw'>
              <Grid>
                <chakra.span fontSize='1.7vw' pb='0' className={style.opacityText}>光等</chakra.span>
                <Flex fontSize='2vw' pt='0' fontFamily='Destiny2'>
                  <chakra.span color='#c3a019'></chakra.span>
                  <chakra.span>1550</chakra.span>
                </Flex>
              </Grid>
            </Center>
          </Center>
          <Divider pt='1.3vw' opacity='0.3'/>
          <Flex pt='2vw' w='100%'  h='16vw'>
            <Box w='42%'>
              <chakra.span fontSize='2.5vw' className={style.opacityText}># 护盾</chakra.span>
              <Flex h='10vw' pt='2vw' >
                {shieldDatas.map((shieldData) => (
                  <Box
                    w='8.2vw'
                    h='100%'
                    bgRepeat='no-repeat'
                    mr='3vw'
                    bgImg={'linear-gradient(90deg, rgba(14,21,27,60%) 0%, rgba(14,21,27,60%) 80%), url("'+ shieldData.icon + '")'}
                    bgSize='6.2vw'
                    verticalAlign='bottom'
                    key={shieldData.name}
                  > 
                    <Box pl='3.3vw' pt='2.5vw' fontSize='3vw'><chakra.span fontStyle='italic'>x</chakra.span><chakra.span fontWeight='bold' fontSize='3.5vw'>{shieldData.count}</chakra.span></Box>
                  </Box>
                ))}
              </Flex>
            </Box>
            <Box w='58%'>
              <chakra.span fontSize='2.5vw' className={style.opacityText}># 勇士</chakra.span>
              <Flex pl='1vw' h='10vw' pt='2vw' >
                {championDatas.map((championData) => (
                  <Box
                    w='23vw'
                    h='100%'
                    bgRepeat='no-repeat'
                    bgImg={'linear-gradient(90deg, rgba(14,21,27,60%) 0%, rgba(14,21,27,60%) 80%), url("'+ championData.icon + '")'}
                    bgSize='6.2vw'
                    verticalAlign='bottom'
                    key={championData.name}
                    mr='1.8vw'
                  > 
                    <Flex>
                      <Box pl='3.3vw' pt='2.5vw' fontSize='3vw'><chakra.span fontStyle='italic'>x</chakra.span><chakra.span fontWeight='bold' fontSize='3.5vw'>{championData.count}</chakra.span></Box>
                      <Box pt='1vw' pl='1.3vw' width='auto'><chakra.span fontWeight='light' fontSize='2.7vw'>{championData.name}</chakra.span></Box>
                    </Flex>
                  </Box>
                ))}
              </Flex>
            </Box>
          </Flex>
          <Divider pt='1rem' opacity='0.3'/>
          <Box pt='2vw'>
            <Box w='100%'><chakra.span fontSize='2.5vw' className={style.opacityText}>修改器</chakra.span></Box>
            <Flex pt='2vw'>
              <Grid w='50%'>
                {leftCSM.map((data) => (
                  <Flex h='15vw'>
                    <Box 
                    w='6.2vw'
                    h='6.2vw'
                    bgRepeat='no-repeat'
                    bgImg={'url("https://www.bungie.net/'+ data.icon + '")'}
                    bgSize='6.2vw'
                    />
                    <Box pl='2vw' maxW='35vw'>
                      {data.name.endsWith('焦痕') ? 
                      <Text fontSize='3vw' lineHeight='1.2' color={jiaohenColor[data.name.slice(0,2)]} isTruncated>{data.name}</Text> :
                      <Text fontSize='3vw' lineHeight='1.2' isTruncated>{data.name}</Text>}
                      <Text color='darkgrey' fontSize='2vw' whiteSpace='pre-wrap' >{data.description}</Text>
                    </Box>
                  </Flex>
                ))}
              </Grid>
              
              <Grid w='50%'>
              {rightCSM.map((data) => (
                  <Flex h='15vw'>
                    <Box 
                    w='6.2vw'
                    h='6.2vw'
                    bgRepeat='no-repeat'
                    bgImg={'url("https://www.bungie.net/'+ data.icon + '")'}
                    bgSize='6.2vw'
                    />
                    <Box pl='2vw' maxW='35vw'>
                      <Text fontSize='3vw'  lineHeight='1.2' isTruncated>{data.name}</Text>
                      <Text color='darkgrey' fontSize='2vw' whiteSpace='pre-wrap' >{data.description}</Text>
                    </Box>
                  </Flex>
                ))}
              </Grid>
            </Flex>
          </Box>

          <Center mt='1.3vw' w='100%' h='5.6vw' bg='#968430' >
            <chakra.span pl='3vw' fontSize='3vw' fontWeight='bold' opacity='0.83' >大师遗失区域</chakra.span>
            <Spacer />
            <Center pr='3vw' h='100%' lineHeight='1.3' textAlign='right' pt='0.3vw'>
              <Grid>
                <chakra.span fontSize='1.7vw' pb='0' className={style.opacityText}>光等</chakra.span>
                <Flex fontSize='2vw' pt='0' fontFamily='Destiny2'>
                  <chakra.span color='#c3a019'></chakra.span>
                  <chakra.span>1580</chakra.span>
                </Flex>
              </Grid>
            </Center>
          </Center>
          <Divider pt='1.3vw' opacity='0.3'/>
          <Flex pt='2vw' w='100%'  h='16vw'>
            <Box w='42%'>
              <chakra.span fontSize='2.5vw' className={style.opacityText}># 护盾</chakra.span>
              <Flex h='10vw' pt='2vw' >
                {shieldDatasDS.map((shieldData) => (
                  <Box
                    w='8.2vw'
                    h='100%'
                    bgRepeat='no-repeat'
                    mr='3vw'
                    bgImg={'linear-gradient(90deg, rgba(14,21,27,60%) 0%, rgba(14,21,27,60%) 80%), url("'+ shieldData.icon + '")'}
                    bgSize='6.2vw'
                    verticalAlign='bottom'
                    key={shieldData.name}
                  > 
                    <Box pl='3.3vw' pt='2.5vw' fontSize='3vw'><chakra.span fontStyle='italic'>x</chakra.span><chakra.span fontWeight='bold' fontSize='3.5vw'>{shieldData.count}</chakra.span></Box>
                  </Box>
                ))}
              </Flex>
            </Box>
            <Box w='58%'>
              <chakra.span fontSize='2.5vw' className={style.opacityText}># 勇士</chakra.span>
              <Flex pl='1vw' h='10vw' pt='2vw' >
                {championDatasDS.map((championData) => (
                  <Box
                    w='23vw'
                    h='100%'
                    bgRepeat='no-repeat'
                    bgImg={'linear-gradient(90deg, rgba(14,21,27,60%) 0%, rgba(14,21,27,60%) 80%), url("'+ championData.icon + '")'}
                    bgSize='6.2vw'
                    verticalAlign='bottom'
                    key={championData.name}
                    mr='1.8vw'
                  > 
                    <Flex>
                      <Box pl='3.3vw' pt='2.5vw' fontSize='3vw'><chakra.span fontStyle='italic'>x</chakra.span><chakra.span fontWeight='bold' fontSize='3.5vw'>{championData.count}</chakra.span></Box>
                      <Box pt='1vw' pl='1.3vw' width='auto'><chakra.span fontWeight='light' fontSize='2.7vw'>{championData.name}</chakra.span></Box>
                    </Flex>
                  </Box>
                ))}
              </Flex>
            </Box>
          </Flex>
          <Divider pt='1rem' opacity='0.3'/>
          <Box pt='2vw'>
            <Box w='100%'><chakra.span fontSize='2.5vw' className={style.opacityText}>修改器</chakra.span></Box>
            <Flex pt='2vw'>
              <Grid w='50%'>
                {leftDSM.map((data) => (
                  <Flex h='16vw'>
                    <Box 
                    w='6.2vw'
                    h='6.2vw'
                    bgRepeat='no-repeat'
                    bgImg={'url("https://www.bungie.net/'+ data.icon + '")'}
                    bgSize='6.2vw'
                    key={data.name}
                    />
                    <Box pl='2vw' maxW='35vw'>
                      {data.name.endsWith('焦痕') ? 
                      <Text fontSize='3vw' lineHeight='1.2' color={jiaohenColor[data.name.slice(0,2)]} isTruncated>{data.name}</Text> :
                      <Text fontSize='3vw' lineHeight='1.2' isTruncated>{data.name}</Text>}
                      <Text color='darkgrey' fontSize='2vw' whiteSpace='pre-wrap' >{data.description}</Text>
                    </Box>
                  </Flex>
                ))}
              </Grid>
              
              <Grid w='50%'>
              {rightDSM.map((data) => (
                  <Flex h='15vw'>
                    <Box 
                    w='6.2vw'
                    h='6.2vw'
                    bgRepeat='no-repeat'
                    bgImg={'url("https://www.bungie.net/'+ data.icon + '")'}
                    bgSize='6.2vw'
                    key={data.name}
                    />
                    <Box pl='2vw' maxW='35vw'>
                      <Text fontSize='3vw'  lineHeight='1.2' isTruncated>{data.name}</Text>
                      <Text color='darkgrey' fontSize='2vw' whiteSpace='pre-wrap' >{data.description}</Text>
                    </Box>
                  </Flex>
                ))}
              </Grid>
            </Flex>
          </Box>
        </Center>
        <Divider orientation='horizontal' pt='0.3vw' opacity='0.4'/>
        <Center pt='3.5vw' display='grid'>
          <Box 
            width='85vw' 
            h='17vw' 
            borderColor='rgb(60,60,60)' 
            borderWidth='0.2vw' 
            borderRadius='sm'
            bgImg={'linear-gradient(90deg, rgb(14, 21, 27) 0%, rgba(0,0,0,0.5) 25%), url("https://bungie.net/common/destiny2_content/icons/3142923bc72bcd5a769badc26bd8b508.jpg")'}
            bgSize='60vw'
            bgClip='content-box'
            bgPos='25vw center'
            bgRepeat='no-repeat'
            // bgGradient='linear(to-r, rgba(14, 21, 27, 1) 40%, rgba(14, 21, 27, 0))'
          >
            <Box
              w='100%'
              h='100%'
              // bgRepeat='no-repeat'
              // bgSize='15vw'
              // bgPos = '3vw'
              // bgImg={'linear-gradient(90deg, rgba(14,21,27,90%) 0%, rgba(14,21,27,90%) 80%), url("https://bungie.net/common/destiny2_content/icons/DestinyActivityModeDefinition_7d11acd7d5a3daebc0a0c906452932d6.png")'}
            >
              <Box pl='3vw' pt='2vw'>
                <Text fontSize='2vw' fontWeight='light' className={style.opacityText}>枪匠</Text>
                <Divider opacity='0.3' pt='0.4vw' w='30vw'/>
                <Text fontSize='5vw' lineHeight='1.3' fontWeight='light' >班西-44</Text>
                <Flex>
                  <ChakraImage w='3vw' className={style.opacityText} src='https://bungie.net/common/destiny2_content/icons/c60303e278aa5fc566a04e98c3d8024c.png' />
                  <Text fontSize='2vw' fontWeight='light' className={style.opacityText}>高塔 · 地球，最后的城市</Text>
                </Flex>
              </Box>
            </Box>
          </Box>
          <Divider pt='1.3vw' opacity='0.3'/>
          <Box pt='2vw'>
            <Box w='100%'><chakra.span fontSize='2.5vw' className={style.opacityText}>模组</chakra.span></Box>
            <Grid pt='2vw' pl='2vw'>
              {banxiDatas.map((data) => (<Flex pl='0.2vw' pt='0.2vw' >
                <Box 
                  width='6.2vw' 
                  h='6.2vw' 
                  borderColor='rgb(145,145,145)' 
                  borderWidth='0.2vw' 
                  borderRadius='sm'
                  mb='2vw'
                >
                  <ChakraImage boxSize='5.8vw' src={data.icon}/>
                </Box>
                <Box pl='2vw' maxW='36vw'>
                  <Text fontSize='3vw' lineHeight='1.2' isTruncated>{data.name}</Text>
                  <Text color='darkgrey' fontSize='2vw' whiteSpace='pre-wrap' >{data.type}</Text>
                </Box>
                <Spacer ><Divider ml='10%' variant='dashed' mt='10%' w='80%'/></Spacer>
                <Box w='35vw'>
                {data.perks.map((perk) => (<Flex>
                    <Box>
                      <ChakraImage boxSize='5.2vw' src={perk.icon}/>
                    </Box>
                    <Box pl='2vw' maxW='36vw'>
                      <Text fontSize='2.6vw' lineHeight='1.2' isTruncated>{perk.name}</Text>
                      <Text color='darkgrey' fontSize='1.8vw' whiteSpace='pre-wrap' >{perk.description}</Text>
                    </Box>
                  </Flex>))}
                  
                </Box>
              </Flex>))}
              
            </Grid>
          </Box>

          
        </Center>
      </Box>
    </Center>
  )
}

// // This is the recommended way for Next.js 9.3 or newer
// export async function getServerSideProps(context) {
//   const todayUserToken = await getTodayUserToken()
//   const test2 = await getTodayInfo(todayUserToken)
//   const test = 0
//   return {
//     props: {
//       a:1
//     },
//   }
// }
