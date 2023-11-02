import root from '../index'


export function storeMv(){
    return root({
        method:'GET',
        url:"/mv/sublist"
    })
}

export function storeAlbum(){
    return root({
        method:'GET',
        url:"/album/sublist"
    })
}

export function purchasedAlbum(){
    return root({
        method:'GET',
        url:"/digitalAlbum/purchased"
    })
}

export function storeRadio(id){
    return root({
        method:'GET',
        url:`/user/dj?uid=${id}`
    })
}

export function recentRadio(){
    return root({
        method:'GET',
        url:"/record/recent/dj"
    })
}