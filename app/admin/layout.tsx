import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminQueryProvider } from "@/components/admin/AdminQueryProvider";

export default function AdminLayoutRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminLayout>
      <AdminQueryProvider>{children}</AdminQueryProvider>
    </AdminLayout>
  );
}
