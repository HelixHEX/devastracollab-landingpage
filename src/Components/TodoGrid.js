import '../DatePicker.css'

import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { deleteMiniTaskSelector, projectAtom, updateMiniTaskSelector, addMiniTaskStatusSelector, deleteTaskSelector, updateTaskTitleSelector } from "../utils/atom";

import {
  Grid,
  Box,
  Text,
  // Center,
  useDisclosure,
  // Collapse,
  Flex,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Checkbox,
  IconButton,
  Center,
  Tooltip
  // Editable,
  // EditableInput,
  // EditablePreview,
  // useEditableControls,
  // ButtonGroup,
} from '@chakra-ui/react'


import {
  // CheckIcon, 
  // CloseIcon, 
  // EditIcon, 
  // ChevronDownIcon, 
  // ChevronUpIcon, 
  DeleteIcon,
  CalendarIcon,
  CloseIcon
} from '@chakra-ui/icons'

import {
  Trash2
} from 'react-feather'

import { baseURL } from "../utils/globalVar";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

import DatePicker from 'react-date-picker';

import Moment from 'react-moment'

axios.defaults.withCredentials = true

const TodoGrid = () => {
  const project = useRecoilValue(projectAtom)
  return (
    <>
      {/* {project
        ? <> */}
      {/* <Text textAlign='center' color='white' fontSize={40} fontWeight='700'>{project.name}</Text> */}
      <Flex mt={5} display={['flex', 'flex', 'flex', 'flex', 'flex']}>
        <Desktop project={project} />
      </Flex>
      <Flex mt={5} display={['flex', 'flex', 'none', 'none', 'none']}>
        {/* <Mobile /> */}
      </Flex>
      {/* </> : null} */}
    </>

  );
};

const Desktop = ({ project }) => {
  // eslint-disable-next-line
  let tasks = Array.from(project.tasks)
  // tasks = tasks.sort((a, b) => a.createdAt - b.createdAt)
  return (
    <>
      <Grid h='auto' rowGap={10} columnGap={[20, 20, 20, 12, 20]} templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)", "repeat(4, 1fr)"]} >
        {tasks.map((task, index) => (
          <Task key={index} index={index} task={task} />
        ))}
      </Grid>

    </>
  )
}

