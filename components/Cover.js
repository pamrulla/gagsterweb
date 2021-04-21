import styles from "../styles/Cover.module.scss";

function Cover(props) {

    return ( 
        <section className={styles.cover}>
            <div className={styles['dark-overlay']}>
                <div className={styles['cover-inner']}>
                    <h1 className={styles['x-large']}>{props.main}</h1>
                    <p className={styles['lead']}>{props.sub}</p>
                </div>
            </div>
        </section>
    );
}
 
export default Cover;
