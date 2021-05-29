import '../../DatePicker.css'
import React, { forwardRef, useEffect, useState } from 'react'

import {
  useParams,
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
  Icon
} from '@chakra-ui/react'

import { RepeatIcon, CalendarIcon, CloseIcon } from '@chakra-ui/icons'

import Header from '../../Components/Header'
import Nav from '../../Components/Nav'
import TodoGrid from '../../Components/TodoGrid'
import ProBanner from '../../Components/ProBanner'

import axios from 'axios'

import { fetchProjects, currentProjectAtom, projectAtom, updateTasksSelector } from '../../utils/atom'
import { useRecoilState, useRecoilValue } from "recoil";
import { baseURL } from '../../utils/globalVar'
import { useUser } from '@clerk/clerk-react'

import DatePicker from 'react-date-picker';

// import { useHistory } from 'react-router-dom'
import { Settings } from 'react-feather'

axios.defaults.withCredentials = true

const Project = () => {
  const user = useUser()
  const [currentProject, setCurrentProject] = useRecoilState(currentProjectAtom);
  const { id } = useParams()
  const [task, setTask] = useState('')
  const toast = useToast()
  const project = useRecoilValue(projectAtom)
  // eslint-disable-next-line
  const [updateTask, setUpdateTasks] = useRecoilState(updateTasksSelector)
  const { isOpen, onOpen, onClose } = useDisclosure()


  useEffect(() => {
    if (id !== 'default') {
      setCurrentProject(id)
    }
  }, [id, setCurrentProject])

  const handleChange = (event) => {
    if (event.target.value !== '') {
      setCurrentProject(event.target.value)
      window.location.href = event.target.value
    }
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    if (task !== '') {
      try {
        await axios.post(baseURL + user.publicMetadata.type + '/addtask', {
          userId: user.id,
          projectuuid: project.uuid,
          description: '',
          title: task
        }).then(res => {
          if (res.data.success) {
            let addedTask = res.data.task
            setTask('')
            setUpdateTasks({ addedTask })
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
      // setUpdateTasks({ item })
    }
  }



  // const Status = () => {
  //   return (
  //     <>
  //       <Box color='white' bg='brandgray.900' h={100} w={300}>
  //         <Text>Items Completed: { }</Text>
  //       </Box>
  //     </>
  //   )
  // }
  const hanldeDeleteProject = async () => {
    try {
      await axios.post(baseURL + user.publicMetadata.type + '/deleteproject', {
        projectuuid: project.uuid,
        userId: user.id
      }).then(res => {
        toast({
          description: 'Project deleted',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
        onClose()
        setTimeout(() => { window.location.href = `/${user.publicMetadata.type}` }, 2000)
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
      {/* <ProBanner /> */}
      {/* <Grid
        h="100vh"
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(18, 1fr)"
        gap={0}
      > */}
        {/* <GridItem display={['none', 'none', 'none', 'flex', 'flex']} bg="brandgray.200" rowSpan={2} colSpan={1}> */}
          <React.Suspense fallback={null}>
            <Nav taskActive={true} />
          </React.Suspense>
        {/* </GridItem> */}
        {/* <GridItem ml='5%' mr='5%' overflow='auto' rowSpan={2} colSpan={[18, 18, 18, 17, 17]} bg='brandgray.100'> */}
          <Header projectActive={true} />
          {project
            ? <>
              <Flex ml={[0, 0, 0, 20]} flexDir='column' >
                <Flex ml='5%' mt='5%' >
                  <Text fontSize='40' fontWeight='700' color='white'>{project.name}</Text>
                  {project
                    ? <>
                      {project.creator.clerkid === user.id ? <Button ml={3} w={[75, 120]} fontSize={[10, 15]} onClick={onOpen} alignSelf='center' color='brandgray.100' bg='brandred.100' >Delete Project</Button> : null}
                    </>
                    : null}
                  <ProjectSettings project={project} />
                  <RepeatIcon onClick={() => window.location.reload()} _hover={{ color: 'gray.200', cursor: 'pointer' }} ml={3} alignSelf='center' w={25} h={25} color='brandpurple.100' />
                </Flex>
                <Flex ml='5%' flexDir={['column', 'column', 'row']} mt='2%'>
                  <Center>
                    <Select borderWidth={2} onChange={handleChange} borderColor='brandpurple.100' color='white' w={200} placeholder='Select Project'>
                      <React.Suspense fallback={null}>
                        <ProjectOptions />
                      </React.Suspense>
                    </Select>
                  </Center>
                  <Center mt={[3, 0]}>
                    <form onSubmit={handleAdd}>
                      <Input value={task} onChange={(e) => setTask(e.target.value)} color='white' placeholder='New Task List' variant='flushed' ml={[0, 0, 100]} w={[200, 250, 300]} />
                      <Button onClick={handleAdd} _hover={{ color: 'brandgray.100', bg: 'gray.200' }} color='white' bg='brandpurple.100' ml={5}>Add</Button>
                    </form>
                  </Center>
                </Flex>
                {currentProject === ''
                  ? <Text mt='1%' color='brandred.100'>* Select a project</Text>
                  : <>
                    <Flex alignItems='center' flexDir='column' mb='5%' mt='1%'>
                      <React.Suspense fallback={<CircularProgress isIndeterminate color="brandpurple.100" />}>
                        <TodoGrid />
                      </React.Suspense>
                    </Flex>
                  </>
                }
              </Flex>
            </> : <>
              {id === 'default'
                ?
                <>
                  <Flex ml={[0, 0, 0, 20]} flexDir='column' >
                    <Flex ml='5%' mt='5%'>
                      <Text fontSize='40' fontWeight='700' color='white'>{project.name}</Text>
                    </Flex>
                    <Flex ml='5%' flexDir={['column', 'column', 'row']} mt='2%'>
                      <Center>
                        <Select borderWidth={2} onChange={handleChange} borderColor='brandpurple.100' color='white' w={200} placeholder='Select Project'>
                          <React.Suspense fallback={null}>
                            <ProjectOptions />
                          </React.Suspense>
                        </Select>
                      </Center>
                    </Flex>
                    {currentProject === ''
                      ? <Text ml='5%' mt='1%' color='brandred.100'>* Select a project</Text>
                      : null}
                  </Flex>
                </> :
                <Center>
                  <Text color='white' fontWeight='700' fontSize={30}>Project Not Found</Text>
                </Center>}
            </>}
        {/* </GridItem> */}
      {/* </Grid> */}
      <Modal size='sm' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg='whiteAlpha.300' />
        <ModalContent bg='brandgray.900' >
          <ModalHeader color='white'>
            Are you sure?
          </ModalHeader>
          <ModalCloseButton color='white' />
          <ModalBody>
            <Text color='white'>This action is not reversible</Text>
          </ModalBody>

          <ModalFooter>
            <Button bg='brandpurple.100' mr={3} onClick={onClose}>
              No
            </Button>
            <Button bg='brandred.100' mr={3} onClick={hanldeDeleteProject}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

const ProjectSettings = ({ project }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const [clientEmail, setClientEmail] = useState('')
  const user = useUser()
  const [newTitle, setNewTitle] = useState('')
  const [deadlineDate, setDeadlineDate] = useState(project.deadline !== null ? new Date(project.deadline) : '');
  const handleInviteClient = async (e) => {
    e.preventDefault()
    if (clientEmail !== '') {
      try {
        await axios.post(baseURL + window.Clerk.user.publicMetadata.type + '/inviteclient', {
          userId: user.id,
          email: clientEmail,
          projectuuid: project.uuid
        }).then(res => {
          if (res.data.success) {
            setClientEmail('')
            toast({
              // title: 'Uh Oh :(',
              description: 'User invited',
              status: 'success',
              duration: 3000,
              isClosable: true,
            })
          } else {
            setClientEmail('')
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

  const handleUpdateTitle = async (e) => {
    e.preventDefault()
    if (newTitle !== '') {
      try {
        await axios.post(baseURL + user.publicMetadata.type + '/updateprojecttitle', {
          projectuuid: project.uuid,
          userId: user.id,
          newtitle: newTitle
        }).then(res => {
          if (res.data.success) {
            setNewTitle('')
            window.location.reload()
          } else {
            setNewTitle('')
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
        setNewTitle('')
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
  const handleUpdateDeadline = async (value) => {
    try {
      await axios.post(baseURL + user.publicMetadata.type + '/updateprojectdeadline', {
        projectuuid: project.uuid,
        userId: user.id,
        newdeadline: value
      }).then(res => {
        if (res.data.success) {
          setDeadlineDate(value)
        } else {
          setDeadlineDate(project.deadline)
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
  var start = new Date();
  start.setHours(0, 0, 0, 0)
  return (
    <>
      {project
        ? <>
          {project.creator.clerkid === user.id
            ?
          <>
            <Tooltip hasArrow placement='bottom' label="Project Settings" bg="gray.300" color="black">
              {/* <Button onClick={onOpen} bg='none' color='brandpurple.100' alignSelf='center' ml={2}></Button> */}
              {/* <Settings onClick={onOpen} color='brandpurple.100' alignSelf='center' ml={2} /> */}
              <Icon w={25} h={25} _hover={{bg: 'none', color: 'gray.200', cursor: 'pointer'}} onClick={onOpen} bg='none' color='brandpurple.100' alignSelf='center' ml={3} as={Settings}/>
            
            </Tooltip>
            </>: null}
        </>
        : null}
      <Modal size='2xl' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg='whiteAlpha.300' />
        <ModalContent bg='brandgray.900' >
          <ModalHeader color='white'>
            Project Settings
            
          </ModalHeader>
          <ModalCloseButton color='white' />
          <ModalBody>
            <Flex color='black'>
              <Text mr={3} fontWeight='700' color='white'>Deadline: </Text>
              <DatePicker
                onChange={handleUpdateDeadline}
                value={deadlineDate}
                clearIcon={<CloseIcon h={3} w={3} color='brandpurple.100' _hover={{color: 'white', cursor: 'pointer'}}  />}
                calendarIcon={<CalendarIcon color='brandpurple.100' _hover={{color: 'white', cursor: 'pointer'}} />}
              />
            </Flex>

            {/* <Lorem count={2} /> */}
            <form onSubmit={handleUpdateTitle}>
              <Flex>
                <Text mt={5} fontWeight='700' color='white'>Update Title</Text>
                <Input ml={3} value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder='New Title' w={400} color='white' variant='flushed' />
                <Button onClick={handleUpdateTitle} bg='brandpurple.100' ml={3}>Update</Button>
              </Flex>
            </form>
            <form onSubmit={handleInviteClient}>
              <Flex mt={5} w='100%' >
                <Text mt={5} fontWeight='700' color='white'>Invite client</Text>
                <Input ml={3} color='white' value={clientEmail} onChange={e => setClientEmail(e.target.value)} w={400} placeholder='Enter client email' variant='flushed' />
                <Button onClick={handleInviteClient} bg='brandpurple.100' ml={3}>Invite</Button>
              </Flex>
            </form>
            {/* {project.invitedusers.length > 1 
            ?<> 
            <Text fontWeight='700' mt={5} color='white'>Pending Invites</Text>
            {project.invitedusers.map((user, index) => (
              <Text mt={2} color='white'>{index +1}. {user.email}</Text>
            ))}
            </>: null} */}
            <Text fontWeight='700' mt={5} color='white'>Pending Invites</Text>
            {project
              ? <>
                {project.invitedusers.map((user, index) => (
                  <Text mt={2} color='white'>{user.email}</Text>
                ))}
                <Text mt={5} fontWeight='700' color='white'>Members</Text>
                {project.freelancers.map((freelancer, index) => (
                  <Text mt={2} color='white'>{freelancer.name}</Text>
                ))}
                {project.clients.map((client, index) => (
                  <Text mt={2} color='white'>{client.name}</Text>
                ))}
              </> : null}
          </ModalBody>

          <ModalFooter>
            <Button bg='brandred.100' mr={3} onClick={onClose}>
              close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

const ProjectOptions = () => {
  const projects = useRecoilValue(fetchProjects);
  const { id } = useParams()
  const user = useUser()
  useEffect(() => {
    if (projects.length === 1 && id === 'default') {
      window.location.href = `/${user.publicMetadata.type}/project/${projects[0].uuid}`
    }
  })
  return (
    <>
      {projects.map((data, index) => {
        if (data.uuid === id) {
          return <option selected key={index} value={data.uuid}>{data.name}</option>
        } else {
          return <option key={index} value={data.uuid}>{data.name}</option>
        }
      })}
    </>
  )
}

export default Project