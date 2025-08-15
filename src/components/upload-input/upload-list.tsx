import { useUploadList } from "./hooks/use-upload-list";
import { UploadListItem } from "./upload-list-item";
import { DropZone } from "./dropzone";
import type { TFileItem } from "./upload-input.types";

export function UploadList({
  value = [],
  onChange,
}: {
  value: TFileItem[];
  onChange(value: TFileItem[]): void;
}) {
  const { onDelete, onMove } = useUploadList({ value, onChange });

  if (Array.isArray(value) && value.length === 0) return <></>;

  return (
    <ul className="border border-accent p-4 rounded-md">
      <DropZone targetIndex={0} onDropItem={onMove} value={value} />
      {value.map((item, index) => (
        <div key={item.id}>
          <UploadListItem
            item={item}
            index={index}
            id={item.id}
            moveItem={onMove}
            value={value}
            onDelete={() => {
              onDelete(item.id);
            }}
          />
          <DropZone targetIndex={index + 1} onDropItem={onMove} value={value} />
        </div>
      ))}
    </ul>
  );
}
