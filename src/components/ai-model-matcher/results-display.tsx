"use client";

import type { AiModel } from "@/lib/constants";
import { ModelCard } from "./model-card";
import { AlertCircle, List } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ResultsDisplayProps {
  models: AiModel[];
  loading: boolean;
  error: string | null;
}

export function ResultsDisplay({ models, loading, error }: ResultsDisplayProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {[...Array(3)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mt-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Chyba</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (models.length === 0) {
    return (
      <Alert className="mt-8 bg-card/80 backdrop-blur-sm border-accent/20">
        <List className="h-4 w-4" />
        <AlertTitle className="text-accent">Žádné modely nevyhovují</AlertTitle>
        <AlertDescription>
          Zkuste upravit filtry pro nalezení odpovídajících AI modelů.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {models.map((model) => (
        <ModelCard key={model.name} model={model} />
      ))}
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-4 animate-pulse">
      <div className="h-6 bg-muted rounded w-3/4"></div>
      <div className="h-4 bg-muted rounded w-1/2"></div>
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
      </div>
      <div className="h-4 bg-muted rounded w-1/3"></div>
      <div className="flex flex-wrap gap-2">
        <div className="h-5 w-12 bg-muted rounded-full"></div>
        <div className="h-5 w-16 bg-muted rounded-full"></div>
        <div className="h-5 w-10 bg-muted rounded-full"></div>
      </div>
    </div>
  );
}
