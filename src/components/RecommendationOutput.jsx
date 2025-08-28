const RecommendationOutput = ({recommendationString}) => {
    const styleObject = {
        whiteSpace: "pre-line",
    }
    return (
        <>
            <p style={styleObject}>{recommendationString}</p>
        </>
    )
}

export default RecommendationOutput