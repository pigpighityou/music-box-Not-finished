import root from '../index'

export function getVIPTask(){
    return root({
        method:'GET',
        url:'/vip/tasks'
    })
}