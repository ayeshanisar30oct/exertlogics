import React, { useState } from "react";
import Modal from "react-modal";

const ServiceModal = ({ isOpen, onRequestClose }) => {
  const [serviceTitle, setServiceTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("serviceTitle", serviceTitle);
    formData.append("description", description);

    try {
      const response = await fetch("http://localhost:3001/api/service", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      onRequestClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Service"
    >
      <button onClick={onRequestClose}>Close</button>
      <form onSubmit={handleSubmit}>
        <label>
          Service Title:
          <input
            type="text"
            value={serviceTitle}
            onChange={(e) => setServiceTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Image:
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </label>
        <button type="submit">Add Service</button>
      </form>
    </Modal>
  );
};

export default ServiceModal;
