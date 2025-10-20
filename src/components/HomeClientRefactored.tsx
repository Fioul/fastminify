'use client'

import React from 'react'
import { useForceScrollLockDisable } from '@/hooks/useForceScrollLockDisable'
import { useMinificationRefactored } from '@/hooks/useMinificationRefactored'
import ToolbarRefactored from '@/components/sections/ToolbarRefactored'
import EditorSectionRefactored from '@/components/sections/EditorSectionRefactored'
import dynamic from 'next/dynamic'

const ConcatModal = dynamic(() => import('@/components/ConcatModal'), {
  ssr: false,
})

interface HomeClientRefactoredProps {
  locale: string
}

export default function HomeClientRefactored({ locale }: HomeClientRefactoredProps) {
  useForceScrollLockDisable()

  const [concatModalOpen, setConcatModalOpen] = React.useState(false)

  const {
    // State
    leftCode,
    rightCode,
    stats,
    isLoading,
    leftType,
    rightType,
    autoDetectLeft,
    autoDetectRight,
    lastOperation,
    leftModalOpen,
    rightModalOpen,
    jsOptions,
    cssOptions,
    jsonOptions,
    phpOptions,
    
    // Setters
    setLeftType,
    setRightType,
    setAutoDetectLeft,
    setAutoDetectRight,
    setJsOptions,
    setCssOptions,
    setJsonOptions,
    setPhpOptions,
    
    // Actions
    handleLeftTypeChange,
    handleRightTypeChange,
    handleLeftCodeChange,
    handleRightCodeChange,
    handleCopy,
    handleClear,
    handleClearLeft,
    handleClearRight,
    handleDownload,
    handleLeftCopy,
    handleLeftDownload,
    handleRightCopy,
    handleRightDownload,
    handleLeftModalOpen,
    handleLeftModalClose,
    handleRightModalOpen,
    handleRightModalClose,
    processMinify,
    processUnminify,
    processBeautify,
  } = useMinificationRefactored()

  return (
    <>
      <div className="space-y-6">
        <ToolbarRefactored
          locale={locale}
          leftType={leftType}
          rightType={rightType}
          autoDetectLeft={autoDetectLeft}
          autoDetectRight={autoDetectRight}
          jsOptions={jsOptions}
          cssOptions={cssOptions}
          jsonOptions={jsonOptions}
          phpOptions={phpOptions}
          isLoading={isLoading}
          leftCode={leftCode}
          rightCode={rightCode}
          onLeftTypeChange={handleLeftTypeChange}
          onRightTypeChange={handleRightTypeChange}
          onAutoDetectLeftChange={setAutoDetectLeft}
          onAutoDetectRightChange={setAutoDetectRight}
          onJsOptionsChange={setJsOptions}
          onCssOptionsChange={setCssOptions}
          onJsonOptionsChange={setJsonOptions}
          onPhpOptionsChange={setPhpOptions}
          onConcat={() => setConcatModalOpen(true)}
          onClear={handleClear}
        />

        <EditorSectionRefactored
          locale={locale}
          leftCode={leftCode}
          rightCode={rightCode}
          leftType={leftType}
          rightType={rightType}
          stats={stats}
          lastOperation={lastOperation}
          leftModalOpen={leftModalOpen}
          rightModalOpen={rightModalOpen}
          onLeftCodeChange={handleLeftCodeChange}
          onRightCodeChange={handleRightCodeChange}
          onCopy={handleCopy}
          onDownload={handleDownload}
          onLeftCopy={handleLeftCopy}
          onLeftDownload={handleLeftDownload}
          onRightCopy={handleRightCopy}
          onRightDownload={handleRightDownload}
          onLeftModalOpen={handleLeftModalOpen}
          onLeftModalClose={handleLeftModalClose}
          onRightModalOpen={handleRightModalOpen}
          onRightModalClose={handleRightModalClose}
          onClearLeft={handleClearLeft}
          onClearRight={handleClearRight}
          onMinify={processMinify}
          onUnminify={processUnminify}
          onBeautify={processBeautify}
          isLoading={isLoading}
        />
      </div>

      <ConcatModal
        isOpen={concatModalOpen}
        onClose={() => setConcatModalOpen(false)}
        onResult={(result, type) => {
          handleRightCodeChange(result)
          setRightType(type)
          setConcatModalOpen(false)
        }}
        locale={locale}
      />
    </>
  )
}
