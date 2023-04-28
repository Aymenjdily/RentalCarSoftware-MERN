/* eslint-disable react-hooks/exhaustive-deps */
import React,{ useEffect, useState } from 'react'

import { PlaceCard } from '../components'

import { Link } from 'react-router-dom'

import { usePlace } from '../hooks/usePlace'

const Places = ({ setAddPlace, setUpdatePlace }) => {
    const { dispatch, places } = usePlace()

    const [active, setActive] = useState(false)

    const getAllPlaces = async () => {
        const res = await fetch(`http://localhost:4000/api/places`)
        const data = await res.json()
    
        if(res.ok){
            dispatch({
                type: 'SET_PLACE',
                payload: data
            })
        }
    }

    useEffect(() => {
        getAllPlaces()
    }, [])

    const filteredProducts = places?.filter(item => {
        if(active){
            return item.state === true
        }
        // else if(isActive === 2){
        //     return product.category === "men's clothing"
        // }
        return item;
    })

    return (
        <div className='p-5 ml-5 rounded-md bg-gray-200 w-full'>
            <div className='bg-white p-5 w-full h-full rounded-xl'>
                <div className='w-full flex justify-between items-center'>
                    <h1 className='font-semibold text-2xl'>Places</h1>
                    <div className='flex gap-5'>
                        <button className='capitalize bg-gray-200 px-5 py-3 rounded-xl font-medium' onClick={() => setActive(false)}>
                            Show All
                        </button>
                        <Link to='/addPlace'>
                            <button className='capitalize bg-blue-100 px-5 py-3 rounded-xl font-medium' onClick={() => setAddPlace(true)}>
                                add place
                            </button>
                        </Link>
                        <button className='capitalize bg-green-200 px-5 py-3 rounded-xl font-medium' onClick={() => setActive(true)}>
                            check active
                        </button>
                        </div>
                </div>
                <div className='w-full gap-10 mt-10 grid grid-cols-3'>
                    {
                        filteredProducts && filteredProducts.map((place) => (
                            <PlaceCard place={place} setUpdatePlace={setUpdatePlace} key={place._id} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Places