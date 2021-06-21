import React, {FC} from "react";
import Loader from "react-loader-spinner";
import style from './loader.module.scss';

const LoaderComponent:FC = () => {
    return (
        <div className={style.loader}>
            <Loader
                type={"TailSpin"}
                color="#FFDA24"
                height={150}
                width={150}
            />
        </div>
    )
}

export default LoaderComponent;
