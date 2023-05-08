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
    const [discover, setDiscover] = useState(false)
    const [help, setHelp] = useState(false)
    const [notifications, setNotifications] = useState(false)
    const [profile, setProfile] = useState(false)
    const [openSideMenu, setOpenSideMenu] = useState(false)

    const openMenu = (event) => {
        const btnText = event.target.innerText
        if (btnText == 'Discover') {
            setDiscover(true)
            setHelp(false)
            setNotifications(false)
            setProfile(false)
        }
        else if (btnText == 'Help') {
            setDiscover(false)
            setHelp(true)
            setNotifications(false)
            setProfile(false)
        }
        else {
            setDiscover(false)
            setHelp(false)
            setNotifications(false)
            setProfile(false)
        }
    }

    const openNotifications = (event) => {
        if (!notifications) {
            setDiscover(false)
            setHelp(false)
            setNotifications(true)
            setProfile(false)
        }
        else {
            setNotifications(true)
        }
    }

    const openProfile = () => {
        if (!profile)
    }

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
                        <p onClick={(e) => {openMenu(e)}}>
                            Discover
                        </p>
                        {discover &&  <div className={styles.navbarContainerRightDiscoverBox}>
                            <Discover/>
                        </div>}
                    </div>
                    <div className={styles.navbarContainerRightHelp}>
                        <p onClick={(e) => {openMenu(e)}}>
                            Help
                        </p>
                        {help &&  <div className={styles.navbarContainerRightHelpBox}>
                            <Help/>
                        </div>}
                    </div>
                    <div className={styles.navbarContainerRightNotifications}>
                        <MdNotifications className={styles.notify} onClick={(e) => { openNotifications(e) }} />
                        {notifications && <Notifications/>}
                    </div>
                    <div className={styles.navbarContainerRightButton}>
                        <Button btnText='Create'/>
                    </div>
                    <div className={styles.navbarContainerRightProfileBox}>
                        <div className={styles.navbarContainerRightProfile}>
                            <Image src={images.user1} alt='user profile' width={40} height={40} onClick={openProfile} className={styles.navbarContaierRightProfile} />
                            {profile && <Profile/>}
                        </div>
                    </div>
                    <div className={styles.navbarContainerRightMenu}>
                        <CgMenuRight className={styles.menuIcon} onClick={() => {
                            openSideBar()
                        }} />
                    </div>
                </div>
            </div>
            {openSideMenu && (
                <div className={styles.sidebar}>
                    <Sidebar setOpenSideMenu={setOpenSideMenu} />
                </div>
            )}
        </div>
    )
}
 
export default Navbar