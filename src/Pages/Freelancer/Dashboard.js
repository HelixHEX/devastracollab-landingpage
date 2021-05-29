import React, {
  useEffect
} from 'react';

import Header from '../../Components/Header'
import Nav from '../../Components/Nav'
// import AccountType from '../../App'

import {
  Text,
  Flex,
  Grid,
  GridItem,
  CircularProgress,
  Box,
  Center
} from '@chakra-ui/react'

// import { useHistory } from 'react-router-dom'

import { useUser } from "@clerk/clerk-react";
import ProjectsGrid from '../../Components/ProjectsGrid';
import ProBanner from '../../Components/ProBanner';
import Footer from '../../Components/Footer';

const Dashboard = (props) => {
  const user = useUser()
  useEffect(() => {
    if (user.publicMetadata.type !== 'freelancer') {
      window.location.href = '/'
    }
  })
  return (
    <>
      {/* <Grid
        h="100vh"
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(18, 1fr)"
        gap={0}
        bg='brandgray.200'
      > */}
      {/* <GridItem rowSpan={1} colSpan={18}>
          <ProBanner />
        </GridItem> */}
      {/* <GridItem display={['none', 'none', 'none', 'flex', 'flex']} bg="brandgray.200" rowSpan={1} colSpan={1}> */}
      <React.Suspense fallback={null}>
        <Nav dashActive={true} />
      </React.Suspense>
      {/* </GridItem> */}
      {/* <GridItem rowSpan={1} colSpan={[18, 18, 18, 17, 17]} bg='brandgray.100'> */}
      <Header dashActive={true} />
      <Flex ml={[0, 0, 0, 20]} flexDir='column' justifyContent='center'>
        <Text mt='5%'  ml='5%' fontSize='40' fontWeight='700' color='white'>Projects</Text>
        {/* <Flex mt='2%'>
              <Text ml='5%' fontSize='20' fontWeight='700' color='white'>ONGOING</Text>
              <Text ml='5%' fontSize='20' fontWeight='700' color='brandgray.50'>PAST</Text>
            </Flex> */}
        <Flex mb='5%' mt='5%' justifyContent='center'>
          <React.Suspense fallback={<CircularProgress isIndeterminate color="brandpurple.100" />}>
            <ProjectsGrid />
          </React.Suspense>
        </Flex>
      </Flex>
      {/* </GridItem> */}
      {/* </Grid> */}
      <Footer />
    </>
  )
}

export default Dashboard