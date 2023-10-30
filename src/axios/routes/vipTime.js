import root from '../index'

export function getVIPTime(){
    return root({
        method:'GET',
        url:`/vip/timemachine`
    })
}