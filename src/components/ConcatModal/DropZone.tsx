'use client'

import React, { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Upload, FileText } from '@/lib/icons'

interface DropZoneProps {
  onFileUpload: (files: FileList) => void
  fileType: 'js' | 'css'
}

export default function DropZone({ onFileUpload, fileType }: DropZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (uploadedFiles: FileList) => {
    const validFiles = Array.from(uploadedFiles).filter(file => {
      const extension = file.name.split('.').pop()?.toLowerCase()
      return extension === fileType
    })
    
    if (validFiles.length > 0) {
      onFileUpload(validFiles as FileList)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileUpload(e.target.files)
    }
  }

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault()
    handleFileUpload(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Card
      className="border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors cursor-pointer"
      onDrop={handleFileDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
    >
      <CardContent className="p-8 text-center">
        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">
          Upload {fileType.toUpperCase()} Files
        </h3>
        <p className="text-muted-foreground mb-4">
          Drag and drop your {fileType.toUpperCase()} files here, or click to browse
        </p>
        <Button variant="outline" size="sm">
          <FileText className="h-4 w-4 mr-2" />
          Choose Files
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={`.${fileType}`}
          onChange={handleFileInputChange}
          className="hidden"
        />
      </CardContent>
    </Card>
  )
}
