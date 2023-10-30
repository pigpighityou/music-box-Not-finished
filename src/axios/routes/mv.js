import root from '../index'


export function getMv(country){



    return root({
            method:'GET',
            url:`/mv/all?area=${country}&limit=15`

    })

}