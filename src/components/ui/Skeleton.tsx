import React from "react";

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  variant?: "rectangular" | "rounded" | "circular";
  animation?: "pulse" | "wave" | "none";
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  width = "100%",
  height = "1rem",
  variant = "rectangular",
  animation = "pulse",
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "circular":
        return "rounded-full";
      case "rounded":
        return "rounded-lg";
      default:
        return "rounded";
    }
  };

  const getAnimationClasses = () => {
    switch (animation) {
      case "wave":
        return "animate-skeleton-wave";
      case "pulse":
        return "animate-pulse";
      default:
        return "";
    }
  };

  return (
    <div
      className={`bg-gray-200 ${getVariantClasses()} ${getAnimationClasses()} ${className}`}
      style={{ width, height }}
    />
  );
};

// Skeleton components for common layouts
export const SkeletonCard: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <div
    className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 ${className}`}
  >
    <div className="space-y-4">
      <Skeleton height="1.5rem" width="60%" />
      <Skeleton height="4rem" />
      <div className="space-y-2">
        <Skeleton height="1rem" />
        <Skeleton height="1rem" width="80%" />
        <Skeleton height="1rem" width="70%" />
      </div>
    </div>
  </div>
);

export const SkeletonKPICard: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <div
    className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 ${className}`}
  >
    <div className="flex items-center justify-between">
      <div className="space-y-2 flex-1">
        <Skeleton height="0.75rem" width="50%" />
        <Skeleton height="2rem" width="40%" />
        <Skeleton height="0.75rem" width="60%" />
      </div>
      <Skeleton variant="circular" width="3rem" height="3rem" />
    </div>
  </div>
);

export const SkeletonChart: React.FC<{
  className?: string;
  height?: string;
}> = ({ className = "", height = "20rem" }) => (
  <div
    className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 ${className}`}
  >
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton height="1.5rem" width="30%" />
        <Skeleton height="2rem" width="5rem" />
      </div>
      <Skeleton height={height} className="rounded-lg" />
    </div>
  </div>
);

export const SkeletonTable: React.FC<{
  className?: string;
  rows?: number;
  columns?: number;
}> = ({ className = "", rows = 4, columns = 4 }) => (
  <div
    className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 ${className}`}
  >
    <div className="space-y-4">
      <Skeleton height="1.5rem" width="40%" />
      <div className="space-y-3">
        {/* Table Header */}
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {[...Array(columns)].map((_, i) => (
            <Skeleton key={`header-${i}`} height="1rem" width="80%" />
          ))}
        </div>
        {/* Table Rows */}
        {[...Array(rows)].map((_, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {[...Array(columns)].map((_, colIndex) => (
              <Skeleton key={`cell-${rowIndex}-${colIndex}`} height="1rem" />
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const SkeletonFilter: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <div
    className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 ${className}`}
  >
    <div className="flex flex-wrap items-center gap-4">
      <Skeleton height="2.5rem" width="8rem" />
      <Skeleton height="2.5rem" width="8rem" />
      <Skeleton height="2.5rem" width="6rem" />
      <Skeleton height="2.5rem" width="10rem" />
    </div>
  </div>
);

export default Skeleton;
