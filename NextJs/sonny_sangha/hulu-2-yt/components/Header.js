import Image from "next/image"
import HeaderItem from "./HeaderItem"
import {
  BadgeCheckIcon,
  CollectionIcon,
  HomeIcon,
  LightningBoltIcon,
  SearchIcon,
  UserIcon
} from '@heroicons/react/outline'

function Header({ IMAGES }) {
  return (
    <header className="flex flex-col sm:flex-row m-5 justify-between items-center h-auto">
      <div className="flex flex-grow justify-evenly max-w-2xl">
        <HeaderItem title='Home' Icon={HomeIcon} />
        <HeaderItem title='Trending' Icon={LightningBoltIcon} />
        <HeaderItem title='Verified' Icon={BadgeCheckIcon} />
        <HeaderItem title='Collections' Icon={CollectionIcon} />
        <HeaderItem title='Search' Icon={SearchIcon} />
        <HeaderItem title='Account' Icon={UserIcon} />
      </div>
      <Image 
        className="object-contain"
        src={`${IMAGES}Hulu.png`} 
        width={200} height={100}
        alt=''
      />
    </header>
  )
}

export default Header