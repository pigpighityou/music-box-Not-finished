import root from '../index'


export function getDjCategory(){
    return root({
        method:"GET",
        url:'/dj/program/toplist'
    })
}