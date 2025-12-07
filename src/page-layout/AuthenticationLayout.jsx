import { Outlet } from "react-router-dom";
import Footer from "../component/footer";
import '../assets/css/authentication-page.css'
import { useState, useEffect } from "react";


export default function AthenticationLayout() {
    const [loading, isLoading] = useState(false)

    function initializeMt5(){

        alert('Loading... Please wait until you recieve a successfully Initialized message before you login.');

        fetch(`${process.env.REACT_APP_URL}/initialize-mt5`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify('Initialize')
        })
        .then(res => res.json())
        .then(data =>{
            alert(data)

        })
        .catch(err => alert('Error Initializing MT5:', err))
    }

    useEffect(
        initializeMt5, []
    )
    



    

    return (
        <div className="authpage">
            <Outlet />

            <Footer />
        </div>
        
    )
}