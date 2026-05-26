import { AdminLayout } from "@/components/admin/AdminLayout";

export default function AdminLayoutRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminLayout>{children}</AdminLayout>;
}
