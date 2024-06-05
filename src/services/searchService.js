// src/services/searchService.js
import axios from 'axios';

const search = async (searchTerm) => {
  try {
    const response = await axios.get(`/api/search`, {
      params: { ...searchTerm },
    });
    console.log(response);
    return response?.data?.suggestions;
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
};

export default search;
