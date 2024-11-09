import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { systemPrompt } from './prompts.js';
import { OpenAIService } from '../../utils/OpenAIService.js';
import { sendData } from '../../utils/sendData.js';

export const w01l03 = async () => {// Get the current file path
    const taskFilePath = getFilePath();
    await downloadAndSaveFile(taskFilePath);
    const file = fs.readFileSync(taskFilePath, 'utf8');

    const testData = JSON.parse(file)['test-data'].map(data => {
        const [num1, num2] = data.question.split('+').map(Number);
        return {
            ...data,
            answer: num1 + num2
        };
    });
    
    for (const data of testData) {
        if (data.test) {
            var completionResponse = await chatCompletion(JSON.stringify(data.test));
            data.test = JSON.parse(completionResponse.choices[0].message.content)
        }
    }
    
    // Update the original file with the new testData
    const answer = {
        ...JSON.parse(file),
        'test-data': testData,
        'apikey': process.env.USER_API_KEY
    };

    await sendData('JSON', answer, process.env.URL_W01L03);
}

async function downloadAndSaveFile(taskFilePath){
    if (!fs.existsSync(taskFilePath)){        
        var response = await axios({
            url: process.env.URL_GETTASK,
            method: 'GET',
            responseType: 'stream',
        });

        const writer = fs.createWriteStream(taskFilePath);
        response.data.pipe(writer);
        
        // Return a promise that resolves when the file is fully written
        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        }).then(() => {
            console.log("File created");
        });
    }
    else{
        console.log("File already exist");
    }

}

function getFilePath(){
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const folderPath = path.resolve(__dirname, 'content');
    const taskFilePath = path.join(folderPath, 'json.txt');
    return taskFilePath;
}

export const chatCompletion = async (responseText) => {
    const messages = [
        { role: "system", content: systemPrompt() },
        { role: "user", content: responseText },
    ];

    const openaiService = new OpenAIService(messages, "gpt-4o-mini");

    const result = await openaiService.completion();

    return result;
}