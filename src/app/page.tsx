export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to BLOSSOM
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Meditation</h2>
          <p className="text-gray-600">
            Start your journey to mindfulness with guided meditations.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Book of Changes</h2>
          <p className="text-gray-600">
            Plan and track your personal development journey.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Daily Wisdom</h2>
          <p className="text-gray-600">
            Discover insights and practices for daily growth.
          </p>
        </div>
      </div>
    </div>
  )
} 