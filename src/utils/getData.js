import axios from 'axios';
export const getDataFromUrl = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data from URL:', error);
        throw error;
    }
};
