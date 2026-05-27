"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/utils/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Building, Mail, Phone, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Inquiry = {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  country: string | null;
  message: string | null;
  items: any;
  status: "pending" | "contacted" | "closed";
  admin_notes: string | null;
  created_at: string;
};

const STATUS_COLOR = {
  pending: "destructive",
  contacted: "default",
  closed: "secondary",
} as const;

const AdminInquiries = () => {
  const qc = useQueryClient();
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const supabase = createClient();

  const { data, isLoading } = useQuery({
    queryKey: ["inquiries", filter],
    queryFn: async () => {
      let q = supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });
      if (filter !== "all") q = q.eq("status", filter as any);
      const { data, error } = await q;
      if (error) throw error;
      return data as Inquiry[];
    },
  });

  const setStatus = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: Inquiry["status"];
    }) => {
      const { error } = await supabase
        .from("inquiries")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["inquiries"] });
      toast.success("Status updated");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("inquiries").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["inquiries"] });
      toast.success("Deleted");
      setSelected(null);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Quote requests</h1>
          <p className="text-muted-foreground">
            Customer inquiries from the public site.
          </p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {isLoading ? (
          <div className="p-4 space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : data?.length === 0 ? (
          <p className="p-12 text-center text-muted-foreground">
            No inquiries yet.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Name</th>
                <th className="p-3">Company</th>
                <th className="p-3">Email</th>
                <th className="p-3">Items</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((i) => (
                <tr
                  key={i.id}
                  onClick={() => setSelected(i)}
                  className="border-t border-border hover:bg-muted/40 cursor-pointer"
                >
                  <td className="p-3 text-muted-foreground whitespace-nowrap">
                    {format(new Date(i.created_at), "MMM d")}
                  </td>
                  <td className="p-3 font-medium">{i.name}</td>
                  <td className="p-3 text-muted-foreground">
                    {i.company || "—"}
                  </td>
                  <td className="p-3 text-muted-foreground">{i.email}</td>
                  <td className="p-3">
                    {Array.isArray(i.items) ? i.items.length : 0}
                  </td>
                  <td className="p-3">
                    <Badge variant={STATUS_COLOR[i.status]}>{i.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 text-sm">
                <div className="flex flex-wrap gap-3 text-muted-foreground">
                  {selected.company && (
                    <span className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      {selected.company}
                    </span>
                  )}
                  <a
                    href={`mailto:${selected.email}`}
                    className="flex items-center gap-1 hover:text-foreground"
                  >
                    <Mail className="h-4 w-4" />
                    {selected.email}
                  </a>
                  {selected.phone && (
                    <a
                      href={`tel:${selected.phone}`}
                      className="flex items-center gap-1 hover:text-foreground"
                    >
                      <Phone className="h-4 w-4" />
                      {selected.phone}
                    </a>
                  )}
                </div>
                {selected.country && (
                  <div>
                    <span className="text-muted-foreground">Country/City:</span>{" "}
                    {selected.country}
                  </div>
                )}
                {selected.message && (
                  <div>
                    <div className="font-medium mb-1">Message</div>
                    <p className="rounded-lg bg-muted p-3 whitespace-pre-wrap">
                      {selected.message}
                    </p>
                  </div>
                )}
                {Array.isArray(selected.items) && selected.items.length > 0 && (
                  <div>
                    <div className="font-medium mb-1">Requested products</div>
                    <ul className="list-disc list-inside text-muted-foreground">
                      {selected.items.map((it: any, i: number) => (
                        <li key={i}>
                          {it.name || it.slug} × {it.qty || 1}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <Select
                    value={selected.status}
                    onValueChange={(v) =>
                      setStatus.mutate({ id: selected.id, status: v as any })
                    }
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (confirm("Delete this inquiry?"))
                        del.mutate(selected.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" /> Delete
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminInquiries;
