const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33095409-60cba74fa568b59265daa29f1';
const PER_PAGE = '12';

export const getImages = async(keyword, page) => {
  const response= await fetch(
    `${BASE_URL}?q=${keyword}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
  )
    if (!response.ok) {
      throw new Error(response.status);
    } else {
      return response.json();
    }
};
