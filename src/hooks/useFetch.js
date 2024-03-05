import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error("Error getting data!");
        }
        const responseData = await response.json();
        setData(responseData);
        setLoading(false);
        setError(false);
        console.log(responseData);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("fetch was aborted");
        } else {
          console.log(err.message);
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, [url]);
  return { data,setData, loading, error };
};
export default useFetch;
