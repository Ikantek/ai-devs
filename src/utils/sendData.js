import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export async function sendData(task, answer, url) {
    const apikey = process.env.USER_API_KEY;
    try {
        const response = await axios.post(url, {
            task,
            apikey,
            answer
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
};
