import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, listUser } from "../../../actions/userActions";
import Header from "../../../components/Header/Header";
import LoadingBox from "../../../components/LoadingBox/LoadingBox";
import MessageBox from "../../../components/MessageBox/MessageBox";
import "./UserList.css";

export default function Userlist() {
  // const loading = 0,
  //   error = 0;
  // const user = {
  //   _id: "619bcc65e2589f22ac4c5375",
  //   name: "Dungvv",
  //   email: "dungvv117@gmail.com",
  //   isAdmin: true,
  //   isSeller: true,
  // };

  const userList = useSelector((state) => state.userList);
  // const { loading, users, error } = userList;
  const loading = userList.loading;
  const users = userList.users?.filter((user) => {
    return !user.isAdmin;
  });
  const error = userList.error;

  const dispatch = useDispatch();

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  useEffect(() => {
    dispatch(listUser());
  }, [dispatch, successDelete]);
  return (
    <div>
      <Header />
      <h1>Users</h1>
      <Link to="/admin">
        <h3>Back to dashboard</h3>
      </Link>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="UserList-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>NUMBER ORDERS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users?.length &&
              users?.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.numberOrder}</td>
                  <td>
                    <button
                      type="button"
                      className="UserList-button UserList-small"
                      onClick={() => {
                        handleDelete(user._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
