'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing treatment suggestions based on identified diseases.
 *
 * - treatmentSuggestions - A function that takes a disease name as input and returns possible treatment options.
 * - TreatmentSuggestionsInput - The input type for the treatmentSuggestions function.
 * - TreatmentSuggestionsOutput - The return type for the treatmentSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TreatmentSuggestionsInputSchema = z.object({
  diseaseName: z.string().describe('The name of the identified disease.'),
});
export type TreatmentSuggestionsInput = z.infer<typeof TreatmentSuggestionsInputSchema>;

const TreatmentSuggestionsOutputSchema = z.object({
  treatmentOptions: z
    .string()
    .describe('A list of possible treatment options for the identified disease.'),
});
export type TreatmentSuggestionsOutput = z.infer<typeof TreatmentSuggestionsOutputSchema>;

export async function treatmentSuggestions(input: TreatmentSuggestionsInput): Promise<TreatmentSuggestionsOutput> {
  return treatmentSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'treatmentSuggestionsPrompt',
  input: {schema: TreatmentSuggestionsInputSchema},
  output: {schema: TreatmentSuggestionsOutputSchema},
  prompt: `You are a medical expert. Provide possible treatment options for the following disease:

Disease: {{{diseaseName}}}

Treatment Options:`,
});

const treatmentSuggestionsFlow = ai.defineFlow(
  {
    name: 'treatmentSuggestionsFlow',
    inputSchema: TreatmentSuggestionsInputSchema,
    outputSchema: TreatmentSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
