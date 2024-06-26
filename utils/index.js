export const fetchContactData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/contact");
      const data = await response.json();
      if (data.status === "success" && data.contact.length > 0) {
        return { contactData: data.contact[0] };
      }
    } catch (error) {
      console.error("Error fetching contact data:", error);
    }
    return { contactData: null };
  };