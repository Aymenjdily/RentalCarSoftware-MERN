import React from 'react'
import { MdDelete } from 'react-icons/md'
import { useFeedback } from '../hooks/useFeedback'

const FeedbackCard = ({ feedback }) => {
    const { dispatch } = useFeedback()

    const handleDelete = async (id) => {
        const res = await fetch(`http://localhost:4000/api/feedbacks/${id}`, {
          method: 'DELETE',
        })
    
        const json = await res.json()
        
        if(res.ok){
            dispatch({
              type: 'DELETE_FEEDBACK',
              payload: json
            })
        }
    }

    return (
        <div key={feedback._id} className='flex flex-col space-y-5 bg-gray-200 p-5 rounded-xl'>
            <div className='flex justify-between'>
                <h2 className='text-lg font-bold'>
                    {feedback.name}
                </h2>
                <button className='text-2xl text-red-500 cursor-pointer' onClick={() => handleDelete(feedback._id)}>
                    <MdDelete />
                </button>
            </div>
            <div className='w-20 h-[5px] rounded-full bg-black flex self-start'/>
            <p className='text-sm text-gray-600'>
                {feedback.description}
            </p>
        </div>
    )
}

export default FeedbackCard