import Button from "./Button"

const Form = ({ reqType, setReqType }) => {
  return (
    <form onSubmit={e => e.preventDefault()}>
      <Button
        buttonText='users'
        reqType={reqType}
        setReqType={setReqType}
      ></Button>
      <Button
        buttonText='posts'
        reqType={reqType}
        setReqType={setReqType}
      ></Button>
      <Button
        buttonText='comments'
        reqType={reqType}
        setReqType={setReqType}
      ></Button>
    </form>
  )
}

export default Form