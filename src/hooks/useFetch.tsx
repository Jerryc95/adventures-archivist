import { useState, useCallback } from "react";
import { Campaign } from "../models/Campaign";

const useFetch = (url: string) => {
  const [data, setData] = useState<Campaign[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData);
        throw new Error(`Bad Response: ${response.status}`);
      }
      const responseData = await response.json();
      console.log(responseData);
      setData(responseData);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  const postData = useCallback(
    async (newData: Campaign) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newData),
        });
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData);
          throw new Error(`Bad response: ${response.status}`);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [url]
  );

  const deleteData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData);
        throw new Error(`Bad Response: ${response.status}`);
      }
      setData([]);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  return { data, setData, error, isLoading, getData, postData, deleteData };
};

export default useFetch;
