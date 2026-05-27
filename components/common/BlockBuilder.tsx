import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ProductBlock } from "@/data/product";
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
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  FileText,
  GripVertical,
  HelpCircle,
  Images,
  Plus,
  Sparkles,
  Table as TableIcon,
  Trash2,
} from "lucide-react";
import { useState } from "react";

type AnyBlock = ProductBlock & { _id: string };

const newBlock = (type: ProductBlock["type"]): AnyBlock => {
  const _id = crypto.randomUUID();
  switch (type) {
    case "rich-text":
      return { _id, type, title: "", paragraphs: [""] };
    case "feature-highlight":
      return { _id, type, title: "", items: [{ title: "", description: "" }] };
    case "spec-table":
      return {
        _id,
        type,
        title: "",
        columns: ["Parameter", "Value"],
        rows: [["", ""]],
      };
    case "faq":
      return { _id, type, title: "", items: [{ q: "", a: "" }] };
    case "labeled-gallery":
      return {
        _id,
        type,
        title: "",
        items: [{ label: "A", caption: "", image: "" }],
      };
  }
};

const ICONS = {
  "rich-text": FileText,
  "feature-highlight": Sparkles,
  "spec-table": TableIcon,
  faq: HelpCircle,
  "labeled-gallery": Images,
} as const;

const LABELS: Record<ProductBlock["type"], string> = {
  "rich-text": "Rich Text",
  "feature-highlight": "Feature Highlight",
  "spec-table": "Spec Table",
  faq: "FAQ",
  "labeled-gallery": "Labeled Gallery",
};

type Props = {
  value: ProductBlock[];
  onChange: (v: ProductBlock[]) => void;
};

const SortableBlock = ({
  block,
  onChange,
  onRemove,
}: {
  block: AnyBlock;
  onChange: (b: AnyBlock) => void;
  onRemove: () => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block._id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  const Icon = ICONS[block.type];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-xl border border-border bg-card"
    >
      <div className="flex items-center justify-between p-3 border-b border-border bg-muted/40 rounded-t-xl">
        <div className="flex items-center gap-2">
          <button
            type="button"
            {...attributes}
            {...listeners}
            className="cursor-grab p-1 text-muted-foreground hover:text-foreground"
            aria-label="Drag"
          >
            <GripVertical className="h-4 w-4" />
          </button>
          <Icon className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">{LABELS[block.type]}</span>
        </div>
        <Button type="button" variant="ghost" size="sm" onClick={onRemove}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <Label className="text-xs">Section title (optional)</Label>
          <Input
            value={block.title || ""}
            onChange={(e) => onChange({ ...block, title: e.target.value })}
            className="mt-1"
          />
        </div>
        <BlockEditor block={block} onChange={onChange} />
      </div>
    </div>
  );
};

