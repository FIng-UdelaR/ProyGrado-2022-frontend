import axios from "axios";

const clienteAxios = axios.create({
  baseURL: "http://localhost:10000",
  timeout: 30000,
});

clienteAxios.defaults.headers.common = {
  ...axios.defaults.headers.common,
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};
// clienteAxios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default clienteAxios;
