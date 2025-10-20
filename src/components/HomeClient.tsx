'use client'

import React from 'react'
import { useMinification } from '@/hooks/useMinification'
import { useForceScrollLockDisable } from '@/hooks/useForceScrollLockDisable'
import Toolbar from '@/components/sections/Toolbar'
import EditorSection from '@/components/sections/EditorSection'
import ContentSections from '@/components/sections/ContentSections'
import dynamic from 'next/dynamic'

const ConcatModal = dynamic(() => import('@/components/ConcatModal'), {
  ssr: false,
  loading: () => null,
})

interface HomeClientProps {
  locale: string
}

export default function HomeClient({ locale }: HomeClientProps) {
  useForceScrollLockDisable()

  const [concatModalOpen, setConcatModalOpen] = React.useState(false)

  const {
    leftCode,
    rightCode,
    stats,
    isLoading,
    leftType,
    rightType,
    autoDetectLeft,
    autoDetectRight,
    lastOperation,
    jsOptions,
    cssOptions,
    jsonOptions,
    phpOptions,
    setLeftType,
    setRightType,
    setAutoDetectLeft,
    setAutoDetectRight,
    handleLeftTypeChange,
    handleRightTypeChange,
    setJsOptions,
    setCssOptions,
    setJsonOptions,
    setPhpOptions,
    processMinify,
    processUnminify,
    processBeautify,
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
    leftModalOpen,
    rightModalOpen,
    handleLeftModalOpen,
    handleLeftModalClose,
    handleRightModalOpen,
    handleRightModalClose,
  } = useMinification()

  return (
    <>
      <Toolbar
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

      <div className="flex justify-center mb-6">
        <div className="max-w-[1200px] w-full">
          <EditorSection
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
      </div>

      <ContentSections locale={locale} />

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


