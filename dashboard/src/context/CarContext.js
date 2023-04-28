import { createContext, useReducer } from "react";

export const CarContext = createContext()

export const carReducer = (state, action) => {
    switch(action.type){
        case 'SET_CAR':
            return {
                cars: action.payload
            }
        case 'CREATE_CAR':
            return{
                cars: [action.payload, ...state.cars]
            }
        case 'DELETE_CAR':
            return {
                cars: state.cars.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const CarContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(carReducer, {
        cars: null
    })
    
    return(
        <CarContext.Provider value={{...state, dispatch}}>
            {children}
        </CarContext.Provider>
    )
}