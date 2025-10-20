'use client'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import CodeEditor from '@/components/CodeEditor'
import { Copy, Download, Maximize2, Eraser } from '@/lib/icons'
import { useTranslations } from '@/hooks/useTranslations'
import { LanguageType } from '@/lib/types'

interface EditorCardProps {
  locale: string
  title: string
  code: string
  language: LanguageType | null
  placeholder: string
  onCodeChange: (value: string | undefined) => void
  onCopy: () => void
  onDownload: () => void
  onClear: () => void
  onModalOpen: () => void
  readOnly?: boolean
  'data-testid'?: string
}

export default function EditorCard({
  locale,
  title,
  code,
  language,
  placeholder,
  onCodeChange,
  onCopy,
  onDownload,
  onClear,
  onModalOpen,
  readOnly = false,
  'data-testid': dataTestId
}: EditorCardProps) {
  const { t } = useTranslations(locale)

  return (
    <Card className="h-full">
      <CardContent className="p-4 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <Label className="text-sm font-medium text-muted-foreground">
            {title}
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onCopy}
              disabled={!code}
              className="h-8 px-2"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDownload}
              disabled={!code}
              className="h-8 px-2"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              disabled={!code}
              className="h-8 px-2"
            >
              <Eraser className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onModalOpen}
              className="h-8 px-2"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 min-h-[300px]">
          <CodeEditor
            value={code}
            onChange={onCodeChange}
            language={language || 'javascript'}
            placeholder={placeholder}
            height="100%"
            readOnly={readOnly}
            data-testid={dataTestId}
          />
        </div>
      </CardContent>
    </Card>
  )
}
