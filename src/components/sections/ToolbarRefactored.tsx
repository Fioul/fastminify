'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { TbFiles, Eraser } from '@/lib/icons'
import { useTranslations } from '@/hooks/useTranslations'
import OptionsSection from './OptionsSection'
import { LanguageType, JavaScriptOptions, CSSOptions, JSONOptions, PHPOptions } from '@/lib/types'

interface ToolbarRefactoredProps {
  locale: string
  leftType: LanguageType | null
  rightType: LanguageType | null
  autoDetectLeft: boolean
  autoDetectRight: boolean
  jsOptions: JavaScriptOptions
  cssOptions: CSSOptions
  jsonOptions: JSONOptions
  phpOptions: PHPOptions
  isLoading: boolean
  leftCode: string
  rightCode: string
  onLeftTypeChange: (type: LanguageType) => void
  onRightTypeChange: (type: LanguageType) => void
  onAutoDetectLeftChange: (checked: boolean) => void
  onAutoDetectRightChange: (checked: boolean) => void
  onJsOptionsChange: (options: JavaScriptOptions) => void
  onCssOptionsChange: (options: CSSOptions) => void
  onJsonOptionsChange: (options: JSONOptions) => void
  onPhpOptionsChange: (options: PHPOptions) => void
  onConcat: () => void
  onClear: () => void
}

export default function ToolbarRefactored({
  locale,
  leftType,
  rightType,
  autoDetectLeft,
  autoDetectRight,
  jsOptions,
  cssOptions,
  jsonOptions,
  phpOptions,
  isLoading,
  leftCode,
  rightCode,
  onLeftTypeChange,
  onRightTypeChange,
  onAutoDetectLeftChange,
  onAutoDetectRightChange,
  onJsOptionsChange,
  onCssOptionsChange,
  onJsonOptionsChange,
  onPhpOptionsChange,
  onConcat,
  onClear,
}: ToolbarRefactoredProps) {
  const { t } = useTranslations(locale)

  const hasCode = leftCode.trim() || rightCode.trim()

  return (
    <div className="space-y-4">
      {/* Action Buttons */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{t('toolbar.title')}</h3>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={onConcat}
                disabled={isLoading || !leftCode.trim()}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <TbFiles className="h-4 w-4" />
                {t('toolbar.concatFiles')}
              </Button>
              
              <Button
                onClick={onClear}
                disabled={isLoading || !hasCode}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Eraser className="h-4 w-4" />
                {t('toolbar.clearAll')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Options */}
      <OptionsSection
        locale={locale}
        leftType={leftType}
        rightType={rightType}
        autoDetectLeft={autoDetectLeft}
        autoDetectRight={autoDetectRight}
        jsOptions={jsOptions}
        cssOptions={cssOptions}
        jsonOptions={jsonOptions}
        phpOptions={phpOptions}
        onLeftTypeChange={onLeftTypeChange}
        onRightTypeChange={onRightTypeChange}
        onAutoDetectLeftChange={onAutoDetectLeftChange}
        onAutoDetectRightChange={onAutoDetectRightChange}
        onJsOptionsChange={onJsOptionsChange}
        onCssOptionsChange={onCssOptionsChange}
        onJsonOptionsChange={onJsonOptionsChange}
        onPhpOptionsChange={onPhpOptionsChange}
      />
    </div>
  )
}
