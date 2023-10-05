'use client'

import Link from "next/link"
import './header.css'
import Image from "next/image"
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid"

function Header () {
  return (
    <header className="header">
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-2xl">
        <Image src="https://picsum.photos/300/100" alt="my-image" width={300} height={100} className="w-44 md:w-56 pb-10 md:pb-0 object-contain" />
        <div>
          <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
            <MagnifyingGlassCircleIcon className="h-6 w-6 text-gray-400" />
            <input type="text" placeholder="Search..." className="flex-1 outline-none p-2" />
            <button type="submit" hidden>Search</button>
          </form>
        </div>
      </div>
    </header>
  )
}

export default Header