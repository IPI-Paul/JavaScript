

const Footer = ({ length }) => {
  return (
    <footer>
      <p>{length} List item{length === 1 ? '' : 's'}</p>
    </footer>
  )
}

export default Footer