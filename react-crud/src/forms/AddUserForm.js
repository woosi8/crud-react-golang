import React, { useState } from "react";

const AddUserForm = (props) => {
	const initialFormState = { ID: null, name: "", content: "" };
	const [user, setUser] = useState(initialFormState);

	const handleInputChange = (event) => {
		const { name, value } = event.target;

		setUser({ ...user, [name]: value });
	};

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				if (!user.name || !user.content) return;

				props.addUser(user);
				setUser(initialFormState);
			}}
		>
			<label>Name</label>
			<input
				type="text"
				name="name"
				value={user.name}
				onChange={handleInputChange}
			/>
			<label>content</label>
			<input
				type="text"
				name="content"
				value={user.content}
				onChange={handleInputChange}
			/>
			<button>Add new user</button>
		</form>
	);
};

export default AddUserForm;
