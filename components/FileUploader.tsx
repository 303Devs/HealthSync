'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import Image from 'next/image';
import { convertFileToUrl } from '@/lib/utils';

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

const ACCEPTED_TYPES = {
  'image/svg+xml': ['.svg'],
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'application/pdf': ['.pdf'],
};
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const [error, setError] = useState<string | null>(null);
  const fileUrl = useMemo(
    () => (files && files.length > 0 ? convertFileToUrl(files[0]) : null),
    [files]
  );

  useEffect(() => {
    return () => {
      if (fileUrl) URL.revokeObjectURL(fileUrl);
    };
  }, [fileUrl]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length > 0) {
        const code = rejectedFiles[0].errors[0]?.code;
        if (code === 'file-too-large') {
          setError('File must be under 5MB');
        } else if (code === 'file-invalid-type') {
          setError('Only SVG, PNG, JPG, and PDF files are accepted');
        } else {
          setError('Invalid file. Please try again.');
        }
        return;
      }
      setError(null);
      onChange(acceptedFiles);
    },
    [onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: MAX_SIZE,
    multiple: false,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className='file-upload'>
        <input {...getInputProps()} />
        {fileUrl ?
          <Image
            src={fileUrl}
            alt={'uploaded image'}
            width={1000}
            height={1000}
            className='max-h-[400px] overflow-hidden object-cover'
          />
        : <>
            <Image
              src='/assets/icons/upload.svg'
              alt='upload'
              width={40}
              height={40}
            />
            <div className='file-upload_label'>
              <p className='text-14-regular'>
                <span className='text-green-500'>Click to Upload</span>
                {` or Drag and Drop`}
              </p>
              <p>SVG, PNG, JPG, PDF (max 5MB)</p>
            </div>
          </>
        }
      </div>
      {error && <p className='shad-error text-14-regular mt-2'>{error}</p>}
    </div>
  );
};

export default FileUploader;
