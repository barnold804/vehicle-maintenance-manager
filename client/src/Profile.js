import React from "react";

function Profile({ user, vehicles }) {
    return (
        <div key={user.id} id="u-row">
            <div>User Name: {user.name}</div>
            <div>Email: {user.email_address}</div>
        </div>
    )
}

export default Profile;
