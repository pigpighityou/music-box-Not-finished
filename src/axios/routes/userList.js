import root from '../index'

export function getRecentSongs(){
    return root({
        method:'GET',
        url:'/record/recent/song'
    })
}