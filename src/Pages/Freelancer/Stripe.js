import React, { forwardRef, useEffect, useState } from 'react'

import {
  useHistory,
} from 'react-router-dom'

import {
  Grid,
  GridItem,
  Flex,
  Text,
  Select,
  CircularProgress,
  Input,
  Button,
  Center,
  useToast,
  // Box,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tooltip,
} from '@chakra-ui/react'

import Header from '../../Components/Header'
import Nav from '../../Components/Nav'
import TodoGrid from '../../Components/TodoGrid'
import ProBanner from '../../Components/ProBanner'

import axios from 'axios'

import { baseURL } from '../../utils/globalVar'
import { useUser } from '@clerk/clerk-react'

axios.defaults.withCredentials = true

const Stripe = () => {
  const [onboard, setOnboard] = useState(false)
  const [dashboardURL, setDashboardURL] = useState('')
  const [pendingBalance, setPendingBalance] = useState(0)
  const [balance, setBalance] = useState(0)
  const user = useUser()

  const toast = useToast()

  const history = useHistory()
  useEffect(() => {
    const main = async () => {
      await axios.post(baseURL + 'stripe/onboardstatus', {
        userId: user.id
      }).then(async res => {
        if (res.data.success) {
          setOnboard(true)
          setDashboardURL(res.data.url)
          await axios.post(baseURL + 'stripe/balance', {
            userId: user.id
          }).then(res => {
            if (res.data.success) {
              setPendingBalance(res.data.balance.pending[0].amount)
              setBalance(res.data.balance.available[0].amount)
            } else {
              alert('error')
            }
          })
        } else {
          setOnboard(false)
        }
      })

    }
    main()
  }, [])

  const handleOnboarding = async () => {
    await axios.post(baseURL + 'stripe/onboarduser', {
      userId: user.id
    }).then(res => {
      if (res.data.success) {
        window.location.href = res.data.url
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
  }

  const handleDashboard = () => {
    window.location.href = dashboardURL
  }

  return (
    <>
      <React.Suspense fallback={null}>
        <Nav moneyActive={true} />
      </React.Suspense>
      <Header projectActive={true} />
      <Flex ml={[0, 0, 0, 20]} flexDir='column' >
        <Flex ml='5%' mt='5%' >
          <Text fontSize='40' fontWeight='700' color='white'>Balance</Text>
        </Flex >
        {!onboard
          ? <Flex ml='5%' mt='2%' flexDir='column'>
            <Text color='white' >Connect with stripe to manage business finances as well as billing clients</Text>
            <Button mt={5} w={150} _hover={{ bg: 'gray.200', color: 'brandgray.900' }} onClick={handleOnboarding} bg='blue.400' color='white'>Connect Stripe</Button>
          </Flex>
          : <Flex color='white' ml='5%' mt='2%'>
            {/* <Button _hover={{bg: 'gray.200', color: 'brandgray.900'}} onClick={handleDashboard} bg='blue.400' color='white'>Stripe Dashboard</Button> */}
            <Flex flexDir='column' >
              <Text fontWeight='500' fontSize={15}>Pending Balance</Text>
              <Text fontSize={20}>${pendingBalance / 100}</Text>
            </Flex>
            <Flex ml={30} flexDir='column' >
              <Text fontWeight='500' fontSize={15}>Balance</Text>
              <Text fontSize={20}>${balance / 100}</Text>
            </Flex>
          </Flex>}
      </Flex>

    </>
  )
}

export default Stripe