
import { useState ,useEffect } from "react";

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

  useEffect(()=>{
    const getData = async() =>{
      const dataFromServer = await fetchData()
      console.log(dataFromServer['Player1'])
      setP1(dataFromServer['Player1'])
      setP2(dataFromServer['Player2'])
      setW(dataFromServer['WinInputPoint'])
      setP1Dis(dataFromServer['Player1Disable'])
      setP2Dis(dataFromServer['Player2Disable'])
      setInDis(dataFromServer['InputDisable'])
      setI(dataFromServer['WinInputPoint'])
      setDisable(dataFromServer['SetDisable'])
    }
    getData()
  },[])

  const fetchData = async()=>{
    const res = await fetch('http://localhost:5000/data')
    const data = await res.json()
    return data
  }

 
  
  const handleChange=(e)=>{
      setI(e.target.value)
     
    
  }
  const onPlayer1= async()=>{
    const dataToUpdate = await fetchData()
    setP1(player1+1)
    dataToUpdate['Player1']++
     if(player1 == winPoint-1){
       alert("Player1 wins")
       dataToUpdate['Player1Disable'] = true
       dataToUpdate['Player2Disable'] = true
       setP1Dis(true)
       setP2Dis(true)
     
     }
     const updatedData = dataToUpdate
     const res = await fetch(`http://localhost:5000/data/`,{
       method : 'PUT',
       headers:{
         'Content-type':'application/json'
       },
       body :JSON.stringify(updatedData)
     })
     const d = await res.json()
    
  }
  const onPlayer2=async()=>{
    const dataToUpdate = await fetchData()
   setP2(player2+1)
   dataToUpdate['Player2']++
    if(player2 == winPoint-1){
      alert("Player2 wins")
      dataToUpdate['Player1Disable'] = true
      dataToUpdate['Player2Disable'] = true
      setP1Dis(true)
      setP2Dis(true)
    
    }
    const updatedData = dataToUpdate
    const res = await fetch(`http://localhost:5000/data/`,{
      method : 'PUT',
      headers:{
        'Content-type':'application/json'
      },
      body :JSON.stringify(updatedData)
    })
    const d = await res.json()
    
  }
  const onReset=async()=>{
    const dataToUpdate = await fetchData()
   dataToUpdate['Player1']=0
   dataToUpdate['Player2']=0
   dataToUpdate['SetDisable'] = false
   dataToUpdate['Player1Disable'] = true
   dataToUpdate['Player2Disable'] = true
   dataToUpdate['WinInputPoint'] =0
   dataToUpdate['InputDisable'] = false
   const updatedData = dataToUpdate
    const res = await fetch(`http://localhost:5000/data/`,{
      method : 'PUT',
      headers:{
        'Content-type':'application/json'
      },
      body :JSON.stringify(updatedData)
    })
    const d = await res.json()
    setP1(d["Player1"])
    setP2(d['Player2'])
    setDisable(false)
    setP1Dis(true)
    setP2Dis(true)
    setI('')
    setInDis(false)
    
    
  }
  const setWinpoint=async ()=>{
    const dataToUpdate = await fetchData()
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
    const d = await res.json()
    
    if(!winInputPoint){
      alert("Enter the input")
    }
    
    else if(winInputPoint<=0 ){
      alert("Enter the valid point to win")
    }
    else {
      
      setDisable(true)
      setW(winInputPoint)
      setP1Dis(false)
      setP2Dis(false)
      setInDis(true)
      
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