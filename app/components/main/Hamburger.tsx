'use client'

import { kebabCase } from '#components/utils'
import { characterStatus } from '#data/commissionStatus'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import Link from 'next/link'
import { Fragment } from 'react'
import { useMenuState } from './useMenuState' // 我们将创建这个自定义 hook

const Hamburger = () => {
  const allCharacters = [...characterStatus.active, ...characterStatus.stale]
  const { isOpen, setIsOpen } = useMenuState()

  return (
    <div className="fixed bottom-8 right-8">
      <Menu>
        <Transition
          show={isOpen}
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm" />
        </Transition>

        <MenuButton
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-40 h-12 w-12 rounded-full border border-white/20 bg-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 ease-in-out hover:scale-110 hover:bg-white/70 active:scale-95 dark:bg-black/50 dark:hover:bg-black/60"
          style={{
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <div className="flex items-center justify-center">
            {isOpen ? (
              <svg
                className="h-6 w-6 text-gray-800 dark:text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-800 dark:text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </div>
        </MenuButton>

        <Transition
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems
            static
            className="absolute bottom-full right-4 z-40 mb-4 flex max-h-[min(720px,calc(100vh-8rem))] w-64 origin-bottom-right flex-col rounded-xl border border-white/20 bg-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md focus:outline-none dark:bg-black/80"
            style={{
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <div className="flex-none border-b border-gray-300/50 p-4 dark:border-white/10">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Characters</h2>
            </div>
            <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400/20 hover:scrollbar-thumb-gray-400/30 min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-2">
              {allCharacters.map(character => (
                <MenuItem key={character.DisplayName}>
                  {({ active }: { active: boolean }) => (
                    <Link
                      href={`#title-${kebabCase(character.DisplayName)}`}
                      onClick={() => setIsOpen(false)}
                      className={`${
                        active ? 'bg-white/70 dark:bg-white/10' : 'text-gray-900 dark:text-gray-100'
                      } group flex w-full items-center rounded-lg px-4 py-3 text-base font-medium !no-underline transition-colors duration-150 dark:text-white`}
                    >
                      {character.DisplayName}
                    </Link>
                  )}
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  )
}

export default Hamburger
