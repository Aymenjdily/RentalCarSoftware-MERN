/* eslint-disable react-hooks/exhaustive-deps */
import React,{ useEffect, useState }  from 'react'

import { Link } from 'react-router-dom'


import { FaSearch } from 'react-icons/fa' 

import { ClientsTable } from '../components'

import { useClients } from '../hooks/useClients'

const Bookings = ({ setAddClient, setShowClient }) => {
    const { clients, dispatch } = useClients()

    const [search, setSearch] = useState('')

    const [active, setActive] = useState(false)

    const getAllClients = async () => {
        const res = await fetch(`http://localhost:4000/api/clients`)
        const data = await res.json()
    
        if(res.ok){
            dispatch({
                type: 'SET_CLIENT',
                payload: data
            })
        }
    }

    useEffect(() => {
        getAllClients()
    }, [])

    return (
        <div className='p-5 ml-5 rounded-md bg-gray-200 w-full'>
            <div className='bg-white p-5 w-full h-full rounded-xl'>
                <div className='w-full flex justify-between items-center'>
                    <h1 className='font-semibold text-2xl'>Bookings</h1>
                    <div className='flex gap-5'>
                        <div className='flex items-center border-[2px] border-black px-5 rounded-xl space-x-3'>
                            <input type="text" className='outline-none' onChange={(e) => setSearch(e.target.value)} />
                            <FaSearch />
                        </div>
                        <Link to='/addClient'>
                            <button className='capitalize bg-blue-100 px-5 py-3 rounded-xl font-medium' onClick={() => setAddClient(true)}>
                                add book
                            </button>
                        </Link>
                        <button className='capitalize bg-gray-200 px-5 py-3 rounded-xl font-medium' onClick={() => setActive(false)}>
                            Show All
                        </button>
                        <button className='capitalize bg-green-200 px-5 py-3 rounded-xl font-medium' onClick={() => setActive(true)}>
                            check active
                        </button>
                        <button className='capitalize bg-black text-white px-5 py-3 rounded-xl font-medium'>
                            export 
                        </button>
                    </div>
                </div>
                <div className='w-full'>
                    {/* <CarsTable setShowCar={setShowCar} cars={cars} active={active} search={search} setUpdateCar={setUpdateCar} /> */}
                    <ClientsTable clients={clients} setShowClient={setShowClient} active={active} search={search} />
                </div>
            </div>
        </div>
    )
}

export default Bookings