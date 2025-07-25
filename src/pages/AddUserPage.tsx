import React from "react";
import {UserForm} from '../components/forms/UserForm.tsx'

const AddUserPage: React.FC = () => {
    return (
        <div>
            <h1>Add User</h1>
            <UserForm />
        </div>
    );
};

export default AddUserPage;
