import React from "react"

export default function Footer() {
    return (
        <>
           <footer className="mt-6" style={{backgroundColor:"#fff"}}>
          
                    <div className="col p-4 text-center text-black">
                        <p>&copy; {new Date().getFullYear()} All Right Reserved. Powered by <strong>WAINS</strong></p>
                    </div>
                
           </footer>
        </>
    )
}