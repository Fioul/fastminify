'use client'

import React, { useState, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { TooltipInfo } from '@/components/TooltipInfo'
import { useTranslations } from '@/hooks/useTranslations'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { 
  GripVertical, 
  X, 
  Upload, 
  FileText, 
  Download,
  Copy,
  Check
} from 'lucide-react'
import { minifyJavaScript } from '@/lib/javascript-options'
import { minifyCSSWithOptions } from '@/lib/css-options'

interface FileItem {
  id: string
  name: string
  content: string
  type: 'js' | 'css'
  size: number
}

interface ConcatModalProps {
  isOpen: boolean
  onClose: () => void
  onResult: (result: string, type: 'js' | 'css') => void
  locale: string
}

export default function ConcatModal({ isOpen, onClose, onResult, locale }: ConcatModalProps) {
  const { t } = useTranslations(locale)
  const [files, setFiles] = useState<FileItem[]>([])
  const [fileType, setFileType] = useState<'js' | 'css'>('js')
  const [addComments, setAddComments] = useState(false)
  const [addNewlines, setAddNewlines] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = useCallback((uploadedFiles: FileList) => {
    const newFiles: FileItem[] = []
    
    Array.from(uploadedFiles).forEach((file) => {
      const extension = file.name.split('.').pop()?.toLowerCase()
      if (extension === 'js' || extension === 'css') {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          const fileItem: FileItem = {
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            content,
            type: extension as 'js' | 'css',
            size: file.size
          }
          newFiles.push(fileItem)
          
          if (newFiles.length === uploadedFiles.length) {
            setFiles(prev => [...prev, ...newFiles])
          }
        }
        reader.readAsText(file)
      }
    })
  }, [])

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    handleFileUpload(files)
  }, [handleFileUpload])

  const handleDropZoneDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const moveFile = (fromIndex: number, toIndex: number) => {
    setFiles(prev => {
      const newFiles = [...prev]
      const [movedFile] = newFiles.splice(fromIndex, 1)
      newFiles.splice(toIndex, 0, movedFile)
      return newFiles
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

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id))
  }

  const handleFileTypeChange = (value: 'js' | 'css') => {
    setFileType(value)
    // Effacer la liste des fichiers quand on change de langage
    setFiles([])
    setResult('')
  }

  // Fonction pour nettoyer les commentaires existants
  const cleanComments = (content: string, type: 'js' | 'css'): string => {
    if (type === 'js') {
      // Supprimer les commentaires de bloc /* */ d'abord
      let cleaned = content.replace(/\/\*[\s\S]*?\*\//g, '')
      
      // Puis supprimer les commentaires de ligne // (en évitant les chaînes de caractères)
      cleaned = cleaned.replace(/\/\/.*$/gm, '')
      
      // Nettoyer les lignes vides multiples
      cleaned = cleaned.replace(/\n\s*\n\s*\n/g, '\n\n')
      
      return cleaned.trim()
    } else {
      // Supprimer les commentaires CSS (/* */)
      return content
        .replace(/\/\*[\s\S]*?\*\//g, '') // Commentaires CSS /* */
        .replace(/\n\s*\n\s*\n/g, '\n\n') // Nettoyer les lignes vides multiples
        .trim()
    }
  }

  const processFiles = async () => {
    if (files.length === 0) return

    setIsProcessing(true)
    setResult('')

    // Scroll vers le bas de la modal pour voir le résultat
    setTimeout(() => {
      const modalContent = document.querySelector('[role="dialog"] .overflow-y-auto') as HTMLElement
      if (modalContent) {
        modalContent.scrollTo({ top: modalContent.scrollHeight, behavior: 'smooth' })
      }
    }, 100)

    try {
      let concatenated = ''
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        
        // Nettoyer le contenu des commentaires existants
        const cleanedContent = file.content // Temporairement désactivé pour debug
        
        // Minifier le contenu de chaque fichier individuellement
        let minifiedContent = cleanedContent
        if (fileType === 'js') {
          minifiedContent = await minifyJavaScript(cleanedContent, {
            ecmaVersion: 'es2020',
            compressionLevel: 'normal',
            browserSupport: 'modern',
            preserveClassNames: false,
            preserveFunctionNames: false,
            removeConsole: false,
            removeDebugger: false
          })
        } else {
          minifiedContent = await minifyCSSWithOptions(cleanedContent, {
            compressionLevel: 'normal',
            browserSupport: 'modern',
            removeComments: true // Toujours supprimer les commentaires du contenu
          })
        }
        
        // Ajouter de l'espacement avant le fichier (sauf pour le premier)
        if (i > 0 && (addComments || addNewlines)) {
          concatenated += '\n'
        }
        
        // Ajouter le nom du fichier en commentaire avec espacement
        if (addComments) {
          if (fileType === 'js') {
            concatenated += `// ${file.name}\n`
          } else {
            concatenated += `/* ${file.name} */\n`
          }
        }
        
        // Ajouter le contenu minifié du fichier
        concatenated += minifiedContent
        
        // Ajouter un newline après le contenu pour séparer du prochain fichier
        if (i < files.length - 1 && (addComments || addNewlines)) {
          concatenated += '\n'
        }
      }

      setResult(concatenated)
      
      // Scroll vers le bas pour voir le résultat
      setTimeout(() => {
        const modalContent = document.querySelector('[role="dialog"] .overflow-y-auto') as HTMLElement
        if (modalContent) {
          modalContent.scrollTo({ top: modalContent.scrollHeight, behavior: 'smooth' })
        }
      }, 200)
    } catch (error) {
      console.error('Error processing files:', error)
      setResult('Error processing files. Please check your files and try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const downloadResult = () => {
    const blob = new Blob([result], { type: fileType === 'js' ? 'application/javascript' : 'text/css' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    
    // Générer un nom de fichier avec timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
    const extension = fileType === 'js' ? 'min.js' : 'min.css'
    a.download = `fastminify-${timestamp}.${extension}`
    
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleClose = () => {
    setFiles([])
    setResult('')
    setCopied(false)
    onClose()
  }

  // Bloquer le scroll de la page principale quand la modal est ouverte
  React.useEffect(() => {
    if (isOpen) {
      // Sauvegarder la position actuelle du scroll
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      
      return () => {
        // Restaurer le scroll quand la modal se ferme
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [isOpen])


  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent 
        className="!max-w-[40vw] max-h-[90vh] overflow-hidden flex flex-col"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
{t('common.concatenateFiles')}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="grid gap-6 transition-all duration-300 grid-cols-1">
            {/* Files and options */}
            <div className="space-y-6">
          {/* File Type Selection */}
          <div className="flex items-center gap-4">
            <Label className="text-sm font-medium">{t('common.fileType')}</Label>
            <Select value={fileType} onValueChange={handleFileTypeChange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="js">JavaScript</SelectItem>
                <SelectItem value="css">CSS</SelectItem>
              </SelectContent>
            </Select>
            <TooltipInfo content={t('common.selectFileType')} />
          </div>

          {/* Drop Zone */}
          <Card>
            <CardContent className="p-6">
              <div
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-primary dark:hover:border-primary transition-colors cursor-pointer"
                onDrop={handleFileDrop}
                onDragOver={handleDropZoneDragOver}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium mb-2">{t('common.dropFilesHere')}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {t('common.supportsFiles').replace('{type}', fileType)}
                </p>
                <Button variant="outline" size="sm" className="cursor-pointer btn-outline-hover">
                  {t('common.selectFiles')}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept={`.${fileType}`}
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                  className="hidden"
                />
              </div>
            </CardContent>
          </Card>

          {/* File List */}
          {files.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('common.filesToConcatenate').replace('{count}', files.length.toString())}</CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  {t('common.filesOrderHelp')}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={file.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleFileReorderDrop(e, index)}
                      onDragEnd={handleDragEnd}
                      className={`flex items-center gap-3 p-3 border rounded-lg transition-all duration-200 ${
                        draggedIndex === index 
                          ? 'opacity-50 scale-95 bg-blue-50 dark:bg-blue-900/20' 
                          : dragOverIndex === index
                          ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-600'
                          : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <GripVertical className="h-4 w-4 text-gray-400 cursor-move hover:text-gray-600" />
                      <FileText className="h-4 w-4 text-blue-500" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {file.type.toUpperCase()}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                        className="h-8 w-8 p-0 cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('common.options')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="add-comments">{t('common.addFileNamesAsComments')}</Label>
                  <p className="text-sm text-gray-500">
                    {t('common.addFileNamesAsCommentsDesc')}
                  </p>
                </div>
                <Switch
                  id="add-comments"
                  checked={addComments}
                  onCheckedChange={setAddComments}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="add-newlines">{t('common.addNewlinesBetweenFiles')}</Label>
                  <p className="text-sm text-gray-500">
                    {t('common.addNewlinesBetweenFilesDesc')}
                  </p>
                </div>
                <Switch
                  id="add-newlines"
                  checked={addNewlines}
                  onCheckedChange={setAddNewlines}
                  className="cursor-pointer"
                />
              </div>
            </CardContent>
          </Card>

              {/* Process Button */}
              <div className="flex justify-center">
                <Button
                  onClick={processFiles}
                  disabled={files.length === 0 || isProcessing}
                  size="lg"
                  className="w-full cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      {t('common.processingFiles')}
                    </>
                  ) : (
                    t('common.concatenateAndMinify').replace('{count}', files.length.toString()).replace('{plural}', files.length !== 1 ? 's' : '')
                  )}
                </Button>
              </div>

              {/* Progress Bar */}
              {isProcessing && (
                <div className="space-y-2">
                  <Progress value={50} className="w-full" />
                  <p className="text-sm text-center text-gray-500">
                    {t('common.processingFiles')}
                  </p>
                </div>
              )}

              {/* Result Section (only when there's a result) */}
              {result && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{t('common.result')}</CardTitle>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={copyResult}
                            className="flex items-center gap-2 cursor-pointer btn-outline-hover"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            {copied ? t('common.copied') : t('common.copy')}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={downloadResult}
                            className="flex items-center gap-2 cursor-pointer btn-outline-hover"
                          >
                            <Download className="h-4 w-4" />
                            {t('common.download')}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onResult(result, fileType)}
                            className="cursor-pointer btn-outline-hover"
                          >
                            {t('common.useResult')}
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-auto max-h-[54vh] text-sm whitespace-pre-wrap break-words w-full">
                        {result}
                      </pre>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={handleClose} className="cursor-pointer btn-outline-hover">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
