import React from 'react';
import style from './weaponDisplay.module.css'
import heavy from '../destiny-icons/general/ammo-heavy.svg';
import primary from '../destiny-icons/general/ammo-primary.svg';
import special from '../destiny-icons/general/ammo-special.svg';
import { damageTypeNameByEnum, damageTypeUrlByEnum } from './svgs/damageTypes.js';

// 武器水印
class WeaponIconWatermark extends React.Component{
  render() {
    return (
      <div>
        <img src={bungieUrl(this.props.img)} className={style.itemImg} alt=""/>
        <img src={bungieUrl(this.props.watermark)} className={style.itemWatermark} alt=""/>
      </div>
    )
  }
}

// 武器伤害类型
class WeaponDamageTypes extends React.Component{
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div style={{display: "flex", position:"relative"}}>
        <div style={{hight:"10px", width: "30px", border: "5px",position:"relative" , left: "3px"}} >
          <img src={damageTypeUrlByEnum[this.props.defaultDamageType]} style={{hight:"10px", width: "30px", paddingTop: "5px"}} alt=''/>
        </div>
      </div>
    )
  }
}

// 武器基础信息
class WeaponInfo extends React.Component{
  render() {
    document.title = this.props.data.name
    let sourceInfo = ''
    if (this.props.data.sourceString) {
      sourceInfo = (
        <div style={{padding: "10px 0px 10px 50px", background: (this.props.data.tierTypeName === '异域') ? "rgb(157 134 47)" : "rgb(71, 78, 129)"}}>
          <h3 className={style.flavorText}> {this.props.data.sourceString}</h3>
        </div>
      )
    }
    const background = (this.props.data.tierTypeName === '异域') ? "#c3a019" : "#513065"
    const typeNameColor = (this.props.data.tierTypeName === '异域') ? "antiquewhite" : "lightgray"
    return (
      <div>
        <div style={{padding: "50px 0px 30px 50px", background: background}}>
          <div style={{display: 'flex', height: "102px"}}>
            <WeaponIconWatermark img = {this.props.data.icon} watermark = {this.props.data.iconWatermark}/> 
            <div style={{position: "relative", left: "20px"}}>
              <h2 className={style.weaponName}>{this.props.data.name}</h2>
              <h2 style={{color: typeNameColor}} className={style.itemTypeDisplayName}>{this.props.data.itemTypeDisplayName}</h2>
            </div>
            <div style={{position: "relative", left: "30px", top: "3px"}}>
              <img src={ammoIcons[this.props.data.ammoType]} style={{hight:"35.7px", width: "40px"}} alt=''/>
              <WeaponDamageTypes defaultDamageType = {this.props.data.defaultDamageType}/>
            </div>
          </div>
        <span style={{float:"right", color: typeNameColor, paddingRight:"10px"}}>S{this.props.data.season}</span>
        </div>
        {sourceInfo}
        <div style={{padding: "10px 0px 10px 50px", background: "rgb(51 50 66)"}}>
          <h3 className={style.flavorText}> {this.props.data.flavorText}</h3>
        </div>
      </div>
    )
  }
}

// 武器辅助图标
class WeaponSecondaryIcon extends React.Component{
  render() {
    if (this.props.data){
      return (
        <img src={bungieUrl(this.props.data)} className={style.weaponSecondaryIcon} alt=""/>
      )
    } else {
      return ''
    }
  }
}

class WeaponPlugs extends React.Component{
  render() {
    const borderSize = this.props.mod === "l" ? "72px" : "54px"
    const imgSize = this.props.mod === "l" ? "58px" : "48px"
    const marginSize = this.props.mod === "l" ? "5px" : "1px"
    const fontsize = this.props.mod === "l" ? "18px" : "16px"
    const fontWidth = this.props.mod === "l" ? "100px" : "80px"
    let plugIconDiv = this.props.plugs.map((plug) => {
      return (
        <div className={style.plugInfo} >
          <div className={style.plugBorder} style={{width: borderSize, height: borderSize}}>
            <img src= {bungieUrl(plug.icon)} style={{width: imgSize, height: imgSize, top: marginSize, left: marginSize}} className={style.plugImg} alt=''/>
          </div>
          <span className={style.plugName} style={{fontSize: fontsize, width: fontWidth}}>{plug.name}</span>
        </div>
      )
    })
    return <div style={{position:"relative", left: "0px", top: "0px"}}>{plugIconDiv}</div>
  }
}

