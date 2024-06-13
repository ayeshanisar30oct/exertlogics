import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import React from "react";
import classNames from "classnames";
import {
  PencilSquareIcon,
  BookmarkSquareIcon,
} from "@heroicons/react/24/outline";

const Menu = () => {
  const [data, setData] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [editingNavId, setEditingNavId] = useState(null);

  // GET HEADER MENU

  useEffect(() => {
    fetch("http://localhost:3001/api/header")
      .then((response) => response.json())
      .then((resp) => {
        setData(resp);
        console.log("data", resp);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  //  EDIT HEADER MENU

  const handleEdit = (link) => {
    setEditingNavId(link._id); // Assume _id uniquely identifies each nav item
    setIsEditing(true);
    setEditedData(link);
    console.log("nav", link);
    console.log("edited data", editedData);
  };

  const handleUpdate = (e, linkIdx = null) => {
    const { name, value } = e.target;
    const [field, index] = name.split("_").slice(-2);
    setEditedData((prevState) => {
      const updatedLinks = [...prevState.links];
      updatedLinks[parseInt(index, 10)] = {
        ...updatedLinks[parseInt(index, 10)],
        [field]: value,
      };

      return {
        ...prevState,
        header: {
          ...prevState.header,
          links: updatedLinks,
        },
      };
    });
  };
  console.log("edited data State", editedData);

  const handleUpdateNav = () => {
    fetch(`http://localhost:3001/api/header/${editedData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData),
    })
      .then((response) => response.json())
      .then((updatedNav) => {
        if (updatedNav.error) {
          console.error("Error updating data:", updatedNav.error);
        } else {
          setData((prevData) =>
            prevData.map((nav) => (nav.id === updatedNav.id ? updatedNav : nav))
          );
          setIsEditing(false);
          alert("Nav data edited successfully");
        }
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        alert("Error updating data. Please try again later.");
      });
  };

  return (
    <>
      <div className="mx-auto">
        <Breadcrumb pageName="Menu" />
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                    Menu Items
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Navigation URL
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* {data && */}
                {/* data.header.map((nav, navIdx) => ( */}
                <React.Fragment>
                  {data &&
                    data.header[0].links.map((link, linkIdx) => (
                      <tr key={linkIdx}>
                        <td
                          className={classNames(
                            linkIdx !== data.length - 1
                              ? "border-b border-gray-500"
                              : "",
                            "border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11"
                          )}
                        >
                          {editingNavId === link._id ? (
                            <input
                              type="text"
                              name={`menu_item_title_${linkIdx}`}
                              value={link.title || ""}
                              onChange={(e) => handleUpdate(e, linkIdx)}
                            />
                          ) : (
                            link.title || ""
                          )}
                        </td>
                        <td
                          className={classNames(
                            linkIdx !== data.length - 1
                              ? "border-b border-gray-500"
                              : "",
                            "border-b border-[#eee] px-4 py-5 dark:border-strokedark"
                          )}
                        >
                          {editingNavId === link._id ? (
                            <input
                              type="text"
                              name={`menu_item_url_${linkIdx}`}
                              value={link.url || ""}
                              onChange={(e) => handleUpdate(e, linkIdx)}
                            />
                          ) : (
                            link.url || ""
                          )}
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          {editingNavId === link._id ? (
                            <button
                              className="hover:text-black px-1"
                              onClick={handleUpdateNav}
                            >
                              <BookmarkSquareIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          ) : (
                            <button
                              className="hover:text-black px-1"
                              onClick={() => handleEdit(link)}
                            >
                              <PencilSquareIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </React.Fragment>
                {/* ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
