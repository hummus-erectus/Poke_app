function About() {
    return (
      <div>
        <h1 className="text-6xl mb-4">PokeReact</h1>
        <p className='mb-4 text-2xl font-light'>
          This site connects to <a href="https://pokeapi.co/" className="font-bold">PokeApi</a>, a free RESTful Pokemon API. 
          <br/>
          <br/>
          Built in <a href="https://reactjs.org/" className="font-bold">React</a>. <a href="https://tailwindcss.com/" className="font-bold">tailwindcss</a> and <a href="https://daisyui.com/" className="font-bold">daisyUI</a> are used for all styling.
        </p>
        <p className='text-lg text-gray-400'>
        Version <span className='text-white'>1.0.0</span>
        </p>
      </div>
    )
  }
  
  export default About