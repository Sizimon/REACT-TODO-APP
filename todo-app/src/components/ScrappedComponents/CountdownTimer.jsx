import React, { useEffect, useState } from 'react';

const CountdownTimer = ({todo, timeLeft, userActivatedTimer, changeOverdue }) => {
    const [time, setTime] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (timeLeft <= 0) {
                if (userActivatedTimer) {
                    changeOverdue(todo.id);
                }
                clearInterval(intervalId);
            } else {
            timeLeft--;
            
            const seconds = (timeLeft % 60).toString().padStart(2, '0');
            const minutes = Math.floor((timeLeft / 60) % 60).toString().padStart(2, '0');
            const hours = Math.floor((timeLeft / 3600) % 24).toString().padStart(2, '0');
            const days = Math.floor((timeLeft / 86400)).toString().padStart(2, '0');

            setTime({
                days,
                hours,
                minutes,
                seconds,
            });
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    return (
        <div className='bg-amber-500 p-2 rounded-lg'>
            <p className='text-white'>{time.days}:{time.hours}:{time.minutes}:{time.seconds}</p>
        </div>
    );
};

export default CountdownTimer;