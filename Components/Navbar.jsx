import Link from 'next/link'
import Image from 'next/image'
import GrapeGrannyIcon from '../public/images/GrapeGrannyIcon.png'

const Navbar = () => {
  return (
    <nav className="min-w-full px-2 md:px-0">
      <div className="flex items-center justify-center container mx-auto max-w-5xl h-full">
        {/* Logo */}
        <Link legacyBehavior href="/">
          <a className="font-coiny text-xl md:text-3xl font-bold flex items-center">
            <span>
              <Image
                src={GrapeGrannyIcon}
                alt="Grape Granny Icon"
                width={100}
                height={100}
              />
            </span>
            <span className="bg-gradient-to-br from-brand-russian-violet to-brand-medium-orchid pr-2 bg-clip-text text-transparent">
              Grape
            </span>
            <span className="bg-gradient-to-bl from-brand-russian-violet to-brand-medium-orchid pr-2 bg-clip-text text-transparent">
              Grannys
            </span>
          </a>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
