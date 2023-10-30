import root from '../index'

export function getBanner(){
    return root({
        url:'/dj/banner',
        method:'GET'
    })
}