import styles from '../UI/UIStyles/PersonInfo.module.css'

function PersonInfo(props){
    return(
        <div className={styles.personInfo}>
            <h4 className={styles.name}>{props.name}</h4>
            <h6 className={styles.role}>{props.role}</h6>
            <h6 className={styles.phoneNumber}>{props.phoneNumber}</h6>
        </div>
    )
}

export default PersonInfo;