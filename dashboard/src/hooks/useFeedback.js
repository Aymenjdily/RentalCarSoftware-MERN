import { useContext } from "react";
import { FeedbackContext } from "../context/FeedbackContext";

export const useFeedback = () => {
    const context = useContext(FeedbackContext)

    if(!context) {
        throw Error('use the Context Provider inside the App')
    }

    return context
}