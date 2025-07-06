"use server";

import { analyzeSymptoms, type AnalyzeSymptomsOutput } from "@/ai/flows/analyze-symptoms";
import { z } from "zod";

const symptomsSchema = z.string().min(10, {message: 'Please provide more details about your symptoms.'});

class AiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AiError';
  }
}

export async function handleSymptomAnalysis(symptoms: string): Promise<{ data: AnalyzeSymptomsOutput | null; error: string | null }> {
  const validated = symptomsSchema.safeParse(symptoms);

  if (!validated.success) {
      return { data: null, error: validated.error.errors[0].message };
  }

  try {
    const result = await analyzeSymptoms({ symptoms: validated.data });
    if (!result.potentialDiseases && !result.preventionMethods && !result.treatmentSuggestions) {
      throw new AiError('The AI returned an empty response. Please try rephrasing your symptoms.');
    }
    return { data: result, error: null };
  } catch (error) {
    console.error("Error in AI analysis:", error);
    if (error instanceof AiError) {
        return { data: null, error: error.message };
    }
    return { data: null, error: "An unexpected error occurred. Please try again later." };
  }
}
