import OpenAI from "openai";

export class OpenAIService {
    constructor(messages = [], model = 'gpt-4o-mini', stream = false, jsonMode = false) {
        this.messages = messages;
        this.model = model;
        this.stream = stream;
        this.jsonMode = jsonMode;
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY, // Ensure you have your API key set in your environment variables
        });
    }

    setMessages(messages) {
        this.messages = messages;
    }

    setModel(model) {              // Add new method to change model
        this.model = model;
    }

    async completion() {
        const response = await this.openai.chat.completions.create({
            model: this.model,
            messages: this.messages,
            stream: this.stream,
            response_format: this.jsonMode ? { type: "json_object" } : { type: "text" }
        });

        if (this.stream) {
            return this.asyncIterable(response);
        } else {
            return response;
        }
    }

    async *asyncIterable(response) {
        for await (const chunk of response) {
            yield this.jsonMode ? chunk.choices.map(choice => choice.message) : chunk.choices.map(choice => choice.text);
        }
    }
}




