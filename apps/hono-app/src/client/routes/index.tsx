import { createFileRoute } from "@tanstack/react-router";
import { apiClient, useRpcMutation, useRpcQuery } from "../modules/api";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [email, setEmail] = useState("");
  const { data: users, refetch: refetchUsers } = useRpcQuery({
    call: apiClient.api.users.$get,
    args: {},
  });

  const {
    data,
    mutate: createUser,
    error,
  } = useRpcMutation({
    call: apiClient.api.users.$post,
    args: () => ({
      json: {
        name: "John Doe",
        age: 20,
        email,
      },
    }),
    onSuccess: () => {
      refetchUsers();
    },
  });

  return (
    <div className="p-2">
      <h3>Click button below!</h3>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="button" onClick={() => createUser()}>
        Click me to create a user
      </button>
      <h4>User list</h4>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      {error && <p>{error.message}</p>}
    </div>
  );
}
