import lodash from "lodash"

export function paginate(items, pageNumber, pageSize){
    const startIndex = (pageNumber-1) * pageSize
    // console.log(startIndex)
    return lodash(items).slice(startIndex).take(pageSize).value()
}