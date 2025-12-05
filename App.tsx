import React, { useState } from 'react';
import InputForm from './components/InputForm';
import GeneratedContent from './components/GeneratedContent';
import { AppState, GenerationStatus, NewsInput } from './types';
import { generateHomePage, generateAboutPage, generateContactPage, rewriteNews } from './services/gemini';
import { Building2, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState(process.env.API_KEY || '');
  const [url, setUrl] = useState('');
  const [province, setProvince] = useState('');
  const [newsItems, setNewsItems] = useState<NewsInput[]>([{ id: 1, content: '' }, { id: 2, content: '' }, { id: 3, content: '' }]);
  
  const [state, setState] = useState<AppState['status']>(GenerationStatus.IDLE);
  const [data, setData] = useState<AppState['data']>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!apiKey) {
        alert("กรุณากรอก API Key");
        return;
    }
    if (!province) {
        alert("กรุณากรอกชื่อจังหวัด");
        return;
    }
    // Simple URL validation/formatting
    let formattedUrl = url.trim();
    if (formattedUrl && !formattedUrl.startsWith('http')) {
        formattedUrl = 'https://' + formattedUrl;
    }

    setState(GenerationStatus.LOADING);
    setError(null);

    try {
        // Parallel execution
        const homePromise = generateHomePage(apiKey, province, formattedUrl);
        const aboutPromise = generateAboutPage(apiKey, province, formattedUrl);
        const contactPromise = generateContactPage(apiKey, province, formattedUrl);

        const validNews = newsItems.filter(n => n.content.trim().length > 10);
        const newsPromises = validNews.map(n => rewriteNews(apiKey, province, n.content, formattedUrl));

        const [homePage, aboutPage, contactPage, rewrittenNews] = await Promise.all([
            homePromise,
            aboutPromise,
            contactPromise,
            Promise.all(newsPromises)
        ]);

        setData({
            homePage,
            aboutPage,
            contactPage,
            rewrittenNews
        });
        setState(GenerationStatus.SUCCESS);

    } catch (err: any) {
        console.error("Generation failed:", err);
        setError(err.message || "เกิดข้อผิดพลาดในการสร้างเนื้อหา โปรดตรวจสอบ API Key หรือลองใหม่อีกครั้ง");
        setState(GenerationStatus.ERROR);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-lg text-white shadow-md">
                <Building2 size={24} />
            </div>
            <div>
                <h1 className="text-xl font-bold text-slate-900 leading-tight tracking-tight">Real Estate SEO Gen</h1>
                <p className="text-xs text-slate-500 font-medium">ระบบสร้างเนื้อหาเว็บสมาคมอสังหาฯ ด้วย AI</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            <Sparkles size={12} className="text-amber-500" />
            Powered by Gemini 2.5 Flash
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            
            {/* Left Column: Configuration */}
            <div className="xl:col-span-4 space-y-6">
                <InputForm 
                    apiKey={apiKey}
                    setApiKey={setApiKey}
                    url={url}
                    setUrl={setUrl}
                    province={province}
                    setProvince={setProvince}
                    newsItems={newsItems}
                    setNewsItems={setNewsItems}
                    onGenerate={handleGenerate}
                    isLoading={state === GenerationStatus.LOADING}
                />
                
                {state === GenerationStatus.ERROR && (
                    <div className="bg-red-50 border border-red-200 p-4 rounded-xl shadow-sm flex items-start gap-3 animate-fade-in">
                        <div className="text-red-500 mt-0.5">
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-red-800">เกิดข้อผิดพลาด (Error)</p>
                            <p className="text-sm text-red-600 mt-1">{error}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Right Column: Preview / Output */}
            <div className="xl:col-span-8 min-h-[600px]">
                {state === GenerationStatus.SUCCESS && data ? (
                    <GeneratedContent data={data} />
                ) : (
                    <div className="h-full flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm p-12 text-center text-slate-400">
                        {state === GenerationStatus.LOADING ? (
                            <div className="flex flex-col items-center animate-pulse space-y-6">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-blue-400 blur-xl opacity-20 rounded-full"></div>
                                    <div className="relative h-16 w-16 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                                        <Sparkles className="text-white animate-spin-slow" size={32} />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-700">AI กำลังทำงาน...</h3>
                                    <p className="text-slate-500 mt-2 max-w-sm">
                                        กำลังค้นหาข้อมูลจริง วิเคราะห์บริบทจังหวัด {province} <br/>และสร้าง Internal Links เชื่อมโยงเว็บไซต์
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4 max-w-md mx-auto">
                                <div className="mx-auto w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
                                    <Building2 size={40} className="text-slate-300" />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-700">พร้อมเริ่มงานเขียน</h3>
                                <p className="text-slate-500 leading-relaxed">
                                    กรอกข้อมูลสมาคมและข่าวสารทางฝั่งซ้าย <br/>แล้วกดปุ่ม <span className="font-semibold text-blue-600">"สร้างบทความ"</span> ได้เลย
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
      </main>
    </div>
  );
};

export default App;