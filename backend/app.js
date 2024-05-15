const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const DB = [
    {
        question: "What is ChatGPT?",
        answer: "ChatGPT is an AI-powered conversational agent developed by OpenAI. It is designed to engage in natural language conversations with users across a wide range of topics.",
    },
    {
        question: "How does ChatGPT work?",
        answer: "ChatGPT works by utilizing a deep learning model trained on vast amounts of text data. It processes input text, generates responses, and aims to simulate human-like conversation based on the patterns it has learned.",
    },
    {
        question: "What can ChatGPT do?",
        answer: "ChatGPT can answer questions, engage in discussions, provide information on various topics, and even offer suggestions or recommendations. Its capabilities are broad and can adapt to different conversational contexts.",
    },
    {
        question: "Is ChatGPT sentient?",
        answer: "No, ChatGPT is not sentient. It is an artificial intelligence program and lacks consciousness or self-awareness. It operates based on predefined algorithms and data, without genuine understanding or emotions.",
    },
    {
        question: "How accurate is ChatGPT?",
        answer: "ChatGPT strives to provide accurate and relevant responses based on the input it receives. However, its accuracy may vary depending on factors such as the quality of input, the complexity of the question, and the context of the conversation.",
    },
    {
        question: "Can ChatGPT learn from conversations?",
        answer: "ChatGPT's underlying model can be fine-tuned or updated based on additional training data, including conversations. This process allows it to improve its performance and better adapt to users' preferences and conversational styles over time.",
    },
    {
        question: "How was ChatGPT trained?",
        answer: "ChatGPT was trained using a large dataset of text from the internet, encompassing various sources such as books, articles, websites, and conversations. The training process involved advanced machine learning techniques to optimize its language understanding and generation capabilities.",
    },
    {
        question: "What versions of ChatGPT exist?",
        answer: "As of now, there have been several versions of ChatGPT released, each incorporating advancements in AI technology. Some notable versions include GPT-2, GPT-3, and potentially newer iterations beyond what's publicly known.",
    },
    {
        question: "Can ChatGPT generate code?",
        answer: "Yes, ChatGPT can generate code snippets based on provided descriptions or requirements. However, its ability to produce functional code depends on the complexity of the task and the clarity of the instructions given.",
    },
    {
        question: "Is ChatGPT biased?",
        answer: "Like any AI model trained on data from the internet, ChatGPT may inadvertently exhibit biases present in its training data. Efforts are made to mitigate biases during training, but complete elimination is challenging. Users are encouraged to critically evaluate responses and consider diverse perspectives.",
    },
    {
        question: "How does ChatGPT handle sensitive topics?",
        answer: "ChatGPT aims to handle sensitive topics responsibly by providing factual information, avoiding inflammatory language, and promoting respectful dialogue. However, users should be mindful that ChatGPT's responses may not always be suitable for all situations, especially those involving sensitive or controversial subjects.",
    },
    {
        question: "Can ChatGPT understand emotions?",
        answer: "ChatGPT can recognize certain emotional cues in text input and respond accordingly. However, it does not possess emotions or emotional intelligence in the same way humans do. Its responses are generated based on patterns in the data it was trained on, rather than genuine emotional understanding.",
    },
    {
        question: "Does ChatGPT have a personality?",
        answer: "While ChatGPT does not have a personality in the traditional sense, its responses can be tailored to exhibit certain tones or styles based on user interaction. This customization allows for a more engaging and personalized conversation experience.",
    },
    {
        question: "Can ChatGPT provide medical advice?",
        answer: "ChatGPT is not qualified to provide medical advice or diagnosis. It is recommended to consult a qualified healthcare professional for medical concerns or questions. ChatGPT can, however, provide general information on medical topics based on publicly available knowledge.",
    },
    {
        question: "Is ChatGPT available in multiple languages?",
        answer: "As of now, ChatGPT primarily operates in English. However, efforts are underway to develop versions of ChatGPT in other languages to facilitate broader accessibility and inclusivity.",
    },
    {
        question: "How does ChatGPT ensure user privacy?",
        answer: "ChatGPT prioritizes user privacy and data security by adhering to strict privacy policies and regulations. Conversations with ChatGPT are typically anonymized and not stored unless explicitly stated for research or improvement purposes.",
    },
    {
        question: "Can ChatGPT generate creative content?",
        answer: "Yes, ChatGPT can generate creative content such as stories, poems, or even product ideas based on input prompts. Its ability to generate original and imaginative content is one of its notable features.",
    },
    {
        question: "What are some limitations of ChatGPT?",
        answer: "ChatGPT's responses may sometimes lack context awareness, exhibit biases, or generate irrelevant or nonsensical output, especially when presented with ambiguous or complex queries. Additionally, it may struggle with tasks requiring real-time or dynamic interaction.",
    },
    {
        question: "How does ChatGPT handle spam and abuse?",
        answer: "ChatGPT incorporates mechanisms to detect and mitigate spam, abuse, and inappropriate content within conversations. Users are encouraged to report any instances of misuse, and appropriate actions are taken to address such issues.",
    },
    {
        question: "Can ChatGPT be used for educational purposes?",
        answer: "Yes, ChatGPT can be a valuable educational tool for acquiring information, exploring concepts, and engaging in interactive learning experiences. It can provide explanations, answer questions, and facilitate discussions on various subjects.",
    },
    {
        question: "Is ChatGPT open-source?",
        answer: "While the underlying technologies and research behind ChatGPT may be based on open-source principles, the specific implementations and models developed by OpenAI are typically proprietary. However, OpenAI often releases research findings and tools to the broader AI community.",
    },
];

app.get("/", (req, res) => {
    res.set("Content-Type", "text/html");
    res.send(
        `<div id="faq">${DB.map(
            (row, index) =>
                `<div id="question-${index + 1}">
                    <h2>${row.question}</h2>
                    <button
                        hx-get="http://localhost:3000/faq?questionId=${
                            index + 1
                        }&visible=false"
                        hx-trigger="click"
                        hx-target="#question-${index + 1}"
                    >
                    ▼
                    </button>
                    <p id="answer-${index + 1}"></p>
                </div>`
        ).join("")}</div>`
    );
});

app.get("/faq", (req, res) => {
    questionId = req.query.questionId;
    answerVisibility = req.query.visible === "false";

    res.set("Content-Type", "text/html");
    res.send(
        `<div id="question-${questionId}">
            <h2>${DB[questionId - 1].question}</h2>
            <button
                hx-get="http://localhost:3000/faq?questionId=${questionId}&visible=${answerVisibility}"
                hx-trigger="click"
                hx-target="#question-${questionId}"
            >
                ${answerVisibility ? "▲" : "▼"}
            </button>
            <p id="answer-${questionId}">
                ${answerVisibility ? DB[questionId - 1].answer : ""}
            </p>
        </div>`
    );
});

module.exports = app;
