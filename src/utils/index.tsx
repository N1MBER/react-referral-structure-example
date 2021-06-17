import React, {ReactElement, ReactNode} from "react";
const FileSaver = require('file-saver');

export const zeroFill = ( number:number, width:number ) => {
    let str = number.toString();
    for(let i = str.length; i < width; i++)
        str = '0' + str;
    return str
}

export const numberWithCommas = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export const convertDate = (date: Date):string => {
    return `${zeroFill(date.getUTCDate(), 2)}.${zeroFill(date.getUTCMonth() + 1, 2)}.${zeroFill(date.getUTCFullYear(), 2)} 
    ${zeroFill(date.getUTCHours(), 2)}:${zeroFill(date.getUTCMinutes(), 2)}:${zeroFill(date.getUTCMilliseconds(), 2)} UTC`
}


export const urltoFile = (url: string, filename: string, mimeType:string) => {
    return (fetch(url)
            .then(function(res){return res.arrayBuffer();})
            .then(function(buf){return new File([buf], filename,{type:mimeType});})
    );
}

export  const dataURLtoFile = (dataurl: string, filename: string) => {
    //@ts-ignore
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}


export const toBase64 = (file: File | undefined) => new Promise((resolve, reject) => {
    if (file){
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    } else
        resolve('');
});
