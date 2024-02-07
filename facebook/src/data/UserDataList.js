
import { useState } from 'react';

export function UserDataList() {

    const [userDataList, setUserDataList] = useState([]);

    const addUserData = (userData) => {
        setUserDataList([...userDataList, userData]);
    }

    return {
        addUserData
    };
}

export default UserDataList;