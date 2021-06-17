import React, {FC, useEffect, useState} from "react";
import {ICustomInput} from "./ICustomInput";
import style from './input.module.scss';
import classnames from "classnames";

const CustomInput:FC<ICustomInput> = ({inputRef,onKeyPress,title, link, type,value,setValue, placeholder, description, incorrect, disabled}) => {
    const [visible, setVisible] = useState(type !== 'password');
    const [inputType, setInputType] = useState(type);

    useEffect(() => {
        setInputType(visible ? type === 'password' ? 'text': type: 'password')
    }, [visible])

    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (type !== 'number'){
            setValue(e.target.value)
        } else if (/^[0-9]*\.?[0-9]*$/.test(e.target.value))
            setValue(e.target.value)
    }

    return (
        <div className={style.container}>
            <div className={style.title}>
                <p className={style.title__text}>{title}</p>
                {!!link && link}
            </div>
            <div className={style.container__content}>
                <input
                    type={inputType}
                    className={classnames(style.input, {
                        [style.incorrect]: incorrect
                    })}
                    disabled={!!disabled}
                    ref={inputRef}
                    value={value}
                    onKeyPress={event => {
                        if (onKeyPress)
                            onKeyPress(event)
                    }}
                    onChange={onChangeValue}
                    placeholder={placeholder}
                />
                {type === 'password' &&
                    <button
                        className={style.button}
                        onClick={() => setVisible(!visible)}
                    >
                        {visible ? ShowValue: HideValue}
                    </button>
                }
            </div>
            {description &&
                <p className={classnames(style.container__description, {
                    [style.incorrect]: incorrect
                })}>{description}</p>
            }
        </div>
    )
}

const ShowValue = (
    <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.6503 16.6751C18.7836 16.6751 18.9583 16.5896 19.0402 16.4843L19.6462 15.7045C19.7036 15.6307 19.7501 15.495 19.7501 15.4016C19.7501 15.2682 19.6645 15.0935 19.5592 15.0117L16.1477 12.3751C17.0144 11.6447 18.1376 10.2336 18.655 9.22525C18.7143 9.10802 18.7625 8.90623 18.7625 8.77487C18.7625 8.64351 18.7143 8.44172 18.655 8.32449C16.9815 5.05925 13.6685 2.85004 9.875 2.85004C8.5385 2.85166 6.50176 3.37286 5.32874 4.01343L1.40283 0.979034C1.329 0.921595 1.19315 0.874939 1.09961 0.874939C0.966229 0.874939 0.791567 0.960439 0.709717 1.06573L0.104004 1.84558C0.0466239 1.91938 0 2.05511 0 2.14859C0 2.28191 0.0854338 2.45651 0.190674 2.53836L18.347 16.571C18.4209 16.6284 18.5567 16.6751 18.6503 16.6751ZM12.677 9.69214C12.7621 9.44617 12.8341 9.03531 12.8375 8.77502L12.8378 8.73651C12.8378 7.12234 11.5276 5.81229 9.91345 5.81229C9.68264 5.81229 9.31555 5.86477 9.09399 5.92947C9.25208 6.14374 9.38075 6.53374 9.38123 6.80002C9.37741 6.88663 9.35616 7.02486 9.33374 7.10861L7.06213 5.35303C7.73627 4.78966 8.99645 4.33193 9.875 4.33127H9.87744C12.329 4.33127 14.3187 6.32099 14.3187 8.77255V8.77502C14.3187 9.34715 14.1988 9.88595 13.9972 10.3842L13.8893 10.6299L12.677 9.69214ZM9.875 14.7C10.7054 14.7 11.5065 14.5766 12.2786 14.3772L10.6774 13.1382C10.4579 13.1806 10.0985 13.2167 9.875 13.2188C7.53434 13.2188 5.63957 11.407 5.46521 9.11105L2.22803 6.60931C1.80248 7.14317 1.41083 7.70761 1.09485 8.3248C1.03557 8.44203 0.987549 8.64381 0.987549 8.77518C0.987549 8.90654 1.03557 9.10833 1.09485 9.22556C2.76833 12.4908 6.08148 14.7 9.875 14.7Z" fill="#37404D"/>
    </svg>
)

const HideValue = (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12C12.8415 12 16.1975 9.76122 17.8912 6.4559C17.9513 6.33719 17.9999 6.13284 17.9999 5.99982C17.9999 5.86679 17.9513 5.66248 17.8912 5.54376C16.1966 2.23719 12.8415 0 9 0C5.15845 0 1.80249 2.23875 0.108765 5.54407C0.0487446 5.66278 0 5.8671 0 6.00012C0 6.13315 0.0487446 6.33749 0.108765 6.45621C1.80343 9.76278 5.15845 12 9 12ZM9.0022 10.5H9C6.516 10.5 4.5 8.48397 4.5 5.99997C4.5 3.51597 6.516 1.5 9 1.5C11.484 1.5 13.5 3.51597 13.5 5.99997V6.00217C13.5 8.48495 11.485 10.5 9.0022 10.5ZM9.00708 8.98621C10.6593 8.98621 12.0001 7.64529 12.0001 5.99307C12.0001 4.34089 10.6593 3 9.00708 3H9C8.77728 3.00311 8.42297 3.05618 8.20911 3.11844C8.36969 3.33667 8.5 3.73373 8.5 4.0047C8.5 4.83011 7.83005 5.5 7.00464 5.5C6.73368 5.5 6.33664 5.36966 6.11841 5.20908C6.06071 5.42163 6.01392 5.77283 6.01392 5.99307C6.01392 7.64529 7.35486 8.98621 9.00708 8.98621Z" fill="#37404D"/>
    </svg>
)

export default CustomInput;
