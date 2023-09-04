import Table from '@/components/table'

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <h4 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center font-medium tracking-tight text-transparent text-4xl">
        Soccer Tracker
      </h4>
      <Table />
    </main>
  )
}
