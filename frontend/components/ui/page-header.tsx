interface PageHeaderProps {
  title: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, action }: PageHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      {action}
    </div>
  );
}
