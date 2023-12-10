import React from 'react'
import { useFetch } from '../services/useFetch'
const example = () => {
    const { serverResponse, isLoading, error } = useFetch(
        "/posts",
        "GET",
        {},
        localStorage.getItem("token")
    );
    console.log(serverResponse);
  return (
    <div>
      hello
    </div>
  )
}

export default example