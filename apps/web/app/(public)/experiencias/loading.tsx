export default function Loading() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-navy-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="h-12 w-64 bg-navy-600 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-5 w-96 bg-navy-600 rounded mx-auto animate-pulse" />
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
              >
                <div className="h-56 bg-gray-200 animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                  <div className="h-5 w-48 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
