import root from '../index'


export function getHotChineseSinger(){
    return root({
        method:'GET',
        url:'/artist/list?type=-1&area=7&limit=20&offset=0'
        
    })
}