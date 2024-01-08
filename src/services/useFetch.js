import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const useFetch = (
  apiURL,
  method = "GET",
  postMethodData,
  encodedToken
) => {
  const [serverResponse, setServerResponse] = useState();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const API_URL = `http://localhost:3001` + apiURL;

  const getData = async () => {
    try {
      setLoading(true);
      let serverResponse;
      switch (method) {
        case "GET":
          serverResponse = await axios.get(API_URL, {
            headers: {
              authorization: encodedToken,
            },
          });
          break;
        case "POST":
          serverResponse = await axios.post(API_URL, postMethodData, {
            headers: {
              authorization: encodedToken,
              "Content-Type": "multipart/form-data",
            },
          });
          break;
        case "DELETE":
          serverResponse = await axios.delete(API_URL, {
            headers: {
              authorization: encodedToken,
            },
          });
          break;
        default:
          break;
      }
      setServerResponse(serverResponse);
    } catch (err) {
      setError((prev) => ({
        ...prev,
        message: err.message,
        status: err.status,
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (apiURL) {
      getData();
    }
  }, [apiURL, method, postMethodData]);

  return { isLoading, error, serverResponse };
};
