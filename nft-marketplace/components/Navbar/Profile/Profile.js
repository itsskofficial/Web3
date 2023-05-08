import { FaUserAlt, FaRegIage, FaUserEdit } from 'react-icons/fa'
import { MdHelpCenter } from 'react-icons/md'
import { TbDownloadOff, TbDownload } from 'react-icons/tb'
import images from '@public/'

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
            <div classname={st}
        </div>
    )
}
 
export default Profile