import root from '../index'


// 弃用。仅用于调试test
export function getSinger(){
    return root({
        method: 'GET',
        url: '/artist/list?type=-1&area=-1&limit=50&initial=0'

    })
}

export function getSingerRandom(a,b){
    return root({
        method:'GET',
        url:`/artist/list?type=${a}&area=${b}&limit=50&initial=0`
    })
}