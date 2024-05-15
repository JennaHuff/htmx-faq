const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.static("../public"));
app.use(cors());

const categories = [
    "Product Offerings",
    "Dietary and Allergen Information",
    "Custom Orders and Special Services",
    "Delivery and Ordering",
    "Operational Details",
    "Miscellaneous",
];

const DB = [
    {
        question: "What types of bread do you offer?",
        answer: "We offer a variety of bread, including sourdough, baguettes, whole wheat, and rye.",
        category: "Product Offerings",
    },
    {
        question: "Do you have gluten-free options?",
        answer: "Yes, we have gluten-free bread and pastries available.",
        category: "Dietary and Allergen Information",
    },
    {
        question: "What are your most popular pastries?",
        answer: "Our most popular pastries include croissants, cinnamon rolls, and fruit danishes.",
        category: "Product Offerings",
    },
    {
        question: "Do you offer vegan options?",
        answer: "Yes, we have a selection of vegan pastries and cakes available.",
        category: "Dietary and Allergen Information",
    },
    {
        question: "Are your pastries nut-free?",
        answer: "While we take precautions to avoid cross-contamination, we cannot guarantee that our pastries are nut-free as some products may contain traces of nuts.",
        category: "Dietary and Allergen Information",
    },
    {
        question: "Do you offer custom cakes for special occasions?",
        answer: "Yes, we specialize in custom cakes for weddings, birthdays, and other special events. Contact us for more information.",
        category: "Custom Orders and Special Services",
    },
    {
        question: "Can I place a large order for a corporate event?",
        answer: "Absolutely! We offer catering services for corporate events, meetings, and parties. Contact us to discuss your needs.",
        category: "Custom Orders and Special Services",
    },
    {
        question: "Can I place a special order in advance?",
        answer: "Absolutely! We encourage customers to place special orders in advance to ensure availability. Contact us at least 24 hours before your desired pickup time.",
        category: "Custom Orders and Special Services",
    },
    {
        question: "Can I book your space for private events?",
        answer: "Yes, our bakery is available for private events. Contact us for more information and availability.",
        category: "Custom Orders and Special Services",
    },
    {
        question: "Do you offer gift cards?",
        answer: "Yes, we offer gift cards in various denominations. They make the perfect gift for any occasion.",
        category: "Custom Orders and Special Services",
    },
    {
        question: "Do you offer delivery?",
        answer: "Yes, we offer delivery within a 5-mile radius for orders over $25. Additional fees may apply.",
        category: "Delivery and Ordering",
    },
    {
        question: "Can I place an order online?",
        answer: "Yes, you can place an order online for pickup or delivery through our website.",
        category: "Delivery and Ordering",
    },
    {
        question: "What is your return policy?",
        answer: "We want you to be completely satisfied with your purchase. If you're not happy with your order, please contact us within 24 hours, and we'll do our best to make it right.",
        category: "Delivery and Ordering",
    },
    {
        question: "Can I place a special order for pickup?",
        answer: "Yes, you can place a special order for pickup at our bakery. Contact us for more information.",
        category: "Delivery and Ordering",
    },
    {
        question: "What are your hours of operation?",
        answer: "We are open Monday to Saturday from 7:00 AM to 6:00 PM and Sunday from 8:00 AM to 4:00 PM.",
        category: "Operational Details",
    },
    {
        question: "Do you have seating available?",
        answer: "Yes, we have indoor and outdoor seating available for customers to enjoy their treats.",
        category: "Operational Details",
    },
    {
        question: "Are your pastries made fresh daily?",
        answer: "Yes, all of our pastries are made fresh daily using the finest ingredients.",
        category: "Operational Details",
    },
    {
        question: "What forms of payment do you accept?",
        answer: "We accept cash, credit cards, and contactless payment methods such as Apple Pay and Google Pay.",
        category: "Operational Details",
    },
    {
        question: "Are your ingredients locally sourced?",
        answer: "We strive to use locally sourced and organic ingredients whenever possible to ensure freshness and quality.",
        category: "Operational Details",
    },
    {
        question: "Do you offer sugar-free options?",
        answer: "Yes, we offer a selection of sugar-free pastries and desserts for those with dietary restrictions.",
        category: "Dietary and Allergen Information",
    },
    {
        question: "Does ChatGPT have a personality?",
        answer: "While ChatGPT does not have a personality in the traditional sense, its responses can be tailored to exhibit certain tones or styles based on user interaction. This customization allows for a more engaging and personalized conversation experience.",
        category: "Miscellaneous",
    },
    {
        question: "How was ChatGPT trained?",
        answer: "ChatGPT was trained using a large dataset of text from the internet, encompassing various sources such as books, articles, websites, and conversations. The training process involved advanced machine learning techniques to optimize its language understanding and generation capabilities.",
        category: "Miscellaneous",
    },
    {
        question: "How accurate is ChatGPT?",
        answer: "ChatGPT strives to provide accurate and relevant responses based on the input it receives. However, its accuracy may vary depending on factors such as the quality of input, the complexity of the question, and the context of the conversation.",
        category: "Miscellaneous",
    },
    {
        question: "Can ChatGPT learn from conversations?",
        answer: "ChatGPT's underlying model can be fine-tuned or updated based on additional training data, including conversations. This process allows it to improve its performance and better adapt to users' preferences and conversational styles over time.",
        category: "Miscellaneous",
    },
    {
        question: "What versions of ChatGPT exist?",
        answer: "As of now, there have been several versions of ChatGPT released, each incorporating advancements in AI technology. Some notable versions include GPT-2, GPT-3, and potentially newer iterations beyond what's publicly known.",
        category: "Miscellaneous",
    },
];

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});

app.get("/faq", (req, res) => {
    res.set("Content-Type", "text/html");

    questionId = req.query.questionId;
    answerVisibility = req.query.visible === "false";
    category = req.query.category || categories[0];
    if (!questionId) {
        res.send(
            `
            <nav>
                <ul>
                    ${categories
                        .map(
                            (cat) =>
                                `<li
                            hx-get="/faq?category=${cat}"
                            hx-target="#nav-faq-container"
                            hx-trigger="mouseenter, click"
                            ${cat == category && 'class="active-category"'}
                        >
                            ${cat}
                        </li>`
                        )
                        .join("")}
                    
                </ul>
            </nav>
            <div id="faq">
                ${DB.filter((row) => row.category == category)
                    .map(
                        (row, index) =>
                            `<div id="question-${index + 1}">
                        <h2 hx-get="/faq?questionId=${index + 1}&visible=false"
                        hx-trigger="click"
                        hx-target="#question-${
                            index + 1
                        }"><span id="toggle-visibility-icon">+ </span>${
                                row.question
                            }</h2>
                        <p id="answer-${index + 1}"></p>
                    </div>`
                    )
                    .join("")}
            </div>`
        );
    }

    res.send(
        `<div id="question-${questionId}">
            <h2
                hx-get="/faq?questionId=${questionId}&visible=${answerVisibility}"
                hx-trigger="click"
                hx-target="#question-${questionId}"
            >
                <span id="toggle-visibility-icon"
                    >${answerVisibility ? "-" : "+"} </span
                >
                ${DB[questionId - 1].question}
            </h2>
            <p id="answer-${questionId}">
                ${answerVisibility ? DB[questionId - 1].answer : ""}
            </p>
        </div>`
    );
});

app.listen(3000, () => {
    console.log("Running on port 3000.");
});

module.exports = app;
