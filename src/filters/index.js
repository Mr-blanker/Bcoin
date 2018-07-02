import {deCentralization} from '@/utils/deCentralization'
// 去中心化配置
export default deCentralization(require.context('./', false, /\w+.js$/))


