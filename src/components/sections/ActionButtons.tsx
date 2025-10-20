'use client'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Play, Undo2, Sparkles } from '@/lib/icons'
import { useTranslations } from '@/hooks/useTranslations'
import { Stats } from '@/lib/types'

interface ActionButtonsProps {
  locale: string
  stats: Stats | null
  lastOperation: 'minify' | 'unminify' | null
  isLoading: boolean
  onMinify: () => void
  onUnminify: () => void
  onBeautify: () => void
  leftCode: string
  rightCode: string
  leftType: string | null
  rightType: string | null
}

export default function ActionButtons({
  locale,
  stats,
  lastOperation,
  isLoading,
  onMinify,
  onUnminify,
  onBeautify,
  leftCode,
  rightCode,
  leftType,
  rightType
}: ActionButtonsProps) {
  const { t } = useTranslations(locale)

  const getCompressionColor = () => {
    if (!stats) return 'text-muted-foreground'
    if (stats.result < stats.original) return 'text-green-600'
    if (stats.result > stats.original) return 'text-blue-600'
    return 'text-muted-foreground'
  }

  const isBeautifyEnabled = () => {
    if (!leftCode.trim()) return false
    return leftType === 'js' || leftType === 'css' || leftType === 'json' || leftType === 'php'
  }

  const getMinifyButtonText = () => {
    return leftType === 'php' ? t('common.serialize') : t('common.minify')
  }

  const getMinifyButtonTitle = () => {
    return leftType === 'php' ? t('common.serializeCode') : t('common.minifyCode')
  }

  const getUnminifyButtonText = () => {
    return rightType === 'php' ? t('common.unserialize') : t('common.unminify')
  }

  const getUnminifyButtonTitle = () => {
    return rightType === 'php' ? t('common.unserializeCode') : t('common.unminifyCode')
  }

  const getSavedSize = () => {
    if (!stats) return ''
    if (stats.result < stats.original) {
      const saved = stats.original - stats.result
      return `${t('common.saved')}: ${formatFileSize(saved)}`
    }
    if (stats.result > stats.original) {
      const added = stats.result - stats.original
      return `${t('common.added')}: ${formatFileSize(added)}`
    }
    return ''
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={onMinify}
          disabled={isLoading || !leftCode.trim()}
          className="min-w-[120px]"
          title={getMinifyButtonTitle()}
        >
          <Play className="h-4 w-4 mr-2" />
          {getMinifyButtonText()}
        </Button>

        <Button
          onClick={onUnminify}
          disabled={isLoading || !rightCode.trim()}
          variant="outline"
          className="min-w-[120px]"
          title={getUnminifyButtonTitle()}
        >
          <Undo2 className="h-4 w-4 mr-2" />
          {getUnminifyButtonText()}
        </Button>

        <Button
          onClick={onBeautify}
          disabled={isLoading || !isBeautifyEnabled()}
          variant="outline"
          className="min-w-[120px]"
          title={t('common.beautifyCode')}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {t('common.beautify')}
        </Button>
      </div>

      {/* Progress Bar */}
      {isLoading && (
        <div className="w-full max-w-md">
          <Progress value={undefined} className="h-2" />
        </div>
      )}

      {/* Stats */}
      {stats && lastOperation && (
        <div className="text-center">
          <div className={`text-sm font-medium ${getCompressionColor()}`}>
            {formatFileSize(stats.original)} → {formatFileSize(stats.result)}
          </div>
          <div className="text-xs text-muted-foreground">
            {getSavedSize()}
          </div>
        </div>
      )}
    </div>
  )
}
