import axios from "axios";
import { useState, useEffect } from "react";

export const useAxios = ({ url, method = "GET", body = null }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const base_url = import.meta.env.VITE_TMDB_BASE_URL;
  const token = import.meta.env.VITE_APP_TMDB_TOKEN;

  const reqHeaders = {
    accept: 'application/json',
    Authorization: `Bearer ${token}`
  };

  const fetchData = async () => {
    setLoading(true);
    setData(null)
    setError(null)
    try {
      const config = {
        method,
        url: base_url+url,
        headers: reqHeaders,
        body: body
      }
      const { data } = await axios(config);
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error };
};
