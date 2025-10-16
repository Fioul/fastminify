'use client'

import React, { useState } from 'react'
import { useMinification } from '@/hooks/useMinification'
import HeroSection from '@/components/sections/HeroSection'
import Toolbar from '@/components/sections/Toolbar'
import EditorSection from '@/components/sections/EditorSection'
import ContentSections from '@/components/sections/ContentSections'
import AdPlaceholder from '@/components/sections/AdPlaceholder'

interface PageProps {
    params: Promise<{ locale: string }>
}

export default function Page({ params }: PageProps) {
    // Use React.use() to unwrap the Promise
    const { locale } = React.use(params)
    
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
        handleDownload,
    } = useMinification()

    // State for floating ad
    const [showFloatingAd, setShowFloatingAd] = useState(true)


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
                    onLeftTypeChange={setLeftType}
                    onRightTypeChange={setRightType}
                    onAutoDetectLeftChange={setAutoDetectLeft}
                    onAutoDetectRightChange={setAutoDetectRight}
                    onJsOptionsChange={setJsOptions}
                    onCssOptionsChange={setCssOptions}
                    onJsonOptionsChange={setJsonOptions}
                    onPhpOptionsChange={setPhpOptions}
                    onMinify={processMinify}
                    onUnminify={processUnminify}
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
                            onLeftCodeChange={handleLeftCodeChange}
                            onRightCodeChange={handleRightCodeChange}
                            onCopy={handleCopy}
                            onDownload={handleDownload}
                        />
                    </div>
                </div>

                {/* SIDEBAR ADS */}
                <AdPlaceholder type="sidebar-left" />
                <AdPlaceholder type="sidebar-right" />

                {/* CONTENT SECTIONS FOR SEO */}
                <ContentSections locale={locale} />

                {/* BOTTOM BANNER AD - Static version for mobile */}
                <AdPlaceholder type="mobile-banner" />

                {/* FLOATING BANNER AD - Desktop only */}
                {showFloatingAd && (
                    <AdPlaceholder 
                        type="floating-banner" 
                        onClose={() => setShowFloatingAd(false)} 
                    />
                )}

                {/* Add bottom padding to prevent content from being hidden behind floating ad */}
                <div className="h-24 xl:block hidden"></div>
            </div>
        </div>
    )
}
