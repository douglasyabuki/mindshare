import { Toaster } from "@/components/ui/sonner";

interface Layout {
  children: React.ReactNode;
}

export const Layout = ({ children }: Layout) => {
  return (
    <div className="min-h-screen bg-gray-200">
      <main className="mx-auto px-16 py-4">{children}</main>
      <Toaster />
    </div>
  );
};
