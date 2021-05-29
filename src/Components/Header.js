import React, { useState } from 'react'
import { UserButton, useUser } from "@clerk/clerk-react";

import {
  Button,
  Flex,
  Text,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  FormLabel,
  useToast,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box
} from '@chakra-ui/react'

import { Plus, Menu } from 'react-feather';

import axios from 'axios'


import { currentProjectAtom, fetchProjects } from '../utils/atom'
import { useRecoilState, useRecoilValue } from 'recoil'

import { baseURL } from '../utils/globalVar'

axios.defaults.withCredentials = true

const Header = (props) => {
  const user = useUser()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const [project, setProject] = useState({
    name: ''
  })
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
            window.location.replace('/')
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
      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg='brandpurple.100'>
          <ModalHeader color='brandgray.100'>New Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir='column'>
              <FormLabel>Name</FormLabel>
              <Input mt={-3} variant='flushed' name='name' onChange={handleChange} value={project.name} />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button color='brandgray.100' variant="ghost" mr={3} onClick={onClose}>
              close
            </Button>
            <Button onClick={handleSubmit} _hover={{ color: 'brandgray.100', bg: 'gray.200' }} color='white' bg="brandgray.900">Create Project</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
        {/* {user.publicMetadata.type === 'freelancer'
          ? <>
            <Button onClick={onOpen} _hover={{ bg: 'brandpurple.100', color: 'white' }} bg='brandgray.200' borderWidth={2} color='white' borderColor='brandpurple.100'>
              New Project
              <Icon ml={2} as={Plus} />
            </Button>
          </>
          : null} */}

        {/* <Flex ml={2} align='center'>
          <Text wordBreak='break-all' color='brandgray.50'>{user.firstName}</Text>
        </Flex> */}
        <Flex justifyContent='flex-end' mr='10%' mt='2%' align='center' ml={3} display={['flex', 'flex', 'flex', 'none', 'none']}>
          <React.Suspense fallback={null}>
            <MobileMenu props={props} />
          </React.Suspense>
        </Flex>
    </>
  )
}

const MobileMenu = ({ props }) => {
  const projects = useRecoilValue(fetchProjects);
  const user = useUser()
  const { isOpen, onOpen, onClose } = useDisclosure()
  // eslint-disable-next-line
  const [currentProject, setCurrentProject] = useRecoilState(currentProjectAtom)
  const handleNav = (link) => {
    if (link.includes(`${user.publicMetadata.type}/project`)) {
      if (currentProject !== '') {
        window.location.href = `${link}${currentProject}`
      } else if (projects.length === 1) {
        window.location.href = `${link}/${projects[0].uuid}`
      } else {
        window.location.href = `${link}/default`
      }
    } else {
      window.location.href = `${link}`
    }

  }
  return (
    <>
      <NewProject />
      <Flex mr={5} align='center'>
        <UserButton />
      </Flex>
      <IconButton bg='none' color='white' aria-label="Mobile Menu" icon={<Menu onClick={onOpen} />} />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size='full'
      >
        <DrawerOverlay>
          <DrawerContent bg='brandpurple.100'>
            <DrawerCloseButton />
            <DrawerHeader></DrawerHeader>

            <DrawerBody>
              <Text onClick={() => handleNav(`/${user.publicMetadata.type}`)} textAlign='center' color={props.dashActive ? 'brandgray.900' : 'white'} fontSize={30}>Dashboard</Text>
              <Text onClick={() => handleNav(`/${user.publicMetadata.type}/project`)} textAlign='center' color={props.projectActive ? 'brandgray.900' : 'white'} fontSize={30}>Activity</Text>
              {/* <Text onClick={() => handleNav(`/${user.publicMetadata.type}/stripe`)} textAlign='center' color={props.projectActive ? 'brandgray.900' : 'white'} fontSize={30}>Stripe</Text> */}
              <Text onClick={() => handleNav(`/${user.publicMetadata.type}/chat/default`)} textAlign='center' color={props.projectActive ? 'brandgray.900' : 'white'} fontSize={30}>Chat</Text>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

const NewProject = () => {
  const user = useUser()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const [project, setProject] = useState({
    name: ''
  })
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
            window.location.replace('/')
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
      <Button onClick={onOpen} _hover={{ bg: 'brandpurple.100', color: 'white' }} bg='brandgray.200' borderWidth={2} color='white' borderColor='brandpurple.100' mr={5}>
        New Project
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg='whiteAlpha.300' />
        <ModalContent color='white' bg='brandgray.900'>
          <ModalHeader >New Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir='column'>
              {/* <FormLabel>Name</FormLabel> */}
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
    </>
  )
}

export default Header