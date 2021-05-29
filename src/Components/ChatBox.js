import React, { useState, useEffect } from 'react'

import {
  Box,
  Grid,
  Divider,
  Center,
  GridItem,
  Text,
  Input,
  Flex
} from '@chakra-ui/react'

import { ChatEngine } from 'react-chat-engine';

import { StreamChat } from 'stream-chat';
import { useUser } from '@clerk/clerk-react';
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  LoadingIndicator,
  MessageInput, MessageList,
  Thread,
  Window,
  InfiniteScrollPaginator,
  MessageTeam,
  MessageInputFlat
} from 'stream-chat-react';

import 'stream-chat-react/dist/css/index.css';
import axios from 'axios';
import { baseURL } from '../utils/globalVar';

const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoid2hpdGUtZHJlYW0tMSJ9.BCAxHkIW-E1SSXbkpLCmxyxwcRUrVzQlRVtueRtD-UE';




// chatClient.connectUser(
//   {
//     id: window.Clerk.user.id,
//     name: `${window.Clerk.user.firstName} ${window.Clerk.user.lastName}`,
//     image: window.Clerk.user.profileImageUrl,
//   },
//   userToken,
// );

// const channel = chatClient.channel('messaging',  window.Clerk.user.id, {
//   // add as many custom fields as you'd like
//   image: 'https://www.drupal.org/files/project-images/react.png',
//   name: 'Project 1',
//   members: [window.Clerk.user.id],
// });


const ChatBox = () => {
  const [chatClient, setChatClient] = useState(null);
  const filters = { type: 'messaging', members: { $in: [window.Clerk.user.id] } };
  const sort = { last_message_at: -1 };
  const Paginator = (props) => <InfiniteScrollPaginator threshold={300} {...props} />;
  const [channels, setChannels] = useState([])
  // const [chats, setChats] = useState([
  //   {
  //     title: 'Project Title',
  //     lastmessage: 'This is the last message'
  //   },
  //   {
  //     title: 'Project Title',
  //     lastmessage: 'This is the last message'
  //   },
  //   {
  //     title: 'Project Title',
  //     lastmessage: 'This is the last message'
  //   },
  //   {
  //     title: 'Project Title',
  //     lastmessage: 'This is the last message'
  //   },
  //   {
  //     title: 'Project Title',
  //     lastmessage: 'This is the last message'
  //   },
  //   {
  //     title: 'Project Title',
  //     lastmessage: 'This is the last message'
  //   }
  // ])
  const user = useUser()
  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance('z7bj4cgcwkzf');

      await client.connectUser(
        { id: user.id },
        async () => {
          // make a request to your own backend to get the token 
          const response = await axios.post(baseURL + 'chat/chat-token/', { id: user.id });
          return response.data.token;
        }
      );

      const channelList = await client.queryChannels(filters, sort, {
        watch: true, // this is the default 
        state: true,
      });
      setChannels(channelList)

      // if (channels.length > 0) {
      //   alert(channels)
      // }

      setChatClient(client);
      // await client.channel('messaging', 'white-dream-1', {
      //   // add as many custom fields as you'd like
      //   image: 'https://www.drupal.org/files/project-images/react.png',
      //   name: 'Talk about React',
      //   members: ['white-dream-1'],
      // });
    };

    initChat();
  }, []);

  if (!chatClient) {
    return <LoadingIndicator />;
  }

  if (channels.length < 1) {
    return <Text color='white' fontSize={20}>No channels available</Text>
  }
  return (
    <>
      {/* <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(15, 1fr)"
        gap={0}
        rounded={20}
        bg='brandgray.900'
        w={1200}
        minH={500}
        maxH={1000}
      >
        <GridItem overflowY='auto' h p={5} rowSpan={1} colSpan={3}>
          {chats.map((chat, index) => (
            <Chat index={index} key={index} chat={chat} />
          ))}
        </GridItem>
        <GridItem rowSpan={2} colSpan={1}>
          <Divider orientation="vertical" />
        </GridItem>
        <GridItem h='100%' w='100%' rowSpan={1} colSpan={10}>
          </Flex>
        </GridItem>
      </Grid> */}
      <Box bg='brandgray.900' w={'100%'}>
        {/* <ChatEngine
          height='100vh'
          userName='e.wambugu192@gmail.com'
          userSecret='user_1sDxh9fVC8KERrVJlnnO8MQgiID'
          projectID='707860c0-5ba7-4cf2-b0ba-b84de875e8fb'
        /> */}
        <Chat client={chatClient} theme={'messaging dark'}>
          <ChannelList filters={filters} sort={sort} Paginator={Paginator} />
          <Channel>
            <Window>
              <ChannelHeader />
              <MessageList Message={MessageTeam} />
              <MessageInput Input={MessageInputFlat} />
            </Window>
            <Thread />
          </Channel>
        </Chat>
      </Box>
    </>
  )
}

// const Chat = ({ chat, index }) => {
//   return (
//     <>
//       <Box _hover={{ bg: 'brandpurple.100', cursor: 'pointer' }} color='white' p={2} pt={1} rounded={10} mb={5} bg={index === 0 ? 'brandpurple.100' : 'brandgray.100'} w='100%' h={55}>
//         <Text w='100%' whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis' fontWeight='700'>{chat.title}</Text>
//         <Text w='100%' whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis' fontWeight='200'>{chat.lastmessage}</Text>
//       </Box>
//     </>
//   )
// }

export default ChatBox