import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '21396115-cf31dc04a3ddd307b254525ae';

axios.defaults.baseURL = BASE_URL;

export const apiService = async (searchQuery, page) => {
  const response = await axios.get(
    `/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12&key=${API_KEY}`,
  );
  const hits = await response.data.hits;
  if (hits.length === 0) {
    throw new Error(`Нет изображений по ключевому слову ${searchQuery}`);
  }
  return hits;
};
