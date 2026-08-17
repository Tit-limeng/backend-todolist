import { Tailspin } from 'ldrs/react'
import 'ldrs/react/Tailspin.css'

// Default values shown


export default function Loading () {
    return(
        <>
        <Tailspin 
        size="20"
        stroke="5"
        speed="0.9"
        color="#f11946" 
        />
        </>
    ) ;
}