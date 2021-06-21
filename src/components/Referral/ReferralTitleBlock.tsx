import React, {FC, useEffect, useRef, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import classNames from "classnames";
import style from './referral.module.scss';
import useResolution from "../../hooks/useResolution";

const ReferralTitleBlock:FC = () => {
    const [activePage, setActivePage] = useState(1);
    const [viewMessage, setViewMessage] = useState(false);
    const [refText, setRefText] = useState('');

    const isMobile = useResolution(800);
    const location = useLocation();
    const history = useHistory();


    const getPages = () => {
        return [
            {
                text: 'Список прямых рефералов',
                link: '/list'
            },
            {
                text: 'Моя структура',
                link: '/structure'
            }
        ]
    }


    const copyLink = () => {
        const textField = document.createElement('textarea')
        textField.innerText = refText
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
        setViewMessage(true)
        setTimeout(() => {
            setViewMessage(false)
        }, 2000)
    }

    useEffect(() => {
        const arr = location.pathname.split('/')
        switch (arr[1]){
            default:
            case 'list':
                setActivePage(1);
                break;
            case 'structure':
                setActivePage(2);
                break;
        }
    }, [location.pathname])

    return (
        <div className={style.referralTitle}>
            <div className={style.referralTitle__links}>
                {getPages().map((page, index) =>
                    <button
                        className={classNames(style.link, {
                            [style.link_active]: activePage === index + 1
                        })}
                        onClick={() => history.push(page.link)}
                    >
                        {page.text}
                    </button>
                )}
            </div>
            <button
                onClick={() => copyLink()}
                className={classNames(style.button, {
                    [style.button_with_message]: viewMessage
                })}
            >
                {ReferralIcon}
                <p className={style.button_text_blue}>Копировать Реферальную ссылку</p>
            </button>
        </div>
    )
}

const ReferralIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.6389 0H5.44664C4.14866 0 3.09272 1.05911 3.09272 2.361V3.092H2.35392C1.05593 3.092 0 4.15111 0 5.45372V17.639C0 18.9409 1.05593 20 2.35392 20H14.5466C15.8487 20 16.9079 18.9409 16.9079 17.639V16.908H17.6389C18.9411 16.908 20.0007 15.8489 20.0007 14.5463V2.36093C20.0006 1.05911 18.9411 0 17.6389 0ZM15.4628 17.6389C15.4628 18.1441 15.0518 18.5548 14.5466 18.5548H2.35392C1.8529 18.5548 1.4451 18.1441 1.4451 17.6389V5.45365C1.4451 4.94845 1.85298 4.53703 2.35392 4.53703H3.81527H14.5466C15.0518 4.53703 15.4628 4.94837 15.4628 5.45365V16.1853V17.6389ZM18.5555 14.5462C18.5555 15.0514 18.1445 15.4628 17.6389 15.4628H16.9079V5.45365C16.9079 4.15111 15.8487 3.09193 14.5465 3.09193H4.53775V2.36093C4.53775 1.85572 4.94563 1.44502 5.44657 1.44502H17.6389C18.1444 1.44502 18.5555 1.85572 18.5555 2.36093V14.5462Z" fill="#2E76CB"/>
    </svg>
)

export default ReferralTitleBlock;
