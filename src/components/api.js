import axios from "axios";

const BASE_URL = "https://nc-news-final.herokuapp.com";

export const getTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/topics`);
  return data.topics;
};

export const getArticles = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/articles`);
  return data.articles;
};
