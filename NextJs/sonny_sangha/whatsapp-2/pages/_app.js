import Loading from '@/components/Loading'
import '@/styles/globals.css'
import Login from './login'
import { auth, db, useAuthState } from '@/firebase'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      db.collection('whatsAppUsers').doc(user.uid).set(
        {
          email: user.email,
          photoURL: user.photoURL,
          lastSeen: db.serverTimeStamp()
        },
        { merge: true }
      )
    }
  }, [user, loading])

  if(loading) return <Loading />
  if (!user) return <Login />

  return <Component {...pageProps} />
}
