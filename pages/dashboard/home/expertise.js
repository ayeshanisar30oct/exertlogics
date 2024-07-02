import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiUrl from "config";


const Expertise = () => {
  const [subTitle, setSubTitle] = useState();
  const [description, setDescription] = useState();
  const [expertise, setExpertise] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchExpertiseData = async () => {
    try {
      const response = await fetch(`${apiUrl}/expertise`);
      const data = await response.json();
      if (data.status === "success" && data.expertise.length > 0) {
        const expertiseData = data.expertise[0];
        setSubTitle(capitalizeFirstLetter(expertiseData.subTitle));
        setDescription(capitalizeFirstLetter(expertiseData.description));
        setExpertise(expertiseData.expertise);
      }
    } catch (error) {
      console.error("Error fetching about data:", error);
    }
  };

  useEffect(() => {
    fetchExpertiseData();
  }, []);

  const subTitleInputHandler = (e) => {
    setSubTitle(e.target.value);
  };

  const descriptionInputHandler = (e) => {
    setDescription(e.target.value);
  };

  const expertiseInputHandler = (e) => {
    const inputValue = e.target.value;
     if (typeof inputValue === "string") {
       const expertiseArray = inputValue.split(",").map((item) => item.trim());
       setExpertise(expertiseArray);
     }
  };

   const formSubmitHandler = async (e) => {
     e.preventDefault();

     // Basic validation
     if (subTitle.trim() === "" || description.trim() === "") {
       toast.error("Either of the fields can't be empty");
       return;
     }

     const bodyData = {
       subTitle: subTitle,
       description: description,
       expertise: expertise,
     };

     setIsLoading(true); // Set loading state

     try {
       const response = await fetch(`${apiUrl}/expertise`, {
         method: "PATCH",
         body: JSON.stringify(bodyData),
         headers: {
           "Content-Type": "application/json",
         },
       });

       if (!response.ok) {
         throw new Error("Network response was not ok");
       }

       const result = await response.json();
       toast.success("Expertise Data Updated Successfully");
     } catch (error) {
       console.error("Error submitting form:", error);
     } finally {
       setIsLoading(false); // Reset loading state
     }
   };




  function capitalizeFirstLetter(text) {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  return (
    <div className="mx-auto">
      <Breadcrumb pageName="Expertise" />
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-5">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Expertise Information
              </h3>
            </div>
            <div className="p-7">
              <form onSubmit={formSubmitHandler}>
                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="Title"
                  >
                    Subtitle
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="title"
                    id="title"
                    value={subTitle}
                    onChange={subTitleInputHandler}
                  />
                </div>
                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="Subtitle"
                  >
                    Description
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="subTitle"
                    id="subTitle"
                    value={description}
                    onChange={descriptionInputHandler}
                  />
                </div>
                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="VideoUrl"
                  >
                    Expertise
                  </label>
                  <input
                    className="capitalize w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="videoUrl"
                    id="videoUrl"
                    value={expertise.join(", ")} // Display array elements with ', ' between them
                    onChange={expertiseInputHandler}
                  />
                </div>

                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                    disabled={isLoading}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expertise;
