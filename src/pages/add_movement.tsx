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
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

//Material UI - icons
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DeliveryDiningRoundedIcon from '@mui/icons-material/DeliveryDiningRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';

//Components
import { StyledMenu } from '@/components/Menu';


//Constants
import months from '../../utils/constants/months';

export default function AddMovement() {
    //Router
    const router = useRouter()

    //useState - data
    const [data, setData] = useState({
        num: "",
        name: "",
        role: "",
        month: 0,
        deliveries: "",
    })

    const [found, setFound] = useState(false)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //handle input change
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        //console.log(e.target.value)
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }

    const calculateData = () => {
        let hr:number = 30
        let horas:number = 8 * 6 * 4 //192
        let totBonus:number = 0
        let totDeliveries:number = 0
        let isr:number = 0
        let isrAdd:number = 0
        let cupons:number = 0
        let gross:number = 0
        let net:number = 0

        //salario base
        gross = hr * horas // 5,760

        //calcular total por bonos/hora
        if(data.role === 'CHOFER') {
            totBonus = 10 * horas
        } else if(data.role === "CARGADOR") {
            totBonus = 5 * horas
        }
        console.log(totBonus)
        gross += totBonus

        //calcular total/entregas
        totDeliveries = parseInt(data.deliveries) * 5 //num entregas * $5
        gross += totDeliveries
        console.log(totDeliveries)
        //calcular total / vales
        cupons = gross * 0.04 // gross + 4%
        gross += cupons
        console.log(cupons)
        //calcular ISR
        isr = gross * 0.09 // gross * 9%
        console.log(isr)
        //calcular ISR adicional
        if(gross > 10000) {
            isrAdd = gross * 0.03 // gross * 3%
        }
        console.log(isrAdd)

        net = gross - isr - isrAdd
        console.log(gross)
        console.log(net)

        return { totBonus, totDeliveries, isr, isrAdd, cupons, gross, net }
    }


    const onSubmit = async () => {
        
        try {
            const { totBonus, totDeliveries, isr, isrAdd, cupons, gross, net } = calculateData()
            const { num, month, deliveries } = data
            const empId = num
            const body = { empId, month, deliveries, totBonus, totDeliveries, isr, isrAdd, cupons, gross, net }
            console.log(body)
            const res = await fetch('/api/movement', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
            console.log(res)
            if(res.status === 200) {
                alert("Movimento creado exitosamente")
                setData({
                    num: "",
                    name: "",
                    role: "",
                    month: 0,
                    deliveries: "",
                })
                setFound(false)
            } else if(res.status === 500) {
                //alert errorr
                alert("Ocurrió un error al registrar movimento")
            }
        } catch(error) {
            console.error(error)
        }
    }

    

    const handleGetEmployee = async () => {
        const num = data.num
        const body = { num }
        console.log(body)
        const res = await fetch(`/api/employee/${num}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        })
        console.log(res)
        const r  = await res.json()
        console.log(r)
        if(r !== null) {
            setData({
                ...data,
                name: r.name,
                role: r.role
            })
            setFound(true)
        } else {
            alert("No se encontró el empleado")
            setFound(false)
        }
    }

    //handle month change
    const handleMonthChange = (num: number) => {
        setData({
            ...data,
            month: num
        })
        handleClose()
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
                        <h1 className='text-3xl -mt-[10px] font-bold mb-4 text-white'>Agregar Movimiento<span className='text-6xl !text-blue__primary'>.</span></h1>
                    </div>

                    {/* form */}
                    <div className='grid grid-cols-2 gap-4 mb-4'>
                        <div className='flex justify-start items-center col-span-2'>
                            <div className='bg-dark__alt rounded-full p-3 flex justify-start items-center flex-1 mr-2'>
                                <input value={data.num} name='num' onChange={(e) => {handleInputChange(e)}} placeholder='Buscar empleado..' className='transparent__input'/>
                            </div>
                            <Tooltip title="Buscar empleado" placement='top'>
                                <IconButton onClick={handleGetEmployee}>
                                    <SearchRoundedIcon className='text-white'/>
                                </IconButton>
                            </Tooltip>
                        </div>
                        {found && (
                            <div className='bg-dark__alt rounded-xl flex justify-between items-center p-4'>
                                <div>
                                    <p className='text-white text-sm'>Nombre</p>
                                    <input value={data.name} name='name' placeholder='Nombre de empleado' readOnly className='transparent__input'/>
                                </div>
                                <AccountBoxRoundedIcon className='text-white'/>
                            </div>
                        )}
                        {found && (
                            <div className='bg-dark__alt rounded-xl flex justify-between items-center p-4'>
                                <div>
                                    <p className='text-white text-sm'>Entregas</p>
                                    <input value={data.deliveries} onChange={(e) => {handleInputChange(e)}} name='deliveries' placeholder='Número de entregas' className='transparent__input'/>
                                </div>
                                <DeliveryDiningRoundedIcon className='text-white'/>
                            </div>
                        )}
                        
                    </div>

                    {found && (
                        <div className='mb-4'>
                            <FormControl>
                                <label id="type" className='text-black dark:text-white input__label'>Tipo de usuario</label>
                                <RadioGroup
                                    row
                                    aria-labelledby="type"
                                    name="role"
                                    value={data.role}
                                    aria-readonly
                                >
                                    <FormControlLabel value="CHOFER" control={<Radio style={{color: data.role === "CHOFER" ? "rgb(36, 153, 239)" : '#F0F5FE'}}/>} label="CHOFER" />
                                    <FormControlLabel value="CARGADOR" control={<Radio style={{color: data.role === "CARGADOR" ? "rgb(36, 153, 239)" : '#F0F5FE'}}/>} label="CARGADOR" />
                                    <FormControlLabel value="AUXILIARES" control={<Radio style={{color: data.role === "AUXILIARES" ? "rgb(36, 153, 239)" : '#F0F5FE'}}/>} label="AUXILIARES" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    )}
                    {found && (
                        <div className='mb-4'>
                            <Button
                                id="demo-customized-button"
                                aria-controls={open ? 'demo-customized-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                variant="contained"
                                disableElevation
                                onClick={handleClick}
                                className='!bg-white !text-black'
                                endIcon={<KeyboardArrowDownIcon />}
                            >
                                {months[data.month].label}
                            </Button>
                        </div>
                    )}
                    {found && (
                        <div className='flex justify-start items-center'>
                            <button className='p-3 rounded-full bg-blue__primary w-44 mr-4' onClick={onSubmit}>Agregar movimiento</button>
                            <button className='p-3 rounded-full bg-red__cancel w-40' onClick={() => {router.push('/dashboard')}}>Cancelar</button>
                        </div>
                    )}
                </div>
            </div>
            
        </main>

        {/* Menu */}
        <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
        >
            {months.map((item, i) => (
                <MenuItem key={i} onClick={() => {handleMonthChange(item.num)}} disableRipple>
                    {item.label}
                </MenuItem>
            ))}
        </StyledMenu>
    </div>
  )
}