// 武器特性
class WeaponFeatures extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    const max = Math.max(...this.props.data.武器特性.map(x => x.length))
    const mod = (this.props.data.武器特性.length <= 4) ? 'l' : 's'
    const plugHight = (mod === 'l')? 82 : 64
    const linkSLeft = (mod === 'l')? "0px" : "6px"
    let heightSize = max * plugHight + 20
    // const top =  String(Math.min((1080 - heightSize - 45)/2, 110)) + "px"
    const SocektsDivs = this.props.data.武器特性.map((socekts) => {
      return (
        <WeaponPlugs plugs={socekts} mod={mod}/>
      )
    }).reduce((prev, curr) => [prev,<div style={{height:String(heightSize - 24) + "px", left:linkSLeft}} className={style.linkS}></div> , curr])
    return (
      <div className={style.weaponFeatures} style={{top: "10px"}}>
        <h3  className={style.featuresText}>武器特性</h3>
        <div className={style.linkH}></div>
        {/* <div style={{top: "53px", width: "750px", height: height}} className={style.filtered}></div> */}
        <div style={{display: "flex", top: "15px", position: "relative"}}>
          {SocektsDivs}
        </div>
      </div>
    )
  }
}

class WeaponFeaturesEx extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    const max = this.props.data.武器特性.length
    let heightSize = max * 105 + 20
    const height = String(heightSize) + "px"
    const top =  String(Math.min((1080 - heightSize - 45)/2, 110)) + "px"

    // const SocektsDivs = this.props.data.武器特性.map((socekts) => {
    //   return (
    //     <WeaponPlugs plugs={socekts} mod = {mod}/>
    //   )
    // }).reduce((prev, curr) => [prev,<div style={{height: String(heightSize - 24) + "px"}} className={style.linkS}></div> , curr])

    const SocektsDivs2 = this.props.data.武器特性.map((socekts) => {
      return (
        <div style={{position: "relative" ,top: "17px", left: "10px", display: "flex", margin: "0 0 20px"}}>
          <img src= {bungieUrl(socekts[0].icon)} className={style.inherentPlugImg} alt=''/>
          <div style={{position: "relative" ,left: "15px", top: "12px"}}>
            <div style={{color: "white"}}>{socekts[0].name}</div>
            <div style={{color: "gainsboro", whiteSpace: "pre-wrap", fontFamily: "Destiny2", width: "600px", margin:"5px 0"}}>{socekts[0].description}</div>
          </div>
        </div>
      )
    }).reduce((prev, curr) => [prev,<div style={{borderTop: "dashed darkgray 1px", left: "15px", width: "700px", marginTop: "30px"}} className={style.linkH}></div> , curr])
    return (
      <div className={style.weaponFeatures}>
        <h3  className={style.featuresText}>武器特性</h3>
        <div className={style.linkH}></div>
        {/* <div style={{top: "53px", width: "710px", height: "600px", opacity: "0.5", background: "rgb(56 56 64)"}} className={style.filtered}></div> */}
        <div style={{top: "15px", position: "relative", left: "-15px"}}>
          {SocektsDivs2}
        </div>
      </div>
    )
  }
}

