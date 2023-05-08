import styles from './Notifications.module.css'
import images from '@public/'

const Notifications = () => {
    return ( 
        <div className={styles.notifications}>
            <p>
                Notificatios
            </p>
            <div className={styles.notificationsBox}>
                <div className={styles.notificationBoxImg}>
                    <Image src={images.user1} alt='Profile Image' width='50' height='50'/>
                </div>
                <div className={styles.notificationBoxInfo}>
                    <h4>
                        Sarthak Karandikar
                    </h4>
                    <p>
                        Measure action your user...
                    </p>
                    <small>
                        3 mins
                    </small>
                </div>
            </div>
        </div>
    )
}
 
export default Notifications