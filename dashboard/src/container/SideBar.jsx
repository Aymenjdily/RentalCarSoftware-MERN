import React,{ useState } from 'react'

import { BsGrid, BsCarFront } from 'react-icons/bs'

import { MdKeyboardArrowRight, MdOutlineFeedback, MdLogout, MdOutlineSettings } from 'react-icons/md'

import { FaRegUser } from 'react-icons/fa'

import { GoLocation } from 'react-icons/go'

import { HiOutlineInformationCircle, HiOutlineDocumentDuplicate } from 'react-icons/hi2'

import { TbMessage } from 'react-icons/tb'

import { Link } from 'react-router-dom'

const SideBar = () => {
    const [isActive, setIsActive] = useState(null)

    const active = "bg-red-400 rounded-xl text-white font-semibold shadow-lg duration-200 transition-all"

    return (
        <section className='py-4 h-full'>
            <div className='flex flex-col'>
                <div className='py-6 border-b'>
                    <Link to='/'>
                        <button
                            className={`flex w-64 px-4 items-center py-3 justify-between ${isActive === 1 ? active : "text-gray-500"}`}
                            onClick={() => setIsActive(1)}
                        >
                            <div className='flex items-center'>
                                <BsGrid size={25}/>
                                <span className='ml-4 capitalize'>
                                    dashboard
                                </span>
                            </div>
                            <MdKeyboardArrowRight size={25} />
                        </button>
                    </Link>
                </div>
                <div className='flex flex-col space-y-3 py-4'>
                    <Link to='/cars'>
                        <button
                            className={`flex w-64 px-4 items-center py-3 ${isActive === 2 ? active : "text-gray-500"}`}
                            onClick={() => setIsActive(2)}
                        >
                            <BsCarFront size={25} />
                            <span className='ml-5'>
                                Cars
                            </span>
                        </button>
                    </Link>
                    <Link to='/bookings'>
                        <button
                            className={`flex w-64 px-4 items-center py-3 ${isActive === 3 ? active : "text-gray-500"}`}
                            onClick={() => setIsActive(3)}
                        >
                            <FaRegUser size={25} />
                            <span className='ml-5'>
                                Clients
                            </span>
                        </button>
                    </Link>
                    <Link to='/places'>
                        <button
                            className={`flex w-64 px-4 items-center py-3 ${isActive === 4 ? active : "text-gray-500"}`}
                            onClick={() => setIsActive(4)}
                        >
                            <GoLocation size={25} />
                            <span className='ml-5'>
                                Places
                            </span>
                        </button>
                    </Link>
                    <Link to='/feedbacks'>
                        <button
                            className={`flex w-64 px-4 items-center py-3 ${isActive === 5 ? active : "text-gray-500"}`}
                            onClick={() => setIsActive(5)}
                        >
                            <MdOutlineFeedback size={25} />
                            <span className='ml-5'>
                                Feedbacks
                            </span>
                        </button>
                    </Link>
                    <Link to='/informations'>
                        <button
                            className={`flex w-64 px-4 items-center py-3 ${isActive === 6 ? active : "text-gray-500"}`}
                            onClick={() => setIsActive(6)}
                        >
                            <HiOutlineInformationCircle size={25} />
                            <span className='ml-5'>
                                Informations
                            </span>
                        </button>
                    </Link>
                    <button
                        className={`flex w-64 px-4 items-center py-3 ${isActive === 7 ? active : "text-gray-500"}`}
                        onClick={() => setIsActive(7)}
                    >
                        <HiOutlineDocumentDuplicate size={25} />
                        <span className='ml-5'>
                            Extras
                        </span>
                    </button>
                    <button
                        className={`flex w-64 px-4 items-center py-3 ${isActive === 8 ? active : "text-gray-500"}`}
                        onClick={() => setIsActive(8)}
                    >
                        <TbMessage size={25} />
                        <span className='ml-5'>
                            Contacts
                        </span>
                    </button>
                </div>
            </div>
            <div className='absolute bottom-5 flex flex-col'>
                <button
                    className={`flex w-64 px-4 items-center py-3 text-gray-500`}
                    onClick={() => setIsActive(null)}
                >
                    <MdOutlineSettings size={25} />
                    <span className='ml-5 capitalize'>
                        settings
                    </span>
                </button>
                <button
                    className={`flex w-64 px-4 items-center py-3 text-gray-500`}
                    onClick={() => setIsActive(null)}
                >
                    <MdLogout size={25} />
                    <span className='ml-5 capitalize'>
                        log out
                    </span>
                </button>
            </div>
        </section>
    )
}

export default SideBar