import React from "react";

const UserTable = (props) => (
	<table>
		<thead>
			<tr>
				<th>ID</th>
				<th>Name</th>
				<th>Content</th>
			</tr>
		</thead>
		<tbody>
			{props.users.length > 0 ? (
				props.users.map((user) => (
					<tr key={user.ID}>
						<td>{user.ID}</td>
						<td>{user.name}</td>
						<td>{user.content}</td>
						<td>
							<button
								onClick={() => {
									props.editRow(user);
								}}
								className="button muted-button"
							>
								Edit
							</button>
							<button
								onClick={() => props.deleteUser(user.ID)}
								className="button muted-button"
							>
								Delete
							</button>
							{/* <button
								onClick={() => props.getUser(user.ID)}
								className="button muted-button"
							>
								Get
							</button> */}
						</td>
					</tr>
				))
			) : (
				<tr>
					<td colSpan={3}>No users</td>
				</tr>
			)}
		</tbody>
	</table>
);

export default UserTable;
