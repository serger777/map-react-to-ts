import React from "react";
import {useSelector} from "react-redux";
import {getCurrentPoint} from "../../../store";

export const BallonTime = () => {
    const currentPoint = useSelector(getCurrentPoint);
    if (currentPoint?.day) {
        return (
            <div className="balloon-time">
                <p><span>Раздача тары</span><span className="icon-tara"></span></p>
                <p><span>День месяца: </span>{currentPoint.day}</p>
                <p><span>Время: </span>{currentPoint.time}</p>
            </div>
        )
    } else {
        return (
            <div className="balloon-time">
                <p className={"balloon-time--text"}>В данном кисоке нет раздачи тары, если вы хотите получить
                    бесплатно тару, найдите кисок c раздачей рядом </p>
            </div>
        )
    }
}