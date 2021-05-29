import React from 'react'
import { SignUp } from "@clerk/clerk-react";
// import { useHistory } from 'react-router-dom'
// import {} from '@chakra-ui/react'


const Signup = () => {
  return (
    <>
      <SignUp afterSignUp='/freelancer/signup' />
    </>
  )
}

export default Signup