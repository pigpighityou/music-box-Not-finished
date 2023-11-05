import root from '../index'

export function getSongs(id){
    return root({
        method:'GET',
        url:`/song/url?id=${id}`,
      
       
    })
}



export function getSongDetail(id){
    return root({
        method:'GET',
        url:`/song/detail?ids=${id}`,
      
       
    })
}