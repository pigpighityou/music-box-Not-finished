import root from '../index'

export function getDailyRecommandSong(){
    return root({
        method: 'GET',
        url: '/recommend/songs'

    })
}


export function getDailyRecommandSongList(){
    return root({
        method: 'GET',
        url: '/recommend/resource'

    })
}