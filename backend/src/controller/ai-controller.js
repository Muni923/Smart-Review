const { GoogleGenAI } = require("@google/genai");
const { GEMINI_API_KEY } = require("../config/config")
const reviewCode = async (req, res) => {
    const { code, language } = req.body;


    if (!language && !code) {
        res.json({ review: "Please select language and enter code..." });
    }
    if (!code) {
        res.json({ review: "Please paste your code..." });

    }
    if (!language) {
        res.json({ review: "Please select language..." });
    }
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    const interaction = await ai.interactions.create({
        model: "gemini-3.6-flash",
        input: `You are an expert-level software developer, skilled in writing efficient,clean, and advanced coding.I'm sharing a piece of code written in ${language}.Your job is to deeply review this code and provide the following: quality rating: Better, Good, Norml, or Bad.Detailed suggestions for improvement, including best practices and advanced alternatives.A clear explanation of what the code does, step by step.A list of any potential bugs or logical errors, if found.Identification of syntax errors or runtime errors, if present.Solutions and recommendations on how to fix each identified issue.And mention only about the code nothing else
      code:${code}`
    });
    res.json({ review: interaction.output_text });
};
module.exports = reviewCode;