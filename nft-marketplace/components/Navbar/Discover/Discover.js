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
            {discover.map((e,i) => {
                <div className={styles.discover} key={i + 1}>
                    <Link href={{ pathname: `${e.link}` }}>
                        {e.name}
                    </Link> 
                </div>
            })}
    )
}
 
export default Discover