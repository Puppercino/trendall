import RecordList from "@/app/components/RecordList"
import Link from "next/link"

export default function HomePage() {
  return (
    <>
      <h1>Welcome.</h1>
      <p>
        This database contains monographs and photographs of many Sicilian and South Italian vases
        documented by Professor A.D. Trendall during his research.
      </p>
      <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        href={'/add_record'}>
        Temporary add record button, might delete later
      </Link>
      <RecordList />
    </>
  )
}