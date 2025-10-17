'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import CodeEditor from '@/components/CodeEditor'
import { Copy, Download, X } from 'lucide-react'

interface ModalEditorProps {
  isOpen: boolean
  onClose: () => void
  title: string
  code: string
  language: string
  placeholder: string
  onCodeChange: (value: string | undefined) => void
  onCopy: () => void
  onDownload: () => void
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
}: ModalEditorProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="!max-w-[75vw] !max-h-[90vh] w-full h-full p-0 flex flex-col" 
        style={{ maxWidth: '75vw', maxHeight: '90vh' }}
        showCloseButton={false}
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
                title="Copy code"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onDownload}
                disabled={!code.trim()}
                className="h-8 px-3"
                title="Download code"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
                title="Close modal"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 p-6 overflow-hidden min-h-0">
          <div className="h-full w-full">
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
