import root from '../index'


export function getMvRank(){
    return root({
            method:'GET',
            url:'/top/mv?limit=20'



    })
}