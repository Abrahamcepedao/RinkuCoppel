import Head from 'next/head'
import Image from 'next/image';
import { postData } from '../../lib/request';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/router'

//Assets
import Logo from '../../public/logo.png'
import Link from 'next/link';
import { login } from '../../firebase/functions/auth';

export default function Home(/* {posts} */) {

  const [data, setData] = useState({correo: "", password: ""});

  const router = useRouter()

  const submit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(data.correo && data.password) {
      let res = await login(data.correo, data.password)
      if (typeof res === 'string') {
          router.push('/dashboard')
          //alert error here..
      } else {
          //dispatch(setReduxUser(res))
          //router.push("/app/admin/dashboard")
      }
    }

    console.log(data.correo, data.password)

  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="">
      <Head>
        <title>Login</title>
        <meta name="description" content="Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-auth w-full min-h-screen bg-cover bg-no-repeat bg-center">
        <div className='w-full h-screen bg-auth__overlay flex justify-start items-center p-10'>
          <div className="w-1/2">
            <div className='max-w-xs m-auto'>
              <h1 className='text-4xl font-bold mb-2 text-white'>Inicia Sesión<span className='text-6xl !text-blue__primary'>.</span></h1>
              <p className='mb-4 text-sm text-white'>¿No tienes una cuenta? <Link href={"/register"} className='!text-blue__primary'>Regístrate</Link></p>
              <form  className='w-full'  onSubmit={(e) => {submit(e)}}>
                
                <div className='bg-dark__alt rounded-2xl p-4 mb-4'>
                  <input 
                    type={"text"} 
                    placeholder="Ingresa tu email" 
                    value={data.correo}
                    name='correo'
                    className='transparent__input'
                    onChange={(e) => handleInputChange(e)} />
                </div>
                <div className='bg-dark__alt rounded-2xl p-4 mb-4'>
                  <input 
                    type={"password"}  
                    value={data.password}
                    placeholder="Ingresa tu contraseña"
                    name='password'
                    className='transparent__input'
                    onChange={(e) => handleInputChange(e)} />
                </div>

                <button className='p-3 rounded-full bg-blue__primary w-full max-w-xs' type='submit'>Login</button>

              </form>
            </div>
          </div>

          {/* logo */}
          <Image src={Logo} alt='Runko' className='fixed bottom-10 right-10 text-white' width={200}/>
        </div>
        
      </main>

    </div>
  )
}
