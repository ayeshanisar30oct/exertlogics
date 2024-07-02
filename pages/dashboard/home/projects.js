import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import classNames from "classnames";
import Image from "next/image";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import SelectGroupTwo from "../components/SelectGroup/SelectGroupTwo";
import useApi from "../hooks/useApi";
import ProjectModal from "../modals/ProjectModal";

const Projects = () => {
  const { request , loading, error } = useApi();
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [selectedFile, setSelectedFile] = useState({});
      const [isModalOpen, setIsModalOpen] = useState(false);


// Load categories
const fetchCategoriesData = async (getProject = false) => {
  try {
    // if()
    //   {
  const endpoint = getProject
    ? selectedCategory
      ? `https://exertlogics.vercel.app/api/project/category/${selectedCategory}`
      : "https://exertlogics.vercel.app/api/category"
    : "https://exertlogics.vercel.app/api/category";

   const data = await request(endpoint);

   if (data.status === "success") {
     if (getProject) {
       setProjects(data.project);
     } else {
       setCategories(data.category);
     }
  //  }
      }
 
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 useEffect(() => {
   fetchCategoriesData(true);
 }, [selectedCategory]);

 useEffect(() => {
   fetchCategoriesData();
 }, []);


  const handleEdit = (serviceId) => {
    setEditingProjectId(serviceId);
  };

  const handleChange = (proId, field, value) => {
    setProjects((prevPro) => {
      const updatedProjects = prevPro.map((pro) =>
        pro._id === proId ? { ...pro, [field]: value } : pro
      );
      return updatedProjects;
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(prev => ({
      ...prev,
      file: e.target.files[0],
      type: e.target.name 
    }));

  };

  // Save updated project
  const handleSave = async (proId) => {
    const serviceToSave = projects.find((pro) => pro._id === proId);
    const { _id, ...serviceData } = serviceToSave;

    try {
      const data = await request(`https://exertlogics.vercel.app/api/project/${proId}/`, 'PATCH', serviceData);

      setProjects((prevPro) =>
        prevPro.map((pro) => (pro._id === data._id ? data : pro))
      );
      setEditingProjectId(null);
      toast.success('Service updated successfully');
    } catch (error) {
      console.error('Error updating service:', error);
      toast.error('Failed to update service');
    }
  };

  // Media upload for a project
  const imageUpload = async (proId) => {

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile.file);
      formData.append('type', selectedFile.type);

      try {
        const updatedProject = await request(
          `https://exertlogics.vercel.app/api/project/project-logo/${proId}`,
          'PATCH',
          formData,
          true
        );

        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project._id === proId
              ? { ...project, [selectedFile.type + 'Url']: updatedProject.path[selectedFile.type + 'Url'] }
              : project
          )
        );
        setEditingProjectId(null);
        setSelectedFile(null);
        toast.success('Image updated successfully');
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Failed to update service');
      }
    }
  };

     const openModal = () => {
       setIsModalOpen(true);
     };

     const closeModal = () => {
       setIsModalOpen(false);
     };

  return (
    <div className="mx-auto">
      <Breadcrumb pageName="Our Projects" />
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-end mb-4">
          <ProjectModal isOpen={openModal} onRequestClose={closeModal} />
        </div>
        <div className="flex justify-between mb-4">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <SelectGroupTwo
              categories={categories}
              setCategory={setSelectedCategory}
            />
          </div>
        </div>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  Logo
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  Background
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Title
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Description
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {projects ? (
                projects.map((pro, serviceIdx) => (
                  <tr key={pro._id}>
                    <td
                      className={classNames(
                        "border-b border-gray-500 px-4 py-5 dark:border-strokedark"
                      )}
                    >
                      {editingProjectId === pro._id ? (
                        <div>
                          <div
                            id="FileUpload"
                            className="relative mb-5.5 block cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                          >
                            <input
                              type="file"
                              onChange={handleFileChange}
                              name="logo"
                              accept="image/*"
                              className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                            />
                            <div className="flex flex-col items-center justify-center space-y-3">
                              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                                    fill="#3C50E0"
                                  />
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                                    fill="#3C50E0"
                                  />
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                                    fill="#3C50E0"
                                  />
                                </svg>
                              </span>
                              <p>
                                <span className="text-primary text-center">
                                  Click to upload
                                </span>{" "}
                              </p>
                              {/* <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                          <p>(max, 800 X 800px)</p> */}
                            </div>
                          </div>
                          <div>
                            <button
                              className="flex justify-center rounded mx-auto bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                              type="button"
                              onClick={
                                editingProjectId && selectedFile
                                  ? () => imageUpload(pro._id)
                                  : null
                              }
                            >
                              Upload
                            </button>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={pro.logoUrl}
                          alt={pro.title}
                          className="w-30 h-auto"
                        />
                      )}
                    </td>
                    <td
                      className={classNames(
                        "border-b border-gray-500 px-4 py-5 dark:border-strokedark"
                      )}
                    >
                      {editingProjectId === pro._id ? (
                        <div>
                          <div
                            id="FileUpload"
                            className="relative mb-5.5 block cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                          >
                            <input
                              type="file"
                              onChange={handleFileChange}
                              name="background"
                              accept="image/*"
                              className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                            />
                            <div className="flex flex-col items-center justify-center space-y-3">
                              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                                    fill="#3C50E0"
                                  />
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                                    fill="#3C50E0"
                                  />
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                                    fill="#3C50E0"
                                  />
                                </svg>
                              </span>
                              <p>
                                <span className="text-primary">
                                  Click to upload
                                </span>{" "}
                              </p>
                              {/* <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                          <p>(max, 800 X 800px)</p> */}
                            </div>
                          </div>
                          <div>
                            <button
                              className="flex justify-center rounded mx-auto bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                              type="button"
                              onClick={
                                editingProjectId && selectedFile
                                  ? () => imageUpload(pro._id)
                                  : null
                              }
                            >
                              Upload
                            </button>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={pro.backgroundUrl}
                          alt={pro.title}
                          className="w-30 h-auto"
                        />
                      )}
                    </td>
                    <td
                      className={classNames(
                        serviceIdx !== categories.length - 1
                          ? "border-b border-gray-500"
                          : "",
                        "border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11"
                      )}
                    >
                      {editingProjectId === pro._id ? (
                        <input
                          type="text"
                          value={pro.title || ""}
                          onChange={(e) =>
                            handleChange(pro._id, "title", e.target.value)
                          }
                        />
                      ) : (
                        pro.title
                      )}
                    </td>
                    <td
                      className={classNames(
                        serviceIdx !== projects.length - 1
                          ? "border-b border-gray-500"
                          : "",
                        "border-b border-[#eee] px-4 py-5 dark:border-strokedark"
                      )}
                    >
                      {editingProjectId === pro._id ? (
                        <textarea
                          className="w-full"
                          value={pro.description || ""}
                          onChange={(e) =>
                            handleChange(pro._id, "description", e.target.value)
                          }
                          rows="5"
                        />
                      ) : (
                        pro.description
                      )}
                    </td>

                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {editingProjectId === pro._id ? (
                        <button
                          className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                          type="button"
                          onClick={
                            editingProjectId &&
                            selectedFile &&
                            Object.keys(selectedFile).length > 0
                              ? () => imageUpload(pro._id)
                              : () => handleSave(pro._id)
                          }
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                          type="button"
                          onClick={() => handleEdit(pro._id)}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <p>No data found!</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Projects;
