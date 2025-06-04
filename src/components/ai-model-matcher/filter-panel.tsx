'use client'

import type { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import type { Filters, Option } from '@/lib/constants'
import {
    TASK_TYPE_OPTIONS,
    COMPLEXITY_OPTIONS,
    TOKEN_VOLUME_OPTIONS,
    SPEED_OPTIONS,
    SPECIAL_REQUIREMENTS_LIST,
    type SpecialRequirementsKeys,
} from '@/lib/constants'
import {
    BadgeHelp,
    Cog,
    Zap,
    BarChart3,
    FileText,
    Code2 as CodeIcon,
    Search,
    SlidersHorizontal,
    DollarSign,
    Clock,
    Aperture,
    StretchHorizontal,
    Languages,
    ShieldCheck,
} from 'lucide-react'

// Props for the FilterPanel component
interface FilterPanelProps {
    filters: Filters
    setFilters: Dispatch<SetStateAction<Filters>>
}

// Helper function to render an icon based on a string hint
const renderIcon = (hint: string) => {
    if (hint.includes('image') || hint.includes('video'))
        return <Aperture className='mr-2 h-4 w-4 text-accent' />
    if (hint.includes('text') || hint.includes('layers'))
        return <StretchHorizontal className='mr-2 h-4 w-4 text-accent' />
    if (hint.includes('language') || hint.includes('flag'))
        return <Languages className='mr-2 h-4 w-4 text-accent' />
    if (hint.includes('code') || hint.includes('brackets'))
        return <CodeIcon className='mr-2 h-4 w-4 text-accent' />
    if (hint.includes('shield') || hint.includes('lock'))
        return <ShieldCheck className='mr-2 h-4 w-4 text-accent' />
    if (hint.includes('clock') || hint.includes('graph'))
        return <Clock className='mr-2 h-4 w-4 text-accent' />
    return <BadgeHelp className='mr-2 h-4 w-4 text-muted-foreground' />
}

// Main filter panel component for model filtering UI
export function FilterPanel({ filters, setFilters }: FilterPanelProps) {
    // Handle input changes for text/number fields
    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target
        setFilters((prev) => ({ ...prev, [name]: value }))
    }

    // Handle select dropdown changes
    const handleSelectChange = (name: keyof Filters) => (value: string) => {
        setFilters((prev) => ({ ...prev, [name]: value }))
    }

    // Handle checkbox changes for special requirements
    const handleCheckboxChange =
        (name: SpecialRequirementsKeys) => (checked: boolean) => {
            setFilters((prev) => ({
                ...prev,
                specialRequirements: {
                    ...prev.specialRequirements,
                    [name]: checked,
                },
            }))
        }

    // Helper to render a select dropdown with label and icon
    const renderSelect = (
        id: keyof Filters,
        label: string,
        options: Option[],
        placeholder: string,
        IconComponent?: React.ElementType,
    ) => (
        <div className='space-y-2'>
            <Label
                htmlFor={id}
                className='flex items-center text-sm font-medium'
            >
                {IconComponent && (
                    <IconComponent className='mr-2 h-4 w-4 text-accent' />
                )}{' '}
                {label}
            </Label>
            <Select
                name={id}
                value={filters[id] as string}
                onValueChange={handleSelectChange(id)}
            >
                <SelectTrigger
                    id={id}
                    className='w-full bg-input/50 hover:bg-input/70 transition-colors'
                >
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
    )

    return (
        // Card container for the filter panel
        <Card className='shadow-xl bg-card/80 backdrop-blur-sm border-primary/20'>
            <CardHeader>
                <CardTitle className='text-2xl font-headline text-primary flex items-center'>
                    <SlidersHorizontal className='mr-2 h-6 w-6' /> Model Filters
                </CardTitle>
            </CardHeader>
            <CardContent className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {/* Task type filter */}
                {renderSelect(
                    'taskType',
                    'Task Type',
                    TASK_TYPE_OPTIONS,
                    'Select task type',
                    Cog,
                )}
                {/* Task complexity filter */}
                {renderSelect(
                    'complexity',
                    'Task Complexity',
                    COMPLEXITY_OPTIONS,
                    'Select complexity',
                    Zap,
                )}

                {/* Budget input */}
                <div className='space-y-2'>
                    <Label
                        htmlFor='budget'
                        className='flex items-center text-sm font-medium'
                    >
                        <DollarSign className='mr-2 h-4 w-4 text-accent' />{' '}
                        Budget (USD/month)
                    </Label>
                    <Input
                        id='budget'
                        name='budget'
                        type='number'
                        placeholder='e.g., 50'
                        value={filters.budget}
                        onChange={handleInputChange}
                        className='w-full bg-input/50 hover:bg-input/70 transition-colors'
                        min='0'
                    />
                </div>

                {/* Token volume filter */}
                {renderSelect(
                    'tokenVolume',
                    'Expected Token Volume',
                    TOKEN_VOLUME_OPTIONS,
                    'Select volume',
                    BarChart3,
                )}
                {/* Speed filter */}
                {renderSelect(
                    'speed',
                    'Required Speed',
                    SPEED_OPTIONS,
                    'Select speed',
                    Clock,
                )}

                {/* Special requirements checkboxes */}
                <div className='md:col-span-2 lg:col-span-3 space-y-4'>
                    <Label className='text-sm font-medium flex items-center'>
                        <FileText className='mr-2 h-4 w-4 text-accent' />{' '}
                        Special Requirements
                    </Label>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3'>
                        {SPECIAL_REQUIREMENTS_LIST.map((req) => (
                            <div
                                key={req.id}
                                className='flex items-center space-x-2'
                            >
                                <Checkbox
                                    id={req.id}
                                    checked={
                                        filters.specialRequirements[
                                            req.id as SpecialRequirementsKeys
                                        ]
                                    }
                                    onCheckedChange={handleCheckboxChange(
                                        req.id as SpecialRequirementsKeys,
                                    )}
                                />
                                <Label
                                    htmlFor={req.id}
                                    className='text-sm font-normal flex items-center cursor-pointer'
                                >
                                    {renderIcon(req.iconHint)}
                                    {req.label}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
