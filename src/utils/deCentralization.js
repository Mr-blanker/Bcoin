// 去中心化配置
export const deCentralization = (r, exinclude = /index/,isMatchDefault=false) => {
    const paths = r.keys().filter(p => {
      return !exinclude.test(p)
    })
    const maps = paths.map(k => {
      if(isMatchDefault){
          return r(k).default
      }else {
          return r(k)
      }
    })
    console.log('maps')
    console.dir(maps)
    return maps
  }
  