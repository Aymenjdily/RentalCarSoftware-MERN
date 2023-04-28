import React,{ useState } from 'react'

import { BsArrowLeft } from 'react-icons/bs'

import { Link } from 'react-router-dom'

import { useCar } from '../hooks/useCar'

const AddCars = ({ setAddCar }) => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [type, setType] = useState('')
  const [places, setPlaces] = useState(null)
  const [price, setPrice] = useState(null)
  const [image, setImage] = useState('')

  const [error, setError] = useState('')
  const [emptyFields, setEmptyFields] = useState([])
  const [success, setSuccess] = useState('')

  const { dispatch } = useCar()

  const state = "active"

  const addCar = async (e) => {
    e.preventDefault()
    
    const car = {name, category, type, places, price, image, state}
    
    const res = await fetch('http://localhost:4000/api/cars',{
      method:'POST',
      body: JSON.stringify(car),
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

      dispatch({
        type: 'CREATE_CAR',
        payload: data
      })
      
      setSuccess('Your car is added successfully')
    }
  }

  return (
    <div className='p-10 ml-5 h-full rounded-md bg-gray-200 w-full'>
      <div className='pb-5'>
        <Link to='/cars'>
          <button className='px-8 py-3 text-black font-bold flex items-center rounded-xl gap-5' onClick={() => setAddCar(false)}>
            <BsArrowLeft size={25} />
            Back
          </button>
        </Link>
      </div>
      <form className='h-full w-full flex flex-col space-y-7 bg-white p-10 rounded-xl' onSubmit={addCar} encType='multipart/form-data'>
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
            <div>
              <label for="price" class="block mb-2 text-sm font-medium text-gray-900">Price</label>
              <input type="text" id="price" value={price} class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none ${emptyFields.includes('price') ? 'border-2 border-red-500' : ''}`} placeholder="Renting Price" onChange={(e) => setPrice(e.target.value)}/>
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900" for="image">Image Url</label>
              <input type="text" value={image} id="image" class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none ${emptyFields.includes('image') ? 'border-2 border-red-500' : ''}`} placeholder="Image url" onChange={(e) => setImage(e.target.value)} />
            </div>
            <div className='self-end flex'>
              <button className='bg-blue-200 px-8 py-3 rounded-xl font-medium'>
                Add Car
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

export default AddCars