'use client';

interface PracticeData {
  id: string;
  title: string;
  description: string;
  content: string;
  type: string;
  isPremium: boolean;
  author: string;
  publishedAt: string;
}

interface PracticeClientProps {
  practiceData: PracticeData;
}

export default function PracticeClient({ practiceData }: PracticeClientProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            {practiceData.title}
          </h1>
          <div className="flex items-center text-gray-600 space-x-4 mb-4">
            <span>{practiceData.author}</span>
            <span>•</span>
            <time>{practiceData.publishedAt}</time>
          </div>
          <p className="text-xl text-gray-600">
            {practiceData.description}
          </p>
        </header>

        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: practiceData.content }}
        />

        <footer className="mt-8 pt-8 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-primary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button className="text-gray-600 hover:text-primary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
            <div>
              <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
                Зберегти
              </button>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
} 