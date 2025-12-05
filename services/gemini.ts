import { GoogleGenAI } from "@google/genai";

const MODEL_NAME = "gemini-2.5-flash";

const BASE_INSTRUCTIONS = `
Format the output strictly in Markdown.
Ensure the content is "WordPress Ready" - easy to copy and paste.
Use <a href="...">...</a> tags for internal links to ensure they persist when copied.
`;

const getSeoHeader = (url: string, slug: string) => `
### SEO Meta Data
**Title Tag:** [Generate a catchy SEO Title, max 60 chars]
**Meta Description:** [Generate a compelling description, max 160 chars]
**Permalink:** ${url.replace(/\/$/, '')}/${slug}
`;

const INTERNAL_LINK_GUIDE = (baseUrl: string) => {
  const cleanUrl = baseUrl.replace(/\/$/, '');
  return `
  **Internal Linking Strategy (MANDATORY):**
  - When mentioning "Contact Us" or "ติดต่อเรา", link to: "${cleanUrl}/contact-us"
  - When mentioning "About Us" or "เกี่ยวกับเรา", link to: "${cleanUrl}/about-us"
  - When mentioning "Home" or "หน้าแรก", link to: "${cleanUrl}"
  - Try to naturally include at least 2 internal links in the body content.
  `;
};

/**
 * Generates the Home Page content based on a strict template.
 */
