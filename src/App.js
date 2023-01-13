
import { useState , useEffect  } from "react";

import Header from "./Components/Header"


function App() {
  const [player1,setP1] =useState(0)
  const [player2,setP2] = useState(0)
  const [set,setDisable] = useState(false)
  const [player1Disable,setP1Dis] = useState(true)
  const [player2Disable,setP2Dis] = useState(true)
  const [winPoint,setW] = useState(0)
  const [inputDisable,setInDis] = useState(false)
  const [winInputPoint,setI] = useState()
  //on refresh the data get retrieved from cache
  useEffect(()=>{
    const getData = async() =>{
      var data = await getAllCacheData('result-recorder')
      setP1(data['player1'])
      setP2(data['player2'])
      setDisable(data['set'])
      setP1Dis(data['player1Disable'])
      setP2Dis(data['player2Disable'])
      setW(parseInt(data['winPoint']))
      //setI(parseInt(data['winInputPoint']))
      setInDis(data['inputDisable']) 
    }
    getData()
  })
  //Adds the data to cache on change
  const addDataIntoCache = (cacheName, response) => {
    const data = new Response(JSON.stringify(response));
    const url = window.location.href
    if ('caches' in window) {
      caches.open(cacheName).then((cache) => {
        cache.put(url, data);  
      });
    }
  };
  //gets the data from the cache
  const getAllCacheData = async(cacheName) => {
    var url = window.location.href
      const cacheStorage = await caches.open(cacheName)
      const cachedResponse = await cacheStorage.match(url)
      var data = await cachedResponse.json()
      return data
    };
  //handles the change of input in text area
  const handleChange=(e)=>{
      setI(e.target.value)
  }
  //handles the onclick button of player1
  const onPlayer1= async()=>{
    var data = await getAllCacheData('result-recorder')
    data['player1']++
    setP1(player1+1)
     if(parseInt(player1) >= parseInt(winPoint-1)){
       alert("Player1 wins")
       data['player1Disable'] = true
       data['player2Disable'] = true
       setP1Dis(true)
       setP2Dis(true)
     }
     addDataIntoCache('result-recorder',data)
  }
  //handles the onclick of button  player2
  const onPlayer2=async()=>{
    var data = await getAllCacheData('result-recorder')
    data['player2']++
    setP2(player2+1)
    if(player2 >= parseInt(winPoint-1)){
      alert("Player2 wins")
      data['player1Disable'] = true
      data['player2Disable'] = true
      setP1Dis(true)
      setP2Dis(true)
    }
    addDataIntoCache('result-recorder',data)
  }
  //handles the onclick of button reset
  const onReset=async()=>{
    var data = await getAllCacheData('result-recorder')
    data['player1'] =0
    data['player2'] =0
    data['player1Disable'] = true
    data['player2Disable'] = true
    data['set'] = false
    data['winInputPoint'] =0
    data['winPoint'] = 0
    data['inputDisable'] = false
    setP1Dis(true)
    setP2Dis(true)
    setP1(0)
    setP2(0)
    setDisable(false)
    setI(0)
    setInDis(false)
    addDataIntoCache('result-recorder',data)
  }
  //handles the onclick button of setWinpoint
  const setWinpoint=async ()=>{
    if(!winInputPoint){
      alert("Enter the input")
    }
    else if(winInputPoint<=0 ){
      alert("Enter the valid point to win")
    }
    else {
      const data ={
        "player1":0,
        "player2":0,
        "winPoint":winInputPoint,
        "player1Disable":false,
        "player2Disable":false,
        "inputDisable":true,
        "winInputPoint":winInputPoint,
        "set":true
      }
      console.log(winInputPoint)
      await addDataIntoCache("result-recorder",data)
      setDisable(true)
      setW(winInputPoint)
      setP1Dis(false)
      setP2Dis(false)
      setInDis(true)}
  }
  return (
    <div className="App">
    <Header player1= {player1} player2={player2}/>
    <label className="label" > Winning score is {winPoint}</label>
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