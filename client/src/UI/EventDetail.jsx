import styles from "../UI/UIStyles/EventDetail.module.css";

function EventDetail(props){
    return(
        <div className={styles.EventDetail}>
            <h4 className={styles.heading}>{props.heading}</h4>
            <img className={styles.image} src={props.image} alt="" />
            <p className={styles.description}>{props.description}</p>
        </div>
    )
}

export default EventDetail