import React, { useState } from 'react'
import { SignIn, useUser } from "@clerk/clerk-react";
import { useHistory } from 'react-router-dom'
import {
  Text,
  Button
} from '@chakra-ui/react'

import { createAccount } from '../../utils/account'

const CreateProfile = () => {
  const user = useUser()
  const history = useHistory()
  const handleAccount = async (type) => {
    const account = await createAccount(type, user)
    if (account) {
      alert(account)
    }

    history.push('/')
  }

  return (
    <>
      <Text color='white'>Please setup your account</Text>
      <Text color='white'>Would you like to setup a freelancer account or client account?</Text>
      {/* <WithUser>
        {(user) => ( */}
      <>
        <Button onClick={() => handleAccount('freelance')}>Freelancer</Button>
        <Button onClick={() => handleAccount('client')}>Client</Button>
      </>
      {/* )} */}
      {/* </WithUser> */}
    </>
  )
}

export default CreateProfile