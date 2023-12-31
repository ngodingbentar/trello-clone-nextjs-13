import Modal from '@/components/Modal'
import './globals.css'
import type { Metadata } from 'next'
// import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'Trello clone - Ngodingbentar',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-[#F5F6F8]'>
        {children}
        <Modal />
      </body>
    </html>
  )
}
