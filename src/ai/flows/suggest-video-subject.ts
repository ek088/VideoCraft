'use server';

/**
 * @fileOverview Suggests video subject ideas using a generative AI model.
 *
 * - suggestVideoSubject - A function that generates video subject suggestions.
 * - SuggestVideoSubjectInput - The input type for the suggestVideoSubject function.
 * - SuggestVideoSubjectOutput - The return type for the suggestVideoSubject function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestVideoSubjectInputSchema = z.object({
  topic: z.string().describe('The general topic for which video subject ideas are needed.'),
});
export type SuggestVideoSubjectInput = z.infer<typeof SuggestVideoSubjectInputSchema>;

const SuggestVideoSubjectOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('An array of suggested video subjects.'),
});
export type SuggestVideoSubjectOutput = z.infer<typeof SuggestVideoSubjectOutputSchema>;

export async function suggestVideoSubject(input: SuggestVideoSubjectInput): Promise<SuggestVideoSubjectOutput> {
  return suggestVideoSubjectFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestVideoSubjectPrompt',
  input: {schema: SuggestVideoSubjectInputSchema},
  output: {schema: SuggestVideoSubjectOutputSchema},
  prompt: `You are a creative video content creator. Given the following topic, generate 5 video subject ideas. Return them as a JSON array.\n\nTopic: {{{topic}}}`,
});

const suggestVideoSubjectFlow = ai.defineFlow(
  {
    name: 'suggestVideoSubjectFlow',
    inputSchema: SuggestVideoSubjectInputSchema,
    outputSchema: SuggestVideoSubjectOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
