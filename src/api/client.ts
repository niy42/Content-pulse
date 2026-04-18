// src/api/client.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000", // change when deployed
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // important for long processing
});