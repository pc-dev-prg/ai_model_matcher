
"use client";

import { useState, useEffect, useCallback } from "react";
import { FilterPanel } from "@/components/ai-model-matcher/filter-panel";
import { ResultsDisplay } from "@/components/ai-model-matcher/results-display";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AiModel, Filters, SpecialRequirementsKeys } from "@/lib/constants"; // Import AiModel
import { ALL_OPTIONS_VALUE, SORT_OPTIONS, SPECIAL_REQUIREMENTS_LIST, TOKEN_VOLUME_MAP } from "@/lib/constants";
import { Bot, SortAsc } from "lucide-react";

const initialFilters: Filters = {
  taskType: ALL_OPTIONS_VALUE,
  complexity: ALL_OPTIONS_VALUE,
  budget: "",
  tokenVolume: ALL_OPTIONS_VALUE,
  speed: ALL_OPTIONS_VALUE,
  specialRequirements: SPECIAL_REQUIREMENTS_LIST.reduce((acc, req) => {
    acc[req.id as SpecialRequirementsKeys] = false;
    return acc;
  }, {} as Record<SpecialRequirementsKeys, boolean>),
};

export default function AiModelMatcherPage() {
  const [allModels, setAllModels] = useState<AiModel[]>([]);
  const [filteredModels, setFilteredModels] = useState<AiModel[]>([]);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [sortBy, setSortBy] = useState<string>("input_price"); // Changed default sort order
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModels = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/models.json"); 

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} when fetching models.json`);
        }
        const data: AiModel[] = await response.json(); 
        setAllModels(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch models from models.json. Please ensure 'public/models.json' exists and is correctly formatted.");
        setAllModels([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchModels();
  }, []);

  const applyFiltersAndSort = useCallback(() => {
    let models = [...allModels];

    // Filter by task type
    if (filters.taskType && filters.taskType !== ALL_OPTIONS_VALUE) {
      models = models.filter((model) =>
        model.tags.includes(filters.taskType)
      );
    }

    // Filter by complexity
    if (filters.complexity && filters.complexity !== ALL_OPTIONS_VALUE) {
      models = models.filter((model) =>
        model.tags.includes(filters.complexity)
      );
    }
    
    // Filter by speed
    if (filters.speed && filters.speed !== ALL_OPTIONS_VALUE) {
      models = models.filter((model) =>
        model.tags.includes(filters.speed)
      );
    }

    // Filter by special requirements
    SPECIAL_REQUIREMENTS_LIST.forEach((req) => {
      if (filters.specialRequirements[req.id as SpecialRequirementsKeys]) {
        models = models.filter((model) => model.tags.includes(req.tag));
      }
    });
    
    // Filter by budget
    const budgetValue = parseFloat(filters.budget);
    const tokenVolumeM = filters.tokenVolume === ALL_OPTIONS_VALUE ? undefined : TOKEN_VOLUME_MAP[filters.tokenVolume];

    if (!isNaN(budgetValue) && budgetValue > 0 && tokenVolumeM && tokenVolumeM > 0) {
        models = models.filter(model => {
            const avgPricePerMillionTokens = (model.input_price + model.output_price) / 2;
            if (isNaN(avgPricePerMillionTokens)) return false; 
            const estimatedMonthlyCost = avgPricePerMillionTokens * tokenVolumeM;
            return estimatedMonthlyCost <= budgetValue;
        });
    }

    // Sort models
    models.sort((a, b) => {
      if (sortBy === "input_price") {
        return a.input_price - b.input_price; 
      }
      if (sortBy === "output_price") {
        return a.output_price - b.output_price; 
      }
      return a.name.localeCompare(b.name);
    });

    setFilteredModels(models);
  }, [allModels, filters, sortBy]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [applyFiltersAndSort]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-[hsl(var(--primary)/5%)] to-[hsl(var(--accent)/5%)] text-foreground">
      <header className="py-12 text-center bg-primary/10 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-headline font-bold text-primary flex items-center justify-center">
            <Bot className="mr-4 h-12 w-12" /> AI Model Matcher
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Najděte ten správný AI model pro vaše potřeby.
          </p>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8 space-y-8">
        <FilterPanel filters={filters} setFilters={setFilters} />

        <Card className="shadow-xl bg-card/80 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl font-headline text-primary flex items-center">
              <SortAsc className="mr-2 h-5 w-5" /> Řazení výsledků
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-xs">
              <Label htmlFor="sort-by" className="sr-only">Řadit podle</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort-by" className="w-full bg-input/50 hover:bg-input/70 transition-colors">
                  <SelectValue placeholder="Řadit podle..." />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <ResultsDisplay models={filteredModels} loading={loading} error={error} />
      </main>

      <footer className="py-8 mt-12 text-center border-t border-border/20">
        <p className="text-sm text-muted-foreground">
          Vytvořeno s láskou pomocí AI & Firebase Studio.
        </p>
      </footer>
    </div>
  );
}
