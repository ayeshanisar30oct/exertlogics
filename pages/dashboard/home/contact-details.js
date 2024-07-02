import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ContactDetails = () => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [emailAddress, setEmailAddress] = useState();
  const [mapURL, setMapURL] = useState();
  const [address, setAddress] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchContactData = async () => {
    try {
      const response = await fetch("https://exertlogics.vercel.app/api/contact");
      const data = await response.json();
      if (data.status === "success" && data.contact.length > 0) {
        const contactData = data.contact[0];
        setPhoneNumber(contactData.phone);
        setEmailAddress(contactData.email);
        setMapURL(contactData.map);
        setAddress(contactData.address);
      }
    } catch (error) {
      console.error("Error fetching about data:", error);
    }
  };

  useEffect(() => {
    fetchContactData();
  }, []);

  const phoneNumberInputHandler = (e) => {
    setPhoneNumber(e.target.value);
  };
  const emailAddressInputHandler = (e) => {
    setEmailAddress(e.target.value);
  };

  const mapURLInputHandler = (e) => {
    setMapURL(e.target.value);
  };

  const addressInputHandler = (e) => {
    setAddress(e.target.value);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      phoneNumber.trim() === "" ||
      emailAddress.trim() === "" ||
      mapURL.trim() === "" ||
      address.trim() === ""
    ) {
      toast.error("Either of the fields can't be empty");
      return;
    }

    const bodyData = {
      phone: phoneNumber,
      email: emailAddress,
      address: address,
      map: mapURL,
    };

    setIsLoading(true); // Set loading state

    try {
      const response = await fetch("https://exertlogics.vercel.app/api/contact", {
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
      toast.success("Contact Details Updated Successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="mx-auto">
      <Breadcrumb pageName="Contact Details" />
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-5">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact Information
              </h3>
            </div>
            <div className="p-7">
              <form onSubmit={formSubmitHandler}>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Phone Number"
                    >
                      Contact Number
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={phoneNumberInputHandler}
                      />
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Email Address"
                    >
                      Email Address
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="emailAddress"
                      id="emailAddress"
                      value={emailAddress}
                      onChange={emailAddressInputHandler}
                    />
                  </div>
                </div>
                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="Map URL"
                  >
                    Map URL
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="mapURL"
                    id="mapURL"
                    value={mapURL}
                    onChange={mapURLInputHandler}
                  />
                </div>
                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="Address"
                  >
                    Address
                  </label>
                  <input
                    className="capitalize w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="address"
                    id="address"
                    value={address}
                    onChange={addressInputHandler}
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

export default ContactDetails;
