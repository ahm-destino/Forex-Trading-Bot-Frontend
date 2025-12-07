import '../assets/css/settings.css'
import { useEffect, useState } from 'react';

export default function Settings(){



    
    const [sl, setStoploss] = useState('')
    const [tp, setTakeProfit] = useState('')
    const [username, setUserName] = useState('')
    const [form, setForm] = useState({
        name: '',
        sl: '',
        tp: ''
    })
    const [submit, isSubmiting] = useState(true)


    function handleChange(e){
        if(e.target.id === 'sl'){
            setStoploss(e.target.value)
        }
        else if(e.target.id === 'tp') {
            setTakeProfit(e.target.value)
        }        
        else if(e.target.id === 'username'){
            setUserName(e.target.value)                     
        }
    }

    useEffect(
        () =>{
            setForm({
                name: username,
                sl: sl,
                tp: tp

            })
            
        }, [sl, tp, username]
    )

    function submitBtn(){
        console.log(form);
        isSubmiting(false);
        fetch('http://127.0.0.1:5000/users-trading-preference',{
            method :'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(form)
        })
        .then(res => res.json())
        .then(data => {
            //Please note that the set tiomeOut block I added here is to make sure there is a small delay incases where my server responds are fast. so that my loading... button shows for a little while before displaying the server responds
            setTimeout(() => {
                isSubmiting(true)
                setTimeout(
                    ()=>{
                        alert(data)
                    }, 20)
                
            }, 500);
        })
        //Below is my exeception block that catches error incases of failed upload
        .catch(err =>{
            setTimeout(()=>{
                isSubmiting(true)
                setTimeout(()=>{
                    alert(err)
                },50)
                
            }, 1000)
            
            
        })
        
    }

        
    return(
        <>
            <div className="settings-wrapper">
            <div className="card">
                <h2>Preferred Trade Settings</h2>
                <div className="input-row">
                    <label htmlFor="tp">Take Profit (TP):</label>
                    <input type="number" id="tp" placeholder="Enter your preffered TP e.g. 1.12345" onChange={ handleChange} />
                </div>
                <div className="input-row">
                    <label htmlFor="sl">Stop Loss (SL):</label>
                    <input type="number" id="sl" placeholder="Enter your preffered SL e.g. 1.12345" onChange={handleChange} />
                </div>
            </div>
            <div className="card">
                <h2>Profile Picture</h2>
                <div className="image-upload-container">
                    <input id="file-upload" type="file" accept="image/*" />
                </div>
            </div>
            <div className="card">
                <h2>Account Info</h2>
                <div className="input-row">
                    <label htmlFor="username">User Name:</label>
                    <input type="text" id="username" placeholder="Enter your name..." onChange={handleChange} />
                </div>
            
            </div>
            { submit ? <button className="update-btn" onClick={submitBtn}> Update Profile</button> 
            : <button className="update-btn" disabled> Updating Profile...</button> }
            
                </div>
        </>
    )
}