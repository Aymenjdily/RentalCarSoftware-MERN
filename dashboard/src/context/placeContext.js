import { createContext, useReducer } from "react";

export const PlaceContext = createContext()

export const PlaceReducer = (state, action) => {
    switch(action.type){
        case 'SET_PLACE':
            return {
                places: action.payload
            }
        case 'CREATE_PLACE':
            return{
                places: [action.payload, ...state.places]
            }
        case 'DELETE_PLACE':
            return {
                places: state.places.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const PlaceContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(PlaceReducer, {
        places: null
    })
    
    return(
        <PlaceContext.Provider value={{...state, dispatch}}>
            {children}
        </PlaceContext.Provider>
    )
}
