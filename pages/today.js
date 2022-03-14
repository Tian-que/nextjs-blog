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
          <Box fontSize='7.2vw' pt='3vw' fontWeight='bold'>
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
        <Text fontSize='2vw' fontWeight='light' className={style.opacityText}>{datas.type}</Text>
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
          {data.perks.map((perk) => (<Flex pb='1vw'>
              <Box>
                <ChakraImage boxSize='5vw' src={bungieUrl(perk.icon)}/>
              </Box>
              <Box pl='2vw' maxW='28vw'>
                <Text fontSize='2.4vw' lineHeight='1.2' isTruncated>{perk.name}</Text>
                <Text color='darkgrey' fontSize='1.6vw' whiteSpace='pre-wrap' >{perk.description}</Text>
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
      <Center>
        <Grid templateColumns='repeat(3, 1fr)' pt='2vw' pl='2vw' gap='3vw'>
          {datas.map((data) => (
            <>
              <Box
                borderColor='rgb(65,65,65)' 
                borderWidth='0.1vw' 
                borderRadius='sm'
              >
                <Flex 
                  w='24.57vw' 
                  h='28.14vw' 
                  bgImage={data.tierTypeName=== "传说" ? 
                    "linear-gradient(rgba(0,0,0,0) 60%, rgba(81,48,101,0.5) 80%), url(" + bungieUrl(data.highResIcon) + ")" :
                    "linear-gradient(rgba(0,0,0,0) 60%, rgba(193,195,55,0.27) 80%, rgba(193,195,55,0.35) 95%), url(" + bungieUrl(data.highResIcon) + ")"
                  }
                  bgRepeat='no-repeat'
                  bgSize='24.57vw'
                  alignItems='flex-end'
                > 
                  <Box pl='1vw' pb='0.7vw'>
                    <Text fontSize='2.4vw' lineHeight='1.2' isTruncated>{data.name}</Text>
                    <Text color='darkgrey' fontSize='2.1vw' whiteSpace='pre-wrap'>{data.itemTypeDisplayName}</Text>
                  </Box>
                </Flex>
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
              "name": "首领规格",
              "icon": "/common/destiny2_content/icons/fad820780bbac2625070353769c628ef.jpg",
              "type": "武器模组",
              "investmentStat": {},
              "perks": [
                {
                  "name": "首领规格",
                  "icon": "/common/destiny2_content/icons/3380d1210d16224ca4fcd5da53915a97.png",
                  "description": "提高对首领和载具的伤害。"
                }
              ]
            },
            {
              "name": "巨型规格",
              "icon": "/common/destiny2_content/icons/4e3573080845b4ee9efcb000d4924cb0.jpg",
              "type": "武器模组",
              "investmentStat": {},
              "perks": [
                {
                  "name": "巨型规格",
                  "icon": "/common/destiny2_content/icons/5e307dc4bc85203b7c53361da1056071.png",
                  "description": "对强大敌人造成额外伤害。"
                }
              ]
            },
            {
              "name": "雷达调谐器",
              "icon": "/common/destiny2_content/icons/c0f1d2d9d818cee5c740fa6123730b54.jpg",
              "type": "武器模组",
              "investmentStat": {},
              "perks": [
                {
                  "name": "雷达调谐器",
                  "icon": "/common/destiny2_content/icons/938ce3e896b8256ce99cf62a392d6bae.png",
                  "description": "当停止瞄准时雷达立即返回。"
                }
              ]
            },
            {
              "name": "狂暴规格",
              "icon": "/common/destiny2_content/icons/b3eadd1fcadf34e389fad3e7a75acc26.jpg",
              "type": "武器模组",
              "investmentStat": {},
              "perks": [
                {
                  "name": "狂暴规格",
                  "icon": "/common/destiny2_content/icons/e2441c317ca4f0f6424d7ba267c41509.png",
                  "description": "提高狂暴的持续时间。"
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
              "name": "特殊终结技",
              "icon": "/common/destiny2_content/icons/36540b55b40a64b4448375d8d32b144c.png",
              "type": "职业物品护甲模组",
              "investmentStat": {
                "name": "任意能量类型消耗",
                "icon": "/common/destiny2_content/icons/435daeef2fc277af6476f2ffb9b18bcb.png",
                "value": 2
              },
              "perks": [
                {
                  "name": "特殊终结技",
                  "icon": "/common/destiny2_content/icons/d08168682e56610f9bb8972fcbd94a70.png",
                  "description": "终结技可为整个火力战队生成特殊武器弹药。需要1/3的超能能量。"
                }
              ]
            },
            {
              "name": "狙击步枪瞄准性能",
              "icon": "/common/destiny2_content/icons/9aee84e9176a73dc541bc34629e0a233.png",
              "type": "头盔护甲模组",
              "investmentStat": {
                "name": "任意能量类型消耗",
                "icon": "/common/destiny2_content/icons/435daeef2fc277af6476f2ffb9b18bcb.png",
                "value": 5
              },
              "perks": [
                {
                  "name": "狙击步枪瞄准性能",
                  "icon": "/common/destiny2_content/icons/9aee84e9176a73dc541bc34629e0a233.png",
                  "description": "改善狙击步枪的目标捕获能力、精度和瞄准速度。"
                }
              ]
            },
            {
              "name": "额外备弹",
              "icon": "/common/destiny2_content/icons/fc70edeb4ce73caf4021b67c0017794b.png",
              "type": "充斥光能模组",
              "investmentStat": {
                "name": "虚空消耗",
                "icon": "/common/destiny2_content/icons/32a1a3e44cbbe2b484b9c926d9dc1f08.png",
                "value": 3
              },
              "perks": [
                {
                  "name": "额外备弹",
                  "icon": "/common/destiny2_content/icons/fc70edeb4ce73caf4021b67c0017794b.png",
                  "description": "当充斥光能的时候， 以虚空伤害消灭敌方战斗人员将有几率掉落特殊弹药。此效果 消耗全部层数 的光之充能。消耗的层数越多，掉落特殊弹药的几率越高。"
                },
                {
                  "name": "属性惩罚",
                  "icon": "/common/destiny2_content/icons/311e5a5445558bf978ab3c743b714840.png",
                  "description": "-10 智慧▼"
                }
              ]
            },
            {
              "name": "强袭之井",
              "icon": "/common/destiny2_content/icons/b62691264aef6a401505c09812b10d90.png",
              "type": "元素井模组",
              "investmentStat": {
                "name": "电弧消耗",
                "icon": "/common/destiny2_content/icons/6c9c49d0f718f1499c8ced1ecf7c51fb.png",
                "value": 1
              },
              "perks": [
                {
                  "name": "强袭之井",
                  "icon": "/common/destiny2_content/icons/b62691264aef6a401505c09812b10d90.png",
                  "description": "拾取一个电弧元素井会赋予你额外近战能量。多个此模组会增强此效果。"
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
                  "description": "稀有暗礁硬币是在黄金时代的巅峰时期制造的。对某些收藏家来说具有极高价值。"
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
                  "description": "稀有暗礁硬币是在黄金时代的巅峰时期制造的。对某些收藏家来说具有极高价值。"
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
                  "description": "稀有暗礁硬币是在黄金时代的巅峰时期制造的。对某些收藏家来说具有极高价值。"
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
                  "description": "稀有暗礁硬币是在黄金时代的巅峰时期制造的。对某些收藏家来说具有极高价值。"
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
                  "description": "稀有暗礁硬币是在黄金时代的巅峰时期制造的。对某些收藏家来说具有极高价值。"
                }
              ]
            },
            {
              "hash": "2167929971",
              "quantity": 1,
              "name": "垫球扣杀",
              "icon": "/common/destiny2_content/icons/266e206f82bca204cff66e7d9084c406.jpg",
              "description": "[终结技]  ：终结重伤的战斗人员。",
              "highResIcon": "/common/destiny2_content/icons/d50659174128380a2ccb3b6db308e0e6.jpg",
              "iconWatermark": "/common/destiny2_content/icons/796813aa6cf8afe55aed4efc2f9c609b.png",
              "itemTypeDisplayName": "终结技",
              "tierTypeName": "传说",
              "augments": "DAILY_OFFER",
              "originPrice": 800,
              "costs": [
                {
                  "hash": "3147280338",
                  "quantity": 700,
                  "name": "银币",
                  "icon": "/common/destiny2_content/icons/f7ddbbe7fb59b0abc19029e7e75770c2.png",
                  "description": "稀有暗礁硬币是在黄金时代的巅峰时期制造的。对某些收藏家来说具有极高价值。"
                }
              ]
            }
          ]
        }
      }
    },
    "seasonInfo": {
      "season": 16,
      "seasonName": "苏生赛季",
      "today": "2022年03月14日",
      "days": 20,
      "weeks": 3,
      "numWeeks": 15
    },
    "losts": {
      "type": "遗失区域",
      "typeImg": "/common/destiny2_content/icons/DestinyActivityModeDefinition_7d11acd7d5a3daebc0a0c906452932d6.png",
      "location": "萨瓦图恩的王座世界",
      "pgcrImage": "/img/destiny_content/pgcr/bayou_ls.jpg",
      "legend": {
        "modifiers": [
          {
            "name": "传说难度修改器",
            "icon": "/common/destiny2_content/icons/45f40693f3014d50ea78d5f3f8fe2e04.png",
            "description": "锁定装备\n匹配游戏\n护盾加成",
            "hash": 2301442403
          },
          {
            "name": "电弧焦痕",
            "icon": "/common/destiny2_content/icons/06c9be8e7f4e871bb9e301460a9e6ca7.png",
            "description": "造成和受到的电弧伤害+50%。",
            "hash": 643494161
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
            "name": "焦灼大地",
            "icon": "/common/destiny2_content/icons/c06e7282a6f5f109a58a0489c8995413.png",
            "description": "敌人的手雷将投掷的更为频繁。",
            "hash": 3935318377
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
          0,
          3,
          2
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
            "name": "电弧焦痕",
            "icon": "/common/destiny2_content/icons/06c9be8e7f4e871bb9e301460a9e6ca7.png",
            "description": "造成和受到的电弧伤害+50%。",
            "hash": 643494161
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
            "name": "焦灼大地",
            "icon": "/common/destiny2_content/icons/c06e7282a6f5f109a58a0489c8995413.png",
            "description": "敌人的手雷将投掷的更为频繁。",
            "hash": 3935318377
          },
          {
            "name": "羸弱",
            "icon": "/common/destiny2_content/icons/3776182414b5df7ea146b2c9b131a572.png",
            "description": "生命值恢复速度显著降低。消灭敌人可能产生光能源泉。",
            "hash": 3766694338
          }
        ],
        "name": "大师遗失区域",
        "light": 1580,
        "shields": [
          2,
          2,
          0
        ],
        "captains": [
          0,
          3,
          4
        ]
      },
      "name": "蜕变",
      "reward": "臂甲"
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
        <LostSector lostSectorInfo={todayData.losts}/>
        <Center><Divider w='90%' orientation='horizontal' pt='0.3vw' opacity='0.4'/></Center>
        <Vendors vendorsInfo={todayData.vendorsInfo}/>
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
