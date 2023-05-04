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
                <div classname={styles.navbar}

            </div>
        </div>
    )
}
 
export default Navbar