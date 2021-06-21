import React, {FC, useEffect, useState} from "react";
import ReferralCard from "./ReferralCard";
import style from './referral_list.module.scss';
import style_filter from '../../common/FilterButtons/filter_button.module.scss';
import useResolution from "../../../hooks/useResolution";
import Loader from "react-loader-spinner";
import FilterButton from "../../common/FilterButtons/FilterButton";
import {ResponseUser} from "../RefferalTree/ReferralTree";

type UserRef = {
    name: string,
    date: Date,
    rate: number,
    qualification: string
}

interface IReferralList {
    users: ResponseUser[]
}

const ReferralList:FC<IReferralList> = ({users}) => {
    const [sortType, setSortType] = useState({
        type: '',
        isTop: true
    });
    const [list, setList] = useState<UserRef[]>([]);
    const [loaded, setLoaded] = useState(false);


    const setFilter = (type: string) => {
        setSortType({
            type: type,
            isTop: sortType.type === type ? !sortType.isTop : true
        })
    }

    useEffect(() => {
        getFilteredData()
    }, [JSON.stringify(sortType)])

    const getFilteredData = () => {
        let arr = [...list];
        arr = arr.sort((a,b) => {
            return sortByType(sortType.type, a,b);
        })
        setList(arr)
    }

    const sortByType = (type: string,val1: UserRef, val2:UserRef) => {
        // @ts-ignore
        if (val1[type] < val2[type])
            return sortType.isTop ? -1: 1
        else
            return sortType.isTop ? 1: -1
    }

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true);
            let arr = [...users].map(item => {
                return convertDataToListUsers(item);
            })
            setList(arr)
        }, 400)
    }, [])

    const is1000 = useResolution(1000);


    const convertDataToListUsers = (item: {[key: string]: any}): UserRef => {
        let obj:UserRef = {
            name: '',
            qualification: '',
            rate: 0,
            date: new Date()
        }
        obj.date = item['CREATE'] ?
            new Date(Number(item['CREATE']) / 1000000):
            new Date();
        obj.name = item['LOGIN'];
        obj.rate = 0;
        obj.qualification = item['CATEGORY'] === '' ? '-' : item['CATEGORY'];
        return obj;
    }

    return (
        <div className={style.referralList}>
            <div className={style.referralList__filter}>
                <FilterButton
                    setFilter={() => setFilter('name')}
                    isTop={sortType.type === 'name' ? sortType.isTop: undefined}
                    name={!is1000 ? 'Имя аккаунта': 'Имя'}
                />
                <FilterButton
                    setFilter={() => setFilter('date')}
                    isTop={sortType.type === 'date' ? sortType.isTop: undefined}
                    name={'Дата создания'}
                />
                <FilterButton
                    setFilter={() => setFilter('rate')}
                    isTop={sortType.type === 'rate' ? sortType.isTop: undefined}
                    name={'Рэйтинг'}
                />
                <FilterButton
                    setFilter={() => setFilter('qualification')}
                    isTop={sortType.type === 'qualification' ? sortType.isTop: undefined}
                    name={!is1000? 'Квалификация': 'Квал.'}
                />
                <p className={style_filter.filterButton__text}>Написать</p>
            </div>
            <div className={style.referralList__content}>
                {loaded ?
                    list.map(item =>
                        <ReferralCard {...item}/>
                    ):
                    <Loader
                        type="TailSpin"
                        color="#FFDA24"
                        height={150}
                        width={150}
                    />
                }
            </div>
        </div>
    )
}


export default ReferralList;
