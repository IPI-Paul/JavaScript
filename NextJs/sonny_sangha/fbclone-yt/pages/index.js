import Feed from '@/components/Feed'
import Header from '@/components/Header'
import Login from '@/components/Login'
import Sidebar from '@/components/Sidebar'
import Widgets from '@/components/Widgets'
import { db } from '@/firebase'
import { getSession } from 'next-auth/react'
import Head from 'next/head'

export default function Home({ session, posts }) {
  if(!session) return <Login />
  return (
    <>
      <Head>
        <title>Facebook App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className='flex'>
        <Sidebar />
        <Feed posts={posts} />
        <Widgets />
      </main>
    </>
  )
}

export async function getServerSideProps(context) {
  // Get the user
  const session = await getSession(context)

  const posts = await db.collection('posts').orderBy('timestamp', 'desc')//.get()

  const docs = posts.map(post => ({
    // id: post.id,
    ...post,
    timestamp: null
  }))
  
  return {
    props: {
      session,
      posts: docs
    }
  }
}