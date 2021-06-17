import React, {FC, useEffect, useState} from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import ReferralList from "./ReferralList/ReferralList";
import ReferralBlock from "./ReferralBlock";
import style from './referral.module.scss'
import ReferralStructure from "./RefferalStructure/ReferralStructure";
import {Example, ResponseStructure} from "./Examples";

const Referral:FC = () => {
    return(
        <div className={style.referral}>
            <ReferralBlock/>
            <Switch>
                <Route exact path={'/list'}>
                    <ReferralList users={ResponseStructure}/>
                </Route>
                <Route exact path={'/structure'}>
                    <ReferralStructure users={ResponseStructure}/>
                </Route>
                <Route>
                    <Redirect to={'/list'}/>
                </Route>
            </Switch>
        </div>
    )
}

export default Referral;
