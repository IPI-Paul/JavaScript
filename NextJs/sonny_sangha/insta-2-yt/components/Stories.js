// import { faker } from 'faker'
import { useEffect, useState } from 'react'
import Story from './Story'
import { useSession } from 'next-auth/react'

function Stories() {
  const [suggestions, setSuggestions] = useState()
  const { data: session } = useSession()

  useEffect(() => {
    const fetchData = async() => (
    await fetch('http://localhost:8080/SourceFiles/json/contacts.json')
        .then(res =>  res.json())
        .then(data => {
          setSuggestions([...Array(20)].map((_, i) => ({
            ...data[i],
            id: i,
            avatar: `http://localhost:8080/JavaScript/React/replit_not/team_member_allocation/src/assets/images/${data[i].gender}Profile.jpg`
          })))
        })
    )
    fetchData()
  }, [])
  return (
    <div className='flex space-x-2 p-6 bg-white mt-8 border border-gray-200 rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black'>
      {
        session && 
        <Story img={session.user.image} username={session.user.username} />
      }
      {
        suggestions?.map(profile => (
          <Story key={profile.id} img={profile.avatar} username={profile.login.username} />
        ))
      }
    </div>
  )
}

export default Stories