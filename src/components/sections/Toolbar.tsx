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
import { TbFiles } from "react-icons/tb";
import { Eraser } from 'lucide-react'

interface ToolbarProps {
  locale: string
  leftType: 'js' | 'css' | 'json' | 'php' | null
  rightType: 'js' | 'css' | 'json' | 'php' | null
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
  onConcat: () => void
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
  onConcat,
  onClear,
}: ToolbarProps) {
  const { t } = useTranslations(locale)

  const renderLanguageOptions = () => {
    switch (leftType) {
      case 'js':
        return (
          <div className="flex flex-col gap-4">
            {/* Première ligne : ECMAScript, Compression, Browser */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">ECMAScript</Label>
                <TooltipInfo content="Target JavaScript version. ES5 = legacy compatibility (IE9+), ES2022 = modern (recent browsers). Overrides Browser Support setting." />
                <Select
                  value={jsOptions.ecmaVersion}
                  onValueChange={(value: 'es5' | 'es2015' | 'es2017' | 'es2020' | 'es2022') => 
                    onJsOptionsChange({ ...jsOptions, ecmaVersion: value })
                  }
                >
                  <SelectTrigger className="w-36 h-9 cursor-pointer">
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
                  <SelectTrigger className="w-36 h-9 cursor-pointer">
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
                <TooltipInfo content="Browser compatibility. Modern = recent (Chrome, Firefox, Safari), IE11+ = Internet Explorer 11+, IE9+ = very old browsers. Can be overridden by ECMAScript setting." />
                <Select
                  value={jsOptions.browserSupport}
                  onValueChange={(value: 'modern' | 'ie11' | 'ie9' | 'all') => 
                    onJsOptionsChange({ ...jsOptions, browserSupport: value })
                  }
                >
                  <SelectTrigger className="w-32 h-9 cursor-pointer">
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
            </div>
            
            {/* Deuxième ligne : Options qui ne s'affichent que pour le mode Aggressive */}
            {jsOptions.compressionLevel === 'aggressive' && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch
                    id="preserve-classnames"
                    checked={jsOptions.preserveClassNames}
                    onCheckedChange={(checked) => 
                      onJsOptionsChange({ ...jsOptions, preserveClassNames: checked })
                    }
                    className="cursor-pointer"
                  />
                  <Label htmlFor="preserve-classnames" className="text-xs">Keep class names</Label>
                  <TooltipInfo content="Preserves ES6 class names (UserCard, AdminCard, etc.) in aggressive mode." />
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch
                    id="preserve-functions"
                    checked={jsOptions.preserveFunctionNames}
                    onCheckedChange={(checked) => 
                      onJsOptionsChange({ ...jsOptions, preserveFunctionNames: checked })
                    }
                    className="cursor-pointer"
                  />
                  <Label htmlFor="preserve-functions" className="text-xs">Keep function names</Label>
                  <TooltipInfo content="Preserves function names to facilitate debugging and stack traces in aggressive mode." />
                </div>
              </div>
            )}
            
            {/* Troisième ligne : Remove console et Remove debugger */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="remove-console"
                  checked={jsOptions.removeConsole}
                  onCheckedChange={(checked) => 
                    onJsOptionsChange({ ...jsOptions, removeConsole: checked })
                  }
                  className="cursor-pointer"
                />
                <Label htmlFor="remove-console" className="text-xs">Remove console</Label>
                <TooltipInfo content="Removes all console.log(), console.warn(), etc. calls from the final code. Works in all compression modes." />
              </div>
              
              <div className="flex items-center gap-2">
                <Switch className="cursor-pointer"
                  id="remove-debugger"
                  checked={jsOptions.removeDebugger}
                  onCheckedChange={(checked) => 
                    onJsOptionsChange({ ...jsOptions, removeDebugger: checked })
                  }
                />
                <Label htmlFor="remove-debugger" className="text-xs">Remove debugger</Label>
                <TooltipInfo content="Removes all debugger statements from the final code. Works in all compression modes." />
              </div>
            </div>
          </div>
        )

      case 'css':
        return (
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Compression</Label>
              <TooltipInfo content="CSS optimization level. Conservative = minimal compression, Normal = balanced, Aggressive = maximum compression with restructuring." />
              <Select
                value={cssOptions.compressionLevel}
                onValueChange={(value: 'conservative' | 'normal' | 'aggressive') => 
                  onCssOptionsChange({ ...cssOptions, compressionLevel: value })
                }
              >
                <SelectTrigger className="w-36 h-9 cursor-pointer">
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
              <TooltipInfo content="CSS browser compatibility. Modern = recent browsers, IE11+ = Internet Explorer 11+, IE9+ = very old browsers (adds compatibility fixes)." />
              <Select
                value={cssOptions.browserSupport}
                onValueChange={(value: 'modern' | 'ie11' | 'ie9') => 
                  onCssOptionsChange({ ...cssOptions, browserSupport: value })
                }
              >
                <SelectTrigger className="w-32 h-9 cursor-pointer">
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
                <Switch className="cursor-pointer"
                  id="remove-comments"
                  checked={cssOptions.removeComments}
                  onCheckedChange={(checked) => 
                    onCssOptionsChange({ ...cssOptions, removeComments: checked })
                  }
                />
                <Label htmlFor="remove-comments" className="text-xs">Remove comments</Label>
                <TooltipInfo content="Removes all CSS comments (/* comment */) from the final code. Works in all compression modes." />
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
                <SelectTrigger className="w-36 h-9 cursor-pointer">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservative</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Switch className="cursor-pointer"
                  id="optimize-numbers"
                  checked={jsonOptions.optimizeNumbers}
                  onCheckedChange={(checked) => 
                    onJsonOptionsChange({ ...jsonOptions, optimizeNumbers: checked })
                  }
                />
                <Label htmlFor="optimize-numbers" className="text-sm">Optimize numbers</Label>
                <TooltipInfo content="Removes unnecessary zeros from numbers (1.00 → 1, 0.50 → 0.5)." />
              </div>

              {jsonOptions.optimizeNumbers && (
                <div className="flex items-center gap-2">
                  <Switch className="cursor-pointer"
                    id="scientific-notation"
                    checked={jsonOptions.useScientificNotation}
                    onCheckedChange={(checked) => 
                      onJsonOptionsChange({ ...jsonOptions, useScientificNotation: checked })
                    }
                  />
                  <Label htmlFor="scientific-notation" className="text-sm">Scientific notation</Label>
                  <TooltipInfo content="Uses scientific notation for very large numbers (1000000 → 1e6)." />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Switch className="cursor-pointer"
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
                <Switch className="cursor-pointer"
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
                <Switch className="cursor-pointer"
                  id="remove-empty-objects"
                  checked={jsonOptions.removeEmptyObjects}
                  onCheckedChange={(checked) => 
                    onJsonOptionsChange({ ...jsonOptions, removeEmptyObjects: checked })
                  }
                />
                <Label htmlFor="remove-empty-objects" className="text-sm">Remove empty objects</Label>
                <TooltipInfo content="Removes empty objects {} from JSON." />
              </div>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Switch className="cursor-pointer"
                  id="sort-object-keys"
                  checked={jsonOptions.sortObjectKeys}
                  onCheckedChange={(checked) => 
                    onJsonOptionsChange({ ...jsonOptions, sortObjectKeys: checked })
                  }
                />
                <Label htmlFor="sort-object-keys" className="text-sm">Sort object keys</Label>
                <TooltipInfo content="Sorts object keys alphabetically for consistent ordering." />
              </div>

              <div className="flex items-center gap-2">
                <Switch className="cursor-pointer"
                  id="remove-empty-arrays"
                  checked={jsonOptions.removeEmptyArrays}
                  onCheckedChange={(checked) => 
                    onJsonOptionsChange({ ...jsonOptions, removeEmptyArrays: checked })
                  }
                />
                <Label htmlFor="remove-empty-arrays" className="text-sm">Remove empty arrays</Label>
                <TooltipInfo content="Removes empty arrays [] from JSON." />
              </div>

              <div className="flex items-center gap-2">
                <Switch className="cursor-pointer"
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
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch className="cursor-pointer"
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
                <Switch className="cursor-pointer"
                  id="remove-empty-arrays"
                  checked={phpOptions.removeEmptyArrays}
                  onCheckedChange={(checked) => 
                    onPhpOptionsChange({ ...phpOptions, removeEmptyArrays: checked })
                  }
                />
                <Label htmlFor="remove-empty-arrays" className="text-sm">Remove empty arrays</Label>
                <TooltipInfo content="Removes empty arrays [] from PHP serialization." />
              </div>

              <div className="flex items-center gap-2">
                <Switch className="cursor-pointer"
                  id="remove-empty-objects"
                  checked={phpOptions.removeEmptyObjects}
                  onCheckedChange={(checked) => 
                    onPhpOptionsChange({ ...phpOptions, removeEmptyObjects: checked })
                  }
                />
                <Label htmlFor="remove-empty-objects" className="text-sm">Remove empty objects</Label>
                <TooltipInfo content="Removes empty objects {} from PHP serialization." />
              </div>

              <div className="flex items-center gap-2">
                <Switch className="cursor-pointer"
                  id="sort-keys"
                  checked={phpOptions.sortKeys}
                  onCheckedChange={(checked) => 
                    onPhpOptionsChange({ ...phpOptions, sortKeys: checked })
                  }
                />
                <Label htmlFor="sort-keys" className="text-sm">Sort keys</Label>
                <TooltipInfo content="Sorts object keys alphabetically in PHP serialization." />
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
      <Card className="p-4 card-warm w-full max-w-[1000px]">
        <CardContent className="p-0">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-end gap-2">
                <div>
                  <Label className="text-sm font-medium mb-2 block">{t('common.normalCode')}</Label>
                  <Select
                    value={leftType || ''}
                    onValueChange={onLeftTypeChange}
                  >
                    <SelectTrigger className="w-[140px] h-9 cursor-pointer" data-testid="left-type">
                      <SelectValue placeholder={t('common.selectLanguage')} />
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
                  <Switch className="cursor-pointer"
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
                    value={rightType || ''}
                    onValueChange={onRightTypeChange}
                  >
                    <SelectTrigger className="w-[140px] h-9 cursor-pointer" data-testid="right-type">
                      <SelectValue placeholder={t('common.selectLanguage')} />
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
                  <Switch className="cursor-pointer"
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
                variant="outline" 
                onClick={onConcat} 
                disabled={isLoading} 
                size="sm"
                className="cursor-pointer"
              >
                <TbFiles className="size-4" /> {t('common.concat')}
              </Button>
              <Button 
                variant="outline" 
                onClick={onClear} 
                disabled={!leftCode.trim() && !rightCode.trim()} 
                size="sm"
                className="cursor-pointer"
              >
                <Eraser className="h-4 w-4" /> {t('common.clear')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
