import React from 'react';
import { useHistory } from 'react-router-dom'
import {
  Button,
  Center,
  Text,
  Flex,
  Heading,
  Box,
  Grid,
  GridItem,
  IconButton,
  Divider,
  Image,
  List,
  ListItem,
  ListIcon
} from '@chakra-ui/react'

import { Layout, MessageSquare, Users, CheckCircle } from 'react-feather'

import demo from '../assets/demo.png'
import logo from '../assets/Logo1.png'

import Tilt from 'react-tilt'

// import { useClerk } from "@clerk/clerk-react";

const Welcome = (props) => {
  const history = useHistory()
  const handleSignin = () => {
    history.push('/signin')
    // window.location.href = 'https://astracollab.app/signin'
  }
  const handleSignup = () => {
    history.push('/signup')
    // window.location.href = 'https://astracollab.app/signup'
  }

  const handleTeamSignup = (plan) => {
    history.push(`/team/signup/${plan}`)
  }
  return (
    <>
      {/* <Center textAlign='center' flexDir='column' h='100vh'>
        <Text fontSize={50} color='white'> Welcome to AstraCollab</Text>
        <Text fontSize={20} color='white'>Built for freelancers by a freelancer</Text>
        <Flex mt={2} justifyContent='space-evenly' w={300}>
          <Button _hover={{color:'brandpurple.100', bg: 'brandgray.900'}} color='brandgray.900' bg='brandpurple.100' onClick={() => handleSignin()}>Signin</Button>
          <Button _hover={{color:'brandgray.900', bg: 'brandpurple.100'}} color='brandpurple.100' bg='brandgray.900' onClick={() => handleSignup()}>Signup as freelancer</Button>
        </Flex>
          <Button _hover={{ bg: 'gray.200', color: 'brandgray.900' }} mr={5} alignSelf='center' color='white' rounded={0} bg='brandpurple.100'>Sign Up</Button> 
        A small step for a freelancer but a giant leap for a business relationship
        A client is always right - if they're using emojis
      </Center> */}
      <Box w='100%' h={100} >
        <Flex flexDir='row' w='100%' h='100%'>
          <Image
            src={logo}
            h={100}
            w={300}
          />
          <Flex ml={10} h='100%' justify='flex-end'>
            <Button onClick={() => handleSignin()} _hover={{ bg: 'gray.200', color: 'brandgray.900' }} mr={[4, 10, 30, 40]} alignSelf='center' color='white' bg='brandpurple.100'>Sign In</Button>
          </Flex>
        </Flex>
      </Box>
      <Center mt={100} flexDir='column'>
        <Heading pl={5} pr={5} textAlign='center' color='white' flexDir='column' fontSize={45} >Project management for freelancers</Heading>
        <Text mt={5} textAlign='center' w={['95%', '50%']} color='gray.500' fontSize={25} >A cloud-based project management software used by multiple freelancers and clients to establish a better client-consultant relationship.</Text>
        <Button onClick={() => handleSignup()} mt={5} _hover={{ bg: 'gray.200', color: 'brandgray.900' }} color='white' bg='brandpurple.100' mb={5}>Get Started</Button>
        <a href="https://www.producthunt.com/posts/astracollab?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-astracollab" target="_blank" rel="noreferrer"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=296541&theme=dark" alt="AstraCollab - Build a better freelancer to client relationship | Product Hunt" style={{ width: '250px', height: '54px' }} width="250" height="54" /></a>
        <Tilt className="Tilt" options={{ max: 10 }}>
          <Box mt={10} rounded={10} w={[350, 400, 500, 600, 800]} h={[300, 300, 400, 400, 500]} bg="gray.900" p={5}>
            <Image
              h='100%'
              w='100%'
              src={demo}
              alt='App preview'
            />
          </Box>
        </Tilt>
        <Grid pl={[50, 50, 150]} pr={[50, 50, 150]} mt={20} rowGap={20} columnGap={10} templateRows="repeat(1, 1fr)" templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}>
          <GridItem>
            <Flex h='100%' w='100%' justifyContent='center' flexDir='column'>
              <Flex h='100%' w='100%' flexDir='column'>
                <IconButton
                  _hover={{ bg: 'brandpurple.100', color: 'white', cursor: 'default' }}
                  alignSelf='center'
                  bg='brandpurple.100'
                  color='white'
                  isRound={true}
                  w={65}
                  h={65}
                  size='lg'
                  icon={<Layout />}
                />
                <Text mt={2} textAlign='center' color='white' fontWeight='700' fontSize={30}>Simple Design</Text>
                <Text mt={2} textAlign='center' color='gray.500' fontSize={20} > A flexible, easy to use design. It is ideal for the entire lifecycle of projects and clients from one to millions.</Text>
              </Flex>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex h='100%' w='100%' flexDir='column'>
              <IconButton
                _hover={{ bg: 'brandpurple.100', color: 'white', cursor: 'default' }}
                // onClick={{bg: 'brandpurple.100', color: 'white'}}
                alignSelf='center'
                bg='brandpurple.100'
                color='white'
                isRound={true}
                w={65}
                h={65}
                size='lg'
                icon={<MessageSquare />}
              />
              <Text mt={2} textAlign='center' color='white' fontWeight='700' fontSize={30}>Real-Time Chat</Text>
              <Text mt={2} textAlign='center' color='gray.500' fontSize={20} >There is no need to use regular email for internal communication anymore. Instant private chat across your projects. Build your team and increase your productivity. </Text>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex h='100%' w='100%' flexDir='column'>
              <IconButton
                _hover={{ bg: 'brandpurple.100', color: 'white', cursor: 'default' }}
                alignSelf='center'
                bg='brandpurple.100'
                color='white'
                isRound={true}
                w={65}
                h={65}
                size='lg'
                icon={<Users />}
              />
              <Text mt={2} textAlign='center' color='white' fontWeight='700' fontSize={30}>Collaboration</Text>
              <Text mt={2} textAlign='center' color='gray.500' fontSize={20} >With task management, chat integration and project management, AstraCollab is the one tool you need for seamless collaboration and communication. Collaboration couldn't have been made easier</Text>
            </Flex>
          </GridItem>
        </Grid>
        {/* <Divider w='80%' mt={20} /> */}
        <Heading mt={20} color='white'>Workflow that just works</Heading>
        <Text w={['95%', '90%', '40%']} mt={2} textAlign='center' color='gray.500' fontSize={20} >Based on the principle of simplicity and flexibility, AstraCollab is designed to help people coordinate work flows, avoid conflicts and maintain transparency.</Text>
        <Divider w='80%' mt={10} />
        <Heading mt={10} color='white' >Pricing</Heading>
        <Flex flexDir={['column', 'column', 'column', 'column', 'row']} >
          <Flex flexDir='column' bg='white' rounded={10} color='brandgray.900' mt={5} w={[350, 400]} minH={300} h='auto'>
            <Text mt={2} textAlign='center' fontSize={30} fontWeight='700'>Individual</Text>
            <Text textAlign='center' fontSize={35}>$0</Text>
            <Text textAlign='center'>Free Forever</Text>
            <Button mt={2} alignSelf='center' w={200} onClick={() => handleSignup()} _hover={{ bg: 'brandgray.900', color: 'white' }} borderWidth={2} borderColor='brandgray.900' bg='none' color='brandgray.900'>Get Started For Free</Button>
            <Text textAlign='center'>* No credit card required</Text>
            <Text fontSize={25} mt={10} textAlign='center'>Great for individuals</Text>
            <List mb={5} ml={10} mt={5}>
              <ListItem>
                <Flex >
                  <ListIcon h={25} w={25} as={CheckCircle} />
                  <Text alignSelf='center'>Unlimited projects</Text>
                </Flex>
              </ListItem>
              <ListItem mt={8}>
                <Flex >
                  <ListIcon h={25} w={25} as={CheckCircle} />
                  <Text alignSelf='center'>Unlimited tasks</Text>
                </Flex>
              </ListItem>
              <ListItem mt={8}>
                <Flex >
                  <ListIcon h={25} w={25} as={CheckCircle} />
                  <Text alignSelf='center'>Unlimited client invites</Text>
                </Flex>
              </ListItem>
              <ListItem mt={8}>
                <Flex >
                  <ListIcon h={25} w={25} as={CheckCircle} />
                  <Text alignSelf='center'>Unlimited messages</Text>
                </Flex>
              </ListItem>
              <ListItem mt={8}>
                <Flex >
                  <ListIcon h={25} w={25} as={CheckCircle} />
                  <Text alignSelf='center'>Project deadlines</Text>
                </Flex>
              </ListItem>
              <ListItem mt={8}>
                <Flex >
                  <ListIcon h={25} w={25} as={CheckCircle} />
                  <Text alignSelf='center'>Task deadlines</Text>
                </Flex>
              </ListItem>
            </List>
          </Flex>
          {/* <Box ml={5} mt={10} bg='brandgray.900' w={400} h={300}>

          </Box> */}
          <Flex ml={5} flexDir='column' bg='brandpurple.100' rounded={10} color='white' mt={5} w={[350, 400]} minH={300} h='auto'>
            <Text mt={2} textAlign='center' fontSize={30} fontWeight='700'>Premium</Text>
            <Text textAlign='center' fontSize={35}>$14.99</Text>
            <Text textAlign='center'>Billed monthly</Text>
            <Button mt={2} alignSelf='center' w={200} onClick={() => handleTeamSignup('premium')} _hover={{ bg: 'gray.200', color: 'brandgray.900' }} bg='brandgray.900' color='white'>Get Started</Button>
            {/* <Text textAlign='center'>* No credit card required</Text> */}
            <Text fontSize={25} mt={10} textAlign='center'>Manage small to medium teams</Text>
            <List mb={5} ml={10} mt={5}>
              <ListItem>
                <Flex >
                  <ListIcon h={25} w={25} as={CheckCircle} />
                  <Text alignSelf='center'>All the benefits of the individual plan</Text>
                </Flex>
              </ListItem>
              <ListItem mt={8}>
                <Flex >
                  <ListIcon h={25} w={25} as={CheckCircle} />
                  <Text alignSelf='center'>1 team</Text>
                </Flex>
              </ListItem>
              <ListItem mt={8}>
                <Flex >
                  <ListIcon h={25} w={25} as={CheckCircle} />
                  <Text alignSelf='center'>Up to 10 members</Text>
                </Flex>
              </ListItem>
              <ListItem mt={8}>
                <Flex >
                  <ListIcon h={25} w={25} as={CheckCircle} />
                  <Text alignSelf='center'>Invoice/charge clients</Text>
                </Flex>
              </ListItem>
              <ListItem mt={8}>
                <Flex >
                  <ListIcon h={25} w={25} as={CheckCircle} />
                  <Text alignSelf='center'>Stripe integration</Text>
                </Flex>
              </ListItem>
              <ListItem mt={8}>
                <Flex >
                  <ListIcon h={25} w={25} as={CheckCircle} />
                  <Text alignSelf='center'>Assign projects</Text>
                </Flex>
              </ListItem>
              <ListItem mt={8}>
                <Flex >
                  <ListIcon h={25} w={25} as={CheckCircle} />
                  <Text alignSelf='center'>Assign tasks</Text>
                </Flex>
              </ListItem>
            </List>
          </Flex>

          <Flex ml={5} flexDir='column' bg='white' rounded={10} color='brandgray.900' mt={5} w={[350, 400]} minH={300} h='auto'>
            <Text mt={2} textAlign='center' fontSize={30} fontWeight='700'>Business</Text>
            <Text textAlign='center' fontSize={35}>$24.99</Text>
            <Text textAlign='center'>Billed monthly</Text>
            <Button mt={2} alignSelf='center' w={200} onClick={() => handleTeamSignup('business')} _hover={{ bg: 'brandgray.900', color: 'white' }} borderWidth={2} borderColor='brandgray.900' bg='none' color='brandgray.900'>Get Started</Button>
            <Text fontSize={25} mt={10} textAlign='center'>Manage large teams</Text>
            <List mb={5} mr={10} ml={10} mt={5}>
              <ListItem>
                <Flex >
                  <ListIcon h={25} w={25} as={CheckCircle} />
                  <Text alignSelf='center'>All the benefits of the individual and premium plans</Text>
                </Flex>
              </ListItem>
              <ListItem mt={8}>
                <Flex >
                  <ListIcon h={25} w={25} as={CheckCircle} />
                  <Text alignSelf='center'>Unlimited teams</Text>
                </Flex>
              </ListItem>
              <ListItem mt={8}>
                <Flex >
                  <ListIcon h={25} w={25} as={CheckCircle} />
                  <Text alignSelf='center'>Up to 20 members</Text>
                </Flex>
              </ListItem>
            </List>
          </Flex>
          {/* <Box ml={5} mt={10} bg='brandgray.900' w={400} h={300}>

          </Box> */}
        </Flex>
        {/* <Heading mt={20} color='white'>Customer testimonials</Heading>
        <Flex justifyContent='center' w='100%' h='100%' pl={10} pr={10}>
          <Grid mb={20} mt={20} rowGap={20} columnGap={10} templateRows="repeat(1, 1fr)" templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}>
            <GridItem>
              <Testimonial text='— Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum cillum dolore eu fugiat.' />
            </GridItem>
            <GridItem>
              <Testimonial text='— Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum cillum dolore eu fugiat.' />
            </GridItem>
            <GridItem>
              <Testimonial text='— Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum cillum dolore eu fugiat.' />
            </GridItem>
          </Grid>
        </Flex> */}
        <Box mt={20} mb={30} pl={[5, 5, 5, 5, 150]} pr={[5, 5, 5, 5, 150]} w='100%' h={120}>
          <Flex bg='brandgray.900' w='100%' h='100%' >
            <Center flexDir={['column', 'row']} h='auto' w='100%' >
              <Text textAlign='center' fontWeight='700' fontSize={[20, 30, 30, 30]} color='white'>Ready to get started?</Text>
              <Button onClick={() => handleSignup()} _hover={{ bg: 'gray.200', color: 'brandgray.900' }} bg='brandpurple.100' color='white' ml={5}>Sign Up</Button>
            </Center>
          </Flex>
        </Box>
      </Center>
    </>
  )
}

const Testimonial = ({ text }) => {
  return (
    <>
      <Box pb={5} pt={10} pl={10} pr={10} bg='brandgray.900' w={[290, 350]} minH={400} h='auto'>
        <Text fontSize={20} color='gray.500'>{text}</Text>
        <Divider mt={5} />
        <Text mt={5} color='white' fontWeight='600'>Elias Wambugu</Text>
      </Box>
    </>
  )
}

export default Welcome