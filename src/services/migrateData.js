// src/services/searchService.js
import axios from 'axios';

const migrate = async (formData) => {
    try {
        await axios.post('/api/migrate', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      } catch (error) {
        console.error(error);
      }
};

export default migrate;
