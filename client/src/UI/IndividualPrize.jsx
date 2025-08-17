import styles from '../UI/UIStyles/IndividualPrize.module.css'

function IndividualPrize(props){
    return(
        <div className={styles.prizeContainer}>
            <img src={props.image} alt={props.prize}  className={styles.image}/>
            <h3 className={styles.prizeName}>{props.prizeName}</h3>
            <h3 className={styles.prize}>{props.prize}</h3>
        </div>
    )
}

export default IndividualPrize;