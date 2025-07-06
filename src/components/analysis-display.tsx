import { type AnalyzeSymptomsOutput } from "@/ai/flows/analyze-symptoms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse, ShieldCheck, Pill, Tablet } from "lucide-react";

interface AnalysisDisplayProps {
  analysis: AnalyzeSymptomsOutput;
}

export function AnalysisDisplay({ analysis }: AnalysisDisplayProps) {
  // Simple check to not render empty sections
  const hasPotentialDiseases = analysis.potentialDiseases && analysis.potentialDiseases.trim() !== "";
  const hasPreventionMethods = analysis.preventionMethods && analysis.preventionMethods.trim() !== "";
  const hasTreatmentSuggestions = analysis.treatmentSuggestions && analysis.treatmentSuggestions.trim() !== "";
  const hasSuggestedMedicines = analysis.suggestedMedicines && analysis.suggestedMedicines.trim() !== "";

  return (
    <div className="space-y-8 animate-fade-in">
      {hasPotentialDiseases && (
        <InfoCard
          title="Potential Conditions"
          icon={<HeartPulse className="h-7 w-7 text-primary" />}
          content={analysis.potentialDiseases}
        />
      )}
      {hasPreventionMethods && (
        <InfoCard
          title="Prevention Tips"
          icon={<ShieldCheck className="h-7 w-7 text-primary" />}
          content={analysis.preventionMethods}
        />
      )}
      {hasTreatmentSuggestions && (
        <InfoCard
          title="Treatment Suggestions"
          icon={<Pill className="h-7 w-7 text-primary" />}
          content={analysis.treatmentSuggestions}
        />
      )}
      {hasSuggestedMedicines && (
        <InfoCard
          title="Suggested Medicines"
          icon={<Tablet className="h-7 w-7 text-primary" />}
          content={analysis.suggestedMedicines}
        />
      )}
    </div>
  );
}

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  content: string;
}

function InfoCard({ title, icon, content }: InfoCardProps) {
  return (
    <Card className="w-full shadow-md transition-shadow hover:shadow-lg bg-card/80 border-border/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-4 text-2xl font-bold font-headline text-accent">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-base text-foreground/90 space-y-3 pl-2 border-l-4 border-primary/50 ml-2">
          {content.split('\n').filter(line => line.trim() !== '').map((line, index) => (
            <p key={index} className="leading-relaxed">{line.replace(/^- /, '')}</p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
