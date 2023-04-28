/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

import { BsArrowLeft } from 'react-icons/bs'

import { Link, useParams } from 'react-router-dom'

import { FaRegUser } from 'react-icons/fa'

import { GrManual } from 'react-icons/gr'

const ShowCar = ({ setShowCar }) => {
    const {id} = useParams()
    
    const [dataCar, setDataCar] = useState(null)

    const getSingleCar = async () => {
        const res = await fetch(`http://localhost:4000/api/cars/${id}`)
        const data = await res.json()
    
        if(res.ok){
            setDataCar(data)
        }
    }

    useEffect(() => {
        getSingleCar()
    }, [id])

    return (
        <div className='p-10 ml-5 rounded-md bg-gray-200 w-full'>
            <div className='pb-5'>
                <Link to='/cars'>
                <button className='px-8 py-3 text-black font-bold flex items-center rounded-xl gap-5' onClick={() => setShowCar(false)}>
                    <BsArrowLeft size={25} />
                    Back
                </button>
                </Link>
            </div>
            <div className='w-full bg-white flex flex-row p-10 rounded-xl'>
                <div className='flex-1'>
                    <img src={dataCar?.image} className='h-full w-full object-contain' alt="car" />
                </div>
                <div className='flex-1 flex items-start pl-20 justify-center flex-col'>
                    <div className='flex items-center mb-10'>
                        <div className={`w-4 h-4 rounded-full ${dataCar?.state === 'active' && 'bg-green-400'} ${dataCar?.state === 'canceled' && "bg-red-500"} ${dataCar?.state === 'no active' && "bg-yellow-400"}`} />
                        <span className='ml-3 capitalize'>{dataCar?.state}</span>
                    </div>
                    <h1 className='text-2xl font-semibold capitalize'>
                        {dataCar?.name}
                    </h1>
                    <p>
                        {dataCar?.category}
                    </p>
                    <div className='flex flex-col my-6 space-y-3'>
                        <div className='flex items-center text-xl'>
                            <FaRegUser />
                            <span className='ml-3'>
                                {dataCar?.places}
                            </span>
                        </div>
                        <div className='flex items-center text-xl'>
                            <GrManual />
                            <span className='ml-3'>
                                {dataCar?.type}
                            </span>
                        </div>
                    </div>
                    <div className='my-10 text-xl font-semibold'>
                        {dataCar?.price} Dh <span className='text-gray-400 font-normal text-base'>/d</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowCar