import { useAddReactionMutation } from "./postsSlice"
import { 
  FaCoffee, FaThumbsUp, FaRocket, FaHeart, FaSurprise
} from 'react-icons/fa'

const reactionEmoji = {
  thumbsUp: <FaThumbsUp color="orange" />,
  wow: <FaSurprise color="orange" />,
  heart: <FaHeart color="red" />,
  rocket: <FaRocket />,
  coffee: <FaCoffee />
}

const ReactionButtons = ({ post }) => {
  const [addReaction] = useAddReactionMutation()

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type='button'
        className="reactionButton"
        onClick={() => {
          const newValue = post.reactions[name] + 1
          addReaction({ 
            postId: post.id, reactions: {...post.reactions, [name]: newValue} 
          })
          }
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