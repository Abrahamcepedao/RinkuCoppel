//React
import { useState } from 'react';
import Head from 'next/head'
import Image from 'next/image';
import { useRouter } from 'next/router'
import prisma from '../../lib/prisma';

//Assets
import Logo from '../../public/logo.png'

//Material UI
import { IconButton, Tooltip } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

//Material UI - icons
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';


export default function AddEmployee(/* {posts} */) {
    //Router
    const router = useRouter()

    //useState - data
    const [data, setData] = useState({
        num: "",
        name: "",
        role: ""
    })


    const onSubmit = async () => {
        try {
            const { num, name, role } = data
            const body = { num, name, role }
            const res = await fetch('/api/employee', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
            console.log(res)
            if(res.status === 200) {
                alert("Empleado creado exitosamente")
                setData({
                    num: "",
                    name: "",
                    role: ""
                })
            } else if(res.status === 500) {
                //alert errorr
                alert("Ocurrió un error al crear empleado")
            }
        } catch(error) {
            console.error(error)
        }
    }

    //handle input change
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        //console.log(e.target.value)
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }

    return (
        <div className="">
        <Head>
            <title>Dashboard</title>
            <meta name="description" content="Login" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="bg-auth w-full min-h-screen bg-cover bg-no-repeat bg-center">
            <div className='w-full h-screen bg-auth__overlay flex justify-center items-start p-10 pt-40'>
            
                <Image src={Logo} alt='Runko' className='fixed top-5 left-5 text-white' width={150}/>

                <div className='min-w-[600px]'>
                    {/* header */}
                    <div className='flex items-center justify-start'>
                        <Tooltip title="Agregar empleado" placement='top'>
                            <IconButton onClick={() => {router.back()}}>
                                <ArrowCircleLeftRoundedIcon className='text-white'/>
                            </IconButton>
                        </Tooltip>
                        <h1 className='text-3xl -mt-[10px] font-bold mb-4 text-white'>Agregar Empleado<span className='text-6xl !text-blue__primary'>.</span></h1>
                    </div>

                    {/* form */}
                    <div className='grid grid-cols-2 gap-4 mb-4'>
                        <div className='bg-dark__alt rounded-xl flex justify-between items-center p-4'>
                            <div>
                                <p className='text-white text-sm'>Número</p>
                                <input value={data.num} name='num' onChange={(e) => {handleInputChange(e)}} placeholder='Número de empleado' className='transparent__input'/>
                            </div>
                            <BadgeRoundedIcon className='text-white'/>
                        </div>
                        <div className='bg-dark__alt rounded-xl flex justify-between items-center p-4'>
                            <div>
                                <p className='text-white text-sm'>Nombre</p>
                                <input value={data.name} name='name' onChange={(e) => {handleInputChange(e)}} placeholder='Nombre de empleado' className='transparent__input'/>
                            </div>
                            <AccountBoxRoundedIcon className='text-white'/>
                        </div>
                    </div>

                    <div className='mb-4'>
                        <FormControl>
                            <label id="type" className='text-black dark:text-white input__label'>Tipo de usuario</label>
                            <RadioGroup
                                row
                                aria-labelledby="type"
                                name="role"
                                value={data.role}
                                onChange={handleInputChange}
                            >
                                <FormControlLabel value="CHOFER" control={<Radio style={{color: data.role === "CHOFER" ? "rgb(36, 153, 239)" : '#F0F5FE'}}/>} label="CHOFER" />
                                <FormControlLabel value="CARGADOR" control={<Radio style={{color: data.role === "CARGADOR" ? "rgb(36, 153, 239)" : '#F0F5FE'}}/>} label="CARGADOR" />
                                <FormControlLabel value="AUXILIARES" control={<Radio style={{color: data.role === "AUXILIARES" ? "rgb(36, 153, 239)" : '#F0F5FE'}}/>} label="AUXILIARES" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className='flex justify-start items-center'>
                        <button className='p-3 rounded-full bg-blue__primary w-40 mr-4' onClick={onSubmit}>Crear usuario</button>
                        <button className='p-3 rounded-full bg-red__cancel w-40' onClick={() => {router.push('/dashboard')}}>Cancelar</button>
                    </div>
                </div>
            </div>
            
        </main>
    </div>
  )
}
