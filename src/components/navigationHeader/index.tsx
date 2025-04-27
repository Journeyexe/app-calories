type NavigationItem = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
};

type NavigationHeaderProps = {
  title: string;
  navigationItems: NavigationItem[];
};

export function NavigationHeader({ 
  title, 
  navigationItems 
}: NavigationHeaderProps) {
  // Helper function to determine button classes based on variant
  const getButtonClasses = (variant?: string) => {
    switch(variant) {
      case "primary":
        return "rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700";
      case "danger":
        return "rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50";
      case "secondary":
      default:
        return "rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200";
    }
  };

  return (
    <header className="mb-6">
      <div className="flex flex-col items-center justify-between border-b border-gray-200 pb-4 md:flex-row">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 md:mb-0">
          {title}
        </h1>
        
        <div className="flex flex-wrap gap-2">
          {navigationItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className={getButtonClasses(item.variant)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}