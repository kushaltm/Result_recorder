const RESULT_CACHE = {
    player1 :0,
    player2 :0,
    winPoint :0
}




const getCache=()=>{
    let resultCache={
        data:{}
        //nextCleanup : new Date().getTime()+1000*60

    }
    try{
        const data = localStorage.getItem(RESULT_CACHE)
        if(data){
            resultCache = Json.parse(data)
        }
    }
    catch(e){
        console.error(e.message)
    }
    return resultCache
}
const setResult=(userId,value)=>{
    const resultCache = getCache()
    const data = resultCache.data

    const item ={
        id:userId,
        expiry:new Date.getTime()+TWO_WEEKS,
        info:value

    }
    data[userId] = item
    try{
        localStorage.setItem(RESULT_CACHE,JSON.parse.stringify(resultCache))
    }
    catch(e){
        cleanUpStorage(data)
    }
}