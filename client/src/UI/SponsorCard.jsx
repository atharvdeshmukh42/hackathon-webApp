import styles from '../UI/UIStyles/SponsorCard.module.css'

function SponsorCard(props){
    return(
        <div className={styles.prizeContainer}>
            <img src={props.image} alt={props.prize}  className={styles.image}/>
            <h3 className={styles.prize}>{props.name}</h3>
        </div>
    )
}

export default SponsorCard;