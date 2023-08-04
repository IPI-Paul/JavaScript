import Header from '@/components/Header'
import { getProviders, signIn, getCsrfToken } from 'next-auth/react'

function SignIn({ providers, token }) {
  const handleSubmit = (e, id) => {
    e.preventDefault()
    signIn(id, {csrfToken: token, email: e.target.email.value, password: e.target.password.value, callbackUrl: '/'})
  }

  return (
    <>
      <Header />
      <div className='flex flex-col items-center justify-center min-h-screen py-2 px-14 text-center'>
        <img className='w-80' src='http://localhost:8080/SourceFiles/images/Instagram.png' alt='' />
        <p className='font-xs italic'>
          This is not a REAL App, it is built for educational purposes only!
        </p>
        <div className='mt-5'>
          {
            Object.values(providers).map(provider => (
              <div key={provider.name} className='flex flex-col justify-center'>
                {
                  provider.type == 'credentials' 
                    ? (
                      <div className='flex pl-3 m-3 border rounded-2xl shadow-sm max-w-md'>
                        <form className='flex flex-col items-start p-2 gap-2' onSubmit={(e) => handleSubmit(e, provider.id)}>
                          <div>
                            <label className="section-header" htmlFor="email">Email</label>
                            <input name='email' id="email" type="email" size={32} placeholder="me@email.com" className='form-input ml-[38px] hover:bg-gray-200 max-h-6 border-none rounded-2xl' />
                          </div>
                          <div>
                            <label className="section-header" htmlFor="password">Password</label>
                            <input name="password" id="password" type="password" className='form-input ml-2 hover:bg-gray-200 max-h-6 border-none rounded-2xl' placeholder='password' />
                          </div>
                          <div className='flex w-full justify-center'>
                            <button className='flex items-center justify-center p-2 bg-blue-500 rounded-2xl text-white'>Sign in with {provider.name}</button>
                          </div>
                        </form>
                      </div>
                      )
                    : <div className='flex items-center justify-center'>
                      <button className='p-3 bg-blue-500 rounded-lg text-white' onClick={() => signIn(provider.id, {callbackUrl: '/'})}>Sign in with {provider.name}</button>
                    </div>
                }
                <hr className='mt-2 mb-2 border' />
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  const token = await getCsrfToken()

  return {
    props: {
      providers,
      token
    }
  }
}

export default SignIn