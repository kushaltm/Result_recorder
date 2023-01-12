
import { useState ,useRef } from "react";

import Header from "./Components/Header"


function App() {
  const [player1,setP1] =useState(0)
  //localStorage.setItem("Pl1",0)
  const [player2,setP2] = useState(0)
  //localStorage.setItem("Pl2",0)
  const [winPoint,setW] = useState(0)
  const [player1Disable,setP1Dis] = useState(true)
  const [player2Disable,setP2Dis] = useState(true)
  const [inputDisable,setInDis] = useState(false)
  const [winInputPoint,setI] = useState()
  const [set,setDisable] = useState(false)

  var data;
  const addDataIntoCode =(cacheName,url,response)=>{
    data = new Response(JSON.stringify(response));
    if('caches in window'){
      caches.open(cacheName).then((cache)=>{
        cache.put(url,data);
      });
    }
  }
  const getCache=async(cacheName,url)=>{
     const cacheStorage = await caches.open(cacheName);
     const cacheResponse = await cacheStorage.match(url);
     var data = cacheResponse

    
      
        console.log(data["player1"])
        setP1(data.player1)
        setP2(data.player2)
        setP1Dis(data.player1Disable)
        setP2Dis(data.player1Disable)
        setI(data.winInputPoint)
        setInDis(data.inputDisable)
        setW(data.winPoint)
      
    }
  
  const handleChange=(e)=>{
      setI(e.target.value)
      //console.log(winInputPoint)
    
  }
  const onPlayer1=()=>{
    localStorage.setItem("Pl1",player1+1)
    console.log(localStorage.getItem("Pl1"))
    setP1(player1+1)
     if(player1 == winPoint-1){
      alert("Player1 wins")
      setP1Dis(true)
      setP2Dis(true)
    }
    
  }
  const onPlayer2=()=>{
    localStorage.setItem('Pl2',player2+1)
    setP2(parseInt(localStorage.getItem('Pl2'))) 
    
    if(player2 == winPoint-1){
      alert("Player2 wins")
      setP1Dis(true)
      setP2Dis(true)
    
    }
    
  }
  const onReset=()=>{
    setP1(0)
    setP2(0)
    setDisable(false)
    setP1Dis(true)
    setP2Dis(true)
    setI('')
    setInDis(false)
    data ={
      player1:player1,
      player2:player2,
      winPoint:winPoint,
      player1Disable:player1Disable,
      player2Disable:player2Disable,
      inputDisable:true,
      winInputPoint:0
    }
    //getCache('result_recorder','http://localhost:3000/')
   //addDataIntoCode('result_recorder','http://localhost:3000/',data)
  }
  const setWinpoint=()=>{
    if(!winInputPoint){
      alert("Enter the input")
    }
    
    else if(winInputPoint<=0 ){
      alert("Enter the valid point to win")
    }
    else {
      //localStorage.setItem('WP',winPoint)
      setDisable(true)
      setW(winInputPoint)
      setP1Dis(false)
      setP2Dis(false)
      setInDis(true)
      //setW(winPoint)
    }
  }
  return (
    <div className="App">
    <Header player1= {player1} player2={player2}/>
      
      <label className='label'> Enter the winning score</label>
      <input type = 'number'  value ={winInputPoint}  className="form-control-input"  
      onChange={handleChange} disabled={inputDisable}/>
      <button className='set-btn btn' disabled={set} onClick={setWinpoint} >Set</button>
      <div>
      <button className='player1-btn btn' disabled = {player1Disable} onClick={onPlayer1}>Player1</button>
      <button className='player2-btn btn' disabled = {player2Disable} onClick={onPlayer2}>Player2</button>
      <button className='reset-btn' onClick={onReset}>Reset</button>
      </div>
      
    </div>
  );
}

export default App