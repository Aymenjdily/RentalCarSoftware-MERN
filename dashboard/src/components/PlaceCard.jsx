import React from 'react'

import { Link } from 'react-router-dom'

const PlaceCard = ({ place, setUpdatePlace }) => {
  return (
    <div className='bg-gray-200 p-5 rounded-xl'>
        <div>
            <img src={place.image} alt={place.name} className='object-cover h-64 rounded-xl w-full' />
        </div>
        <div className='my-4 h-64'>
            <h1 className='mb-2 text-xl font-semibold capitalize'>
                {place.name}
            </h1>
            <p className='text-gray-600 text-sm'>
                {place.description}
            </p>
        </div>
        <div className='w-full flex gap-5'>
            <Link to={`/updatePlace/${place._id}`}>
                <button className='bg-blue-200 px-5 py-3 rounded-xl capitalize font-semibold' onClick={() => setUpdatePlace(true)}>
                    update
                </button>
            </Link>
            <button className='bg-red-200 px-5 py-3 rounded-xl capitalize font-semibold'>
                delete
            </button>
            <div className={`${place.state ? "text-green-500" : "text-red-500"} flex gap-2 items-center rounded-xl capitalize font-semibold`}>
                <div className={`w-3 h-3 rounded-full ${place.state ? "bg-green-500" : "bg-red-500"}`} />
                {place.state ?
                    <span className='text-sm'>
                        active
                    </span>
                    :
                    <span className='text-sm'>
                        no active
                    </span>
                }
            </div>
        </div>
    </div>
  )
}

export default PlaceCard