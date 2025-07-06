'use server';

/**
 * @fileOverview An AI agent that analyzes symptoms and health data to identify potential diseases.
 *
 * - analyzeSymptoms - A function that handles the symptom analysis process.
 * - AnalyzeSymptomsInput - The input type for the analyzeSymptoms function.
 * - AnalyzeSymptomsOutput - The return type for the analyzeSymptoms function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSymptomsInputSchema = z.object({
  symptoms: z
    .string()
    .describe('A description of symptoms and health data provided by the user.'),
});
export type AnalyzeSymptomsInput = z.infer<typeof AnalyzeSymptomsInputSchema>;

const AnalyzeSymptomsOutputSchema = z.object({
  potentialDiseases: z
    .string()
    .describe('A list of potential diseases based on the symptoms provided.'),
  preventionMethods: z
    .string()
    .describe('Methods to prevent the potential diseases.'),
  treatmentSuggestions: z
    .string()
    .describe('Suggestions for treating the potential diseases.'),
});
export type AnalyzeSymptomsOutput = z.infer<typeof AnalyzeSymptomsOutputSchema>;

export async function analyzeSymptoms(input: AnalyzeSymptomsInput): Promise<AnalyzeSymptomsOutput> {
  return analyzeSymptomsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSymptomsPrompt',
  input: {schema: AnalyzeSymptomsInputSchema},
  output: {schema: AnalyzeSymptomsOutputSchema},
  prompt: `You are a medical expert specializing in disease diagnosis and prevention.

You will analyze the symptoms and health data provided by the user and identify potential diseases.
You will also provide methods to prevent these diseases and suggest possible treatment options.

Symptoms and Health Data: {{{symptoms}}}`,
});

const analyzeSymptomsFlow = ai.defineFlow(
  {
    name: 'analyzeSymptomsFlow',
    inputSchema: AnalyzeSymptomsInputSchema,
    outputSchema: AnalyzeSymptomsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
