'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import CodeEditor from '@/components/CodeEditor'
import { Copy, Download, X, Eraser } from '@/lib/icons'
import { useTranslations } from '@/hooks/useTranslations'
import React, { useEffect, useRef } from 'react'

interface ModalEditorProps {
  isOpen: boolean
  onClose: () => void
  title: string
  code: string
  language: 'javascript' | 'css' | 'html' | 'json'
  placeholder: string
  onCodeChange: (value: string | undefined) => void
  onCopy: () => void
  onDownload: () => void
  onClear: () => void
  locale: string
}

export default function ModalEditor({
  isOpen,
  onClose,
  title,
  code,
  language,
  placeholder,
  onCodeChange,
  onCopy,
  onDownload,
  onClear,
  locale,
}: ModalEditorProps) {
  const { t } = useTranslations(locale)
  const modalRef = useRef<HTMLDivElement>(null)
  const lenisInstanceRef = useRef<unknown>(null)

  // Handle Lenis disable/enable when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      // Disable Lenis by adding a class to body that prevents smooth scrolling
      document.body.classList.add('lenis-disabled')
      
      // Also try to find and disable Lenis instance directly
      const lenisElement = document.querySelector('[data-lenis]')
      if (lenisElement) {
        // Store reference to Lenis instance
        const lenisInstance = (lenisElement as { __lenis?: { stop: () => void; start: () => void } }).__lenis
        if (lenisInstance) {
          lenisInstanceRef.current = lenisInstance
          lenisInstance.stop()
        }
      }
      
      // Alternative: try to find Lenis in window object
      const windowLenis = (window as { lenis?: { stop: () => void; start: () => void } }).lenis
      if (windowLenis) {
        lenisInstanceRef.current = windowLenis
        windowLenis.stop()
      }
    } else {
      // Re-enable Lenis when modal closes
      document.body.classList.remove('lenis-disabled')
      
      if (lenisInstanceRef.current) {
        (lenisInstanceRef.current as { start: () => void }).start()
        lenisInstanceRef.current = null
      }
    }

    return () => {
      // Cleanup: re-enable Lenis if component unmounts while modal is open
      document.body.classList.remove('lenis-disabled')
      if (lenisInstanceRef.current) {
        (lenisInstanceRef.current as { start: () => void }).start()
        lenisInstanceRef.current = null
      }
    }
  }, [isOpen])

  // Prevent scroll events from bubbling up to Lenis
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation()
  }

  // Force Monaco Editor refresh when modal opens
  React.useEffect(() => {
    if (isOpen) {
      // Small delay to ensure Monaco Editor is fully rendered
      const timeoutId = setTimeout(() => {
        // Trigger a resize event to force Monaco to recalculate its layout
        window.dispatchEvent(new Event('resize'))
      }, 200)

      return () => clearTimeout(timeoutId)
    }
  }, [isOpen])
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        ref={modalRef}
        className="!max-w-[75vw] lg:!max-w-[75vw] md:!max-w-[95vw] sm:!max-w-[95vw] !max-w-[95vw] !max-h-[90vh] w-full h-full p-0 flex flex-col" 
        style={{ maxHeight: '90vh' }}
        showCloseButton={false}
        onWheel={handleWheel}
      >
        <DialogHeader className="px-6 py-4 border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onCopy}
                disabled={!code.trim()}
                className="h-8 px-3"
                title={t('common.copyCode')}
              >
                <Copy className="h-4 w-4 mr-2" />
                {t('common.copy')}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onDownload}
                disabled={!code.trim()}
                className="h-8 px-3"
                title={t('common.downloadCode')}
              >
                <Download className="h-4 w-4 mr-2" />
                {t('common.download')}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
                disabled={!code.trim()}
                className="h-8 px-3"
                title={t('common.clearEditor')}
              >
                <Eraser className="h-4 w-4 mr-2" />
                {t('common.clear')}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0 cursor-pointer"
                title={t('common.closeModal')}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 p-6 overflow-hidden min-h-0" onWheel={handleWheel}>
          <div className="h-full w-full" onWheel={handleWheel}>
            <CodeEditor
              value={code}
              onChange={onCodeChange}
              language={language}
              placeholder={placeholder}
              height="100%"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
