import React, { useState } from 'react';
import Alert from '../../components/alert';
import { BASE_URL } from '../../utils/constants';
import LanguageSelector from './lang-select';

const TranslatePage: React.FC = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('urh');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');


  const handleTranslate = async () => {
    if (!sourceText.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(BASE_URL + "translate", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: sourceText,
          source_lang: sourceLang,
          target_lang: targetLang,
        }),
      });

      if (!response.ok) {
        throw new Error('Translation failed');
      }

      const data = await response.json();
      setTranslatedText(data.translation);
    } catch (err) {
      setError('Failed to translate. Please try again.');
      console.error('Translation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Urhobo Translator
          </h1>
          <p className="text-lg text-gray-600">
            Translate between English and Urhobo seamlessly
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Language Selection */}
            <LanguageSelector 
                sourceText={sourceText} 
                translatedText={translatedText} 
                sourceLang={sourceLang} 
                targetLang={targetLang} 
                setSourceLang={setSourceLang} 
                setTargetLang={setTargetLang}
                setSourceText={setSourceText} 
                setTranslatedText={setTranslatedText} />

            {/* Translation Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                {/* Source Text */}
                <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                    Source Text
                </label>
                <textarea
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                    placeholder="Enter text to translate..."
                    className="w-full h-48 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={8}
                />
                </div>

                {/* Translated Text */}
                <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                    Translated Text
                </label>
                <textarea
                    value={translatedText}
                    readOnly
                    placeholder="Translation will appear here..."
                    className="w-full h-48 p-4 border border-gray-300 rounded-lg resize-none bg-gray-50"
                    rows={8}
                />
                </div>
            </div>

            {/* Translate Button */}
            <div className="px-6 pb-6">
                <button
                    onClick={handleTranslate}
                    disabled={!sourceText.trim() || isLoading}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Translating...
                        </div>
                    ) : (
                        'Translate'
                    )}
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <Alert message={error} type="error" />
                )}

                </div>
            </div>
        </div>
    );
};

export default TranslatePage;