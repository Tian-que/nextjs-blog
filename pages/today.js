import { Grid, ButtonGroup, Button, VisuallyHidden, Center, Text, Box, Divider, Img, Flex, chakra, Spacer} from "@chakra-ui/react"
import Image from "next/image"
import { Image as ChakraImage}  from "@chakra-ui/react"
import Head from "next/head"
import style from '../components/today/today.module.css'
import { cs } from "date-fns/locale"
import { SP } from "next/dist/shared/lib/utils"
import React from "react"
import { getTodayData } from "../lib/today.js"

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

function SmallImgCard({imageUrl, children, ...props}) {
  return (
  <Flex 
    width='85vw' 
    h='10vw' 
    borderColor='rgb(60,60,60)' 
    borderWidth='0.2vw' 
    borderRadius='sm'
    bgImg={'linear-gradient(90deg, rgb(14, 21, 27) 0%, rgba(0,0,0,0.5) 35%), url("'+imageUrl+'")'}
    bgSize='40vw'
    bgClip='content-box'
    bgPos='right center'
    bgRepeat='no-repeat'
    {...props}
    // bgGradient='linear(to-r, rgba(14, 21, 27, 1) 40%, rgba(14, 21, 27, 0))'
  >
    {children}
  </Flex>)
}

function SmallCardLeftBox({datas, ...props}) {
  return (
    <Box
      maxW='60%'
      h='100%'
      bgRepeat='no-repeat'
      bgSize='10vw'
      bgPos = '5vw center'
      bgImg={datas.typeImg ? 'linear-gradient(90deg, rgba(14,21,27,85%) 0%, rgba(14,21,27,85%) 80%), url("' + bungieUrl(datas.typeImg) + '")': ''}
      {...props}
    >
      <Center pl='3vw' h='100%'>
        <Flex >
          <Text fontSize='4vw' lineHeight='1.3' fontWeight='light' >{datas.name}</Text>
          <Box ml='0.8vw' mr='0.8vw' w='0.2vw' bg='cyan.200' color='white'/>
        </Flex> 
        
        <Grid templateRows='repeat(2, 1fr)'>
          <Text fontSize='2.1vw' fontWeight='light' className={style.vendorOpacityText}>{datas.type}</Text>
          <Flex><Center>
            {/* TODO: 动态显示目的地图标 */}
            <ChakraImage boxSize='2vw' className={style.opacityText} src='https://bungie.net/common/destiny2_content/icons/c60303e278aa5fc566a04e98c3d8024c.png' />
            <Text pl='0.2vw' fontSize='1.6vw' fontWeight='light' className={style.vendorOpacityText}>{datas.location}</Text>
          </Center></Flex>
        </Grid>
      </Center>
    </Box>
  )
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
    <>
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
      {lostSectorInfo.remark && <Text pb='0.5vw' textAlign='right' fontSize='1.6vw' fontWeight='light' color='lightgray'>{lostSectorInfo.remark}</Text>}
    </>
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
                <Box  pt='2.5vw' textAlign='right' fontSize='3vw'><chakra.span fontStyle='italic'>x</chakra.span><chakra.span fontWeight='bold' fontSize='3.5vw'>{shieldData===-1?"?":shieldData}</chakra.span></Box>
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
    {activityInfo.remark && <Text textAlign='right' fontSize='1.6vw' fontWeight='light' color='lightgray'>{activityInfo.remark}</Text>}
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
      {Object.values(vendorsInfo).map((vendorData) => (<VendorSale key={vendorData.name} vendorSale={vendorData} />))}
    </>
  )
}

function bungieUrl(url) {
  return 'https://bungie.net' + url
}

