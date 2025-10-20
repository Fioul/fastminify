'use client'

import HomeClientRefactored from '@/components/HomeClientRefactored'

export default function TestRefactoredPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-[1600px] mx-auto px-4 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Test Refactored Components</h1>
          <p className="text-muted-foreground">
            Testing the refactored minification components
          </p>
        </div>
        
        <HomeClientRefactored locale="en" />
      </div>
    </div>
  )
}
