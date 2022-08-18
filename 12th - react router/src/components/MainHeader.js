import {Link} from "react-router-dom";

const MainHeader = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        {/* This way, every link click is a new start to the app!
                        <a href="/welcome">Welcome </a>*/}
                        {/* Link component manually changes the url and prevent browser defaults */}
                        <Link to="/welcome">Welcome</Link>
                    </li>
                    <li>
                        {/*<a href="/products">products </a>*/}
                        <Link to="/products">products</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MainHeader;