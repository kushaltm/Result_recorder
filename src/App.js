
import { useState  } from "react";

import Header from "./Components/Header"


function App() {
  const [player1,setP1] =useState(0)
  const [player2,setP2] = useState(0)
  const [winPoint,setW] = useState(0)
  const [player1Disable,setP1Dis] = useState(true)
  const [player2Disable,setP2Dis] = useState(true)
  const [inputDisable,setInDis] = useState(false)
  const [winInputPoint,setI] = useState()
  const [set,setDisable] = useState(false)

  // useEffect(()=>{
  //   const getData = async() =>{
  //     //const dataFromServer = await fetchData()
  //     //console.log(dataFromServer['Player1'])
  //     var data = await getAllCacheData('result-recorder')
  //     setP1(data['player1'])
  //   setP2(data['player2'])
  //   setDisable(data['set'])
  //   setP1Dis(data['setP1Dis'])
  //   setP2Dis(data['setP2Dis'])
  //   setW(data['winPoint'])
  //   setI(data['winInputPoint'])
  //   setInDis(data['inputDisable'])
      
  //   }
  //   getData()
  // })
  
  /*
  const fetchData = async()=>{
    const res = await fetch('http://localhost:5000/data')
    const data = await res.json()
    return data
  }
 */

  // const addDataIntoCache = (cacheName, response) => {
  //   // Converting our response into Actual Response form
  //   const data = new Response(JSON.stringify(response));
  //   const url = window.location.href
  //   if ('caches' in window) {
  //     // Opening given cache and putting our data into it
  //     caches.open(cacheName).then((cache) => {
  //       cache.put(url, data);
        
  //     });
  //   }
  // };

  // const getAllCacheData = async(cacheName) => {
  //   var url = window.location.href
  //     const cacheStorage = await caches.open(cacheName)
  //     const cachedResponse = await cacheStorage.match(url)
  //     var data = await cachedResponse.json()
  //     return data
  //   };
  

  const handleChange=(e)=>{
      //setW(e.target.value)
      setI(e.target.value)
  }

  const onPlayer1= async()=>{
    //const dataToUpdate = await fetchData()
    setP1(player1+1)
    // var data = await getAllCacheData('result-recorder')
    // data['player1']++
    
    // addDataIntoCache('result-recorder',data)
    // //dataToUpdate['Player1']++*/
    
     if(parseInt(player1) === parseInt(winPoint-1)){
       alert("Player1 wins")
       //dataToUpdate['Player1Disable'] = true
       //dataToUpdate['Player2Disable'] = true
       setP1Dis(true)
       setP2Dis(true)
     }
     /*
     const updatedData = dataToUpdate
     const res = await fetch(`http://localhost:5000/data/`,{
       method : 'PUT',
       headers:{
         'Content-type':'application/json'
       },
       body :JSON.stringify(updatedData)
     })
     await res.json() */
  }

  const onPlayer2=async()=>{
    //const dataToUpdate = await fetchData()
   
    // var data = await getAllCacheData('result-recorder')
    // data['player2']++
    
    // addDataIntoCache('result-recorder',data)
    setP2(player2+1)
    //dataToUpdate['Player2']++
    if(player2 === parseInt(winPoint-1)){
      alert("Player2 wins")
      //dataToUpdate['Player1Disable'] = true
      //dataToUpdate['Player2Disable'] = true
      setP1Dis(true)
      setP2Dis(true)
    }/*

    const updatedData = dataToUpdate
    const res = await fetch(`http://localhost:5000/data/`,{
        method : 'PUT',
        headers:{
          'Content-type':'application/json'
        },
        body :JSON.stringify(updatedData)
      })
      await res.json()*/
    }

  const onReset=async()=>{
    
   
    // var data = await getAllCacheData('result-recorder')
    // data['player1'] =0
    // data['player2'] =0
    // data['player1Disable'] = true
    // data['player2Disable'] = true
    // data['set'] = false
    // data['winInputPoint'] =0
    // data['winPoint'] = 0
    
    
    
    setP1Dis(true)
    setP2Dis(true)
    setP1(0)
    setP2(0)
    setDisable(false)
    setI(0)
    setInDis(false)
    //addDataIntoCache('result-recorder',data)
  }

  const setWinpoint=async ()=>{
    /*const dataToUpdate = await fetchData()
    dataToUpdate['SetDisable'] = true
    dataToUpdate['Player1Disable'] = false
    dataToUpdate['Player2Disable'] = false
    dataToUpdate['WinInputPoint'] = winInputPoint
    dataToUpdate['InputDisable'] = true
    const updatedData = dataToUpdate
    const res = await fetch(`http://localhost:5000/data/`,{
      method : 'PUT',
      headers:{
        'Content-type':'application/json'
      },
      body :JSON.stringify(updatedData)
    })
    await res.json()*/
    
    if(winInputPoint<=0 ){
      alert("Enter the valid point to win")
    }
    else {
      // const data ={
      //   "player1":0,
      //   "player2":0,
      //   "winPoint":winInputPoint,
      //   "player1Disable":false,
      //   "player2Disable":false,
      //   "inputDisable":true,
      //   "winInputPoint":winInputPoint,
      //   "set":true
      // }
      // console.log(winInputPoint)
      // await addDataIntoCache("result-recorder",data)
      // 
      setDisable(true)
      setW(winInputPoint)
      setP1Dis(false)
      setP2Dis(false)
      setInDis(true)}
    
  }

  return (
    <div className="App">
    <Header player1= {player1} player2={player2}/>
    <div>
      <label className='label'> Enter the winning score</label>
      <input type = 'number' value = {winInputPoint}   className="form-control-input"   onChange={handleChange} disabled={inputDisable}/>
      <button className='set-btn btn' disabled={set} onClick={setWinpoint} >Set</button>
      </div>
      <div>
      <button className='player1-btn' disabled = {player1Disable} onClick={onPlayer1}>Player1</button>
      <button className='player2-btn btn' disabled = {player2Disable} onClick={onPlayer2}>Player2</button>
      <button className='reset-btn' onClick={onReset}>Reset</button>
      </div>
    </div>
  );
}

export default App