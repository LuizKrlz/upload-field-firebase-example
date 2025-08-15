export type TFileItem = {
  id: string;
  file: File;
  isCover?: boolean;
  previewURL: string;
  storagePath: string;
  metadata?: unknown;
};

export type TUploadListItemProps = {
  id: string;
  index: number;
  item: TFileItem;
  moveItem(dragIndex: number, hoverIndex: number): void;
  onDelete(): void;
  value: TFileItem[];
};
