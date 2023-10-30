import root from '../index'

export function getVIPInfo(data){
    return root({
        method:'GET',
        url:`/vip/info/v2?uid=${data}`
    })
}