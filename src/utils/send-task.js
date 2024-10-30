import axios from 'axios';

export const sendTask = async (task, apikey, answer) => {
    const url = 'https://poligon.aidevs.pl/verify'; // Replace with your actual API endpoint
    const data = {
        task: task,
        apikey: apikey,
        answer: answer
    };

    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.error('Error sending task:', error);
        throw error;
    }
};
