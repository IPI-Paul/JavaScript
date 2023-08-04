// import { useCollection } from 'react-firebase-hooks/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import Post from './Post'

function Posts({ state, posts }) {
  const [realTimePosts, setRealTimePosts] = useState()
  const [postAdded, setPostAdded] = state
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const getData = async () => {
      // const [ realtimePosts, loading, error ] = useCollection(
        let data = await db.collection('posts').orderBy('timestamp', 'desc')
        if(idx < 2 || postAdded) {
          setRealTimePosts(data)
          setPostAdded(false)
          setIdx(0)
        } else {
          setIdx(prev => prev++)
        }
      // )
    }
    getData()

    return () => {
      console.log(realTimePosts)
    }
  }, [postAdded])
  return (
    <div>
      {
        realTimePosts
        ? realTimePosts?.map(post => (
            <Post key={post.id} {...post} />
          ))
        : posts.map(post => (
          <Post key={post.id} {...post} />
        ))
      }
    </div>
  )
}

export default Posts