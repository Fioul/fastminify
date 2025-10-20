'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TooltipInfo } from '@/components/TooltipInfo'
import { useTranslations } from '@/hooks/useTranslations'

interface ConcatOptionsProps {
  fileType: 'js' | 'css'
  addComments: boolean
  addNewlines: boolean
  onFileTypeChange: (type: 'js' | 'css') => void
  onAddCommentsChange: (checked: boolean) => void
  onAddNewlinesChange: (checked: boolean) => void
}

export default function ConcatOptions({
  fileType,
  addComments,
  addNewlines,
  onFileTypeChange,
  onAddCommentsChange,
  onAddNewlinesChange,
}: ConcatOptionsProps) {
  const { t } = useTranslations('en') // Default to English for now

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          {t('concat.options')}
          <TooltipInfo content={t('concat.optionsTooltip')} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm">{t('concat.fileType')}</Label>
          <Select value={fileType} onValueChange={onFileTypeChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="js">JavaScript (.js)</SelectItem>
              <SelectItem value="css">CSS (.css)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Switch
              id="add-comments"
              checked={addComments}
              onCheckedChange={onAddCommentsChange}
            />
            <Label htmlFor="add-comments" className="text-sm">
              {t('concat.addComments')}
            </Label>
            <TooltipInfo content={t('concat.addCommentsTooltip')} />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="add-newlines"
              checked={addNewlines}
              onCheckedChange={onAddNewlinesChange}
            />
            <Label htmlFor="add-newlines" className="text-sm">
              {t('concat.addNewlines')}
            </Label>
            <TooltipInfo content={t('concat.addNewlinesTooltip')} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
