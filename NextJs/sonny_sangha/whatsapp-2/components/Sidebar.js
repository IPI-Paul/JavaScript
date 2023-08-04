import styled from 'styled-components'
import { Avatar, IconButton, Button } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'
import * as EmailValidator from 'email-validator'
import { auth, db, useAuthState, useCollection } from '@/firebase'
import Chat from './Chat'
import { useEffect, useState } from 'react'

function Sidebar() {
  const [user] = useAuthState(auth)
  const userChatRef = db.collection('chats').where('users', 'array-contains', user.email)
  const [chatsSnapshot] = useCollection(userChatRef)
  const [docs, setDocs] = useState()

  const createChat = () => {
    const input = prompt(
      'Please enter an email address for the user you wish to chat with'
    )

    if(!input) return null

    if(EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
      // We need to add the chat in to the DB 'chats' collection
      const getData = async () => {
        const data = await db.collection('chats').add(
          {
            users: [user.email, input]
          },
          setDocs
        )
        if(!docs) setDocs(data)
      }
      getData()
    } else {
      console.log('Chat Exists!');
    }
  }

  const chatAlreadyExists = (recipientEmail) => 
    !!chatsSnapshot?.docs.find(
      chat => chat.data().users.find(user => user === recipientEmail)?.length > 0
    )

  useEffect(() => {
    if(!docs) setDocs(chatsSnapshot)
  }, [chatsSnapshot])
    
  return (
    <Container>
      <Header>
        <UserAvatar onClick={() => auth.signOut()} src={user.photoURL} />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder='Search in chats' />
      </Search>
      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>
      {/* List of Chats */}
      {
       docs?.docs?.map(chat => (
          <Chat key={chat.id} id={chat.id} users={chat.data().users} />
        ))
      }
    </Container>
  )
}

export default Sidebar

const Container = styled.div`
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
`

const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`
const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`
const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`
const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`
const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`
const IconsContainer = styled.div``