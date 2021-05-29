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
  CircularProgress
} from '@chakra-ui/react'

// import { useHistory } from 'react-router-dom'

import { useUser } from "@clerk/clerk-react";
import ProjectsGrid from '../../Components/ProjectsGrid';

const Dashboard = (props) => {
  const user = useUser()
   useEffect(() => {
    if (user.publicMetadata.type !== 'client') {
      window.location.href = '/'
    }
  })
  // const user = useUser();
  return (
    <>
      {/* <AccountType /> */}
      <Grid
        h="100vh"
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(18, 1fr)"
        gap={0}
        overFlowX='auto'
        bg='brandgray.200'
        w='100%'
      >
        <GridItem display={['none', 'none', 'none', 'flex', 'flex']} bg="brandgray.200" rowSpan={2} colSpan={1}>
          <React.Suspense fallback={null}>
            <Nav dashActive={true} />
          </React.Suspense>
        </GridItem>
        <GridItem overflow='auto' rowSpan={2} colSpan={[18, 18, 18, 17, 17]} bg='brandgray.100'>
          <Header dashActive={true} />
          <Flex mt='5%' flexDir='column' justifyContent='center'>
            <Text ml='5%' fontSize='40' fontWeight='700' color='white'>Projects</Text>
            {/* <Flex mt='2%'>
              <Text ml='5%' fontSize='20' fontWeight='700' color='white'>ONGOING</Text>
              <Text ml='5%' fontSize='20' fontWeight='700' color='brandgray.50'>PAST</Text>
            </Flex> */}
            <Flex overFlowX='auto' mb='5%' mt='5%' justifyContent='center'>
              <React.Suspense fallback={<CircularProgress isIndeterminate color="brandpurple.100" />}>
                <ProjectsGrid />
              </React.Suspense>
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
    </>
  )
}

export default Dashboard