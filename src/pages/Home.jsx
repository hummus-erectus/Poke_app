import PokeSearch from "../components/PokeSearch"
import PokeCard from "../components/PokeCard"

function Home() {


  return (
    <div>
        <h1 className="text-6xl mb-4">Search for a Pokémon!</h1>
        <PokeSearch />
        {/* <PokeCard /> */}
    </div>
  )
}

export default Home