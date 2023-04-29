//React
import React, { useEffect, useState } from 'react';

//Next
import Head from 'next/head'
import Image from 'next/image';
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next';

import prisma from '../../lib/prisma';

//Assets
import Logo from '../../public/logo.png'

//Material UI
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

//Material UI - icons
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import DeliveryDiningRoundedIcon from '@mui/icons-material/DeliveryDiningRounded';
import ConfirmationNumberRoundedIcon from '@mui/icons-material/ConfirmationNumberRounded';
import LocalActivityRoundedIcon from '@mui/icons-material/LocalActivityRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import AssuredWorkloadRoundedIcon from '@mui/icons-material/AssuredWorkloadRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

//Components
import { StyledMenu } from '@/components/Menu';
import Employee from '@/components/Employee';

//Constants
import months from '../../utils/constants/months';

//Interfaces
import EmployeeProps from '../../utils/interfaces/EmployeeProps';
import MovementProps from '../../utils/interfaces/MovementProps';
import KpiProps from '../../utils/interfaces/KpiProps';

//Functions
import { loadDashboard } from '../../lib/loadDashboard';

//Get Static Props - employees
/* export const getStaticProps: GetStaticProps = async () => {
    const employees = await prisma.employees.findMany()

    const movements = await prisma.movements.findMany({
        where: { month: 0 }
    })

    return {
        props: { employees, movements },
        revalidate: 10
    }
} */

//Type - Props
type Props = {
    employees: EmployeeProps[],
    movements: MovementProps[]
}

