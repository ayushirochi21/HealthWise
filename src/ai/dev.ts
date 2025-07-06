import { config } from 'dotenv';
config();

import '@/ai/flows/prevention-guidance.ts';
import '@/ai/flows/treatment-suggestions.ts';
import '@/ai/flows/analyze-symptoms.ts';