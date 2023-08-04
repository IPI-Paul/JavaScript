export interface Post {
  _id: string
  _createdAt: string
  publishedAt: string
  title: string
  author: {
    name: string
    image: string
  }
  comments: Comment[]
  description: string
  mainImage: string
  // {
  //   asset: {
  //     url: string
  //   }
  // }
  slug: {
    current: string
  }
  body: object[]
  // body: string
  // body: any
}

export interface Comment {
  approved: boolean
  comment: string
  email: string
  name: string
  post: {
    _ref: string
    _type: string
  }
  createdAt: string
  _id: string
  _rev: string
  _type: string
  _updatedAt: string
}