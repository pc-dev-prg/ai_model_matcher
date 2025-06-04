'use client'

import { useState, useEffect, useCallback } from 'react'
import { FilterPanel } from '@/components/ai-model-matcher/filter-panel'
import { ResultsDisplay } from '@/components/ai-model-matcher/results-display'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { AiModel, Filters, SpecialRequirementsKeys } from '@/lib/constants'
import {
    ALL_OPTIONS_VALUE,
    SORT_OPTIONS,
    SPECIAL_REQUIREMENTS_LIST,
    TOKEN_VOLUME_MAP,
} from '@/lib/constants'
import { Bot, SortAsc, Github, Linkedin } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

// Initial filter state for the model matcher
const initialFilters: Filters = {
    taskType: ALL_OPTIONS_VALUE,
    complexity: ALL_OPTIONS_VALUE,
    budget: '',
    tokenVolume: ALL_OPTIONS_VALUE,
    speed: ALL_OPTIONS_VALUE,
    specialRequirements: SPECIAL_REQUIREMENTS_LIST.reduce((acc, req) => {
        acc[req.id as SpecialRequirementsKeys] = false
        return acc
    }, {} as Record<SpecialRequirementsKeys, boolean>),
}

export default function AiModelMatcherPage() {
    // State for all models fetched from Supabase
    const [allModels, setAllModels] = useState<AiModel[]>([])
    // State for filtered and sorted models
    const [filteredModels, setFilteredModels] = useState<AiModel[]>([])
    // State for user-selected filters
    const [filters, setFilters] = useState<Filters>(initialFilters)
    // State for sorting option
    const [sortBy, setSortBy] = useState<string>('input_price')
    // Loading and error state for data fetching
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    // State for feedback modal visibility
    const [showFeedback, setShowFeedback] = useState(false)

    // Fetch models from Supabase on mount
    useEffect(() => {
        const fetchModels = async () => {
            setLoading(true)
            setError(null)
            try {
                const { data, error } = await supabase
                    .from('models')
                    .select('*')
                if (error) throw error
                setAllModels(data || [])
            } catch (err: any) {
                setError(
                    err.message ||
                        'Failed to fetch models from Supabase. Please check your table and credentials.',
                )
                setAllModels([])
            } finally {
                setLoading(false)
            }
        }
        fetchModels()
    }, [])

    // Apply filters and sorting to the models
    const applyFiltersAndSort = useCallback(() => {
        let models = [...allModels]

        // Filter by task type
        if (filters.taskType && filters.taskType !== ALL_OPTIONS_VALUE) {
            models = models.filter((model) =>
                model.tags.includes(filters.taskType),
            )
        }

        // Filter by complexity
        if (filters.complexity && filters.complexity !== ALL_OPTIONS_VALUE) {
            models = models.filter((model) =>
                model.tags.includes(filters.complexity),
            )
        }

        // Filter by speed
        if (filters.speed && filters.speed !== ALL_OPTIONS_VALUE) {
            models = models.filter((model) =>
                model.tags.includes(filters.speed),
            )
        }

        // Filter by special requirements
        SPECIAL_REQUIREMENTS_LIST.forEach((req) => {
            if (
                filters.specialRequirements[req.id as SpecialRequirementsKeys]
            ) {
                models = models.filter((model) => model.tags.includes(req.tag))
            }
        })

        // Filter by budget and token volume
        const budgetValue = parseFloat(filters.budget)
        const tokenVolumeM =
            filters.tokenVolume === ALL_OPTIONS_VALUE
                ? undefined
                : TOKEN_VOLUME_MAP[filters.tokenVolume]

        if (
            !isNaN(budgetValue) &&
            budgetValue > 0 &&
            tokenVolumeM &&
            tokenVolumeM > 0
        ) {
            models = models.filter((model) => {
                const avgPricePerMillionTokens =
                    (model.input_price + model.output_price) / 2
                if (isNaN(avgPricePerMillionTokens)) return false
                const estimatedMonthlyCost =
                    avgPricePerMillionTokens * tokenVolumeM
                return estimatedMonthlyCost <= budgetValue
            })
        }

        // Sort models by selected option
        models.sort((a, b) => {
            if (sortBy === 'input_price') {
                return a.input_price - b.input_price
            }
            if (sortBy === 'output_price') {
                return a.output_price - b.output_price
            }
            return a.name.localeCompare(b.name)
        })

        setFilteredModels(models)
    }, [allModels, filters, sortBy])

    // Re-apply filters and sorting when dependencies change
    useEffect(() => {
        applyFiltersAndSort()
    }, [applyFiltersAndSort])

    return (
        <div className='min-h-screen bg-gradient-to-br from-background via-[hsl(var(--primary)/5%)] to-[hsl(var(--accent)/5%)] text-foreground'>
            {/* Header with animated background and navigation */}
            <header className='relative py-8 text-center bg-gradient-to-br from-purple-900/60 via-primary/30 to-accent/20 shadow-lg overflow-hidden rounded-b-3xl border-b-4 border-purple-500/30 mb-8'>
                {/* Animated Glow */}
                <div className='absolute inset-0 pointer-events-none'>
                    <div className='absolute -top-16 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-purple-500/30 blur-3xl animate-pulse-slow rounded-full opacity-70' />
                    <div className='absolute top-0 right-0 w-40 h-40 bg-accent/20 blur-2xl rounded-full opacity-40' />
                    <div className='absolute bottom-0 left-0 w-32 h-32 bg-primary/20 blur-2xl rounded-full opacity-30' />
                </div>
                {/* Header Content */}
                <div className='relative z-10 container mx-auto px-4 py-4 rounded-2xl flex flex-col items-center'>
                    {/* App Title */}
                    <h1 className='text-5xl font-headline font-bold text-primary flex items-center justify-center drop-shadow-lg'>
                        <span className='inline-flex items-center justify-center mr-4 rounded-full p-2 shadow-lg bg-white/10'>
                            <Bot className='h-12 w-12 text-primary' />
                        </span>
                        <span className='bg-gradient-to-tr from-purple-400 via-primary to-accent bg-clip-text text-transparent animate-gradient-x'>
                            AI Model Matcher
                        </span>
                    </h1>
                    {/* Subtitle */}
                    <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto drop-shadow'>
                        Find the{' '}
                        <span className='text-primary font-semibold'>
                            right AI model
                        </span>{' '}
                        for your needs. Filter, compare, and discover the best
                        fit for your n8n project.
                    </p>
                    {/* Link to the model selection guide */}
                    <Link
                        href='/choose-right-model'
                        className='mt-6 inline-flex items-center gap-2 text-primary font-semibold hover:underline transition-colors'
                    >
                        <span>📖</span>
                        <span>How to choose the right model?</span>
                    </Link>
                </div>
            </header>

            {/* Main content area */}
            <main className='container mx-auto p-4 md:p-8 space-y-8'>
                {/* Filter panel for user input */}
                <FilterPanel filters={filters} setFilters={setFilters} />

                {/* Sorting card */}
                <Card className='shadow-xl bg-card/80 backdrop-blur-sm border-primary/20'>
                    <CardHeader>
                        <CardTitle className='text-xl font-headline text-primary flex items-center'>
                            <SortAsc className='mr-2 h-5 w-5' /> Sorting results
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='max-w-xs'>
                            <Label htmlFor='sort-by' className='sr-only'>
                                Sort by
                            </Label>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger
                                    id='sort-by'
                                    className='w-full bg-input/50 hover:bg-input/70 transition-colors'
                                    aria-label='Sort by...'
                                >
                                    <SelectValue placeholder='Řadit podle...' />
                                </SelectTrigger>
                                <SelectContent>
                                    {SORT_OPTIONS.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Display filtered and sorted models */}
                <ResultsDisplay
                    models={filteredModels}
                    loading={loading}
                    error={error}
                />
            </main>

            {/* Footer with author, social links, and feedback modal */}
            <footer className='py-8 mt-12 text-center border-t border-border/20'>
                <div className='flex flex-col items-center gap-2'>
                    <p className='text-sm text-muted-foreground'>
                        <a
                            href='https://petr.cafourek.online'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='hover:underline text-primary'
                        >
                            Petr Cafourek 2025
                        </a>
                    </p>
                    <div className='flex gap-4 mb-4'>
                        <a
                            href='https://github.com/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors'
                            aria-label='GitHub'
                        >
                            <Github className='w-5 h-5' />
                            <span className='sr-only'>GitHub</span>
                        </a>
                        <a
                            href='https://www.linkedin.com/in/petr-cafourek-53875079/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors'
                            aria-label='LinkedIn'
                        >
                            <Linkedin className='w-5 h-5' />
                            <span className='sr-only'>LinkedIn</span>
                        </a>
                    </div>
                    {/* Feedback button opens modal */}
                    <button
                        onClick={() => setShowFeedback(true)}
                        className='px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 transition-colors font-semibold shadow'
                    >
                        Feedback
                    </button>
                </div>
                {/* Feedback modal */}
                {showFeedback && (
                    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
                        <div className='bg-white dark:bg-background rounded-xl shadow-xl max-w-2xl w-full p-4 relative'>
                            <button
                                onClick={() => setShowFeedback(false)}
                                className='absolute top-2 right-2 text-xl text-muted-foreground hover:text-primary'
                                aria-label='Close'
                            >
                                ×
                            </button>
                            <iframe
                                src='https://n8n.cafourek.online/form/4aa5846e-2198-44ee-bf0b-e93d70e49414'
                                title='Feedback Form'
                                className='w-full h-[650px] rounded-lg border-0'
                                allow='clipboard-write'
                            />
                        </div>
                    </div>
                )}
            </footer>
        </div>
    )
}
