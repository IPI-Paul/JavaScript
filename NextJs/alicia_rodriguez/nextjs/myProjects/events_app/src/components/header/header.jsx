import Link from "next/link"
import Image from 'next/image'

export const Header = () => {
  return (
    <header>
      <div>
        <div className="topNav">
          <Image src={'/next.svg'} width={100} height={100} alt='logo' />
          <nav>
            <ul>
              <li>
                <Link href="/"> Home </Link>
              </li>
              <li>
                <Link href="/events"> Events </Link> 
              </li>
              <li>
                <Link href="/about-us"> About Us </Link> 
              </li>
            </ul> 
          </nav>
        </div>
        <h1> Sed ut perspiciatis unde omnis </h1>
      </div>
    </header>
  )
}