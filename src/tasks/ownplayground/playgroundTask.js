import { getData } from '../../utils/getData.js';
import { sendData } from '../../utils/sendData.js';

export const playgroundTask = async () => {
    const url = 'https://poligon.aidevs.pl/dane.txt';
    
    try {
        const getRequestData = await getData(url);
        const response = getRequestData.data;

        //console.log(typeof (getRequestData));
        const getPostData = await sendData('POLIGON', processDataToArray(response), process.env.VERIFY_URL);
        console.log(getPostData);

        return sendData;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const processDataToArray = (data) => {
    try {
        // Split the string into an array using any whitespace (spaces, new lines) as the separator
        return data.split(/\s+/).filter(element => element !== '');
    } catch (error) {
        console.error('Error processing data to array:', error);
        return [];
    }
};
