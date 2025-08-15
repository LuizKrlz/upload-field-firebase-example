import type { TFileItem } from "../upload-input.types";

export function useUploadList({
  value,
  onChange,
}: {
  value: TFileItem[];
  onChange(value: TFileItem[]): void;
}) {
  const onMove = (dragIndex, hoverIndex) => {
    const updated = [...value];
    const [removed] = updated.splice(dragIndex, 1);
    updated.splice(hoverIndex, 0, removed);
    onChange(updated);
  };

  const onDelete = (id: string) => {
    const items = value.filter((item) => item.id !== id);
    onChange(items);
  };

  return {
    onMove,
    onDelete,
  };
}
