import {Fragment} from "react";

import MainNavigation from "./MainNavigation";

import c from './Layout.module.css'

const Layout = (props) => {

    return (
        <Fragment>
            <MainNavigation/>
            <main className={c.main}>
                {props.children}
            </main>
        </Fragment>
    )
}
export default Layout;