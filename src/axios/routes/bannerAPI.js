import root from '../index.js'

export function getBannerAPI(){
    return root({
        method:'GET',
        url:'/banner?type=2'
    })
}