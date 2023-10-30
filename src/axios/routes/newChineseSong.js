import root from '../index'

export function getNewChineseSong(){


    return root({
        method: 'GET',
        url: '/top/song?type=7',
        
    })
}