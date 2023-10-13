"use client";

import './header.css'
import Image from "next/image"
import { MagnifyingGlassCircleIcon, UserCircleIcon } from "@heroicons/react/24/solid"
import { useBoardStore } from '@/store/BoardStore';

function Header () {
  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString,
  ]);
  return (
    <header className="header">
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">

        <div className="absolute top-0 left-0 w-full h-60 bg-gradient-to-br from-pink-400 to-blue-400 rounded-md filter blur-3xl opacity-50 -z-50" />
        <Image src="https://picsum.photos/50/50" alt="my-image" width={50} height={50} className="pb-10 md:pb-0 object-contain" />

        <div className='flex items-center space-x-5 flex-1 justify-end w-full'>
          <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
            <MagnifyingGlassCircleIcon className="h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 outline-none p-2"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
            <button type="submit" hidden>Search</button>
          </form>
          <Image src="https://picsum.photos/50/50" alt="my-image" width={50} height={50} className="object-contain rounded-full " />
        </div>

      </div>

      <div className='flex items-center justify-center px-5 py-2 md:py-5'>
        <p className='flex items-center p-5 text-sm font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-blue-400'>
          <UserCircleIcon className='inline-block h-10 w-10 text-blue-600 mr-1 ' />
          I'am GPT...
        </p>
      </div>
    </header>
  )
}

export default Header