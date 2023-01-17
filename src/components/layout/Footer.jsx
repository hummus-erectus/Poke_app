function Footer() {
    const currentYear = new Date().getFullYear()
  return (
    <footer className="footer p-10  bg-neutral text-neutral-content footer-center">
        <div>
            <p>&copy; Copyright {currentYear} Robert Grayson. All rights reserved</p>
            <p className="font-futura">Pokémon and Pokémon character names are trademarks of Nintendo.</p>
        </div>
    </footer>
  )
}

export default Footer