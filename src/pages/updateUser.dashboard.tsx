import React from "react";

import Sidebar from "../components/dashboard/sidebar.component";
import NavBar from "../components/dashboard/navbar.component";
import UpdatedUser from "../components/updateUser.component";

const UpdateUserDashboard: React.FC = () => {
    return (
        <div>
            <Sidebar />
            <div className="content">
                <NavBar />
                <UpdatedUser />
            </div>
        </div>
    );
}

export default UpdateUserDashboard;