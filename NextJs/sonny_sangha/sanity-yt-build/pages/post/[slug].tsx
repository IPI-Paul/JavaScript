// import { PortableText } from "@portabletext/react"
import { GetStaticProps } from "next"
import PortableText from "react-portable-text"
import Header from "../../components/Header"
import { sanityClient } from "../../sanity"
import { Post } from "../../typings"
import ConvertBody from '../api/services/ConvertBody'
import { serializers } from '../api/services/SerializePage'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from "react"

interface IFormInput {
  _id: string
  name: string
  email: string
  comment: string
}

interface Props {
  post: Post
  elements: any
}

function Post({ post, elements}: Props) {   
  const [submitted, setSubmitted] = useState(false)
  const {register, handleSubmit, formState: { errors }} = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then((result) => {
      console.log(result) 
      setSubmitted(true)     
    }).catch((err) => {
      console.log(err)   
      setSubmitted(false)   
    })
  }

  return (
    <main>
      <Header />
      <img className="w-full h-40 object-cover" src={post.mainImage} alt="" />
      <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-3xl mt-10 mb-3">
          {post.title}
        </h1>
        <h2 className="text-xl font-light text-gray-500 mb-2">
          {post.description}
        </h2>

        <div>
          <img className="h-10 w-10 rounded-full" src={post.author?.image} alt="" />
          <p className="font-extralight text-sm">
            Blog post by <span className="text-green-600">{post.author?.name}</span> - Published at { new Date(post.publishedAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-10">
          <PortableText 
            content={elements}
            serializers={
              {
                block: ({ node }: any) => { 
                  if(node.children.length > 1) {
                    let children = []
                    for(let i = 0; i < node.children.length; i++) {
                      if(node.children[i]?.marks?.length > 0) {
                        children.push(serializers({style: node.children[i]?.marks, children: node.children[i]}))
                        
                      } else {
                        children.push(serializers({...node, children: node.children[i]}))
                      }
                    }                    
                    return children
                  } else {
                    const { style, children} = node  
                    return serializers({style, children: {text: children[0].text}})
                  }
                }
              }
            }
          />
        </div>
      </article>
      <hr className="max-w-lg my-5 mx-auto border border-yellow-500" />
      {
        submitted 
          ? (
            <div className="flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold">Thank you for submitting your comment!</h3>
              <p>Once it has been approved, it will appear below!</p>
            </div>
          )
          : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-5 max-w-2xl mx-auto mb-10">
              <h3 className="text-sm text-yellow-500">Enjoy this article</h3>
              <h4 className="text-3xl font-bold">Leave a comment below</h4>
              <hr className="py-3 mt-2" />
              <input {...register('_id')} type="hidden" name="_id" value={post._id} />
              <label className="block mb-5">
                <span className="text-gray-700">Name</span>
                <input {...register('name', { required: true })} className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring" type="text" placeholder="John Appleseed" />
              </label>
              <label className="block mb-5">
                <span className="text-gray-700">Email</span>
                <input {...register('email', { required: true })} className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500  outline-none focus:ring" type="email" placeholder="John Appleseed" />
              </label>
              <label className="block mb-5">
                <span className="text-gray-700">Comment</span>
                <textarea {...register('comment', { required: true })} className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring" placeholder="John Appleseed" rows={8} />
              </label>
              <div className="fles p-5">
                {
                  errors.name && (
                    <p>
                      <span className="text-red-500">- The Name field is required</span>
                    </p>
                  )
                }
                {
                  errors.email && (
                    <p>
                      <span className="text-red-500">- The Email field is required</span>
                    </p>
                  )
                }
                {
                  errors.comment && (
                    <p>
                      <span className="text-red-500">- The Comment field is required</span>
                    </p>
                  )
                }
              </div>
              <input type="submit" className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer" />
            </form>
          )
      }
      <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2 rounded-md">
        <h3 className="text-4xl">Comments</h3>
        <hr className="pb-2" />
        {
          post.comments.map(comment => (
            <div key={comment._id}>
              <p>
                <span className="text-yellow-500 mr-2">
                  {comment.name}: 
                </span> 
                {comment.comment}
              </p>
            </div>
          ))
        }
      </div>
    </main>
  )
}

export default Post

export const getStaticPaths = async () => {
  const query = `=[_type == "post"]{
    _id,
    slug
  }`

  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug
    }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `=*[_type == "post" && slug == $slug][0]{
    _id,
    publishedAt,
    title,
    author -> {
      name,
      image
    },
    'comments': *[
      _type == "comment" && 
      post_ref == ^._id &&
      approved == true
    ],
    description,
    mainImage,
    slug,
    body
  }`
  
  const { post } = await sanityClient.fetch(query, {
    slug: params?.slug
  })

  if(!post) {
    return {
      notFound: true
    }
  } 
  
  return {
    props: {
      post,
      elements: ConvertBody(post.body)
    },
    revalidate: 60
  }
}