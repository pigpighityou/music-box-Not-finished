export function transformDate(date){
 
    const year=date.getFullYear()
    const month=date.getMonth()+1
    const day=date.getDate()
    return year+'-'+month+'-'+day

}

export function transformDateDetail(date){
 
    const year=date.getFullYear()
    const month=date.getMonth()+1
    const day=date.getDate()
    const hour=date.getHours()
    const minute=date.getMinutes()
  
    return year+'-'+month+'-'+day+' '+hour+':'+minute

}

