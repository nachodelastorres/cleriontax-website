"use client";

import { useCallback, useState } from "react";
import { Upload, X, FileText } from "lucide-react";
import { useTranslations } from 'next-intl';
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  error?: string;
}

export default function FileUpload({ onFileSelect, error }: FileUploadProps) {
  const t = useTranslations('contact.form');
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        handleFile(droppedFile);
      }
    },
    [onFileSelect]
  );

  const handleFile = (selectedFile: File) => {
    // Validate file type
    const validTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (!validTypes.includes(selectedFile.type) && !selectedFile.name.endsWith(".csv")) {
      alert(t('fileErrorType'));
      return;
    }

    // Validate file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      alert(t('fileErrorSize'));
      return;
    }

    setFile(selectedFile);
    onFileSelect(selectedFile);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    onFileSelect(null);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-pizarra mb-2">
        {t('file')}
      </label>

      {!file ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative border-2 border-dashed  p-8 text-center transition-colors cursor-pointer",
            isDragging
              ? "border-rojo bg-rojo/5"
              : "border-niebla hover:border-rojo hover:bg-papel",
            error && "border-rojo"
          )}
        >
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Upload className="h-10 w-10 text-pizarra mx-auto mb-4" />
          <p className="text-sm text-pizarra mb-1">
            {t('fileDragText')}
          </p>
          <p className="text-xs text-pizarra">
            {t('fileClickText')}
          </p>
        </div>
      ) : (
        <div className="border border-niebla p-4 flex items-center justify-between bg-papel">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-rojo shrink-0" />
            <div>
              <p className="text-sm font-medium text-azul">{file.name}</p>
              <p className="text-xs text-pizarra">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={removeFile}
            className="p-2 hover:bg-niebla transition-colors"
          >
            <X className="h-5 w-5 text-pizarra" />
          </button>
        </div>
      )}

      {error && <p className="mt-1.5 text-sm text-rojo">{error}</p>}
    </div>
  );
}
