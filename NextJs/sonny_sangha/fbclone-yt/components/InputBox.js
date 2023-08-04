import { useSession } from 'next-auth/react'
import Image from 'next/legacy/image'
import { EmojiHappyIcon } from '@heroicons/react/outline'
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid'
import { useRef, useState } from 'react'
import { db } from '@/firebase'

function InputBox({ setPostAdded }) {
  const { data } = useSession()
  const session = data
  const inputRef = useRef(null)
  const filePickerRef = useRef(null)
  const [imageToPost, setImageToPost] = useState(null)

  const sendPost = async (e) => {
    e.preventDefault()

    if(!inputRef.current.value) return

    db.collection('posts').add({
      message: inputRef.current.value,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      // timestamp: firebase.firestore.Fieldvalue.serverTimestamp()
    }).then(doc => {
      if(imageToPost) {
        // const uploadTask = storage.ref(`posts/${doc.id}`).putString(imageToPost, 'data_url')

        db.collection('posts').update(doc.id, {'postImage': imageToPost})
        removeImage()

        // uploadTask.on('state_change', null, error => console.log(error), () => {
        //   // When the upload completes
        //   storage.ref(`posts`).child(doc.id).getDownloadURL().then(url => {
        //     db.collection('posts').doc(doc.id).set(
        //       {
        //         postImage: url
        //       }, 
        //       {merge: true}
        //     )
        //   })
        // })
      }
    })

    inputRef.current.value = ''
    setPostAdded(true)
  }

  const addImageToPost = (e) => {
    const reader = new FileReader()
    if(e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result)
    }
  }

  const removeImage = () => {
    setImageToPost(null)
  }

  return (
    <div className='bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6'>
      <div className='flex space-x-4 p-4 items-center'>
        <Image src={session.user.image} alt="" width={40} height={40} unoptimized={true} />
        <form className="flex flex-1">
          <input className='rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none' type="text" placeholder={`What's on your mind, ${session.user.name}`} ref={inputRef} />
          <button hidden type='submit' onClick={sendPost}>
            Submit
          </button>
        </form>

        {
          imageToPost && (
            <div className='flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer' onClick={removeImage}>
              <img src={imageToPost} alt="" className='h-10 object-contain' />
              <p className='text-xs text-red-500 text-center'></p>
            </div>
          )
        }
      </div>
      <div onClick={() => filePickerRef.current.click()} className='flex justify-evenly p-3 border-t'>
        <div className='inputIcon'>
          <VideoCameraIcon className='h-7 text-red-500' />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
          <input ref={filePickerRef} onChange={addImageToPost} type="file" hidden />
        </div>
        <div className='inputIcon'>
          <CameraIcon className='h-7 text-green-400' />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
        </div>
        <div className='inputIcon'>
          <EmojiHappyIcon className='h-7 text-yellow-300' />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  )
}

export default InputBox