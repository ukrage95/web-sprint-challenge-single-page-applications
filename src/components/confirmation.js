import React from "react"
import {useLocation} from 'react-router-dom'

export default function Confirmation(){
    const state = useLocation()
    console.log('state: ', state);
    return (
        <div>
           confirm 
        </div>
    )    
}