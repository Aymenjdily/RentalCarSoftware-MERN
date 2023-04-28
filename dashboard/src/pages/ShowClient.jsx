/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

import { BsArrowLeft } from 'react-icons/bs'

import { Link, useParams } from 'react-router-dom'

const ShowClient = ({ setShowClient }) => {
    const {id} = useParams()
    
    const [dataClient, setDataClient] = useState(null)

    const [dataCar, setDataCar] = useState(null)

    const getSingleClient = async () => {
        const res = await fetch(`http://localhost:4000/api/clients/${id}`)
        const data = await res.json()
    
        if(res.ok){
            setDataClient(data)
        }
    }

    const getSingleCar = async () => {
        const res = await fetch(`http://localhost:4000/api/cars/${dataClient?.car}`)
        const data = await res.json()
    
        if(res.ok){
            setDataCar(data)
        }
    }

    useEffect(() => {
        getSingleClient()
    }, [id])

    useEffect(() => {
        getSingleCar()
    }, [dataClient])

    console.log(dataCar)

    return (
        <div className='p-10 ml-5 rounded-md bg-gray-200 w-full'>
            <div className='pb-5'>
                <Link to='/bookings'>
                <button className='px-8 py-3 text-black font-bold flex items-center rounded-xl gap-5' onClick={() => setShowClient(false)}>
                    <BsArrowLeft size={25} />
                    Back
                </button>
                </Link>
            </div>
            <div className='w-full bg-white p-10 rounded-xl'>
                <section class="text-gray-600 body-font overflow-hidden">
                    <div class="container px-5 mx-auto">
                        <div class="mx-auto flex flex-wrap">
                        <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                            <h2 class="text-sm title-font text-gray-500 tracking-widest">
                                General Informations
                            </h2>
                            <h1 class="text-gray-900 text-3xl title-font font-medium mb-4">
                                {dataClient?.firstName} {""} {dataClient?.secondName}
                            </h1>
                            <div class="flex mb-4">
                                <span class="flex-grow text-gray-500 border-b-2 border-gray-500 py-2 text-lg">
                                    The Booking Informations
                                </span>
                            </div>
                            <h2 class="leading-relaxed text-lg font-semibold mb-4">
                                Client Information
                            </h2>
                            <div class="flex border-t border-gray-200 py-2">
                                <span class="text-gray-500">Cin</span>
                                <span class="ml-auto text-gray-900">
                                    {dataClient?.cin}
                                </span>
                            </div>
                            <div class="flex border-t border-gray-200 py-2">
                                <span class="text-gray-500">Phone</span>
                                <span class="ml-auto text-gray-900">
                                    {dataClient?.phone}
                                </span>
                            </div>
                            <div class="flex border-t border-gray-200 py-2">
                                <span class="text-gray-500">Address</span>
                                <span class="ml-auto text-gray-900">
                                    {dataClient?.city}, {dataClient?.address}
                                </span>
                            </div>
                            <div class="flex border-t border-b mb-6 border-gray-200 py-2">
                                <span class="text-gray-500">email</span>
                                <span class="ml-auto text-gray-900">
                                    {dataClient?.email}
                                </span>
                            </div>
                            <h2 class="leading-relaxed text-lg font-semibold mb-4">
                                Car Information
                            </h2>
                            <div class="flex border-t border-gray-200 py-2">
                                <span class="text-gray-500">Name</span>
                                <span class="ml-auto text-gray-900">
                                    {dataCar?.name}
                                </span>
                            </div>
                            <div class="flex border-t border-gray-200 py-2">
                                <span class="text-gray-500">Type</span>
                                <span class="ml-auto text-gray-900">
                                    {dataCar?.type}
                                </span>
                            </div>
                            <div class="flex border-t border-b mb-6 border-gray-200 py-2">
                                <span class="text-gray-500">Price</span>
                                <span class="ml-auto text-gray-900">
                                    {dataCar?.price} Dhs / d
                                </span>
                            </div>
                            <h2 class="leading-relaxed text-lg font-semibold mb-4">
                                Book Information
                            </h2>
                            <div class="flex border-t border-gray-200 py-2">
                                <span class="text-gray-500">Depart</span>
                                <span class="ml-auto text-gray-900">
                                    {dataClient?.firstDate}
                                </span>
                            </div>
                            <div class="flex border-t border-gray-200 py-2">
                                <span class="text-gray-500">Retour</span>
                                <span class="ml-auto text-gray-900">
                                    {dataClient?.secondDate}
                                </span>
                            </div>
                            <div class="flex border-t mb-6 border-gray-200 py-2">
                                <span class="text-gray-500">Booked</span>
                                <div class="ml-auto text-gray-900">
                                    {dataClient?.booked ? 
                                        <span>
                                            With
                                        </span>
                                        :
                                        <span>
                                            Without
                                        </span>
                                    }
                                </div>
                            </div>
                            <div class="flex">
                                <span class="title-font font-medium text-2xl text-gray-900">
                                    Total : {dataClient?.total} Dhs
                                </span>
                            </div>
                        </div>
                            <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-contain object-center rounded" src={dataCar?.image} />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ShowClient