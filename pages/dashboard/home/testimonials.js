import { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import classNames from "classnames";
import Image from "next/image";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import ServiceModal from "../modals/ServiceModal";
import apiUrl from "config";

const Testimonials = () => {

const testimonialContent = [
  {
    text: "Sed imperdiet enim ligula, vitae viverra justo porta vel.",
    // avatar: imgAPI.avatar[3],
    name: "Jovelin Doe",
    title: "Senior Graphic Designer",
    rating: 3,
  },
  {
    text: "Cras convallis lacus orci, tristique tincidunt magna consequat in. In vel pulvinar est, at euismod libero.",
    // avatar: imgAPI.avatar[4],
    name: "Jihan Doe",
    title: "CEO Software House",
    rating: 5,
  },
  {
    text: "Cras convallis lacus orci, tristique tincidunt magna consequat in. In vel pulvinar est, at euismod libero.",
    // avatar: imgAPI.avatar[6],
    name: "Jovelin Doe",
    title: "Senior Graphic Designer",
    rating: 5,
  },
  {
    text: "Cras convallis lacus orci, tristique tincidunt magna consequat in. In vel pulvinar est, at euismod libero.",
    // avatar: imgAPI.avatar[7],
    name: "John Doe",
    title: "Senior Graphic Designer",
    rating: 4,
  },
  {
    text: "Sed imperdiet enim ligula, vitae viverra justo porta vel.",
    // avatar: imgAPI.avatar[10],
    name: "John Doe",
    title: "Chief Digital Officer",
    rating: 5,
  },
  {
    text: "Cras convallis lacus orci, tristique tincidunt magna consequat in. In vel pulvinar est, at euismod libero.",
    // avatar: imgAPI.avatar[1],
    name: "Jean Doe",
    title: "Chief Digital Officer",
    rating: 4,
  },
  {
    text: "This team is pretty amazing actually. Stepped in on our 50+ WordPress sites and did a great job on the edits/changes/JS/CSS etc all the front-end stuff.",
    // avatar: imgAPI.avatar[10],
    name: "Jeff Venn",
    title: "CEO Of CWS",
    rating: 5,
  },
  {
    text: "Highly recommended! The guys understood the requirements really well and implementation was quicker and better than I expected.",
    // avatar: imgAPI.avatar[1],
    name: "Henna",
    title: "CEO Of ITGem",
    rating: 4,
  },
  {
    text: "Always a pleasure working with ExertLogics, timely delivery excellent results. Keep up the good job.",
    // avatar: imgAPI.avatar[2],
    name: "Edith Muthoni",
    title: "Miwok Limited",
    rating: 4,
  },
];

  const [services, setServices] = useState([]);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchServicesData = async () => {
    try {
      const response = await fetch(`${apiUrl}/service`);
      const data = await response.json();
      if (data.status === "success") {
        setServices(data.service);
      }
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  };

  useEffect(() => {
    fetchServicesData();
  }, []);

  const handleEdit = (serviceId) => {
    setEditingServiceId(serviceId);
  };

  const handleChange = (serviceId, field, value) => {
    setServices((prevServices) => {
      const updatedServices = prevServices.map((service) =>
        service._id === serviceId ? { ...service, [field]: value } : service
      );
      return updatedServices;
    });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSave = async (serviceId) => {
    const serviceToSave = services.find((service) => service._id === serviceId);
    const { _id, ...serviceData } = serviceToSave;

    try {
      const response = await fetch(`${apiUrl}/service/${serviceId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedService = await response.json();
      setServices((prevServices) =>
        prevServices.map((service) =>
          service._id === updatedService._id ? updatedService : service
        )
      );
      setEditingServiceId(null);
      toast.success("Service updated successfully");
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Failed to update service");
    }
  };

  const imageUpload = async (serviceId) => {
    const serviceToSave = services.find((service) => service._id === serviceId);
    const { _id, ...serviceData } = serviceToSave;

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("serviceData", JSON.stringify(serviceData));
      formData.append("type", "serviceBanner");

      try {
        const response = await fetch(
          `${apiUrl}/service/service-banner/${serviceId}`,
          {
            method: "PATCH",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const updatedService = await response.json();
        setServices((prevServices) =>
          prevServices.map((service) =>
            service._id === updatedService._id ? updatedService : service
          )
        );

        setEditingServiceId(null);
        setSelectedFile(null);
        toast.success("Service updated successfully");
        fetchServicesData();
      } catch (error) {
        toast.error("Failed to update service");
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
      <Breadcrumb pageName="Testimonials" />
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-end mb-4">
          <ServiceModal isOpen={openModal} onRequestClose={closeModal} />
        </div>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  Avatar
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Name
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Title
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Message
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Rating
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, serviceIdx) => (
                <tr key={service._id}>
                  <td
                    className={classNames(
                      "px-4 py-5 dark:border-strokedark ", // default classes
                      serviceIdx !== services.length - 1
                        ? "border-b border-gray-500"
                        : ""
                    )}
                  >
                    {editingServiceId === service._id ? (
                      <div
                        id="FileUpload"
                        className="relative mb-5.5 block cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                      >
                        <input
                          type="file"
                          onChange={handleFileChange}
                          name="service-image"
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
                            or drag and drop
                          </p>
                          <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                          <p>(max, 800 X 800px)</p>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={service.serviceBannerUrl}
                        alt={service.title}
                        className="w-full h-auto"
                      />
                    )}
                  </td>
                  <td
                    className={classNames(
                      "px-4 py-5 pl-9 dark:border-strokedark xl:pl-11", // default classes
                      serviceIdx !== services.length - 1
                        ? "border-b border-gray-500"
                        : ""
                    )}
                  >
                    {editingServiceId === service._id ? (
                      <input
                        type="text"
                        value={service.title || ""}
                        onChange={(e) =>
                          handleChange(service._id, "title", e.target.value)
                        }
                      />
                    ) : (
                      service.title
                    )}
                  </td>
                  <td
                    className={classNames(
                      "px-4 py-5 pl-9 dark:border-strokedark xl:pl-11", // default classes
                      serviceIdx !== services.length - 1
                        ? "border-b border-gray-500"
                        : ""
                    )}
                  >
                    {editingServiceId === service._id ? (
                      <textarea
                        className="w-full"
                        value={service.description || ""}
                        onChange={(e) =>
                          handleChange(
                            service._id,
                            "description",
                            e.target.value
                          )
                        }
                        rows="5"
                      />
                    ) : (
                      service.description
                    )}
                  </td>

                  <td
                    className={classNames(
                      "px-4 py-5 pl-9 dark:border-strokedark xl:pl-11", // default classes
                      serviceIdx !== services.length - 1
                        ? "border-b border-gray-500"
                        : ""
                    )}
                  >
                    {editingServiceId === service._id ? (
                      <button
                        className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                        type="button"
                        onClick={
                          editingServiceId && selectedFile
                            ? () => imageUpload(service._id)
                            : () => handleSave(service._id)
                        }
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                        type="button"
                        onClick={() => handleEdit(service._id)}
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
  );
};

export default Testimonials;
