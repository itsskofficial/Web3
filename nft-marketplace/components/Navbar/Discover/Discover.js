import styles from 'Discover.module.css'
import Link from 'next/link'

const Discover = () => {
    const discover = [
        {
            name: 'Collection',
            link: 'collection'
        },
        {
            name: 'Search',
            link: 'search'
        },
        {
            name: 'Profile',
            link: 'profile'
        },
        {
            name: 'NFT Details',
            link: 'nft-details'
        },
        {
            name: 'Account Settings',
            link: 'account-settings'
        },
        {
            name: 'Connect Wallet',
            link: 'connect-wallet'
        },
        {
            name: 'Blog',
            link: 'blog'
        }
    ]
    return (
        <div>
            {discover.map}
    )
}
 
export default Discover