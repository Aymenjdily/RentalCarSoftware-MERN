import { createContext, useReducer } from "react";

export const InformationContext = createContext()

export const informationReducer = (state, action) => {
    switch(action.type){
        case 'SET_INFORMATIONS':
            return {
                informations: action.payload
            }
        case 'CREATE_INFORMATIONS':
            return{
                informations: [action.payload, ...state.informations]
            }
        default:
            return state
    }
}

export const InformationContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(informationReducer, {
        informations: null
    })
    
    return(
        <InformationContext.Provider value={{...state, dispatch}}>
            {children}
        </InformationContext.Provider>
    )
}