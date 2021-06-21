import React, {FC, useEffect, useState} from "react";
import style from "./referral_tree.module.scss";
import useResolution from "../../../hooks/useResolution";
import ReferralTreeMobile from "./ReferralTreeMobile/ReferralTreeMobile";
import ReferralTreeDesktop from "./ReferralTreeDesktop/ReferralTreeDesktop";
import Loader from "react-loader-spinner";
import {ResponseStructure} from "../../../utils/Examples";

interface IReferral{
    users: ResponseUser[]
}

export type Node = {
    name: string,
    category: string,
    image?: string,
    id?: number
    parent?: string,
    parentId?: number,
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

type NodeElement = {
    id: number,
    children: number[]
}

const ReferralTree:FC<IReferral> = ({users}) => {
    const isMobile = useResolution(1000);
    const [treeUsers, setTreeUsers] = useState<Node>();
    const [nodesArray, setNodesArray] = useState<NodeElement[]>([]);
    const [usersArray, setUsersArray] = useState<Node[]>([]);
    const [visibleTree, setVisibleTree] = useState<Node>();
    const [loaded, setLoaded] = useState(false);
    const [rootId, setRootId] = useState(0);
    const [currentId, setCurrentId] = useState(0);
    const [historyIds, setHistoryIds] = useState<number[]>([]);
    const [historyTree, setHistoryTree] = useState<Node[]>([]);

    useEffect(() => {
        setTimeout(() =>{
            setLoaded(true)
            // let tree = convertResponseToTreeStructure(users);
            setArrayTreeStructure(users);
            // setVisibleTree(tree);
            // setTreeUsers(tree)
        }, 400);
    },[])

    const clickOnNode = (item: Node) => {
        if (visibleTree){
            setHistoryTree([...historyTree, visibleTree]);
            setVisibleTree(item);
        }
    }

    const setNewNode = (id: number) => {
        setHistoryIds([...historyIds, currentId]);
        setCurrentId(id);
    }


    const goBack = () => {
        if (historyIds.length > 0) {
            // let arr = [...historyTree];
            let arr = [...historyIds];
            let id = arr.pop();
            setHistoryIds(arr);
            if (typeof id === "number")
            setCurrentId(id);
            // let element = arr.pop();
            // setVisibleTree(element)
            // setHistoryTree(arr);
        }
    }

    const goToBegin = () => {
        // setVisibleTree(treeUsers);
        setCurrentId(rootId)
        setHistoryIds([])
    }


    //  ============================================================
    //  Создаем массивы элементов в виде
    //  {
    //      id: 1, идентификатор узла
    //      children: [] , лист идентификаторов детей
    //  },
    //  а также массив объектов юзеров
    //  ============================================================
    const setArrayTreeStructure = (response: ResponseUser[]) => {
        let nodeArray = [] as NodeElement[];
        let userArray = [] as Node[];
        let arr = [...response];
        arr.push({
            LOGIN: User.login,
            CATEGORY: User.category,
        })
        arr.forEach((item, index) => {
            if (item.LOGIN){
                let obj = {
                    name: item.LOGIN ? item.LOGIN: '???',
                    category: item.CATEGORY,
                    id: index,
                    list: [] as Node[],
                } as Node;
                if (item.LOGIN === User.login) {
                    setRootId(index)
                    setCurrentId(index)
                }
                if (item.PARENT) {
                    let parent = arr.find(el => el.LOGIN === item.PARENT);
                    if (parent)
                        obj.parentId = arr.indexOf(parent);
                    obj.parent = item.PARENT;
                }
                userArray.push(obj);
                nodeArray.push({
                    id: index,
                    children: []
                })
            }
        })
        userArray.forEach(item => {
            if (typeof item.parentId === "number"){
                let element = [...nodeArray][item.parentId];
                if (item.id != null) {
                    element?.children.push(item.id);
                }
            }
        })
        setNodesArray(nodeArray);
        setUsersArray(userArray);
    }

    //  ============================================================
    //  Получаем необходимую структуру дерева по идентификатору узла
    //  ============================================================
    const getStructureByID = (id: number): Node => {
        let root = nodesArray[id];
        let rootParent = [...usersArray][id];
        root?.children.forEach(node_id => {
            let node = nodesArray[node_id];
            let nodeElement = [...usersArray][node_id];
            if (node){
                node.children.forEach(child_id => {
                    if (nodeElement && !nodeElement.list?.find(el => el.id === child_id)){
                        nodeElement?.list?.push([...usersArray][child_id]);
                    }
                })
                if (!rootParent?.list?.find(el => el.id === nodeElement.id))
                    rootParent?.list?.push(nodeElement)
            }
        })
        return rootParent;
    }


    const convertResponseToTreeStructure = (response: ResponseUser[]): Node | undefined => {
        let nameGroup = {} as {[key: string]: Node}
        response.forEach((item, index) => {
            if (item.LOGIN){
                let obj = {
                    name: item.LOGIN ? item.LOGIN: '???',
                    category: item.CATEGORY,
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
        <div className={style.container}>
            <div className={style.container__buttons}>
                <div className={style.depthNavigation}>
                    <button
                        onClick={() => goBack()}
                        className={style.depthNavigation__button}
                    >
                        Назад
                    </button>
                    <button
                        onClick={() => goToBegin()}
                        className={style.depthNavigation__button}
                    >
                        В начало
                    </button>
                </div>
            </div>
            <div className={style.container__content}>
                {loaded ? (nodesArray && usersArray) &&
                    <>
                        {isMobile ?
                            <ReferralTreeMobile
                                user={getStructureByID(currentId)}
                                depth={1}
                                isChild={false}
                            />:
                            <ReferralTreeDesktop
                                clickOnElement={setNewNode}
                                user={getStructureByID(currentId)}
                            />
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


export default ReferralTree
