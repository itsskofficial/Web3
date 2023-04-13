import { Web3Provider } from "@components/providers"
import Link from "next/link"
import { useContext } from "react"

export default function Footer() {
  const web3 = useContext(Web3Provider)
  const isLoading = !web3.web3API.initalized
  const isWeb3Loaded = web3.web3API.web3

  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between">
            <div>
              <Link href="/" >
                <a
                  className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Home
                </a>
              </Link>
              <Link href="/" >
                <a
                  className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Marketplace
                </a>
              </Link>
              <Link href="/" >
                <a
                  className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Blogs
                </a>
              </Link>
            </div>
            <div>
              <Link href="/" >
                <a
                  className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Wishlist
                </a>
              </Link>
              {isLoading ?}
              <button
                onClick={web3.connect}
                className="px-8 py-3 border rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  Connect
              </button>
            </div>
          </div>
        </nav>
      </div>
    </section>
  )
}
