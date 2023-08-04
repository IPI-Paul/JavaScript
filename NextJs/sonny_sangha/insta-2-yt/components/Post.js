import { BookmarkIcon, ChatIcon, DotsHorizontalIcon, EmojiHappyIcon, HeartIcon, PaperAirplaneIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconFilled} from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { db } from '../firebase'

function Post({ id, username, userImg, img, caption }) {
  const { data: session} = useSession()
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)
  const { addDoc, collection, onSnapshot, query, orderBy, timeFrom, doc, setDoc, deleteDoc } = db

  useEffect(() => onSnapshot(query(collection('posts', {id}, 'comments'), orderBy('timestamp', 'desc')), snapshot => setComments(snapshot.docs)), [comment])

  useEffect(() =>  onSnapshot(query(collection('posts', {id}, 'likes'), orderBy('timestamp', 'desc')), snapshot => setLikes(snapshot.docs)), [likes])

  useEffect(() => setHasLiked(likes.findIndex(like => like.uid = session?.user?.uid) !== -1), [likes])

  const likePost = async () => {
    if(hasLiked) {
      await deleteDoc(doc('posts', {id}, 'likes', {uid: session.user.uid}))
    } else {
      await setDoc(doc('posts', {id}, 'likes', {uid: session.user.uid}), {
        username: session.user.username
      })
    }
  }

  const sendComment = async (e) => {
    e.preventDefault()

    const commentToSend = comment
    setComment('')

    await addDoc(collection('posts', {id}, 'comments'), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      // timestamp: serverTimestamp()
    })
  }

  return (
    <div className='bg-white my-7 border rounded-sm'>
      {/* Header */}
      <div className='flex items-center p-5'>
        <img className='rounded-full h-12 w-12 object-contain border p-1 mr-3' src={userImg} alt="" />
        <p className='flex-1 font-bold'>{username}</p>
        <DotsHorizontalIcon className='h-5' />
      </div>

      {/* img */}
      <img src={img} alt="" className='object-cover w-full' />

      {/* Buttons */}
      {
        session && 
        <div className='flex justify-between px-4 pt-4'>
          <div className='flex space-x-4'>
            {
              hasLiked 
              ? (
                <HeartIconFilled onClick={likePost} className='btn text-red-500' />
              )
              : (
                <HeartIcon onClick={likePost} className='btn' />
              )
            }
            <ChatIcon className='btn' />
            <PaperAirplaneIcon className='btn' />
          </div>
          <BookmarkIcon className='btn' />
        </div>  
      }
      {/* Caption */}
      <p className='p-5 truncate'>
        {
          likes.length > 0 && (
            <p className="font-bold mb-1">{likes.length} likes</p>
          )
        }
        <span className='font-bold mr-1'>{username} </span>
        {caption}
      </p>

      {/* Comments */}
      {
        comments.length > 0 && (
          <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
            {
              comments.map(comment => (
                <div key={comment.id} className='flex items-center space-x-2 mb-3'>
                  <img src={comment.userImage} alt="" className='h-7 rounded-full' />
                  <p className='text-sm flex-1'><span className='font-bold'>{comment.username} </span> {comment.comment}</p>
                  <span className='pr-5 text-xs'>{timeFrom(new Date(comment.timestamp))}</span>
                </div>
              ))
            }
          </div>
        )
      }

      {/* Input box */}
      {
        session && 
        <form className='flex items-center p-4'>
          <EmojiHappyIcon className='h-7' />
          <input value={comment} onChange={(e) => setComment(e.target.value)} type="text" className='border-none flex-1 focus:ring-0 outline-none' placeholder='Add a comment...' />
          <button className='font-semibold text-blue-400' disabled={!comment.trim()} onClick={sendComment}>Post</button>
        </form>
      }
    </div>
  )
}

export default Post