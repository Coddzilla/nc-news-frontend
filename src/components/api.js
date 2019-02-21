import axios from "axios";

const BASE_URL = "https://nc-news-final.herokuapp.com/api";

export const getTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}/topics`);
  return data.topics;
};

export const getArticles = async () => {
  const { data } = await axios.get(`${BASE_URL}/articles`);

  return data;
};

export const getTopArticles = async () => {
  const { data } = await axios.get(
    `${BASE_URL}/articles?sort_by=votes&order=asc&limit=3`
  );

  return data;
};

export const getArticlesByTopic = async topic => {
  const { data } = await axios.get(`${BASE_URL}/topics/${topic}/articles`);

  return data.articles;
};

export const fetchUser = async username => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}`);
  return data.user;
};

export const getArticle = async article_id => {
  const { data } = await axios.get(`${BASE_URL}/articles/${article_id}`);

  return data.article;
};

export const getUserArticles = async username => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}/articles`);

  return data.articles;
};

export const vote = async (article_id, direction) => {
  await axios.patch(`${BASE_URL}/articles/${article_id}`, {
    inc_votes: direction
  });
};

export const getViewComments = async article_id => {
  const { data } = await axios.get(
    `${BASE_URL}/articles/${article_id}/comments?order=desc`
  );
  return data.comments;
};

export const patchComments = async (fullComment, article_id) => {
  const { data } = await axios.patch(
    `${BASE_URL}/articles/${article_id}/comments`,
    { fullComment }
  );
};
