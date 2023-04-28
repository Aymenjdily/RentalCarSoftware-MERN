import { useContext } from "react";
import { InformationContext } from "../context/InformationContext";

export const useInformations = () => {
    const context = useContext(InformationContext)

    if(!context) {
        throw Error('use the Context Provider inside the App')
    }

    return context
}