export const generateHomePage = async (apiKey: string, province: string, url: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey });
  
  const templateBody = `
P สมาคมอสังหาริมทรัพย์จังหวัด${province} (....) ก่อตั้งขึ้นเพื่อยกระดับมาตรฐานอุตสาหกรรมอสังหาฯ ในจังหวัด${province}ให้ก้าวทันความเปลี่ยนแปลงของยุคสมัย เรารวบรวมผู้ประกอบการ ผู้เชี่ยวชาญ และเครือข่ายด้านที่อยู่อาศัยและพัฒนาเมืองไว้ด้วยกัน เพื่อสร้างระบบนิเวศที่โปร่งใส น่าเชื่อถือ และเป็นประโยชน์ต่อประชาชน พร้อมผลักดันการเติบโตของตลาดอสังหาฯ ให้เป็นไปอย่างมีคุณภาพและยั่งยืน

สมาคมอสังหาริมทรัพย์จังหวัด${province} มีบทบาทในการดูแลและสนับสนุนผู้ประกอบการด้านอสังหาในพื้นที่${province}อย่างรอบด้าน เราทำงานเพื่อสร้างความเข้าใจระหว่างภาคธุรกิจ หน่วยงานรัฐ และประชาชน ให้มีข้อมูลที่ถูกต้องและทันสมัย เพื่อประกอบการตัดสินใจซื้อ–ขาย หรือพัฒนาโครงการอสังหาริมทรัพย์อย่างมั่นใจ พร้อมเป็นส่วนหนึ่งในการพัฒนาเมือง${province}ให้เติบโตอย่างมีคุณภาพ

## เป้าหมายของสมาคมอสังหาริมทรัพย์จังหวัด${province}
P สมาคมอสังหาริมทรัพย์จังหวัด${province} มุ่งสร้างมาตรฐานที่โปร่งใส ยั่งยืน และเป็นธรรมในอุตสาหกรรมอสังหาริมทรัพย์ของจังหวัด${province} ผ่านการสร้างเครือข่ายผู้ประกอบการที่มีคุณภาพ ส่งเสริมการพัฒนาวิชาชีพอย่างต่อเนื่อง สร้างความร่วมมือกับภาครัฐและชุมชน และให้ข้อมูลที่ถูกต้องแก่ประชาชน เพื่อยกระดับคุณภาพตลาดอสังหาฯ และสนับสนุนการเติบโตของเมือง${province}อย่างมั่นคง

### ส่งเสริมมาตรฐานวิชาชีพ
P สมาคมมุ่งยกระดับคุณภาพผู้ประกอบการและบุคลากรในวงการอสังหาริมทรัพย์ ผ่านการอบรม ความรู้ และแนวปฏิบัติที่ถูกต้อง เพื่อให้ทุกฝ่ายดำเนินงานอย่างมีจรรยาบรรณ โปร่งใส และเป็นมืออาชีพ

### พัฒนาเครือข่ายความร่วมมือ
P สร้างความเชื่อมโยงระหว่างผู้ประกอบการ หน่วยงานราชการ สถาบันการศึกษา และประชาชน เพื่อร่วมกันพัฒนาตลาดอสังหาริมทรัพย์ให้เติบโตอย่างมีเสถียรภาพ และเป็นประโยชน์ต่อเศรษฐกิจของจังหวัด${province}

### ให้ข้อมูลที่ถูกต้องและเข้าถึงง่ายแก่ประชาชน
P สนับสนุนการเข้าถึงข้อมูลที่โปร่งใส ทั้งด้านกฎหมาย แนวโน้มตลาด และความรู้ที่เกี่ยวข้อง เพื่อช่วยประชาชนตัดสินใจด้านอสังหาริมทรัพย์อย่างมั่นใจและปลอดภัย

### ผลักดันการพัฒนาเมือง${province}อย่างยั่งยืน
P ร่วมมือกับภาครัฐและภาคธุรกิจในการพัฒนาเมืองให้สอดคล้องกับวิสัยทัศน์ระยะยาวของ${province} โดยคำนึงถึงสิ่งแวดล้อม คุณภาพชีวิต และการเติบโตทางเศรษฐกิจควบคู่ไปด้วย

## FAQ คำถามที่พบบ่อย
(Generate 3-4 relevant FAQs for Real Estate in ${province})
`;

  const prompt = `
    Role: SEO Content Writer for "สมาคมพัฒนาอสังหาริมทรัพย์จังหวัด${province}" (Real Estate Association).
    Language: Thai (ภาษาไทย).
    Website Context: ${url}

    Task: Create the Home Page content.
    
    ${BASE_INSTRUCTIONS}
    ${getSeoHeader(url, '')}
    ${INTERNAL_LINK_GUIDE(url)}

    ### Website Content
    
    **Requirements for Content Body:**
    1. The H1 must be "สมาคมพัฒนาอสังหาริมทรัพย์จังหวัด${province}".
    2. For the body text, you MUST strictly follow the template below. Replace "P" with the actual paragraph text.
    3. Adapt the tone slightly to suit ${province}'s character.
    4. **IMPORTANT**: Insert the Internal Links naturally into the text where appropriate (e.g., at the end of sections).

    **Template Body:**
    ${templateBody}
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
  });

  return response.text || "";
};

/**
 * Generates the About Us page with SEO focus.
 */
export const generateAboutPage = async (apiKey: string, province: string, url: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    Role: Professional Web Copywriter.
    Language: Thai (ภาษาไทย).
    
    Task: Write an "About Us" (เกี่ยวกับเรา) page for "สมาคมพัฒนาอสังหาริมทรัพย์จังหวัด${province}".
    
    ${BASE_INSTRUCTIONS}
    ${getSeoHeader(url, 'about-us')}
    ${INTERNAL_LINK_GUIDE(url)}

    ### Website Content

    **Content Requirements:**
    1. H1: เกี่ยวกับสมาคมพัฒนาอสังหาริมทรัพย์จังหวัด${province}
    2. Incorporate SEO Keywords: "สมาคมอสังหา ${province}", "พัฒนาเมือง ${province}", "สมาชิกสมาคมอสังหา".
    3. Structure:
       - **Who We Are**: Brief introduction.
       - **Vision (วิสัยทัศน์)**: Future goals for the province's property sector.
       - **Mission (พันธกิจ)**: Concrete actions (training, networking, policy advocacy).
       - **Organization Values**: Professionalism, Integrity, Sustainability.
    4. Keep it concise (approx 300-400 words) but professional and trustworthy.
    5. **Call to Action**: End with a link to the Contact Us page (e.g., "สนใจสมัครสมาชิก <a href='.../contact-us'>ติดต่อเรา</a>").
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
  });

  return response.text || "";
};

/**
 * Generates the Contact Us page using Google Search Grounding to find real info.
 */
export const generateContactPage = async (apiKey: string, province: string, url: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    Role: Information Specialist & Web Writer.
    Language: Thai (ภาษาไทย).
    
    Task: Find REAL contact information for "สมาคมอสังหาริมทรัพย์จังหวัด${province}" or the most relevant Real Estate organization in ${province} using Google Search.
    
    Then, write the "Contact Us" (ติดต่อเรา) page.

    ${BASE_INSTRUCTIONS}
    ${getSeoHeader(url, 'contact-us')}
    ${INTERNAL_LINK_GUIDE(url)}

    ### Website Content

    **Content Requirements:**
    1. H1: ติดต่อสมาคม (Contact Us)
    2. **Real Data**: List the Name, Address, Phone, Email, Facebook Page found from search.
    3. If specific data is NOT found, use a professional placeholder structure (e.g., [ที่อยู่สำนักงานชั่วคราว...]) and clearly state (Note: Please verify this address).
    4. Include a section for "Operating Hours" (เวลาทำการ).
    5. Write a short inviting paragraph encouraging people to contact for membership or complaints.
    6. Link back to the <a href="${url}">หน้าแรก</a> or <a href="${url}/about-us">เกี่ยวกับเรา</a> in the intro text.
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  return response.text || "";
};

/**
 * Rewrites news items for SEO and engagement.
 */
export const rewriteNews = async (apiKey: string, province: string, newsContent: string, url: string): Promise<string> => {
  if (!newsContent.trim()) return "";

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    Role: Senior Real Estate News Editor.
    Language: Thai (ภาษาไทย).
    
    Task: Rewrite the provided news/article to be high-quality, SEO-friendly content for the "Real Estate Association of ${province}" website.

    Input News:
    """
    ${newsContent}
    """
    
    ${BASE_INSTRUCTIONS}
    ${getSeoHeader(url, 'news/news-title-slug-placeholder')}
    ${INTERNAL_LINK_GUIDE(url)}

    ### Website Content

    **Content Requirements:**
    1. H1: Create a catchy, click-worthy headline relevant to the content.
    2. **Introduction**: engaging hook summarizing the key point.
    3. **Body**: Expand the news to 300-500 words. Make it easy to read.
       - Use subheadings (H2, H3).
       - Use bullet points for lists.
    4. **Analysis/Conclusion**: Add a paragraph relating this news to the ${province} real estate market context.
    5. Tone: Professional, Informative, Encouraging.
    6. **Internal Link**: At the end, invite readers to contact the association: "หากมีข้อสงสัย <a href='${url}/contact-us'>ติดต่อสมาคมฯ</a>".
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
  });

  return response.text || "";
};