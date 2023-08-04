import NextAuth, { NextAuthOptions } from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials'

// const authOptions: NextAuthOptions = {
//   session: {
//     strategy: 'jwt'
//   },
//   providers: [
//     CredentialsProvider({
//       type: 'credentials',
//       credentials: {}
//     })
//   ]
// }

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
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
      authorize(credentials, req) {
        const { email, password } = credentials
        if(email !== process.env.FACEBOOK_CLIENT_ID + '@gmail.com' && password !== process.env.FACEBOOK_CLIENT_SECRET) {
          return null
        }
        return {id: '1234', name: process.env.FACEBOOK_CLIENT_ID, email, image: 'http://localhost:8080/CSS/david_gray/tailwind/lesson02/build/images/rocketdab.png'}
      }
    })
  ],
  // pages: {
  //   signIn: '/auth/signin',
  //   error: '/auth/error',
  //   signOut: '/auth/signout'
  // }
})