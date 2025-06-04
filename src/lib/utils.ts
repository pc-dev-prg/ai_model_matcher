// Import clsx for conditional className joining and its type
import { clsx, type ClassValue } from 'clsx'
// Import twMerge to intelligently merge Tailwind CSS classes
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to combine class names conditionally and merge Tailwind CSS classes.
 * @param inputs - Any number of class name values (strings, arrays, objects)
 * @returns A single merged className string
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
