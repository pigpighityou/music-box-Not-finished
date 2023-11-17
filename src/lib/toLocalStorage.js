export function toLocalStorage(attr,key){
        localStorage.setItem(attr,JSON.stringify(key))
}

export function fromLocalStorage(attr){
         JSON.parse(localStorage.getItem(attr))
}
