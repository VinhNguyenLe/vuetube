import axios from "axios";

const BASE_URL = "https://youtube-v31.p.rapidapi.com";

const options = {
  method: "GET",
  params: {
    part: "snippet,id",
    maxResults: 50,
    regionCode: "VN",
  },
  headers: {
    "X-RapidAPI-Key": "5380412e98mshbf71c75d4ae5312p1750b7jsn5a07e562ae9c",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchAPI = async (url: any) => {
  const data = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};
