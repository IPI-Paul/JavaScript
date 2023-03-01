// import React from 'react'
// import ReactDom from 'react-dom'
import { Header } from './header.mjs'
import { MainContent } from './main-content.mjs'
import { Footer } from './footer.mjs'

export const Page = () => (
  `${Header()}
   ${MainContent()}
   ${Footer()}
  `
)


// ReactDOM.render(<Page />, document.getElementById('root'))