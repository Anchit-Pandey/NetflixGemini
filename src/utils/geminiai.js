import { GoogleGenAI } from "@google/genai";
import { GEMINI_KEY } from "./constants";

const geminiai = new GoogleGenAI({ 
    apiKey: GEMINI_KEY, 
    dangerouslyAllowBrowser: true,
});

export default geminiai;