import rightDirectionIcon from '../assets//images/right.png'
import { useState, useEffect, useInterval } from "react";






export default function Dashboard() {
    
    const [username, setUsername] = useState('');
    const [preferredSl, setPreferredSl] = useState(0);
    const [preferredTp, setPreferredTp] = useState(0);
    const [curr_open, setCurrOpen] = useState(0);
    const [availBal, setAvailBal] = useState(0)
    const [sec, setSec] = useState(59)
    const [minute, setMinute] = useState(4) 
    const [open_price, setOpenPrice] = useState(0)
    const [takenTrades, setTakenTrades] = useState(0)
    const [missedTrades, setMissedTrades] = useState(0)
    const [failedTrades, setFailedTrades] = useState(0)



// This line of code is to fetch the users account bvalance and details from the backend server
useEffect(()=>{
    fetch(`${import.meta.env.VITE_BACKEND_URL}/get-users-trading-details`)
    .then(response =>  response.json())
    .then(data => {
        
        setCurrOpen(data.curr_open);
        setPreferredSl(data.preferred_sl);
        setPreferredTp(data.preferred_tp);
        setAvailBal(data.accountBal)
        setTimeout(() => {
            alert(data.comment)
        }, 100);
        
        })
    .catch(error => alert('Error Loading Account:', error))
}, [])


// This line of is to automatically call or take trade immediately the time aligns with 5 minutes of the main time and then reset the timer to align with the real 5 minutes interval of the current time
useEffect(()=>{
    const timeInterval = setInterval(() => {
       setTimer() // This line of code is not associated with the taking trade function, it is just to start the countdown function on page loading
       const time = new Date(); 
       
       const seconds = time.getSeconds()
        const minutes = time.getMinutes()
        if(seconds === 0 && minutes % 5 === 0){
            takeTrade()
            resetTimer()
        }
    }, 1000);

}, [])


function takeTrade() {
    
    fetch(`${process.env.REACT_APP_URL}/fetch-indicators-and-predict-trade`)
    .then(response => response.json())
    .then(data =>{
        alert(data.comment)
        setOpenPrice(data.openPrice)
        setTakenTrades(data.takenTrades)
        setMissedTrades(data.skippedTrades)
        setFailedTrades(data.failedTrades)
    } )
    .catch(err =>{
        alert(err)
    } )
    
}


function setTimer() {
    setSec((sec)=> {
        
        if (sec> 0){
            return sec - 1
        }
        else if(sec === 0 ){
            setMinute((minute)=>{
                if (minute > 0 ){
                    return minute - 1
                }
                else if(minute === 0)
                    return 4
            })
            return 59
            
        }
    })
}

function resetTimer() {
    setMinute(4)
    setSec(59)
    
}
 
   
    


    return (
        <>
            <section className="dashboard">
                <p>Total Asset:</p>
                <h1> ${availBal} </h1>
            </section>

            <section className="progress-section">
                <div>
                    <p> Next trade coming up in: <strong>0{minute} : {sec}</strong> </p>
                    <button onClick={takeTrade} > Take Trade </button>
                </div>

                <section className="trading-overview-section">
                    <h3> Trading Stats:</h3>
                    <div className="latest-trade">
                        <p> Taken trades: <span> {takenTrades} </span></p>
                        <p> Skipped Trades: <span> {missedTrades} </span></p>
                        <p> Failed Trades: <span> {failedTrades} </span></p>
                        <p> Loss: <span> --- </span></p>

                    </div>
                    <button> View all Trading History  <img src={rightDirectionIcon}/> </button>
                </section>

                <div className="ongoing-trade">
                    <h3> Ongoing Trade:  </h3>
                    <div>
                        <p> Open Price: <span> {} </span></p>
                        <p> Current Price: <span> {curr_open}</span></p>
                        <p> Take Profit: <span> {preferredTp} </span></p>
                        <p> Stop Loss: <span> {preferredSl} </span></p>
                    </div>
                    <button> Abort Trade </button>
                </div>

            </section>
        </>
    )
    
}