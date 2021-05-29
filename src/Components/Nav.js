import React, { useState } from 'react'

import {
  Flex,
  Icon,
  Button,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormLabel,
  useToast,
  Input,

} from '@chakra-ui/react'

// import { useHistory } from 'react-router-dom'

import { Layers, BarChart2, MessageSquare, Plus, DollarSign, Users } from 'react-feather';

import { currentProjectAtom, fetchProjects } from '../utils/atom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useUser, UserButton } from '@clerk/clerk-react';

import axios from 'axios'

import { baseURL } from '../utils/globalVar'

const Nav = (props) => {
  // const history = useHistory()
  const user = useUser()
  // eslint-disable-next-line
  const [currentProject, setCurrentProject] = useRecoilState(currentProjectAtom)
  const projects = useRecoilValue(fetchProjects);
  const [project, setProject] = useState({
    name: ''
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()


  const handleNav = (link) => {
    if (link.includes(`${user.publicMetadata.type}/project`)) {
      if (currentProject !== '') {
        window.location.href = `${link}/${currentProject}`
      } else if (projects.length === 1) {
        window.location.href = `${link}/${projects[0].uuid}`
      } else {
        window.location.href = `${link}/default`
      }
      // } else if (link.includes('/chat')) {
      //   window.location.href = `${link}/default`
    } else {
      window.location.href = `${link}`
    }
  }

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async () => {
    if (project.name !== '') {
      try {
        await axios.post(baseURL + window.Clerk.user.publicMetadata.type + '/createproject', {
          name: project.name,
          userId: user.id
        }).then(res => {
          if (res.data.success) {
            window.location = `/freelancer`
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
      } catch (e) {
        toast({
          title: 'Uh Oh :(',
          description: 'An error has occurred',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    }
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg='whiteAlpha.300' />
        <ModalContent color='white' bg='brandgray.900'>
          <ModalHeader >New Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir='column'>
              <Input placeholder='Enter Name' mt={-3} variant='flushed' name='name' onChange={handleChange} value={project.name} />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button color='brandgray.900' bg='brandred.100' mr={3} onClick={onClose}>
              close
            </Button>
            <Button onClick={handleSubmit} _hover={{ color: 'brandgray.100', bg: 'gray.200' }} color='brandgray.900' bg="brandpurple.100">Create Project</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex display={['none', 'none', 'none', 'flex', 'flex']}  pos='fixed' bg='#292C34' height='100vh' overflowY='auto' w={100}>

        <Flex h='100%' margin='auto' flexDir='column' >
          <Flex mt={10} mb={0} w='100%'>
            <UserButton />
          </Flex>
          <Flex margin='auto' justifyContent='space-between' h={user.publicMetadata.accounttype === 'team' ? "45%" : '35%'} /*h='35%'*/ flexDir='column'>
            {user.publicMetadata.type === 'freelancer'
              ? <Tooltip hasArrow placement='right' label="New Project" bg="gray.300" color="black">
                <Icon onClick={onOpen} alignSelf='center' _hover={{ cursor: 'pointer', color: 'brandpurple.100' }} color='white' w={35} h={35} as={Plus} />
              </Tooltip>
              : null}
              
            <Tooltip hasArrow placement='right' label="Projects" bg="gray.300" color="black">
              <Icon onClick={() => handleNav(`/${user.publicMetadata.type}`)} alignSelf='center' _hover={{ cursor: 'pointer', color: 'brandpurple.100' }} color={props.dashActive ? 'brandpurple.100' : 'white'} w={35} h={35} as={Layers} />
            </Tooltip>
            <Tooltip hasArrow placement='right' label="Project Tasks" bg="gray.300" color="black">
              <Icon onClick={() => handleNav(`/${user.publicMetadata.type}/project`)} alignSelf='center' _hover={{ cursor: 'pointer', color: 'brandpurple.100' }} color={props.taskActive ? 'brandpurple.100' : 'white'} w={35} h={35} as={BarChart2} />
            </Tooltip>
            {user.publicMetadata.accounttype === 'team'
              ? <Tooltip hasArrow placement='right' label="Stripe" bg="gray.300" color="black">
                <Icon onClick={() => handleNav(`/${user.publicMetadata.type}/stripe`)} alignSelf='center' _hover={{ cursor: 'pointer', color: 'brandpurple.100' }} color={props.moneyActive ? 'brandpurple.100' : 'white'} w={35} h={35} as={DollarSign} />
              </Tooltip>
              : null}
            <Tooltip hasArrow placement='right' label="Chat" bg="gray.300" color="black">
              <Icon onClick={() => handleNav(`/${user.publicMetadata.type}/chat/default`)} alignSelf='center' _hover={{ cursor: 'pointer', color: 'brandpurple.100' }} color={props.chatActive ? 'brandpurple.100' : 'white'} w={35} h={35} as={MessageSquare} />
            </Tooltip>
            {/* </Flex> */}
            {/* <Flex justifyContent='center'>
            <Button w='80%' _hover={{ bg: 'brandpurple.100', color: 'white' }} bg='brandgray.200' borderWidth={2} color='white' borderColor='brandpurple.100' >Pro</Button>
          </Flex> */}
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default Nav