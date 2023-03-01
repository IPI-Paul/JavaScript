import { useDispatch } from "react-redux"
import { reactionAdded } from "./postsSlice"
import { 
  FaCoffee, FaThumbsUp, FaRocket, FaHeart, FaSurprise
} from 'react-icons/fa'

const reactionEmoji = {
  thumbsUp: <FaThumbsUp color="yellow" />,
  wow: <FaSurprise color="yellow" />,
  heart: <FaHeart color="red" />,
  rocket: <FaRocket />,
  coffee: <FaCoffee />
}

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch()

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type='button'
        className="reactionButton"
        onClick={() => 
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    )
  })
  return (
    <div>{reactionButtons}</div>
  )
}

export default ReactionButtons