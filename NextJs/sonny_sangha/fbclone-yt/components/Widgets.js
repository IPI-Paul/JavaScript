import { SearchIcon } from '@heroicons/react/outline'
import { DotsHorizontalIcon, VideoCameraIcon } from '@heroicons/react/solid'
import Contact from './Contact'

const contacts = [
  {
    name: "Elon Musk",
    src: "http://localhost:8080/JavaScript/React/replit_not/team_member_allocation/src/assets/images/maleProfile.jpg"
  },
  {
    name: "Jeff Bezoz",
    src: "http://localhost:8080/JavaScript/React/replit_not/team_member_allocation/src/assets/images/maleProfile.jpg"
  },
  {
    name: "Mark Zuckerberg",
    src: "http://localhost:8080/JavaScript/React/replit_not/team_member_allocation/src/assets/images/maleProfile.jpg"
  },
  {
    name: "Bill Gates",
    src: "http://localhost:8080/JavaScript/React/replit_not/team_member_allocation/src/assets/images/maleProfile.jpg"
  },
  {
    name: "Harry Potter",
    src: "http://localhost:8080/JavaScript/React/replit_not/team_member_allocation/src/assets/images/maleProfile.jpg"
  },
  {
    name: "The Queen",
    src: "http://localhost:8080/JavaScript/React/replit_not/team_member_allocation/src/assets/images/femaleProfile.jpg"
  },
  {
    name: "James Bond",
    src: "http://localhost:8080/JavaScript/React/replit_not/team_member_allocation/src/assets/images/maleProfile.jpg"
  },
]

function Widgets() {
  return (
    <div className='hidden lg:flex flex-col w-60 p-2 mt-5'>
      <div className='flex justify-between items-center text-gray-500 pmb-5'>
        <h2 className="text-xl">Contacts</h2>
        <div className="flex space-x-2">
          <VideoCameraIcon className='h-6' />
          <SearchIcon className='h-6' />
          <DotsHorizontalIcon className='h-6' />
        </div>
      </div>
      {
        contacts.map(contact => (
          <Contact key={contact.name} {...contact} />
        ))
      }
    </div>
  )
}

export default Widgets