import { createContext, useReducer } from "react";

export const FeedbackContext = createContext()

export const FeedbackReducer = (state, action) => {
    switch(action.type){
        case 'SET_FEEDBACK':
            return {
                feedbacks: action.payload
            }
        case 'DELETE_FEEDBACK':
            return {
                feedbacks: state.feedbacks.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const FeedbackContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(FeedbackReducer, {
        feedbacks: null
    })
    
    return(
        <FeedbackContext.Provider value={{...state, dispatch}}>
            {children}
        </FeedbackContext.Provider>
    )
}