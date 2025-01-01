'use client'

import { kebabCase } from '#components/utils'
import { characterStatus } from '#data/commissionStatus'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import Link from 'next/link'
import { Fragment, useEffect, useRef, useState } from 'react'

interface Character {
  DisplayName: string
}

interface ListItemProps {
  character: Character
  active: boolean
  close: () => void
}

const ListItem = ({ character, active, close }: ListItemProps) => (
  <Link
    href={`#title-${kebabCase(character.DisplayName)}`}
    onClick={() => setTimeout(close, 100)}
    className={`${
      active ? 'bg-white/70 dark:bg-white/10' : 'text-gray-900 dark:text-gray-100'
    } group flex w-full items-center rounded-lg px-4 py-2 text-base font-medium !no-underline transition-colors duration-150 dark:text-white`}
  >
    {character.DisplayName}
  </Link>
)

interface CharacterListProps {
  close: () => void
}

const CharacterList = ({ close }: CharacterListProps) => {
  const [isStaleExpanded, setIsStaleExpanded] = useState(false)
  const activeListRef = useRef<HTMLDivElement>(null)
  const staleListRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative">
      <div className="relative overflow-hidden">
        {/* Active List */}
        <div
          ref={activeListRef}
          className={`transition-transform duration-300 ease-in-out ${
            isStaleExpanded
              ? 'absolute inset-0 -translate-y-full opacity-0'
              : 'translate-y-0 opacity-100'
          }`}
          style={{ willChange: 'transform, opacity' }}
        >
          {characterStatus.active.map(character => (
            <MenuItem key={character.DisplayName}>
              {({ active }) => <ListItem character={character} active={active} close={close} />}
            </MenuItem>
          ))}
        </div>

        {/* Stale List */}
        <div
          ref={staleListRef}
          className={`transition-transform duration-300 ease-in-out ${
            isStaleExpanded
              ? 'translate-y-0 opacity-100'
              : 'absolute inset-0 translate-y-full opacity-0'
          }`}
          style={{ willChange: 'transform, opacity' }}
        >
          {characterStatus.stale.map(character => (
            <MenuItem key={character.DisplayName}>
              {({ active }) => <ListItem character={character} active={active} close={close} />}
            </MenuItem>
          ))}
        </div>
      </div>

      {/* Stale Toggle Button */}
      <button
        onClick={() => setIsStaleExpanded(!isStaleExpanded)}
        className="mt-2 flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-2 hover:bg-white/70 dark:hover:bg-white/10"
        type="button"
      >
        <p className="font-bold text-gray-600 dark:text-gray-300">Stale Characters</p>
        <svg
          className={`h-4 w-4 text-gray-600 transition-transform duration-200 dark:text-gray-300 ${
            isStaleExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  )
}

// 新增的MenuContent组件来处理菜单内容和副作用
const MenuContent = ({ open, close }: { open: boolean; close: () => void }) => {
  useEffect(() => {
    if (open) {
      document.documentElement.classList.add('overflow-hidden', 'touch-none')
    } else {
      document.documentElement.classList.remove('overflow-hidden', 'touch-none')
    }
    return () => {
      document.documentElement.classList.remove('overflow-hidden', 'touch-none')
    }
  }, [open])

  return (
    <>
      <MenuButton
        className={`${
          open ? 'bg-gray-200 dark:bg-gray-800' : ''
        } inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-900 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md transition-colors duration-300 hover:bg-gray-200 focus:outline-none dark:bg-black/80 dark:text-white dark:hover:bg-gray-800`}
        style={{
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <span className="sr-only">Open navigation menu</span>
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </MenuButton>

      {/* Backdrop */}
      {open && (
        <div className="fixed inset-0 z-30 bg-gray-200/10 backdrop-blur-sm dark:bg-gray-900/10" />
      )}

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
          className="absolute bottom-full right-4 z-40 mb-4 max-h-[calc(100vh-8rem)] w-64 origin-bottom-right overflow-y-auto rounded-xl border border-white/20 bg-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md focus:outline-none dark:bg-black/80"
          style={{
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <div className="border-b border-gray-300/50 p-4 dark:border-white/10">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Characters</h2>
          </div>
          <div className="p-2">
            <CharacterList close={close} />
          </div>
        </MenuItems>
      </Transition>
    </>
  )
}

const Hamburger = () => {
  return (
    <Menu as="div" className="fixed bottom-8 right-8">
      {({ open, close }) => <MenuContent open={open} close={close} />}
    </Menu>
  )
}

export default Hamburger
