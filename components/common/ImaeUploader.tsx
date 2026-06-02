"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Loader2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

type Props = {
  bucket: "product-images" | "project-images";
  values: string[];
  onChange: (urls: string[]) => void;
  multiple?: boolean;
  label?: string;
};

const SortableThumb = ({
  url,
  onRemove,
}: {
  url: string;
  onRemove: () => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: url });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative aspect-square rounded-lg overflow-hidden border border-border bg-muted"
    >
      <img src={url} alt="" className="h-full w-full object-cover" />
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="absolute top-1 left-1 rounded bg-background/80 p-1 cursor-grab opacity-0 group-hover:opacity-100"
        aria-label="Drag"
      >
        <GripVertical className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-1 rounded bg-destructive text-destructive-foreground p-1 opacity-0 group-hover:opacity-100"
        aria-label="Remove"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

export const ImageUploader = ({
  bucket,
  values,
  onChange,
  multiple = true,
  label,
}: Props) => {
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );
  const supabase = createClient();

  const upload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop() || "jpg";
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error } = await supabase.storage
          .from(bucket)
          .upload(path, file, { upsert: false });
        if (error) throw error;
        const { data } = supabase.storage.from(bucket).getPublicUrl(path);
        uploaded.push(data.publicUrl);
      }
      onChange(multiple ? [...values, ...uploaded] : uploaded.slice(0, 1));
      toast.success(
        `${uploaded.length} image${uploaded.length > 1 ? "s" : ""} uploaded`,
      );
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const addUrl = () => {
    const u = urlInput.trim();
    if (!u) return;
    onChange(multiple ? [...values, u] : [u]);
    setUrlInput("");
  };

  const onDragEnd = (e: DragEndEvent) => {
    if (!e.over || e.active.id === e.over.id) return;
    const oldIdx = values.indexOf(String(e.active.id));
    const newIdx = values.indexOf(String(e.over.id));
    onChange(arrayMove(values, oldIdx, newIdx));
  };

  return (
    <div>
      {label && <div className="text-sm font-medium mb-2">{label}</div>}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          upload(e.dataTransfer.files);
        }}
        className="rounded-lg border-2 border-dashed border-border bg-muted/40 p-6 text-center hover:border-primary/50 transition-colors"
      >
        <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">
          Drag & drop or click to upload
        </p>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={(e) => upload(e.target.files)}
          className="hidden"
        />
        <div className="mt-3 flex justify-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Choose files"
            )}
          </Button>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <Input
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="…or paste an image URL"
        />
        <Button type="button" variant="outline" onClick={addUrl}>
          Add URL
        </Button>
      </div>

      {values.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext items={values} strategy={rectSortingStrategy}>
            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {values.map((url) => (
                <SortableThumb
                  key={url}
                  url={url}
                  onRemove={() => onChange(values.filter((v) => v !== url))}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};
