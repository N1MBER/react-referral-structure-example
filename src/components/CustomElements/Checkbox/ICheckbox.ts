export interface ICheckbox {
    flag: boolean,
    changeFlag: (value: boolean) => void,
    label?: string,
    incorrect?: boolean
}
