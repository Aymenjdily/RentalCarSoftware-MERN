import { useContext } from "react";
import { PlaceContext } from "../context/placeContext";

export const usePlace = () => {
    const context = useContext(PlaceContext)

    if(!context) {
        throw Error('use the Context Provider inside the App')
    }

    return context
}