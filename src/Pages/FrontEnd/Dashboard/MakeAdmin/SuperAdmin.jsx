import { useState, useEffect } from "react";

const features = [
  { key: "Admin", label: "Admin" },
  { key: "LandingPage", label: "LandingPage" },
  { key: "UserList", label: "UserList" },
  { key: "UserOrder", label: "UserOrder" },
  { key: "Coupon", label: "Coupon" },
  { key: "Top Sell", label: "Top Sell" },
  { key: "CompanyAccount", label: "CompanyAccount" },
  { key: "CompanySettings", label: "CompanySettings" },
  { key: "Category", label: "Category" },
  { key: "Inventory", label: "Inventory" },
  { key: "Supplier", label: "Supplier" },
  { key: "purchase", label: "purchase" },
  { key: "Notification", label: "Notification" },
  { key: "SocialMedia", label: "SocialMedia" },
];

// const actions = ["add", "edit", "delete"];
const roles = ["Moderator", "Support"];

const SuperAdmin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [permissions, setPermissions] = useState({});

  // Fetch all users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/alluser");
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle feature
 // Toggle feature
const toggleFeature = (featureKey) => {
  setPermissions((prev) => {
    const prevFeature = prev[featureKey] || { enabled: false, actions: {} };

    // If enabling, initialize all actions as false
    // const newActions = !prevFeature.enabled
    //   ? actions.reduce((acc, act) => ({ ...acc, [act]: false }), {})
    //   : {};

    return {
      ...prev,
      [featureKey]: {
        enabled: !prevFeature.enabled,
        // actions: newActions,
      },
    };
  });
};


  // Toggle action
  const toggleAction = (featureKey, actionKey) => {
  setPermissions((prev) => {
    const prevFeature = prev[featureKey] || { enabled: true, actions: {} };
    return {
      ...prev,
      [featureKey]: {
        ...prevFeature,
        actions: {
          ...prevFeature.actions,
          [actionKey]: !prevFeature.actions[actionKey],
        },
      },
    };
  });
};


  // Select user
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setPermissions(user.permissions || {});
  };

  // Save user role + permissions
  const saveUser = async () => {
    if (!selectedUser) return alert("Select a user first");
    try {
      const res = await fetch(`http://localhost:5000/api/auth/update-user/${selectedUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newpartroles: selectedUser.newpartroles,
          permissions,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("User updated!");
        fetchUsers();
      }
    } catch (err) {
      console.error(err);
      alert("Error updating user");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Super Admin – User & Feature Permissions</h2>

      {/* User table */}
      <div className="overflow-x-auto mb-5">
        <table className="table-auto w-full border border-gray-300 bg-white rounded-lg shadow-lg">
          <thead>
            <tr className=" text-black">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-200 cursor-pointer">
                <td className="border px-4 py-1">{user.displayName}</td>
                <td className="border px-4 py-1">{user.phoneNumber}</td>
                <td className="border px-4 py-1">{user.email}</td>
                <td className="border px-4 py-1">
                  <select
                    value={user.newpartroles || ""}
                    onChange={(e) => {
                      user.newpartroles = e.target.value;
                      if (selectedUser?._id === user._id) {
                        setSelectedUser({ ...user });
                      }
                    }}
                    className="border p-1 rounded"
                  >
                    <option value="">-- Select Role --</option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border px-4 ">
                  <button
                    onClick={() => handleSelectUser(user)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit Permissions
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Permissions for: {selectedUser.displayName}</h3>
          <div className="grid gap-4">
            {features.map((feature) => {
              const featureData = permissions[feature.key] || { enabled: false, actions: {} };
              return (
                <div key={feature.key} className="border p-3 rounded shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      checked={featureData.enabled}
                      onChange={() => toggleFeature(feature.key)}
                    />
                    <span className="font-semibold">{feature.label}</span>
                  </div>
                  {featureData.enabled && (
                    <div className="flex gap-4">
                      {/* {actions.map((action) => (
                        <label key={action} className="flex items-center gap-1">
                          <input
                            type="checkbox"
                            checked={!!featureData.actions[action]}
                            onChange={() => toggleAction(feature.key, action)}
                          />
                          {action.toUpperCase()}
                        </label>
                      ))} */}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button
            className="mt-4 bg-green-500 text-white px-3 py-1 rounded"
            onClick={saveUser}
          >
            Save User Permissions
          </button>
        </div>
      )}
    </div>
  );
};

export default SuperAdmin;
