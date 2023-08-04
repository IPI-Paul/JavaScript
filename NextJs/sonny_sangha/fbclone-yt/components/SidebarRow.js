import Image from "next/image"

function SidebarRow({ src, Icon, title }) {
  return (
    <div className="flex items-center space-x-2 p-4 hover:bg-gray-200 rounded-2xl cursor-pointer">
      {
        src && (
          <Image className="w-8 h-8" src={src} alt="" width={30} height={30} layout='fixed' unoptimized={true} />
        )
      }
      {
        Icon && (
          <Icon className='h-8 w-8 text-blue-500' />
        )
      }
      <p className="hidden sm:inline-flex font-medium">{title}</p>
    </div>
  )
}

export default SidebarRow