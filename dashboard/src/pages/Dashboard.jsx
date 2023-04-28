/* eslint-disable react-hooks/exhaustive-deps */
import React,{ useEffect } from 'react'

import { frontcar, backcar, car } from '../assets'

import { FaRegUser } from 'react-icons/fa'

import { GrManual } from 'react-icons/gr'

import { MdOutlineFlashAuto } from 'react-icons/md'

import { useCar } from '../hooks/useCar'

import { useClients } from '../hooks/useClients'

const Dashboard = () => {
    const { cars, dispatch } = useCar()

    const { clients, dispatch: getClients } = useClients()

    const getAllCars = async () => {
        const res = await fetch(`http://localhost:4000/api/cars`)
        const data = await res.json()
    
        if(res.ok){
            dispatch({
                type: 'SET_CAR',
                payload: data
            })
        }
    }

    const getAllClients = async () => {
        const res = await fetch(`http://localhost:4000/api/clients`)
        const data = await res.json()
    
        if(res.ok){
            getClients({
                type: 'SET_CLIENT',
                payload: data
            })
        }
    }

    const getActiveCars = cars?.filter(item => {
        return item.state === 'active' 
    })

    const getNoActiveCars = cars?.filter(item => {
        return item.state === 'no active'
    })

    const getCanceledCars = cars?.filter(item => {
        return item.state === 'canceled'
    })

    useEffect(() => {
        getAllCars()
        getAllClients()
    }, [])

    return (
        <div className='p-10 ml-5 rounded-md bg-gray-200 w-full'>
            <>
                <h1 className='mb-5 text-3xl'>
                    Welcome back, Name
                </h1>
                <p className='text-gray-600'>
                    Here's what's happening with your website
                </p>
            </>
            <div className='mt-10 grid grid-cols-2'>
                <div className='bg-red-200 col-span-1 p-5 h-full justify-between rounded-2xl'>
                    <div className='flex w-full flex-row text-xl px-10 font-semibold'>
                        <h1>Total Cars</h1>
                        <span className='text-gray-500 ml-5'>{cars?.length}</span>
                    </div>
                    <div>
                        <img src={car} alt="car" className='w-full' />
                    </div>
                </div>
                <div className='flex flex-col gap-5 ml-10'>
                    <div className='flex items-center justify-between bg-yellow-100/80 py-5 px-10 rounded-2xl'>
                        <div className='font-semibold text-xl'>
                            <h1>
                                Total Clients
                            </h1>
                            <span className='text-gray-500'>
                                {clients?.length}
                            </span>
                        </div>
                        <img src={frontcar} alt="car" className='w-64' />
                    </div>
                    <div className='flex items-center justify-between bg-purple-300 py-5 px-10 rounded-2xl'>
                        <div className='font-semibold text-xl'>
                            <h1>
                                Total Feedbacks
                            </h1>
                            <span className='text-gray-500'>
                                52
                            </span>
                        </div>
                        <img src={backcar} alt="car" className='w-64' />
                    </div>
                </div>
            </div>
            <div className='py-6'>
                <div className='py-2'>
                    <h1 className='text-2xl font-semibold capitalize'>
                        about your cars
                    </h1>
                </div>
                <div className='grid grid-cols-3 gap-10'>
                    <div className='bg-white p-5 rounded-xl mt-6 flex justify-between items-center'>
                        <div>
                            <h3 className='text-xl font-medium'>
                                Active Cars
                            </h3>
                            <p className='text-xl text-gray-500'>
                                {getActiveCars?.length}
                            </p>
                        </div>
                        <div className='w-5 h-5 bg-green-500 rounded-full'/>
                    </div>
                    <div className='bg-white p-5 rounded-xl mt-6 flex justify-between items-center'>
                        <div>
                            <h3 className='text-xl font-medium'>
                                Not Active Cars
                            </h3>
                            <p className='text-xl text-gray-500'>
                                {getNoActiveCars?.length}
                            </p>
                        </div>
                        <div className='w-5 h-5 bg-yellow-300 rounded-full'/>
                    </div>
                    <div className='bg-white p-5 rounded-xl mt-6 flex justify-between items-center'>
                        <div>
                            <h3 className='text-xl font-medium'>
                                Canceled Cars
                            </h3>
                            <p className='text-xl text-gray-500'>
                                {getCanceledCars?.length}
                            </p>
                        </div>
                        <div className='w-5 h-5 bg-red-500 rounded-full'/>
                    </div>
                </div>
            </div>
            <div className='py-6'>
                <div className='py-2 flex justify-between items-center'>
                    <h1 className='text-2xl font-semibold capitalize'>Recents Cars</h1>
                </div>
                <div className='grid grid-cols-3 gap-10 mt-6'>
                    {
                        cars && cars.slice(0,3).map((car, index) => (
                            <div
                                key={index}
                                className={`flex flex-col bg-white rounded-xl p-5`}
                            >
                                <h1 className='text-xl capitalize font-medium'>
                                    {car.name}
                                </h1>
                                <p className='text-gray-500 capitalize'>
                                    {car.category}
                                </p>
                                <img src={car.image} alt="car" className='w-full h-40 object-contain py-4 rounded-xl self-center' />
                                <div className='flex justify-between'>
                                    <div className='flex space-x-2 items-center capitalize'>
                                        <div className='flex items-center space-x-1'>
                                            <FaRegUser className='text-gray-600' />
                                            <span className=''>
                                                {car.places}
                                            </span>
                                        </div>
                                        <div className='flex items-center space-x-1'>
                                            {
                                                car.type.toLowerCase() === 'manuel' ?
                                                <GrManual className='text-gray-600' />
                                                :
                                                <MdOutlineFlashAuto className='text-gray-600' />
                                            }
                                            <span>
                                                {car.type}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='text-xl font-bold'>
                                        {car.price} Dhs<span className='font-normal text-base'>/d</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard