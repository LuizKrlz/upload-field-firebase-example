import { cn } from "@/lib/utils";
import { useDrop } from "react-dnd";
import type { TFileItem } from "./upload-input.types";
import { useRef } from "react";

const ItemType = "card";

type TDropZoneProps = {
  targetIndex: number;
  onDropItem(dragIndex: number, hoverIndex: number): void;
  value: TFileItem[];
};

export function DropZone({ targetIndex, onDropItem, value }: TDropZoneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop({
    accept: ItemType,
    drop(item: { id: string }) {
      if (item.id) {
        const dragIndex = value.findIndex((i) => i.id === item.id);
        const hoverIndex = targetIndex;

        if (dragIndex !== hoverIndex) {
          onDropItem(dragIndex, hoverIndex);
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drop(ref);

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-md transition-all duration-300 ",
        isOver && "h-15 border border-dashed border-primary/75 my-1",
        !isOver && "bg-transparent h-[10px]"
      )}
    />
  );
}
