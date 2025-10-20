'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { useTranslations } from '@/hooks/useTranslations'
import { useConcatFiles } from '@/hooks/useConcatFiles'
import DropZone from './ConcatModal/DropZone'
import FileList from './ConcatModal/FileList'
import ConcatOptions from './ConcatModal/ConcatOptions'
import ResultDisplay from './ConcatModal/ResultDisplay'

interface ConcatModalRefactoredProps {
  isOpen: boolean
  onClose: () => void
  onResult: (result: string, type: 'js' | 'css') => void
  locale: string
}

export default function ConcatModalRefactored({ 
  isOpen, 
  onClose, 
  onResult, 
  locale 
}: ConcatModalRefactoredProps) {
  const { t } = useTranslations(locale)
  const [showClearDialog, setShowClearDialog] = React.useState(false)
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = React.useState<number | null>(null)

  const {
    files,
    fileType,
    addComments,
    addNewlines,
    isProcessing,
    result,
    copied,
    addFiles,
    removeFile,
    moveFile,
    handleFileTypeChange,
    setAddComments,
    setAddNewlines,
    processFiles,
    handleCopy,
    handleDownload,
    clearAll,
  } = useConcatFiles()

  const handleFileUpload = (uploadedFiles: FileList) => {
    const newFiles = Array.from(uploadedFiles).map(file => {
      const reader = new FileReader()
      return new Promise<{ id: string; name: string; content: string; type: 'js' | 'css'; size: number }>((resolve) => {
        reader.onload = (e) => {
          const content = e.target?.result as string
          resolve({
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            content,
            type: fileType,
            size: file.size
          })
        }
        reader.readAsText(file)
      })
    })

    Promise.all(newFiles).then(files => {
      addFiles(files)
    })
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverIndex(index)
  }

  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

  const handleFileReorderDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      moveFile(draggedIndex, dropIndex)
    }
    
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleProcess = () => {
    processFiles()
  }

  const handleClear = () => {
    clearAll()
    setShowClearDialog(false)
  }

  const handleApply = () => {
    if (result) {
      onResult(result, fileType)
      onClose()
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {t('concat.title')}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* File Type Selection and Options */}
            <ConcatOptions
              fileType={fileType}
              addComments={addComments}
              addNewlines={addNewlines}
              onFileTypeChange={handleFileTypeChange}
              onAddCommentsChange={setAddComments}
              onAddNewlinesChange={setAddNewlines}
            />

            {/* Drop Zone */}
            <DropZone
              onFileUpload={handleFileUpload}
              fileType={fileType}
            />

            {/* File List */}
            <div>
              <h3 className="text-lg font-semibold mb-3">
                {t('concat.files')} ({files.length})
              </h3>
              <FileList
                files={files}
                draggedIndex={draggedIndex}
                dragOverIndex={dragOverIndex}
                onRemoveFile={removeFile}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleFileReorderDrop}
                onDragEnd={handleDragEnd}
              />
            </div>

            {/* Result Display */}
            <ResultDisplay
              result={result}
              isProcessing={isProcessing}
              copied={copied}
              onCopy={handleCopy}
              onDownload={handleDownload}
              fileType={fileType}
            />

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowClearDialog(true)}
                  disabled={files.length === 0 && !result}
                >
                  {t('common.clearAll')}
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={onClose}>
                  {t('common.cancel')}
                </Button>
                <Button
                  onClick={handleProcess}
                  disabled={files.length === 0 || isProcessing}
                >
                  {isProcessing ? t('concat.processing') : t('concat.process')}
                </Button>
                {result && (
                  <Button onClick={handleApply}>
                    {t('concat.apply')}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Clear Confirmation Dialog */}
      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('concat.clearTitle')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('concat.clearDescription')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleClear}>
              {t('common.clearAll')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
