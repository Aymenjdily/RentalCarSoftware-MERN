/* eslint-disable react-hooks/exhaustive-deps */
import React,{ useState , useEffect } from 'react'

import { Link, useParams } from 'react-router-dom'

import { BsArrowLeft } from 'react-icons/bs'

const UpdateInfos = () => {
    const [whatssap, setWhatssap] = useState('')
    const [phone, setPhone] = useState('')
    const [facebook, setFacebook] = useState('')
    const [instgram, setInstgram] = useState('')
    const [youtube, setYoutube] = useState('')
    const [email, setEmail] = useState('')
    const [banner, setBanner] = useState('')

    const { id } = useParams()

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const getInformations = async () => {
        const res = await fetch(`http://localhost:4000/api/infos/${id}`)
        const data = await res.json()
    
        setWhatssap(data.whatssap)
        setPhone(data.phone)
        setFacebook(data.facebook)
        setInstgram(data.instagram)
        setYoutube(data.youtube)
        setEmail(data.email)
        setBanner(data.banner)
    }

    useEffect(() => {
        getInformations()
    }, [id])

    const updateInformations = async (e) => {
        e.preventDefault()
              
        const res = await fetch(`http://localhost:4000/api/infos/${id}`,{
          method:'PUT',
          body: JSON.stringify({
              banner: banner,
              whatssap: whatssap,
              phone: phone,
              email: email,
              facebook: facebook,
              instagram : instgram,
              youtube: youtube
          }),
          headers:{
            'Content-Type' : 'application/json',
          }
        })
    
        const data = await res.json()
    
        if(!res.ok){
          setError(data.error)
        }
    
        if(res.ok){
          setError(null)
          
          setSuccess('Your place is updated successfully')
        }
    }

    return (
        <div className='p-10 ml-5 h-full rounded-md bg-gray-200 w-full'>
            <div className='pb-5'>
            <Link to='/informations'>
                <button className='px-8 py-3 text-black font-bold flex items-center rounded-xl gap-5'>
                <BsArrowLeft size={25} />
                Back
                </button>
            </Link>
            </div>
            <form className='h-full w-full flex flex-col space-y-7 bg-white p-10 rounded-xl' onSubmit={updateInformations}>
                <div className='grid grid-cols-2 gap-10'>
                    <div>
                        <label for="whatssap" class="block mb-2 text-sm font-medium text-gray-900">Whatssap</label>
                        <input type="text" value={whatssap} id="whatssap" class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none`} placeholder="Whatssap" onChange={(e) => setWhatssap(e.target.value)}/>
                    </div>
                    <div>
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900">Phone</label>
                        <input type="text" value={phone} id="phone" class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none`} placeholder="Phone" onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                    <div>
                        <label for="facebook" class="block mb-2 text-sm font-medium text-gray-900">Facebook</label>
                        <input type="text" value={facebook} id="facebook" class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none`} placeholder="Facebook" onChange={(e) => setFacebook(e.target.value)}/>
                    </div>
                    <div>
                        <label for="instagram" class="block mb-2 text-sm font-medium text-gray-900">Instagram</label>
                        <input type="text" value={instgram} id="instagram" class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none`} placeholder="Instagram" onChange={(e) => setInstgram(e.target.value)}/>
                    </div>
                    <div>
                        <label for="youtube" class="block mb-2 text-sm font-medium text-gray-900">Youtube</label>
                        <input type="text" value={youtube} id="youtube" class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none`} placeholder="Youtube" onChange={(e) => setYoutube(e.target.value)}/>
                    </div>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input type="text" value={email} id="email" class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none`} placeholder="Youtube" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className='col-span-2'>
                        <label for="banner" class="block mb-2 text-sm font-medium text-gray-900">Annonce</label>
                        <input type="text" value={banner} id="banner" class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none`} placeholder="Annonce" onChange={(e) => setBanner(e.target.value)}/>
                    </div>
                </div>
                <div className='self-end gap-10 flex'>
                    <button className='bg-blue-200 px-8 py-3 rounded-xl font-medium'>
                        Update
                    </button>
                    <Link to='/informations'>
                        <div className='bg-gray-200 px-8 py-3 rounded-xl font-medium'>
                            Cancel
                        </div>
                    </Link>
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

export default UpdateInfos