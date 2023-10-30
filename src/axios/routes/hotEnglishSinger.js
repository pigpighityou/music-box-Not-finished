import root from '../index'
export function getHotEnglishSinger(){
    return root({
        method: 'GET',
        url: '/toplist/artist?type=2',
        
    })
}