/* eslint-disable array-callback-return */
import React from 'react'

import { RxUpdate } from 'react-icons/rx'

import { FaSearch } from 'react-icons/fa'

import { MdDelete } from 'react-icons/md'

import { Link } from 'react-router-dom'
import { useClients } from '../hooks/useClients'

const ClientsTable = ({ clients, setShowClient, active, search }) => {
    const { dispatch } = useClients()

    const handleDelete = async (id) => {
        const res = await fetch(`http://localhost:4000/api/clients/${id}`, {
          method: 'DELETE',
        })
    
        const json = await res.json()
        
        if(res.ok){
            dispatch({
              type: 'DELETE_CLIENT',
              payload: json
            })
        }
    }

    const filteredProducts = clients?.filter(item => {
        if(active){
            return item.booked === true
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
                        Full Name
                    </th>
                    <th className='p-3 text-sm font-semibold tracking-wide'>
                        phone
                    </th>
                    <th className='p-3 text-sm font-semibold tracking-wide'>
                        1<sup>er</sup> Date 
                    </th>
                    <th className='p-3 text-sm font-semibold tracking-wide'>
                        2<sup>eme</sup> Date
                    </th>
                    <th className='p-3 text-sm font-semibold tracking-wide'>
                        Cin
                    </th>
                    <th className='p-3 text-sm font-semibold tracking-wide'>
                        Total
                    </th>
                    <th className='p-3 text-sm font-semibold tracking-wide'>
                        State
                    </th>
                    <th className='p-3 text-sm font-semibold tracking-wide'>
                        actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    filteredProducts && filteredProducts.filter((client) => {
                        if(search === ''){
                            return client
                        }
                        else if(client.firstName.toLowerCase().includes(search.toLowerCase())){
                            return client
                        }
                    }).map((item, index) => (
                        <tr
                            key={item._id}
                            className='border-b capitalize'
                        >
                            <th className='p-3 text-sm font-semibold tracking-wide'>
                                {index + 1}
                            </th>
                            <th className='p-3 text-sm font-semibold tracking-wide'>
                                {item.firstName}{" "}{item.secondName}
                            </th>
                            <th className='p-3 text-sm font-semibold tracking-wide'>
                                +212{" "}{item.phone}
                            </th>
                            <th className='p-3 text-sm font-semibold tracking-wide'>
                                {item.firstDate}
                            </th>
                            <th className='p-3 text-sm font-semibold tracking-wide'>
                                {item.secondDate}
                            </th>
                            <th className='p-3 text-sm font-semibold tracking-wide'>
                                {item.cin}
                            </th>
                            <th className='p-3 text-sm font-semibold tracking-wide'>
                                {item.total} Dhs
                            </th>
                            <th className='p-3 text-sm font-semibold tracking-wide'>
                                {
                                    item.booked ?
                                    <div className='text-green-500'>
                                        with
                                    </div>
                                    :
                                    <div className='text-yellow-500'>
                                        Without
                                    </div>
                                }
                            </th>
                            <th>
                                    <div className='flex items-center gap-5 text-xl'>
                                        <button
                                            onClick={() => {}}
                                        >
                                            <Link to={`/updateClient/${item._id}`}>
                                                <RxUpdate color='blue'/>
                                            </Link>
                                        </button>
                                        <button
                                            onClick={() => setShowClient(true)}
                                        >
                                            <Link to={`/showClient/${item._id}`}>
                                                <FaSearch color='black' />
                                            </Link>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
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

export default ClientsTable