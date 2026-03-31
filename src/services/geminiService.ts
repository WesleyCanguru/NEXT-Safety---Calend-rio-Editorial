import { GoogleGenAI, Type } from "@google/genai";
import { TrafficStrategyData } from "../../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const processTrafficStrategyPdf = async (base64Pdf: string): Promise<TrafficStrategyData> => {
  const model = "gemini-3-flash-preview";
  
  const response = await ai.models.generateContent({
    model,
    contents: [
      {
        parts: [
          {
            inlineData: {
              mimeType: "application/pdf",
              data: base64Pdf,
            },
          },
          {
            text: `Analise o documento de estratégia de tráfego pago em anexo e extraia as informações estruturadas para o dashboard.
            Retorne um JSON seguindo exatamente esta estrutura:
            {
              "kpis": {
                "monthlyBudget": "string (ex: R$ 600)",
                "budgetDetails": "string (ex: R$ 25/dia)",
                "priorityGoal": "string (ex: 5 clientes)",
                "goalDetails": "string",
                "averageTicket": "string (ex: R$ 2.000)",
                "ticketDetails": "string"
              },
              "strategicDecision": {
                "title": "string (ex: Decisão Estratégica)",
                "items": [
                  { "title": "string", "description": "string", "color": "string (ex: brand-dark ou green-500)" }
                ]
              },
              "campaignStructure": {
                "title": "string (ex: Estrutura das Campanhas)",
                "sets": [
                  {
                    "id": "string (ex: Conjunto 1)",
                    "name": "string",
                    "destination": "string",
                    "destinationUrl": "string",
                    "audience": "string",
                    "keywords": ["string"],
                    "preFilledMessage": "string"
                  }
                ]
              },
              "phase2": {
                "title": "string (ex: Fase 2 — Escala)",
                "description": "string",
                "campaigns": [
                  { "title": "string", "areas": "string", "budget": "string" }
                ]
              },
              "alert": {
                "title": "string",
                "message": "string"
              }
            }`,
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          kpis: {
            type: Type.OBJECT,
            properties: {
              monthlyBudget: { type: Type.STRING },
              budgetDetails: { type: Type.STRING },
              priorityGoal: { type: Type.STRING },
              goalDetails: { type: Type.STRING },
              averageTicket: { type: Type.STRING },
              ticketDetails: { type: Type.STRING }
            },
            required: ["monthlyBudget", "budgetDetails", "priorityGoal", "goalDetails", "averageTicket", "ticketDetails"]
          },
          strategicDecision: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              items: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    color: { type: Type.STRING }
                  },
                  required: ["title", "description", "color"]
                }
              }
            },
            required: ["title", "items"]
          },
          campaignStructure: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              sets: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    name: { type: Type.STRING },
                    destination: { type: Type.STRING },
                    destinationUrl: { type: Type.STRING },
                    audience: { type: Type.STRING },
                    keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                    preFilledMessage: { type: Type.STRING }
                  },
                  required: ["id", "name", "destination", "destinationUrl", "audience", "keywords", "preFilledMessage"]
                }
              }
            },
            required: ["title", "sets"]
          },
          phase2: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              campaigns: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    areas: { type: Type.STRING },
                    budget: { type: Type.STRING }
                  },
                  required: ["title", "areas", "budget"]
                }
              }
            },
            required: ["title", "description", "campaigns"]
          },
          alert: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              message: { type: Type.STRING }
            },
            required: ["title", "message"]
          }
        },
        required: ["kpis", "strategicDecision", "campaignStructure", "phase2", "alert"]
      }
    }
  });

  return JSON.parse(response.text);
};
