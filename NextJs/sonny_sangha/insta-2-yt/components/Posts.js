import { useEffect, useState } from "react"
import Post from "./Post"
// import { collection, onSnapshot, orderBy, query } from '@firebase/firestore'
import { db } from '../firebase'
import { modalState } from '@/atoms/modalAtom'
import { useRecoilState } from 'recoil'

// const posts = [
//   {
//     id: 123,
//     username: 'ssssangha',
//     userImg: 'http://localhost:8080/JavaScript/React/replit_not/team_member_allocation/src/assets/images/maleProfile.jpg',
//     img: 'http://localhost:8080/JavaScript/React/replit_not/team_member_allocation/src/assets/images/maleProfile.jpg',
//     caption: 'SUBSCRIBE AND DETROY THE LIKE BUTTON for the YT algorithm'
//   },
//   {
//     id: 124,
//     username: 'ssssangha',
//     userImg: 'http://localhost:8080/JavaScript/React/replit_not/team_member_allocation/src/assets/images/maleProfile.jpg',
//     img: 'http://localhost:8080/JavaScript/React/replit_not/team_member_allocation/src/assets/images/maleProfile.jpg',
//     caption: 'SUBSCRIBE AND DETROY THE LIKE BUTTON for the YT algorithm'
//   }
// ]

function Posts() {
  const [posts, setPosts] = useState([])
  const { collection, onSnapshot, orderBy, query } = db
  const [open, setOpen] = useRecoilState(modalState)

  useEffect(() => (
    onSnapshot(query(collection('posts'), orderBy('timestamp', 'desc')), snapshot => {
      setPosts(snapshot.docs)
    }))
    ,[open]
  )
  
  return (
    <div>
      {
        posts.map(post => (
          <Post key={post.id} id={post.id} username={post.username} userImg={post.profile} img={post.image} caption={post.caption} />
        ))
      }
    </div>
  )
}

export default Posts