import React from 'react'


import Header from '../../Components/Header'
import Nav from '../../Components/Nav'
import ChatBox from '../../Components/ChatBox'
import './Chat.css'
// import AccountType from '../../App'

import {
  Text,
  Flex,
  Grid,
  GridItem,
  CircularProgress,
  Box
} from '@chakra-ui/react'
import { useUser } from '@clerk/clerk-react'

const Chat = () => {
  const user = useUser()

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
            <Nav chatActive={true} />
          </React.Suspense>
        </GridItem>
        <GridItem overflow='auto' rowSpan={2} colSpan={[18, 18, 18, 17, 17]} bg='brandgray.100'>
          <Header ml='5%' dashActive={true} />
          <Flex w='100%' mt='5%' flexDir='column' justifyContent='center'>
            <Text ml='5%' fontSize='40' fontWeight='700' color='white'>Chat</Text>
            <Box h={50} mr={['0%', '0%', '5%']} ml={['0%', '5%']} mb='8%' mt='5%' justifyContent='center'>
              {user.publicMetadata.type === 'freelancer' && user.publicMetadata.accounttype === 'trailblazer'
                ?
                <React.Suspense fallback={<CircularProgress isIndeterminate color="brandpurple.100" />}>
                  <ChatBox />
                </React.Suspense>
                : <Text color='white'>This is a pro feature. Please upgrade your account to full access</Text>}
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </>
  )
}

export default Chat