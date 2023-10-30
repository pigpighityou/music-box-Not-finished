import root from '../index.js'

export function getRecSongList(){
    return root({
        method:'GET',
        url:'/personalized?limit=10',
        
        
       
        
    })
}


/* export function getRecSongList2(){
    return root({
        method:'GET',
        url:'/simi/playlist?id=347232&limit=20',
        
        
       
        
    })
}

export function getRecSongList3(){
    return root({
        method:'GET',
        url:'/simi/playlist?id=347234&limit=20',
        
        
       
        
    })
}

export function getRecSongList4(){
    return root({
        method:'GET',
        url:'/simi/playlist?id=347241&limit=20',
       
        
       
        
    })
} */