// 武器属性
class WeaponStats extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      stats: props.stats,
      drawStats: ['伤害', '射程', '稳定性', '操控性', '填装速度', '辅助瞄准', '变焦', '物品栏空间', '爆炸范围'],
      strStats: Object.keys(props.stats).filter((item) => {
        if (['伤害', '射程', '稳定性', '操控性', '填装速度', '辅助瞄准', '变焦', '物品栏空间', '爆炸范围', '攻击', '能量'].includes(item)) {
          return false
        } else {
          return true
        }
      })
    }
  }
  render() {
    const leftStats = ['伤害', '射程', '稳定性', '操控性', '填装速度', '每分钟发射数', '弹匣', '充能时间', '蓄力时间']
    const rightStats = Object.keys(this.props.stats).filter((item) => {
      if (['伤害', '射程', '稳定性', '操控性', '填装速度', '每分钟发射数', '弹匣', '充能时间', '蓄力时间', '攻击', '能量'].includes(item)) {
        return false
      } else {
        return true
      }
    })
    const leftDrawStatsDiv = this.state.drawStats.map((statName) => {
      if (this.state.stats[statName] && leftStats.includes(statName)) {
        return (
          <div style={{display: "flex", padding: "3px 0"}}>
            <span style={{width: "120px", textAlign: "right", fontSize: "20px", fontWeight: "lighter"}}>{statName}</span>
            <div style={{width: this.state.stats[statName] * 1.6}} className={style.statsForeground}/>
            <div className={style.statsBackground} style={{width: 160 - (this.state.stats[statName] * 1.6)}}/>
            <span className={style.statsNum} style={{left: '25px'}}>{ this.state.stats[statName]}</span>
          </div>
        )
      }
      else
        return false
    })
    const rightDrawStatsDiv = this.state.drawStats.map((statName) => {
      if (this.state.stats[statName] && rightStats.includes(statName)) {
        return (
          <div style={{display: "flex", padding: "3px 0"}}>
            <span style={{width: "120px", textAlign: "right", fontSize: "20px", fontWeight: "lighter"}}>{statName}</span>
            <div style={{width: this.state.stats[statName] * 1.6}} className={style.statsForeground}/>
            <div className={style.statsBackground} style={{width: 160 - (this.state.stats[statName] * 1.6)}}/>
            <span className={style.statsNum} style={{left: '25px'}}>{ this.state.stats[statName]}</span>
          </div>
        )
      }
      else
        return false
    })
    const leftStrStatsDiv = this.state.strStats.map((statName) => {
      if (this.state.stats[statName] && leftStats.includes(statName)) {
        return (
          <div style={{display: "flex", padding: "3px 0"}}>
            <span style={{width: "120px", textAlign: "right", fontSize: "20px", fontWeight: "lighter"}}>{statName}</span>
            <span className={style.statsNum}>{ this.state.stats[statName]}</span>
          </div>
        )
      }
      else
        return false
    })
    const rightStrStatsDiv = this.state.strStats.map((statName) => {
      if (this.state.stats[statName] && rightStats.includes(statName)) {
        return (
          <div style={{display: "flex", padding: "3px 0"}}>
            <span style={{width: "120px", textAlign: "right", fontSize: "20px", fontWeight: "lighter"}}>{statName}</span>
            <span className={style.statsNum}>{ this.state.stats[statName]}</span>
          </div>
        )
      }
      else
        return false
    })
    return (
      <div className={style.drawStats}>
        <h3 style={{color: "lightgray", fontWeight: "lighter", margin: "0px", fontSize: "22px"}}>武器属性</h3>
        <div style={{position: "relative"}} className={style.linkH}></div>
        <div style={{paddingTop: "30px", paddingLeft: "00px",color: "lightgray", display: "flex"}}>
          <div>{leftDrawStatsDiv}{leftStrStatsDiv}</div>
          <div style={{left: "0px", top: "-5px", height:"auto", margin: "0 20px 0 30px"}} className={style.linkS}/>
          <div style={{position: "relative", left: "-10px"}}>{rightDrawStatsDiv}{rightStrStatsDiv}</div>
        </div>
      </div>
    )
  }
}

// 固有属性
class WeaponInherent extends React.Component{
  render() {
    if (!this.props.data.固有特性) {
      return ''
    }
    const inherentDivs = this.props.data.固有特性[0].map((socekt) => {
      return (
        <div style={{paddingTop: "17px", display: "flex"}}>
          <img src= {bungieUrl(socekt.icon)} className={style.inherentPlugImg} alt=''/>
          <div style={{paddingTop: "17px",paddingLeft: "15px"}}>
            <div style={{color: "white"}}>{socekt.name}</div>
            <div style={{color: "lightgray", whiteSpace: "pre-wrap", fontFamily: "Destiny2", width: "600px"}}>{socekt.description}</div>
          </div>
        </div>
      )
    })
    return (
      <div className={style.weaponInherent}>
        <h3 style={{color: "lightgray", fontWeight: "lighter", margin: "0px", fontSize: "22px"}}>固有特性</h3>
        <div className={style.linkH}></div>
        <div style={{paddingLeft: "20px"}}>
          {inherentDivs}
        </div>
      </div>
    )
  }
}

