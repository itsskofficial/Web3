import { GrClose } from 'react-icons/gr'
import { TiSocialFacebook, TdSocialLinkedin, TiSocialInstagram, TiArrowSortedDown, TiSocialYoutube, TiArrowSortedUp } from 'react-icons/ti'
import styles from './Sidebar.module.css'
import images from '@public/'
import Button from '@components/UI/Button/Button'
import { useState } from 'react'

const Sidebar = () => {
    const [openDiscover, setOpenDiscover] = useState(false)
    const [openHelp, setOpenHelp] = useState(false)

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
    const help = [
        {
            name: 'About',
            link: 'about'
        },
        {
            name: 'Contact Us',
            link: 'contact-us'
        },
        {
            name: 'Signup',
            link: 'signup'
        },
        {
            name: 'Signin',
            link: 'signin'
        },
        {
            name: 'Subscription',
            link: 'subscription'
        }
    ]
    return (
        <div className={styles.sidebar}>
            <GrClose className={styles.sidebarCloseBtn} onClick={() => { closeSidebar() }} />
            <div className= (styles.sidebarBox)>
            <Image src={images.logo} alt='logo' width='150' height='150' />
            <p>
                Discover the most outstanding articles on the NFT world
            </p>
            <div className={styles.sidebarSocial}>
                <a href=#>
                    <TiSocialFacebook/>
                </a>
                <a href=#>
                    <TiSocialFacebook/>
                </a>
                <a href=#>
                    <TiSocialFacebook/>
                </a>
                <a href=#>
                    <TiSocialFacebook/>
                </a>
                <a href=#>
                    <TiSocialFacebook/>
                </a>
            </div>
        </div>
    )
}
 
export default Sidebar