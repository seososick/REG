import React from 'react';
import { NewsInput } from '../types';
import { Plus, Trash2, Globe, MapPin, Key, Newspaper } from 'lucide-react';

interface InputFormProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  url: string;
  setUrl: (url: string) => void;
  province: string;
  setProvince: (prov: string) => void;
  newsItems: NewsInput[];
  setNewsItems: (items: NewsInput[]) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({
  apiKey,
  setApiKey,
  url,
  setUrl,
  province,
  setProvince,
  newsItems,
  setNewsItems,
  onGenerate,
  isLoading
}) => {

  const addNewsItem = () => {
    if (newsItems.length < 5) {
      setNewsItems([...newsItems, { id: Date.now(), content: '' }]);
    }
  };

  const removeNewsItem = (id: number) => {
    setNewsItems(newsItems.filter(item => item.id !== id));
  };

  const updateNewsItem = (id: number, text: string) => {
    setNewsItems(newsItems.map(item => item.id === id ? { ...item, content: text } : item));
  };

  return (
    <div className="space-y-6">
      {/* 1. Main Config Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-extrabold">1</span>
            ตั้งค่าข้อมูลหลัก (Main Setup)
        </h2>
        
        <div className="space-y-4">
            {/* API Key */}
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Key size={14} className="text-slate-400" /> Gemini API Key
                </label>
                <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter AI Studio API Key..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Province */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <MapPin size={14} className="text-slate-400" /> จังหวัด (Province)
                    </label>
                    <input
                        type="text"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        placeholder="เช่น เชียงใหม่"
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition shadow-sm"
                    />
                </div>
                {/* URL */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <Globe size={14} className="text-slate-400" /> เว็บไซต์ (Website URL)
                    </label>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://..."
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition shadow-sm"
                    />
                </div>
            </div>
        </div>
      </div>

      {/* 2. News Config Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-10 -mt-10 opacity-50 pointer-events-none"></div>
        
        <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-extrabold">2</span>
                ข่าวอสังหาฯ (News)
            </h2>
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{newsItems.length}/5</span>
        </div>
        
        <div className="space-y-5">
          {newsItems.map((item, index) => (
            <div key={item.id} className="group relative">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
                <Newspaper size={12} /> ข่าวต้นฉบับที่ {index + 1}
              </label>
              <div className="relative">
                <textarea
                    value={item.content}
                    onChange={(e) => updateNewsItem(item.id, e.target.value)}
                    rows={4}
                    placeholder="วางเนื้อหาข่าว หรือบทความที่ต้องการ Rewrite ให้น่าสนใจที่นี่..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm leading-relaxed transition-all resize-none shadow-inner"
                />
                {newsItems.length > 1 && (
                    <button
                        onClick={() => removeNewsItem(item.id)}
                        className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        title="ลบข่าว"
                    >
                        <Trash2 size={16} />
                    </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {newsItems.length < 5 && (
          <button
            onClick={addNewsItem}
            className="mt-5 w-full py-2.5 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 font-medium hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <Plus size={16} />
            เพิ่มช่องวางข่าว (Add News Slot)
          </button>
        )}
      </div>

      {/* Generate Button */}
      <button
        onClick={onGenerate}
        disabled={isLoading || !province || !apiKey}
        className={`w-full py-4 px-6 rounded-xl font-bold text-white text-lg shadow-lg shadow-blue-500/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2
          ${isLoading || !province || !apiKey
            ? 'bg-slate-300 cursor-not-allowed shadow-none'
            : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 hover:shadow-xl'
          }`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating Content...
          </>
        ) : (
          'สร้างบทความ SEO (Generate)'
        )}
      </button>
    </div>
  );
};

export default InputForm;
