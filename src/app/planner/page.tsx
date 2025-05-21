'use client';

export default function Planner() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Книга Змін
      </h1>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Ваш Щоденний План</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Додайте нову ціль..."
                className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Ваші Досягнення</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Цього Тижня</h3>
              <p className="text-gray-600">Завершено завдань: 0</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Цього Місяця</h3>
              <p className="text-gray-600">Завершено завдань: 0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 