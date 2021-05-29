import React from 'react'

import {
  Text,
  Flex,
  Grid,
  GridItem,
  CircularProgress,
  Box,
  Center,
  Link
} from '@chakra-ui/react'

const Footer = () => {
  return (
    <>
      <Box  w='100%' h={75} >
        <Center color='white' h='100%'>
          <Link href='/privacy'>Privacy Policy</Link>
        </Center>
      </Box>
    </>
  )
}

export default Footer