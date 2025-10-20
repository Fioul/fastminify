'use client'

import EditorCard from './EditorCard'
import ActionButtons from './ActionButtons'
import ModalEditor from './ModalEditor'
import { useTranslations } from '@/hooks/useTranslations'
import { LanguageType, Stats } from '@/lib/types'

interface EditorSectionProps {
  locale: string
  leftCode: string
  rightCode: string
  leftType: LanguageType | null
  rightType: LanguageType | null
  stats: Stats | null
  lastOperation: 'minify' | 'unminify' | null
  leftModalOpen: boolean
  rightModalOpen: boolean
  onLeftCodeChange: (value: string | undefined) => void
  onRightCodeChange: (value: string | undefined) => void
  onCopy: () => void
  onDownload: () => void
  onLeftCopy: () => void
  onLeftDownload: () => void
  onRightCopy: () => void
  onRightDownload: () => void
  onLeftModalOpen: () => void
  onLeftModalClose: () => void
  onRightModalOpen: () => void
  onRightModalClose: () => void
  onClearLeft: () => void
  onClearRight: () => void
  onMinify: () => void
  onUnminify: () => void
  onBeautify: () => void
  isLoading: boolean
}

export default function EditorSectionRefactored({
  locale,
  leftCode,
  rightCode,
  leftType,
  rightType,
  stats,
  lastOperation,
  leftModalOpen,
  rightModalOpen,
  onLeftCodeChange,
  onRightCodeChange,
  onLeftCopy,
  onLeftDownload,
  onRightCopy,
  onRightDownload,
  onLeftModalOpen,
  onLeftModalClose,
  onRightModalOpen,
  onRightModalClose,
  onClearLeft,
  onClearRight,
  onMinify,
  onUnminify,
  onBeautify,
  isLoading,
}: EditorSectionProps) {
  const { t } = useTranslations(locale)

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <ActionButtons
        locale={locale}
        stats={stats}
        lastOperation={lastOperation}
        isLoading={isLoading}
        onMinify={onMinify}
        onUnminify={onUnminify}
        onBeautify={onBeautify}
        leftCode={leftCode}
        rightCode={rightCode}
        leftType={leftType}
        rightType={rightType}
      />

      {/* Editors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Editor */}
        <EditorCard
          locale={locale}
          title={t('editor.originalCode')}
          code={leftCode}
          language={leftType}
          placeholder={t('editor.enterCode')}
          onCodeChange={onLeftCodeChange}
          onCopy={onLeftCopy}
          onDownload={onLeftDownload}
          onClear={onClearLeft}
          onModalOpen={onLeftModalOpen}
          data-testid="left-editor"
        />

        {/* Right Editor */}
        <EditorCard
          locale={locale}
          title={t('editor.result')}
          code={rightCode}
          language={rightType}
          placeholder={t('editor.resultPlaceholder')}
          onCodeChange={onRightCodeChange}
          onCopy={onRightCopy}
          onDownload={onRightDownload}
          onClear={onClearRight}
          onModalOpen={onRightModalOpen}
          readOnly={false}
          data-testid="right-editor"
        />
      </div>

      {/* Modals */}
      <ModalEditor
        isOpen={leftModalOpen}
        onClose={onLeftModalClose}
        title={t('editor.originalCode')}
        code={leftCode}
        language={leftType || 'javascript'}
        placeholder={t('editor.enterCode')}
        onCodeChange={onLeftCodeChange}
      />

      <ModalEditor
        isOpen={rightModalOpen}
        onClose={onRightModalClose}
        title={t('editor.result')}
        code={rightCode}
        language={rightType || 'javascript'}
        placeholder={t('editor.resultPlaceholder')}
        onCodeChange={onRightCodeChange}
      />
    </div>
  )
}
