import root from '../index'
export function getNewEnglishSong(){
    return root({
        method: 'GET',
        url: '/top/song?type=96',
        
    })
}