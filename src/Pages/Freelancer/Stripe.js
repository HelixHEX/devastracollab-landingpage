import React, { forwardRef, useEffect, useState } from 'react'

import {
  useHistory,
} from 'react-router-dom'

import {
  Flex,
  Text,
  Button,
  useToast,
  // Box,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  TableCaption,
  Tbody,
  CircularProgress,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Divider,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputGroup,
  InputLeftElement,
  Center
} from '@chakra-ui/react'

import Header from '../../Components/Header'
import Nav from '../../Components/Nav'
import TodoGrid from '../../Components/TodoGrid'
import ProBanner from '../../Components/ProBanner'
import ProjectDropdown from '../../Components/ProjectDropdown'

import axios from 'axios'

import { baseURL } from '../../utils/globalVar'
import { useUser } from '@clerk/clerk-react'

import { currentProjectAtom, projectAtom } from '../../utils/atom'
import { useRecoilState, useRecoilValue } from 'recoil'

import Moment from 'react-moment';

axios.defaults.withCredentials = true

const Stripe = () => {
  const [onboard, setOnboard] = useState(false)
  const [dashboardURL, setDashboardURL] = useState('')
  const [pendingBalance, setPendingBalance] = useState(0)
  const [balance, setBalance] = useState(0)
  const [charges, setCharges] = useState([])
  const user = useUser()

  const toast = useToast()

  const history = useHistory()
  useEffect(() => {
    if (user.publicMetadata.accounttype !== 'team') {
      history.push('/')
    }
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
              toast({
                title: 'Uh Oh :(',
                description: res.data.error,
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
            }
          })
          await axios.post(baseURL + 'stripe/list-standard-charges', {
            userId: user.id
          }).then(res => {
            if (res.data.success) {
              setCharges(res.data.charges.data)
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

  const calendarStrings = {
    lastDay: '[Yesterday at] LT',
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    lastWeek: '[last] dddd [at] LT',
    nextWeek: 'dddd [at] LT',
    sameElse: 'L'
  };

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
          : <Flex mr='5%' flexDir='column' color='white' ml='5%' mt='2%'>
            {/* <Button _hover={{bg: 'gray.200', color: 'brandgray.900'}} onClick={handleDashboard} bg='blue.400' color='white'>Stripe Dashboard</Button> */}
            <Flex>
              <Flex flexDir='column' >
                <Text fontWeight='500' fontSize={15}>Pending Balance</Text>
                <Text fontSize={20}>${pendingBalance / 100}</Text>
              </Flex>
              <Flex ml={30} flexDir='column' >
                <Text fontWeight='500' fontSize={15}>Balance</Text>
                <Text fontSize={20}>${balance / 100}</Text>
              </Flex>
              <React.Suspense fallback={null}>
                <CreateInvoice />
              </React.Suspense>
            </Flex>
            {charges.length > 0
              ? <Table variant='unstyled'>
                <TableCaption placement='top'>Recent charges</TableCaption>
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th></Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody bg='brandgray.900' >
                  {charges.map((data, index) => (
                    <Tr>
                      <Td>{data.customer.name}</Td>
                      <Td><Moment unix calendar={calendarStrings}>{data.created}</Moment></Td>
                      <Td>${data.amount / 100}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              : <CircularProgress isIndeterminate color="brandpurple.100" />}
          </Flex>}
      </Flex>

    </>
  )
}

const CreateInvoice = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [client, setClient] = useState(null)
  const project = useRecoilValue(projectAtom)
  const [currentProject, setCurrentProject] = useRecoilState(currentProjectAtom);
  const [customerEmail, setCustomerEmail] = useState('')
  const [customer, setCustomer] = useState()
  const [price, setPrice] = useState(0)
  const [itemName, setItemName] = useState('')
  const [quantity, setQuantity] = useState(1)
  // const [clients, setClients] = useState(project.freelancers)
  const [total, setTotal] = useState(0.00)
  // const [description, setDescription] = useState('')
  const handleProjectChange = (event) => {
    if (event.target.value !== '') {
      setCurrentProject(event.target.value)
    }
  }

  const handleClientChange = (event) => {
    event.preventDefault()
    setCustomerEmail(event.target.value)
    setCustomer(null)
  }

  let filters = []
  if (customerEmail.length > 0) {
    filters = project.clients.filter((data) => {
      return data.email.match(customerEmail)
    })
  }

  const selectClient = (client) => {
    setCustomerEmail(client.email)
    setCustomer(client)
    filters = []
  }

  return (
    <>
      <Modal h={100} size='5xl' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg='whiteAlpha.300' />
        <ModalContent bg='brandgray.900' >
          <ModalHeader color='white'>
            Invoice Client
          </ModalHeader>
          <ModalCloseButton color='white' />
          <ModalBody color='white'>
            {!currentProject
              ?
              <>
                <Text fontWeight='700'>Bill to</Text>
                <Flex flexDir='column'>
                  <Text mb={2}>Project</Text>
                  <ProjectDropdown handleChange={handleProjectChange} />
                </Flex>
              </>
              :
              <>
                <Flex flexDir={['column', 'row', 'row', 'row']}>
                  <Flex flexDir='column'>
                    <Text mb={2}>Project</Text>
                    <ProjectDropdown defaultValue={currentProject} handleChange={handleProjectChange} />
                  </Flex>
                  <Flex flexDir='column' mt={[5, 0, 0, 0]} ml={[0, 10, 10, 10]}>
                    <Text>Client</Text>
                    <Input value={customerEmail} onChange={handleClientChange} borderColor='brandgray.100' w={300} bg='brandgray.100' placeholder='Email' mt={2} />
                    {/* {customerEmail.length > 0 
                    ? */}
                    <Flex flexDir='column' h='auto' bg='brandgray.100' w={300}>
                      {!customer
                        ?
                        <>
                          {filters.map((data, index) => (
                            <Center onClick={() => selectClient(data)} h={10} pl={5} pr={5} _hover={{ cursor: 'pointer', bg: 'brandgray.200', color: 'brandgray.900' }} w='100%'>
                              <Text color='white'>{data.email}</Text>
                            </Center>
                          ))}
                        </>
                        : null}
                    </Flex>
                    {/* : null} */}
                  </Flex>

                </Flex>
                <Divider mt={10} />
                <Table variant='unstyled' w='100%'>
                  <Thead>
                    <Tr>
                      <Th>ITEM</Th>
                      <Th>QTY</Th>
                      <Th>PRICE</Th>
                      <Th>TOTAL</Th>
                    </Tr>

                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>
                        <Input onChange={(e) => setItemName(e.target.value)} minW={100} borderColor='brandgray.100' bg='brandgray.100' placeholder='Item name' />
                      </Td>
                      <Td>
                        <NumberInput allowMouseWheel defaultValue={1} min={1} borderColor='brandgray.100' rounded={25} bg='brandgray.100' w={20}>
                          <NumberInputField onChange={(e) => setQuantity(e.target.value)} />
                        </NumberInput>
                      </Td>
                      <Td flexDir='row'>
                        {/* <InputGroup > */}
                        < NumberInput borderColor='brandgray.100' rounded={25} bg='brandgray.100' w={100}>
                          <NumberInputField onChange={(e) => setTotal(e.target.value)} placeholder='$ 0.00' />
                        </NumberInput>
                        {/* </InputGroup> */}
                      </Td>
                      <Td>${quantity * total}</Td>
                    </Tr>
                  </Tbody>
                </Table>
                <Divider mt={5} />
                <Flex justifyContent='flex-end' mt={5}>
                  <Flex flexDir='column' w={300}>
                    <Flex w='100%' justifyContent='space-between'>
                      <Text>Subtotal</Text>
                      <Text>${quantity * total}</Text>
                    </Flex>
                    <Divider mt={5} />
                    <Flex mt={3} w='100%' justifyContent='space-between'>
                      <Text fontSize={25} fontWeight='700'>Total</Text>
                      <Text fontSize={25}>${quantity * total}</Text>
                    </Flex>
                  </Flex>
                  {/* <Divider /> */}
                </Flex>
              </>
            }
          </ModalBody>
          <ModalFooter>
            <Button bg='brandred.100' mr={3} onClick={onClose}>
              close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Button onClick={onOpen} _hover={{ bg: 'gray.200', color: 'brandgray.900' }} ml={30} bg='brandpurple.100' alignSelf='center'>Invoice Client</Button>
    </>
  )
}

// const ClientOptions = ({ project }) => {
//   const project = useRecoilValue(fetchProjects);
//   return (
//     <>
//       {project.clients.map((data, index) => {
//         if (data.uuid === defaultValue) {
//           return <option selected key={index} value={data.uuid}>{data.name}</option>
//         } else {
//           return <option key={index} value={data.uuid}>{data.name}</option>
//         }
//       })}
//     </>
//   )
// }

export default Stripe