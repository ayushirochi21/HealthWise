'use server';

/**
 * @fileOverview A flow to provide prevention guidance for a potential disease.
 *
 * - getPreventionGuidance - A function that takes a disease name and returns prevention guidance.
 * - GetPreventionGuidanceInput - The input type for the getPreventionGuidance function.
 * - GetPreventionGuidanceOutput - The return type for the getPreventionGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetPreventionGuidanceInputSchema = z.object({
  diseaseName: z.string().describe('The name of the disease.'),
});
export type GetPreventionGuidanceInput = z.infer<typeof GetPreventionGuidanceInputSchema>;

const GetPreventionGuidanceOutputSchema = z.object({
  preventionGuidance: z.string().describe('Guidance on how to prevent the disease.'),
});
export type GetPreventionGuidanceOutput = z.infer<typeof GetPreventionGuidanceOutputSchema>;

export async function getPreventionGuidance(input: GetPreventionGuidanceInput): Promise<GetPreventionGuidanceOutput> {
  return getPreventionGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getPreventionGuidancePrompt',
  input: {schema: GetPreventionGuidanceInputSchema},
  output: {schema: GetPreventionGuidanceOutputSchema},
  prompt: `You are a medical expert. Provide guidance on how to prevent the following disease:

Disease: {{{diseaseName}}}

Prevention Guidance:`,
});

const getPreventionGuidanceFlow = ai.defineFlow(
  {
    name: 'getPreventionGuidanceFlow',
    inputSchema: GetPreventionGuidanceInputSchema,
    outputSchema: GetPreventionGuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
