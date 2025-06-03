
"use client";

import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import type { Filters, Option } from "@/lib/constants";
import {
  TASK_TYPE_OPTIONS,
  COMPLEXITY_OPTIONS,
  TOKEN_VOLUME_OPTIONS,
  SPEED_OPTIONS,
  SPECIAL_REQUIREMENTS_LIST,
  type SpecialRequirementsKeys,
} from "@/lib/constants";
import { BadgeHelp, Cog, Zap, BarChart3, FileText, Code2 as CodeIcon, Search, SlidersHorizontal, DollarSign, Clock, Aperture, StretchHorizontal, Languages, ShieldCheck } from "lucide-react";


interface FilterPanelProps {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
}

const renderIcon = (hint: string) => {
  if (hint.includes("image") || hint.includes("video")) return <Aperture className="mr-2 h-4 w-4 text-accent" />;
  if (hint.includes("text") || hint.includes("layers")) return <StretchHorizontal className="mr-2 h-4 w-4 text-accent" />;
  if (hint.includes("language") || hint.includes("flag")) return <Languages className="mr-2 h-4 w-4 text-accent" />;
  if (hint.includes("code") || hint.includes("brackets")) return <CodeIcon className="mr-2 h-4 w-4 text-accent" />;
  if (hint.includes("shield") || hint.includes("lock")) return <ShieldCheck className="mr-2 h-4 w-4 text-accent" />;
  if (hint.includes("clock") || hint.includes("graph")) return <Clock className="mr-2 h-4 w-4 text-accent" />;
  return <BadgeHelp className="mr-2 h-4 w-4 text-muted-foreground" />;
};


export function FilterPanel({ filters, setFilters }: FilterPanelProps) {
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof Filters) => (value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: SpecialRequirementsKeys) => (checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      specialRequirements: {
        ...prev.specialRequirements,
        [name]: checked,
      },
    }));
  };

  const renderSelect = (
    id: keyof Filters,
    label: string,
    options: Option[],
    placeholder: string,
    IconComponent?: React.ElementType
  ) => (
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center text-sm font-medium">
       {IconComponent && <IconComponent className="mr-2 h-4 w-4 text-accent" />} {label}
      </Label>
      <Select
        name={id}
        value={filters[id] as string}
        onValueChange={handleSelectChange(id)}
      >
        <SelectTrigger id={id} className="w-full bg-input/50 hover:bg-input/70 transition-colors">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <Card className="shadow-xl bg-card/80 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-primary flex items-center">
          <SlidersHorizontal className="mr-2 h-6 w-6" /> Model Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderSelect("taskType", "Task Type", TASK_TYPE_OPTIONS, "Select task type", Cog)}
        {renderSelect("complexity", "Task Complexity", COMPLEXITY_OPTIONS, "Select complexity", Zap)}

        <div className="space-y-2">
          <Label htmlFor="budget" className="flex items-center text-sm font-medium">
            <DollarSign className="mr-2 h-4 w-4 text-accent" /> Budget (USD/month)
          </Label>
          <Input
            id="budget"
            name="budget"
            type="number"
            placeholder="e.g., 50"
            value={filters.budget}
            onChange={handleInputChange}
            className="w-full bg-input/50 hover:bg-input/70 transition-colors"
            min="0"
          />
        </div>

        {renderSelect("tokenVolume", "Expected Token Volume", TOKEN_VOLUME_OPTIONS, "Select volume", BarChart3)}
        {renderSelect("speed", "Required Speed", SPEED_OPTIONS, "Select speed", Clock)}

        <div className="md:col-span-2 lg:col-span-3 space-y-4">
          <Label className="text-sm font-medium flex items-center">
             <FileText className="mr-2 h-4 w-4 text-accent" /> Special Requirements
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
            {SPECIAL_REQUIREMENTS_LIST.map((req) => (
              <div key={req.id} className="flex items-center space-x-2">
                <Checkbox
                  id={req.id}
                  checked={filters.specialRequirements[req.id as SpecialRequirementsKeys]}
                  onCheckedChange={handleCheckboxChange(req.id as SpecialRequirementsKeys)}
                />
                <Label htmlFor={req.id} className="text-sm font-normal flex items-center cursor-pointer">
                  {renderIcon(req.iconHint)}
                  {req.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
