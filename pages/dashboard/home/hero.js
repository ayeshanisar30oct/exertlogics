import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


const Hero = () => {
  const [heroData, setHeroData] = useState();
  const [title, setTitle] = useState();
  const [subTitle, setSubTitle] = useState();
  const [videoUrl, setVideoUrl] = useState();
    const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    fetch("http://localhost:3001/api/home")
      .then((response) => response.json())
      .then((data) => {
        setHeroData(data);

        if (data && data.home && data.home[0].title) {
          setTitle(data.home[0].title);
        }

        if (data && data.home && data.home[0].subTitle) {
          setSubTitle(data.home[0].subTitle);
        }
        if (data && data.home && data.home[0].videoUrl) {
          setVideoUrl(data.home[0].videoUrl);
        }
      })
      .catch((error) => console.error("Error fetching footerData:", error));
  }, []);

  const titleInputHandler = (e) => {
    setTitle(e.target.value);
  };

  const subTitleInputHandler = (e) => {
    setSubTitle(e.target.value);
  };

  const videoUrlInputHandler = (e) => {
    setVideoUrl(e.target.value);
  };

const formSubmitHandler = async (e) => {
  e.preventDefault();

  // Basic validation
  if (
    title.trim() === "" ||
    subTitle.trim() === "" ||
    videoUrl.trim() === ""
  ) {
    toast.error("Either of the fields can't be empty");
    return;
  }

  const bodyData = {
    title: title,
    subTitle: subTitle,
    videoUrl: videoUrl,
  };

  setIsLoading(true); // Set loading state

  try {
    const response = await fetch("http://localhost:3001/api/home", {
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
    toast.success("Hero Data Updated Successfully");
  } catch (error) {
    console.error("Error submitting form:", error);
  } finally {
    setIsLoading(false); // Reset loading state
  }
};

  return (
      <div className="mx-auto">
        <Breadcrumb pageName="Hero" />
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-5">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Hero Information
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={formSubmitHandler}>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Title"
                    >
                      Title
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="title"
                      id="title"
                      value={title}
                      onChange={titleInputHandler}
                    />
                  </div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Subtitle"
                    >
                      Subtitle
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="subTitle"
                      id="subTitle"
                      value={subTitle}
                      onChange={subTitleInputHandler}
                    />
                  </div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="VideoUrl"
                    >
                      Banner Video URL
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="videoUrl"
                      id="videoUrl"
                      value={videoUrl}
                      onChange={videoUrlInputHandler}
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

export default Hero;
