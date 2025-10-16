'use client'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import CodeEditor from '@/components/CodeEditor'
import { useTranslations } from '@/hooks/useTranslations'

interface EditorSectionProps {
  locale: string
  leftCode: string
  rightCode: string
  leftType: 'js' | 'css' | 'json' | 'php'
  rightType: 'js' | 'css' | 'json' | 'php'
  stats: { original: number; result: number } | null
  lastOperation: 'minify' | 'unminify' | null
  onLeftCodeChange: (value: string | undefined) => void
  onRightCodeChange: (value: string | undefined) => void
  onCopy: () => void
  onDownload: () => void
}

export default function EditorSection({
  locale,
  leftCode,
  rightCode,
  leftType,
  rightType,
  stats,
  lastOperation,
  onLeftCodeChange,
  onRightCodeChange,
  onCopy,
  onDownload,
}: EditorSectionProps) {
  const { t } = useTranslations(locale)

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} kB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  const calculateCompressionPercentage = () => {
    if (!stats) return 0
    if (stats.result < stats.original) {
      return Number(((1 - stats.result / stats.original) * 100).toFixed(1))
    }
    if (stats.result > stats.original) {
      return Number(((stats.result / stats.original - 1) * 100).toFixed(1))
    }
    return 0
  }

  const getCompressionText = () => {
    if (!stats) return ''
    if (stats.result < stats.original) {
      return `Compressed: ${((1 - stats.result / stats.original) * 100).toFixed(1)}%`
    }
    if (stats.result > stats.original) {
      return `Expanded: ${((stats.result / stats.original - 1) * 100).toFixed(1)}%`
    }
    return 'No change'
  }

  const getCompressionColor = () => {
    if (!stats) return 'text-muted-foreground'
    if (stats.result < stats.original) return 'text-green-600'
    if (stats.result > stats.original) return 'text-blue-600'
    return 'text-muted-foreground'
  }

  const getSavedSize = () => {
    if (!stats) return ''
    if (stats.result < stats.original) {
      const saved = stats.original - stats.result
      return `Saved: ${formatFileSize(saved)}`
    }
    if (stats.result > stats.original) {
      const added = stats.result - stats.original
      return `Added: ${formatFileSize(added)}`
    }
    return ''
  }

  const ResultBox = ({ operation }: { operation: 'minify' | 'unminify' }) => {
    if (!stats || lastOperation !== operation) return null

    return (
      <Card className="border mt-4">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="font-semibold text-sm mb-2">
                {operation === 'minify' ? 'Minification Result' : 'Unminification Result'}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Input:</span>
                <span className="ml-1 font-medium">{stats.original} chars</span>
                <div className="text-muted-foreground/80 text-xs">
                  {formatFileSize(stats.original)}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Output:</span>
                <span className="ml-1 font-medium">{stats.result} chars</span>
                <div className="text-muted-foreground/80 text-xs">
                  {formatFileSize(stats.result)}
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className={`font-bold text-base ${getCompressionColor()}`}>
                {getCompressionText()}
              </div>
              <div className="text-muted-foreground text-sm mt-1">
                {getSavedSize()}
              </div>
              <Progress
                value={calculateCompressionPercentage()}
                className="h-2 mt-3"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={onCopy} className="flex-1" size="sm">
                Copy Output
              </Button>
              <Button variant="outline" onClick={onDownload} className="flex-1" size="sm">
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* LEFT EDITOR */}
      <div>
        <div className="h-[270px] flex flex-col">
          <Label className="text-sm font-medium mb-2">{t('common.normalCode')}</Label>
          <CodeEditor
            value={leftCode}
            onChange={onLeftCodeChange}
            language={leftType === 'js' ? 'javascript' : 
                     leftType === 'css' ? 'css' : 
                     leftType === 'json' ? 'json' : 'javascript'}
            placeholder={t('placeholders.normalCode')}
            height="100%"
          />
        </div>
        
        <ResultBox operation="unminify" />
      </div>

      {/* RIGHT EDITOR */}
      <div>
        <div className="h-[270px] flex flex-col">
          <Label className="text-sm font-medium mb-2">{t('common.minifiedCode')}</Label>
          <CodeEditor
            value={rightCode}
            onChange={onRightCodeChange}
            language={rightType === 'js' ? 'javascript' : 
                     rightType === 'css' ? 'css' : 
                     rightType === 'json' ? 'json' : 'javascript'}
            placeholder={t('placeholders.minifiedCode')}
            height="100%"
          />
        </div>
        
        <ResultBox operation="minify" />
      </div>
    </div>
  )
}
