import { Outlet } from "react-router-dom";


const Main = () => {
    return (
        <div className="min-h-[100dvh] flex flex-col">
            <h2>Hello World</h2>
            <Outlet />
        </div>
    );
};

export default Main;