function VendorMods({mods, vendorName}) {
  return (
    <Box pt='2vw'>
      <Box w='100%'><chakra.span fontSize='2vw' fontWeight='light' className={style.opacityText}>模组</chakra.span></Box>
      <Divider pt='1vw' opacity='0.3'/>
      {vendorName==='班西-44' ? 
        <Grid pl='3.5vw' pt='2vw' templateColumns='repeat(4, 1fr)' gap='1vw'>
        {mods.map((data) => (
          <Box pb='2vw' key={data.name}>
            <Flex>
            <Box 
              width='5vw' 
              h='5vw' 
              borderColor='rgb(145,145,145)' 
              // borderWidth='0.2vw' 
              borderRadius='sm'
              bgImage={"url(" + bungieUrl(data.icon) + ")"}
              bgSize='cover'
              
            >
            </Box>
            <Box pl='0.5vw' maxW='15vw'>
              <Text fontSize='2vw' lineHeight='1.2' isTruncated>{data.name.startsWith("购买") ? data.name.slice(2) : data.name}</Text>
              <Text color='darkgrey' fontSize='2vw' whiteSpace='pre-wrap' >{data.type}</Text>
            </Box>
            </Flex>
          </Box>
        ))}
        </Grid>:
      <Grid pt='2vw' pl='2vw'>
        {mods.map((data) => (<Flex pl='0.2vw' pt='0.2vw' pb='2vw'>
          <Box 
            width='6.2vw' 
            h='6.2vw' 
            borderColor='rgb(145,145,145)' 
            // borderWidth='0.2vw' 
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
      }
      
    </Box>
  )
  
}

function VendorWeeklyOffer({datas}) {
  return (
    <Box pt='2vw' pb='3vw'>
      <Box w='100%'><chakra.span fontSize='2vw' fontWeight='light' className={style.opacityText}>日常优惠</chakra.span></Box>
      <Divider pt='1vw' opacity='0.3'/>
      <Center>
        <Grid templateColumns='repeat(3, 1fr)' pt='2vw' gap='3vw'>
          {datas.slice(-1).map((data) => (
            <Box
              borderColor='rgb(65,65,65)' 
              borderWidth='0.1vw' 
              borderRadius='sm'
              key={data.name}
            >
              <Grid 
                w='24.57vw' 
                h='28.14vw' 
                bgImage={data.tierTypeName=== "传说" ? 
                  "linear-gradient(rgba(0,0,0,0) 60%, rgba(81,48,101,0.5) 80%), url(" + bungieUrl(data.highResIcon || data.icon) + ")" :
                  "linear-gradient(rgba(0,0,0,0) 60%, rgba(193,195,55,0.27) 80%, rgba(193,195,55,0.35) 95%), url(" + bungieUrl(data.highResIcon || data.icon) + ")"
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
          ))}
        </Grid>
      </Center>
    </Box>
  )
  
}

function VendorTrades({datas}) {
  return (
    <Box pt='2vw'>
      {datas.map((categoryInfo) => {
        if (!categoryInfo.display) return undefined
        const saleDatas = categoryInfo.items
        return (
          <React.Fragment key={categoryInfo.name}>
            <Box w='100%'><chakra.span fontSize='2vw' fontWeight='light' className={style.opacityText}>{categoryInfo.name}</chakra.span></Box>
            <Divider pt='1vw' opacity='0.3'/>
            <Grid pl='3.5vw' pt='2vw' templateColumns='repeat(4, 1fr)' gap='1vw'>
            {saleDatas.map((data) => (
              <Box pb='2vw' key={data.name}>
                <Flex>
                <Box 
                  width='5vw' 
                  h='5vw' 
                  borderColor='rgb(145,145,145)' 
                  borderWidth='0.2vw' 
                  borderRadius='sm'
                  bgImage={"url(" + bungieUrl(data.icon) + ")"}
                  bgSize='cover'
                  
                >
                </Box>
                <Box pl='0.5vw' maxW='11vw'>
                  <Text fontSize='2vw' lineHeight='1.2' isTruncated>{data.name.startsWith("购买") ? data.name.slice(2) : data.name}</Text>
                  <Text color='darkgrey' fontSize='2vw' whiteSpace='pre-wrap' >{data.quantity.toLocaleString()}</Text>
                </Box>
                </Flex>
              <Spacer opacity='0.4' pt='0.5vw'><Divider maxW='16vw'/></Spacer>
              <Box fontSize='1.5vw'>
                {data.costs.map((cost) => (
                  <Flex maxW='16vw' key={cost.name}>
                    <Text color='darkgrey'>{cost.quantity.toLocaleString()}</Text>
                    <Spacer/>
                    <Flex>
                      <Center>
                        <ChakraImage boxSize='1.5vw' src={bungieUrl(cost.icon)} />
                        <Text pl='0.3vw' color='darkgrey'>{cost.name}</Text>
                      </Center>
                    </Flex>
                    
                    
                  </Flex>
                ))}
              </Box>
              </Box>
            ))}
            </Grid>
          </React.Fragment>
        )
      })}
    </Box>
  )
  
}

function VendorBrightDust({datas}) {
  return (
    <Box pt='2vw'>
      <Box w='100%'><chakra.span fontSize='2vw' fontWeight='light' className={style.opacityText}>光尘</chakra.span></Box>
      <Divider pt='1vw' opacity='0.3'/>
      <Grid pl='3.5vw' pt='2vw' templateColumns='repeat(3, 1fr)' gap='1vw'>
      {datas.map((data) => (
        <Box pb='2vw' key={data.name}>
          <Flex>
          <Box 
            width='5vw' 
            h='5vw' 
            borderColor='rgb(145,145,145)' 
            borderWidth='0.2vw' 
            borderRadius='sm'
            bgImage={"url(" + bungieUrl(data.icon) + ")"}
            bgSize='cover'
            
          >
            {data.iconWatermark && <ChakraImage  src={bungieUrl(data.iconWatermark)}/> }
          </Box>
          <Box pl='0.8vw' maxW='90%'>
            <Text fontSize='2vw' lineHeight='1.2' isTruncated>{data.name.startsWith("购买") ? data.name.slice(2) : data.name}</Text>
            <Text color='darkgrey' fontSize='1.7vw' whiteSpace='pre-wrap' >{data.itemTypeDisplayName}</Text>
          </Box>
          </Flex>
        <Spacer opacity='0.4' pt='0.5vw'><Divider maxW='70%'/></Spacer>
        <Box fontSize='1.5vw'>
          {data.costs.map((cost) => (
            <Flex maxW='70%' key={cost.name}>
              <Text color='darkgrey'>{cost.quantity.toLocaleString()}</Text>
              <Spacer/>
              <Flex>
                <Center>
                  <ChakraImage boxSize='1.5vw' src={bungieUrl(cost.icon)} />
                  <Text pl='0.3vw' color='darkgrey'>{cost.name}</Text>
                </Center>
              </Flex>
              
              
            </Flex>
          ))}
        </Box>
        </Box>
      ))}
      </Grid>
    </Box>
  )
}

function VendorBountys({datas}) {
  return (
    <Box pt='2vw'>
      <Box w='100%'><chakra.span fontSize='2vw' fontWeight='light' className={style.opacityText}>梦城每日挑战</chakra.span></Box>
      <Divider pt='1vw' opacity='0.3'/>
      <Grid pt='2vw' pl='2vw'>
        {datas.map((data) => (<Flex pl='0.2vw' pt='0.2vw' pb='2vw' key={data.name}>
          <Box 
            width='6.2vw' 
            h='6.2vw' 
            borderColor='rgb(145,145,145)' 
            // borderWidth='0.2vw' 
            borderRadius='sm'
            mb='2vw'
            bgImage={"url(" + bungieUrl(data.icon) + ")"}
            bgSize='cover'
            key={data.name}
          > 
          </Box>
          <Box pl='2vw' maxW='35%'>
            <Text fontSize='3vw' lineHeight='1.2' isTruncated>{data.name}</Text>
            <Text color='darkgrey' fontSize='1.6vw' whiteSpace='pre-wrap' >{data.description}</Text>
          </Box>
          <Spacer ><Divider ml='10%' variant='dashed' mt='10%' w='80%'/></Spacer>
          <Box maxW='30%' minW='20%' pr='5%' pt='0.3vw'>
          <Text fontSize='1.85vw' lineHeight='1.2' isTruncated>步骤</Text>
          <Divider pt='0.2vw' />
          {data.progress.map((text) => (
            <Flex key={text} pt='0.3vw' >
              <Box mt='0.2vw' borderColor='rgb(145,145,145)' borderWidth='0.14vw' w='1.6vw' h='1.6vw' />
              <Text pl='0.4vw' fontSize='1.6vw' lineHeight='1.2' >{text}</Text>
            </Flex>
          ))}
          
          </Box>
        </Flex>))}
      </Grid>
      
    </Box>
  )
  
}

function VendorSale({vendorSale}) {
  return (
    <Center pt='3.5vw' display='grid'>
      <VendorImgCard vendorInfo={vendorSale}/>
      {vendorSale.sales.mods ? <VendorMods mods={vendorSale.sales.mods} vendorName={vendorSale.name}/> : ''}
      {/* {vendorSale.sales.brightDust ? <VendorBrightDust datas={vendorSale.sales.brightDust}/> : ''} */}
      {vendorSale.sales.weeklyOffer ? <VendorWeeklyOffer datas={vendorSale.sales.weeklyOffer}/> : ''}
      {vendorSale.sales.trades ? <VendorTrades datas={vendorSale.sales.trades}/> : ''}
      {vendorSale.sales.bountys ? <VendorBountys datas={vendorSale.sales.bountys}/> : ''}
    </Center>
  )
}

function VendorImgCard({vendorInfo}) {
  return (
    <SmallImgCard imageUrl={bungieUrl(vendorInfo.pgcrImage)}>
      <SmallCardLeftBox datas={vendorInfo}/>
    </SmallImgCard>
  )
}

function TQInfo () {
  return (
    <div style={{padding: "10px 0px 10px 30px", fontSize: "1.6vw", background: "hsl(0deg 0% 100% / 0%)"}}>
      <span style={{color: "lightgray", fontWeight: "lighter", margin: "0px", paddingRight: "20px"}}>Source: https://data.tianque.top/today</span>
      <span style={{color: "lightgray", fontWeight: "lighter", margin: "0px", paddingRight: "30px", float:"right"}}>Design By @天阙</span>
      <span style={{color: "lightgray", fontWeight: "lighter", margin: "0px", paddingRight: "30px", float:"right"}}>Publish to Heybox @今日的命运2</span>
    </div>
  )
}

function Today({todayData}) {
  return (
    <Center bg='rgb(14, 21, 27)' width='100vw' color='white'>
      <Box  
        maxW='1920px' 
        width='100vw' 
        bgSize='contain' 
        bgRepeat='no-repeat' 
        padding='0rem 0px 0px' 
        bgImage={'linear-gradient(rgba(0,0,0,0) 41vw, rgba(14, 21, 27, 1) 44.7vw), url("https://images.contentstack.io/v3/assets/blte410e3b15535c144/blt424c8616f9894efe/62fc0240da3c526fe6314690/s18-hero.jpg")'}
      >
        <TodayHeader seasonInfo={todayData.seasonInfo} />
        {todayData.losts ? <LostSector lostSectorInfo={todayData.losts} /> : ''}
        <Activitys activitys = {todayData.activitys} />
        <Center><Divider w='90%' orientation='horizontal' pt='0.3vw' opacity='0.4'/></Center>
        <Vendors vendorsInfo={todayData.vendorsInfo} />
        <TQInfo />
      </Box>
    </Center>
  )
}

export default function GetTodayReport() {
  const { data, isLoading, isError } = getTodayData()
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed to load</div>
  return <Today todayData={data} />
}

// export default function WeaponTable() {
//   return (
//     <Layout>
//       <Center maxW='100%' mt='10'>
//           <Box maxW='100%' height='85vh' borderWidth='1px' borderRadius='lg' textAlign='center' overflowY='auto'>
//             {/* <Scrollbars style={{width: '100vh'}}> */}
//               <GetTable />
//             {/* </Scrollbars> */}
//           </Box>
//       </Center>
//     </Layout>
//   )
// }
