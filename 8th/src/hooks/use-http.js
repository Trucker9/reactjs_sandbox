import { useState, useCallback} from 'react';

const useHttp = ( ) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendReq = useCallback(async (reqCfg, handleData) => {
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
      console.log(handleData);
      const data = await response.json();
      // Here we do whatever the fuck we want to do with the data.
      handleData(data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  },
  /* This dependencies will trigger useCallback to store this function again.
  But we have to make sure that back in the App component, AKA the component that used
  this hook, all these dependencies wont be recreated each time App runs
  */
   []);

  // We need these back at the component that used "useHttp" so we are returning them
  return { isLoading, error, sendReq };
};

export default useHttp;
