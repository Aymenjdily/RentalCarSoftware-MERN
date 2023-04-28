/* eslint-disable react-hooks/exhaustive-deps */
import React,{ useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import { BsArrowLeft } from 'react-icons/bs'

import { useClients } from '../hooks/useClients'

import { Cities } from '../utils/Cities'

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { useCar } from '../hooks/useCar'

const AddClient = ({ setAddClient }) => {
    const [firstName, setFirstName] = useState('')
    const [secondName, setSecondName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [cin, setCin] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [firstDate, setFirstDate] = useState(new Date())
    const [secondDate, setSecondDate] = useState(new Date())
    const [car, setCar] = useState(null)
    const [booked, setBooked] = useState(false)

    const [dataCar, setDataCar] = useState(null)

    const Difference_in_time = secondDate.getTime() - firstDate.getTime()

    const Difference_in_day = Difference_in_time / (1000 * 3600 * 24)

    const [emptyFields, setEmptyFields] = useState([])
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const { dispatch } = useClients()

    const { cars, dispatch: getCars } = useCar()

    const getAllCars = async () => {
        const res = await fetch(`http://localhost:4000/api/cars`)
        const data = await res.json()
    
        if(res.ok){
            getCars({
                type: 'SET_CAR',
                payload: data
            })
        }
    }

    const getSingleCar = async () => {
        const res = await fetch(`http://localhost:4000/api/cars/${car}`)
        const data = await res.json()
    
        if(res.ok){
            setDataCar(data)
        }
    }

    useEffect(() => {
        getAllCars()
    }, [])

    useEffect(() => {
        getSingleCar()
    },[car])

    const total = (dataCar?.price * Difference_in_day).toFixed(2)

    const getActiveCars = cars?.filter(item => {
        return item.state === 'active' 
    })

    // change the date outputs

    const depart = firstDate.toLocaleDateString()
    const retour = secondDate.toLocaleDateString()


    const addClients = async (e) => {
        e.preventDefault()
    
        const client = {firstName, secondName, email, phone, cin, city, address, firstDate: depart, secondDate: retour, car, total, booked}
        
        const res = await fetch('http://localhost:4000/api/clients',{
          method:'POST',
          body: JSON.stringify(client),
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

          setFirstName('')
          setSecondName('')
          setEmail('')
          setPhone('')
          setCin('')
          setCity('')
          setAddress('')
          setFirstDate(new Date())
          setSecondDate(new Date())
          setCar(null)
          setBooked(false)
    
    
          dispatch({
            type: 'CREATE_CLIENT',
            payload: data
          })
          
          setSuccess('Your client is added successfully')
        }
    } 

    return (
        <div className='p-10 ml-5 h-full rounded-md bg-gray-200 w-full'>
            <div className='pb-5'>
                <Link to='/bookings'>
                <button className='px-8 py-3 text-black font-bold flex items-center rounded-xl gap-5' onClick={() => setAddClient(false)}>
                    <BsArrowLeft size={25} />
                    Back
                </button>
                </Link>
            </div>
            <form className='h-full w-full flex flex-col space-y-7 bg-white p-10 rounded-xl' onSubmit={addClients}>
                <div className='grid grid-cols-3 gap-10'>
                    <div>
                        <label for="nom" class="block mb-2 text-sm font-medium text-gray-900">Nom</label>
                        <input type="text" value={firstName} id="nom" class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none ${emptyFields.includes('firstName') ? 'border-2 border-red-500' : ''}`} placeholder="Nom" onChange={(e) => setFirstName(e.target.value)}/>
                    </div>
                    <div>
                        <label for="prenom" class="block mb-2 text-sm font-medium text-gray-900">Prénom</label>
                        <input type="text" value={secondName} id="prenom" class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none ${emptyFields.includes('secondName') ? 'border-2 border-red-500' : ''}`} placeholder="Prénom" onChange={(e) => setSecondName(e.target.value)}/>
                    </div>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input type="email" value={email} id="email" class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none ${emptyFields.includes('email') ? 'border-2 border-red-500' : ''}`} placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-10'>
                    <div>
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900">Phone</label>
                        <input type="number" value={phone} id="phone" class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none ${emptyFields.includes('phone') ? 'border-2 border-red-500' : ''}`} placeholder="Phone" onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                    <div>
                        <label for="cin" class="block mb-2 text-sm font-medium text-gray-900">Cin</label>
                        <input type="text" value={cin} id="cin" class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none ${emptyFields.includes('cin') ? 'border-2 border-red-500' : ''}`} placeholder="cin" onChange={(e) => setCin(e.target.value)}/>
                    </div>
                    <div>
                        <label for="city" class="block mb-2 text-sm font-medium text-gray-900">City</label>
                        <select id="city" value={city} onChange={(e) => setCity(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5">
                            {Cities.map((item) => (
                                <option key={item.id} value={item.ville}>
                                    {item.ville}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-10'>
                    <div>
                        <label for="address" class="block mb-2 text-sm font-medium text-gray-900">Address</label>
                        <input type="text" value={address} id="address" class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none ${emptyFields.includes('address') ? 'border-2 border-red-500' : ''}`} placeholder="address" onChange={(e) => setAddress(e.target.value)}/>
                    </div>
                    <div>
                        <label for="firstDate" class="block mb-2 text-sm font-medium text-gray-900">Depart</label>
                        <div className='flex items-center gap-5'>
                            <div class=" inset-y-0 left-0 flex items-center pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                            </div>
                            <DatePicker id='firstDate' selected={firstDate} onChange={(date) => setFirstDate(date)} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none ${emptyFields.includes('firstDate') ? 'border-2 border-red-500' : ''}`} />
                        </div>
                    </div>
                    <div>
                        <label for="secondDate" class="block mb-2 text-sm font-medium text-gray-900">Retour</label>
                        <div className='flex items-center gap-5'>
                            <div class=" inset-y-0 left-0 flex items-center pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                            </div>
                            <DatePicker id='secondDate' selected={secondDate} onChange={(date) => setSecondDate(date)} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none ${emptyFields.includes('secondDate') ? 'border-2 border-red-500' : ''}`} />
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-10'>
                    <div>
                        <label for="car" class="block mb-2 text-sm font-medium text-gray-900">Car</label>
                        <select id="car" value={car} onChange={(e) => setCar(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5">
                            {getActiveCars && getActiveCars.map((item) => (
                                <option key={item.id} value={item._id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label for="car" class="block mb-2 text-sm font-medium text-gray-900">Total</label>
                        <div className='mt-3'>
                            {total} Dh
                        </div>
                    </div>
                    <div>
                        <label for="car" class="block mb-2 text-sm font-medium text-gray-900">State</label>
                        <div className='flex gap-10 items-center'>
                            <div className={`${booked  ? "bg-green-200 border-2 border-green-500 px-6 py-2 rounded-xl cursor-pointer" : "bg-gray-200 border-2 border-gray-500 text-gray-500 cursor-pointer py-2 px-6 rounded-xl"}`} onClick={() => setBooked(true)}>With</div>
                            <div className={`${!booked  ? "bg-yellow-200 border-2 border-yellow-500 px-6 py-2 rounded-xl cursor-pointer" : "bg-gray-200 border-2 border-gray-500 text-gray-500 cursor-pointer py-2 px-6 rounded-xl"}`} onClick={() => setBooked(false)}>Without</div>
                        </div>
                    </div>
                </div>
                <div className='self-start flex'>
                    <button className='bg-blue-200 px-8 py-3 rounded-xl font-medium'>
                        Add Client
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

export default AddClient