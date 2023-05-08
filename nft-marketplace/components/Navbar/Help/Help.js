import styles from './Help.module.css'

const Help = () => {
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
        <div className={styles.box}>
            {
                help.map((e, i) => {
                    <div key={i+1} className={styles.help}>
                        <Link href={{ pathname: e.link }}>
                            {e.name}
                        </Link>
                    </div>
                })
            }
        </div>
    )
}
 
export default Help