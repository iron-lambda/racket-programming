import Sidebar from '@/components/Sidebar'
import BookHeader from '@/components/BookHeader'

export default function BookLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      <BookHeader />
      <div className="flex pt-14 lg:pt-0">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <main className="flex-1 min-h-screen">
          <div className="max-w-prose mx-auto px-6 py-10 lg:py-16">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
