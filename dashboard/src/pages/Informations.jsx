/* eslint-disable react-hooks/exhaustive-deps */
import React,{ useEffect } from 'react'

import { FaWhatsapp, FaPhone, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'

import { MdEmail } from 'react-icons/md'

import { GrAnnounce } from 'react-icons/gr'

import { useInformations } from '../hooks/useInformations'

import { Link } from 'react-router-dom'

const Informations = () => {
  const { dispatch, informations } = useInformations()

  const getAllCars = async () => {
    const res = await fetch(`http://localhost:4000/api/infos`)
    const data = await res.json()

    if(res.ok){
        dispatch({
            type: 'SET_INFORMATIONS',
            payload: data
        })
    }
  }

  useEffect(() => {
      getAllCars()
  }, [])

  console.log(informations)

  return (
    <div className='p-5 ml-5 rounded-md bg-gray-200 w-full'>
        <div className='p-5 w-full h-full rounded-xl'>
            <div className='w-full flex justify-between items-center'>
                <h1 className='font-semibold text-2xl'>
                    Informations
                </h1>
            </div>
              {
                informations && informations.map((item) => (
                  <div className='py-12 grid grid-cols-3 gap-10'>
                    <div className='flex flex-col space-y-4 bg-white p-5 rounded-xl'>
                      <div className='text-xl flex items-center gap-3 font-semibold'>
                        <FaWhatsapp className='text-green-500 text-2xl' />
                        Whatssap
                      </div>
                      <p className='text-gray-500'>
                        {item.whatssap}
                      </p>
                    </div>
                    <div className='flex flex-col space-y-4 bg-white p-5 rounded-xl'>
                      <div className='text-xl flex items-center gap-3 font-semibold'>
                        <FaPhone className='text-blue-300 text-2xl' />
                        Whatssap
                      </div>
                      <p className='text-gray-500'>
                        {item.phone}
                      </p>
                    </div>
                    <div className='flex flex-col space-y-4 bg-white p-5 rounded-xl'>
                      <div className='text-xl flex items-center gap-3 font-semibold'>
                        <FaInstagram className='text-purple-500 text-2xl' />
                        Instagram
                      </div>
                      <p className='text-gray-500'>
                        {item.instagram}
                      </p>
                    </div>
                    <div className='flex flex-col space-y-4 bg-white p-5 rounded-xl'>
                      <div className='text-xl flex items-center gap-3 font-semibold'>
                        <FaFacebook className='text-blue-500 text-2xl' />
                        Facebook
                      </div>
                      <p className='text-gray-500'>
                        {item.facebook}
                      </p>
                    </div>
                    <div className='flex flex-col space-y-4 bg-white p-5 rounded-xl'>
                      <div className='text-xl flex items-center gap-3 font-semibold'>
                        <FaYoutube className='text-red-500 text-2xl' />
                        Youtube
                      </div>
                      <p className='text-gray-500'>
                        {item.youtube}
                      </p>
                    </div>
                    <div className='flex flex-col space-y-4 bg-white p-5 rounded-xl'>
                      <div className='text-xl flex items-center gap-3 font-semibold'>
                        <MdEmail className='text-gray-500 text-2xl' />
                        Email
                      </div>
                      <p className='text-gray-500'>
                        {item.email}
                      </p>
                    </div>
                    <div className='flex col-span-3 flex-col space-y-4 bg-white p-5 rounded-xl'>
                      <div className='text-xl flex items-center gap-3 font-semibold'>
                        <GrAnnounce className='text-gray-500 text-2xl' />
                        Annonce
                      </div>
                      <p className='text-gray-500'>
                        {item.banner}
                      </p>
                    </div>
                    <Link to={`/updateInfos/${item._id}`}>
                      <button className='capitalize text-white bg-blue-500 px-5 py-3 rounded-xl font-medium'>
                        Update
                      </button>
                    </Link>
                  </div>
                ))
              }
        </div>
    </div>
  )
}

export default Informations