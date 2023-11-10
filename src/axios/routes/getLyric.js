import root from '../index'


export function getLyric(id){
    return root({
        method:'GET',
        url:`/lyric?id=${id}`,
    })
}