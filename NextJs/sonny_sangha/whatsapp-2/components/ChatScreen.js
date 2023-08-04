import { auth, db, useAuthState, useCollection } from '@/firebase'
import { Avatar } from '@mui/material'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { InsertEmoticon, Mic, MoreVert } from '@mui/icons-material'
import { AttachFile } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import Message from './Message'
import { useEffect, useRef, useState } from 'react'
import getRecipientEmail from '@/utils/getRecipientEmail'
import TimeAgo from 'timeago-react'

function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth)
  const [input, setInput] = useState('')
  const endOfMessagesRef = useRef()
  const router = useRouter()
  const [doc, setDoc] = useState([])
  const [messagesSnapshot] = useCollection(
    db
      .collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .orderBy('timestamp', 'asc')
    ) 

  const [recipientSnapshot] = useCollection(
    db.collection('whatsAppLogin').where('email', '==', getRecipientEmail(chat.users, user))
  )

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map(message => (
        <Message 
          key={message.data().id}
          user={message.data().uid}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime()
          }}
        />
      ))
    } else {
      return JSON.parse(messages).map(message => (
        <Message 
          key={message.id}
          user={message.uid}
          message={message}
        />
      ))
    }
  }

  const scrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behaviour: 'smooth',
      block: 'start'
    })
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    // Update the last seen...
    await db.collection('whatsAppUsers').doc(user.uid).set({
      lastSeen: db.serverTimeStamp()
    }, {merge: true})

    await db.collection('whatsAppLogin').doc(user.uid).set({
      timestamp: db.serverTimeStamp()
    }, {merge: true})

    const data = await db.collection('chats').doc(router.query.id).collection('messages').add({
      timestamp: db.serverTimeStamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL
    })

    if(data) setDoc(data)
    
    setInput('')
    scrollToBottom()
  }

  useEffect(() => {}, [doc])

  const recipient = recipientSnapshot?.docs?.[0]?.data()
  const recipientEmail = getRecipientEmail(chat.users, user)

  return (
    <Container>
      <Header>
        {
          recipient 
            ? (
              <Avatar src={recipient.photoURL} />
            ) : (
              <Avatar>{recipientEmail[0]}</Avatar>
            )
        }
        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          {
            recipientSnapshot
              ? (
                <p>Last active: {' '}
                  {
                    recipient?.lastSeen?.toDate()
                      ? (
                        <TimeAgo datetime={recipient?.lastSeen.toDate()} />
                      ) : (
                        'Unavailable'
                      )
                  }
                </p>
              ) : (
                <p>Loading Last active...</p>
              )
          }
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </HeaderIcons>
      </Header>

      <MeassageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessagesRef} />
      </MeassageContainer>

      <InputContainer>
        <InsertEmoticon />
        <Input value={input} onChange={e => setInput(e.target.value)} />
        <button hidden disabled={!input} type='submit' onClick={sendMessage}>
          Send Message
        </button>
        <Mic />
      </InputContainer>
    </Container>
  )
}

export default ChatScreen

const Container = styled.div``

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color: gray;
  }
`

const HeaderIcons = styled.div``

const MeassageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`

const EndOfMessage = styled.div`
  margin-bottom: 50px;
`

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`

const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
`