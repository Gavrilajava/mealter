import React, {useState, useEffect}  from 'react'


const Timer = (props) => {

  const [active, setActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(props.time)
  

  const start = () => setActive(true)
  
  useEffect(() => {
    let interval
    if (active){
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1)
      },1000)
    }
    return () => clearInterval(interval)
  }, [active, timeLeft])


  const render = () => {
    if (active){
      if (timeLeft > 0){
        let mins= Math.floor(timeLeft/60)
        let seconds = timeLeft-mins*60
        if (seconds === 0){
          seconds = '00'
        }
        return `${mins}:${seconds}`
      }
      else {
        return <p style={{color: "green"}}>Done!</p>
      }
    }
    else{
      return <i class="fas fa-stopwatch"></i>
    }
  }

 


  return(
    <div onClick = {start} className="timer">
      {render()}
    </div>
  )
}

export default Timer