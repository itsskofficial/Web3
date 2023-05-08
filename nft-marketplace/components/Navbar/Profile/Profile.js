import { FaUserAlt, FaRegIage, FaUserEdit } from 'react-icons/fa'
import { MdHelpCenter } from 'react-icons/md'
import { TbDownloadOff, TbDownload } from 'react-icons/tb'
import images from '@public/'
import Link from 'next/link'

const Profile = () => {
    return ( 
        <div className={styles.profile}>
            <div className={styles.profileAccount}>
                <Image src={images.user1} alt='profile' width='50' heigh='50' className={styles.profileAccountImg} />
                
            </div>
            <div className={styles.profileAccountInfo}>
                <p>
                    Sarthak Karandikar
                </p>
                <small>
                    X03492342341434...
                </small>
            </div>
            <div classname={styles.profileMenu}>
                <div className = {styles.profileMenuOne}>
                    <div className={styles.profileMenuOneItem}>
                        <FaUserAlt />
                        <p>
                            <Link href={{pathname:'/myprofile'}}>
                                My Profile
                            </Link>
                            <Link href={{pathname:'/mynfts'}}>
                                My NFTs
                            </Link>
                            <Link href={{pathname:'/edit'}}>
                                Edit Profile
                            </Link>
                        </p>
                    </div>
                </div>
                <div className={styles.profileMenuTwo}>
                    <div className={styles.profileMenuOneItem}>
                        <MdHelpCenter/>
                        <p>
                            <Link href={{ pathname: '/help' }}>
                                Disconnect Wallet
                            </Link>
                            <Link href={{ pathname: '/help' }}>
                                Disconnect Wallet
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default Profile