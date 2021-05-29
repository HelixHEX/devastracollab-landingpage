import React from 'react'

import {
  Flex,
  Box,
  Text,
  Grid,
  Image,
  // Progress,
} from '@chakra-ui/react'

import Tilt from 'react-tilt'

import { fetchProjects, currentProjectAtom,  } from '../utils/atom'
import { useRecoilState, useRecoilValue } from "recoil";
import { useUser } from '@clerk/clerk-react';

import Moment from 'react-moment';

const ProjectsGrid = () => {
  const projects = useRecoilValue(fetchProjects);
   // eslint-disable-next-line
  const [currentProject, setCurrentProject] = useRecoilState(currentProjectAtom)
  const user = useUser()

  const chooseProject = (uuid) => {
    setCurrentProject(uuid)
    window.location.replace(`/${user.publicMetadata.type}/project/${uuid}`)
  }
  return (
    <>
      <Grid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap={20}>
        {projects
          ?
          <>
            {
              projects.map((data, index) => (
                <>
                  <Tilt key={index} className="Tilt" options={{ max: 25 }}>
                    <Box _hover={{ cursor: 'pointer' }} onClick={() => chooseProject(data.uuid)} boxShadow="md" pr={5} pl={5} pt={3} pb={10} rounded={10} w={[300, 325, 330]} minH={100} h='auto' bg='brandgray.900'>
                      <Text color='white' fontSize={30}>{data.name}</Text>
                      <Flex color='white'>
                        <Text>{data.tasks.length} tasks</Text>
                        {data.deadline != null
                        ? <>
                        <Text>&nbsp;|&nbsp;</Text>
                        <Text color={new Date(data.deadline) < new Date().setHours(0, 0, 0, 0) ? 'brandred.100' : 'white'}><Moment format="MMM DD, YYYY">{data.deadline}</Moment></Text>
                        </> :null}
                      </Flex>
                      {/* <Text mb={2} mt={6} color='white'>Members</Text> */}
                      <Flex flexDir='row'>
                        {/* {data.freelancers.slice(0, 2).map(user => (
                          <Image  
                            mr={2}
                            boxSize="50px"
                            objectFit="cover"
                            src={user.profileImg}
                            alt={user.name}
                            fallbackSrc="https://via.placeholder.com/150"
                          />

                        ))}
                        {data.clients.slice(0, 2).map(user => (
                          <Image
                            mr={2}
                            boxSize="50px"
                            objectFit="cover"
                            src={user.profileImg}
                            alt={user.name}
                            fallbackSrc="https://via.placeholder.com/150"
                          />

                        ))}
                        {(data.freelancers.length + data.clients.length) > 4
                          ? <Box justifyContent='center' w='50px' h='50px' bg='brandpurple.100'>
                            <Text mt='12px' color='white' fontWeight='700' textAlign='center'>+{(data.freelancers.length + data.clients.length) - 4}</Text>
                          </Box>
                          : null} */}
                      </Flex>
                      {/* <Flex justifyContent='space-between' w='100%' mt={6} >
                        <Text fontSize={20} color='white'>Progress</Text>
                        <Text alignSelf='center' fontSize={15} color='brandgray.50'>{data.progress}%</Text>
                      </Flex>
                      <Progress mt={2} size='sm' colorScheme='purple' rounded={10} value={data.progress} /> */}
                    </Box>
                  </Tilt>
                </>
              ))
            }
          </>
          : null}
      </Grid>
    </>
  )
}

export default ProjectsGrid