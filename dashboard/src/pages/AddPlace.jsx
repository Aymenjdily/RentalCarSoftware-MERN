import React,{ useState } from 'react'

import { Link } from 'react-router-dom'

import { BsArrowLeft } from 'react-icons/bs'

import { usePlace } from '../hooks/usePlace'

const AddPlace = ({ setAddPlace }) => {
    const [image, setImage] = useState('')

    const [name, setName] = useState('')

    const [description, setDescription] = useState('')

    const [success, setSuccess] = useState('')

    const [error, setError] = useState('')

    const [emptyFields, setEmptyFields] = useState([])

    const { dispatch } = usePlace()

    const addPlace = async (e) => {
        e.preventDefault()
    
        const place = { image, name, description}
        
        const res = await fetch('http://localhost:4000/api/places',{
          method:'POST',
          body: JSON.stringify(place),
          headers:{
            'Content-Type' : 'application/json',
          }
        })
    
        const data = await res.json()
    
        if(!res.ok){
          setError(data.error)
          setEmptyFields(data.emptyFields)
        }
    
        if(res.ok){
            setError(null)
            setEmptyFields([])
        
            setName('')
            setImage('')
            setDescription('')

            dispatch({
                type: 'CREATE_PLACE',
                payload: data
            })
            
            setSuccess('Your place is added successfully')
        }
    } 

    return (
        <div className='p-10 ml-5 h-full rounded-md bg-gray-200 w-full'>
            <div className='pb-5'>
                <Link to='/places'>
                    <button className='px-8 py-3 text-black font-bold flex items-center rounded-xl gap-5' onClick={() => setAddPlace(false)}>
                        <BsArrowLeft size={25} />
                        Back
                    </button>
                </Link>
            </div>
            <form className='h-full w-full flex flex-col space-y-7 bg-white p-10 rounded-xl' onSubmit={addPlace}>
                <div className='grid grid-cols-2 gap-10'>
                    <div>
                        <label for="image" class="block mb-2 text-sm font-medium text-gray-900">Image</label>
                        <input type="text" value={image} id="image" class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none ${emptyFields.includes('image') ? 'border-2 border-red-500' : ''}`} placeholder="Image" onChange={(e) => setImage(e.target.value)}/>
                    </div>
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Name</label>
                        <input type="text" value={name} id="name" class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none ${emptyFields.includes('name') ? 'border-2 border-red-500' : ''}`} placeholder="name" onChange={(e) => setName(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <label for="message" class="block mb-2 text-sm font-medium text-gray-900">Description</label>
                    <textarea id="message" rows="4" class="block p-2.5 outline-none w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="City description..." value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className='self-start flex'>
                    <button className='bg-blue-200 px-8 py-3 rounded-xl font-medium'>
                        Add Place
                    </button>
                </div>
                {
                    error &&
                    <div className='bg-red-100 border-2 border-red-500 text-red-500 font-semibold p-5 rounded-xl'>
                        {error}
                    </div>
                }
                {
                    success &&
                    <div className='p-5 rounded-xl bg-green-100 border-2 border-green-500 text-green-500 font-semibold'>
                        {success}
                    </div>
                }
            </form>
        </div>
    )
}

export default AddPlace
