import React, {FC, useEffect, useState} from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import ReferralList from "./ReferralList/ReferralList";
import ReferralTitleBlock from "./ReferralTitleBlock";
import style from './referral.module.scss'
import ReferralTree from "./RefferalTree/ReferralTree";
import {Example, ResponseStructure} from "../../utils/Examples";

const Referral:FC = () => {
    return(
        <div className={style.referral}>
            <ReferralTitleBlock/>
            <Switch>
                <Route exact path={'/list'}>
                    <ReferralList users={ResponseStructure}/>
                </Route>
                <Route exact path={'/structure'}>
                    <ReferralTree users={ResponseStructure}/>
                </Route>
                <Route>
                    <Redirect to={'/list'}/>
                </Route>
            </Switch>
        </div>
    )
}

export default Referral;
