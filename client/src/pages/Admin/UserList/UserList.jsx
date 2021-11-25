import React, { useEffect } from 'react';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import "./UserList.css"

export default function Userlist(){
    const loading = 0, error =0;
    const user = {
        _id: "619bcc65e2589f22ac4c5375",
        name: "Dungvv",
        email: "dungvv117@gmail.com",
        isAdmin: true,
        isSeller: true,
    }
    return (
        <div>
            <h1>Users</h1>
            {loading ? (
            <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <table className = "UserList-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>IS SELLER</th>
                            <th>IS ADMIN</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.isSeller ? "YES" : " NO"}</td>
                        <td>{user.isAdmin ? "YES" : "NO"}</td>
                        <td>
                        <button
                            type="button"
                            className="UserList-button UserList-small"
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            className="UserList-button UserList-small"
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.isSeller ? "YES" : " NO"}</td>
                        <td>{user.isAdmin ? "YES" : "NO"}</td>
                        <td>
                        <button
                            type="button"
                            className="UserList-button UserList-small"
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            className="UserList-button UserList-small"
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.isSeller ? "YES" : " NO"}</td>
                        <td>{user.isAdmin ? "YES" : "NO"}</td>
                        <td>
                        <button
                            type="button"
                            className="UserList-button UserList-small"
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            className="UserList-button UserList-small"
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.isSeller ? "YES" : " NO"}</td>
                        <td>{user.isAdmin ? "YES" : "NO"}</td>
                        <td>
                        <button
                            type="button"
                            className="UserList-button UserList-small"
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            className="UserList-button UserList-small"
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.isSeller ? "YES" : " NO"}</td>
                        <td>{user.isAdmin ? "YES" : "NO"}</td>
                        <td>
                        <button
                            type="button"
                            className="UserList-button UserList-small"
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            className="UserList-button UserList-small"
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.isSeller ? "YES" : " NO"}</td>
                        <td>{user.isAdmin ? "YES" : "NO"}</td>
                        <td>
                        <button
                            type="button"
                            className="UserList-button UserList-small"
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            className="UserList-button UserList-small"
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.isSeller ? "YES" : " NO"}</td>
                        <td>{user.isAdmin ? "YES" : "NO"}</td>
                        <td>
                        <button
                            type="button"
                            className="UserList-button UserList-small"
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            className="UserList-button UserList-small"
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.isSeller ? "YES" : " NO"}</td>
                        <td>{user.isAdmin ? "YES" : "NO"}</td>
                        <td>
                        <button
                            type="button"
                            className="UserList-button UserList-small"
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            className="UserList-button UserList-small"
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.isSeller ? "YES" : " NO"}</td>
                        <td>{user.isAdmin ? "YES" : "NO"}</td>
                        <td>
                        <button
                            type="button"
                            className="UserList-button UserList-small"
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            className="UserList-button UserList-small"
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.isSeller ? "YES" : " NO"}</td>
                        <td>{user.isAdmin ? "YES" : "NO"}</td>
                        <td>
                        <button
                            type="button"
                            className="UserList-button UserList-small"
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            className="UserList-button UserList-small"
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}
