import { useState, useEffect} from 'react'

export default function Login(){

    

    const [form, setForm]= useState('')
    const [submit, isSubmiting] = useState(false)
    const [loginKey, setLoginKey] = useState('')
    const [password, setPassword ] = useState('')
    const [serverAddress, setServerAddress] = useState('')

    function updateState(e){
        
        e.target.id === 'login-key'? setLoginKey(e.target.value):
        e.target.id === 'password' ? setPassword(e.target.value):
        e.target.id === 'server-address' ? setServerAddress(e.target.value):
        'h'
    }
    
    useEffect(()=>{
        setForm({
            loginKey: loginKey,
            password: password,
            serverAddress: serverAddress
        })
        
    },[loginKey, password, serverAddress])

    function authBtn() {
        isSubmiting(true)
        fetch('http://127.0.0.1:5000/get-authentication-info',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(form)
        })
        .then( res=> res.json())
        .then(res =>{
            isSubmiting(false)
            window.location.href= 'http://localhost:5173/dashboard'
            setTimeout(()=>{
               alert(res)
            },1000)
        })
        .catch(err => {
            isSubmiting(false)
            alert(err)
        })
    }

    return(
        <div className="login-container">
        <div className="login-page-top-content">
            <h2> Welcome to </h2>
            <h1 className="heading-text"> Dubix Forex Trading Bot</h1> 
            <p> Please note that trading is risky, so trade with caution </p>
        </div>
        <form action="">
            <div className="input-container">
                <label htmlFor="losgin-key">Login Key:</label>
                <input type="text" name="" id="login-key" onChange={updateState} />
            </div>
            <div className="input-container">
                <label htmlFor="password">Enter Password:</label>
                <input type="password" name="" id="password" onChange={updateState} />
            </div>
            <div className="input-container">
                <label htmlFor="server-address">Server Address:</label>
                <input type="text" name="" id="server-address" onChange={updateState} />
            </div>
        </form>
        { !submit ? <button className="login" onClick={authBtn}> CONNECT </button> : <button className="login" disabled > CONNECTING... </button>  }
        <p>By logging in, you agree to our Trading Bot terms of service</p>

    </div>
    )
}