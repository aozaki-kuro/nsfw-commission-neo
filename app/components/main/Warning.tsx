'use client'

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import Image from 'next/image'
import { Fragment, useEffect, useRef, useState } from 'react'

import HeadImage from 'public/nsfw-cover-s.webp'

// 定义本地存储的键名，用于记录用户是否已确认年龄
const CONFIRMED_AGE_KEY = 'hasConfirmedAge'
// 定义年龄确认的有效期，这里设定为7天（以毫秒为单位）
const AGE_CONFIRM_DURATION = 30 * 24 * 60 * 60 * 1000 // 7 天的毫秒数

export default function AgeConfirmationModal() {
  // 定义一个状态变量，用于控制模态框的显示与隐藏
  const [isOpen, setIsOpen] = useState(false)
  // 使用 useRef 创建一个引用，指向“我已年满18岁”按钮
  const confirmButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // 从 localStorage 中获取已确认年龄的时间戳
    const hasConfirmedAge = localStorage.getItem(CONFIRMED_AGE_KEY)
    // 定义一个函数，判断用户是否在有效期内已确认年龄
    const isAgeConfirmed = () => {
      if (!hasConfirmedAge) return false // 如果没有记录，返回 false
      const timestamp = parseInt(hasConfirmedAge, 10) // 将时间戳字符串转换为整数
      return Date.now() - timestamp < AGE_CONFIRM_DURATION // 判断是否在有效期内
    }
    // 设置模态框的显示状态，未确认年龄时显示模态框
    setIsOpen(!isAgeConfirmed())
  }, [])

  // 处理用户点击“我已年满18岁”按钮的事件
  const handleConfirmAge = () => {
    // 将当前时间戳存储到 localStorage，表示用户已确认年龄
    localStorage.setItem(CONFIRMED_AGE_KEY, Date.now().toString())
    // 关闭模态框
    setIsOpen(false)
  }

  // 处理用户点击“立即离开”按钮的事件
  const handleLeave = () => {
    // 将页面重定向到指定的 URL
    window.location.href = 'https://www.google.com'
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      {/* 使用 Dialog 组件创建模态框 */}
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {}} // 提供一个空的 onClose 函数
        initialFocus={confirmButtonRef} // 将初始焦点设置到确认按钮
        static // 添加 static 属性，阻止点击外部关闭
      >
        {/* 背景遮罩的过渡效果 */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* 背景遮罩 */}
          <div className="fixed inset-0 bg-black/25 backdrop-blur-xl dark:bg-white/5" />
        </TransitionChild>

        {/* 模态框的定位和布局 */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            {/* 模态框内容的过渡效果 */}
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {/* 模态框的内容面板 */}
              <DialogPanel className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-back-dark">
                {/* 顶部的封面图片 */}
                <Image
                  src={HeadImage}
                  alt="NSFW Commissions"
                  quality={80}
                  placeholder="blur"
                  className="mb-4 select-none"
                  priority
                />
                {/* 模态框的标题 */}
                <DialogTitle
                  as="h3"
                  className="select-none text-center text-lg font-bold leading-6 text-gray-900 dark:text-gray-300"
                >
                  [ Warning ]
                </DialogTitle>
                {/* 提示信息 */}
                <div className="mt-2">
                  <p className="select-none text-center text-sm text-gray-500 dark:text-gray-400">
                    You have to be over 18 to view the contents.
                    <br />
                    Please <b>leave now</b> if you are under 18.
                  </p>
                </div>

                {/* 按钮区域 */}
                <div className="mt-4 flex items-center justify-center">
                  {/* “我已年满18岁”按钮 */}
                  <button
                    ref={confirmButtonRef} // 将按钮的引用传递给 ref
                    type="button"
                    className="button-warning-general button-enter select-none"
                    onClick={handleConfirmAge}
                  >
                    I am over 18
                  </button>
                  {/* 按钮之间的间距 */}
                  <div className="mx-3" />
                  {/* “立即离开”按钮 */}
                  <button
                    type="button"
                    className="button-warning-general button-leave"
                    onClick={handleLeave}
                  >
                    Leave Now
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
