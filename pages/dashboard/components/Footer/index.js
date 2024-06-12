"use client";
import { useEffect, useState } from "react";
import classNames from "classnames";
import {
  PencilSquareIcon,
  BookmarkSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export default function Footer() {
  const [data, setData] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [newUserData, setNewUserData] = useState({});
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3030/users/")
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => b.id - a.id);
        setData(sortedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleEdit = (user) => {
    setIsEditing(true);
    setIsCreating(false);
    setEditedData(user);
  };

  const handleUpdateUser = () => {
    fetch(`http://localhost:3030/update-user/${editedData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData),
    })
      .then((updatedUser) => {
        if (updatedUser.error) {
          console.error("Error updating data:", updatedUser.error);
        } else {
          setData((prevData) =>
            prevData.map((user) =>
              user.id === updatedUser.id ? updatedUser : user
            )
          );
          // Show alert message
          setIsEditing(false);
          alert("User data edited successfully");
          // window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        // Show error message
        alert("Error updating data. Please try again later.");
        // setIsEditing(false);
        //  alert('User data edited successfully');
      });
  };

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    if (name && value) {
      setEditedData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleDeleteUser = (id) => {
    fetch(`http://localhost:3030/delete-user/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
        // Remove the deleted user from the data
        setData((prevData) => prevData.filter((user) => user.id !== id));
        alert("User deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again later.");
      });
  };

  const handleCreateUser = () => {
    setIsEditing(false);
    setIsCreating(true);
    // setNewUserData({});
  };

  const handleCreate = (e) => {
    const { name, value } = e.target;
    if (name && value) {
      setNewUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleSubmitNewUser = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3030/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((createdUser) => {
        // Handle success
        console.log("New user created:", createdUser);
        setIsEditing(false);
        setIsCreating(false);
        setNewUserData({});

        alert("User created successfully");
        // Refresh data or update UI as needed
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        // Show error message to user
        alert("Error creating user. Please try again later.");
      });
    console.log("New User Data:", newUserData);
  };

  return (
    <main>
      {isCreating && (
        <div>
          <h2 className="text-indigo-600 font-bold">Create New User</h2>
          <form onSubmit={handleSubmitNewUser}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent email address where you can receive mails.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="phone_number"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone Number:
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        name="phone_number"
                        id="phone_number"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={newUserData.phone_number || ""}
                        onChange={handleCreate}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email:
                    </label>
                    <div className="mt-2">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={newUserData.email || ""}
                        onChange={handleCreate}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Render user table */}

      {!isCreating && (
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                Header
              </h1>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                onClick={handleCreateUser}
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add user
              </button>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle">
                <table className="min-w-full border-separate border-spacing-0">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                      >
                        UUID
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                      >
                        Phone Number
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter xl:table-cell"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                      >
                        Player Id
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                      >
                        Connection Id
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter 2xl:table-cell"
                      >
                        created At
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                      >
                        Is_Subscribed
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                      >
                        Deleted
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                      >
                        Deleted_At
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-5 text-center text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                      >
                        Action
                        <span className="sr-only">
                          <PencilSquareIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((user, userIdx) => (
                        <tr key={user.id}>
                          <td
                            className={classNames(
                              userIdx !== data.length - 1
                                ? "border-b border-gray-400"
                                : "",
                              " whitespace-nowrap px-3 py-4 text-left text-sm font-medium text-gray-900"
                            )}
                          >
                            {user.id}
                          </td>

                          <td
                            className={classNames(
                              userIdx !== data.length - 1
                                ? "border-b border-gray-400"
                                : "",
                              " whitespace-nowrap px-3 py-4 text-left text-sm font-medium text-gray-600"
                            )}
                          >
                            {user.uuid}
                          </td>

                          <td
                            className={classNames(
                              userIdx !== data.length - 1
                                ? "border-b border-gray-400"
                                : "",
                              " hidden whitespace-nowrap px-3 py-4 text-left text-sm font-medium text-gray-600 lg:table-cell"
                            )}
                          >
                            {isEditing && editedData.id === user.id ? (
                              <input
                                type="number"
                                name="phone_number"
                                value={editedData.phone_number || ""}
                                onChange={handleUpdate}
                              />
                            ) : (
                              user.phone_number || ""
                            )}
                          </td>

                          <td
                            className={classNames(
                              userIdx !== data.length - 1
                                ? "border-b border-gray-400"
                                : "",
                              " hidden whitespace-nowrap px-3 py-4 text-left text-sm font-medium text-gray-600 xl:table-cell"
                            )}
                          >
                            {isEditing && editedData.id === user.id ? (
                              <input
                                type="email"
                                name="email"
                                value={editedData.email || ""}
                                onChange={handleUpdate}
                              />
                            ) : (
                              user.email || ""
                            )}
                          </td>

                          <td
                            className={classNames(
                              userIdx !== data.length - 1
                                ? "border-b border-gray-400"
                                : "",
                              " hidden whitespace-nowrap px-3 py-4 text-left text-sm font-medium text-gray-600"
                            )}
                          >
                            {user.playerId}
                          </td>
                          <td
                            className={classNames(
                              userIdx !== data.length - 1
                                ? "border-b border-gray-400"
                                : "",
                              " hidden whitespace-nowrap px-3 py-4 text-left text-sm font-medium text-gray-600"
                            )}
                          >
                            {user.connectionId}
                          </td>
                          <td
                            className={classNames(
                              userIdx !== data.length - 1
                                ? "border-b border-gray-400"
                                : "",
                              " hidden whitespace-nowrap px-3 py-4 text-left text-sm font-medium text-gray-600 2xl:table-cell"
                            )}
                          >
                            {user.created_at}
                          </td>
                          <td
                            className={classNames(
                              userIdx !== data.length - 1
                                ? "border-b border-gray-400"
                                : "",
                              " hidden whitespace-nowrap px-3 py-4 text-left text-sm font-medium text-gray-600"
                            )}
                          >
                            {user.is_subscribed}
                          </td>
                          <td
                            className={classNames(
                              userIdx !== data.length - 1
                                ? "border-b border-gray-400"
                                : "",
                              " hidden whitespace-nowrap px-3 py-4 text-left text-sm font-medium text-gray-600"
                            )}
                          >
                            {user.deleted}
                          </td>
                          <td
                            className={classNames(
                              userIdx !== data.length - 1
                                ? "border-b border-gray-400"
                                : "",
                              " hidden whitespace-nowrap px-3 py-4 text-center text-sm font-medium text-gray-600"
                            )}
                          >
                            {user.deleted_at}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-gray-600 text-center">
                            {isEditing && editedData.id === user.id ? (
                              <button
                                className="hover:text-black px-1"
                                onClick={handleUpdateUser}
                              >
                                <BookmarkSquareIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
                            ) : (
                              <button
                                className="hover:text-black px-1"
                                onClick={() => handleEdit(user)}
                              >
                                <PencilSquareIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
                            )}
                            <button
                              className="hover:text-black px-1"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <TrashIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
