import React, {useState, useEffect} from 'react'
import { FaAngleDown } from 'react-icons/fa6'
import Button from '../../AdditionalElementsFolder/Button'

export default function Timer({ todo, createTimer, timerActive, setTimerActive}) {

    // Timer Parameters
    const timerHour = 3600;
    const timerDay = 86400;
    const timerWeek = 604800;

    // Timer 
    const [timerInput, setTimerInput] = useState(0)
    const [timeLeft, setTimeLeft] = useState(0);
    const [timerType, setTimerType] = useState(timerHour);
    const [timerMenu, setTimerMenu] = useState(false);

    const selectedTimeType = timerType === timerHour ? "Hours" : timerType === timerDay ? "Days" : "Weeks";

    useEffect(() => {
        let timer = null;

        if (timerActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(timeLeft => timeLeft - 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [timerActive, timeLeft]);

    return (
        <div className="flex flex-col relative justify-center items-center bg-zinc-800 rounded-lg p-2">
            {timerActive ? (
                <div>PLACE HOLDER FOR COUNTDOWN</div>
            ) : (
                <>
                    <label className="text-white flex flex-row gap-2">Time to Complete in
                        <span className="text-amber-500 flex flex-row items-center cursor-pointer transition ease-in-out hover:scale-105 duration-500" onClick={() => setTimerMenu(!timerMenu)}>
                            {selectedTimeType}
                            <FaAngleDown />
                        </span>
                    </label>
                    {timerType === timerHour && timerMenu ? (
                        <ul className="absolute top-[4%] left-[100%] text-center bg-zinc-800 border border-amber-500 rounded-lg text-amber-500 w-[80px]">
                            <li
                                className="cursor-pointer hover:bg-amber-500 hover:text-white w-full rounded-t-lg"
                                onClick={() => {
                                    setTimerType(timerDay);
                                    setTimerMenu(false);
                                }}>
                                Days
                            </li>
                            <li
                                className="cursor-pointer hover:bg-amber-500 hover:text-white w-full rounded-b-lg"
                                onClick={() => {
                                    setTimerType(timerWeek);
                                    setTimerMenu(false);
                                }}>
                                Weeks
                            </li>
                        </ul>
                    ) : timerType === timerDay && timerMenu ? (
                        <ul className="absolute top-[4%] left-[100%] text-center bg-zinc-800 border border-amber-500 rounded-lg text-amber-500 w-[80px]">
                            <li
                                className="cursor-pointer hover:bg-amber-500 hover:text-white w-full rounded-t-lg"
                                onClick={() => {
                                    setTimerType(timerHour);
                                    setTimerMenu(false);
                                }}>
                                Hours
                            </li>
                            <li
                                className="cursor-pointer hover:bg-amber-500 hover:text-white w-full rounded-b-lg"
                                onClick={() => {
                                    setTimerType(timerWeek);
                                    setTimerMenu(false);
                                }}>
                                Weeks
                            </li>
                        </ul>
                    ) : timerType === timerWeek && timerMenu ? (
                        <ul className="absolute top-[4%] left-[100%] text-center bg-zinc-800 border border-amber-500 rounded-lg text-amber-500 w-[80px]">
                            <li
                                className="cursor-pointer hover:bg-amber-500 hover:text-white w-full rounded-t-lg"
                                onClick={() => {
                                    setTimerType(timerHour);
                                    setTimerMenu(false);
                                }}>
                                Hours
                            </li>
                            <li
                                className="cursor-pointer hover:bg-amber-500 hover:text-white w-full rounded-b-lg"
                                onClick={() => {
                                    setTimerType(timerDay);
                                    setTimerMenu(false);
                                }}>
                                Days
                            </li>
                        </ul>
                    ) : null}

                    <input
                        type="number"
                        className="w-10 bg-zinc-800 text-white rounded-lg text-center focus:outline-none border border-amber-500"
                        onChange={(e) => setTimerInput(e.target.value)}
                        value={timerInput} />
                    <Button onClick={() => {
                        setTimeLeft(timerType * timerInput);
                        createTimer(todo.id, timeLeft);
                        setTimerActive(true);
                        setTimerInput(0)
                    }} text="Set Timer" />
                </>
            )}
        </div>
    )
}

// CODE FROM TODOITEM COMPONENT INCASE MY SUB COMPONENT HAS ERRORS

{/* <div className="flex flex-col relative justify-center items-center">
                            {timerActive ? (
                                <div>PLACE HOLDER FOR COUNTDOWN</div>
                            ) : (
                                <>
                                    <label className="text-white flex flex-row gap-2">Time to Complete in
                                        <span className="text-amber-500 flex flex-row items-center cursor-pointer transition ease-in-out hover:scale-105 duration-500" onClick={() => setTimerMenu(!timerMenu)}>
                                            {selectedTimeType}
                                            <FaAngleDown />
                                        </span>
                                    </label>
                                    {timerType === timerHour && timerMenu ? (
                                        <ul className="absolute top-[4%] left-[100%] text-center bg-zinc-800 rounded-lg text-amber-500 w-[80px]">
                                            <li
                                                className="cursor-pointer hover:bg-amber-500 hover:text-white w-full rounded-t-lg"
                                                onClick={() => {
                                                    setTimerType(timerDay);
                                                    setTimerMenu(false);
                                                }}>
                                                Days
                                            </li>
                                            <li
                                                className="cursor-pointer hover:bg-amber-500 hover:text-white w-full rounded-b-lg"
                                                onClick={() => {
                                                    setTimerType(timerWeek);
                                                    setTimerMenu(false);
                                                }}>
                                                Weeks
                                            </li>
                                        </ul>
                                    ) : timerType === timerDay && timerMenu ? (
                                        <ul className="absolute top-[4%] left-[100%] text-center bg-zinc-800 rounded-lg text-amber-500 w-[80px]">
                                            <li
                                                className="cursor-pointer hover:bg-amber-500 hover:text-white w-full rounded-t-lg"
                                                onClick={() => {
                                                    setTimerType(timerHour);
                                                    setTimerMenu(false);
                                                }}>
                                                Hours
                                            </li>
                                            <li
                                                className="cursor-pointer hover:bg-amber-500 hover:text-white w-full rounded-b-lg"
                                                onClick={() => {
                                                    setTimerType(timerWeek);
                                                    setTimerMenu(false);
                                                }}>
                                                Weeks
                                            </li>
                                        </ul>
                                    ) : timerType === timerWeek && timerMenu ? (
                                        <ul className="absolute top-[4%] left-[100%] text-center bg-zinc-800 rounded-lg text-amber-500 w-[80px]">
                                            <li
                                                className="cursor-pointer hover:bg-amber-500 hover:text-white w-full rounded-t-lg"
                                                onClick={() => {
                                                    setTimerType(timerHour);
                                                    setTimerMenu(false);
                                                }}>
                                                Hours
                                            </li>
                                            <li
                                                className="cursor-pointer hover:bg-amber-500 hover:text-white w-full rounded-b-lg"
                                                onClick={() => {
                                                    setTimerType(timerDay);
                                                    setTimerMenu(false);
                                                }}>
                                                Days
                                            </li>
                                        </ul>
                                    ) : null}

                                    <input
                                        type="number"
                                        className="w-10 bg-zinc-800 text-white rounded-lg text-center focus:outline-none border border-amber-500"
                                        onChange={(e) => setTimerInput(e.target.value)}
                                        value={timerInput} />
                                    <Button onClick={() => {
                                        setTimeLeft(timerType * timerInput);
                                        createTimer(todo.id, timeLeft);
                                        setTimerActive(true);
                                        setTimerInput(0)
                                    }} text="Set Timer" />
                                </>
                            )}
                        </div> */}
