import React from 'react'

import {
  Heading,
  Box,
  Text,
  OrderedList,
  ListItem,
} from '@chakra-ui/react'

// import htmlContent from './privacy.html';
const Privacy = () => {
  return (
    <>
      <Box ml={10} mr={10} color='white'>
        <Heading mt={50}>Privacy Policy</Heading>
        <Text fontWeight='700'>Last updated May 20, 2021</Text>
        <Text mt={50}>Thank you for choosing to be part of our community at AstraCollab ("Company", "we", "us", "our"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at </Text>
        <Text mt={10}>When you visit our website https://astracollab.app  (the "Website")  and more generally, use any of our services (the "Services", which include the Website), we appreciate that you are trusting us with your personal information. We take your privacy very seriously. In this privacy notice, we seek to explain to you in the clearest way possible what information we collect, how we use it and what rights you have in relation to it. We hope you take some time to read through it carefully, as it is important. If there are any terms in this privacy notice that you do not agree with, please discontinue use of our Services immediately.</Text>
        <Text mt={10}>
          This privacy notice applies to all information collected through our Services (which,
          as described above, includes our Website), as well as, any related services, sales,
          marketing or events.
        </Text>
        <Text mt={10} fontWeight='700' color='gray.200'>
          Please read this privacy notice carefully as it will help you understand what
          we do with the information that we collect
        </Text>
        <Heading mt={20} as='h2' size='lg'>TABLE OF CONTENTS</Heading>
        <OrderedList>
          <ListItem>WHAT INFORMATION DO WE COLLECT?</ListItem>
          <ListItem>HOW DO WE USE YOUR INFORMATION?</ListItem>
          <ListItem>WILL YOUR INFORMATION BE SHARED WITH ANYONE?</ListItem>
          <ListItem>WHO WILL YOUR INFORMATION BE SHARED WITH?</ListItem>
          <ListItem>DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</ListItem>
          <ListItem>IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?</ListItem>
          <ListItem>HOW LONG DO WE KEEP YOUR INFORMATION?</ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
        </OrderedList>
      </Box>
    </>
  )
}

export default Privacy