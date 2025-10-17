'use client'

import React from 'react'
import { useMinification } from '@/hooks/useMinification'
import { useForceScrollLockDisable } from '@/hooks/useForceScrollLockDisable'
import HeroSection from '@/components/sections/HeroSection'
import Toolbar from '@/components/sections/Toolbar'
import EditorSection from '@/components/sections/EditorSection'
import ContentSections from '@/components/sections/ContentSections'
import ConcatModal from '@/components/ConcatModal'

interface PageProps {
    params: Promise<{ locale: string }>
}

export default function Page({ params }: PageProps) {
    // Use React.use() to unwrap the Promise
    const { locale } = React.use(params)
    
    // Force disable scroll lock pour éviter le décalage du contenu
    useForceScrollLockDisable()
    
    // State for concat modal
    const [concatModalOpen, setConcatModalOpen] = React.useState(false)
    
    // Use the custom minification hook
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
        <div className="gradient-bg">
            <div className="container max-w-[1440px] mx-auto px-4 py-10">
            {/* HERO SECTION */}
                <HeroSection locale={locale} />

                {/* TOOLBAR */}
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

                {/* MAIN CONTENT - EDITORS SECTION */}
                <div className="flex justify-center mb-6">
                    <div className="max-w-[930px] w-full">
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
                    isLoading={isLoading}
                />
                </div>
            </div>

            {/* CONTENT SECTIONS FOR SEO */}
                <ContentSections locale={locale} />
                
                {/* CONCAT MODAL */}
                <ConcatModal
                    isOpen={concatModalOpen}
                    onClose={() => setConcatModalOpen(false)}
                    onResult={(result, type) => {
                        handleRightCodeChange(result)
                        setRightType(type)
                        setConcatModalOpen(false)
                    }}
                />
            </div>
        </div>
    )
}
