import axios from "axios";
import { baseURL } from "../utils/consts/consts";

export const requester = axios.create({
  baseURL: baseURL
})