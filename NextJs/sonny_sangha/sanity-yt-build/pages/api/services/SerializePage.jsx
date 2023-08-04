export const serializers = (props) => {
  let {style, children, listItem} = props
  if(listItem) {
    style = 'li'
  }
  const obj = {
    h1: ({ children }) => (
      <h1 className="text-xl font-bold my-5">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold my-5">{children}</h2>
    ),
    li: ({ children }) => (
      <li className="ml-4 list-dsic">{children}</li>
    ),
    link: ({ href, children }) => (
      <a href={href} className="text-blue-500 hover:underline">
        {children}
      </a>
    ),
    span: (props) => (
      <span {...props}>{props.children}</span>
    ),
    normal: (props) => {
      if(props.children.match(/(\{)/g)?.length > 0 && props.children?.search('"_type": "img"') > 0) {
        const { _type, src } = JSON.parse(props.children)
        return obj[_type]({src})
      }
      return(
        <span>{props.children}</span>
      )
    },
    em: (props) => {
      if(props.children.match(/(\{)/g)?.length > 0 && props.children?.search('"_type": "img"') > 0) {
        const { _type, src } = JSON.parse(props.children)
        return obj[_type]({src})
      }
      if(props.children.match(/(\{)/g)?.length > 0 && props.children?.search('"_type": "span"') > 0) {
        const { _type } = JSON.parse(props.children)
        return obj[_type](JSON.parse(props.children))
      }
      return (
        <em>{props.children}</em>
      )
    },
    p: (props) => (
      <p>{props.children}</p>
    ),
    strong: ({ children }) => (
      <strong>{children}</strong>
    ),
    img: ({ src }) => (
      <img className="mt-5" src={src} />
    )
  }
  return obj[style]({children: children.text})
}