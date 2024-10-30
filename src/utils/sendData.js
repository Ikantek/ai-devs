import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export async function sendData(task, answer) {
    const apikey = process.env.USER_API_KEY;
    const url = process.env.VERIFY_URL;
    try {
        const response = await axios.post(url, {
            task,
            apikey,
            answer
        });
        return response.data;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
};
