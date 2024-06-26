import { useState } from 'react';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (url, method = 'GET', body = null, isFormData = false) => {
    setLoading(true);
    setError(null);

    const headers = !isFormData ? { 'Content-Type': 'application/json' } : {};

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: isFormData ? body : body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (error) {
      setError(error);
      setLoading(false);
      throw error;
    }
  };

  return { request, loading, error };
};

export default useApi;
