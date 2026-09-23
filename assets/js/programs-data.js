/*
 * A-Global — program catalogue (single source of truth for program details)
 * ------------------------------------------------------------------------
 * Every B.Sc. and Master's program card on the site reads its expandable
 * detail panel from this file (see initProgramAccordions in main.js).
 *
 * To ADD A PROGRAM:
 *   1. Add an entry to window.AGLOBAL_PROGRAMS below (copy an existing one).
 *   2. On the college / school page, add an empty placeholder inside the
 *      program grid:    <div data-program="your-program-id"></div>
 *      main.js renders the full card (title, description, details, handbook)
 *      from this data. Existing hand-written cards only need the
 *      data-program attribute; their details panel is injected automatically.
 *
 * Field reference (all optional except name + handbook):
 *   name, degree, level ('bsc' | 'masters'), college, shortDescription,
 *   overview, facts [{label, value}], study [string | {title, text}],
 *   careers [string], industries, specializations [{name, text}],
 *   admission [string], certifications [string], practical [string],
 *   handbook {url (relative to site root), fileName, note}
 */
(function () {
  'use strict';

  // Shared entry requirements, as published on the Undergraduate and
  // Admissions pages. Programs can override with their own `admission` list.
  var BSC_ADMISSION = [
    "Five O'Level credits (SSCE/GCE/NECO) including English Language and Mathematics, obtained in no more than two sittings.",
    'Subject credits relevant to the chosen program.',
    'UTME or Direct Entry qualification where applicable.',
    'A working device, a reliable internet connection, and basic computer literacy.',
    'Students transitioning to a new program must provide their degree credentials.',
    'Applicants awaiting examination results are not eligible to apply.'
  ];

  var BSC_MODE = 'Online, on-campus, hybrid';

  var MASTERS_ADMISSION = [
    "A bachelor's degree from an institution recognised by the NUC (or foreign equivalent) with a minimum of Second Class Honours (Lower Division).",
    'HND at Upper Credit considered where supported by relevant professional experience or a recognised postgraduate diploma.',
    'Official transcripts, NYSC discharge or exemption, a current CV, two academic or professional references, and a 500–750 word statement of purpose.',
    'International applicants: TOEFL 71 (iBT) / 530 (paper) or one year of English-taught post-secondary study; foreign qualifications are assessed for equivalence.'
  ];

  var MASTERS_MODE = 'HyFlex — fully online, on campus (Ibadan Global Campus or Abeokuta Metro Campus), or a mix; mode can change between terms';
  var MASTERS_INTAKES = 'August, October, January, March, May';
  var MASTERS_PRACTICAL = [
    'Every course carries an applied artificial intelligence module.',
    'A capstone delivered on a live institutional, client, or market problem within your declared specialization.',
    'Three optional on-campus residencies a year with industry panels, capstone presentations, and networking (sessions also delivered online).'
  ];

  var P = {};

  /* =====================  COLLEGE OF TECHNOLOGY  ===================== */

  P['data-science'] = {
    name: 'Data Science',
    degree: 'Bachelor of Science (B.Sc.)',
    level: 'bsc',
    college: 'College of Technology',
    shortDescription: 'Turn data into predictive insight using statistics, mathematics, and computer science. Students build and deploy machine learning models through hands-on projects in NLP, computer vision, and predictive analytics.',
    overview: 'The B.Sc. in Data Science is a deep, technical program focused on transforming vast amounts of data into predictive insights and actionable intelligence. It gives students a rigorous foundation in statistics, mathematics, and computer science, and prepares them to build and deploy machine learning models and data-driven solutions to complex problems, with a strong ethical foundation for the responsible use of data and AI.',
    facts: [
      { label: 'Degree', value: 'Bachelor of Science (B.Sc.)' },
      { label: 'Study mode', value: BSC_MODE },
      { label: 'College', value: 'College of Technology' }
    ],
    study: [
      { title: 'Statistical and mathematical modeling', text: 'Statistics, probability, linear algebra, and calculus that underpin machine learning.' },
      { title: 'Machine learning and applied AI', text: 'Supervised, unsupervised, and reinforcement learning, from regression and clustering to neural networks.' },
      { title: 'Python, R, and the modern data stack', text: 'Pandas, NumPy, Scikit-learn, TensorFlow, and PyTorch.' },
      { title: 'Data engineering and MLOps', text: 'The full lifecycle, from data wrangling and visualisation to pipelines and deploying models into production.' }
    ],
    careers: ['Data Scientist', 'Machine Learning Engineer', 'AI Specialist / AI Engineer', 'Quantitative Analyst', 'Data Architect'],
    industries: 'Technology, FinTech, Healthcare, E-commerce, Consulting, Research',
    admission: BSC_ADMISSION,
    certifications: ['TensorFlow Developer Certificate', 'AWS Certified Machine Learning – Specialty', 'Google Professional Data Engineer'],
    practical: ['Hands-on projects in natural language processing, computer vision, and predictive analytics.', 'Two-part capstone project (Capstone I and II).'],
    handbook: { url: 'assets/pdfs/AOU-data-science-Program-Handbook.pdf', fileName: 'A-Global Data Science Program Handbook.pdf' }
  };

  P['cyber-security'] = {
    name: 'Cyber Security',
    degree: 'Bachelor of Science (B.Sc.)',
    level: 'bsc',
    college: 'College of Technology',
    shortDescription: 'A technical, defence-focused program that trains students to protect digital infrastructure: identifying vulnerabilities, responding to threats, and building secure systems.',
    overview: 'The B.Sc. in Cyber Security is a highly technical, defence-focused program that produces experts in protecting digital infrastructure. Students learn to identify vulnerabilities, detect and respond to threats, and design secure systems against an ever-evolving landscape of cyber-attacks, with a strong grounding in risk management, compliance with global security standards, and the ethical defence of information assets.',
    facts: [
      { label: 'Degree', value: 'Bachelor of Science (B.Sc.)' },
      { label: 'Study mode', value: BSC_MODE },
      { label: 'College', value: 'College of Technology' }
    ],
    study: [
      { title: 'Defensive security operations and SIEM', text: 'Network monitoring, log analysis, and threat detection with SIEM tools.' },
      { title: 'Ethical hacking and penetration testing', text: 'The attacker mindset, vulnerability assessment, and exploiting weaknesses safely.' },
      { title: 'Security architecture and cryptography', text: 'Secure system design, network security architecture, and identity and access management.' },
      { title: 'Digital forensics and incident response', text: 'Investigating breaches, preserving digital evidence, and managing the response to an attack.' }
    ],
    careers: ['Cybersecurity Analyst', 'Penetration Tester (Ethical Hacker)', 'Security Engineer / Architect', 'Incident Responder', 'Digital Forensics Investigator'],
    industries: 'Cybersecurity, Financial Services, Government, Defence, Technology, Consulting',
    admission: BSC_ADMISSION,
    certifications: ['CompTIA Security+', 'Certified Ethical Hacker (CEH)', 'Cisco CyberOps Associate', 'GIAC Security Essentials (GSEC)'],
    practical: ['Advanced projects in ethical hacking, network defence, and digital forensics.'],
    handbook: { url: 'assets/pdfs/AOU-cyber-security-Program-Handbook.pdf', fileName: 'A-Global Cyber Security Program Handbook.pdf' }
  };

  P['software-engineering'] = {
    name: 'Software Engineering',
    degree: 'Bachelor of Science (B.Sc.)',
    level: 'bsc',
    college: 'College of Technology',
    shortDescription: 'Design, build, test, and deploy reliable, scalable software. Strong foundations in software architecture, development methods, and collaborative problem-solving.',
    overview: 'The B.Sc. in Software Engineering focuses on the disciplined principles of designing, building, testing, and deploying robust, scalable software. It goes beyond coding to instil a deep understanding of software architecture, development methodologies, and collaborative teamwork, preparing graduates to engineer high-quality software for a global market and to specialise through advanced electives and capstone projects.',
    facts: [
      { label: 'Degree', value: 'Bachelor of Science (B.Sc.)' },
      { label: 'Study mode', value: BSC_MODE },
      { label: 'College', value: 'College of Technology' }
    ],
    study: [
      { title: 'Software architecture and design patterns', text: 'Data structures, algorithms, object-oriented design, and architecture.' },
      { title: 'Agile delivery and DevOps', text: 'Agile/Scrum, version control with Git, and CI/CD pipelines.' },
      { title: 'Full-stack and cloud-native development', text: 'Python, Java, C#, JavaScript with .NET, React, and Node.js.' },
      { title: 'Quality engineering and testing', text: 'Software testing, tools and techniques, and enterprise integration patterns.' }
    ],
    careers: ['Software Engineer', 'Backend / Full-Stack Developer', 'Cloud Engineer / DevOps Engineer', 'Solutions Architect', 'Technical Lead'],
    industries: 'Software as a Service (SaaS), FinTech, Enterprise IT, Cloud Computing',
    specializations: [
      { name: 'Enterprise Systems', text: 'Large-scale, reliable, and secure systems that run major organisations.' },
      { name: 'Full-Stack Development', text: 'Seamless web and mobile experiences from the database to the user interface.' },
      { name: 'Cloud-Native Applications', text: 'Scalable applications built and deployed on AWS, Azure, and Google Cloud.' }
    ],
    specializationsLabel: 'Elective focus areas',
    admission: BSC_ADMISSION,
    certifications: ['Cisco DevNet Associate', 'AWS Certified Developer – Associate', 'Oracle Certified Professional (Java)'],
    practical: ['Advanced electives and a two-part Software Engineering capstone project.'],
    handbook: { url: 'assets/pdfs/AOU-software-engineering-Program-Handbook.pdf', fileName: 'A-Global Software Engineering Program Handbook.pdf' }
  };

  P['information-technology'] = {
    name: 'Information Technology',
    degree: 'Bachelor of Science (B.Sc.)',
    level: 'bsc',
    college: 'College of Technology',
    shortDescription: 'Manage and secure the digital infrastructures organisations depend on, blending technical expertise with strategic insight to deliver efficient and secure IT solutions.',
    overview: 'The B.Sc. in Information Technology prepares students to build, manage, and innovate the core technical infrastructure that powers modern organisations. It focuses on systems, networking, and cloud infrastructure, with a practical specialisation in deploying and managing intelligent systems: the cloud infrastructure, data pipelines, and systems required to run and scale machine learning in real-world environments.',
    facts: [
      { label: 'Degree', value: 'Bachelor of Science (B.Sc.)' },
      { label: 'Study mode', value: BSC_MODE },
      { label: 'College', value: 'College of Technology' }
    ],
    study: [
      { title: 'Networks and systems administration', text: 'Networking, database management, and Linux and Windows Server.' },
      { title: 'Cloud infrastructure and automation', text: 'Scalable, resilient cloud design on AWS and Azure, and Infrastructure as Code.' },
      { title: 'AI/ML deployment and operations (MLOps)', text: 'Deploying, monitoring, and managing machine learning models in production.' },
      { title: 'IT service management and security governance', text: 'IT project management, ITSM best practice, and information security and assurance.' }
    ],
    careers: ['IT Manager / IT Consultant', 'Systems Administrator', 'Cloud Engineer / Cloud AI Specialist', 'DevOps / MLOps Engineer', 'IT Infrastructure Architect'],
    industries: 'Cloud Computing, Artificial Intelligence, Enterprise IT, Technology Consulting',
    specializations: [
      { name: 'AI/ML Deployment & Cloud Infrastructure', text: 'Building the infrastructure that runs intelligent systems.' },
      { name: 'MLOps & DevOps', text: 'Automated pipelines for continuous integration, delivery, and model deployment.' },
      { name: 'Enterprise Systems Architecture', text: 'Designing intelligent, cloud-based enterprise systems on AWS and Azure.' }
    ],
    specializationsLabel: 'Specialisation focus',
    admission: BSC_ADMISSION,
    certifications: ['AWS Certified Solutions Architect', 'Microsoft Certified: Azure AI Engineer Associate', 'CompTIA Cloud+', 'HashiCorp Certified: Terraform Associate'],
    practical: ['Two-part IT capstone project (Capstone I and II).'],
    handbook: { url: 'assets/pdfs/AOU-information-technology-Program-Handbook.pdf', fileName: 'A-Global Information Technology Program Handbook.pdf' }
  };

  /* =====================  COLLEGE OF BUSINESS  ===================== */

  P['business-administration'] = {
    name: 'Business Administration',
    degree: 'Bachelor of Science (B.Sc.)',
    level: 'bsc',
    college: 'College of Business',
    shortDescription: "A modern management education covering strategy, finance, marketing, and operations, taught with the digital tools that run today's organisations.",
    overview: "The B.Sc. in Business Administration is American Open University's flagship program for developing strategic leaders. The curriculum is built around a core of Digital Transformation and Corporate Strategy: students master the fundamentals of modern business, then apply them within a specialised learning path, graduating ready not just to manage business functions but to transform them.",
    facts: [
      { label: 'Degree', value: 'Bachelor of Science (B.Sc.)' },
      { label: 'Study mode', value: BSC_MODE },
      { label: 'College', value: 'College of Business' },
      { label: 'Learning paths', value: 'Human Capital Development · Corporate Finance and Taxation' }
    ],
    study: [
      { title: 'Strategy and competitive analysis', text: 'Business model innovation and leading digital transformation.' },
      { title: 'Financial and managerial accounting', text: 'Plus marketing, operations management, and organisational behaviour.' },
      { title: 'Specialised application', text: 'Talent management and HR technology, or financial modelling and tax strategy.' },
      { title: 'Leadership and management', text: 'Change management, data-informed decisions, and ethical governance.' }
    ],
    careers: ['Strategy Analyst / Corporate Strategist', 'Management Consultant', 'Financial Strategist', 'HR Business Partner', 'Business Development Manager'],
    industries: 'Consulting, Finance, Technology, Human Resources, Corporate Management',
    specializations: [
      { name: 'Human Capital Development', text: 'Build and lead high-performing teams in the modern, technology-driven workplace.' },
      { name: 'Corporate Finance and Taxation', text: 'Leverage data and technology to drive profitability and ensure fiscal compliance.' }
    ],
    specializationsLabel: 'Learning paths',
    admission: BSC_ADMISSION,
    certifications: ['Project Management Professional (PMP)', 'SHRM-Certified Professional (SHRM-CP)', 'Certified Tax Planner (CTP)'],
    handbook: { url: 'assets/pdfs/AOU-business-administration-Program-Handbook.pdf', fileName: 'A-Global Business Administration Program Handbook.pdf' }
  };

  P['business-information-technology'] = {
    name: 'Business Information Technology',
    degree: 'Bachelor of Science (B.Sc.)',
    level: 'bsc',
    college: 'College of Business',
    shortDescription: 'The bridge between business strategy and technical delivery, for graduates who translate organisational needs into working digital systems.',
    overview: 'The B.Sc. in Business Information Technology is designed for strategic thinkers who want to bridge technology and business. It focuses on how to apply, manage, and leverage technology to solve business problems, optimise operations, and drive strategy, preparing graduates to lead technology projects, act as the liaison between technical teams and executives, and use data to deliver a tangible return on investment.',
    facts: [
      { label: 'Degree', value: 'Bachelor of Science (B.Sc.)' },
      { label: 'Study mode', value: BSC_MODE },
      { label: 'College', value: 'College of Business' },
      { label: 'Learning paths', value: 'Project Management · Data Analytics and Business Intelligence' }
    ],
    study: [
      { title: 'Business analysis and requirements', text: 'Analysing processes and translating business needs into technical specifications.' },
      { title: 'Project management methodologies', text: 'Agile/Scrum and Waterfall/PMP for technology projects.' },
      { title: 'Data analytics and visualisation', text: 'Dashboards and data-driven stories with Tableau and Power BI.' },
      { title: 'IT strategy and governance', text: 'Aligning technology with business goals and managing IT budgets.' }
    ],
    careers: ['IT Project Manager', 'Business Analyst', 'Systems Analyst', 'Business Intelligence Developer', 'IT Consultant'],
    industries: 'Consulting, Finance, Healthcare, Technology, Corporate Management',
    specializations: [
      { name: 'Project Management', text: 'Agile and PMP frameworks to lead complex technology projects from initiation to completion.' },
      { name: 'Data Analytics and Business Intelligence', text: 'Turn raw business data into dashboards and reports that inform executive decisions.' }
    ],
    specializationsLabel: 'Learning paths',
    admission: BSC_ADMISSION,
    certifications: ['Project Management Professional (PMP)', 'Certified Business Analysis Professional (CBAP)', 'Tableau Certified Data Analyst'],
    handbook: { url: 'assets/pdfs/AOU-business-information-technology-Program-Handbook.pdf', fileName: 'A-Global Business Information Technology Program Handbook.pdf' }
  };

  P['entrepreneurship'] = {
    name: 'Entrepreneurship',
    degree: 'Bachelor of Science (B.Sc.)',
    level: 'bsc',
    college: 'College of Business',
    shortDescription: 'Build ventures from first principles: opportunity discovery, business model design, funding, and the discipline of scaling a company.',
    overview: 'The B.Sc. in Entrepreneurship is designed for the next generation of innovators, founders, and changemakers. It provides a hands-on, experiential learning environment where students learn to identify opportunities, create value, and launch and scale impactful ventures, building a resilient entrepreneurial mindset for the startup world and for driving innovation inside established organisations.',
    facts: [
      { label: 'Degree', value: 'Bachelor of Science (B.Sc.)' },
      { label: 'Study mode', value: BSC_MODE },
      { label: 'College', value: 'College of Business' },
      { label: 'Learning paths', value: 'Technology Entrepreneurship · Social Entrepreneurship' }
    ],
    study: [
      { title: 'Venture formation and validation', text: 'Ideation, customer discovery, and lean-startup business models.' },
      { title: 'Startup finance and fundraising', text: 'Bootstrapping, pitch decks, angel investment, and venture capital.' },
      { title: 'Growth, sales, and go-to-market', text: 'Digital marketing, customer acquisition, branding, and sales.' },
      { title: 'Startup operations and management', text: 'Team building, culture, legal formation, and intellectual property.' }
    ],
    careers: ['Founder / CEO', 'Product Manager', 'Innovation Manager', 'Social Entrepreneur', 'Business Development Lead / Consultant'],
    industries: 'Technology (SaaS, AI), Social Impact, Venture Capital, Consulting',
    specializations: [
      { name: 'Technology Entrepreneurship', text: 'Build, fund, and scale a technology startup from disruptive idea to market leader.' },
      { name: 'Social Entrepreneurship', text: 'Design sustainable ventures that solve pressing social and environmental challenges.' }
    ],
    specializationsLabel: 'Learning paths',
    admission: BSC_ADMISSION,
    certifications: ['Google Project Management', 'Google Digital Marketing & E-commerce', 'Certified ScrumMaster (CSM)'],
    practical: ['Hands-on, experiential venture-building throughout the program.'],
    handbook: { url: 'assets/pdfs/AOU-entrepreneurship-Program-Handbook.pdf', fileName: 'A-Global Entrepreneurship Program Handbook.pdf' }
  };

  P['public-administration'] = {
    name: 'Public Administration',
    degree: 'Bachelor of Science (B.Sc.)',
    level: 'bsc',
    college: 'College of Business',
    shortDescription: 'Prepare for service in government, agencies, and development organisations, with a strong grounding in policy, public finance, and digital governance.',
    overview: 'The B.Sc. in Public Administration cultivates a new generation of public sector leaders equipped to modernise government and non-profit organisations. It focuses on digital governance, public policy, and the application of technology to create more efficient, transparent, and sustainable public services, preparing graduates for leadership in local, national, and international public service.',
    facts: [
      { label: 'Degree', value: 'Bachelor of Science (B.Sc.)' },
      { label: 'Study mode', value: BSC_MODE },
      { label: 'College', value: 'College of Business' },
      { label: 'Learning paths', value: 'Digital Governance & Sustainable Development · Security Governance & Justice Systems' }
    ],
    study: [
      { title: 'Policy analysis and public law', text: 'Public finance, administrative law, and the ethics of public service.' },
      { title: 'Digital government and e-services', text: 'E-governance strategy and public sector IT projects.' },
      { title: 'Sustainable development and security', text: 'Technology for the SDGs, or managing security and justice systems.' },
      { title: 'Leadership and stakeholder management', text: 'Public communication, managing public funds, and community engagement.' }
    ],
    careers: ['Policy Analyst / Adviser', 'Program Officer / Manager', 'Public Sector Administrator / City Manager', 'Digital Transformation Officer (Public Sector)', 'Non-Profit Director / Development Practitioner'],
    industries: 'Public Sector, International Development, Non-Profit, Security, Consulting',
    specializations: [
      { name: 'Digital Governance & Sustainable Development', text: 'Lead the adoption of technology to improve public services and achieve the SDGs.' },
      { name: 'Security Governance & Justice Systems', text: 'Strategic management of security agencies and modernisation of justice systems.' }
    ],
    specializationsLabel: 'Learning paths',
    admission: BSC_ADMISSION,
    certifications: ['Project Management Professional (PMP)', 'Certified Public Manager (CPM)', 'Grants management certifications'],
    handbook: { url: 'assets/pdfs/AOU-public-administration-Program-Handbook.pdf', fileName: 'A-Global Public Administration Program Handbook.pdf' }
  };

  /* =====================  POSTGRADUATE SCHOOL (MASTER'S)  ===================== */

  P['mba'] = {
    name: 'Master of Business Administration',
    degree: 'Master of Business Administration (MBA)',
    level: 'masters',
    college: 'Postgraduate School',
    shortDescription: 'The MBA prepares experienced professionals to lead organisations in markets where technology has become the primary driver of competition. A rigorous management core in strategy, marketing, finance, leadership, law, and technology is paired with a substantial specialization track and a professional capstone delivered for a live client or market.',
    overview: 'Designed for working professionals and delivered through open and distance learning, the MBA develops leaders who can turn analysis into decisions and decisions into results. A management core is followed by a specialization, then research methods and a two-part capstone taken within the declared track. Artificial intelligence is embedded across the curriculum rather than confined to a single course.',
    facts: [
      { label: 'Delivery', value: 'HyFlex Delivery' },
      { label: 'Mode of study', value: MASTERS_MODE },
      { label: 'Intakes', value: MASTERS_INTAKES },
      { label: 'Capstone', value: 'Professional project (research route available in two tracks)' }
    ],
    study: [
      'Strategy and competitive analysis',
      'Marketing and market development',
      'Financial management and valuation',
      'Organizational leadership and change',
      'Law, ethics, and governance',
      'Enterprise technology management'
    ],
    careers: [
      'Technology ventures and innovation-driven enterprises',
      'Banks, payment companies, and fintech firms',
      'Large indigenous and multinational corporations',
      'Management consulting and professional services',
      'Roles such as Founder/CEO, Business Unit Director, Head of Product, CHRO, Fintech Product Manager, Risk and Compliance Manager'
    ],
    industries: 'Technology, financial services and fintech, consulting, telecommunications, manufacturing, retail and consumer goods',
    specializations: [
      { name: 'Technology Entrepreneurship and Management', text: 'Venture formation, product and commercialization strategy, venture finance, and the leadership of technology functions within established organisations.' },
      { name: 'Human Capital Development', text: 'Talent strategy, workforce planning, performance systems, and the hands-on management of learning technologies and platforms.' },
      { name: 'Fintech and Digital Financial Services', text: 'Digital payments and lending platforms, the economics of financial institutions, and the regulatory, risk, and compliance environment governing digital finance.' }
    ],
    admission: MASTERS_ADMISSION,
    certifications: ['Project Management Professional (PMP)', 'Professional Scrum Master', 'Chartered Institute of Personnel Management of Nigeria (CIPM)', 'SHRM certification', 'Chartered Financial Analyst (CFA)'],
    practical: MASTERS_PRACTICAL,
    handbook: { url: 'assets/pdfs/mba-handbook.pdf', fileName: 'A-Global MBA Program Handbook.pdf' }
  };

  P['mit'] = {
    name: 'Master of Information Technology',
    degree: 'Master of Information Technology (MIT)',
    level: 'masters',
    college: 'Postgraduate School',
    shortDescription: 'The MIT develops advanced technical and architectural capability for professionals who design, secure, and operate enterprise technology. Every graduate leaves with a working system, a defended investigation, or a validated analytical product rather than a written account of one.',
    overview: 'The MIT core establishes a common foundation in information systems and data, enterprise and cloud systems architecture, infrastructure and emerging technologies, and security governance. Each student then specializes in depth and completes a capstone within the declared track. The program prepares graduates for technical leadership across regulated and mission-critical sectors, with AI embedded in every course.',
    facts: [
      { label: 'Delivery', value: 'HyFlex Delivery' },
      { label: 'Mode of study', value: MASTERS_MODE },
      { label: 'Intakes', value: MASTERS_INTAKES },
      { label: 'Capstone', value: 'Working system, defended investigation, or validated analytical product' }
    ],
    study: [
      'Information systems and data foundations',
      'Enterprise and cloud architecture',
      'Infrastructure, containers, and emerging technology',
      'Security governance and compliance',
      'Applied AI and machine learning',
      'Technical project management'
    ],
    careers: [
      'Financial technology and banking',
      'Telecommunications and technology companies',
      'Government agencies and regulatory bodies',
      'Healthcare, energy, and logistics organisations',
      'Roles such as ML Engineer, Data Scientist, Security Architect, Digital Forensics Analyst, Solutions Architect, CISO'
    ],
    industries: 'Financial technology, cybersecurity, telecommunications, AI and data services, healthcare technology, public sector digital infrastructure',
    specializations: [
      { name: 'AI Engineering and Deployment', text: 'A shared machine learning foundation, machine learning systems and deployment operations, and agent-directed software development.' },
      { name: 'Cybersecurity and Digital Forensics', text: 'Security architecture, threat detection and response, network security and cryptography, digital investigation, and evidence handling.' },
      { name: 'Data Science and Analytics', text: 'Analytics and business intelligence, statistical and predictive modeling, and data engineering.' }
    ],
    admission: MASTERS_ADMISSION,
    certifications: ['Certified Information Systems Security Professional (CISSP)', 'Certified Ethical Hacker (CEH)', 'CompTIA Security+', 'Certified Analytics Professional (CAP)', 'Recognised cloud and enterprise architecture certifications'],
    practical: MASTERS_PRACTICAL,
    handbook: { url: 'assets/pdfs/mit-handbook.pdf', fileName: 'A-Global MIT Program Handbook.pdf' }
  };

  P['mpa'] = {
    name: 'Master of Public Administration',
    degree: 'Master of Public Administration (MPA)',
    level: 'masters',
    college: 'Postgraduate School',
    shortDescription: 'The MPA prepares public servants, policy professionals, and institutional leaders to govern effectively in digital and reform-driven environments. The program is digital by design, and every student completes a capstone addressing a live institutional or policy problem that a sponsoring institution can act on.',
    overview: 'Every MPA student masters governing the digital state, designing and delivering digital public services, public-sector innovation, and public financial management in the digital age, with public administration theory, policy analysis, and administrative ethics embedded throughout. Students then specialize in a sector where governance is being remade and complete a capstone producing analysis or a reform design that a sponsoring institution can act on.',
    facts: [
      { label: 'Delivery', value: 'HyFlex Delivery' },
      { label: 'Mode of study', value: MASTERS_MODE },
      { label: 'Intakes', value: MASTERS_INTAKES },
      { label: 'Capstone', value: 'Live institutional or policy problem for a sponsoring institution' }
    ],
    study: [
      'Digital governance and public value',
      'Service design and delivery',
      'Policy analysis and program design',
      'Public financial management (TSA, GIFMIS, IPPIS)',
      'Administrative ethics and accountability',
      'Policy research methodology'
    ],
    careers: [
      'Federal, state, and local government institutions',
      'Regulatory agencies and commissions',
      'Development partners and NGOs',
      'Public health and education systems',
      'Roles such as Policy Analyst, Director of Planning, Research and Statistics, Digital Government Program Lead, Data Protection Officer'
    ],
    industries: 'Public administration and governance, digital security and law enforcement, education policy, health policy and financing, international development',
    specializations: [
      { name: 'Digital Security Systems Management', text: 'The management of modern and emerging crimes, digital investigations and forensics, and digital intelligence and counter-terrorism operations.' },
      { name: 'Educational Policy and Systems Design', text: 'Institutional policy, governance and quality assurance, program architecture and curriculum systems design, and the management of learning platforms.' },
      { name: 'Public Health Policy and Systems Governance', text: 'Health financing, health system governance, regulatory frameworks, and health information systems, approached from public administration rather than clinical practice.' }
    ],
    admission: MASTERS_ADMISSION,
    certifications: ['Certified Information Privacy Professional (CIPP)', 'Project Management Professional (PMP)', 'Recognised monitoring and evaluation certifications'],
    practical: MASTERS_PRACTICAL,
    handbook: { url: 'assets/pdfs/mpa-handbook.pdf', fileName: 'A-Global MPA Program Handbook.pdf' }
  };

  // Site root, resolved from this script's own location (assets/js/ -> ../../)
  // so handbook links work from any page depth and over file:// as well.
  var root = '';
  try {
    var s = document.currentScript && document.currentScript.src;
    if (s) root = new URL('../../', s).href;
  } catch (e) { root = ''; }

  window.AGLOBAL_SITE_ROOT = root;
  window.AGLOBAL_PROGRAMS = P;
})();
