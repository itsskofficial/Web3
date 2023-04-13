import { Web3Provider } from "@components/providers"
import useAccount from "@components/providers/web3/hooks/useAccount"
import Link from "next/link"
import { useContext } from "react"

export default function Footer() {
  const web3 = useContext(Web3Provider)
  const isLoading = !web3.web3API.initalized
  const isWeb3Loaded = web3.web3API.web3
  const account = useAccount(web3.web3API.web3)

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
              {isLoading ? 
                <button
                  className=" disabled: opacity-50 px-8 py-3 border rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    Loading
                </button> :
                isWeb3Loaded ?
                  account ?
                  <button
                  onClick={web3.connect}
                  className="px-8 py-3 border rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    Hey there!
                  </button> :
                <button
                  onClick={web3.connect}
                  className="px-8 py-3 border rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    Connect Wallet
                  </button> :
                  <button
                    onClick={window.open('https://metanask.io','_blank')}
                    className="px-8 py-3 border rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                      Install Metamask
                  </button>
              }
            </div>
          </div>
        </nav>
      </div>
      { account &&
        <div className="flex justify-end pt-1 sm:px-6 lg:px-8">
          <div className="text-white bg-indigo-600 rounded-md p-2">
            {account}
          </div>
        </div>
      }
    </section>
  )
}
