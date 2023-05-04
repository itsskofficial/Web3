import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MdNotifications } from 'react-icons/md'
import { BsSearch } from 'react-icons/bs'
import {CgMenuLeft, CgMenuRight} from 'react-icons/cg'
import Discover from './Discover/Discover'
import Profile from './Profile/Profile'
import Notifications from './Notifications/Notifications'
import Sidebar from './Sidebar/Sidebar'
import Button from '@components/UI/Button/Button'
import images from '@public/images/index'

const Navbar = () => {
    const [discover, setdiscover] = useState(false)
    const [help, setHelp] = useState(false)
    const [notifications, setNotifications] = useState(false)
    const [profile, setProfile] = useState(false)
    const [openSideMenu, setOpenSideMenu] = useState(false)

    return (
        <div className={styles.navbar}>
            <div className={styles.navbarContainer}>
                <div classname={styles.navbarContainerLeft}>
                    <div className={styles.logo}>
                        <Image src={images.logo} alt='nft marketplace logo' height={100} width={100} />
                    </div>
                    <div className={styles.navbarContainerLeftSearch}>
                        <div className={styles.navbarContainerLeftSearchBox}>
                            <input type='text' placeholder='Search NFTs'>
                                <BsSearch onClick={() => {}} className={styles.search}/>
                            </input>
                        </div>
                    </div>
                </div>
                <div classname={styles.navbarContainerRight}>                    
                    <div className={styles.navbarContainerRightDiscover}>
                        <p onClick={(e) => { }}>
                            Discover
                        </p>
                        <div className={styles.navbarContainerRightDiscoverBox}>
                            <Discover/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default Navbar