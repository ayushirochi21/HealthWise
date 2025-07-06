"use client";

import { useState } from "react";
import { SymptomForm } from "@/components/symptom-form";
import { AnalysisDisplay } from "@/components/analysis-display";
import { type AnalyzeSymptomsOutput } from "@/ai/flows/analyze-symptoms";
import { Logo } from "@/components/logo";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Lightbulb } from "lucide-react";

export default function Home() {
  const [analysis, setAnalysis] = useState<AnalyzeSymptomsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-500">
      <header className="sticky top-0 z-10 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Logo className="h-10 w-10 text-accent" />
            <h1 className="text-2xl font-bold font-headline text-accent">
              HealthWise AI
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-10">
              <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl font-headline text-accent">
                Your Personal Health Companion
              </p>
              <p className="mt-4 max-w-2xl mx-auto text-lg leading-8 text-muted-foreground">
                Describe your symptoms, and our AI will provide potential insights. 
                This tool is for informational purposes only.
              </p>
            </div>
            
            <Card className="p-6 sm:p-8 shadow-lg">
              <CardContent className="p-0">
                <SymptomForm setAnalysis={setAnalysis} setLoading={setIsLoading} isLoading={isLoading} />
              </CardContent>
            </Card>

            <div className="mt-10">
              {isLoading && <LoadingIndicator />}
              {analysis && !isLoading && <AnalysisDisplay analysis={analysis} />}
              {!analysis && !isLoading && <Disclaimer />}
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground border-t">
        @Ayushi Varshney
      </footer>
    </div>
  );
}

const LoadingIndicator = () => (
    <div className="flex flex-col items-center justify-center text-center text-muted-foreground animate-fade-in">
        <Lightbulb className="h-12 w-12 mb-4 animate-pulse text-primary"/>
        <p className="text-lg font-semibold">Analyzing your symptoms...</p>
        <p>Our AI is processing your information. This may take a moment.</p>
    </div>
);

const Disclaimer = () => (
  <Card className="bg-primary/10 border-primary/20 animate-fade-in">
    <CardContent className="p-6">
      <div className="flex items-start gap-4">
        <AlertTriangle className="h-8 w-8 text-destructive/80 mt-1"/>
        <div>
          <h3 className="text-lg font-semibold text-accent">Important Disclaimer</h3>
          <p className="text-muted-foreground mt-1">
            HealthWise AI provides information for educational purposes and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);
