'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { TooltipInfo } from '@/components/TooltipInfo'
import { useTranslations } from '@/hooks/useTranslations'
import { 
  JavaScriptOptions, 
  CSSOptions, 
  JSONOptions, 
  PHPOptions 
} from '@/lib/types'

interface ToolbarProps {
  locale: string
  leftType: 'js' | 'css' | 'json' | 'php'
  rightType: 'js' | 'css' | 'json' | 'php'
  autoDetectLeft: boolean
  autoDetectRight: boolean
  jsOptions: JavaScriptOptions
  cssOptions: CSSOptions
  jsonOptions: JSONOptions
  phpOptions: PHPOptions
  isLoading: boolean
  leftCode: string
  rightCode: string
  onLeftTypeChange: (type: 'js' | 'css' | 'json' | 'php') => void
  onRightTypeChange: (type: 'js' | 'css' | 'json' | 'php') => void
  onAutoDetectLeftChange: (checked: boolean) => void
  onAutoDetectRightChange: (checked: boolean) => void
  onJsOptionsChange: (options: JavaScriptOptions) => void
  onCssOptionsChange: (options: CSSOptions) => void
  onJsonOptionsChange: (options: JSONOptions) => void
  onPhpOptionsChange: (options: PHPOptions) => void
  onMinify: () => void
  onUnminify: () => void
  onClear: () => void
}

