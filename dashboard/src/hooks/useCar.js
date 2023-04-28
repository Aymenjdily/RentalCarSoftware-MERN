import { useContext } from "react";
import { CarContext } from "../context/CarContext";

export const useCar = () => {
    const context = useContext(CarContext)

    if(!context) {
        throw Error('use the Context Provider inside the App')
    }

    return context
}