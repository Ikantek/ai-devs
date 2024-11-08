import { systemPrompt } from './prompts.js';
import { OpenAIService } from '../../utils/OpenAIService.js';

export const w01l02 = async () => {
    
    const url = process.env.URL_W01L02; // URL to call
    let requestText = "READY"; // Initial text
    let msgID = 0; // Default msgID
    let responseText = "";

    while (responseText !== "OK" && !responseText.toLowerCase().includes("flg")) {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ msgID, text: requestText })
        });

        const responseData = await response.json();
        console.log(`Sent: { msgID: ${msgID}, text: ${requestText} }`);
        console.log(`Response: ${JSON.stringify(responseData)}`);

        // Update msgID if the response has a different ID
        if (responseData.msgID && responseData.msgID !== msgID) {
            msgID = responseData.msgID;
        }

        responseText = responseData.text; // Update responseText for the next iteration

        // Call OpenAI service with the prompt
        const completion = await chatCompletion(responseText);
        requestText = `${completion.choices[0].message.content}`;
        console.log(`OpenAI Response: ${completion.choices[0].message.content}`);
    }
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