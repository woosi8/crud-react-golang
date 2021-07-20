import React, { useEffect, useState, Fragment } from "react";
// import AddUserForm from "./forms/AddUserForm";
import AddUserForm from "./forms/AddUserForm";
import EditUserForm from "./forms/EditUserForm";
import UserTable from "./tables/UserTable";
import axios from "axios";
// 출처: https://www.taniarascia.com/crud-app-in-react-with-hooks/
// 깃허브 : https://github.com/taniarascia/react-hooks
const App = () => {
	// Data
	// const usersData = [
	// 	{ id: 1, name: "Tania", content: "floppydiskette", age: 10 },
	// 	{ id: 2, name: "Craig", content: "siliconeidolon" },
	// 	{ id: 6, name: "Ben", content: "benisphere" },
	// 	{ id: 11, name: "de", content: "de" },
	// ];

	const initialFormState = { ID: null, name: "", content: "" };

	// Setting state
	const [users, setUsers] = useState(0);
	// const [users, setUsers] = useState(usersData);
	const [currentUser, setCurrentUser] = useState(initialFormState);
	const [editing, setEditing] = useState(false);
	// CRUD operations
	// console.log(Math.max.apply(null, usersData.id));
	// const maxValue = Math.max(users.ID);
	// const len = Math.max.apply(null, usersData.id);
	// console.log(usersData[len].id);
	// console.log(Object.keys(users)[0]);
	// console.log(users[Object.keys(users)[0]]);
	// const obj = users[Object.value(users.id)[0]];

	// var array = [
	// 	{ id: 1, name: "foo" },
	// 	{ id: 2, name: "bar" },
	// ];

	// console.log(array[0]);
	// console.log(users[64]);
	// console.log(array[0].name);
	// console.log(users[64].content);

	// console.log(users[64].name);
	// console.log(users[64].name);
	const addUser = (user) => {
		// user.id = users.length + 66;
		// user.id = users.length + 1;

		// console.log(user.slice(-1);
		setUsers([...users, user]);
		axios
			.post("/create_content/", {
				// post(`/create_content/${user.id}`, {
				// id: user.id,
				name: user.name,
				content: user.content,
			})
			//성공시 then 실행
			.then(function (response) {
				console.log(response);
			})
			//실패 시 catch 실행
			.catch(function (error) {
				console.log(error);
			});
	};

	const deleteUser = (id) => {
		setEditing(false);
		setUsers(users.filter((user) => user.id !== id));
		axios
			.delete(`/delete/${id}`, {})
			//성공시 then 실행
			.then(function (response) {
				console.log(response);
			})
			//실패 시 catch 실행
			.catch(function (error) {
				console.log(error);
			});
	};

	const updateUser = (id, updatedUser) => {
		setEditing(false);
		setUsers(users.map((user) => (user.ID === id ? updatedUser : user)));
		// craet할때 content가 없이 creat한놈은 content edit이 안된다
		console.log(updatedUser.content);
		axios
			.put(`/update/${id}/${updatedUser.name}/${updatedUser.content}`, {
				// 2. 어떻게 전달이 되는지?
				// name: updatedUser.name,
				// content: updatedUser.content,
			})
			//성공시 then 실행
			.then(function (response) {
				console.log(response);
			})
			//실패 시 catch 실행
			.catch(function (error) {
				console.log(error);
			});
	};

	const editRow = (user) => {
		setEditing(true);
		setCurrentUser({ ID: user.ID, name: user.name, content: user.content });
	};

	useEffect(() => {
		// const getUser = (id) => {

		axios
			.get("/get/")
			.then(function (response) {
				// console.log(response.data.article[1].ID);
				setUsers(response.data.article);
				// return;
			})
			.catch(function (error) {
				console.log(error);
			});
		// };
	}, [users]);

	return (
		<div className="container">
			<h1>CRUD App with Hooks</h1>
			<div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Edit user</h2>
							<EditUserForm
								editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateUser}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Add user</h2>
							<AddUserForm addUser={addUser} />
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h2>View users</h2>
					<UserTable
						users={users}
						editRow={editRow}
						deleteUser={deleteUser}
						// getUser={getUser}
					/>
				</div>
			</div>
		</div>
	);
};

export default App;
