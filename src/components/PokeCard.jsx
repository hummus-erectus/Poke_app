import { useState, useEffect } from "react"

import { FaEye, FaSkull, FaMountain, FaLeaf, FaGhost, FaFeatherAlt, FaFistRaised, FaBug } from "react-icons/fa"
import { TbSnowflake } from "react-icons/tb"
import { BsDropletFill, BsNutFill, BsRecordCircleFill } from "react-icons/bs"
import { GiStoneSphere, GiDragonSpiral } from "react-icons/gi"
import { HiFire, HiOutlineSparkles  } from "react-icons/hi"
import { AiFillThunderbolt } from "react-icons/ai"
import { WiMoonAltWaxingCrescent3 } from "react-icons/wi"

//Change all to png?
import bgBlue from '../assets/bgBlue.jpg'
import bgGreen from '../assets/bgGreen.jpg'
import bgGrey from '../assets/bgGrey.jpg'
import bgOrange from '../assets/bgOrange.jpg'
import bgPurple from '../assets/bgPurple.jpg'
import bgWhite from '../assets/bgWhite.jpg'
import bgYellow from '../assets/bgYellow.jpg'
import bgRed from '../assets/bgRed.jpg'

function PokeCard({pokeObj, loading, setLoading}) {
  const {pokemon, species, abilities} = pokeObj

  const [description, setDescription] = useState('')
  const [bgImage, setBgImage] = useState('')
  const [typeIcon, setTypeIcon] = useState('')
  const [circleColor, setCircleColor] = useState('')

  const [abilityArray, setAbilityArray] = useState([])

  const handleImageLoaded = () => {
    setLoading(false) 
    console.log('image loaded')
  }

  useEffect(() => {
    if(pokeObj){
      if(pokemon.id>905){
        return
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
      getTypeDecoration()

      
      const getAbilities = () => {

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
      getAbilities()
    }

  },[pokeObj])
  
  useEffect(() => {
    const image = new Image();
    image.onload = handleImageLoaded
    image.src = bgImage;

  }, [bgImage]);
  
  
    return (
        
        <div>
          {!loading &&
          
            <div className="container mx-auto card-outer p-5 m-10 bg-yellow-300 rounded-3xl text-black font-futura w-96">
              <div style={{ backgroundImage: `url(${bgImage})` }}className="card-inner p-3 bg-hero bg-no-repeat bg-cover bg-center">
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


            // find && <p>Oops! Couldn't find that Pokémon, sorry! </p>
                }
        </div>
        
    )
  
  
}

export default PokeCard