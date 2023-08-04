import { useRouter } from "next/router"
import Link from "next/link"
import { ChevronLeftIcon, ChevronRightIcon, MinusIcon, PlusIcon } from '@heroicons/react/solid'

function PaginationButtons() {
  const router = useRouter()
  const startIndex = Number(router.query.start) || 0
  const depth = Number(router.query.depth) || 0

  return (
    <div className="flex justify-between max-w-lg text-blue-700 mb-10">
      <Link href={`/search?term=${router.query.term}&depth=${depth > 0 ? depth - 1 : depth}&start=${startIndex}`}>
        <div className="flex flex-grow flex-col items-center cursor-pointer hover:underline">
          <MinusIcon className="h-5" />
          <p>Decrease Depth</p>
        </div>
      </Link>
      <Link href={`/search?term=${router.query.term}&depth=${depth + 1}&start=${startIndex}`}>
        <div className="flex flex-grow flex-col items-center cursor-pointer hover:underline">
          <PlusIcon className="h-5" />
          <p>Increase Depth</p>
        </div>
      </Link>
      {
        startIndex >= 10 && (
          <Link href={`/search?term=${router.query.term}&depth=${depth}&start=${startIndex - 10}`}>
            <div className="flex flex-grow flex-col items-center cursor-pointer hover:underline">
              <ChevronLeftIcon className="h-5" />
              <p>Previous</p>
            </div>
          </Link>
        )
      }
      <Link href={`/search?term=${router.query.term}&depth=${depth}&start=${startIndex + 10}`}>
        <div className="flex flex-grow flex-col items-center cursor-pointer hover:underline">
          <ChevronRightIcon className="h-5" />
          <p>Next</p>
        </div>
      </Link>
    </div>
  )
}

export default PaginationButtons