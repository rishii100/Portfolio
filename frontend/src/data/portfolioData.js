// Portfolio data chunks for RAG system
export const portfolioChunks = [
  {
    id: 'personal_info',
    category: 'basic',
    content: `Aneerban Saha is a B.Tech student in Computer Science and Engineering with AI/ML specialization at Manipal University Jaipur. He is currently in his final year (Aug 2021 - present). He completed his 12th grade from Kendriya Vidyalaya IIM Joka.`,
    keywords: ['name', 'education', 'university', 'student', 'background', 'manipal', 'jaipur']
  },
  {
    id: 'skills_technical',
    category: 'skills',
    content: `Aneerban's technical skills include Event Management, Leadership, Marketing, DBMS, Exploratory Data Analysis, Machine Learning, Deep Learning, UX/UI, Blockchain Development, PHP, Docker, Web Development, Gen AI, and LLM development. He is proficient in AI/ML technologies and has hands-on experience with modern web development frameworks.`,
    keywords: ['skills', 'machine learning', 'deep learning', 'web development', 'blockchain', 'ai', 'ml', 'docker', 'php', 'genai', 'llm']
  },
  {
    id: 'experience_mylead',
    category: 'experience',
    content: `At MyLead Fintech Private Limited as an AI Intern (May 2024 - Jul 2024, Mumbai), Aneerban developed a chat-based customer support system for the PinoBuddy app using 3rd-party tools, open-source resources, and ML models. He collected and formatted data via web scraping, converted it to JSONL, fine-tuned with GPT-3.5, and deployed on AWS.`,
    keywords: ['mylead', 'fintech', 'ai intern', 'chat support', 'pinobuddy', 'web scraping', 'gpt', 'aws', 'ml models']
  },
  {
    id: 'experience_bharat',
    category: 'experience',
    content: `At Bharat Intern as Machine Learning Intern (Feb 2024 - Mar 2024, Remote), Aneerban performed EDA and Feature engineering to improve model performance. He evaluated model performance and fine-tuned parameters to enhance accuracy, achieving 88% accuracy using R-squared score metrics.`,
    keywords: ['bharat intern', 'machine learning', 'eda', 'feature engineering', 'model performance', 'accuracy', 'r-squared']
  },
  {
    id: 'experience_grameen',
    category: 'experience',
    content: `At Grameen Shakti Microfinance Pvt. Ltd. as an Intern (Jun 2023 - Jul 2023, Kolkata), Aneerban created a predictive analytics tool that forecasted repayment behavior by analyzing historical data, resulting in an improved loan recovery rate of 40%, positively impacting the financial health of the microfinance initiative.`,
    keywords: ['grameen shakti', 'microfinance', 'predictive analytics', 'loan recovery', 'financial', 'historical data']
  },
  {
    id: 'projects_medialert',
    category: 'projects',
    content: `MediAlert (Jan 2025 - Mar 2025): Designed AI pipelines for adverse event detection using Deepgram ASR for speech-to-text conversion and built APIs for AI model inference and data processing. Implemented NLP analysis with AWS Comprehend Medical and FDA FAERS data to extract medical entities and apply risk prediction models with over 90% accuracy.`,
    keywords: ['medialert', 'ai pipelines', 'deepgram', 'speech recognition', 'nlp', 'aws comprehend', 'medical', 'risk prediction', 'accuracy']
  },
  {
    id: 'projects_hope',
    category: 'projects',
    content: `Hope - Be the voice, Make the difference (Sep 2024 - Dec 2024): Created an AI chatbot with RAG and Gemini Pro, boosting disaster response accuracy by 85%. Integrated a vector database for faster retrieval, reducing query time by 40%.`,
    keywords: ['hope', 'ai chatbot', 'rag', 'gemini pro', 'disaster response', 'vector database', 'retrieval']
  },
  {
    id: 'projects_syncskills',
    category: 'projects',
    content: `SyncSkills (Jan 2024 - Apr 2024): Created a web application that evaluates resumes against job descriptions using Gemini AI, providing actionable feedback to enhance performance and improving the recruitment process by 30%.`,
    keywords: ['syncskills', 'resume evaluation', 'job descriptions', 'gemini ai', 'recruitment', 'feedback']
  },
  {
    id: 'projects_abstractify',
    category: 'projects',
    content: `Abstractify - Summarization using T5 Transformer (Oct 2023 - Dec 2023): Developed a News Summarization System using T5 Transformer model in Jupyter Notebook. Utilized T5 model to generate concise summaries from preprocessed text. Employed PyTorch Lightning for training and evaluation, achieving 97% accuracy.`,
    keywords: ['abstractify', 'summarization', 't5 transformer', 'news', 'pytorch lightning', 'accuracy', 'jupyter']
  },
  {
    id: 'awards_academic',
    category: 'awards',
    content: `Academic Excellence: Dean's Academic Excellence Award from MUJ (Nov 2024) for securing highest Grade Point Average in 6th Semester in CSE(AIML) Department. 2x Student Excellence Award from MUJ (2024) among 1000+ students for dedication to learning and personal development.`,
    keywords: ['academic excellence', 'dean award', 'muj', 'highest gpa', 'student excellence', 'learning']
  },
  {
    id: 'awards_hackathons',
    category: 'awards',
    content: `Hackathon Achievements: HACKS 8.0 Winner (Oct 2023) - 1st position among 500+ participants in MUJ HACKS 8.0. DeFi Hacks 3rd Position (Oct 2023) - 3rd rank in hackathon by MUJ ACM Student Chapter. Hack It Up 1st Runner Up (Apr 2023) - 2nd position among 300+ participants in TECHIDEATE '23. Octahacks 5.0 Best Ethereum Project (Jan 2023) - Best Hack built on Ethereum. Hacks 7.0 3rd Position (Oct 2022) - 3rd rank among 250+ participants.`,
    keywords: ['hackathons', 'winner', 'hacks', 'defi', 'ethereum', 'blockchain', 'competitions', 'prizes']
  },
  {
    id: 'awards_research',
    category: 'awards',
    content: `Research Excellence: INFORMATICA 3rd Position at Manipal University MUJ (Jan 2024) - Won 3rd position for presenting research paper among 500+ papers in ICCAIML'24 organized by Department of AIML, Manipal University Jaipur.`,
    keywords: ['research', 'informatica', 'paper presentation', 'iccaiml', 'aiml', 'manipal']
  },
  {
    id: 'publications',
    category: 'publications',
    content: `Publications: Model Abstractify AI: Efficient Summarization in ACT (Scopus-indexed) 2025. Aimed to enhance accessibility and comprehension of lengthy articles and stories by leveraging the capabilities of the T5 transformer. Achieved validation accuracy close to 97% through T5 model implementation. Contributed significantly to the advancement of text summarization methodologies, particularly for handling extensive articles and stories.`,
    keywords: ['publications', 'model abstractify', 'scopus', 'summarization', 't5 transformer', 'research paper', 'validation accuracy']
  },
  {
    id: 'contact_social',
    category: 'contact',
    content: `Contact Information: Email: aneerbansaha22@gmail.com, Phone: 6291617680, LinkedIn: https://linkedin.com/in/aneerban-saha, GitHub: https://github.com/rishii100, X (Twitter): https://www.x.com/AneerbanS, Kaggle: https://www.kaggle.com/aneerbansaha, Resume: Available for download.`,
    keywords: ['contact', 'email', 'phone', 'linkedin', 'github', 'twitter', 'kaggle', 'resume']
  }
];

export const personalInfo = {
  name: "Aneerban Saha",
  title: "AI/ML Engineer & Full Stack Developer",
  email: "aneerbansaha22@gmail.com",
  phone: "6291617680",
  location: "Jaipur, India",
  linkedin: "https://linkedin.com/in/aneerban-saha",
  github: "https://github.com/rishii100",
  twitter: "https://www.x.com/AneerbanS",
  kaggle: "https://www.kaggle.com/aneerbansaha",
  resume: "https://drive.google.com/file/d/1PFXKYqiElImSOA5-mBBoGM9efVbz9hwO/view?usp=drivesdk"
};