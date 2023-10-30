import root from '../index'

export function getSongs(id){
    return root({
        method:'GET',
        url:`/song/url?id=${id}`,
      
       
    })
}
