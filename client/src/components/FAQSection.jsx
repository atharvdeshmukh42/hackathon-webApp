import styles from '../styles/FAQSection.module.css'
import QAUnit from './QAUnit'
import {QnAJson} from '../data/QnA'

function FAQSection(){
    return(
        <div className={styles.FAQDiv}>
            <h2 className={styles.heading}>FAQs</h2>
            {QnAJson.map((item) => (
                <QAUnit key={item.question} {...item}/>
            ))}
        </div>
    )
}

export default FAQSection