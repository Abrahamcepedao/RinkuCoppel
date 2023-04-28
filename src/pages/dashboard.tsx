//React
import React, { ChangeEvent, useEffect, useState } from 'react';

//Next
import Head from 'next/head'
import Image from 'next/image';
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next';

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

//Components
import { StyledMenu } from '@/components/Menu';
import Employee, { EmployeeProps } from '@/components/Employee';

//Constants
import months from '../../utils/constants/months';

//Get Static Props - employees
export const getStaticProps: GetStaticProps = async () => {
    const employees = await prisma.employees.findMany()

    return {
        props: { employees }
    }
}

//Type - Props
type Props = {
    employees: EmployeeProps[]
}

const Dashboard: React.FC<Props> = (props) => {
    //Router
    const router = useRouter()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    //useEffect
    useEffect(() => {
        console.log(props.employees)
    }, [])

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                    <div className='flex justify-between items-center mb-4'>
                        <div>
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
                                Options
                            </Button>
                        </div>
                    </div>

                    {/* KPI's */}
                    <div className='grid grid-cols-3 gap-4 mb-4'>
                        <div className='rounded-xl bg-dark__alt p-4 flex justify-start items-center'>
                            <div className='w-10 h-10 flex justify-center flex-col items-center rounded-xl bg-dash1 mr-4'>
                                <PaymentsRoundedIcon className='text-dash1'/>
                            </div>
                            <div>
                                <p className='text-white opacity-50 text-base'>Hora trabajadas</p>
                                <p className='text-white font-bold text-2xl'>1,204</p>
                            </div>
                        </div>
                        <div className='rounded-xl bg-dark__alt p-4 flex justify-start items-center'>
                            <div className='w-10 h-10 flex justify-center flex-col items-center rounded-xl bg-dash2 mr-4'>
                                <PaymentsRoundedIcon className='text-dash2'/>
                            </div>
                            <div>
                                <p className='text-white opacity-50 text-base'>Hora trabajadas</p>
                                <p className='text-white font-bold text-2xl'>1,204</p>
                            </div>
                        </div>
                        <div className='rounded-xl bg-dark__alt p-4 flex justify-start items-center'>
                            <div className='w-10 h-10 flex justify-center flex-col items-center rounded-xl bg-dash3 mr-4'>
                                <PaymentsRoundedIcon className='text-dash3'/>
                            </div>
                            <div>
                                <p className='text-white opacity-50 text-base'>Hora trabajadas</p>
                                <p className='text-white font-bold text-2xl'>1,204</p>
                            </div>
                        </div>
                        <div className='rounded-xl bg-dark__alt p-4 flex justify-start items-center'>
                            <div className='w-10 h-10 flex justify-center flex-col items-center rounded-xl bg-dash4 mr-4'>
                                <PaymentsRoundedIcon className='text-dash4'/>
                            </div>
                            <div>
                                <p className='text-white opacity-50 text-base'>Hora trabajadas</p>
                                <p className='text-white font-bold text-2xl'>1,204</p>
                            </div>
                        </div>
                        <div className='rounded-xl bg-dark__alt p-4 flex justify-start items-center'>
                            <div className='w-10 h-10 flex justify-center flex-col items-center rounded-xl bg-dash5 mr-4'>
                                <PaymentsRoundedIcon className='text-dash5'/>
                            </div>
                            <div>
                                <p className='text-white opacity-50 text-base'>Hora trabajadas</p>
                                <p className='text-white font-bold text-2xl'>1,204</p>
                            </div>
                        </div>
                        <div className='rounded-xl bg-dark__alt p-4 flex justify-start items-center'>
                            <div className='w-10 h-10 flex justify-center flex-col items-center rounded-xl bg-dash6 mr-4'>
                                <PaymentsRoundedIcon className='text-dash6'/>
                            </div>
                            <div>
                                <p className='text-white opacity-50 text-base'>Hora trabajadas</p>
                                <p className='text-white font-bold text-2xl'>1,204</p>
                            </div>
                        </div>
                    </div>

                    {/* employees header */}
                    <div className='flex justify-between items-center mb-4'>
                        <div className='bg-dark__alt rounded-full p-3 flex justify-start items-center flex-1'>
                            <SearchRoundedIcon className='text-white mr-2'/>
                            <input placeholder='Buscar empleado..' className='transparent__input'/>
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
                        {props.employees.map((item:EmployeeProps, i:number) => (
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
                    <MenuItem key={i} onClick={handleClose} disableRipple>
                        {item.label}
                    </MenuItem>
                ))}
            </StyledMenu>
        </div>
  )
}

export default Dashboard