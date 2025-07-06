"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { handleSymptomAnalysis } from "@/app/actions";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { type AnalyzeSymptomsOutput } from "@/ai/flows/analyze-symptoms";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  symptoms: z.string().min(10, {
    message: "Please describe your symptoms in at least 10 characters.",
  }),
});

interface SymptomFormProps {
  setAnalysis: (analysis: AnalyzeSymptomsOutput | null) => void;
  setLoading: (loading: boolean) => void;
  isLoading: boolean;
}

export function SymptomForm({ setAnalysis, setLoading, isLoading }: SymptomFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setAnalysis(null);
    
    const result = await handleSymptomAnalysis(values.symptoms);

    if (result.error) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: result.error,
      });
      setAnalysis(null);
    } else {
      setAnalysis(result.data);
    }
    
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="symptoms"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="e.g., I have a high fever, a persistent cough, and I'm feeling very tired..."
                  className="resize-none h-40 text-base shadow-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-lg py-6" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze Symptoms"
          )}
        </Button>
      </form>
    </Form>
  );
}
