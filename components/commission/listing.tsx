import React, { useEffect } from 'react'
import { commissionData } from '#data/CommissionData'
import Image from 'next/image'
import IllustratorInfo from './illustrator-info'

import { charaDictionary } from '#data/CharaDictionary'
import kebabCase from '#components/lib/kebabCase'
import Link from 'next/link'

const Listing = ({ Character }: { Character: string }) => {
  useEffect(() => {
    const handleScroll = () => {
      if (window.location.hash) {
        const element = document.querySelector(window.location.hash)
        if (element) {
          const rect = element.getBoundingClientRect()
          // If the element is not within the viewport vertically
          if (rect.bottom < 0 || rect.top > window.innerHeight) {
            // Clear the URL hash without affecting the browser history
            history.replaceState(null, '', ' ')
          }
        }
      }
    }

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const commissions = Object.values(commissionData)
    .filter(commission => commission.Character.toLowerCase() === Character.toLowerCase())
    .map(commission => {
      const dictionaryEntry = charaDictionary.find(chara => chara.Abbr === commission.Character)
      const fullName = dictionaryEntry?.FullName || commission.Character.toLowerCase()
      return {
        ...commission,
        FullName: fullName,
        PublishDate: commission.fileName.slice(0, 8),
        Creator: commission.fileName.split('_')[1],
      }
    })
    .sort((a, b) => b.PublishDate.localeCompare(a.PublishDate))

  if (commissions.length === 0) {
    return <p>To be announced ...</p>
  }

  const characterFullName = commissions[0].FullName

  return (
    <div className="pb-4">
      <div id={kebabCase(characterFullName)}>
        <h2 className="group relative pb-2 pt-4">
          {characterFullName}
          <Link
            href={`#${kebabCase(characterFullName)}`}
            className="ml-2 text-dec-light no-underline opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:text-dec-dark"
          >
            #
          </Link>
        </h2>
      </div>

      {commissions.map(commission => (
        <div
          key={`${kebabCase(commission.FullName)}-${commission.PublishDate}`}
          id={`${kebabCase(commission.FullName)}-${commission.PublishDate}`}
          className="pt-4"
        >
          <Image
            src={require(
              `data/commission/images/${commission.Character}/${commission.fileName}.jpg`,
            )}
            alt={`${commission.Creator} ©️ ${commission.PublishDate}`}
            quality={95}
            placeholder="blur"
          />
          <IllustratorInfo {...commission} />
        </div>
      ))}
    </div>
  )
}

export default Listing
