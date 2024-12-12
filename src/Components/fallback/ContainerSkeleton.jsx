import { motion } from "framer-motion";
import "../base/CustomStyle.css"
export default function ContainerSkelton({ width, cards }) {
  const SkeletonCard = ({width}) => (
    <div className={`bg-gray-200 ${width || "w-64"} dark:bg-gray-700 rounded-lg overflow-hidden animate-pulse`}>
      <div className="h-48 bg-gray-300 dark:bg-gray-600"></div>
      <div className="p-4 space-y-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    </div>
  );
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-scroll scroll-smooth h-full pb-8 hide-scroll-bar gap-6">
          {Array(width || 6)
            .fill(null)
            .map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SkeletonCard width={width} />
              </motion.div>
            ))}
        </div>
      </div>
    </>
  );
}
