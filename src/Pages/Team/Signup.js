import React, {useEffect} from 'react' 

import { Center 
} from '@chakra-ui/react'

import {useParams} from 'react-router-dom'

import { SignUp } from "@clerk/clerk-react";
// import {useUser} from '@clerk/clerk-react'
const Signup = () => {
  const {plan} = useParams()
  
  return (
    <>
    {/* <Center w='100%' h='100vh'> */}
      <SignUp afterSignUp={`/team/stripecheckout/${plan}`} />
    {/* </Center> */}
    </>
  )
}

export default Signup