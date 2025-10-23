import React from "react";

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
  loading?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  className = "",
  actions,
  loading = false,
  padding = "md",
}) => {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md border border-gray-200 ${className}`}
    >
      {(title || subtitle || actions) && (
        <div
          className={`border-b border-gray-200 ${paddingClasses[padding]} pb-4`}
        >
          <div className="flex justify-between items-start">
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {title}
                </h3>
              )}
              {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
            </div>
            {actions && <div className="flex space-x-2">{actions}</div>}
          </div>
        </div>
      )}

      <div
        className={
          title || subtitle || actions
            ? paddingClasses[padding]
            : paddingClasses[padding]
        }
      >
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default Card;
