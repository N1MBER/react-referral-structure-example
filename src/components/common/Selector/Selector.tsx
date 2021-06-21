import React, {FC, useEffect, useState} from 'react';
import style from './selector.module.scss';
import classnames from 'classnames';

interface ICustomSelector {
    title?: string,
    defaultValue?: string,
    list: string[],
    onChooseElement: (value: string) => void
}

const Selector:FC<ICustomSelector> = ({title, list, defaultValue, onChooseElement}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | undefined>();

    const selectElement = (element: string) => {
        setIsOpen(false);
        onChooseElement(element);
        setSelectedValue(element);
    }

    useEffect(() => {
        if (defaultValue){
            setSelectedValue(defaultValue);
        }
    }, [defaultValue])

    return (
        <div className={style.container}>
            {title &&
                <div className={style.title}>
                    <p className={style.title__text}>{title}</p>
                </div>
            }
            <div className={classnames(style.select, {
                [style.select_open]: isOpen
            })}>
                <button
                    className={style.select__button}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <p className={style.select__text}>
                        {selectedValue}
                    </p>
                    {Arrow}
                </button>
                <div
                    className={style.list}
                    style={{height: isOpen ? list.length * 40 + 30: 0}}
                >
                    {list.map(item => {
                        return (
                            <button
                                className={style.list__element}
                                onClick={() => selectElement(item)}
                            >
                                {item}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

const Arrow = (
    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.36534 6.80076L11.3497 1.73906C11.5516 1.5371 11.5516 1.21055 11.3497 1.00859L11.0446 0.703534C10.8427 0.501615 10.5161 0.501615 10.3142 0.703534L6.0001 5.09489L1.68602 0.6992C1.4841 0.497239 1.15751 0.497239 0.955548 0.6992L0.650494 1.00431C0.448533 1.20628 0.448533 1.53286 0.650494 1.73478L5.63487 6.79649C5.83683 6.99841 6.16338 6.9984 6.36534 6.80076Z" fill="#50525C"/>
    </svg>
)

export default Selector
