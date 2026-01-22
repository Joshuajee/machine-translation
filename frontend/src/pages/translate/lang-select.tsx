interface LanguageSelectorProps {
    sourceText: string;
    translatedText: string;
    sourceLang: string;
    targetLang: string;
    setSourceText: (text: string) => void;
    setTranslatedText: (text: string) => void;
    setSourceLang: (lang: string) => void;
    setTargetLang: (lang: string) => void;
}

const LanguageSelector = ({ sourceText, translatedText, sourceLang, targetLang, setSourceText, setTranslatedText, setSourceLang, setTargetLang }: LanguageSelectorProps) => {
    
    const languages = [
    { code: 'en', name: 'English' },
    { code: 'urh', name: 'Urhobo' },
    // Add more languages as needed
    ];

    const swapLanguages = () => {
        setSourceLang(targetLang);
        setTargetLang(sourceLang);
        setSourceText(translatedText);
        setTranslatedText(sourceText);
    };

    //TODO: Fix the props drilling above by lifting the state up to parent component
    // and passing down the swapLanguages function as a prop.
    // This will ensure that the LanguageSelector component can update the texts correctly.
    // For now, the swapLanguages function is defined here for demonstration purposes.
    //TODO: return early to hide
    return (<></>)

    return (
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">

            <div className="flex items-center justify-center space-x-4">
                <select
                    value={sourceLang}
                    onChange={(e) => setSourceLang(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.name}
                    </option>
                    ))}
                </select>

                <button
                    onClick={swapLanguages}
                    className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 disabled"
                    title="Swap languages"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                </button>

                <select
                    value={targetLang}
                    onChange={(e) => setTargetLang(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.name}
                    </option>
                    ))}
                </select>
            </div>
            
        </div>
    )
}

export default LanguageSelector;