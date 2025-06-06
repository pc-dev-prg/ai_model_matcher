"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AiModel } from "@/lib/constants";
import { Globe, DollarSign, Info, Tag, Users } from 'lucide-react'

// Props for the ModelCard component
interface ModelCardProps {
  model: AiModel;
}

// Card component to display a single AI model's details
export function ModelCard({ model }: ModelCardProps) {
  return (
      // Main card container with hover and visual effects
      <Card className='flex flex-col h-full shadow-lg hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 ease-in-out bg-card/90 backdrop-blur-sm border-primary/10 hover:border-primary/30 transform hover:-translate-y-1'>
          {/* Card header: model name, provider, and external link */}
          <CardHeader className='pb-3 flex flex-row items-start justify-between'>
              <div>
                  {/* Model name */}
                  <CardTitle className='text-xl font-headline text-primary flex items-center'>
                      {model.name}
                  </CardTitle>
                  {/* Provider info */}
                  <CardDescription className='flex items-center text-sm text-muted-foreground'>
                      <Users className='mr-2 h-4 w-4' /> {model.provider}
                  </CardDescription>
              </div>
              {/* Optional: external link to model's page */}
              {model.url && (
                  <a
                      href={model.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='ml-2 text-muted-foreground hover:text-primary transition-colors'
                      aria-label='Open model link'
                  >
                      <Globe className='w-5 h-5' />
                  </a>
              )}
          </CardHeader>
          {/* Card content: usage and pricing */}
          <CardContent className='flex-grow space-y-3'>
              {/* Usage description */}
              <div className='flex items-start text-sm'>
                  <Info className='mr-2 h-4 w-4 mt-1 shrink-0 text-accent' />
                  <p className='text-muted-foreground'>{model.usage}</p>
              </div>
              {/* Pricing info */}
              <div className='flex flex-col space-y-1 text-sm'>
                  <div className='flex items-center'>
                      <DollarSign className='mr-2 h-4 w-4 text-green-500' />
                      <span>
                          Input: ${model.input_price.toFixed(2)} / 1M tokens
                      </span>
                  </div>
                  <div className='flex items-center'>
                      <DollarSign className='mr-2 h-4 w-4 text-orange-500' />
                      <span>
                          Output: ${model.output_price.toFixed(2)} / 1M tokens
                      </span>
                  </div>
              </div>
          </CardContent>
          {/* Card footer: tags */}
          <CardFooter>
              <div className='flex flex-wrap gap-2'>
                  {/* Show up to 5 tags as badges */}
                  {model.tags.slice(0, 5).map(
                      (
                          tag, // Show max 5 tags for brevity
                      ) => (
                          <Badge
                              key={tag}
                              variant='secondary'
                              className='text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors'
                          >
                              #{tag}
                          </Badge>
                      ),
                  )}
                  {/* If more than 5 tags, show a "+N more" badge */}
                  {model.tags.length > 5 && (
                      <Badge variant='outline' className='text-xs'>
                          +{model.tags.length - 5} more
                      </Badge>
                  )}
              </div>
          </CardFooter>
      </Card>
  )
}
