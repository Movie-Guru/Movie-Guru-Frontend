import { useState } from 'react'
import axios from 'axios'
import RecommendationOutput from "./RecommendationOutput"

const Interaction = () => {
    const [userQuery, setUserQuery] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [recommendationString, setRecommendationString] = useState("") // also handles error messages

    const handleSubmit = async event => {
        event.preventDefault()

        // If the user did not enter anything, don't generate recommendation
        if (userQuery === "") {
            return
        }

        setIsLoading(true)
        try {
            const recommendationResponse = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/recommend`,
                {user_query: userQuery}
            )
            setRecommendationString(recommendationResponse.data.recommendation)
        } catch (error) {
            console.error("Unexpected error", error)
            setRecommendationString("An unexpected error has occurred. Please try again later.")
        }
        setIsLoading(false)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <textarea type="text" name="userQuery" value={userQuery} placeholder="I want a movie about robots" onChange={event => {
                    setUserQuery(event.target.value)
                }}/>
                <button type="Submit" disabled={isLoading}>Ask</button>
            </form>
            {isLoading ?
            <div>Generating movie recommendations...</div> :
            <RecommendationOutput recommendationString={recommendationString} />}
        </>
    )
}

export default Interaction