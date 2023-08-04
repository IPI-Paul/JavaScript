import { useEffect, useState } from "react"

function Suggestions() {
  const [suggestions, setSuggestions] = useState()
  useEffect(() => {
    const fetchData = async() => {
      const [users, comments] = await Promise.all([
        fetch('http://localhost:8080/SourceFiles/json/contacts.json')
          .then(res =>  res.json())
          .then(data => data), 
        fetch('http://localhost:8080/SourceFiles/json/jsonplaceholder-todos.json')
        .then(res =>  res.json())
        .then(data => data)
      ])
      setSuggestions([...Array(5)].map((_, i) => ({
        ...users[i],
        id: i,
        avatar: `http://localhost:8080/JavaScript/React/replit_not/team_member_allocation/src/assets/images/${users[i].gender}Profile.jpg`,
        suggestion: comments?.find(t => t.userId == i)?.title
      })))
    }
    fetchData()
  }, [])
  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="text-gray-600 font-semibold">See All</button>
      </div>
      {
        suggestions?.map(profile => (
          <div key={profile.id} className='flex items-center mt-3 '>
            <img className="w-10 h-10 rounded-full border p-[2px]" src={profile.avatar} alt="" />
            <div className="flex-1 ml-4">
              <h2 className="font-semibold text-sm">{profile.login.username}</h2>
              <h3 className="text-xs text-gray-400">Lives in {profile.location.city}, {profile.location.country}</h3>
            </div>
            <button className="text-blue-400 text-xs font-bold" >Follow</button>
          </div>
        ))
      }
    </div>
  )
}

export default Suggestions