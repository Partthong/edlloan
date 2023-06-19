// export const api_url = "https://localhost:44344";

import axios from "axios";

export const Axios = axios.create({
  baseURL: "https://localhost:44344",
});

export const headers = (myToken) => {
    if (myToken) return {
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + myToken,
      }
    }
  }






