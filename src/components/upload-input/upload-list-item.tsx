import { Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { uploadBytesResumable, ref as refStorage } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import type { TUploadListItemProps } from "./upload-input.types";

import { Progress } from "../ui/progress";
import { calculateFileSize } from "@/utils/image";

export function UploadListItem({
  id,
  index,
  item,
  moveItem,
  onDelete,
  value,
}: TUploadListItemProps) {
  const [progress, setProgress] = useState<number | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const ref = useRef(null);

  const [, drop] = useDrop(() => ({
    accept: ["card"],
    drop(item: { id: string }) {
      if (item.id) {
        const dragIndex = value.findIndex((i) => i.id === item.id);
        const hoverIndex = index;

        if (dragIndex !== hoverIndex) {
          moveItem(dragIndex, hoverIndex);
        }
      }
    },
  }));

  const [, drag] = useDrag(() => ({
    type: "card",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  drag(drop(ref));

  useEffect(() => {
    let isCancelled = false;
    if (!isUploaded) {
      const storageRef = refStorage(storage, item.storagePath);
      const uploadTask = uploadBytesResumable(
        storageRef,
        item.file,
        item?.metadata ?? undefined
      );

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          if (isCancelled) return;
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(percent);
        },
        (error) => {
          // Handle error if needed
          console.log(error);
        },
        () => {
          if (!isCancelled) {
            setIsUploaded(true);
            setProgress(null);
          }
        }
      );
    }

    return () => {
      isCancelled = true;
    };
  }, [item, isUploaded]);

  return (
    <div
      ref={ref}
      className={`flex items-center gap-4 p-3 rounded-lg border bg-muted hover:bg-accent transition-colors shadow-sm`}
    >
      <div className="flex-shrink-0">
        <img
          src={item.previewURL}
          alt={item.file.name}
          className="w-10 h-10 object-cover rounded-md border"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{item.file.name}</p>
        <small className="text-xs text-muted-foreground">
          {calculateFileSize(item.file.size)}
        </small>

        {progress && <Progress value={progress} />}
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="ml-2"
        onClick={() => {
          onDelete();
          URL.revokeObjectURL(item.previewURL);
        }}
      >
        <Trash className="w-4 h-4" />
        <span className="sr-only">Remove file</span>
      </Button>
    </div>
  );
}
