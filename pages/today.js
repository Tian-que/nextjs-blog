import { Grid, ButtonGroup, Button, VisuallyHidden, Center, Text, Box, Divider, Img, Flex, chakra, Spacer} from "@chakra-ui/react"
import Image from "next/image"
import { Image as ChakraImage}  from "@chakra-ui/react"
import Head from "next/head"
import style from '../components/today/today.module.css'
import { cs } from "date-fns/locale"
import { SP } from "next/dist/shared/lib/utils"

const jiaohenColor = {
  烈日: 'rgb(240,99,30)',
  电弧: 'rgb(122,236,243)',
  虚空: 'rgb(177,133,223)',
}

function TodayHeader({seasonInfo}) {
  return (
    <>
      <Head>  
        <title>命运2日报</title>
      </Head>
      <Box pt='20vw' pl='7.5vw' width='80vw' >
          <Box w='9vw' height='0.8vw' bg='cyan.300' color='white'/>
          <Box fontSize='7.2vw' pt='3vw' fontWeight='bold' letterSpacing='0.5vw'>
            《命运2》日报
          </Box>
        </Box>
        <Center pt='3vw'>
          <Box w='80%'>
            <Flex fontSize='2vw' fontWeight='light' opacity='0.5'>
              <chakra.span>{seasonInfo.today}</chakra.span>
              <Spacer/>
              <chakra.span>S{seasonInfo.season} · {seasonInfo.seasonName}第{seasonInfo.weeks}/{seasonInfo.numWeeks}周</chakra.span>
            </Flex>
          </Box>
        </Center>
        <Divider orientation='horizontal' pt='0.3vw' opacity='0.4'/>
    </>
  )
}

function ImgCard({imageUrl, children, ...props}) {
  return (
  <Flex 
    width='85vw' 
    h='17vw' 
    borderColor='rgb(60,60,60)' 
    borderWidth='0.2vw' 
    borderRadius='sm'
    bgImg={'linear-gradient(90deg, rgb(14, 21, 27) 0%, rgba(0,0,0,0.5) 35%), url("'+imageUrl+'")'}
    bgSize='60vw'
    bgClip='content-box'
    bgPos='25vw center'
    bgRepeat='no-repeat'
    {...props}
    // bgGradient='linear(to-r, rgba(14, 21, 27, 1) 40%, rgba(14, 21, 27, 0))'
  >
    {children}
  </Flex>)
}

function CardLeftBox({datas, ...props}) {
  return (
    <Box
      maxW='60%'
      h='100%'
      bgRepeat='no-repeat'
      bgSize='15vw'
      bgPos = '3vw'
      bgImg={datas.typeImg ? 'linear-gradient(90deg, rgba(14,21,27,85%) 0%, rgba(14,21,27,85%) 80%), url("' + bungieUrl(datas.typeImg) + '")': ''}
      {...props}
    >
      <Box pl='3vw' pt='2vw'>
        <Grid templateColumns='repeat(2, 1fr)'>
          <Text fontSize='2vw' fontWeight='light' className={style.opacityText}>{datas.type}</Text>
          {datas.light && <Text fontFamily='destiny2' color='#c3a019' textAlign='right' fontSize='2vw' >{datas.light}</Text>}
        </Grid>
        <Divider opacity='0.3' pt='0.4vw' />
        <Text fontSize='5vw' lineHeight='1.3' fontWeight='light' >{datas.name}</Text>
        <Flex>
          {/* TODO: 动态显示目的地图标 */}
          <ChakraImage w='3vw' className={style.opacityText} src='https://bungie.net/common/destiny2_content/icons/c60303e278aa5fc566a04e98c3d8024c.png' />
          <Text fontSize='2vw' fontWeight='light' className={style.opacityText}>{datas.location}</Text>
        </Flex>
      </Box>
    </Box>
  )
}

function LostImgCard({lostSectorInfo}) {
  return (
    <ImgCard imageUrl={bungieUrl(lostSectorInfo.pgcrImage)}>
      <CardLeftBox datas={lostSectorInfo}/>
      <Spacer><Center pl='10%' h='100%'><Divider variant='dashed'/></Center></Spacer>
      <Box w='30%'>
        <Flex pt='25%'>
          <Box>
            {/* TODO: 动态显示奖励信息（要等API支持） */}
            <ChakraImage boxSize='5.2vw' src={'https://bungie.net/common/destiny2_content/icons/763634b78eb22168ac707500588b7333.jpg'}/>
          </Box>
          <Box pl='5%' lineHeight='1.25' maxW='100%'>
            <Text color='lightgrey' fontWeight='light' fontSize='1.8vw' >如若单人</Text>
            <Text fontSize='2.6vw' color='#c3a019' fontWeight='bold' lineHeight='1.2' >异域{lostSectorInfo.reward}</Text>
          </Box>
        </Flex>
      </Box>
    </ImgCard>
  )
}

