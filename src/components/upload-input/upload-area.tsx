import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import type { TFileItem } from "./upload-input.types";

import { makeId } from "@/utils/make-id";

type TUploadAreaProps = {
  value: TFileItem[];
  onChange(value: TFileItem[]): void;
  userId: string;
};

export default function UploadArea({
  value,
  onChange,
  userId,
}: TUploadAreaProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newMap: TFileItem[] = acceptedFiles.flatMap((i) => ({
        id: makeId(),
        file: i,
        isCover: false,
        previewURL: URL.createObjectURL(i),
        storagePath: `UserFolder/${userId}/${i.name}`,
        metadata: {
          contentType: i.type,
        },
      }));

      onChange(newMap);
    },
    [onChange, userId]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const coverImage = value && value.length ? value[0] : null;

  return (
    <div
      {...getRootProps()}
      className={`
      flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8
      transition-colors duration-200 outline-none
      ${
        isDragActive
          ? "border-primary bg-primary/10"
          : "border-muted bg-background hover:border-primary/60"
      }
      cursor-pointer focus:ring-2 focus:ring-primary/50
      `}
      {...(coverImage && {
        style: {
          backgroundImage: `url(${coverImage.previewURL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        },
      })}
      tabIndex={0}
    >
      <input {...getInputProps()} className="sr-only" />
      <div className="flex flex-col items-center gap-2">
        <svg
          className={`w-10 h-10 ${
            coverImage
              ? "text-white"
              : isDragActive
              ? "text-primary"
              : "text-muted-foreground"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16v-8m0 0l-4 4m4-4l4 4M20 16.58A5 5 0 0018 7h-1.26A8 8 0 104 15.25"
          />
        </svg>
        {isDragActive ? (
          <p className="text-primary font-semibold">Drop the files here</p>
        ) : (
          <div className={coverImage ? "bg-white/75 p-2 rounded-md" : ""}>
            <p className="text-muted-foreground">
              Drag and drop files here, or{" "}
              <span className="text-primary underline font-medium">
                click to select
              </span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Supported formats: PNG, JPG, PDF, etc.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
