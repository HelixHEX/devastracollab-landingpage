import React, { useEffect, useState } from 'react'

import {
  Box,
  Text,
  Center,
  Button,
  useToast
} from '@chakra-ui/react'
import { useUser } from '@clerk/clerk-react'
import axios from 'axios'
import { baseURL, stripePromise } from '../utils/globalVar'

const ProBanner = () => {
  const [remainingProjects, setRemainingProjects] = useState(0)
  const user = useUser()
  const toast = useToast()
  useEffect(()=> {
    const main = async () => {
      try {
        await axios.post(baseURL + 'freelancer/remainingprojectcount', {
          userId: user.id
        }).then(res => {
          if (res.data.success) {
            setRemainingProjects(res.data.remainingprojects)
          } else if (res.data.error.includes('User has paid account')) {
            window.location.reload()
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
      } catch(e) {
        toast({
          title: 'Uh Oh :(',
          description: 'An error has occurred',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    }
    main()
  }, [])

  const handleStripe = async () => {
    const stripe = await stripePromise
    await axios.post(baseURL + 'stripe/create-checkout-session', {
      priceId: 'price_1IpgCPDWFqSlSGgFSDARitFy'
    }).then(res => {
      stripe.redirectToCheckout({sessionId: res.data.sessionId}).then(res => alert(res))
    })
  }
  if (user.publicMetadata.accounttype !== 'trailblazer' && user.publicMetadata.type === 'freelancer') {
    return (
      <>
        <Box w='100%' bg='brandpurple.100' h={50} >
          <Center h='100%' w='100%'>
            <Text color='white'>You have {remainingProjects} projects remaining. Upgrade to get unlimited!</Text>
            <Button onClick={handleStripe} ml={3} h={35} w={100} _hover={{ bg: 'gray.200', color: 'brandgray.200' }} bg='brandgray.200' color='gray.200' >Get Pro</Button>
          </Center>
        </Box>
      </>
    )
  } else {
    return null
  }
  // return null
}

export default ProBanner