"use client";

import type { AiModel } from "@/lib/constants";
import { ModelCard } from "./model-card";
import { AlertCircle, List } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from 'next/link'

// Props for the ResultsDisplay component
interface ResultsDisplayProps {
    models: AiModel[] // Array of AI models to display
    loading: boolean // Loading state
    error: string | null // Error message, if any
}

// Main component to display AI model results, loading, and error states
export function ResultsDisplay({ models, loading, error }: ResultsDisplayProps) {
    // Show loading skeletons while fetching data
    if (loading) {
        return (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
                {[...Array(3)].map((_, i) => (
                    <CardSkeleton key={i} />
                ))}
            </div>
        )
    }

    // Show error alert if fetching failed
    if (error) {
        return (
            <Alert variant='destructive' className='mt-8'>
                <AlertCircle className='h-4 w-4' />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )
    }

    // Show info alert if no models match the filters
    if (models.length === 0) {
        return (
            <Alert className='mt-8 bg-card/80 backdrop-blur-sm border-accent/20'>
                <List className='h-4 w-4' />
                <AlertTitle className='text-accent'>
                    No matching models
                </AlertTitle>
                <AlertDescription>
                    Try adjusting your filters to find matching AI models.
                </AlertDescription>
            </Alert>
        )
    }

    // Show the list of matching models and a recommendation link
    return (
        <>
            {/* Info about number of models shown */}
            <div className='mb-2 text-sm text-muted-foreground'>
                Showing{' '}
                <span className='font-semibold text-primary'>
                    {models.length}
                </span>{' '}
                model
                {models.length !== 1 && 's'}
            </div>
            {/* Grid of model cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
                {models.map((model) => (
                    <ModelCard key={model.name} model={model} />
                ))}
            </div>
            {/* Recommendation for OpenRouter */}
            <div className='mt-10 flex justify-center'>
                <a
                    href='https://openrouter.ai'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-accent to-primary/80 text-white shadow-lg hover:from-primary hover:to-accent transition-all text-base font-semibold'
                >
                    {/* OpenRouter icon */}
                    <svg
                        width='22'
                        height='22'
                        fill='none'
                        viewBox='0 0 24 24'
                        className='inline-block'
                    >
                        <circle
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            strokeWidth='2'
                        />
                        <path
                            d='M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20'
                            stroke='currentColor'
                            strokeWidth='2'
                        />
                    </svg>
                    <span>
                        For most n8n workflows,{' '}
                        <span className='underline underline-offset-2'>
                            OpenRouter
                        </span>{' '}
                        is recommended for its flexibility in choosing models.
                    </span>
                </a>
            </div>
        </>
    )
}

// Skeleton card shown while loading model data
function CardSkeleton() {
  return (
      <div className='rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-4 animate-pulse'>
          {/* Title skeleton */}
          <div className='h-6 bg-muted rounded w-3/4'></div>
          {/* Subtitle skeleton */}
          <div className='h-4 bg-muted rounded w-1/2'></div>
          {/* Description skeleton */}
          <div className='space-y-2'>
              <div className='h-4 bg-muted rounded w-full'></div>
              <div className='h-4 bg-muted rounded w-5/6'></div>
          </div>
          {/* Price skeleton */}
          <div className='h-4 bg-muted rounded w-1/3'></div>
          {/* Tag skeletons */}
          <div className='flex flex-wrap gap-2'>
              <div className='h-5 w-12 bg-muted rounded-full'></div>
              <div className='h-5 w-16 bg-muted rounded-full'></div>
              <div className='h-5 w-10 bg-muted rounded-full'></div>
          </div>
      </div>
  )
}
