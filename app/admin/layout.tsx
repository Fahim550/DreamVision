import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminQueryProvider } from "@/components/admin/AdminQueryProvider";
import { AuthProvider } from "@/components/hooks/useAuth";

export default function AdminLayoutRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <AdminLayout>
        <AdminQueryProvider>{children}</AdminQueryProvider>
      </AdminLayout>
    </AuthProvider>
  );
}
