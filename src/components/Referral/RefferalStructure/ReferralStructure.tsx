import React, {FC, useEffect, useState} from "react";
import style from "./referral_structure.module.scss";
import useResolution from "../../../hooks/useResolution";
import ReferralDropDown from "./DropDown/ReferralDropDown";
import ReferralDesktop from "./ReferralDesktop/ReferralDesktop";
import Loader from "react-loader-spinner";
import {ResponseStructure} from "../Examples";

interface IReferral{
    users: ResponseUser[]
}

export type Node = {
    name: string,
    category: string,
    image?: string,
    id?: number
    parent?: string,
    list?: Node[]
}

export type ResponseUser = {
    LOGIN?: string,
    PARENT?: string,
    PERSONAL?: string,
    CATEGORY?: string
}

const User = {
    login: 'n1mber',
    category: 'A',
}

const ReferralStructure:FC<IReferral> = ({users}) => {
    const isMobile = useResolution(1000);
    const [treeUsers, setTreeUsers] = useState<Node>();
    const [visibleTree, setVisibleTree] = useState<Node>();
    const [loaded, setLoaded] = useState(false);
    const [historyTree, setHistoryTree] = useState<Node[]>([]);

    useEffect(() => {
        setTimeout(() =>{
            setLoaded(true)
            let tree = convertResponseToTreeStructure(users);
            setVisibleTree(tree);
            setTreeUsers(tree)
        }, 400);
    },[])

    const clickOnNode = (item: Node) => {
        if (visibleTree){
            setHistoryTree([...historyTree, visibleTree]);
            setVisibleTree(item);
        }
    }

    const goBack = () => {
        if (historyTree.length > 0) {
            let arr = [...historyTree];
            let element = arr.pop();
            setVisibleTree(element)
            setHistoryTree(arr);
        }
    }

    const goToBegin = () => {
        setVisibleTree(treeUsers);
    }


    const convertResponseToTreeStructure = (response: ResponseUser[]): Node | undefined => {
        let nameGroup = {} as {[key: string]: Node}
        response.forEach((item, index) => {
            if (item.LOGIN){
                let obj = {
                    name: item.LOGIN ? item.LOGIN: '???',
                    category: '-',
                    id: index + 1,
                    list: [] as Node[],
                } as Node
                if (item.PARENT)
                    obj.parent = item.PARENT
                nameGroup[item.LOGIN] = obj;
            }
        })
        nameGroup[User.login] = {
            name: User.login,
            category: User.category,
            id: 0,
            list: []
        }
        Object.keys(nameGroup).forEach(key => {
            //@ts-ignore
            nameGroup = setTree(nameGroup, User.login);
        })
        let tree = nameGroup[Object.keys(nameGroup)[0]];
        return tree;
    }

    const setTree = (obj: {[key: string]: Node}, root: string): {[key: string]: Node} => {
        if (Object.keys(obj).length > 1){
            let element: Node | undefined;
            for (let i = 0; i < Object.keys(obj).length; i++){
                if (Object.keys(obj)[i] !== root){
                    element = obj[Object.keys(obj)[i]] as Node;
                }
            }
            if (element ){
                Object.keys(obj).forEach(key => {
                    if (!obj[key].list)
                        obj[key].list = []
                    if (element?.parent === obj[key].name) {
                        // @ts-ignore
                        obj[key].list.push(element);
                    } else {
                        //@ts-ignore
                        obj[key].list = checkAndSetNode(obj[key].list, element);
                    }
                })
                delete obj[element.name];
            }
        }
        return obj;
    }

    const checkAndSetNode = (list: Node[], element:Node) => {
        let flag = false;
        let arr = list.map(item => {
            if (item.name === element.parent){
                flag = true;
                if (!item.list)
                    item.list = [];
                item.list.push(element);
            }
            return item;
        })
        if(!flag) {
            arr = list.map(item => {
                if (item.list)
                    item.list = checkAndSetNode(item.list, element);
                return item;
            })
        }
        return arr;
    }

    return (
        <div className={style.referral}>
            <div className={style.buttons}>
                <div className={style.buttons__container}>
                    <button
                        onClick={() => goBack()}
                        className={style.pageButton}
                    >
                        Назад
                    </button>
                    <button
                        onClick={() => goToBegin()}
                        className={style.pageButton}
                    >
                        В начало
                    </button>
                </div>
            </div>
            <div className={style.content}>
                {loaded ?
                    visibleTree &&
                    <>
                        {isMobile ?
                            <ReferralDropDown user={visibleTree} isChild={false}/>:
                            <ReferralDesktop clickOnElement={clickOnNode} user={visibleTree}/>
                        }
                    </>:
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


export default ReferralStructure
