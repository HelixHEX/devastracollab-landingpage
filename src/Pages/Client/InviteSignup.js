import React, { useEffect } from 'react'
import { SignUp } from '@clerk/clerk-react'

import {
  useToast
} from '@chakra-ui/react'

import {useParams} from 'react-router-dom'
import axios from 'axios'
import { baseURL } from '../../utils/globalVar'

axios.defaults.withCredentials = true

const InviteSignup = () => {
  const {id, email} = useParams()
  // const user = useUser()
  const toast = useToast()
  useEffect(() => {
    const main = async () => {
      await axios.post(baseURL + 'client/checkinvite', {projectuuid: id, email}).then(res => {
        if (!res.data.success) {
          toast({
            title: 'Uh Oh :(',
            description: res.data.error,
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
          setTimeout(() => {window.location.href='/'}, 3000)
        }
      })
    }
    main()
  })
  return (
    <>
      <SignUp afterSignUp={`/client/project/${id}/signup/${email}`} />
    </>
  )
}


export default InviteSignup 