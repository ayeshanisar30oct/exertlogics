import Breadcrumb from "../Breadcrumbs/Breadcrumb";
"use client";
import React from "react";
import { useEffect, useState } from "react";
import classNames from "classnames";
import {
  PencilSquareIcon,
  BookmarkSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { Metadata } from "next";
import DefaultLayout from "../Layouts/DefaultLayout";
// import SelectGroupOne from "../SelectGroup/SelectGroupOne";
import Link from "next/link";

export const metadata = {
  title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const Navbar = () => {
    const [data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [newnavData, setNewnavData] = useState({});
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
      fetch("http://localhost:3001/api/header")
        .then((response) => response.json())
        .then((data) => {
          // const sortedData = data.sort((a, b) => b.id - a.id);
          setData([data]);
          console.log("data", data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, []);
    console.log("data", data);

    const handleEdit = (nav) => {
      setIsEditing(true);
      setIsCreating(false);
      setEditedData(nav);
    };

    const handleUpdatenav = () => {
      fetch(`http://localhost:3030/update-nav/${editedData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      })
        .then((updatednav) => {
          if (updatednav.error) {
            console.error("Error updating data:", updatednav.error);
          } else {
            setData((prevData) =>
              prevData.map((nav) =>
                nav.id === updatednav.id ? updatednav : nav
              )
            );
            // Show alert message
            setIsEditing(false);
            alert("nav data edited successfully");
            // window.location.reload();
          }
        })
        .catch((error) => {
          console.error("Error updating data:", error);
          // Show error message
          alert("Error updating data. Please try again later.");
          // setIsEditing(false);
          //  alert('nav data edited successfully');
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

    const handleDeletenav = (id) => {
      fetch(`http://localhost:3030/delete-nav/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete nav");
          }
          // Remove the deleted nav from the data
          setData((prevData) => prevData.filter((nav) => nav.id !== id));
          alert("nav deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting nav:", error);
          alert("Failed to delete nav. Please try again later.");
        });
    };

    const handleCreatenav = () => {
      setIsEditing(false);
      setIsCreating(true);
      // setNewnavData({});
    };

    const handleCreate = (e) => {
      const { name, value } = e.target;
      if (name && value) {
        setNewnavData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    };
    const handleSubmitNewnav = (e) => {
      e.preventDefault();
      fetch(`http://localhost:3030/create-nav`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newnavData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((creatednav) => {
          // Handle success
          console.log("New nav created:", creatednav);
          setIsEditing(false);
          setIsCreating(false);
          setNewnavData({});

          alert("nav created successfully");
          // Refresh data or update UI as needed
        })
        .catch((error) => {
          console.error("Error creating nav:", error);
          // Show error message to nav
          alert("Error creating nav. Please try again later.");
        });
      console.log("New nav Data:", newnavData);
    };
  return (
    <>
      <Breadcrumb pageName="Navbar" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Navbar Form
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Site Title
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Site Logo
                    </label>
                    <input
                      type="file"
                      placeholder=""
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Submit
                </button>
              </div>
            </form>
            <div>
              {isCreating && (
                <div>
                  <h2 className="text-indigo-600 font-bold">Create New nav</h2>
                  <form onSubmit={handleSubmitNewnav}>
                    <div className="space-y-12">
                      <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                          Personal Information
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Use a permanent email address where you can receive
                          mails.
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
                                value={newnavData.phone_number || ""}
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
                                value={newnavData.email || ""}
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

              {/* Render nav table */}

              {!isCreating && (
                <div className="px-4 sm:px-6 lg:px-8">
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
                                Menu Items
                              </th>
                              <th
                                scope="col"
                                className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                              >
                                Navigation URL
                              </th>
                              <th
                                scope="col"
                                className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                              >
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((nav, navIdx) => (
                              <React.Fragment key={nav.id}>
                                {nav.header.links.map((link, linkIdx) => (
                                  <tr key={linkIdx}>
                                    <td
                                      className={classNames(
                                        navIdx !== data.length - 1
                                          ? "border-b border-gray-400"
                                          : "",
                                        "whitespace-nowrap px-3 py-4 text-left text-sm font-medium text-gray-600 lg:table-cell"
                                      )}
                                    >
                                      {isEditing && editedData.id === nav.id ? (
                                        <input
                                          type="string"
                                          name={`menu_item_title_${linkIdx}`}
                                          value={
                                            editedData.header.links[linkIdx]
                                              ?.title || ""
                                          }
                                          onChange={(e) =>
                                            handleUpdate(e, linkIdx)
                                          }
                                        />
                                      ) : (
                                        link.title || ""
                                      )}
                                    </td>
                                    <td
                                      className={classNames(
                                        navIdx !== data.length - 1
                                          ? "border-b border-gray-400"
                                          : "",
                                        "whitespace-nowrap px-3 py-4 text-left text-sm font-medium text-gray-600 lg:table-cell"
                                      )}
                                    >
                                      {isEditing && editedData.id === nav.id ? (
                                        <input
                                          type="string"
                                          name={`menu_item_url_${linkIdx}`}
                                          value={
                                            editedData.header.links[linkIdx]
                                              ?.url || ""
                                          }
                                          onChange={(e) =>
                                            handleUpdate(e, linkIdx)
                                          }
                                        />
                                      ) : (
                                        link.url || ""
                                      )}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-gray-600 text-center">
                                      {isEditing && editedData.id === nav.id ? (
                                        <button
                                          className="hover:text-black px-1"
                                          onClick={handleUpdatenav}
                                        >
                                          <BookmarkSquareIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </button>
                                      ) : (
                                        <button
                                          className="hover:text-black px-1"
                                          onClick={() => handleEdit(nav)}
                                        >
                                          <PencilSquareIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </button>
                                      )}
                                      <button
                                        className="hover:text-black px-1"
                                        onClick={() => handleDeletenav(nav.id)}
                                      >
                                        <TrashIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
