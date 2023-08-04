import StoryCard from "./StoryCard"

const stories = [
  {
    name: "Sonny Sangha",
    src: "http://localhost:8080/JavaScript/React/replit_not/team_member_allocation/src/assets/images/maleProfile.jpg",
    profile: "http://localhost:8080/CSS/david_gray/tailwind/lesson02/build/images/rocketdab.png"
  },
  {
    name: "Elon Musk",
    src: "http://localhost:8080/JavaScript/React/replit_not/team_member_allocation/src/assets/images/maleProfile.jpg",
    profile: "http://localhost:8080/CSS/david_gray/tailwind/lesson02/build/images/rocketlaunch.png"
  },
  {
    name: "Jeff Bezoz",
    src: "http://localhost:8080/JavaScript/React/replit_not/team_member_allocation/src/assets/images/maleProfile.jpg",
    profile: "http://localhost:8080/CSS/david_gray/tailwind/lesson02/build/images/rocketman.png"
  },
  {
    name: "Mark Zuckerberg",
    src: "http://localhost:8080/JavaScript/React/replit_not/team_member_allocation/src/assets/images/maleProfile.jpg",
    profile: "http://localhost:8080/CSS/david_gray/tailwind/lesson02/build/images/rocketride.png"
  },
  {
    name: "Bill Gates",
    src: "http://localhost:8080/JavaScript/React/replit_not/team_member_allocation/src/assets/images/maleProfile.jpg",
    profile: "http://localhost:8080/JavaScript/React/replit_not/team_member_allocation/src/assets/images/maleProfile.jpg"
  }
]

function Stories() {
  return (
    <div className="flex justify-center space-x-3 mx-auto">
      {stories.map(story => (
        <StoryCard key={story.name} name={story.name} src={story.src} profile={story.profile} />
      ))}
    </div>
  )
}

export default Stories