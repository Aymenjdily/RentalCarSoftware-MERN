import React from 'react'

import { logo, user } from '../assets'

import { MdOutlineNotificationsActive } from 'react-icons/md'

const Header = () => {
  return (
    <header className='py-6 px-2 bg-white'>
        <div className='container mx-auto flex w-full justify-between'>
            <div className='flex flex-row items-center'>
                <img src={logo} alt="logo" className='w-10 h-10' />
                <span className='ml-5 text-2xl font-semibold'>LoGo</span>
            </div>
            <div className='flex flex-row items-center'>
                <span className='text-2xl'>
                    <MdOutlineNotificationsActive />
                </span>
                <img src={user} alt="user" className='w-10 h-10 ml-8 rounded-full object-contain' />
            </div>
        </div>
    </header>
  )
}

export default Header