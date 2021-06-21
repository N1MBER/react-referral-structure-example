import React, {FC, ReactNode, useEffect, useState} from "react";
import style from './dropdown.module.scss';
import classnames from 'classnames';
import {useLocation} from "react-router-dom";

interface IDropDown{
    icon?: ReactNode,
    title: string,
    list?: { text:string, link: string}[],
    titleClickAction: () => void,
    active?: boolean,
    close?:boolean,
    clickElement?: (val: any) => void,
    onOpenEvent?: (val: any, without?: boolean) => void
}

const MenuDropDown:FC<IDropDown> = ({titleClickAction,
                                          title,
                                          list,
                                          active,
                                          icon,
                                          clickElement,
                                          close,
                                          onOpenEvent}) => {
    const [isShowed, setIsShowed] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (close && isShowed) {
            setIsShowed(false);
            if (onOpenEvent && list)
                onOpenEvent(-(7 +list.length * 18 + (list.length -1) * 20), true);
        }
    }, [close])

    const clickOnTitle = () => {
        if (list && list.length > 0) {
            setIsShowed(!isShowed)
            if (onOpenEvent)
                onOpenEvent(!isShowed ? 7 +list.length * 18 + (list.length -1) * 20: -(7 +list.length * 18 + (list.length -1) * 20));
        }
        else
            titleClickAction()
    }

    return (
        <div className={style.dropDown}>
            <div
                className={style.dropDown__button}
                onClick={() => clickOnTitle()}>
                {icon}
                <p className={classnames(style.dropDown__text, {
                    [style.dropDown__text_active]: active
                })}>{title}</p>
                {list && list.length > 0 &&
                    <button
                        onClick={() => setIsShowed(!isShowed)}
                        className={classnames(style.openButton, {
                            [style.openButton_active]: isShowed
                        })}
                    >
                        {ArrowIcon}
                    </button>
                }
            </div>
            {list && list.length > 0 && clickElement &&
                <div
                    className={style.listItems}
                    style={{height: isShowed ? 7 +list.length * 18 + (list.length -1) * 20: 0 }}
                >
                    {list.map(item => {
                        return (
                            <button
                                key={item.text}
                                onClick={() => {
                                    clickElement(item.link)
                                }}
                                className={classnames(style.listItems__item, {
                                    [style.listItems__item_active]: location.pathname.includes(item.link)
                                })}>
                                {item.text}
                            </button>
                        )
                    })}
                </div>
            }

        </div>
    )
}

const ArrowIcon = (
    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.36534 6.80076L11.3497 1.73906C11.5516 1.5371 11.5516 1.21055 11.3497 1.00859L11.0446 0.703534C10.8427 0.501615 10.5161 0.501615 10.3142 0.703534L6.0001 5.09489L1.68602 0.6992C1.4841 0.497239 1.15751 0.497239 0.955548 0.6992L0.650494 1.00431C0.448533 1.20628 0.448533 1.53286 0.650494 1.73478L5.63487 6.79649C5.83683 6.99841 6.16338 6.9984 6.36534 6.80076Z" fill="white"/>
    </svg>
)

export default MenuDropDown;
