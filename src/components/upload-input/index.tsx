import UploadArea from "./upload-area";
import type { TFileItem } from "./upload-input.types";
import { UploadList } from "./upload-list";

type TUploadProps = {
  value: TFileItem[];
  onChange(value: TFileItem[]): void;
  userId: string;
};

export function UploadInput({ value, onChange, userId }: TUploadProps) {
  return (
    <div className="space-y-4">
      <UploadArea {...{ value, onChange, userId }} />
      <UploadList {...{ value, onChange }} />
    </div>
  );
}