const Task = ({ task, index }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [newTask, setNewTask] = useState('')
  const toast = useToast()
  const user = useUser()
  // eslint-disable-next-line
  const [addMiniTask, setAddMiniTask] = useRecoilState(updateMiniTaskSelector)
  // eslint-disable-next-line
  const [updateMinitTask, setUpdateMiniTask] = useRecoilState(addMiniTaskStatusSelector)
  // eslint-disable-next-line
  const [deleteMinitTask, setDeleteMiniTask] = useRecoilState(deleteMiniTaskSelector)
  // eslint-disable-next-line
  const [deleteTask, setDeleteTask] = useRecoilState(deleteTaskSelector)
  // eslint-disable-next-line
  const [updateTaskTitle, setUpdateTaskTitle] = useRecoilState(updateTaskTitleSelector)

  const [newTitle, setNewTitle] = useState('')

  const [deadlineDate, setDeadlineDate] = useState(task.deadline !== null ? new Date(task.deadline) : '');

  const handleAddMiniTask = async (e) => {
    e.preventDefault()
    try {
      await axios.post(baseURL + user.publicMetadata.type + '/addminitask', {
        userId: user.id,
        taskuuid: task.uuid,
        title: newTask,
        completed: false
      }).then(res => {
        if (res.data.success) {
          const addedTask = res.data.task
          setNewTask('')
          setAddMiniTask({ addedTask })
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
    // alert(task.completed)
  }

  const handleMiniTaskUpdate = async (index) => {
    try {
      await axios.post(baseURL + user.publicMetadata.type + '/updateminitask', {
        taskuuid: task.uuid,
        userId: user.id,
        index,
        completed: !task.tasks[index].completed
      }).then(res => {
        if (res.data.success) {
          // setUpdateMiniTas
          // alert(res.data.success)
          const updatedMiniTask = {
            uuid: task.uuid,
            miniTask: res.data.miniTask,
            index
          }
          setUpdateMiniTask({ updatedMiniTask })
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

  const handleDeleteTask = async (uuid) => {
    try {
      await axios.post(baseURL + user.publicMetadata.type + '/deletetask', {
        userId: user.id,
        taskuuid: uuid,
      }).then(res => {
        if (res.data.success) {
          onClose()
          setDeleteTask({ index })
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

  const hanldeDeleteMiniTask = async (index) => {
    try {
      await axios.post(baseURL + user.publicMetadata.type + '/deleteminitask', {
        taskuuid: task.uuid,
        userId: user.id,
        index,
      }).then(res => {
        if (res.data.success) {
          const params = {
            uuid: task.uuid,
            index: res.data.index
          }
          setDeleteMiniTask(params)
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

  const handleUpdateTitle = async (e) => {
    e.preventDefault()
    if (newTitle !== '' && task.title !== newTitle) {
      try {
        await axios.post(baseURL + user.publicMetadata.type + '/updatetasktitle', {
          taskuuid: task.uuid,
          userId: user.id,
          newtitle: newTitle
        }).then(res => {
          if (res.data.success) {
            setNewTitle('')
            const params = { index, newTitle }
            setUpdateTaskTitle(params)
            toast({
              description: 'Title updated',
              status: 'success',
              duration: 3000,
              isClosable: true,
            })
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

  // const EditableControls = () => {
  //   const {
  //     isEditing,
  //     getSubmitButtonProps,
  //     getCancelButtonProps,
  //     getEditButtonProps,
  //   } = useEditableControls()

  //   const handleTitleChange = async (index) => {
  //     try {
  //       await axios.post(baseURL + '/deleteminitask', {
  //         taskuuid: task.uuid,
  //         userId: user.id,
  //         index,
  //       }).then(res => {
  //         if (res.data.success) {
  //          alert(res.data.success)
  //         } else {
  //           toast({
  //             title: 'Uh Oh :(',
  //             description: res.data.error,
  //             status: 'error',
  //             duration: 3000,
  //             isClosable: true,
  //           })
  //         }
  //       })
  //     } catch (e) {
  //       toast({
  //         title: 'Uh Oh :(',
  //         description: 'An error has occurred',
  //         status: 'error',
  //         duration: 3000,
  //         isClosable: true,
  //       })
  //     }
  //   }

  //   return isEditing ? (
  //     <ButtonGroup size="sm">
  //       <IconButton onClick={handleTitleChange} bg='brandgreen.100' icon={<CheckIcon />} {...getSubmitButtonProps()} />
  //       <IconButton bg='brandred.100' icon={<CloseIcon />} {...getCancelButtonProps()} />
  //     </ButtonGroup>
  //   ) : (
  //     <Flex>
  //       <IconButton bg='brandpurple.100' size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
  //     </Flex>
  //   )
  // }

  const handleUpdateDeadline = async (value) => {
    try {
      await axios.post(baseURL + user.publicMetadata.type + '/updatetaskdeadline', {
        taskuuid: task.uuid,
        userId: user.id,
        newdeadline: value
      }).then(res => {
        if (res.data.success) {
          setDeadlineDate(value)
        } else {
          setDeadlineDate(task.deadline)
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

  return (

    <>
      {user.publicMetadata.type === 'freelancer'
        ? <Box alignItems='center' onClick={onOpen} _hover={{ cursor: 'pointer', bg: 'brandpurple.100' }} rounded={5} pt={1} pl={5} pr={5} bg='blue.900' w={200} h={95} >
          <Text textAlign='left' whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis' fontWeight='700' fontSize={20} color='white'>{task.title}</Text>
          {task.deadline != null
            ?
            <>
              <Text color={new Date(task.deadline) < new Date().setHours(0, 0, 0, 0) ? 'brandred.100' : 'white'}><Moment format="MMM DD, YYYY">{task.deadline}</Moment></Text>
            </>
            : null}
          <Text fontSize={20} color='white'>{task.tasks.length} tasks</Text>
          {/* </Flex> */}
        </Box>
        : <Box rounded={5} pt={1} pl={5} pr={5} bg='blue.900' w={200} h={95}>
          <Text textAlign='left' whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis' fontWeight='700' fontSize={20} color='white'>{task.title}</Text>
          {task.deadline != null
            ?
            <>
              <Text color={new Date(task.deadline) < new Date().setHours(0, 0, 0, 0) ? 'brandred.100' : 'white'}><Moment format="MMM DD, YYYY">{task.deadline}</Moment></Text>
            </>
            : null}
          <Text fontSize={20} color='gray.300'>{task.tasks.length} tasks</Text>
        </Box>}
      <Modal size='md' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg='whiteAlpha.300' />
        <ModalContent bg='brandgray.900' >
          <ModalHeader pr={45} color='white'>
            {/* <Editable
              defaultValue="Rasengan ⚡️"
              fontSize="lg"
              isPreviewFocusable={false}
            >
              <EditablePreview />
              <Flex flexDir='row'>
                <EditableInput w={300} variant='flushed' />
                <EditableControls />
              </Flex>
            </Editable> */}
            <form onSubmit={handleUpdateTitle}>
              {/* <Center> */}
              <Flex>
                {/* <Text mt={3} fontWeight='700' color='white'>Update Title:</Text> */}
                <Input ml={2} defaultValue={task.title} value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder='Edit Title' w={'80%'} color='white' variant='flushed' />
                <Tooltip hasArrow placement='bottom' label="Update Task Title" bg="gray.300" color="black">
                  <Button _hover={{ color: 'brandgray.900', bg: 'gray.200' }} onClick={handleUpdateTitle} bg='brandpurple.100' size='sm' fonSize={20} ml={3}>Update</Button>
                </Tooltip>
                <Tooltip hasArrow placement='bottom' label="Delete Task" bg="gray.300" color="black">
                  <Button onClick={() => handleDeleteTask(task.uuid)} bg='brandred.100' size='sm' color='brandgray.100' ml={2}><Trash2 /></Button>
                </Tooltip>

              </Flex>
              {/* </Center> */}
            </form>
            {/* {task.title}*/}
          </ModalHeader>
          <ModalCloseButton color='white' />
          <ModalBody>
            {/* <Lorem count={2} /> */}
            <Flex color='black'>
              <Text mr={3} fontWeight='700' color='white'>Deadline: </Text>
              <DatePicker
                onChange={handleUpdateDeadline}
                value={deadlineDate}
                clearIcon={<CloseIcon h={3} w={3} color='brandpurple.100' _hover={{ color: 'white', cursor: 'pointer' }} />}
                calendarIcon={<CalendarIcon color='brandpurple.100' _hover={{ color: 'white', cursor: 'pointer' }} />}
              />
            </Flex>
            <Text color='white' mt={5}>Tasks</Text>
            <form onSubmit={handleAddMiniTask}>
              <Flex mt={0}>
                <Input color='white' w={'100%'} placeholder='Add mini task' value={newTask} onChange={(e) => setNewTask(e.target.value)} variant='flushed' />
                <Button onClick={handleAddMiniTask} size='sm' bg='brandpurple.100' ml={3} fonSize={20}>Add</Button>
              </Flex>
            </form>
            <Box mt={2} bg='blue.900' w='100%' color='white' p={5} pt={2}>
              {task.tasks.map((miniTask, key) => (
                <Flex mt={2} w='100%' key={key}>
                  {/* <Text mt={2}>{miniTask.title}</Text> */}
                  <Checkbox w='100%' onChange={() => handleMiniTaskUpdate(key)} colorScheme="green" mt={2} defaultIsChecked={miniTask.completed}>
                    <Flex >
                      <Text color={miniTask.completed ? 'white' : 'brandred.100'} mr={10}>{miniTask.title}</Text>
                      <IconButton right={0} pos='absolute' onClick={() => hanldeDeleteMiniTask(key)} w={5} h={7} _hover={{ color: 'brandred.100', bg: 'white' }} bg='brandred.100' ml={50} icon={<DeleteIcon />} />
                    </Flex>
                  </Checkbox>
                </Flex>
              ))}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button bg="brandred.100" mr={3} onClick={onClose}>
              close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default TodoGrid

