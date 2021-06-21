import React, {FC} from "react";
import style from './checkbox.module.scss';
import classnames from 'classnames'

interface ICheckbox {
    flag: boolean,
    changeFlag: (value: boolean) => void,
    label?: string,
    incorrect?: boolean
}

const Checkbox:FC<ICheckbox> = ({flag, label, changeFlag,incorrect}) => {
    return (
        <button
            onClick={() => changeFlag(!flag)}
            className={style.checkbox}
        >
            <div
                className={style.container}
            >
               <div className={classnames(style.container__flag,{
                   [style.container__flag_checked]: flag,
               })}>
                   <div className={style.flag}>
                       {TrueFlag}
                   </div>
                   <div className={style.flag}/>
               </div>
            </div>
            {label &&
                <p
                    className={classnames(style.checkbox__text, {
                        [style.checkbox__text_red]: incorrect
                    })}
                >
                    {label}
                </p>
            }
        </button>
    )
}

const TrueFlag = (
    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.92426 8.79859L11.8242 1.89857C12.0585 1.66424 12.0585 1.2843 11.8242 1.05L10.9757 0.201486C10.7414 -0.0328197 10.3615 -0.0328197 10.1272 0.201486L4.50001 5.82868L1.87281 3.20149C1.63851 2.96716 1.25855 2.96716 1.02424 3.20149L0.175729 4.05C-0.0585765 4.28433 -0.0585765 4.66426 0.175729 4.89857L4.07575 8.79853C4.31004 9.03286 4.68994 9.0329 4.92426 8.79859Z" fill="white"/>
    </svg>
)

export default Checkbox;
