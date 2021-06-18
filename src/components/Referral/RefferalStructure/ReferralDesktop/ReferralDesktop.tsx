import React, {FC, useEffect, useState, useRef, useLayoutEffect} from "react";
import {Node} from "../ReferralStructure";
import classnames from 'classnames';
import style from './referral_desktop.module.scss';

interface IReferralDesktop{
    user: Node | undefined,
    clickOnElement: (item: Node) => void
}

const ReferralDesktop:FC<IReferralDesktop> = ({user, clickOnElement}) => {
    const [widthLine, setWidthLine] = useState(0);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const parent = useRef(null);
    const nodeLeft = useRef(null);
    const nodeRight = useRef(null);

    const handleResize = () => {
        if (parent && parent.current &&
            nodeRight && nodeRight.current &&
            nodeLeft && nodeLeft.current) {
            // @ts-ignore
            let width = parent.current.getBoundingClientRect().left - nodeLeft.current.getBoundingClientRect().left;
            setWidthLine(width - 57)
        }
    }

    useEffect(() => {
        handleResize()
    }, [JSON.stringify(user)])

    const getRef = (index: number) => {
        if (user && user.list ){
            if (user.list.length == 2) {
                if (index == 0) return nodeLeft;
                else return nodeRight;
            } else if (user.list.length === 3 && index % 2 === 0) {
                if (index === 0) return nodeLeft;
                else if (index === 2) return nodeRight;
            }
        }
    }

    return (
        <div className={style.referralDesktop}>
            {user &&
                <>
                    <ReferralNode _ref={parent} user={user} depth={1}/>
                    <div className={style.referralDesktop__list}>
                        {user.list && user.list.length > 0 && user.list.map((item, index) => {
                            return (
                                <div className={classnames(style.node, {
                                    [style.center]: (user.list && user.list.length === 1) ||
                                    (user.list && user.list.length === 3 && index === 1)
                                })}>
                                    {user.list && (
                                        (user.list.length == 2) ||
                                        (user.list.length === 3 && index % 2 === 0)
                                    ) &&
                                    <>
                                        <div className={classnames(style.lines, {
                                            [style.left]: getRef(index) === nodeLeft,
                                            [style.right]: getRef(index) === nodeRight
                                        })}>
                                            <div style={{width: widthLine}} className={style.lines__top}/>
                                            <div style={{width: widthLine}} className={style.lines__bottom}/>
                                        </div>
                                    </>
                                    }
                                    <ReferralNode
                                        _ref={getRef(index)}
                                        user={item}
                                        depth={2}
                                        clickOnElement={clickOnElement}
                                    />
                                    <div className={style.node__list}>
                                        {item.list && item.list.length > 0 && item.list.map(el => {
                                            return (
                                                <ReferralNode
                                                    user={el}
                                                    depth={3}
                                                    clickOnElement={clickOnElement}
                                                />
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </>
            }
        </div>
    )
}

interface IReferralNode{
    user: Node,
    depth: number,
    _ref?: React.MutableRefObject<any>,
    clickOnElement?: (item: Node) => void
}

const ReferralNode:FC<IReferralNode> = ({user, depth, _ref, clickOnElement})=> {
    const [data, setData] = useState({
        name: ''
    });

    useEffect(() => {
        if (user && user.name){
            let name_val = user.name.match(/[A-Z]+/g)
            if (name_val && name_val.length > 0)
                setData({...data, name: `${name_val.splice(0,2).join('')}`})
            else
                setData({...data, name: `${user.name.split('').splice(0,2).join('')}`})
        }
    }, [user])

    const clickOnNode = () => {
        if (clickOnElement)
            clickOnElement(user)
    }


    return (
        <div
            ref={_ref}
            className={classnames(style.referralNode, {
                [style[`depth${depth}`]]: true
            })}
            onClick={() => clickOnNode()}
        >
            <div className={style.imageContainer}>
                {user.image ?
                    <img
                        className={style.imageContainer__image}
                        alt={'avatar'}
                        src={user.image}
                    />:
                   <div className={style.imageContainer__container}>
                       <p className={style.imageContainer__text}>{data.name}</p>
                   </div>
                }
            </div>
            <div className={style.info}>
                <p className={style.info__black}>{user.name}</p>
                <p className={style.info__yellow}>{user.category}</p>
            </div>
        </div>
    )
}


export default ReferralDesktop;
