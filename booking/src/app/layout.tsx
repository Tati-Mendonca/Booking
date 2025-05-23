import './globals.css'

import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" className={roboto.className}>
      <body className="shadow-sm dark:bg-gray-700 text-gray-800">{children}</body>
    </html>
  )
}