// 皮肤
class WeaponSkin extends React.Component{
  render() {
    if (!this.props.data.武器装饰) {
      return ''
    }
    const skinDivs = this.props.data.武器装饰[0].map((socekt) => {
      if (socekt.name === '默认皮肤'){
        return (
          <div style={{position: "relative" ,left: "0px", top: "0px"}}>
            <img src= {bungieUrl(socekt.icon)} className={style.inherentPlugImg} alt=''/>
          </div>
        )
      } else {
        return (
          <div style={{position: "relative" ,margin: "0 0 0 15px"}}>
            <img src= {bungieUrl(socekt.icon)} className={style.inherentPlugImg} alt=''/>
            <div className={style.skinName}>{socekt.name}</div>
          </div>
        )
      }
    })
    return (
      <div className={style.weaponSkin}>
        <h3 style={{color: "lightgray", fontWeight: "lighter", margin: "0px", fontSize: "22px"}}>武器皮肤</h3>
        <div className={style.linkH}></div>
        <div style={{position: "relative" ,top: "23px", left: "23px", display: "flex"}}>
          {skinDivs}
        </div>
      </div>
    )
  }
}

// 催化
class WeaponCH extends React.Component{
  render() {
    if (!this.props.data.武器模组) {
      return ''
    }
    const skinDivs = this.props.data.武器模组[0].map((socekt) => {
      if (socekt.name === '空催化插槽'){
        return (
          <div style={{position: "relative" ,left: "0px", top: "0px"}}>
            <img src= {bungieUrl(socekt.icon)} className={style.inherentPlugImg} alt=''/>
          </div>
        )
      } else {
        return (
          <div style={{position: "relative" ,margin: "0 0 0 15px"}}>
            <img src= {bungieUrl(socekt.icon)} className={style.inherentPlugImg} alt=''/>
            <div className={style.skinName}>{socekt.name}</div>
          </div>
        )
      }
    })
    let investmentStats = ''
    if (this.props.data.武器模组[0][1].investmentStats) {
      investmentStats = Object.keys(this.props.data.武器模组[0][1].investmentStats).map((statName)=>{
        return (
          <div style={{display: "flex", padding: "3px 0"}}>
            <span style={{width: "120px", textAlign: "left", fontSize: "20px", fontWeight: "lighter"}}>{statName}:</span>
            <span className={style.statsNum}>{ this.props.data.武器模组[0][1].investmentStats[statName]}</span>
          </div>
        )
      })
    }
    const SocektsDivs2 = this.props.data.武器特性.map((socekts) => {
      return (
        <div style={{position: "relative" ,top: "17px", left: "10px", display: "flex", margin: "0 0 20px"}}>
          <img src= {bungieUrl(socekts[0].icon)} className={style.inherentPlugImg} alt=''/>
          <div style={{position: "relative" ,left: "15px", top: "12px"}}>
            <div style={{color: "white"}}>{socekts[0].name}</div>
            <div style={{color: "gainsboro", whiteSpace: "pre-wrap", fontFamily: "Destiny2", width: "600px", margin:"5px 0"}}>{socekts[0].description}</div>
          </div>
        </div>
      )
    })
    
    let perks = ''
    if (this.props.data.武器模组[0][1].perks) {
      perks = this.props.data.武器模组[0][1].perks.map((perkInfo) => {
        return (
          <div style={{position: "relative" ,top: "17px", left: "10px", display: "flex", margin: "0 0 20px"}}>
            <img src= {bungieUrl(perkInfo.icon)} style = {{width: "65px", height: "65px"}} alt=''/>
            <div style={{position: "relative" ,left: "15px", top: "5px"}}>
              <div style={{color: "white"}}>{perkInfo.name}</div>
              <div style={{color: "gainsboro", whiteSpace: "pre-wrap", fontFamily: "Destiny2", width: "300px", margin:"5px 0"}}>{perkInfo.description}</div>
            </div>
          </div>
        )
      })
      perks = <div>
                <div style={{display: "flex", padding: "3px 0"}}>
                      <span style={{width: "120px", textAlign: "left", fontSize: "20px", fontWeight: "lighter"}}>催化特性:</span>
                </div>
                <div style={{width: "240px"}}>{perks}</div>
              </div>
    }
    return (
      <div style={{padding: "15px 0px 30px 50px", background: "rgb(100 87 38)"}}>
        <h3 style={{color: "darkgray", fontWeight: "lighter", margin: "0px", fontSize: "22px"}}>催化信息</h3>
        <div className={style.linkH}></div>
        <div style={{position: "relative" ,top: "17px", left: "0px", display: "flex"}}>
          {skinDivs}
          <div className={style.linkH} style={{borderTop: "dashed darkgray 1px", left: "10px", top: "40.5px", width: "150px"}}/>
          <div style={{position: "relative", left: "20px", color: "lightgrey", fontSize: "18px"}}>
            {investmentStats}
            <div style={{display: "flex", padding: "3px 0"}}>
              <span style={{width: "120px", textAlign: "left", fontSize: "20px", fontWeight: "lighter"}}>催化目标:</span>
              <span className={style.statsNum} style={{width: "240px"}}>{this.props.data.武器模组[0][1].target}</span>
            </div>
            {perks}
          </div>
        </div>
      </div>
    )
  }
}

