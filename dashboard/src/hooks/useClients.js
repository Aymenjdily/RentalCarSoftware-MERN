import { useContext } from "react";
import { ClientContext } from "../context/ClientsContext";

export const useClients = () => {
    const context = useContext(ClientContext)

    if(!context) {
        throw Error('use the Context Provider inside the App')
    }

    return context
}