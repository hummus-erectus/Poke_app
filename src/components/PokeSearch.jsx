import { useState, useEffect } from "react"
import PokeCard from "./PokeCard"
import axios from "axios"

export default function PokeAPI() {
  const [text, setText] = useState('')
  const [find, setFind] = useState("")
  const [loading, setLoading] = useState(true)

  const [pokemon, setPokemon] = useState('')
  const [species, setSpecies] = useState('')
  const [abilities, setAbilities] = useState('')
  const [pokeObj, setPokeObj] = useState(null)
  
  useEffect(() => {
    console.log('started load')
    if(find){
      setPokemon('')
      setSpecies('')
      const getData = async () => {
        try {
            let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${find}`)
            setPokemon(res.data)

            let speciesRes = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${find}`)
            setSpecies(speciesRes.data)
          }
        catch (error) {
          console.log(error)
        }
      }
      getData()
    }
  }, [find])

  useEffect(() => {
    if(pokemon && species){
      
      // Try to refactor this

      const getAbilityData = async () => {
        let abilityRes = []
        pokemon.abilities[0] && abilityRes.push(await axios.get(pokemon.abilities[0].ability.url))
        pokemon.abilities[1] && abilityRes.push(await axios.get(pokemon.abilities[1].ability.url))
        let abilityData = []
        abilityRes[0] && abilityData.push(abilityRes[0].data)
        abilityRes[1] && abilityData.push(abilityRes[1].data)
        setAbilities(abilityData)       
      }
      
      getAbilityData()
      setLoading(false)
    }
  },[pokemon, species])

  useEffect(() => {
    if (abilities) {
      setPokeObj({
        pokemon: pokemon,
        species: species,
        abilities: abilities
      })
    }
    console.log('finished load')

  }, [abilities])
  
  useEffect(() => {
    const faviconUpdate = async () => {
      //grab favicon element by ID
      const favicon = document.getElementById("favicon")
      
      if (pokemon) {
        favicon.href = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
      } else {
        favicon.href = "../pokeball.svg"
      }
    }
    faviconUpdate()
  }, [pokemon])

  const handleChange = (e) => setText(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(text === ''){
        alert('Please enter something', 'error')
    } else {
        setFind(text.toLowerCase())

        setText('')
    }
}


  return (
    <div>
      <h1 className="text-6xl mb-4">Search for a Pokémon!</h1>
      <div>

        <form onSubmit={handleSubmit}>
          <div className="form-conrol">
              <div className="relative">
                  <input 
                      type="text" 
                      className="w-full pr-40 bg-gray-200 input input-lg text-black" 
                      placeholder="Search"
                      value={text}
                      onChange={handleChange}
                  />
                  <button type="submit" className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg">Go</button>
              </div>
          </div>
        </form>

        {pokeObj && <PokeCard 
          pokeObj={pokeObj}
        />}

      </div>
    </div>
  )
}
