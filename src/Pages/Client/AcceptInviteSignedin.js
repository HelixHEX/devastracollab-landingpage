import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'

import {
  Center,
  Text,
  useToast,
  Box,
  Flex,
  Button
} from '@chakra-ui/react'

import axios from 'axios'
import { useParams } from 'react-router-dom'
import { baseURL } from '../../utils/globalVar'

import Tilt from 'react-tilt'

axios.defaults.withCredentials = true

const AcceptInviteSignedin = () => {
  const { id, email } = useParams()
  const toast = useToast()
  const [project, setProject] = useState({})
  const user = useUser()
  useEffect(() => {
    const main = async () => {
      await axios.post(baseURL + 'client/checkinvite', { projectuuid: id, email }).then(res => {
        if (!res.data.success) {
          toast({
            title: 'Uh Oh :(',
            description: res.data.error,
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
          setTimeout(() => { window.location.href = '/' }, 3000)
        } else {
          setProject(res.data.project)
        }
      })
    }
    main()
    // eslint-disable-next-line
  }, [])

  const handleDecision = async (decision) => {
    try {
      await axios.post(baseURL + 'client/decideinvite', {
        projectuuid: project.uuid,
        clientId: user.id,
        email,
        decision
      }).then(res => {
        if (res.data.success) {
          if (decision) {
            window.location.href=`/client/project/${project.uuid}`
          }
        } else if (res.data.error === 'Invalid access') {
          toast({
            title: 'Uh Oh :(',
            description: res.data.error,
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
          setTimeout(() => { window.location.href = '/'}, 3000)
        } else {
          toast({
            title: 'Uh Oh :(',
            description: res.data.error,
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        }
      })
    } catch (error) {
      toast({
        title: 'Uh Oh :(',
        description: 'An error has occurred',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Center w='100%' h='100vh'>
        <Tilt className="Tilt" options={{ max: 20, axis: 'X' }}>
          <Box boxShadow="md" pr={5} pl={5} pt={3} rounded={10} w={[300, 325, 350]} h={280} bg='brandgray.900'>
            <Text fontSize={25} textAlign='center' color='white'>You have been invited to <Text fontWeight='700'>{project.name}</Text></Text>
            <Flex mt={65} justify='space-evenly'>
              <Button onClick={() => handleDecision(false)} bg='brandred.100'>Decline</Button>
              <Button onClick={() => handleDecision(true)} bg='brandgreen.100'>Accept</Button>
            </Flex>
          </Box>
        </Tilt>
      </Center>
    </>
  )
}

export default AcceptInviteSignedin