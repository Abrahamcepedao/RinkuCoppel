//React
import React, { ChangeEvent, useEffect, useState } from 'react';

//Next
import Head from 'next/head'
import Image from 'next/image';
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next';
import prisma from '../../../lib/prisma';
//Assets
import Logo from '../../../public/logo.png'

//Material UI
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

//Material UI - icons
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import DeliveryDiningRoundedIcon from '@mui/icons-material/DeliveryDiningRounded';
import ConfirmationNumberRoundedIcon from '@mui/icons-material/ConfirmationNumberRounded';
import LocalActivityRoundedIcon from '@mui/icons-material/LocalActivityRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import AssuredWorkloadRoundedIcon from '@mui/icons-material/AssuredWorkloadRounded';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';

//Components
import { StyledMenu } from '@/components/Menu';
import Employee from '@/components/Employee';

//Constants
import months from '../../../utils/constants/months';

//Interfaces
import EmployeeProps from '../../../utils/interfaces/EmployeeProps';
import MovementProps from '../../../utils/interfaces/MovementProps';

//Get Static Props - employees
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const employee = await prisma.employees.findUnique({
        where: { num: Number(params?.num) }
    })

    const movement = await prisma.movements.findFirst({
        where: { empId: Number(params?.num), month: 0 }
    })

    return {
        props: { employee, movement }
    }
}

//Type - Props
type Props = {
    employee: EmployeeProps,
    movement: MovementProps
}

