import root from '../index'




export function getLoginUserAccount(){
    return root({
        method:'GET',
        url:`/user/account`
    })
}