const shieldIcons = [
  "https://bungie.net/common/destiny2_content/icons/DestinyDamageTypeDefinition_2a1773e10968f2d088b97c22b22bba9e.png",
  "https://bungie.net/common/destiny2_content/icons/DestinyDamageTypeDefinition_092d066688b879c807c3b460afdd61e6.png",
  "https://bungie.net/common/destiny2_content/icons/DestinyDamageTypeDefinition_ceb2f6197dccf3958bb31cc783eb97a0.png"
]

const captainsIcons = [
  {
    name: "屏障勇士",
    icon: "https://www.bungie.net/common/destiny2_content/icons/2ac9bcf4a961c3b3e31da7b76a5a87f9.png",
  },
  {
    name: "过载勇士",
    icon: "https://www.bungie.net/common/destiny2_content/icons/c4d9c4f1ec3167e272286bb155dc15f4.png",
  },
  {
    name: "势不可挡勇士",
    icon: "https://bungie.net/common/destiny2_content/icons/0e40371c49f0beac97e5fd9dc2ea9348.png",
  },
]

function LostBody({lostSectorDetail}) {
  const modifierHalf = Math.ceil(lostSectorDetail.modifiers.length / 2)
  const leftModifier = lostSectorDetail.modifiers.slice(0, modifierHalf)
  const rightModifier = lostSectorDetail.modifiers.slice(-modifierHalf)
  return (
    <>
      <Center mt='1.3vw' w='100%' h='5.6vw' bg={lostSectorDetail.name === "传说遗失区域" ? '#513065': '#968430'} >
        <chakra.span pl='3vw' fontSize='3vw' fontWeight='bold' opacity='0.83' >{lostSectorDetail.name}</chakra.span>
        <Spacer />
        <Center pr='3vw' h='100%' lineHeight='1.3' textAlign='right' pt='0.3vw'>
          <Grid>
            <chakra.span fontSize='1.7vw' pb='0' className={style.opacityText}>光等</chakra.span>
            <Flex fontSize='2vw' pt='0' fontFamily='Destiny2'>
              <chakra.span color='#c3a019'></chakra.span>
              <chakra.span>{lostSectorDetail.light}</chakra.span>
            </Flex>
          </Grid>
        </Center>
      </Center>
      <Divider pt='1.3vw' opacity='0.3'/>
      <Flex pt='2vw' w='100%'  h='16vw'>
        <Box w='42%'>
          <chakra.span fontSize='2.5vw' className={style.opacityText}># 护盾</chakra.span>
          <Flex h='10vw' pt='2vw' >
            {lostSectorDetail.shields.map((shieldData, index) => (
              <Box
                w='8.2vw'
                h='100%'
                bgRepeat='no-repeat'
                mr='3vw'
                bgImg={'linear-gradient(90deg, rgba(14,21,27,45%) 0%, rgba(14,21,27,45%) 80%), url("'+ shieldIcons[index] + '")'}
                bgSize='6.2vw'
                verticalAlign='bottom'
                key={index}
              > 
                <Box pl='3.3vw' pt='2.5vw' fontSize='3vw'><chakra.span fontStyle='italic'>x</chakra.span><chakra.span fontWeight='bold' fontSize='3.5vw'>{shieldData===-1?"?":shieldData}</chakra.span></Box>
              </Box>
            ))}
          </Flex>
        </Box>
        <Box w='58%'>
          <chakra.span fontSize='2.5vw' className={style.opacityText}># 勇士</chakra.span>
          <Flex pl='2vw' h='10vw' pt='2vw' pr='2vw'>
            {lostSectorDetail.captains.map((championData, index) => (
                championData != 0 &&
                <Box
                maxW='25vw'
                h='100%'
                bgRepeat='no-repeat'
                bgImg={'linear-gradient(90deg, rgba(14,21,27,60%) 0%, rgba(14,21,27,60%) 80%), url("'+ captainsIcons[index].icon + '")'}
                bgSize='6.2vw'
                verticalAlign='bottom'
                key={index}
                > 
                  <Flex>
                    <Box pl='3.3vw' pt='3.4vw' lineHeight='1' fontSize='3vw'><chakra.span fontStyle='italic'>x</chakra.span><chakra.span fontWeight='bold' fontSize='3.5vw'>{championData===-1?"?":championData}</chakra.span></Box>
                    <Center  pl='1.3vw' width='auto'><chakra.span fontWeight='light' fontSize='2.7vw'>{captainsIcons[index].name}</chakra.span></Center>
                  </Flex>
                </Box>
              )
            ).filter((data)=>(data)).reduce((prev, curr) => [prev,<Spacer key='spacer'/>, curr])}
          </Flex>
        </Box>
      </Flex>
      <Divider pt='1rem' opacity='0.3'/>
      <Box pt='2vw'>
        <Box w='100%'><chakra.span fontSize='2.5vw' className={style.opacityText}>修改器</chakra.span></Box>
        <Flex pt='2vw'>
          <Grid w='50%'>
            {leftModifier.map((data) => (
              <Flex h='15vw' mb='1vw'>
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
          {rightModifier.map((data) => (
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
    </>
  )
}

function LostSector({lostSectorInfo}) {
  return (
    <Center pt='3.5vw' display='grid'>
      <LostImgCard lostSectorInfo={lostSectorInfo}/>
      <LostBody lostSectorDetail={lostSectorInfo.legend}/>
      <LostBody lostSectorDetail={lostSectorInfo.master}/>
    </Center>
  )
}

function ActivityCard({activityInfo}) {
  return (
    <>
    <ImgCard imageUrl={bungieUrl(activityInfo.pgcrImage)}>
      <CardLeftBox datas={activityInfo}/>
      <Spacer><Center pl='10%' h='100%'><Divider variant='dashed'/></Center></Spacer>
      <Center w='30%' >
      <Box color='rgb(183 183 183)'>
        {activityInfo.rewards.map((data) => (
          <Flex pb='0.4vw' key={data.name}>
            <ChakraImage w='2.6vw' h='2.6vw' objectFit='cover' src={bungieUrl(data.icon)}/>
            <Center> <Text maxW='20vw' pl='0.5vw' fontSize='1.6vw' isTruncated lineHeight='1.2' >{data.name}</Text></Center>
          </Flex>
        ))}
      </Box>
      </Center>
    </ImgCard>
    {activityInfo.remark && <Text textAlign='right' fontSize='1.6vw' fontWeight='light' color='lightgray'>*开启大师模式需要芬奇声望达到18级</Text>}
    </>
  )
}

function Activitys({activitys}) {
  return (
    <>
      <Center pt='3.5vw' display='grid' pb='3.5vw'>
        {activitys.map((activityInfo) => (
          <ActivityCard activityInfo={activityInfo} key={activityInfo.name}/>
        ))}
      </Center>
    </>
  )
}

function Vendors({vendorsInfo}) {
  return (
    <>
      {Object.values(vendorsInfo).map((vendorData) => (<VendorSale vendorSale={vendorData} />))}
    </>
  )
}

function bungieUrl(url) {
  return 'https://bungie.net' + url
}

function VendorMods({mods}) {
  return (
    <Box pt='2vw'>
      <Box w='100%'><chakra.span fontSize='2.5vw' fontWeight='light' className={style.opacityText}>模组</chakra.span></Box>
      <Divider pt='1vw' opacity='0.3'/>
      <Grid pt='2vw' pl='2vw'>
        {mods.map((data) => (<Flex pl='0.2vw' pt='0.2vw' pb='2vw'>
          <Box 
            width='6.2vw' 
            h='6.2vw' 
            borderColor='rgb(145,145,145)' 
            borderWidth='0.2vw' 
            borderRadius='sm'
            mb='2vw'
            bgImage={"url(" + bungieUrl(data.icon) + ")"}
            bgSize='cover'
            key={data.name}
          > 
          {data.investmentStat && <Box w='100%' h='100%' bgSize='cover' textAlign='right' bgImage={"url(" + bungieUrl(data.investmentStat.icon) + ")"}><Text fontSize='1vw' pt='5%' pr='10%'>{data.investmentStat.value}</Text></Box>}
            {/* <ChakraImage boxSize='5.8vw' src={bungieUrl(data.icon)}/> */}
          </Box>
          <Box pl='2vw' maxW='36vw'>
            <Text fontSize='3vw' lineHeight='1.2' isTruncated>{data.name}</Text>
            <Text color='darkgrey' fontSize='2vw' whiteSpace='pre-wrap' >{data.type}</Text>
          </Box>
          <Spacer ><Divider ml='10%' variant='dashed' mt='10%' w='80%'/></Spacer>
          <Box w='35vw'>
          {data.perks.map((perk) => (<Flex pb='1vw' key={perk.name}>
              <Box>
                <ChakraImage boxSize='5vw' src={bungieUrl(perk.icon)}/>
              </Box>
              <Box pl='2vw' maxW='28vw'>
                <Text fontSize='2.4vw' lineHeight='1.2' isTruncated>{perk.name}</Text>
                <Text color='darkgrey' fontSize='1.8vw' whiteSpace='pre-wrap' >{perk.description}</Text>
              </Box>
            </Flex>
          ))}
          </Box>
        </Flex>))}
      </Grid>
    </Box>
  )
  
}

function VendorWeeklyOffer({datas}) {
  return (
    <Box pt='2vw'>
      <Box w='100%'><chakra.span fontSize='2.5vw' fontWeight='light' className={style.opacityText}>每周特惠</chakra.span></Box>
      <Divider pt='1vw' opacity='0.3'/>
      <Center>
        <Grid templateColumns='repeat(3, 1fr)' pt='2vw' gap='3vw'>
          {datas.map((data) => (
            <>
              <Box
                borderColor='rgb(65,65,65)' 
                borderWidth='0.1vw' 
                borderRadius='sm'
              >
                <Grid 
                  w='24.57vw' 
                  h='28.14vw' 
                  bgImage={data.tierTypeName=== "传说" ? 
                    "linear-gradient(rgba(0,0,0,0) 60%, rgba(81,48,101,0.5) 80%), url(" + bungieUrl(data.highResIcon) + ")" :
                    "linear-gradient(rgba(0,0,0,0) 60%, rgba(193,195,55,0.27) 80%, rgba(193,195,55,0.35) 95%), url(" + bungieUrl(data.highResIcon) + ")"
                  }
                  bgRepeat='no-repeat'
                  bgSize='24.57vw'
                > 
                {data.augments === "DAILY_OFFER" && (
                  <Flex w='100%'  h='3vw'>
                    <Box borderTop='3vw solid rgba(41,111,60,0.7)' borderLeft='3vw solid transparent'/>
                    <Spacer h='100%' bg='rgba(41,111,60,0.7)'><Center h='100%'><Text color='whiteAlpha.700' fontSize='1.3vw'>日常优惠</Text></Center></Spacer>
                    <Box borderTop='3vw solid rgba(41,111,60,0.7)' borderRight='3vw solid transparent'/>
                  </Flex>
                )}
                <Flex alignItems='flex-end'>
                  <Box pl='1vw' pb='0.7vw'>
                    <Text fontSize='2.2vw' lineHeight='1.2' isTruncated>{data.name}</Text>
                    <Text color='darkgrey' fontSize='1.85vw' whiteSpace='pre-wrap'>{data.itemTypeDisplayName}</Text>
                  </Box>
                </Flex>
                </Grid>
                <Flex pl='1vw' h='3.5vw' bgColor={data.augments === "DAILY_OFFER" ? 'rgb(41,111,60)' : 'rgb(25,25,28)'}>
                  <Center><ChakraImage w='3vw' src={bungieUrl(data.costs[0].icon)} /></Center>
                  <Center fontSize='2.2vw' pl='0.5vw' fontWeight='bold'>
                    {data.augments === "DAILY_OFFER" ? <Text textDecorationColor='rgb(255 255 255)' color='darkgrey' opacity='0.5' textDecorationLine='line-through' pr='0.8vw'>{data.originPrice}</Text> : undefined}
                    <Text >{data.costs[0].quantity.toLocaleString()}</Text>
                  </Center>
                </Flex>
              </Box>
            </>
          ))}
          
        </Grid>
      </Center>
    </Box>
  )
  
}

function VendorSale({vendorSale}) {
  return (
    <Center pt='3.5vw' display='grid'>
      <VendorImgCard vendorInfo={vendorSale}/>
      {vendorSale.sales.mods ? <VendorMods mods={vendorSale.sales.mods}/> : ''}
      {vendorSale.sales.weeklyOffer ? <VendorWeeklyOffer datas={vendorSale.sales.weeklyOffer}/> : ''}
    </Center>
  )
}

function VendorImgCard({vendorInfo}) {
  return (
    <ImgCard imageUrl={bungieUrl(vendorInfo.pgcrImage)}>
      <CardLeftBox datas={vendorInfo}/>
    </ImgCard>
  )
}

export default function today() {
  const todayData = {
    "vendorsInfo": {
      "Banshee": {
        "name": "班西-44",
        "type": "枪匠",
        "typeImg": "/common/destiny2_content/icons/3c17781a877efb9060a69211b4ac6da2.png",
        "location": "高塔 · 最后的城市",
        "pgcrImage": "/common/destiny2_content/icons/3142923bc72bcd5a769badc26bd8b508.jpg",
        "hash": 672118013,
        "sales": {
          "mods": [
            {
              "name": "徒手握把",
              "icon": "/common/destiny2_content/icons/be859239d1f36a1516b6d088001ebd32.jpg",
              "type": "武器模组",
              "investmentStat": {},
              "perks": [
                {
                  "name": "徒手握把",
                  "icon": "/common/destiny2_content/icons/c2c43470a9cd0ae5559fd68f57be5015.png",
                  "description": "提高腰际射击时的命中率和准备速度。"
                }
              ]
            },
            {
              "name": "冲刺之握",
              "icon": "/common/destiny2_content/icons/8e7b5d4045da59ca6e4ff3f56f458c1e.jpg",
              "type": "武器模组",
              "investmentStat": {},
              "perks": [
                {
                  "name": "冲刺之握",
                  "icon": "/common/destiny2_content/icons/e9fee7302d064cbff1962b80ee372a2e.png",
                  "description": "在冲刺后短暂提高武器的准备速度和瞄准速度。"
                }
              ]
            },
            {
              "name": "雷达增强装置",
              "icon": "/common/destiny2_content/icons/2a9af15b6da28299230919bee2072c53.jpg",
              "type": "武器模组",
              "investmentStat": {},
              "perks": [
                {
                  "name": "雷达增强装置",
                  "icon": "/common/destiny2_content/icons/fdd53568f2382a093478a560355ae403.png",
                  "description": "在雷达监测到敌人时，侦测范围略微提高。"
                }
              ]
            },
            {
              "name": "蜻蜓规格",
              "icon": "/common/destiny2_content/icons/bb2c1c71fa26132557b1e75515df8c45.jpg",
              "type": "武器模组",
              "investmentStat": {},
              "perks": [
                {
                  "name": "蜻蜓规格",
                  "icon": "/common/destiny2_content/icons/86c5f912278f57c5089039f9425969c3.png",
                  "description": "提高蜻蜓的爆炸范围和伤害。"
                }
              ]
            }
          ]
        }
      },
      "Ada": {
        "name": "艾达-1",
        "type": "护甲合成",
        "typeImg": "",
        "location": "高塔 · 最后的城市",
        "pgcrImage": "/common/destiny2_content/icons/f2af0324ed9aed5186fef3d3e6873b62.jpg",
        "hash": 350061650,
        "sales": {
          "mods": [
            {
              "name": "刀剑弹药储量",
              "icon": "/common/destiny2_content/icons/8981721c1297e13342148f48f9d063cd.png",
              "type": "胸部护甲模组",
              "investmentStat": {
                "name": "任意能量类型消耗",
                "icon": "/common/destiny2_content/icons/435daeef2fc277af6476f2ffb9b18bcb.png",
                "value": 2
              },
              "perks": [
                {
                  "name": "刀剑弹药储量",
                  "icon": "/common/destiny2_content/icons/8981721c1297e13342148f48f9d063cd.png",
                  "description": "提高可携带的刀剑弹药储量。"
                }
              ]
            },
            {
              "name": "狙击步枪弹药搜寻者",
              "icon": "/common/destiny2_content/icons/32501a5e9478cc1cf294aaf14de7924d.png",
              "type": "头盔护甲模组",
              "investmentStat": {
                "name": "任意能量类型消耗",
                "icon": "/common/destiny2_content/icons/435daeef2fc277af6476f2ffb9b18bcb.png",
                "value": 3
              },
              "perks": [
                {
                  "name": "狙击步枪弹药搜寻者",
                  "icon": "/common/destiny2_content/icons/32501a5e9478cc1cf294aaf14de7924d.png",
                  "description": "装备狙击步枪后，提高你找到弹药的机会。"
                }
              ]
            },
            {
              "name": "智慧洗礼",
              "icon": "/common/destiny2_content/icons/5f0f125d9e6194cf156a257f20811bc3.png",
              "type": "元素井模组",
              "investmentStat": {
                "name": "任意能量类型消耗",
                "icon": "/common/destiny2_content/icons/435daeef2fc277af6476f2ffb9b18bcb.png",
                "value": 4
              },
              "perks": [
                {
                  "name": "智慧洗礼",
                  "icon": "/common/destiny2_content/icons/5f0f125d9e6194cf156a257f20811bc3.png",
                  "description": "拾取符合你的分支职业能量类型的元素井会暂时显著提升你的智慧，提高你的超能充能速度。"
                }
              ]
            },
            {
              "name": "线性融合步枪枪套",
              "icon": "/common/destiny2_content/icons/2c4b29bb798040b2f889877276a89b52.png",
              "type": "腿部护甲模组",
              "investmentStat": {
                "name": "任意能量类型消耗",
                "icon": "/common/destiny2_content/icons/435daeef2fc277af6476f2ffb9b18bcb.png",
                "value": 4
              },
              "perks": [
                {
                  "name": "线性融合步枪枪套",
                  "icon": "/common/destiny2_content/icons/2c4b29bb798040b2f889877276a89b52.png",
                  "description": "随着时间推移，逐渐为已收起的线性融合步枪装填弹药。此特性的效果可以叠加，以缩短完全重新装弹的耗时。"
                }
              ]
            }
          ]
        }
      },
      "Tess": {
        "name": "泰斯·艾夫瑞斯",
        "type": "永恒之诗",
        "typeImg": "",
        "location": "高塔 · 最后的城市",
        "pgcrImage": "/common/destiny2_content/icons/79e6427d92328e554f585fe8886fce52.jpg",
        "hash": 3361454721,
        "sales": {
          "weeklyOffer": [
            {
              "hash": "1948636808",
              "quantity": 1,
              "name": "抓虫子",
              "icon": "/common/destiny2_content/icons/1db92ccd72d4967dc524090130fdaf92.jpg",
              "description": "",
              "highResIcon": "/common/destiny2_content/icons/bfdeabcb55c0d05a547ee9c140f0d63b.jpg",
              "iconWatermark": "/common/destiny2_content/icons/b0406992c49c84bdc5febad94048dc01.png",
              "itemTypeDisplayName": "动作",
              "tierTypeName": "异域",
              "augments": "NONE",
              "originPrice": 1000,
              "costs": [
                {
                  "hash": "3147280338",
                  "quantity": 1000,
                  "name": "银币",
                  "icon": "/common/destiny2_content/icons/f7ddbbe7fb59b0abc19029e7e75770c2.png",
                  "description": "稀有暗礁硬币是在黄金时代的巅峰时期制造的。对某些收藏家来说具有极高价值。",
                  "iconWatermark": null
                }
              ]
            },
            {
              "hash": "1326263070",
              "quantity": 1,
              "name": "星座寻踪者",
              "icon": "/common/destiny2_content/icons/e114540ef1420627bffb21292dcd72ea.jpg",
              "description": "",
              "highResIcon": "/common/destiny2_content/icons/e619be2a8091ad7c3add64cc3a407301.jpg",
              "iconWatermark": "/common/destiny2_content/icons/b0406992c49c84bdc5febad94048dc01.png",
              "itemTypeDisplayName": "飞船",
              "tierTypeName": "异域",
              "augments": "NONE",
              "originPrice": 800,
              "costs": [
                {
                  "hash": "3147280338",
                  "quantity": 800,
                  "name": "银币",
                  "icon": "/common/destiny2_content/icons/f7ddbbe7fb59b0abc19029e7e75770c2.png",
                  "description": "稀有暗礁硬币是在黄金时代的巅峰时期制造的。对某些收藏家来说具有极高价值。",
                  "iconWatermark": null
                }
              ]
            },
            {
              "hash": "1141818699",
              "quantity": 1,
              "name": "邪剑守则",
              "icon": "/common/destiny2_content/icons/13a271e3b29d955a3affb0cd352fcf21.jpg",
              "description": "装备此武器皮肤以改变挽歌的外观。你账号中的所有角色都将解锁获得的皮肤。",
              "highResIcon": "/common/destiny2_content/icons/0ebdff30d8bccb9cde763e7cf07c8f92.jpg",
              "iconWatermark": "/common/destiny2_content/icons/4fe83598190610f122497d22579a1fd9.png",
              "itemTypeDisplayName": "武器皮肤",
              "tierTypeName": "异域",
              "augments": "NONE",
              "originPrice": 700,
              "costs": [
                {
                  "hash": "3147280338",
                  "quantity": 700,
                  "name": "银币",
                  "icon": "/common/destiny2_content/icons/f7ddbbe7fb59b0abc19029e7e75770c2.png",
                  "description": "稀有暗礁硬币是在黄金时代的巅峰时期制造的。对某些收藏家来说具有极高价值。",
                  "iconWatermark": null
                }
              ]
            },
            {
              "hash": "1812891775",
              "quantity": 1,
              "name": "卡通坏蛋",
              "icon": "/common/destiny2_content/icons/760f7e6f7afee16efeaa1167d2bdabb6.jpg",
              "description": "",
              "highResIcon": "/common/destiny2_content/icons/c4f84ab8f2b87f29450c5b8469ab07c5.jpg",
              "iconWatermark": "/common/destiny2_content/icons/b0406992c49c84bdc5febad94048dc01.png",
              "itemTypeDisplayName": "动作",
              "tierTypeName": "传说",
              "augments": "NONE",
              "originPrice": 500,
              "costs": [
                {
                  "hash": "3147280338",
                  "quantity": 500,
                  "name": "银币",
                  "icon": "/common/destiny2_content/icons/f7ddbbe7fb59b0abc19029e7e75770c2.png",
                  "description": "稀有暗礁硬币是在黄金时代的巅峰时期制造的。对某些收藏家来说具有极高价值。",
                  "iconWatermark": null
                }
              ]
            },
            {
              "hash": "3898519038",
              "quantity": 1,
              "name": "合成纤维模板",
              "icon": "/common/destiny2_content/icons/b725f516cb5368dbd3c669d60f226727.png",
              "description": "选择数量",
              "highResIcon": "/common/destiny2_content/icons/1debf4b2752e3dc8dd780178e6dc0bc4.jpg",
              "iconWatermark": null,
              "itemTypeDisplayName": "",
              "tierTypeName": "传说",
              "augments": "NONE",
              "originPrice": 200,
              "costs": [
                {
                  "hash": "3147280338",
                  "quantity": 200,
                  "name": "银币",
                  "icon": "/common/destiny2_content/icons/f7ddbbe7fb59b0abc19029e7e75770c2.png",
                  "description": "稀有暗礁硬币是在黄金时代的巅峰时期制造的。对某些收藏家来说具有极高价值。",
                  "iconWatermark": null
                }
              ]
            },
            {
              "hash": "2035374481",
              "quantity": 1,
              "name": "精准打击",
              "icon": "/common/destiny2_content/icons/dc972db7e9d83b75b7b0df2268fc1a09.jpg",
              "description": "",
              "highResIcon": "/common/destiny2_content/icons/20eb92e8b62bd377d22b200e4229c0bc.jpg",
              "iconWatermark": "/common/destiny2_content/icons/d4141b2247cf999c73d3dc409f9d00f7.png",
              "itemTypeDisplayName": "动作",
              "tierTypeName": "异域",
              "augments": "DAILY_OFFER",
              "originPrice": 1000,
              "costs": [
                {
                  "hash": "3147280338",
                  "quantity": 900,
                  "name": "银币",
                  "icon": "/common/destiny2_content/icons/f7ddbbe7fb59b0abc19029e7e75770c2.png",
                  "description": "稀有暗礁硬币是在黄金时代的巅峰时期制造的。对某些收藏家来说具有极高价值。",
                  "iconWatermark": null
                }
              ]
            }
          ]
        }
      }
    },
    "activitys": [
      {
        "name": "泉源：攻击: 大师",
        "icon": "/common/destiny2_content/icons/e54a93ce3f1ba9910a391acf503dc039.png",
        "description": "在泉源处击败更有挑战性的泉源典狱官戈尔马格，以获得更好的奖励。",
        "pgcrImage": "/img/destiny_content/pgcr/wellspring_attack_one.jpg",
        "type": "攻势",
        "typeImg": "/common/destiny2_content/icons/DestinyActivityModeDefinition_f6de6d95f600f199c9a674c73cbefbcc.png",
        "location": "萨瓦图恩的王座世界",
        "rewards": [
          {
            "name": "实现（普通）",
            "icon": "/common/destiny2_content/icons/e74115740ab66d465c11d28f5332c805.jpg",
            "description": "",
            "iconWatermark": "/common/destiny2_content/icons/4fe83598190610f122497d22579a1fd9.png"
          },
          {
            "name": "高属性真相护甲（普通）",
            "icon": "/common/destiny2_content/icons/e8c52e78b005f454fd0001d871c5d3c6.jpg",
            "description": "",
            "iconWatermark": null
          },
          {
            "name": "武器模式",
            "icon": "/common/destiny2_content/icons/fb611d850608ef04b98e94b4d90071ff.png",
            "description": "获得此模式会解锁于火星飞地的圣物处打造一件新武器的能力。",
            "iconWatermark": null
          },
          {
            "name": "上维合金（罕见）",
            "icon": "/common/destiny2_content/icons/d9ebeceaf39c0e8c81664c11ccc2b1bb.jpg",
            "description": "上维合金（罕见）",
            "iconWatermark": null
          }
        ],
        "light": 1580,
        "modifiers": [
          {
            "name": "火坑",
            "icon": "/common/destiny2_content/icons/66f87aaff067d692bb8de52b6888efef.png",
            "description": "仆从被击杀后会产生一个火坑，可持续造成伤害。",
            "hash": 3831042173
          },
          {
            "name": "勇士敌人",
            "icon": "/common/destiny2_content/icons/b451685298008a9c6864ad32d1469a3b.png",
            "description": "你将面对屏障和势不可挡勇士。\n\n必须在手臂护甲上装备反屏障和反势不可挡模组以消灭他们。模组均来自于赛季神器。",
            "hash": 3649753063
          },
          {
            "name": "大师难度修改器",
            "icon": "/common/destiny2_content/icons/05546f508343b402f6499fee3b29ed5c.png",
            "description": "额外勇士\n锁定装备\n元素匹配\n额外护盾",
            "hash": 2821775453
          },
          {
            "name": "勇士：暴徒",
            "icon": "/common/destiny2_content/icons/b9955d70ff4eea2500e3972b30bbd62b.png",
            "description": "此模式包含额外的勇士。",
            "hash": 2834348323
          },
          {
            "name": "团灭",
            "icon": "/common/destiny2_content/icons/36a40c8c5becb4c848e0dea562259b5a.png",
            "description": "如果你的火力战队全部成员在限制区域倒下，所有人将被送回轨道。",
            "hash": 945795273
          },
          {
            "name": "装备锁定",
            "icon": "/common/destiny2_content/icons/3e2501508484b8531f31ca4cea497110.png",
            "description": "活动开始后，您将无法更换装备。",
            "hash": 939324719
          },
          {
            "name": "连连看",
            "icon": "/common/destiny2_content/icons/d9337bf6883df7dff9190cff413e6fde.png",
            "description": "敌人护盾对所有元素不吻合的伤害具有很强的抗性。",
            "hash": 3859784314
          },
          {
            "name": "戏弄",
            "icon": "/common/destiny2_content/icons/256f65f21e36787d0dc5088f0ad38bae.png",
            "description": "雷达已禁用。",
            "hash": 98716109
          },
          {
            "name": "护盾敌人",
            "icon": "/common/destiny2_content/icons/59b91cff990d22b6414cfad869c31591.png",
            "description": "你将面对拥有电弧、烈日及虚空护盾的战斗人员。",
            "hash": 1626706410
          }
        ],
        "remark": "*开启大师模式需要芬奇声望达到18级"
      }
    ],
    "seasonInfo": {
      "season": 16,
      "seasonName": "苏生赛季",
      "today": "2022年03月15日",
      "days": 21,
      "weeks": 3,
      "numWeeks": 15
    },
    "losts": {
      "type": "遗失区域",
      "typeImg": "/common/destiny2_content/icons/DestinyActivityModeDefinition_7d11acd7d5a3daebc0a0c906452932d6.png",
      "location": "萨瓦图恩的王座世界",
      "pgcrImage": "/img/destiny_content/pgcr/canal_ls.jpg",
      "legend": {
        "modifiers": [
          {
            "name": "传说难度修改器",
            "icon": "/common/destiny2_content/icons/45f40693f3014d50ea78d5f3f8fe2e04.png",
            "description": "锁定装备\n匹配游戏\n护盾加成",
            "hash": 2301442403
          },
          {
            "name": "烈日焦痕",
            "icon": "/common/destiny2_content/icons/d6b93bbcc169cebf7bcd314c08f7e7f0.png",
            "description": "造成和受到的烈日伤害+50%。",
            "hash": 268022564
          },
          {
            "name": "有限复活",
            "icon": "/common/destiny2_content/icons/be42fd65184d2a22579a170ff1abed28.png",
            "description": "火力战队的复活次数受限。击败勇士可获得额外的复活次数。",
            "hash": 376634891
          },
          {
            "name": "装备锁定",
            "icon": "/common/destiny2_content/icons/3e2501508484b8531f31ca4cea497110.png",
            "description": "活动开始后，您将无法更换装备。",
            "hash": 939324719
          },
          {
            "name": "连连看",
            "icon": "/common/destiny2_content/icons/d9337bf6883df7dff9190cff413e6fde.png",
            "description": "敌人护盾对所有元素不吻合的伤害具有很强的抗性。",
            "hash": 3859784314
          },
          {
            "name": "火坑",
            "icon": "/common/destiny2_content/icons/66f87aaff067d692bb8de52b6888efef.png",
            "description": "仆从被击杀后会产生一个火坑，可持续造成伤害。",
            "hash": 3831042173
          }
        ],
        "name": "传说遗失区域",
        "light": 1550,
        "shields": [
          1,
          2,
          0
        ],
        "captains": [
          3,
          0,
          1
        ]
      },
      "master": {
        "modifiers": [
          {
            "name": "大师难度修改器",
            "icon": "/common/destiny2_content/icons/05546f508343b402f6499fee3b29ed5c.png",
            "description": "额外勇士\n锁定装备\n元素匹配\n额外护盾",
            "hash": 2821775453
          },
          {
            "name": "烈日焦痕",
            "icon": "/common/destiny2_content/icons/d6b93bbcc169cebf7bcd314c08f7e7f0.png",
            "description": "造成和受到的烈日伤害+50%。",
            "hash": 268022564
          },
          {
            "name": "勇士：暴徒",
            "icon": "/common/destiny2_content/icons/b9955d70ff4eea2500e3972b30bbd62b.png",
            "description": "此模式包含额外的勇士。",
            "hash": 2834348323
          },
          {
            "name": "有限复活",
            "icon": "/common/destiny2_content/icons/be42fd65184d2a22579a170ff1abed28.png",
            "description": "火力战队的复活次数受限。击败勇士可获得额外的复活次数。",
            "hash": 376634891
          },
          {
            "name": "装备锁定",
            "icon": "/common/destiny2_content/icons/3e2501508484b8531f31ca4cea497110.png",
            "description": "活动开始后，您将无法更换装备。",
            "hash": 939324719
          },
          {
            "name": "连连看",
            "icon": "/common/destiny2_content/icons/d9337bf6883df7dff9190cff413e6fde.png",
            "description": "敌人护盾对所有元素不吻合的伤害具有很强的抗性。",
            "hash": 3859784314
          },
          {
            "name": "火坑",
            "icon": "/common/destiny2_content/icons/66f87aaff067d692bb8de52b6888efef.png",
            "description": "仆从被击杀后会产生一个火坑，可持续造成伤害。",
            "hash": 3831042173
          },
          {
            "name": "戏弄",
            "icon": "/common/destiny2_content/icons/256f65f21e36787d0dc5088f0ad38bae.png",
            "description": "雷达已禁用。",
            "hash": 98716109
          }
        ],
        "name": "大师遗失区域",
        "light": 1580,
        "shields": [
          -1,
          -1,
          0
        ],
        "captains": [
          -1,
          0,
          -1
        ]
      },
      "name": "墓冢",
      "reward": "胸甲"
    }
  }

  return (
    <Center bg='rgb(14, 21, 27)' width='100vw' color='white'>
      <Box  
        maxW='1920px' 
        width='100vw' 
        bgSize='contain' 
        bgRepeat='no-repeat' 
        padding='0rem 0px 0px' 
        bgImage={'linear-gradient(rgba(0,0,0,0) 41vw, rgba(14, 21, 27, 1) 44.7vw), url("https://images.contentstack.io/v3/assets/blte410e3b15535c144/blt58ebe92f5c2985f3/620be743510c6b1c87b8a9d7/story-bg.jpg")'}
      >
        <TodayHeader seasonInfo={todayData.seasonInfo} />
        <LostSector lostSectorInfo={todayData.losts} />
        <Activitys activitys = {todayData.activitys} />
        <Center><Divider w='90%' orientation='horizontal' pt='0.3vw' opacity='0.4'/></Center>
        <Vendors vendorsInfo={todayData.vendorsInfo} />
        <Box h='10vw' />
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
