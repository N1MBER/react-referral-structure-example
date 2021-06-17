import {ReactNode} from "react";

export interface IDropDown{
    icon?: ReactNode,
    title: string,
    list?: { text:string, link: string}[],
    titleClickAction: () => void,
    active?: boolean,
    close?:boolean,
    clickElement?: (val: any) => void,
    onOpenEvent?: (val: any, without?: boolean) => void
}
