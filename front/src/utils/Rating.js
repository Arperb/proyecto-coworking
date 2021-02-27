


function Rating({ value }) {

    return (
        <div className='ratingsContainer'>
            <span>{value >= 1 ? <div className='fullStar' /> : <div className='emptyStar' />}</span>
            <span>{value >= 2 ? <div className='fullStar' /> : <div className='emptyStar' />}</span>
            <span>{value >= 3 ? <div className='fullStar' /> : <div className='emptyStar' />}</span>
            <span>{value >= 4 ? <div className='fullStar' /> : <div className='emptyStar' />}</span>
            <span>{value >= 5 ? <div className='fullStar' /> : <div className='emptyStar' />}</span>
        </div>
    )
}

export default Rating;