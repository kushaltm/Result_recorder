
const Header = ({player1,player2}) => {
  
  return (
    <header className='header'> 
     
        <h1 > {"Player1 scored "+player1 + " : " + " Player2 scored "+player2 }</h1>
    </header>
  )
}

export default Header
