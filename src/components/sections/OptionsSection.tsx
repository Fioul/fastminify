'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TooltipInfo } from '@/components/TooltipInfo'
import { useTranslations } from '@/hooks/useTranslations'
import { JavaScriptOptions, CSSOptions, JSONOptions, PHPOptions } from '@/lib/types'

interface OptionsSectionProps {
  locale: string
  leftType: 'js' | 'css' | 'json' | 'php' | null
  rightType: 'js' | 'css' | 'json' | 'php' | null
  autoDetectLeft: boolean
  autoDetectRight: boolean
  jsOptions: JavaScriptOptions
  cssOptions: CSSOptions
  jsonOptions: JSONOptions
  phpOptions: PHPOptions
  onLeftTypeChange: (type: 'js' | 'css' | 'json' | 'php') => void
  onRightTypeChange: (type: 'js' | 'css' | 'json' | 'php') => void
  onAutoDetectLeftChange: (checked: boolean) => void
  onAutoDetectRightChange: (checked: boolean) => void
  onJsOptionsChange: (options: JavaScriptOptions) => void
  onCssOptionsChange: (options: CSSOptions) => void
  onJsonOptionsChange: (options: JSONOptions) => void
  onPhpOptionsChange: (options: PHPOptions) => void
}

export default function OptionsSection({
  locale,
  leftType,
  rightType,
  autoDetectLeft,
  autoDetectRight,
  jsOptions,
  cssOptions,
  jsonOptions,
  phpOptions,
  onLeftTypeChange,
  onRightTypeChange,
  onAutoDetectLeftChange,
  onAutoDetectRightChange,
  onJsOptionsChange,
  onCssOptionsChange,
  onJsonOptionsChange,
  onPhpOptionsChange,
}: OptionsSectionProps) {
  const { t } = useTranslations(locale)

  const languageOptions = [
    { value: 'js', label: 'JavaScript' },
    { value: 'css', label: 'CSS' },
    { value: 'json', label: 'JSON' },
    { value: 'php', label: 'PHP Serialize' },
  ]

  const compressionLevels = [
    { value: 'light', label: t('options.light') },
    { value: 'normal', label: t('options.normal') },
    { value: 'aggressive', label: t('options.aggressive') },
  ]

  const ecmaVersions = [
    { value: 'es5', label: 'ES5' },
    { value: 'es2015', label: 'ES2015' },
    { value: 'es2016', label: 'ES2016' },
    { value: 'es2017', label: 'ES2017' },
    { value: 'es2018', label: 'ES2018' },
    { value: 'es2019', label: 'ES2019' },
    { value: 'es2020', label: 'ES2020' },
    { value: 'es2021', label: 'ES2021' },
    { value: 'es2022', label: 'ES2022' },
  ]

  const browserSupport = [
    { value: 'legacy', label: t('options.legacy') },
    { value: 'modern', label: t('options.modern') },
  ]

  return (
    <div className="space-y-4">
      {/* Language Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              {t('options.leftLanguage')}
              <TooltipInfo content={t('options.leftLanguageTooltip')} />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <Switch
                id="auto-detect-left"
                checked={autoDetectLeft}
                onCheckedChange={onAutoDetectLeftChange}
              />
              <Label htmlFor="auto-detect-left" className="text-sm">
                {t('options.autoDetect')}
              </Label>
            </div>
            {!autoDetectLeft && (
              <Select value={leftType || ''} onValueChange={onLeftTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder={t('options.selectLanguage')} />
                </SelectTrigger>
                <SelectContent>
                  {languageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              {t('options.rightLanguage')}
              <TooltipInfo content={t('options.rightLanguageTooltip')} />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <Switch
                id="auto-detect-right"
                checked={autoDetectRight}
                onCheckedChange={onAutoDetectRightChange}
              />
              <Label htmlFor="auto-detect-right" className="text-sm">
                {t('options.autoDetect')}
              </Label>
            </div>
            {!autoDetectRight && (
              <Select value={rightType || ''} onValueChange={onRightTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder={t('options.selectLanguage')} />
                </SelectTrigger>
                <SelectContent>
                  {languageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </CardContent>
        </Card>
      </div>

      {/* JavaScript Options */}
      {leftType === 'js' && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">{t('options.javascriptOptions')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">{t('options.compressionLevel')}</Label>
                <Select
                  value={jsOptions.compressionLevel}
                  onValueChange={(value: 'light' | 'normal' | 'aggressive') =>
                    onJsOptionsChange({ ...jsOptions, compressionLevel: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {compressionLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">{t('options.ecmaVersion')}</Label>
                <Select
                  value={jsOptions.ecmaVersion}
                  onValueChange={(value: any) =>
                    onJsOptionsChange({ ...jsOptions, ecmaVersion: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ecmaVersions.map((version) => (
                      <SelectItem key={version.value} value={version.value}>
                        {version.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">{t('options.browserSupport')}</Label>
                <Select
                  value={jsOptions.browserSupport}
                  onValueChange={(value: 'legacy' | 'modern') =>
                    onJsOptionsChange({ ...jsOptions, browserSupport: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {browserSupport.map((support) => (
                      <SelectItem key={support.value} value={support.value}>
                        {support.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="preserve-class-names"
                  checked={jsOptions.preserveClassNames}
                  onCheckedChange={(checked) =>
                    onJsOptionsChange({ ...jsOptions, preserveClassNames: checked })
                  }
                />
                <Label htmlFor="preserve-class-names" className="text-sm">
                  {t('options.preserveClassNames')}
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="preserve-function-names"
                  checked={jsOptions.preserveFunctionNames}
                  onCheckedChange={(checked) =>
                    onJsOptionsChange({ ...jsOptions, preserveFunctionNames: checked })
                  }
                />
                <Label htmlFor="preserve-function-names" className="text-sm">
                  {t('options.preserveFunctionNames')}
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="remove-console"
                  checked={jsOptions.removeConsole}
                  onCheckedChange={(checked) =>
                    onJsOptionsChange({ ...jsOptions, removeConsole: checked })
                  }
                />
                <Label htmlFor="remove-console" className="text-sm">
                  {t('options.removeConsole')}
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="remove-debugger"
                  checked={jsOptions.removeDebugger}
                  onCheckedChange={(checked) =>
                    onJsOptionsChange({ ...jsOptions, removeDebugger: checked })
                  }
                />
                <Label htmlFor="remove-debugger" className="text-sm">
                  {t('options.removeDebugger')}
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* CSS Options */}
      {leftType === 'css' && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">{t('options.cssOptions')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm">{t('options.compressionLevel')}</Label>
              <Select
                value={cssOptions.compressionLevel}
                onValueChange={(value: 'light' | 'normal' | 'aggressive') =>
                  onCssOptionsChange({ ...cssOptions, compressionLevel: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {compressionLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="remove-unused"
                  checked={cssOptions.removeUnused}
                  onCheckedChange={(checked) =>
                    onCssOptionsChange({ ...cssOptions, removeUnused: checked })
                  }
                />
                <Label htmlFor="remove-unused" className="text-sm">
                  {t('options.removeUnused')}
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="merge-rules"
                  checked={cssOptions.mergeRules}
                  onCheckedChange={(checked) =>
                    onCssOptionsChange({ ...cssOptions, mergeRules: checked })
                  }
                />
                <Label htmlFor="merge-rules" className="text-sm">
                  {t('options.mergeRules')}
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="merge-media-queries"
                  checked={cssOptions.mergeMediaQueries}
                  onCheckedChange={(checked) =>
                    onCssOptionsChange({ ...cssOptions, mergeMediaQueries: checked })
                  }
                />
                <Label htmlFor="merge-media-queries" className="text-sm">
                  {t('options.mergeMediaQueries')}
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="remove-empty"
                  checked={cssOptions.removeEmpty}
                  onCheckedChange={(checked) =>
                    onCssOptionsChange({ ...cssOptions, removeEmpty: checked })
                  }
                />
                <Label htmlFor="remove-empty" className="text-sm">
                  {t('options.removeEmpty')}
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="remove-comments"
                  checked={cssOptions.removeComments}
                  onCheckedChange={(checked) =>
                    onCssOptionsChange({ ...cssOptions, removeComments: checked })
                  }
                />
                <Label htmlFor="remove-comments" className="text-sm">
                  {t('options.removeComments')}
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="remove-whitespace"
                  checked={cssOptions.removeWhitespace}
                  onCheckedChange={(checked) =>
                    onCssOptionsChange({ ...cssOptions, removeWhitespace: checked })
                  }
                />
                <Label htmlFor="remove-whitespace" className="text-sm">
                  {t('options.removeWhitespace')}
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* JSON Options */}
      {leftType === 'json' && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">{t('options.jsonOptions')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm">{t('options.compressionLevel')}</Label>
              <Select
                value={jsonOptions.compressionLevel}
                onValueChange={(value: 'light' | 'normal' | 'aggressive') =>
                  onJsonOptionsChange({ ...jsonOptions, compressionLevel: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {compressionLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="remove-whitespace-json"
                  checked={jsonOptions.removeWhitespace}
                  onCheckedChange={(checked) =>
                    onJsonOptionsChange({ ...jsonOptions, removeWhitespace: checked })
                  }
                />
                <Label htmlFor="remove-whitespace-json" className="text-sm">
                  {t('options.removeWhitespace')}
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="remove-comments-json"
                  checked={jsonOptions.removeComments}
                  onCheckedChange={(checked) =>
                    onJsonOptionsChange({ ...jsonOptions, removeComments: checked })
                  }
                />
                <Label htmlFor="remove-comments-json" className="text-sm">
                  {t('options.removeComments')}
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="sort-keys"
                  checked={jsonOptions.sortKeys}
                  onCheckedChange={(checked) =>
                    onJsonOptionsChange({ ...jsonOptions, sortKeys: checked })
                  }
                />
                <Label htmlFor="sort-keys" className="text-sm">
                  {t('options.sortKeys')}
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* PHP Options */}
      {leftType === 'php' && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">{t('options.phpOptions')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm">{t('options.compressionLevel')}</Label>
              <Select
                value={phpOptions.compressionLevel}
                onValueChange={(value: 'light' | 'normal' | 'aggressive') =>
                  onPhpOptionsChange({ ...phpOptions, compressionLevel: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {compressionLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="remove-whitespace-php"
                  checked={phpOptions.removeWhitespace}
                  onCheckedChange={(checked) =>
                    onPhpOptionsChange({ ...phpOptions, removeWhitespace: checked })
                  }
                />
                <Label htmlFor="remove-whitespace-php" className="text-sm">
                  {t('options.removeWhitespace')}
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="remove-comments-php"
                  checked={phpOptions.removeComments}
                  onCheckedChange={(checked) =>
                    onPhpOptionsChange({ ...phpOptions, removeComments: checked })
                  }
                />
                <Label htmlFor="remove-comments-php" className="text-sm">
                  {t('options.removeComments')}
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="sort-keys-php"
                  checked={phpOptions.sortKeys}
                  onCheckedChange={(checked) =>
                    onPhpOptionsChange({ ...phpOptions, sortKeys: checked })
                  }
                />
                <Label htmlFor="sort-keys-php" className="text-sm">
                  {t('options.sortKeys')}
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
