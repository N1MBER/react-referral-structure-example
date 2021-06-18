import React, {FC, useEffect, useState} from 'react';
import style from './drop_down.module.scss';
import classNames from "classnames";

export type Node = {
    name: string,
    category: string,
    image?: string
    list?: Node[]
}


interface IReferralDropDown{
    user: Node | undefined,
    isChild: boolean,
    calcHeight?: (num: number) => void,
    close?: boolean,
    setLine?: (num: number) => void,
    depth: number
}

const ReferralDropDown:FC<IReferralDropDown> = ({user, isChild, calcHeight, close, setLine, depth}) => {
    const [data, setData] = useState({
        name: ''
    });
    const [open, setOpen] = useState(false);

    const [height, setHeight] = useState(0);
    const [lineHeight, setLineHeight] = useState(0);

    useEffect(() => {
        if (close){
            setHeight(0)
            setLineHeight(0)
            setOpen(false)
        }
    }, [close])

    useEffect(() => {
        if (user && user.name){
            let name_val = user.name.match(/[A-Z]+/g)
            if (name_val && name_val.length > 0)
                setData({...data, name: `${name_val.splice(0,2).join('')}`})
            else
                setData({...data, name: user.name[0].toUpperCase()})
        }
    }, [user])

    useEffect(() => {
        if (!close){
            if (user && user.list){
                if (open) {
                    setHeight(72 * user.list.length)
                    setLineHeight(72 * user.list.length)
                    if (calcHeight)
                        calcHeight(72 * user.list.length)
                    if (setLine)
                        setLine(72 * user.list.length)
                }
                else {
                    setHeight(0)
                    setLineHeight(0)
                    if (calcHeight)
                        calcHeight(-72 * user.list.length)
                    if (setLine)
                        setLine(-72 * user.list.length)
                }
            }
        }
    }, [open])

    return (
        <div
            className={classNames(style.dropDown,{
                [style.open]: open,
                [style.child]: isChild
            })}
        >
            <button className={style.dropDownButton} onClick={() => {
                if (depth !== 3 && user && user.list && user.list.length > 0){
                    setOpen(!open)
                }
            }}>
               <div className={style.dropDownButton__info}>
                   {user && user.image ?
                        <div className={style.dropDownButton__imageContainer}>
                            <img
                                className={style.dropDownButton__imageContainer_image}
                                src={user.image}
                                alt={'avatar'}
                            />
                        </div>:
                       <div className={style.dropDownButton__imageContainer}>
                           <p className={style.dropDownButton__imageContainer_text}>
                               {user && user.name ? data.name: '?'}
                           </p>
                       </div>
                   }
                   <p className={style.dropDownButton__text}>{user && user.name}</p>
                   <p className={style.dropDownButton__category}>{user && user.category}</p>
               </div>
                {depth !== 3 && user && user.list && user.list.length > 0 &&
                    <>
                        { open ?
                            <p className={style.dropDownButton__counter}>{`+ ${user.list.length}`}</p>:
                            MinusIcon}
                    </>
                }
            </button>
            {depth !== 3 && user && user.list && user.list.length > 0 &&
                <div
                    className={style.dropDown__list}
                    style={{height: height}}
                >
                    <div className={style.line} style={{height: lineHeight}}/>
                    {user.list.map((item, index) => {
                        return (
                            <ReferralDropDown
                                user={item}
                                key={`${item.name}${index}`}
                                isChild={true}
                                calcHeight={(val) => setHeight(height + val)}
                                setLine={(val) => {
                                    if (user.list && index !== user.list.length -1)
                                        setLineHeight(lineHeight + val)
                                }}
                                depth={depth + 1}
                                close={!open}
                            />
                        )
                    })}
                </div>
            }
        </div>
    )
}

export const MinusIcon = (
    <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.572401 0.392487L6.59489 0.392487L11.4049 0.392487C11.5611 0.397456 11.7091 0.462998 11.8178 0.575211C11.9265 0.687425 11.9873 0.8375 11.9873 0.993728C11.9873 1.14996 11.9265 1.30007 11.8178 1.41228C11.7091 1.5245 11.5611 1.59 11.4049 1.59497L6.59489 1.59497L0.572401 1.59497C0.426251 1.59 0.278157 1.5245 0.169458 1.41228C0.0607591 1.30007 -1.94522e-08 1.14996 -2.62811e-08 0.993729C-3.31101e-08 0.8375 0.060759 0.687426 0.169458 0.575212C0.278157 0.462998 0.426251 0.397457 0.572401 0.392487Z" fill="#303030"/>
    </svg>
)

export default ReferralDropDown;
