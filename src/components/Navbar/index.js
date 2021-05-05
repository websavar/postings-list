import React from "react";

import Logo from "../Logo";
import "./index.scss";

function Navbar() {
    return (
        <header>
            <a href="/">
                <Logo />
            </a>
        </header>
    );
}

export default Navbar;