const Dashboard: React.FC<Props> = (props) => {
    //Router
    const router = useRouter()

    const [data, setData] = useState<MovementProps | null>(null)

    const [month, setMonth] = useState(0)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    //useEffect
    useEffect(() => {
        console.log(props.employee)
        console.log(props.movement)
        setData(props.movement)
        setMonth(0)
    }, [])

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleGetMovement = async (month: number) => {
        try {
            const empId = props.employee.num
            const body = { empId, month }
            const res = await fetch('/api/movement/find', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
            console.log(res)
            const r:MovementProps | null = await res.json()
            console.log(r)
            if(r === null) {
                setData(null)
                
            } else {
                setData(r)
            }
        } catch(error) {
            console.error(error)
        }
    }

    //handle month change
    const handleMonthChange = (num: number) => {
        setMonth(num)
        handleClose()
        handleGetMovement(num)
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

                <div className='min-w-[700px] max-w-[700px]'>
                    {/* header */}
                    <div className='flex justify-between items-center mb-4'>
                        <div className='flex items-center justify-start'>
                            <Tooltip title="Agregar empleado" placement='top'>
                                <IconButton onClick={() => {router.back()}}>
                                    <ArrowCircleLeftRoundedIcon className='text-white'/>
                                </IconButton>
                            </Tooltip>
                            <h1 className='text-2xl font-bold leading-6 -mt-[30px] text-white'>#{props.employee.num} | {props.employee.name} | {props.employee.role}<span className='text-6xl !text-blue__primary'>.</span></h1>
                        </div>

                        <div>
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
                                {months[month].label}
                            </Button>
                        </div>
                    </div>

                    {/* KPI's */}
                    {(data !== null) ? (
                        <div className='grid grid-cols-3 gap-4 mb-4'>
                            <div className='rounded-xl bg-dark__alt p-4 flex justify-start items-center'>
                                <div className='w-10 h-10 flex justify-center flex-col items-center rounded-xl bg-dash1 mr-4'>
                                    <WatchLaterRoundedIcon className='text-dash1'/>
                                </div>
                                <div>
                                    <p className='text-white opacity-50 text-base'>Hora trabajadas</p>
                                    <p className='text-white font-bold text-2xl'>192</p>
                                </div>
                            </div>
                            <div className='rounded-xl bg-dark__alt p-4 flex justify-start items-center'>
                                <div className='w-10 h-10 flex justify-center flex-col items-center rounded-xl bg-dash2 mr-4'>
                                    <DeliveryDiningRoundedIcon className='text-dash2'/>
                                </div>
                                <div>
                                    <p className='text-white opacity-50 text-base'>Num. entregas</p>
                                    <p className='text-white font-bold text-2xl'>{data.deliveries}</p>
                                </div>
                            </div>
                            <div className='rounded-xl bg-dark__alt p-4 flex justify-start items-center'>
                                <div className='w-10 h-10 flex justify-center flex-col items-center rounded-xl bg-dash3 mr-4'>
                                    <DeliveryDiningRoundedIcon className='text-dash3'/>
                                </div>
                                <div>
                                    <p className='text-white opacity-50 text-base'>Total entregas</p>
                                    <p className='text-white font-bold text-2xl'>${data.totDeliveries ? data.totDeliveries.toFixed(2) : 0}</p>
                                </div>
                            </div>
                            <div className='rounded-xl bg-dark__alt p-4 flex justify-start items-center'>
                                <div className='w-10 h-10 flex justify-center flex-col items-center rounded-xl bg-dash4 mr-4'>
                                    <ConfirmationNumberRoundedIcon className='text-dash4'/>
                                </div>
                                <div>
                                    <p className='text-white opacity-50 text-base'>Total bono</p>
                                    <p className='text-white font-bold text-2xl'>${data.totBonus ? data.totBonus.toFixed(2) : 0}</p>
                                </div>
                            </div>
                            <div className='rounded-xl bg-dark__alt p-4 flex justify-start items-center'>
                                <div className='w-10 h-10 flex justify-center flex-col items-center rounded-xl bg-dash5 mr-4'>
                                    <AssuredWorkloadRoundedIcon className='text-dash5'/>
                                </div>
                                <div>
                                    <p className='text-white opacity-50 text-base'>ISR (9%)</p>
                                    <p className='text-white font-bold text-2xl'>${data.isr ? data.isr.toFixed(2) : 0}</p>
                                </div>
                            </div>
                            <div className='rounded-xl bg-dark__alt p-4 flex justify-start items-center'>
                                <div className='w-10 h-10 flex justify-center flex-col items-center rounded-xl bg-dash6 mr-4'>
                                    <AssuredWorkloadRoundedIcon className='text-dash6'/>
                                </div>
                                <div>
                                    <p className='text-white opacity-50 text-base'>ISR (3%)</p>
                                    <p className='text-white font-bold text-2xl'>${data.isrAdd ? data.isrAdd.toFixed(2) : 0}</p>
                                </div>
                            </div>
                            <div className='rounded-xl bg-dark__alt p-4 flex justify-start items-center'>
                                <div className='w-10 h-10 flex justify-center flex-col items-center rounded-xl bg-dash7 mr-4'>
                                    <LocalActivityRoundedIcon className='text-dash7'/>
                                </div>
                                <div>
                                    <p className='text-white opacity-50 text-base'>Total vales</p>
                                    <p className='text-white font-bold text-2xl'>${data.cupons ? data.cupons.toFixed(2) : 0}</p>
                                </div>
                            </div>
                            <div className='rounded-xl bg-dark__alt p-4 flex justify-start items-center'>
                                <div className='w-10 h-10 flex justify-center flex-col items-center rounded-xl bg-dash8 mr-4'>
                                    <PaidRoundedIcon className='text-dash8'/>
                                </div>
                                <div>
                                    <p className='text-white opacity-50 text-base'>Sueldo Bruto </p>
                                    <p className='text-white font-bold text-2xl'>${data.gross ? data.gross.toFixed(2) : 0}</p>
                                </div>
                            </div>
                            <div className='rounded-xl bg-dark__alt p-4 flex justify-start items-center'>
                                <div className='w-10 h-10 flex justify-center flex-col items-center rounded-xl bg-dash9 mr-4'>
                                    <PaidRoundedIcon className='text-dash9'/>
                                </div>
                                <div>
                                    <p className='text-white opacity-50 text-base'>Sueldo Neto</p>
                                    <p className='text-white font-bold text-2xl'>${data.net ? data.net.toFixed(2) : 0}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='rounded-xl bg-dark__alt p-4'>
                            <h4 className='text-white'>No hay un pago registrado para {months[month].label}</h4>
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

export default Dashboard