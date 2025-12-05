import React, { useState } from 'react';
import { GeneratedData } from '../types';
import { Copy, Check, FileText, Info, Phone, Newspaper } from 'lucide-react';

interface GeneratedContentProps {
  data: GeneratedData;
}

const GeneratedContent: React.FC<GeneratedContentProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'contact' | 'news'>('home');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const tabs = [
    { id: 'home', label: 'Home Page', sub: 'หน้าแรก', icon: <FileText size={18} /> },
    { id: 'about', label: 'About Us', sub: 'เกี่ยวกับเรา', icon: <Info size={18} /> },
    { id: 'contact', label: 'Contact Us', sub: 'ติดต่อเรา', icon: <Phone size={18} /> },
    { id: 'news', label: 'News', sub: 'ข่าวประชาสัมพันธ์', icon: <Newspaper size={18} /> },
  ];

  const renderContent = (content: string) => {
    // Basic markdown parsing for the generated format
    // Separation of Meta Data and Content if present
    const parts = content.split('### Website Content');
    const metaSection = parts[0] ? parts[0].replace('### SEO Meta Data', '').trim() : '';
    const bodySection = parts[1] ? parts[1].trim() : content; // Fallback if format differs

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Meta Data Box */}
            {metaSection && (
                <div className="bg-slate-800 text-slate-200 p-5 rounded-lg text-sm font-mono shadow-md border border-slate-700">
                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-600">
                        <span className="font-bold text-blue-400">SEO Meta Data</span>
                        <span className="text-xs text-slate-500">HTML Tags</span>
                    </div>
                    <div className="whitespace-pre-wrap leading-relaxed opacity-90">
                        {metaSection}
                    </div>
                </div>
            )}

            {/* Main Content Body */}
            <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-800 prose-h1:text-3xl prose-h2:text-2xl prose-p:text-slate-600 prose-li:text-slate-600">
                 {/* Re-inject the header if we split it, otherwise just show content */}
                <div className="whitespace-pre-wrap font-sans">
                    {parts.length > 1 ? bodySection : content}
                </div>
            </div>
        </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full min-h-[600px]">
      {/* Tab Header */}
      <div className="flex bg-slate-50 border-b border-slate-200 overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 px-6 py-4 transition-all min-w-[120px] md:min-w-fit
              ${activeTab === tab.id 
                ? 'bg-white text-blue-700 border-b-2 border-blue-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}
          >
            <span className={`${activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'}`}>{tab.icon}</span>
            <div className="text-center md:text-left">
                <div className="font-bold text-sm">{tab.label}</div>
                <div className="text-xs font-normal opacity-80">{tab.sub}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="p-0 flex-1 overflow-y-auto bg-slate-50/50 custom-scrollbar">
        <div className="max-w-5xl mx-auto bg-white min-h-full p-8 md:p-10 shadow-sm border-x border-slate-100 relative">
          
          {/* Action Bar */}
          <div className="sticky top-0 right-0 flex justify-end mb-6 z-10 pointer-events-none">
             <div className="pointer-events-auto bg-white/80 backdrop-blur-sm p-1 rounded-lg shadow-sm border border-slate-200">
                <button
                    onClick={() => {
                        const content = activeTab === 'news' 
                            ? data.rewrittenNews.join('\n\n---\n\n') 
                            : (data as any)[`${activeTab}Page`];
                        handleCopy(content, activeTab);
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-blue-700 rounded-md transition shadow-sm"
                >
                    {copiedKey === activeTab ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                    {copiedKey === activeTab ? 'Copied!' : 'Copy All'}
                </button>
             </div>
          </div>

          {/* Render Logic */}
          {activeTab === 'home' && renderContent(data.homePage)}
          
          {activeTab === 'about' && renderContent(data.aboutPage)}

          {activeTab === 'contact' && (
             <div className="space-y-4">
                {renderContent(data.contactPage)}
                <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-900 flex gap-2 items-start">
                  <Info size={16} className="mt-0.5 flex-shrink-0" />
                  <p><strong>Note:</strong> ข้อมูลนี้ถูกค้นหาและสร้างโดย AI (Google Search) โปรดตรวจสอบความถูกต้องของ เบอร์โทร/ที่อยู่ ก่อนนำไปใช้งานจริง</p>
                </div>
             </div>
          )}

          {activeTab === 'news' && (
              <div className="space-y-12">
                {data.rewrittenNews.length === 0 ? (
                  <div className="text-center py-20 text-slate-400">
                      <Newspaper size={48} className="mx-auto mb-4 opacity-50" />
                      <p>ไม่มีข่าวที่ถูก Rewrite (No news provided)</p>
                  </div>
                ) : (
                    data.rewrittenNews.map((news, idx) => (
                        <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                                    News Item #{idx + 1}
                                </span>
                                <button
                                    onClick={() => handleCopy(news, `news-${idx}`)}
                                    className="flex items-center gap-1 text-slate-400 hover:text-blue-600 transition-colors text-xs font-medium"
                                >
                                    {copiedKey === `news-${idx}` ? <Check size={14} /> : <Copy size={14} />}
                                    Copy Item
                                </button>
                            </div>
                            {renderContent(news)}
                        </div>
                    ))
                )}
              </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default GeneratedContent;
