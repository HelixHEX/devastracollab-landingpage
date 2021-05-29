import React, { useEffect, useState } from 'react'

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
  Center,
  // useToast,
  // Box
} from '@chakra-ui/react'

import {RepeatIcon} from '@chakra-ui/icons'

import Header from '../../Components/Header'
import Nav from '../../Components/Nav'
import TodoGrid from '../../Components/TodoGrid'


import { projectAtom, fetchProjects, currentProjectAtom, updateTasksSelector } from '../../utils/atom'
import { useRecoilState, useRecoilValue } from "recoil";
// import { useUser } from '@clerk/clerk-react'

const Project = () => {
  const [currentProject, setCurrentProject] = useRecoilState(currentProjectAtom);
  const { id } = useParams()
    // eslint-disable-next-line
  const [task, setTask] = useState('')
  // const toast = useToast()
  // const project = useRecoilValue(projectAtom)
  // eslint-disable-next-line
  const [updateTask, setUpdateTasks] = useRecoilState(updateTasksSelector)
  const project = useRecoilValue(projectAtom)
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

  // const Status = () => {
  //   return (
  //     <>
  //       <Box color='white' bg='brandgray.900' h={100} w={300}>
  //         <Text>Items Completed: { }</Text>
  //       </Box>
  //     </>
  //   )
  // }
  return (
    <>
      <Grid
        h="100vh"
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(18, 1fr)"
        gap={0}
      >
        <GridItem display={['none', 'none', 'none', 'flex', 'flex']} bg="brandgray.200" rowSpan={2} colSpan={1}>
          <React.Suspense fallback={null}>
            <Nav taskActive={true} />
          </React.Suspense>
        </GridItem>
        <GridItem ml='5%' mr='5%' overflow='auto' rowSpan={2} colSpan={[18, 18, 18, 17, 17]} bg='brandgray.100'>
          <Header projectActive={true} />
          <Flex mt='5%' flexDir='column' >
            <Flex>
            <Text fontSize='40' fontWeight='700' color='white'>Test</Text>
            <RepeatIcon alignSelf='center' onClick={() => window.location.reload()} _hover={{color: 'gray.200', cursor: 'pointer'}} ml={3} w={25} h={25} color='brandpurple.100' />
            </Flex>
            <Flex flexDir={['column', 'column', 'row']} mt='2%'>
              <Center>
                <Select borderWidth={2} onChange={handleChange} borderColor='brandpurple.100' color='white' w={200} placeholder='Select Project'>
                  <React.Suspense fallback={null}>
                    <ProjectOptions />
                  </React.Suspense>
                </Select>
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
        </GridItem>
      </Grid>
      {/* <TodoGrid /> */}

    </>
  )
}

const ProjectOptions = () => {
  const projects = useRecoilValue(fetchProjects);
  const { id } = useParams()
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