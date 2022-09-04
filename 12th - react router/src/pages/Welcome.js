import {Outlet} from "react-router-dom";


const Welcome = () => {

    return (
        <section>
            <h1>Welcome page</h1>
            {/* Telling react-router where to put our nested component we define */}
            <Outlet/>

        </section>
    );
}

export default Welcome;