const BlockEditor = ({
  block,
  onChange,
}: {
  block: AnyBlock;
  onChange: (b: AnyBlock) => void;
}) => {
  if (block.type === "rich-text") {
    return (
      <div className="space-y-2">
        {block.paragraphs.map((p, i) => (
          <div key={i} className="flex gap-2">
            <Textarea
              value={p}
              onChange={(e) => {
                const next = [...block.paragraphs];
                next[i] = e.target.value;
                onChange({ ...block, paragraphs: next });
              }}
              rows={3}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() =>
                onChange({
                  ...block,
                  paragraphs: block.paragraphs.filter((_, j) => j !== i),
                })
              }
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            onChange({ ...block, paragraphs: [...block.paragraphs, ""] })
          }
        >
          <Plus className="h-4 w-4" /> Add paragraph
        </Button>
      </div>
    );
  }

  if (block.type === "feature-highlight") {
    return (
      <div className="space-y-2">
        {block.items.map((it, i) => (
          <div
            key={i}
            className="grid sm:grid-cols-[1fr_2fr_auto] gap-2 items-start"
          >
            <Input
              placeholder="Title"
              value={it.title}
              onChange={(e) => {
                const next = [...block.items];
                next[i] = { ...it, title: e.target.value };
                onChange({ ...block, items: next });
              }}
            />
            <Input
              placeholder="Description"
              value={it.description}
              onChange={(e) => {
                const next = [...block.items];
                next[i] = { ...it, description: e.target.value };
                onChange({ ...block, items: next });
              }}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() =>
                onChange({
                  ...block,
                  items: block.items.filter((_, j) => j !== i),
                })
              }
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            onChange({
              ...block,
              items: [...block.items, { title: "", description: "" }],
            })
          }
        >
          <Plus className="h-4 w-4" /> Add feature
        </Button>
      </div>
    );
  }

  if (block.type === "spec-table") {
    const setCol = (i: number, v: string) => {
      const cols = [...block.columns];
      cols[i] = v;
      onChange({ ...block, columns: cols });
    };
    const addCol = () =>
      onChange({
        ...block,
        columns: [...block.columns, "Column"],
        rows: block.rows.map((r) => [...r, ""]),
      });
    const removeCol = (i: number) =>
      onChange({
        ...block,
        columns: block.columns.filter((_, j) => j !== i),
        rows: block.rows.map((r) => r.filter((_, j) => j !== i)),
      });
    const setCell = (ri: number, ci: number, v: string) => {
      const rows = block.rows.map((r) => [...r]);
      rows[ri][ci] = v;
      onChange({ ...block, rows });
    };
    return (
      <div className="space-y-2 overflow-x-auto">
        <div className="flex gap-2">
          {block.columns.map((c, i) => (
            <div key={i} className="flex items-center gap-1">
              <Input
                value={c}
                onChange={(e) => setCol(i, e.target.value)}
                className="w-32"
              />
              {block.columns.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCol(i)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={addCol}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {block.rows.map((row, ri) => (
          <div key={ri} className="flex gap-2 items-center">
            {row.map((cell, ci) => (
              <Input
                key={ci}
                value={cell}
                onChange={(e) => setCell(ri, ci, e.target.value)}
                className="w-32"
              />
            ))}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() =>
                onChange({
                  ...block,
                  rows: block.rows.filter((_, j) => j !== ri),
                })
              }
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            onChange({
              ...block,
              rows: [...block.rows, block.columns.map(() => "")],
            })
          }
        >
          <Plus className="h-4 w-4" /> Add row
        </Button>
      </div>
    );
  }

  if (block.type === "faq") {
    return (
      <div className="space-y-2">
        {block.items.map((it, i) => (
          <div
            key={i}
            className="space-y-1 rounded-lg border border-border p-3"
          >
            <div className="flex gap-2">
              <Input
                placeholder="Question"
                value={it.q}
                onChange={(e) => {
                  const next = [...block.items];
                  next[i] = { ...it, q: e.target.value };
                  onChange({ ...block, items: next });
                }}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() =>
                  onChange({
                    ...block,
                    items: block.items.filter((_, j) => j !== i),
                  })
                }
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <Textarea
              placeholder="Answer"
              rows={2}
              value={it.a}
              onChange={(e) => {
                const next = [...block.items];
                next[i] = { ...it, a: e.target.value };
                onChange({ ...block, items: next });
              }}
            />
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            onChange({ ...block, items: [...block.items, { q: "", a: "" }] })
          }
        >
          <Plus className="h-4 w-4" /> Add FAQ
        </Button>
      </div>
    );
  }

  if (block.type === "labeled-gallery") {
    return (
      <div className="space-y-3">
        {block.items.map((it, i) => (
          <div
            key={i}
            className="grid sm:grid-cols-[80px_1fr_2fr_auto] gap-2 items-start rounded-lg border border-border p-3"
          >
            <Input
              placeholder="Label"
              value={it.label}
              onChange={(e) => {
                const next = [...block.items];
                next[i] = { ...it, label: e.target.value };
                onChange({ ...block, items: next });
              }}
            />
            <Input
              placeholder="Image URL"
              value={
                typeof it.image === "string" ? it.image : (it.image?.src ?? "")
              }
              onChange={(e) => {
                const next = [...block.items];
                next[i] = { ...it, image: e.target.value };
                onChange({ ...block, items: next });
              }}
            />
            <Input
              placeholder="Caption"
              value={it.caption || ""}
              onChange={(e) => {
                const next = [...block.items];
                next[i] = { ...it, caption: e.target.value };
                onChange({ ...block, items: next });
              }}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() =>
                onChange({
                  ...block,
                  items: block.items.filter((_, j) => j !== i),
                })
              }
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            onChange({
              ...block,
              items: [...block.items, { label: "", caption: "", image: "" }],
            })
          }
        >
          <Plus className="h-4 w-4" /> Add gallery item
        </Button>
      </div>
    );
  }

  return null;
};

export const BlockBuilder = ({ value, onChange }: Props) => {
  // Attach stable _id for DnD
  const [items, setItems] = useState<AnyBlock[]>(() =>
    value.map((b) => ({ ...b, _id: crypto.randomUUID() }) as AnyBlock),
  );
  const [addType, setAddType] = useState<ProductBlock["type"]>("rich-text");
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const sync = (next: AnyBlock[]) => {
    setItems(next);
    onChange(next.map(({ _id, ...rest }) => rest as ProductBlock));
  };

  const onDragEnd = (e: DragEndEvent) => {
    if (!e.over || e.active.id === e.over.id) return;
    const oldI = items.findIndex((b) => b._id === e.active.id);
    const newI = items.findIndex((b) => b._id === e.over!.id);
    sync(arrayMove(items, oldI, newI));
  };

  return (
    <div className="space-y-3">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={items.map((b) => b._id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {items.map((b) => (
              <SortableBlock
                key={b._id}
                block={b}
                onChange={(nb) =>
                  sync(items.map((x) => (x._id === nb._id ? nb : x)))
                }
                onRemove={() => sync(items.filter((x) => x._id !== b._id))}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {items.length === 0 && (
        <div className="rounded-lg border-2 border-dashed border-border p-8 text-center text-muted-foreground text-sm">
          No content blocks yet. Add one below.
        </div>
      )}

      <div className="flex gap-2 items-center pt-2 border-t border-border">
        <Select
          value={addType}
          onValueChange={(v) => setAddType(v as ProductBlock["type"])}
        >
          <SelectTrigger className="w-56">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(LABELS) as ProductBlock["type"][]).map((k) => (
              <SelectItem key={k} value={k}>
                {LABELS[k]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          type="button"
          variant="cta"
          onClick={() => sync([...items, newBlock(addType)])}
        >
          <Plus className="h-4 w-4" /> Add block
        </Button>
      </div>
    </div>
  );
};
