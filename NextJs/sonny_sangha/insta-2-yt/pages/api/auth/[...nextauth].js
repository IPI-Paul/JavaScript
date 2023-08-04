import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { validateLogin } from '../../../firebase'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    // ...add more providers here
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'me@email.com'
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials
        const user = await validateLogin('instalogin', email.toLowerCase(), password)
        if(user) {
          return user
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
  callbacks: {
    async session({
      session,
      token, 
      user
    }) {
      session.user.username = session.user.name
        .split(' ')
        .join('')
        .toLocaleLowerCase()  
        session.user.uid = token.sub
        return session
    }
  }
})