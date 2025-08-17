import Countdown from "./Countdown";
import { useState, useEffect } from 'react';
import styles from '../styles/Showtime.module.css'

function Showtime() {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const updateDots = () => {
            setDots(prevDots => {
                switch (prevDots) {
                    case '':
                        return '.';
                    case '.':
                        return '..';
                    case '..':
                        return '...';
                    default:
                        return '';
                }
            });
        };

        const timer = setInterval(updateDots, 1000);
        
        return () => clearInterval(timer);
    }, []);

    return (
        <div>
            <h2 className={styles.heading}>Time is ticking{dots}</h2>
            <Countdown />
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
        </div>
    );
}

export default Showtime;