const ammoIcons = {
  1: primary,
  2: special,
  3: heavy,
};

function bungieUrl(url) {
  return 'https://bungie.net' + url
}

class WeaponBackground extends React.Component{
  render() {
    let background
    if (this.props.screenshot === ''){
      background = (
        <div>
          <img className={style.backgroundDefault} src="https://comics.bungie.net/c4b7565732fb3e5293e09868148b761e.jpg" alt=""/>
          <div className={style.backgroundFiltered}/>
        </div>
      )
    } else {
      background = <img className={style.background} src={bungieUrl(this.props.screenshot)} alt=""/>
    }
    return (
      background
    )
  }
}

class TQSign extends React.Component {
  render() {
    return (
      <div style={{padding: "10px 0px 10px 30px", background: "hsl(0deg 0% 100% / 0%)"}}>
        <span style={{color: "lightgray", fontWeight: "lighter", margin: "0px", fontSize: "14px", paddingRight: "20px"}}>ItemHash: {this.props.data.hash}</span>
        <span style={{color: "lightgray", fontWeight: "lighter", margin: "0px", fontSize: "14px", paddingRight: "20px"}}>UpdateTime: {this.props.data.time}</span>
        <span style={{color: "lightgray", fontWeight: "lighter", margin: "0px", fontSize: "14px", paddingRight: "20px"}}>Version: {this.props.data.version}</span>
        <span style={{color: "lightgray", fontWeight: "lighter", margin: "0px", fontSize: "22px", paddingRight: "30px", float:"right"}}>By @天阙</span>
      </div>
    )
  }
}

class WeaponDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      weapon : props.data
    }
  }
    render() {
      const max = Math.max(...this.state.weapon.sockets.武器特性.map(x => x.length))
      const CH = (this.state.weapon.tierTypeName === "异域") ? <WeaponCH data = {this.state.weapon.sockets} /> : ""
      const features = (max > 1) ? <WeaponFeatures data = {this.state.weapon.sockets}/> : <WeaponFeaturesEx data = {this.state.weapon.sockets}/>
      return (
        <div style={{width: "840px", margin: "0 auto", background: "rgb(24, 24, 24)", overflow: "hidden"}}>
          {/* <WeaponSecondaryIcon data = {this.state.weapon.secondaryIcon} /> */}
          <WeaponInfo data = {this.state.weapon}/>
          <WeaponStats stats = {this.state.weapon.stats}/>
          <WeaponInherent data = {this.state.weapon.sockets}/>
          {CH}
          {features}
          <WeaponSkin data = {this.state.weapon.sockets}/>
          <TQSign data = {this.state.weapon} />
        </div>
      )
    }
}


export default WeaponDetails