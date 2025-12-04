interface PageProps {
  children: React.ReactNode;
}

export const Page = ({ children }: PageProps) => {
  return (
    <div className="min-h-[calc(100vh-9rem)] rounded-xl bg-white p-12">
      {children}
    </div>
  );
};
