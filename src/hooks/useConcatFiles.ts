'use client'

import { useState, useCallback } from 'react'
import { minifyJavaScript } from '@/lib/javascript-options'
import { minifyCSSWithOptions } from '@/lib/css-options'

interface FileItem {
  id: string
  name: string
  content: string
  type: 'js' | 'css'
  size: number
}

export function useConcatFiles() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [fileType, setFileType] = useState<'js' | 'css'>('js')
  const [addComments, setAddComments] = useState(false)
  const [addNewlines, setAddNewlines] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)

  const addFiles = useCallback((newFiles: FileItem[]) => {
    setFiles(prev => [...prev, ...newFiles])
  }, [])

  const removeFile = useCallback((id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id))
  }, [])

  const moveFile = useCallback((fromIndex: number, toIndex: number) => {
    setFiles(prev => {
      const newFiles = [...prev]
      const [movedFile] = newFiles.splice(fromIndex, 1)
      newFiles.splice(toIndex, 0, movedFile)
      return newFiles
    })
  }, [])

  const handleFileTypeChange = useCallback((type: 'js' | 'css') => {
    setFileType(type)
    setFiles([])
    setResult('')
  }, [])

  const cleanComments = useCallback((content: string, type: 'js' | 'css'): string => {
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
  }, [])

  const processFiles = useCallback(async () => {
    if (files.length === 0) return

    setIsProcessing(true)
    setResult('')

    try {
      let concatenated = ''
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        let content = file.content

        // Nettoyer les commentaires si demandé
        if (!addComments) {
          content = cleanComments(content, file.type)
        }

        // Ajouter un commentaire avec le nom du fichier
        if (addComments) {
          const comment = file.type === 'js' 
            ? `/* ${file.name} */\n`
            : `/* ${file.name} */\n`
          concatenated += comment
        }

        concatenated += content

        // Ajouter des nouvelles lignes entre les fichiers
        if (addNewlines && i < files.length - 1) {
          concatenated += '\n\n'
        }
      }

      // Minifier le résultat
      let minified = ''
      if (fileType === 'js') {
        minified = await minifyJavaScript(concatenated, {
          ecmaVersion: 'es2022',
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
          removeUnused: false,
          mergeRules: true,
          mergeMediaQueries: true,
          removeEmpty: true,
          removeComments: !addComments,
          removeWhitespace: true
        })
      }

      setResult(minified)
    } catch (error) {
      console.error('Error processing files:', error)
      setResult('Error processing files. Please check your files and try again.')
    } finally {
      setIsProcessing(false)
    }
  }, [files, fileType, addComments, addNewlines, cleanComments])

  const handleCopy = useCallback(async () => {
    if (result) {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [result])

  const handleDownload = useCallback(() => {
    if (result) {
      const blob = new Blob([result], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `concatenated.${fileType}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }, [result, fileType])

  const clearAll = useCallback(() => {
    setFiles([])
    setResult('')
    setCopied(false)
  }, [])

  return {
    // State
    files,
    fileType,
    addComments,
    addNewlines,
    isProcessing,
    result,
    copied,
    
    // Actions
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
  }
}
