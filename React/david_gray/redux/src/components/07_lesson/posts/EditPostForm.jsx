import { useState } from "react"
import { useSelector } from "react-redux"
import { selectPostById, useUpdatePostMutation,
  useDeletePostMutation 
} from "./postsSlice"
import { useParams, useNavigate } from "react-router-dom"
import { selectAllUsers } from "../../05_lesson/users/usersSlice"

const EditPostForm = () => {
  const { postId } = useParams()
  const navigate = useNavigate()

  const [updatePost, { isLoading }] = useUpdatePostMutation()
  const [deletePost] = useDeletePostMutation()

  const post = useSelector((state) => selectPostById(state, Number(postId)))
  const users = useSelector(selectAllUsers)

  const [title, setTitle] = useState(post?.title)
  const [content, setContent] = useState(post?.body)
  const [userId, setUserId] = useState(post?.userId)

  if(!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)
  const onAuthorChanged = e => setUserId(Number(e.target.value))

  const canSave = [title, content, userId].every(Boolean) && !isLoading

  const onSavePostClicked = async () => {
    if(canSave) {
      try {
        await updatePost({ id: post.id, title, body: content, userId, 
          reactions: post.reactions }).unwrap()

        setTitle('')
        setContent('')
        setUserId('')
        navigate(`/post/${postId}`)
      } catch (error) {
        console.error('Failed to save the post', error)
      } 
    }
  }

  const usersOptions = users.map(user => (
    <option 
      key={user.id}
      value={user.id}
    >
      {user.name}
    </option>
  ))

  const onDeletePostClicked = async () => {
    try {
      await deletePost({ id: post.id }).unwrap()

      setTitle('')
      setContent('')
      setUserId('')
      navigate(`/`)
    } catch (error) {
      console.error('Failed to delete the post', error)
    } 
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input 
          type="text" 
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select 
          id="postAuthor"
          defaultValue={userId}
          onChange={onAuthorChanged}
        >
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea 
          name="postContent" 
          id="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button
          type="button"
          onClick={onSavePostClicked}
          disabled={!canSave}
        >
          Save Post
        </button>
        <button
          type="button"
          className="deleteButton"
          onClick={onDeletePostClicked}
        >
          Delete Post
        </button>
      </form>
    </section>
  )
}

export default EditPostForm