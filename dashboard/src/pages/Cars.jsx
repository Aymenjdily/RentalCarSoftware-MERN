/* eslint-disable react-hooks/exhaustive-deps */
import React,{ useEffect, useState } from 'react'

import { CarsTable } from '../components'

import { Link } from 'react-router-dom'

import { useCar } from '../hooks/useCar'

import { FaSearch } from 'react-icons/fa' 

const Cars = ({ setAddCar, setShowCar, setUpdateCar }) => {
    const { cars, dispatch } = useCar()

    const [active, setActive] = useState('')

    const [search, setSearch] = useState('')

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

    useEffect(() => {
        getAllCars()
    }, [])

    return (
        <div className='p-5 ml-5 rounded-md bg-gray-200 w-full'>
            <div className='bg-white p-5 w-full h-full rounded-xl'>
                <div className='w-full flex justify-between items-center'>
                    <h1 className='font-semibold text-2xl'>Cars</h1>
                    <div className='flex gap-5'>
                        <div className='flex items-center border-[2px] border-black px-5 rounded-xl space-x-3'>
                            <input type="text" className='outline-none' onChange={(e) => setSearch(e.target.value)} />
                            <FaSearch />
                        </div>
                        <button className='capitalize bg-gray-200 px-5 py-3 rounded-xl font-medium' onClick={() => setActive('')}>
                            Show All
                        </button>
                        <Link to='/addCar'>
                            <button className='capitalize bg-blue-100 px-5 py-3 rounded-xl font-medium' onClick={() => setAddCar(true)}>
                                add car
                            </button>
                        </Link>
                        <button className='capitalize bg-green-200 px-5 py-3 rounded-xl font-medium' onClick={() => setActive('active')}>
                            check active
                        </button>
                        <button className='capitalize bg-black text-white px-5 py-3 rounded-xl font-medium'>
                            export 
                        </button>
                    </div>
                </div>
                <div className='w-full'>
                    <CarsTable setShowCar={setShowCar} cars={cars} active={active} search={search} setUpdateCar={setUpdateCar} />
                </div>
            </div>
        </div>
    )
}

export default Cars