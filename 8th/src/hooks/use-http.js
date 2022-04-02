import { useState } from 'react';
const useHttp = (reqCfg, handleData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendReq = async (taskText) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(reqCfg.url, {
        method: reqCfg.method ? reqCfg.method : 'GET',
        headers: reqCfg.headers ? reqCfg.headers : {},
        body: reqCfg.body ? JSON.stringify(reqCfg.body) : null,
      });

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      // Here we do whatever the fuck we want to do with the data.
      handleData(data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  };

  // We need these back at the component that used "useHttp" so we are returning them
  return { isLoading, error, sendReq };
};

export default useHttp;
