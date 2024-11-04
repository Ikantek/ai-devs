import { scrapPage } from '../../utils/scrapPage.js';
import { systemPrompt } from './prompts.js';
import { OpenAIService } from '../../utils/OpenAIService.js';

export const w01l01 = async () => {
    const page = process.env.URL_W01L01;
    const scrapResult = await scrapPage(page);
    const completion = await chatCompletion(scrapResult);
    const answer = await sendData(completion);

    console.log(await answer.text());
}

export const chatCompletion = async (prompt) => {
    const messages = [
        { role: "system", content: "You are a system that can answer questions about the given text. You should look for a question inside the provided markdown text and answer it as short as possible. Answer only in year." },
        { role: "user", content: prompt },
    ];

    const openaiService = new OpenAIService(messages, "gpt-4o-mini");

    const result = await openaiService.completion();

    return result;
}

export const sendData = async (completion) => {
    const result = await fetch(process.env.URL_W01L01, {
        method: 'POST',
        body: JSON.stringify({
            login: process.env.USER_LOGIN_W01L01,
            password: process.env.USER_PASSWORD_W01L01,
            answer: completion.choices[0].message.content
        })
    });

    return result;
}
