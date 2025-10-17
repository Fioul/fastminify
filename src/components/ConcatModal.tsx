'use client'

import { useState, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { TooltipInfo } from '@/components/TooltipInfo'
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
}

export default function ConcatModal({ isOpen, onClose, onResult }: ConcatModalProps) {
  const [files, setFiles] = useState<FileItem[]>([])
  const [fileType, setFileType] = useState<'js' | 'css'>('js')
  const [addComments, setAddComments] = useState(true)
  const [addNewlines, setAddNewlines] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
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

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    handleFileUpload(files)
  }, [handleFileUpload])

  const handleDragOver = useCallback((e: React.DragEvent) => {
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

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id))
  }

  const processFiles = async () => {
    if (files.length === 0) return

    setIsProcessing(true)
    setResult('')

    try {
      let concatenated = ''
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        
        // Ajouter le nom du fichier en commentaire
        if (addComments) {
          if (fileType === 'js') {
            concatenated += `// ${file.name}\n`
          } else {
            concatenated += `/* ${file.name} */\n`
          }
        }
        
        // Ajouter le contenu du fichier
        concatenated += file.content
        
        // Ajouter une nouvelle ligne entre les fichiers
        if (addNewlines && i < files.length - 1) {
          concatenated += '\n\n'
        }
      }

      // Minifier le résultat
      let minified = concatenated
      if (fileType === 'js') {
        minified = await minifyJavaScript(concatenated, {
          ecmaVersion: 'es2020',
          compressionLevel: 'normal',
          browserSupport: 'modern',
          preserveClassNames: false,
          preserveFunctionNames: false,
          removeConsole: false,
          removeDebugger: false
        })
      } else {
        minified = await minifyCSSWithOptions(concatenated, {
          compressionLevel: 'normal',
          browserSupport: 'modern',
          removeComments: true,
          convertColors: true,
          mergeRules: true,
          minifySelectors: true
        })
      }

      setResult(minified)
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
    a.download = `concatenated.${fileType}`
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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Concatenate Files
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6">
          {/* File Type Selection */}
          <div className="flex items-center gap-4">
            <Label className="text-sm font-medium">File Type</Label>
            <Select value={fileType} onValueChange={(value: 'js' | 'css') => setFileType(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="js">JavaScript</SelectItem>
                <SelectItem value="css">CSS</SelectItem>
              </SelectContent>
            </Select>
            <TooltipInfo content="Select the type of files you want to concatenate" />
          </div>

          {/* Drop Zone */}
          <Card>
            <CardContent className="p-6">
              <div
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium mb-2">Drop files here or click to browse</p>
                <p className="text-sm text-gray-500 mb-4">
                  Supports: .{fileType} files
                </p>
                <Button variant="outline" size="sm">
                  Select Files
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
                <CardTitle className="text-lg">Files to Concatenate ({files.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={file.id}
                      className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50 dark:bg-gray-800"
                    >
                      <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
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
                        className="h-8 w-8 p-0"
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
              <CardTitle className="text-lg">Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="add-comments">Add file names as comments</Label>
                  <p className="text-sm text-gray-500">
                    Add file names as comments in the output
                  </p>
                </div>
                <Switch
                  id="add-comments"
                  checked={addComments}
                  onCheckedChange={setAddComments}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="add-newlines">Add newlines between files</Label>
                  <p className="text-sm text-gray-500">
                    Add blank lines between concatenated files
                  </p>
                </div>
                <Switch
                  id="add-newlines"
                  checked={addNewlines}
                  onCheckedChange={setAddNewlines}
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
              className="w-full max-w-md"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Processing...
                </>
              ) : (
                `Concatenate & Minify ${files.length} file${files.length !== 1 ? 's' : ''}`
              )}
            </Button>
          </div>

          {/* Progress Bar */}
          {isProcessing && (
            <div className="space-y-2">
              <Progress value={50} className="w-full" />
              <p className="text-sm text-center text-gray-500">
                Processing files...
              </p>
            </div>
          )}

          {/* Result */}
          {result && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Result</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyResult}
                      className="flex items-center gap-2"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadResult}
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onResult(result, fileType)}
                    >
                      Use Result
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-auto max-h-64 text-sm">
                  {result}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