//const Dashboard: React.FC<Props> = (props) => {
const Dashboard = () => {
    //Router
    const router = useRouter()

    //useState - month
    const [month, setMonth] = useState(0)

    //useState - kpis data
    const [data, setData] = useState<KpiProps | null>({
        totDeliveries: 0,
        totBonos: 0,
        totIsr: 0,
        totCupons: 0,
        totSalary: 0,
        totNetSalary: 0
    })

    //useState - filter
    const [filter, setFilter] = useState("")

    //useState - employees list
    const [employees, setEmployees] = useState<Array<EmployeeProps>>([])
    const [employeesList, setEmployeesList] = useState<Array<EmployeeProps>>([])

    //useState - month selection
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    //useEffect
    useEffect(() => {
        /* if(props.employees) {
            setEmployees(props.employees)
        } */
        /* console.log(props.employees)
        console.log(props.movements) */
        handleGetEmployees()
        handleGetMovements(month)
        //calculateData(props.movements)
    }, [])

    const handleGetEmployees = async () => {
        try {
            const res = await fetch('/api/employee/all', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json'},
            })
            const r = await res.json()
            setEmployees(r)
            setEmployeesList(r)
        } catch (error) {
            console.error(error)
        }
    }

    const calculateData = (arr: MovementProps[]) => {
        if(arr !== null && arr !== undefined) {
            let totDeliveries: number = 0
            let totBonos: number = 0
            let totIsr: number = 0
            let totCupons: number = 0
            let totSalary: number = 0
            let totNetSalary: number = 0

            arr.forEach((item) => {
                totDeliveries += item.totDeliveries
                totBonos += item.totBonus
                totIsr += (item.isr + item.isrAdd)
                totCupons += item.cupons
                totSalary += item.gross
                totNetSalary += item.net
            })
            setData({
                totDeliveries,
                totBonos,
                totIsr,
                totCupons,
                totSalary,
                totNetSalary,
            })
        }
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleGetMovements = async (month: number) => {
        try {
            const body = { month }
            const res = await fetch('/api/movement/month', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
            console.log(res)
            const r:MovementProps[] | null = await res.json()
            console.log(r)
            if(r === null) {
                setData(null)
                
            } else {
                calculateData(r)
            }
        } catch(error) {
            console.error(error)
        }
    }

    //handle month change
    const handleMonthChange = (num: number) => {
        setMonth(num)
        handleClose()
        handleGetMovements(num)
    }

    //handle filter change
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let temp = [...employees]
        let value = e.target.value
        temp = temp.filter((el) => el.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) || el.num.toString().includes(value))
        setFilter(value)
        setEmployeesList(temp)
    }

    return (
        <div className="">
        <Head>
            <title>Dashboard</title>
            <meta name="description" content="Login" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="bg-auth w-full min-h-screen bg-cover bg-no-repeat bg-center">
            <div className='w-full h-screen bg-auth__overlay flex justify-center items-start p-10 pt-40 max-h-screen overflow-y-scroll'>
            
                <Image src={Logo} alt='Runko' className='fixed top-5 left-5 text-white' width={150}/>

                <div className='min-w-[800px]'>
                    {/* header */}
                    <div className='flex justify-between items-center mb-4'>
                        <div>
                            <Tooltip title="Cerrar sesión" placement='top'>
                                <IconButton onClick={() => {router.push('/')}}>
                                    <LogoutRoundedIcon className='text-white'/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Agregar empleado" placement='top'>
                                <IconButton onClick={() => {router.push('/add_employee')}}>
                                    <PeopleRoundedIcon className='text-white'/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Agregar movimiento" placement='top'>
                                <IconButton onClick={() => {router.push('/add_movement')}}>
                                    <PaymentsRoundedIcon className='text-white'/>
                                </IconButton>
                            </Tooltip>
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
                                <div className='w-10 h-10 flex justify-center flex-col items-center rounded-xl bg-dash2 mr-4'>
                                    <DeliveryDiningRoundedIcon className='text-dash2'/>
                                </div>
                                <div>
                                    <p className='text-white opacity-50 text-base'>Total Entregas</p>
                                    <p className='text-white font-bold text-2xl'>${data.totDeliveries ? data.totDeliveries.toFixed() : 0}</p>
                                </div>
                            </div>
                            <div className='rounded-xl bg-dark__alt p-4 flex justify-start items-center'>
                                <div className='w-10 h-10 flex justify-center flex-col items-center rounded-xl bg-dash3 mr-4'>
                                    <ConfirmationNumberRoundedIcon className='text-dash3'/>
                                </div>
                                <div>
                                    <p className='text-white opacity-50 text-base'>Total Bonos</p>
                                    <p className='text-white font-bold text-2xl'>${data.totBonos ? data.totBonos.toFixed(2) : 0}</p>
                                </div>
                            </div>
                            <div className='rounded-xl bg-dark__alt p-4 flex justify-start items-center'>
                                <div className='w-10 h-10 flex justify-center flex-col items-center rounded-xl bg-dash4 mr-4'>
                                    <AssuredWorkloadRoundedIcon className='text-dash4'/>
                                </div>
                                <div>
                                    <p className='text-white opacity-50 text-base'>Total ISR</p>
                                    <p className='text-white font-bold text-2xl'>${data.totIsr ? data.totIsr.toFixed(2) : 0}</p>
                                </div>
                            </div>
                            <div className='rounded-xl bg-dark__alt p-4 flex justify-start items-center'>
                                <div className='w-10 h-10 flex justify-center flex-col items-center rounded-xl bg-dash5 mr-4'>
                                    <LocalActivityRoundedIcon className='text-dash5'/>
                                </div>
                                <div>
                                    <p className='text-white opacity-50 text-base'>Total vales</p>
                                    <p className='text-white font-bold text-2xl'>${data.totCupons ? data.totCupons.toFixed(2) : 0}</p>
                                </div>
                            </div>
                            <div className='rounded-xl bg-dark__alt p-4 flex justify-start items-center'>
                                <div className='w-10 h-10 flex justify-center flex-col items-center rounded-xl bg-dash6 mr-4'>
                                    <PaidRoundedIcon className='text-dash6'/>
                                </div>
                                <div>
                                    <p className='text-white opacity-50 text-base'>Sueldo Bruto</p>
                                    <p className='text-white font-bold text-2xl'>${data.totSalary ? data.totSalary.toFixed(2) : 0}</p>
                                </div>
                            </div>
                            <div className='rounded-xl bg-dark__alt p-4 flex justify-start items-center'>
                                <div className='w-10 h-10 flex justify-center flex-col items-center rounded-xl bg-dash1 mr-4'>
                                    <PaidRoundedIcon className='text-dash1'/>
                                </div>
                                <div>
                                    <p className='text-white opacity-50 text-base'>Sueldo Neto </p>
                                    <p className='text-white font-bold text-2xl'>${data.totNetSalary ? data.totNetSalary.toFixed(2) : 0}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='rounded-xl bg-dark__alt p-4'>
                            <h4 className='text-white'>No hay un pago registrado para {months[month].label}</h4>
                        </div>
                    )}
                    

                    {/* employees header */}
                    <div className='flex justify-between items-center mb-4'>
                        <div className='bg-dark__alt rounded-full p-3 flex justify-start items-center flex-1'>
                            <SearchRoundedIcon className='text-white mr-2'/>
                            <input placeholder='Buscar empleado..' className='transparent__input' value={filter} onChange={(e) => {handleFilterChange(e)}}/>
                        </div>
                        <div className='ml-4'>
                            <Tooltip title="Filtrar" placement='top'>
                                <IconButton>
                                    <FilterListRoundedIcon className='text-white'/>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>

                    {/* employees list */}
                    <div className='grid grid-cols-2 gap-4'>
                        {employeesList.length !== 0 && employeesList.map((item:EmployeeProps, i:number) => (
                            <div key={i}>
                                <Employee employee={item}/>
                            </div>
                        ))}
                    </div>
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