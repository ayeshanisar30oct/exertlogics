import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { toast } from "react-toastify";
import apiUrl from "config";

const Menu = () => {
  const [data, setData] = useState(null);
  const [editingLinkId, setEditingLinkId] = useState(null);

  // Fetch header menu
  useEffect(() => {
     fetch(`${apiUrl}/header`)
      .then((response) => response.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const handleEdit = (linkId) => {
    setEditingLinkId(linkId);
  };

  const handleChange = (linkId, field, value) => {
    setData((prevData) => {
      const updatedLinks = prevData.header[0].links.map((link) =>
        link._id === linkId ? { ...link, [field]: value } : link
      );
      return {
        ...prevData,
        header: [{ ...prevData.header[0], links: updatedLinks }],
      };
    });
  };

  const handleSave = () => {
    const linkToSave = data.header[0].links.find(
      (link) => link._id === editingLinkId
    );
    const updatedLinks = data.header[0].links.map((link) =>
      link._id === linkToSave._id ? linkToSave : link
    );
     let bodyData = {
       siteTitle: "ExertLogics",
       links: updatedLinks,
     };
    fetch(`${apiUrl}/header`, {
      method: "PATCH",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((updatedLink) => {
        setData((prevData) => {
          const updatedLinks = prevData.header[0].links.map((link) =>
            link._id === updatedLink._id ? updatedLink : link
          );
          return {
            ...prevData,
            header: [{ ...prevData.header[0], links: updatedLinks }],
          };
        });
        setEditingLinkId(null);
        toast.success("Menu Item Has Been Updated.");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        alert("Error updating data. Please try again later.");
      });
  };

  // if (!data) {
  //   return;
  // }

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
                {data?.header[0]?.links.map((link, linkIdx) => (
                  <tr key={link._id}>
                    <td
                      className={classNames(
                        linkIdx !== data.header[0].links.length - 1
                          ? "border-b border-gray-500"
                          : "",
                        "border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11"
                      )}
                    >
                      {editingLinkId === link._id ? (
                        <input
                          type="text"
                          value={link.title || ""}
                          onChange={(e) =>
                            handleChange(link._id, "title", e.target.value)
                          }
                        />
                      ) : (
                        link.title
                      )}
                    </td>
                    <td
                      className={classNames(
                        linkIdx !== data.header[0].links.length - 1
                          ? "border-b border-gray-500"
                          : "",
                        "border-b border-[#eee] px-4 py-5 dark:border-strokedark"
                      )}
                    >
                      {editingLinkId === link._id ? (
                        <input
                          type="text"
                          value={link.url || ""}
                          onChange={(e) =>
                            handleChange(link._id, "url", e.target.value)
                          }
                        />
                      ) : (
                        link.url
                      )}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {editingLinkId === link._id ? (
                        <button
                          className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                          type="button"
                          onClick={handleSave}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                          type="button"
                          onClick={() => handleEdit(link._id)}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
