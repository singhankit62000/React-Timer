import React, { useEffect, useState } from "react";
import "../styles/Timer.css"

function Timer () {
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval = null;

        if(isRunning && (hour > 0 || minute > 0 || second > 0)) {

            interval = setInterval(() => {
                if(second > 0) {
                    // if only second > 0
                    setSecond((prevState) => prevState - 1);
                } else if(minute > 0) {
                    // if minute > 0 but second is 0
                    setMinute((prevState) => prevState - 1);
                    setSecond(59);
                } else if(hour > 0) {
                    // if only hour > 0 and the second and minute are empty
                    setMinute(59);
                    setSecond(59);
                    setHour((prevState) => prevState - 1);
                }

            }, 1000);

        } else if(isRunning && hour === 0 && minute === 0 && second === 0) {
            // Right when the timer ends up
            setIsRunning(false);
            alert('The timer is up!!');
        } else if(!isRunning && interval !== null) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);

    }, [isRunning, hour, minute, second]);

    const start = (e) => {       
        if(hour > 0 || minute > 0 || second > 0)
        setIsRunning(true);
    }

    const pause = () => {
        setIsRunning(false);
    }

    // Resetting the values to initial-most values
    const reset = () => {
        setSecond(0);
        setMinute(0);
        setHour(0);

        setIsRunning(false);    
    }

    // Function for formatting time unit to always be represented in 2 digits
    const formatTime = (time) => {
        return `${time < 10 ? '0' : ''}${time}`
    }

    return (
        <div className="timer-container">
            <div className="timer-heading">Countdown Timer</div>
            <div className="timer-labels">
                <p className="timer-label-hour">Hours</p>
                <p className="timer-label-minute">Minutes</p>
                <p className="timer-label-second">Seconds</p>
            </div>
            <div className="timer-display">
                <input type="number" placeholder="00" onChange={(e) => setHour(Math.max(0, Math.min(23, parseInt(e.target.value))))} value={formatTime(hour)} className="timer-hour" />
                <p className='timer-colon'>:</p>
                <input type="number" placeholder="00" onChange={(e) => setMinute(Math.max(0, Math.min(59, parseInt(e.target.value))))} value={formatTime(minute)} className="timer-hour" />
                <p className='timer-colon'>:</p>
                <input type="number" placeholder="00" onChange={(e) => setSecond(Math.max(0, Math.min(59, parseInt(e.target.value))))} value={formatTime(second)} className="timer-hour" />
            </div>
            <div className="timer-buttons">
                {!isRunning ? 
                    <button onClick={start} className="timer-button-start">Start</button> : 
                    <button onClick={pause} className="timer-button-stop">Pause</button>
                }
                <button onClick={reset} className="timer-button-reset">Reset</button>
            </div>
        </div>
    );
}

export default Timer;