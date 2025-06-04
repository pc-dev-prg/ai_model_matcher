import fs from "fs";
import path from "path";
import { marked } from "marked";
import Link from "next/link";

// Enable static rendering for this page
export const dynamic = "force-static";

// Page component for the "How to Choose the Right AI Model?" guide
export default async function ChooseRightModelPage() {
    // Read the markdown file from the public directory
    const filePath = path.join(process.cwd(), 'public', 'choose_right_model.md')
    const fileContent = fs.readFileSync(filePath, 'utf8')
    // Convert markdown content to HTML
    const htmlContent = marked.parse(fileContent)

    return (
        // Main wrapper with background and text color
        <div className='min-h-screen bg-gradient-to-br from-background via-[hsl(var(--primary)/5%)] to-[hsl(var(--accent)/5%)] text-foreground flex flex-col'>
            {/* Header with animated background and navigation */}
            <header className='relative py-8 text-center bg-gradient-to-br from-purple-900/60 via-primary/30 to-accent/20 shadow-lg overflow-hidden rounded-b-3xl border-b-4 border-purple-500/30 mb-8'>
                {/* Animated background glow effects */}
                <div className='absolute inset-0 pointer-events-none'>
                    <div className='absolute -top-16 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-purple-500/30 blur-3xl animate-pulse-slow rounded-full opacity-70' />
                    <div className='absolute top-0 right-0 w-40 h-40 bg-accent/20 blur-2xl rounded-full opacity-40' />
                    <div className='absolute bottom-0 left-0 w-32 h-32 bg-primary/20 blur-2xl rounded-full opacity-30' />
                </div>
                {/* Header content: title, subtitle, and navigation */}
                <div className='relative z-10 container mx-auto px-4 py-4 rounded-2xl flex flex-col items-center'>
                    <h1 className='text-4xl font-headline font-bold text-primary flex items-center justify-center drop-shadow-lg'>
                        How to Choose the Right AI Model?
                    </h1>
                    <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto drop-shadow'>
                        Practical guide for picking the best AI model for your
                        n8n workflow.
                    </p>
                    {/* Back to homepage button */}
                    <div className='flex flex-col md:flex-row gap-4 mt-6'>
                        <Link
                            href='/'
                            className='inline-flex items-center gap-2 text-primary font-semibold hover:underline transition-colors'
                        >
                            <span>←</span>
                            <span>Back to homepage</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content: Rendered markdown article */}
            <main className='container mx-auto p-4 md:p-8 flex-1'>
                <article
                    className='prose prose-base max-w-5xl mx-auto rounded-xl p-4
    prose-headings:text-purple-600
    prose-strong:text-primary
    prose-code:text-accent
    prose-a:text-accent
    prose-blockquote:border-accent
    prose-invert:prose-invert
    dark:prose-headings:text-purple-400
    dark:prose-strong:text-primary
    dark:prose-code:text-accent
    dark:prose-a:text-accent
    dark:prose-blockquote:border-accent
    dark:text-white text-zinc-900'
                    // Render HTML from markdown safely
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
            </main>

            {/* Footer with author info and social links */}
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
                    {/* Social links */}
                    <div className='flex gap-4 mb-4'>
                        <a
                            href='https://github.com/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors'
                            aria-label='GitHub'
                        >
                            <svg
                                className='w-5 h-5'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M12 2C6.477 2 2 6.477 2 12c0 4.418 2.867 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.842-2.338 4.687-4.566 4.936.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.577.688.48C19.135 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z'
                                />
                            </svg>
                            <span className='sr-only'>GitHub</span>
                        </a>
                        <a
                            href='https://www.linkedin.com/in/petr-cafourek-53875079/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors'
                            aria-label='LinkedIn'
                        >
                            <svg
                                className='w-5 h-5'
                                fill='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path d='M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm15.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z' />
                            </svg>
                            <span className='sr-only'>LinkedIn</span>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    )
}