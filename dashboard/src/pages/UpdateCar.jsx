/* eslint-disable react-hooks/exhaustive-deps */
import React,{ useState, useEffect } from 'react'

import { BsArrowLeft } from 'react-icons/bs'

import { Link, useParams } from 'react-router-dom'

const UpdateCar = ({ setUpdateCar }) => {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [type, setType] = useState('')
    const [places, setPlaces] = useState(null)
    const [price, setPrice] = useState(null)
    const [image, setImage] = useState('')
    const [state, setState] = useState('')
  
    const [error, setError] = useState('')
    const [emptyFields, setEmptyFields] = useState([])
    const [success, setSuccess] = useState('')
  
    const {id} = useParams()

    const getSingleCar = async () => {
        const res = await fetch(`http://localhost:4000/api/cars/${id}`)
        const data = await res.json()
    
        setName(data.name)
        setCategory(data.category)
        setType(data.type)
        setPlaces(data.places)
        setPrice(data.price)
        setImage(data.image)
        setState(data.state)
    }
    
    const updateCar = async (e) => {
      e.preventDefault()
            
      const res = await fetch(`http://localhost:4000/api/cars/${id}`,{
        method:'PUT',
        body: JSON.stringify({
            name: name,
            category: category,
            type: type,
            places: places,
            price: price,
            image: image,
            state: state
        }),
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
        setCategory('')
        setType('')
        setPlaces(null)
        setImage('')
        setPrice(null)
        
        setSuccess('Your car is updated successfully')
      }
    }

    useEffect(() => {
        getSingleCar()
    }, [id])
  
    return (
      <div className='p-10 ml-5 h-full rounded-md bg-gray-200 w-full'>
        <div className='pb-5'>
          <Link to='/cars'>
            <button className='px-8 py-3 text-black font-bold flex items-center rounded-xl gap-5' onClick={() => setUpdateCar(false)}>
              <BsArrowLeft size={25} />
              Back
            </button>
          </Link>
        </div>
        <form className='h-full w-full flex flex-col space-y-7 bg-white p-10 rounded-xl' onSubmit={updateCar}>
            <div className='grid grid-cols-2 gap-10'>
                <div>
                  <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Name</label>
                  <input type="text" value={name} id="name" class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none ${emptyFields.includes('name') ? 'border-2 border-red-500' : ''}`} placeholder="Car Name" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                  <label for="type" class="block mb-2 text-sm font-medium text-gray-900">Type</label>
                  <input type="text" id="type" value={type} class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none ${emptyFields.includes('type') ? 'border-2 border-red-500' : ''}`} placeholder="Car Type" onChange={(e) => setType(e.target.value)}/>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-10'>
                <div>
                  <label for="category" class="block mb-2 text-sm font-medium text-gray-900">Category</label>
                  <input type="text" id="category" value={category} class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none ${emptyFields.includes('category') ? 'border-2 border-red-500' : ''}`} placeholder="Car Category" onChange={(e) => setCategory(e.target.value)}/>
                </div>
                <div>
                  <label for="places" class="block mb-2 text-sm font-medium text-gray-900">Places</label>
                  <input type="text" id="places" value={places} class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none ${emptyFields.includes('places') ? 'border-2 border-red-500' : ''}`} placeholder="Car Places" onChange={(e) => setPlaces(e.target.value)}/>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-10'>
                <div>
                    <label for="price" class="block mb-2 text-sm font-medium text-gray-900">Price</label>
                    <input type="text" id="price" value={price} class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none ${emptyFields.includes('price') ? 'border-2 border-red-500' : ''}`} placeholder="Renting Price" onChange={(e) => setPrice(e.target.value)}/>
                </div>
                <div>
                    <label for="state" class="block mb-2 text-sm font-medium text-gray-900 ">Choose state</label>
                    <div className='flex justify-between items-center'>
                        <div className={`${state === 'active' ? "bg-green-200 border-2 border-green-500 px-6 py-2 rounded-xl cursor-pointer" : "bg-gray-200 border-2 border-gray-500 text-gray-500 cursor-pointer py-2 px-6 rounded-xl"}`} onClick={() => setState('active')}>Active</div>
                        <div className={`${state === 'no active' ? "bg-yellow-200 border-2 border-yellow-500 px-6 py-2 rounded-xl cursor-pointer" : "bg-gray-200 border-2 border-gray-500 text-gray-500 cursor-pointer py-2 px-6 rounded-xl"}`} onClick={() => setState('no active')}>No Active</div>
                        <div className={`${state === 'canceled' ? "bg-red-200 border-2 border-red-500 px-6 py-2 rounded-xl cursor-pointer" : "bg-gray-200 border-2 border-gray-500 text-gray-500 cursor-pointer py-2 px-6 rounded-xl"}`} onClick={() => setState('canceled')}>Canceled</div>
                    </div>
                </div>
              </div>
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900" for="image">Image Url</label>
                <input type="text" value={image} id="image" class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none ${emptyFields.includes('image') ? 'border-2 border-red-500' : ''}`} placeholder="Image url" onChange={(e) => setImage(e.target.value)} />
              </div>
              <div className='self-end flex'>
                <button className='bg-blue-200 px-8 py-3 rounded-xl font-medium'>
                  Update
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
                <div className='p-5 rounded-xl bg-blue-100 border-2 border-blue-500 text-blue-500 font-semibold'>
                  {success}
                </div>
              }
          </form>
      </div>
    )
}

export default UpdateCar