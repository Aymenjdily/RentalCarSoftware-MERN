/* eslint-disable array-callback-return */
import React from 'react'

import { FaPen } from 'react-icons/fa'

import { MdDelete } from 'react-icons/md'

import { Link } from 'react-router-dom'

import { useCar } from '../hooks/useCar'

import { ImEye } from 'react-icons/im'

const CarsTable = ({ setShowCar, cars, setUpdateCar, active, search }) => {
    const { dispatch } = useCar()

    const handleDelete = async (id) => {
        const res = await fetch(`http://localhost:4000/api/cars/${id}`, {
          method: 'DELETE',
        })
    
        const json = await res.json()
        
        if(res.ok){
            dispatch({
              type: 'DELETE_CAR',
              payload: json
            })
        }
    }

    const filteredProducts = cars?.filter(item => {
        if(active === 'active'){
            return item.state === 'active'
        }
        // else if(isActive === 2){
        //     return product.category === "men's clothing"
        // }
        return item;
    })

    return (
        <table className='w-full mt-10 text-left'>
            <thead className='bg-gray-50 border-b-2 border-gray-200 capitalize'>
                <tr>
                    <th className='p-3 text-sm font-semibold tracking-wide'>
                        id
                    </th>
                    <th className='p-3 text-sm font-semibold tracking-wide'>
                        photo
                    </th>
                    <th className='p-3 text-sm font-semibold tracking-wide'>
                        name
                    </th>
                    <th className='p-3 text-sm font-semibold tracking-wide'>
                        category
                    </th>
                    <th className='p-3 text-sm font-semibold tracking-wide'>
                        type
                    </th>
                    <th className='p-3 text-sm font-semibold tracking-wide'>
                        places
                    </th>
                    <th className='p-3 text-sm font-semibold tracking-wide'>
                        price
                    </th>
                    <th className='p-3 text-sm font-semibold tracking-wide'>
                        state
                    </th>
                    <th className='p-3 text-sm font-semibold tracking-wide'>
                        actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    filteredProducts && filteredProducts.filter((item) => {
                        if(search === ''){
                            return item
                        }else if(item.name.toLowerCase().includes(search.toLowerCase())){
                            return item
                        }
                    }).map((car, index) => (
                        <tr className='border-b capitalize' key={car._id}>
                            <th className='p-3 text-sm font-semibold tracking-wide'>
                                {index + 1}
                            </th>
                            <th className='p-3 text-sm font-semibold tracking-wide'>
                                <img src={car.image} alt="car" className='w-10' />
                            </th>
                            <th className='p-3 text-sm font-semibold tracking-wide'>
                                {car.name}
                            </th>
                            <th className='p-3 text-sm font-semibold tracking-wide'>
                                {car.category}
                            </th>
                            <th className='p-3 text-sm font-semibold tracking-wide'>
                                {car.type}
                            </th>
                            <th className='p-3 text-sm font-semibold tracking-wide'>
                                {car.places}
                            </th>
                            <th className='p-3 text-sm font-semibold tracking-wide'>
                                {car.price} Dh
                            </th>
                            <th className={`p-3 text-sm font-semibold tracking-wide ${car.state === 'active' && "text-green-500"} ${car.state === 'canceled' && "text-red-500"} ${car.state === 'no active' && "text-yellow-500"}`}>
                                {car.state}
                            </th>
                            <th>
                                <div className='flex items-center gap-5 text-xl'>
                                    <button
                                        onClick={() => setUpdateCar(true)}
                                    >
                                        <Link to={`/updateCar/${car._id}`}>
                                            <FaPen className='text-blue-500'/>
                                        </Link>
                                    </button>
                                    <button
                                        onClick={() => setShowCar(true)}
                                    >
                                        <Link to={`/showCar/${car._id}`}>
                                            <ImEye color='black' />
                                        </Link>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(car._id)}
                                    >
                                        <MdDelete color='red' />
                                    </button>
                                </div>
                            </th>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default CarsTable