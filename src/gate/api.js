import axios from "axios";

import { apiUrl, apiCountry } from "helpers/configs";

export const postApi = axios.create({ baseURL: apiUrl });

export const countryApi = axios.create({ baseURL: apiCountry });

export default { postApi, countryApi };
