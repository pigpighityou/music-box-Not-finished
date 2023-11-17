export function setLocalStorage(attr,key){
    localStorage.setItem(attr,JSON.stringify(key))

}


export function getLocalStorage(attr){
    return JSON.parse(localStorage.getItem(attr))
}


export function removeLocalStorage(attr){
    localStorage.removeItem(attr)
}
