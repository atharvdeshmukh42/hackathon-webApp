import { useState, useEffect } from 'react';
import DisplayDiv from '../UI/DisplayDiv';
import styles from '../styles/Countdown.module.css'

function Countdown() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
  
    useEffect(() => {
        function calculateTimeRemaining() {
            const target = new Date('2025-03-27T08:00:00');
            const now = new Date();
            const difference = target - now;
  
            if (difference <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }
  
            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000)
            });
        }

        calculateTimeRemaining();
        
        const timer = setInterval(calculateTimeRemaining, 1000);
        
        return () => clearInterval(timer);
    }, []);
  
    return (
        <div className={styles.countdown}>
            <DisplayDiv name="Days" time={timeLeft.days}/>
            <DisplayDiv name="Hours" time={timeLeft.hours}/>
            <DisplayDiv name="Minutes" time={timeLeft.minutes}/>
            <DisplayDiv name="Seconds" time={timeLeft.seconds}/>
        </div>
    );
}
  
export default Countdown;