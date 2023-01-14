import { useState, useEffect } from "react"
import axios from "axios"
import { FaEye, FaSkull, FaMountain, FaLeaf, FaGhost, FaFeatherAlt, FaFistRaised, FaBug } from "react-icons/fa"
import { TbSnowflake } from "react-icons/tb"
import { BsDropletFill, BsNutFill, BsRecordCircleFill } from "react-icons/bs"
import { GiStoneSphere, GiDragonSpiral } from "react-icons/gi"
import { HiFire, HiOutlineSparkles  } from "react-icons/hi"
import { AiFillThunderbolt } from "react-icons/ai"
import { WiMoonAltWaxingCrescent3 } from "react-icons/wi"

//Change all to png?
import bgBlue from '../assets/bgBlue.svg'
import bgGreen from '../assets/bgGreen.svg'
import bgGrey from '../assets/bgGrey.svg'
import bgOrange from '../assets/bgOrange.svg'
import bgPurple from '../assets/bgPurple.svg'
import bgWhite from '../assets/bgWhite.svg'
import bgYellow from '../assets/bgYellow.svg'
import bgRed from '../assets/bgRed.png'



export default function PokeAPI() {
  const [text, setText] = useState('')
  const [find, setFind] = useState("")

  const [pokemon, setPokemon] = useState('')
  const [species, setSpecies] = useState('')
  const [abilities, setAbilities] = useState('')
  
  const [description, setDescription] = useState('')
  const [bgImage, setBgImage] = useState('')
  const [typeIcon, setTypeIcon] = useState('')
  const [circleColor, setCircleColor] = useState('')

  const [abilityArray, setAbilityArray] = useState([])


  

  useEffect(() => {

    if(find){
      const getData = async () => {
        try {
            let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${find}`)
            setPokemon(res.data)

            let speciesRes = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${find}`)
            setSpecies(speciesRes.data)
          }
        catch (error) {
          console.log(error)
          setPokemon('')
          setSpecies('')
        }
      }
      getData()
    }
  }, [find])

  useEffect(() => {
    if(pokemon && species){
      if(pokemon.id>905){
        return
      }
      
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

      const flavorArray = species.flavor_text_entries
      const desc = flavorArray.filter(flavor => flavor.language.name==='en')
      let formattedDesc = desc[0].flavor_text
        .replace('',' ')
        .replace('­\n', '')
        .replace(/\b[A-Z]+\b/g, (word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      setDescription(formattedDesc)

      const getTypeDecoration = () => {
        let bg
        let circ
        let icon
        switch (pokemon.types[0].type.name){
          // Condsider changing colors to reflect more types
          case 'bug':
            bg = (bgGreen)
            circ = ("bg-green-700")
            icon = (FaBug)
            break
          case 'dark':
            bg = (bgPurple)
            circ = ("bg-purple-500")
            icon = (WiMoonAltWaxingCrescent3)
            break
          case 'dragon':
            bg = (bgWhite)
            circ = ("bg-slate-300")
            icon = (GiDragonSpiral)
            break
          case 'electric':
            bg = (bgYellow)
            circ = ("bg-yellow-300")
            icon = (AiFillThunderbolt)
            break
          case 'fairy':
            bg = (bgPurple)
            circ = ("bg-purple-500")
            icon = (HiOutlineSparkles)
            break
          case 'fighting':
            bg = (bgOrange)
            circ = ("bg-yellow-600")
            icon = (FaFistRaised)
            break
          case 'fire':
            bg = (bgRed)
            circ = ("bg-red-600")
            icon = (HiFire)
            break
          case 'flying':
            bg = (bgWhite)
            circ = ("bg-slate-300")
            icon = (FaFeatherAlt)
            break
          case 'ghost':
            bg = (bgPurple)
            circ = ("bg-purple-500")
            icon = (FaGhost)
            break
          case 'grass':
            bg = (bgGreen)
            circ = ("bg-green-700")
            icon = (FaLeaf)
            break
          case 'ground':
            bg = (bgOrange)
            circ = ("bg-yellow-600")
            icon = (FaMountain)
            break
          case 'ice':
            bg = (bgBlue)
            circ = ("bg-blue-500")
            icon = (TbSnowflake)
            break
          case 'normal':
            bg = (bgWhite)
            circ = ("bg-slate-300")
            icon = (BsRecordCircleFill)
            break
          case 'poison':
            bg = (bgPurple)
            circ = ("bg-purple-500")
            icon = (FaSkull)
            break
          case 'psychic':
            bg = (bgPurple)
            circ = ("bg-purple-500")
            icon = (FaEye)
            break
          case 'rock':
            bg = (bgOrange)
            circ = ("bg-yellow-600")
            icon = (GiStoneSphere)
            break
          case 'steel':
            bg = (bgGrey)
            circ = ("bg-slate-400")
            icon = (BsNutFill)
            break
          case 'water':
            bg = (bgBlue)
            circ = ("bg-blue-500")
            icon = (BsDropletFill)
            break            
        }
        setBgImage(bg)
        setTypeIcon(icon)
        setCircleColor(circ)
      }
      getAbilityData()
      getTypeDecoration()
    }
  },[pokemon, species])

  useEffect(() => {
    if(abilities){
      console.log(abilities)
      setAbilityArray([])
      const newAbilities = []
      for (const a of abilities){
        const abilityObj ={}

        const abilityArr = a.names
        const name = abilityArr.filter(name => name.language.name==='en')
        abilityObj.abilityName=name[0].name

        const abilityFlavorArray = a.flavor_text_entries
        const desc = abilityFlavorArray.filter(flavor => flavor.language.name==='en')
        let formattedDesc = desc[0].flavor_text
          .replace(/\b[A-Z]+\b/g, (word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
          .replace('Pp', 'PP')
          .replace('Hp', 'HP')
        abilityObj.abilityDescription=formattedDesc
        newAbilities.push(abilityObj)

        setAbilityArray(newAbilities)
      }
    }
  },[abilities])




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

useEffect(() => {
  const faviconUpdate = async () => {
    //grab favicon element by ID
    const favicon = document.getElementById("favicon")
    //  CHANGE 'NAME' TO SOMETHING ELSE
    if (pokemon.name) {
      favicon.href = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
    } else {
      favicon.href = "../pokeball.svg"
    }
  }
  faviconUpdate()
}, [pokemon])

  return (
    <div>
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


        {pokemon.id<=905 ?
          <div className="container mx-auto card-outer p-5 m-10 bg-yellow-300 rounded-3xl text-black font-futura w-96">
            <div style={{ backgroundImage: `url(${bgImage})` }}className="card-inner p-3 bg-hero bg-no-repeat bg-cover bg-center bg-fixed">
              <div className="card-top flex text-2xl mx-3">
                <div className="name grow text-3xl">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</div> 
                <div className="pokedexNumber text-orange-600	">#{pokemon.id}</div>
                <div className={`type-button w-fit h-fit p-1 rounded-full ml-1 ${circleColor}`}>
                  {typeIcon}
                </div>
              </div>
              <div className="picture-border-container mx-3 bg-gradient-to-br from-yellow-200 via-yellow-600 to-yellow-200 p-2 drop-shadow-md">
                <div className="card-picture bg-orange-200 h-48">
                  <img className="h-full mx-auto" src={`${pokemon.sprites.other['official-artwork'].front_default}`} alt={pokemon.name} />
                </div>
              </div>
              <div className="under-image">
                <div className="generation-box">
                  <svg width="40" height="40" viewBox="30 0 350 350" className="inline">
                    <defs>
                      <path id="MyPath"
                            d="M 200, 200
                              m -100, 0
                              a 100,100 0 1,1 200,0
                              a 100,100 0 1,1 -200,0" 
                      />
                    </defs>
                    <text className="text-[70px]">
                      <textPath xlinkHref="#MyPath">
                        GENERATION
                      </textPath>
                    </text>
                    <circle fill="black" cx="200" cy="200" r="80" strokeWidth="10" />
                    <text x="200" y="205"
                      textAnchor="middle"
                      stroke="white"
                      fill="white"
                      strokeWidth="1px"
                      alignmentBaseline="middle"
                      className="text-[90px]"        
                    > 
                      {species && species.generation.url.charAt(species.generation.url.length - 2)}
                    </text>
                  </svg>
                  <p className="info-strip inline-block bg-gradient-to-br from-yellow-600 via-yellow-400 to-yellow-600 w-60 italic text-xs text-center" >Height: {pokemon.height/10}m, Weight: {pokemon.weight/10}kg</p>
                </div>
              </div>
              <div className="mb-4 h-[160px]">
                {
                  abilityArray && abilityArray.map((a) => {
                    return (
                      <>
                        <div key={a.id} className="ability-box mx-10 h-20 flex items-center ">
                          <div className="ability-name inline text-lg leading-3">
                            {a.abilityName}
                            <span className="ability-desc text-sm pl-3">{a.abilityDescription}</span>
                          </div>
                        </div>
                        <hr className="border-1 border-black"/>
                      </>
                    )
                  })
                }
              </div>         
              <div className="pokemon-description border-2 text-xs border-yellow-500 mx-3 leading-4 ">
                {description}
              </div>
              <div className="copyright-info text-[10px] text-center">
                Pokémon and Pokémon character names are trademarks of Nintendo.
              </div>
            </div>        
          </div>
          :
          find && <p>Oops! Couldn't find that Pokémon, sorry! </p>
        }        
      </div>
    </div>
  )
}