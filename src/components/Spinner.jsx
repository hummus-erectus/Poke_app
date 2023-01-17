import spinner from '../assets/pokeGif.gif'

function Spinner() {
    return (
        <div className='mt-20'>
            <img width={300} className='text-center mx-auto' src={spinner} alt='Loading...'/>
        </div>
    )
}

export default Spinner