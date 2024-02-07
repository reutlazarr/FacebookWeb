
import React, { useState } from 'react';

export function UserDataList() {

    const [userDataList, setUserDataList] = useState([]);

    function addUserData({ userData }) {
        setUserDataList([...userDataList, userData]);
    }
}

export default UserDataList;