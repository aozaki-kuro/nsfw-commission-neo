'use client'

import { kebabCase } from '#components/utils'
import { characterStatus } from '#data/commissionStatus'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'

interface Character {
  DisplayName: string
}

const MenuIcon = memo(({ isOpen }: { isOpen: boolean }) => (
  <svg
    className="h-5 w-5 transform transition-transform duration-300"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
  >
    {isOpen ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    )}
  </svg>
))
MenuIcon.displayName = 'MenuIcon'

const ChevronIcon = memo(({ isExpanded }: { isExpanded: boolean }) => (
  <svg
    className={`h-4 w-4 text-gray-600 transition-transform duration-200 dark:text-gray-300 ${
      isExpanded ? 'rotate-180' : ''
    }`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
))
ChevronIcon.displayName = 'ChevronIcon'

interface ListItemProps {
  character: Character
  isActive?: boolean
  close: () => void
}

const ListItem = memo(({ character, isActive, close }: ListItemProps) => {
  const router = useRouter()

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      close()
      router.push(`/#title-${kebabCase(character.DisplayName)}`)
    },
    [character.DisplayName, close, router],
  )

  const href = useMemo(() => `/#title-${kebabCase(character.DisplayName)}`, [character.DisplayName])

  return (
    <Link
      href={href}
      onClick={handleClick}
      prefetch
      className={`${
        isActive ? 'bg-white/70 dark:bg-white/10' : ''
      } group flex w-full items-center rounded-lg px-4 py-2 font-mono text-base text-gray-900 !no-underline transition-colors duration-150 hover:bg-white/70 dark:text-white dark:hover:bg-white/10`}
    >
      {character.DisplayName}
    </Link>
  )
})
ListItem.displayName = 'ListItem'

interface CharacterListProps {
  close: () => void
}

const CharacterList = memo(({ close }: CharacterListProps) => {
  const [isStaleExpanded, setIsStaleExpanded] = useState(false)

  const toggleStaleList = useCallback(() => {
    setIsStaleExpanded(prev => !prev)
  }, [])

  const activeListClass = useMemo(
    () =>
      `transform-gpu transition-transform duration-300 ease-in-out ${
        isStaleExpanded
          ? 'absolute inset-0 -translate-y-full opacity-0'
          : 'translate-y-0 opacity-100'
      }`,
    [isStaleExpanded],
  )

  const staleListClass = useMemo(
    () =>
      `transform-gpu transition-transform duration-300 ease-in-out ${
        isStaleExpanded
          ? 'translate-y-0 opacity-100'
          : 'absolute inset-0 translate-y-full opacity-0'
      }`,
    [isStaleExpanded],
  )

  return (
    <div className="relative">
      <div className="relative overflow-hidden">
        <div className={activeListClass} style={{ willChange: 'transform, opacity' }}>
          {characterStatus.active.map(character => (
            <MenuItem key={character.DisplayName} as={Fragment}>
              {({ active }: { active: boolean }) => (
                <ListItem character={character} isActive={active} close={close} />
              )}
            </MenuItem>
          ))}
        </div>

        <div className={staleListClass} style={{ willChange: 'transform, opacity' }}>
          {characterStatus.stale.map(character => (
            <MenuItem key={character.DisplayName} as={Fragment}>
              {({ active }: { active: boolean }) => (
                <ListItem character={character} isActive={active} close={close} />
              )}
            </MenuItem>
          ))}
        </div>
      </div>

      <button
        onClick={toggleStaleList}
        className="mt-2 flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-2 font-mono hover:bg-white/70 dark:hover:bg-white/10"
        type="button"
      >
        <p className="font-bold text-gray-600 dark:text-gray-300">Stale Characters</p>
        <ChevronIcon isExpanded={isStaleExpanded} />
      </button>
    </div>
  )
})
CharacterList.displayName = 'CharacterList'

const MenuContent = memo(({ open, close }: { open: boolean; close: () => void }) => {
  useEffect(() => {
    const html = document.documentElement
    if (open) {
      html.classList.add('overflow-hidden', 'touch-none')
    } else {
      html.classList.remove('overflow-hidden', 'touch-none')
    }
    return () => {
      html.classList.remove('overflow-hidden', 'touch-none')
    }
  }, [open])

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-20 bg-gray-200/10 backdrop-blur-sm dark:bg-gray-900/10" />
      )}

      <MenuButton
        className={`relative z-30 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-900 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md transition-colors duration-300 hover:bg-gray-200 focus:outline-none dark:bg-black/80 dark:text-white dark:hover:bg-gray-800 ${
          open ? '!bg-gray-200 dark:!bg-gray-800' : ''
        }`}
        style={{
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <span className="sr-only">Open navigation menu</span>
        <MenuIcon isOpen={open} />
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
          className="absolute bottom-full right-4 z-40 mb-4 max-h-[calc(100vh-8rem)] w-64 origin-bottom-right overflow-y-auto rounded-xl border border-white/20 bg-white/80 font-mono shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md focus:outline-none dark:bg-black/80"
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
})
MenuContent.displayName = 'MenuContent'

const Hamburger = () => {
  return (
    <Menu as="div" className="fixed bottom-8 right-8 hidden md:block">
      {({ open, close }) => <MenuContent open={open} close={close} />}
    </Menu>
  )
}

export default Hamburger
