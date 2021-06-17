import React, {FC} from "react";

export interface ICustomInput {
    title: string,
    link?: FC,
    type: string,
    value: string | number,
    setValue: (value: any) => void,
    placeholder: string,
    description?: string,
    incorrect?: boolean,
    inputRef?: React.MutableRefObject<HTMLInputElement | any>,
    onKeyPress?: (event: React.KeyboardEvent) => void,
    disabled?: boolean
}
