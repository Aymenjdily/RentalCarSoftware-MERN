/* eslint-disable react-hooks/exhaustive-deps */
import React,{ useEffect } from 'react'
import { useFeedback } from '../hooks/useFeedback'
import { FeedbackCard } from '../components'

const Feedbacks = () => {
    const { dispatch, feedbacks } = useFeedback()

    const getAllFeedbacks = async () => {
        const res = await fetch(`http://localhost:4000/api/feedbacks`)
        const data = await res.json()
    
        if(res.ok){
            dispatch({
                type: 'SET_FEEDBACK',
                payload: data
            })
        }
    }

    useEffect(() => {
        getAllFeedbacks()
    }, [])


    return (
        <div className='p-5 ml-5 rounded-md bg-gray-200 w-full'>
            <div className='bg-white p-5 w-full h-full rounded-xl'>
                <div className='w-full flex justify-between items-center'>
                    <h1 className='font-semibold text-2xl'>Feedbacks</h1>
                </div>
                <div className='py-12'>
                    <div className='grid grid-cols-3 gap-10'>
                        {
                            feedbacks && feedbacks.map((item) => (
                                <FeedbackCard key={item._id} feedback={item} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feedbacks