const LoadingSkeleton = () => (
<div className="container mx-auto p-4 mt-8 md:w-1/2 animate-pulse">
    <div className="h-8 bg-gray-300 rounded mb-2 w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded mb-1 w-1/4"></div>
    <div className="h-4 bg-gray-200 rounded mb-4 w-1/3"></div>
    <div className="space-y-2">
    <div className="h-4 bg-gray-200 rounded"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
    </div>
</div>
);

export default LoadingSkeleton;