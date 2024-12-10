import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'farmbank',
  description: 'a bank to fazendinha'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}