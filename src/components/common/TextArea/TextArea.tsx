import React, {FC} from "react";
import style from "./textarea.module.scss";
import classnames from "classnames";

interface ICustomTextArea {
    title: string,
    value: string | number,
    setValue: (value: any) => void,
    placeholder?: string,
    description?: string,
    incorrect?: boolean,
    inputRef?: React.MutableRefObject<HTMLInputElement | any>,
    onKeyPress?: (event: React.KeyboardEvent) => void
}

const TextArea:FC<ICustomTextArea> = ({
                                                title,
                                                value,
                                                setValue,
                                                description,
                                                incorrect,
                                                inputRef,
                                                onKeyPress,
                                                placeholder
                                            }) => {
    return (
        <div className={style.container}>
            <div className={style.title}>
                <p className={style.title__text}>{title}</p>
            </div>
            <div className={style.container__content}>
                <textarea
                    className={classnames(style.input, {
                        [style.input_incorrect]: incorrect
                    })}
                    ref={inputRef}
                    value={value}
                    onKeyPress={event => {
                        if (onKeyPress)
                            onKeyPress(event)
                    }}
                    onChange={e => setValue(e.target.value)}
                    placeholder={placeholder}
                />
            </div>
            {description &&
            <p className={classnames(style.container__description, {
                [style.container__description_red]: incorrect
            })}>{description}</p>
            }
        </div>
    )
}

export default TextArea;
