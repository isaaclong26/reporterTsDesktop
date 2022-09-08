import React from "react"
import Heading from "./components/heading"

import Spinner from 'react-bootstrap/Spinner';



const SplashScreen = ()=>{



    return(<>
        <Spinner animation="border" variant="success"  >
        <span className="visually-hidden">Loading...</span>
        </Spinner>
        <Heading size={3}>Loading</Heading>
  </>  )
}


export default SplashScreen;