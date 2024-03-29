import { auth } from '../firebase'
import { Button } from "@mui/material"
import Head from "next/head"
import styled from "styled-components"

const Login = () => {
  const signIn = (provider) => {
    auth.signInWithPopup(provider).catch(alert)
  }

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer>
        <Logo src='http://localhost:8080/SourceFiles/images/whatsapp.svg' />
        <Button onClick={() => signIn('Google')} variant='outlined'>Sign in with Google</Button>
        <Button onClick={() => signIn('Credentials')} variant='outlined'>Sign in with Credentials</Button>
      </LoginContainer>
    </Container>
  )
}

export default Login

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`
const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`
const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`