export default function Toolbar({
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
  onMinify,
  onUnminify,
  onClear,
}: ToolbarProps) {
  const { t } = useTranslations(locale)

  const renderLanguageOptions = () => {
    switch (leftType) {
      case 'js':
        return (
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">ECMAScript</Label>
              <TooltipInfo content="Target JavaScript version. ES5 = legacy compatibility (IE9+), ES2022 = modern (recent browsers)." />
              <Select
                value={jsOptions.ecmaVersion}
                onValueChange={(value: 'es5' | 'es2015' | 'es2017' | 'es2020' | 'es2022') => 
                  onJsOptionsChange({ ...jsOptions, ecmaVersion: value })
                }
              >
                <SelectTrigger className="w-36 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es5">ES5</SelectItem>
                  <SelectItem value="es2015">ES2015</SelectItem>
                  <SelectItem value="es2017">ES2017</SelectItem>
                  <SelectItem value="es2020">ES2020</SelectItem>
                  <SelectItem value="es2022">ES2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Compression</Label>
              <TooltipInfo content="Optimization level. Conservative = safe and readable, Normal = balanced, Aggressive = maximum compression." />
              <Select
                value={jsOptions.compressionLevel}
                onValueChange={(value: 'conservative' | 'normal' | 'aggressive') => 
                  onJsOptionsChange({ ...jsOptions, compressionLevel: value })
                }
              >
                <SelectTrigger className="w-36 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservative</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Browser</Label>
              <TooltipInfo content="Browser compatibility. Modern = recent (Chrome, Firefox, Safari), IE11+ = Internet Explorer 11+, IE9+ = very old browsers." />
              <Select
                value={jsOptions.browserSupport}
                onValueChange={(value: 'modern' | 'ie11' | 'ie9' | 'all') => 
                  onJsOptionsChange({ ...jsOptions, browserSupport: value })
                }
              >
                <SelectTrigger className="w-32 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="ie11">IE11+</SelectItem>
                  <SelectItem value="ie9">IE9+</SelectItem>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="preserve-classnames"
                  checked={jsOptions.preserveClassNames}
                  onCheckedChange={(checked) => 
                    onJsOptionsChange({ ...jsOptions, preserveClassNames: checked })
                  }
                />
                <Label htmlFor="preserve-classnames" className="text-xs">Keep class names</Label>
                <TooltipInfo content="Preserves CSS class names in JavaScript code (e.g., className='my-class')." />
              </div>
              
              <div className="flex items-center gap-2">
                <Switch
                  id="preserve-functions"
                  checked={jsOptions.preserveFunctionNames}
                  onCheckedChange={(checked) => 
                    onJsOptionsChange({ ...jsOptions, preserveFunctionNames: checked })
                  }
                />
                <Label htmlFor="preserve-functions" className="text-xs">Keep function names</Label>
                <TooltipInfo content="Preserves function names to facilitate debugging and stack traces." />
              </div>
              
              <div className="flex items-center gap-2">
                <Switch
                  id="remove-console"
                  checked={jsOptions.removeConsole}
                  onCheckedChange={(checked) => 
                    onJsOptionsChange({ ...jsOptions, removeConsole: checked })
                  }
                />
                <Label htmlFor="remove-console" className="text-xs">Remove console</Label>
                <TooltipInfo content="Removes all console.log(), console.warn(), etc. calls from the final code." />
              </div>
            </div>
          </div>
        )

      case 'css':
        return (
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Compression</Label>
              <TooltipInfo content="CSS optimization level. Conservative = safe, Normal = balanced, Aggressive = maximum compression." />
              <Select
                value={cssOptions.compressionLevel}
                onValueChange={(value: 'conservative' | 'normal' | 'aggressive') => 
                  onCssOptionsChange({ ...cssOptions, compressionLevel: value })
                }
              >
                <SelectTrigger className="w-36 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservative</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Browser</Label>
              <TooltipInfo content="CSS browser compatibility. Modern = recent, IE11+ = Internet Explorer 11+, IE9+ = very old browsers." />
              <Select
                value={cssOptions.browserSupport}
                onValueChange={(value: 'modern' | 'ie11' | 'ie9') => 
                  onCssOptionsChange({ ...cssOptions, browserSupport: value })
                }
              >
                <SelectTrigger className="w-32 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="ie11">IE11+</SelectItem>
                  <SelectItem value="ie9">IE9+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="remove-comments"
                  checked={cssOptions.removeComments}
                  onCheckedChange={(checked) => 
                    onCssOptionsChange({ ...cssOptions, removeComments: checked })
                  }
                />
                <Label htmlFor="remove-comments" className="text-xs">Remove comments</Label>
                <TooltipInfo content="Removes all CSS comments (/* comment */) from the final code." />
              </div>
              
              <div className="flex items-center gap-2">
                <Switch
                  id="convert-colors"
                  checked={cssOptions.convertColors}
                  onCheckedChange={(checked) => 
                    onCssOptionsChange({ ...cssOptions, convertColors: checked })
                  }
                />
                <Label htmlFor="convert-colors" className="text-xs">Convert colors</Label>
                <TooltipInfo content="Converts color names to hexadecimal codes (blue → #0000ff) to reduce size." />
              </div>
              
              <div className="flex items-center gap-2">
                <Switch
                  id="merge-rules"
                  checked={cssOptions.mergeRules}
                  onCheckedChange={(checked) => 
                    onCssOptionsChange({ ...cssOptions, mergeRules: checked })
                  }
                />
                <Label htmlFor="merge-rules" className="text-xs">Merge rules</Label>
                <TooltipInfo content="Merges identical CSS rules to reduce code duplication." />
              </div>
              
              <div className="flex items-center gap-2">
                <Switch
                  id="minify-selectors"
                  checked={cssOptions.minifySelectors}
                  onCheckedChange={(checked) => 
                    onCssOptionsChange({ ...cssOptions, minifySelectors: checked })
                  }
                />
                <Label htmlFor="minify-selectors" className="text-xs">Minify selectors</Label>
                <TooltipInfo content="Optimizes CSS selectors by removing unnecessary spaces and shortening properties." />
              </div>
            </div>
          </div>
        )

      case 'json':
        return (
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Compression</Label>
              <TooltipInfo content="JSON optimization level. Conservative = safe, Normal = balanced, Aggressive = maximum compression." />
              <Select
                value={jsonOptions.compressionLevel}
                onValueChange={(value: 'conservative' | 'normal' | 'aggressive') => 
                  onJsonOptionsChange({ ...jsonOptions, compressionLevel: value })
                }
              >
                <SelectTrigger className="w-36 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservative</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="optimize-numbers"
                checked={jsonOptions.optimizeNumbers}
                onCheckedChange={(checked) => 
                  onJsonOptionsChange({ ...jsonOptions, optimizeNumbers: checked })
                }
              />
              <Label htmlFor="optimize-numbers" className="text-sm">Optimize numbers</Label>
              <TooltipInfo content="Removes unnecessary zeros from numbers (1.00 → 1, 0.50 → 0.5)." />
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="scientific-notation"
                checked={jsonOptions.useScientificNotation}
                onCheckedChange={(checked) => 
                  onJsonOptionsChange({ ...jsonOptions, useScientificNotation: checked })
                }
              />
              <Label htmlFor="scientific-notation" className="text-sm">Scientific notation</Label>
              <TooltipInfo content="Uses scientific notation for very large numbers (1000000 → 1e6)." />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="remove-empty-keys"
                  checked={jsonOptions.removeEmptyKeys}
                  onCheckedChange={(checked) => 
                    onJsonOptionsChange({ ...jsonOptions, removeEmptyKeys: checked })
                  }
                />
                <Label htmlFor="remove-empty-keys" className="text-sm">Remove empty keys</Label>
                <TooltipInfo content="Removes keys with empty values (key: '') from JSON." />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="remove-null-values"
                  checked={jsonOptions.removeNullValues}
                  onCheckedChange={(checked) => 
                    onJsonOptionsChange({ ...jsonOptions, removeNullValues: checked })
                  }
                />
                <Label htmlFor="remove-null-values" className="text-sm">Remove null values</Label>
                <TooltipInfo content="Removes null values from JSON to reduce size." />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="fix-errors"
                  checked={jsonOptions.fixCommonErrors}
                  onCheckedChange={(checked) => 
                    onJsonOptionsChange({ ...jsonOptions, fixCommonErrors: checked })
                  }
                />
                <Label htmlFor="fix-errors" className="text-sm">Fix common errors</Label>
                <TooltipInfo content="Automatically fixes common JSON errors (missing quotes, commas, etc.)." />
              </div>
            </div>
          </div>
        )

      case 'php':
        return (
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Level</Label>
              <TooltipInfo content="PHP serialization level. Basic = simple, Deep = complex structures, Custom = advanced." />
              <Select
                value={phpOptions.serializationLevel}
                onValueChange={(value: 'basic' | 'deep' | 'custom') => 
                  onPhpOptionsChange({ ...phpOptions, serializationLevel: value })
                }
              >
                <SelectTrigger className="w-32 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="deep">Deep</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Compression</Label>
              <TooltipInfo content="PHP compression level. None = readable, Minimal = optimized, Aggressive = maximum." />
              <Select
                value={phpOptions.compression}
                onValueChange={(value: 'none' | 'minimal' | 'aggressive') => 
                  onPhpOptionsChange({ ...phpOptions, compression: value })
                }
              >
                <SelectTrigger className="w-32 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="preserve-types"
                  checked={phpOptions.preserveTypes}
                  onCheckedChange={(checked) => 
                    onPhpOptionsChange({ ...phpOptions, preserveTypes: checked })
                  }
                />
                <Label htmlFor="preserve-types" className="text-sm">Preserve types</Label>
                <TooltipInfo content="Preserves PHP data types (string, int, array) during serialization." />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="include-null"
                  checked={phpOptions.includeNullValues}
                  onCheckedChange={(checked) => 
                    onPhpOptionsChange({ ...phpOptions, includeNullValues: checked })
                  }
                />
                <Label htmlFor="include-null" className="text-sm">Include null</Label>
                <TooltipInfo content="Includes null values in PHP serialization." />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="readable"
                  checked={phpOptions.readable}
                  onCheckedChange={(checked) => 
                    onPhpOptionsChange({ ...phpOptions, readable: checked })
                  }
                />
                <Label htmlFor="readable" className="text-sm">Readable</Label>
                <TooltipInfo content="Formats PHP serialization in a readable way with spaces and line breaks." />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="strict-mode"
                  checked={phpOptions.strictMode}
                  onCheckedChange={(checked) => 
                    onPhpOptionsChange({ ...phpOptions, strictMode: checked })
                  }
                />
                <Label htmlFor="strict-mode" className="text-sm">Strict mode</Label>
                <TooltipInfo content="Strict mode: validates data before serialization and rejects unsupported types." />
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex justify-center mb-6">
      <Card className="p-4 card-warm w-full max-w-[930px]">
        <CardContent className="p-0">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-end gap-2">
                <div>
                  <Label className="text-sm font-medium mb-2 block">{t('common.normalCode')}</Label>
                  <Select
                    value={leftType}
                    onValueChange={onLeftTypeChange}
                  >
                    <SelectTrigger className="w-[140px] h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="js">{t('languages.javascript')}</SelectItem>
                      <SelectItem value="css">{t('languages.css')}</SelectItem>
                      <SelectItem value="json">{t('languages.json')}</SelectItem>
                      <SelectItem value="php">{t('languages.php')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <Switch
                    checked={autoDetectLeft}
                    onCheckedChange={onAutoDetectLeftChange}
                  />
                  <Label className="text-xs text-muted-foreground">{t('common.auto')}</Label>
                  <TooltipInfo content={t('tooltips.autoDetect')} />
                </div>
              </div>

              <div className="flex items-end gap-2">
                <div>
                  <Label className="text-sm font-medium mb-2 block">{t('common.minifiedCode')}</Label>
                  <Select
                    value={rightType}
                    onValueChange={onRightTypeChange}
                  >
                    <SelectTrigger className="w-[140px] h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="js">{t('languages.javascript')}</SelectItem>
                      <SelectItem value="css">{t('languages.css')}</SelectItem>
                      <SelectItem value="json">{t('languages.json')}</SelectItem>
                      <SelectItem value="php">{t('languages.php')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <Switch
                    checked={autoDetectRight}
                    onCheckedChange={onAutoDetectRightChange}
                  />
                  <Label className="text-xs text-muted-foreground">{t('common.auto')}</Label>
                  <TooltipInfo content={t('tooltips.autoDetect')} />
                </div>
              </div>

              {renderLanguageOptions()}
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button 
                onClick={onMinify} 
                disabled={isLoading || !leftCode.trim()} 
                size="sm"
                className="btn-warm text-primary-foreground relative overflow-hidden"
              >
                {isLoading ? 'Processing…' : `${t('common.minify')} →`}
              </Button>
              <Button 
                variant="outline" 
                onClick={onUnminify} 
                disabled={isLoading || !rightCode.trim()} 
                size="sm"
              >
                ← {t('common.unminify')}
              </Button>
              <Button 
                variant="secondary" 
                onClick={onClear} 
                disabled={!leftCode.trim() && !rightCode.trim()} 
                size="sm"
              >
                {t('common.clear')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
