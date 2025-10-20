'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Copy, Download, Check } from '@/lib/icons'
import { useTranslations } from '@/hooks/useTranslations'

interface ResultDisplayProps {
  result: string
  isProcessing: boolean
  copied: boolean
  onCopy: () => void
  onDownload: () => void
  fileType: 'js' | 'css'
}

export default function ResultDisplay({
  result,
  isProcessing,
  copied,
  onCopy,
  onDownload,
  fileType,
}: ResultDisplayProps) {
  const { t } = useTranslations('en') // Default to English for now

  if (isProcessing) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                {t('concat.processing')}
              </h3>
              <p className="text-muted-foreground text-sm">
                {t('concat.processingDescription')}
              </p>
            </div>
            <Progress value={undefined} className="h-2" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!result) {
    return null
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">
            {t('concat.result')}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onCopy}
              className="h-8 px-3"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  {t('common.copied')}
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  {t('common.copy')}
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onDownload}
              className="h-8 px-3"
            >
              <Download className="h-4 w-4 mr-2" />
              {t('common.download')}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-muted rounded-md p-4 max-h-96 overflow-y-auto">
          <pre className="text-sm whitespace-pre-wrap break-words">
            {result}
          </pre>
        </div>
        <div className="mt-3 text-xs text-muted-foreground">
          {t('concat.resultSize', { size: result.length })}
        </div>
      </CardContent>
    </Card>
  )
}
