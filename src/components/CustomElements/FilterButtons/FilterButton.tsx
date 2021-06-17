import React, {FC} from "react";
import style from './filter_button.module.scss';
import classNames from "classnames";

interface IFilterButton {
    setFilter: () => void,
    isTop: boolean | undefined,
    name: string
}

const FilterButton:FC<IFilterButton> = ({setFilter, isTop, name}) => {
    return (
        <button
            className={style.filterButton}
            onClick={() => setFilter()}
        >
            <p className={style.filterButton__text}>{name}</p>
            <div className={classNames(style.filterButton__container, {
                [style.top]: isTop && typeof isTop !== "undefined",
                [style.bottom]: !isTop && typeof isTop !== "undefined"
            })}>
                {PolygonTop}
                {PolygonBottom}
            </div>
        </button>
    )
}

const PolygonBottom = (
    <svg width="7" height="5" viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.5 5L0.468911 0.5L6.53109 0.5L3.5 5Z" fill="#94A0AC"/>
    </svg>
)

const PolygonTop = (
    <svg width="7" height="5" viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.5 0L6.53109 4.5H0.468911L3.5 0Z" fill="#94A0AC"/>
    </svg>
)

export default FilterButton;
