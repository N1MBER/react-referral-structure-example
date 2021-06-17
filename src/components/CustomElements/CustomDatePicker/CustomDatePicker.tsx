import React, {FC, useEffect, useState} from "react";
import classnames from 'classnames';
import Calendar from "react-calendar";
import style from './date_picker.module.scss';
import {zeroFill} from "../../../utils";

interface ICustomDatePicker {
    title?: string,
    defaultValue?: Date,
    onChooseDate: (date: Date) => void,
    incorrect?: boolean,
    description?: string | undefined
}

const CustomDatePicker:FC<ICustomDatePicker> = ({title, defaultValue, onChooseDate, description, incorrect}) => {
    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState<Date | undefined>();

    useEffect(() => {
        if (defaultValue){
            setDate(defaultValue)
        }
    }, [defaultValue])

    const setDateValue = (dates: Date | Date[]) => {
        if (!Array.isArray(dates)){
            setDate(dates);
            onChooseDate(dates);
        }
    }

    const formatDate = (date: Date | undefined) => {
        if (typeof date === "undefined")
            return '';
        else
            return `${zeroFill(date.getDate(),2)}.${zeroFill(date.getMonth() + 1,2)}.${zeroFill(date.getFullYear(),2)}`
    }

    return (
        <div className={classnames(style.datePicker, {
            [style.open]: openDate
        })}>
            {title &&
                <div className={style.title}>
                    <p className={style.title__text}>{title}</p>
                </div>
            }
            <div className={style.container}>
                <button
                    className={classnames(style.dateButton, {
                        [style.incorrect]: incorrect
                    })}
                    onClick={() => setOpenDate(!openDate)}
                >
                    <p className={classnames(style.dateButton__text, {
                        [style.empty]: !date
                    })}>
                        {date ? formatDate(date) : 'ДД.ММ.ГГГГ'}
                    </p>
                    <div className={style.dateButton__icon}>
                        {CalendarIcon}
                    </div>
                </button>
                {description &&
                <p className={classnames(style.container__description, {
                    [style.incorrect]: incorrect
                })}>{description}</p>}
                {openDate &&
                    <div className={style.container__content}>
                        <Calendar
                            onChange={date => setDateValue(date)}
                            value={date}
                        />
                    </div>
                }
            </div>
        </div>
    )
}

const CalendarIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 3H20.0001V0.999939C20.0001 0.448059 19.552 0 18.9999 0H18C17.4479 0 17.0001 0.448059 17.0001 0.999939V3H6.99994V0.999939C6.99994 0.448059 6.55206 0 6 0H5.00006C4.448 0 3.99994 0.448059 3.99994 0.999939V3H3C1.34601 3 0 4.34601 0 6V21C0 22.654 1.34601 24 3 24H21C22.654 24 24 22.654 24 21V6C24 4.34601 22.654 3 21 3ZM21.9999 21C21.9999 21.551 21.551 21.9999 21 21.9999H3C2.44904 21.9999 2.00006 21.551 2.00006 21V10.04H21.9999V21Z" fill="#50525C"/>
    </svg>
)

export default CustomDatePicker;
