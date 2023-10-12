import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Image from 'next/image'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  imgSrc: string
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imgSrc }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />

          <div
            className="absolute right-4 top-4 cursor-pointer"
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <div className="my-8 inline-block w-full max-w-2xl transform overflow-hidden bg-white p-4 text-left align-middle shadow-xl transition-all md:p-2">
            <div className="relative">
              <Image
                src={imgSrc}
                alt="Preview"
                className="max-h-[2048px] w-full max-w-[2048px] object-contain"
              />
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ImageModal
