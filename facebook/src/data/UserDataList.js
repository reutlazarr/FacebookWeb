import { useState } from 'react';

function UserDataList() {
    const [userDataList, setUserDataList] = useState([]);

    const addUserData = (userData) => {
        setUserDataList([...userDataList, userData]);
    };

    return { userDataList, addUserData };
}

export default UserDataList;