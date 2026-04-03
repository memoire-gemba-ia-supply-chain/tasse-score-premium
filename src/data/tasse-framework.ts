import { TasseFramework } from "@/types/tasse";

export const tasseFramework: TasseFramework = {
  id: "tasse-score",
  name: "TASSE Score",
  version: "2026",
  categories: [
    {
      id: "technological-threats",
      title: "Technological Threats",
      shortTitle: "Technology",
      exposureTitle: "Technological Threats - Uncontrolled Risk Exposure",
      description:
        "Technological threats include cyberattacks, data breaches, ransomware, unauthorized online disclosures, sabotage, and emerging deep fake or fake news risks.",
      questions: [
        {
          id: "tt-1",
          text: "How does the organization currently monitor and evaluate cyber threats?",
        },
        {
          id: "tt-2",
          text: "What strategies are in place to prevent data breaches and ransomware attacks?",
        },
        {
          id: "tt-3",
          text: "How does the company address the risks associated with unauthorized online disclosures?",
        },
        {
          id: "tt-4",
          text: "What training is provided to employees to recognize and mitigate technological sabotage?",
        },
        {
          id: "tt-5",
          text: "How is the organization preparing for challenges posed by Deep Fake and Deep Voice technologies?",
        },
        {
          id: "tt-6",
          text: "What are the consequences of spreading fake news for the company?",
        },
        {
          id: "tt-7",
          text: "How frequently are technological risk assessments updated?",
        },
        {
          id: "tt-8",
          text: "What recent technological threats have the organization faced?",
        },
        {
          id: "tt-9",
          text: "What improvements are planned for the organization’s cybersecurity measures?",
        },
        {
          id: "tt-10",
          text: "How does the organization ensure technological compliance with legal standards?",
        },
      ],
    },
    {
      id: "adverse-media-coverage",
      title: "Adverse Media Coverage",
      shortTitle: "Media",
      exposureTitle: "Adverse Media Coverage - Uncontrolled Risk Exposure",
      description:
        "Media pressure can trigger reputational damage, legal consequences, and financial loss when public behavior and communications diverge from organizational values.",
      questions: [
        {
          id: "am-1",
          text: "What guidelines are in place for employees’ social media use?",
        },
        {
          id: "am-2",
          text: "How does the organization respond to negative media attention?",
        },
        {
          id: "am-3",
          text: "What measures are taken to align employees' public behavior with company values?",
        },
        {
          id: "am-4",
          text: "How does the organization monitor the ethical content of its public communications?",
        },
        {
          id: "am-5",
          text: "What was the most significant media challenge the organization faced in the past year?",
        },
        {
          id: "am-6",
          text: "What training do executives and board members receive about media interactions?",
        },
        {
          id: "am-7",
          text: "How is the effectiveness of media response strategies assessed?",
        },
        {
          id: "am-8",
          text: "What are the potential legal consequences of adverse media coverage?",
        },
        {
          id: "am-9",
          text: "How does the company plan to improve its reputation management?",
        },
        {
          id: "am-10",
          text: "What resources are allocated to handling media crises?",
        },
      ],
    },
    {
      id: "supply-chain-challenges",
      title: "Supply Chain Challenges",
      shortTitle: "Supply Chain",
      exposureTitle: "Supply Chain Challenges - Uncontrolled Risk Exposure",
      description:
        "Supply chain exposure focuses on child labor, modern slavery, trafficking, transparency, ethical sourcing, and supplier governance discipline.",
      questions: [
        {
          id: "sc-1",
          text: "What practices are in place to ensure the supply chain is free from child labor?",
        },
        {
          id: "sc-2",
          text: "How does the organization verify compliance with human rights standards in the supply chain?",
        },
        {
          id: "sc-3",
          text: "What steps are taken to address risks related to modern slavery and human trafficking?",
        },
        {
          id: "sc-4",
          text: "How often are supply chain audits conducted?",
        },
        {
          id: "sc-5",
          text: "What consequences does the company face if unethical practices are discovered in the supply chain?",
        },
        {
          id: "sc-6",
          text: "How transparent is the organization about its supply chain operations?",
        },
        {
          id: "sc-7",
          text: "What collaborations or partnerships are in place to enhance ethical sourcing?",
        },
        {
          id: "sc-8",
          text: "How are suppliers evaluated and selected based on ethical criteria?",
        },
        {
          id: "sc-9",
          text: "What training is provided to supply chain managers on ethical practices?",
        },
        {
          id: "sc-10",
          text: "How does the company handle violations of ethical sourcing standards?",
        },
      ],
    },
    {
      id: "social-responsibility-expectations",
      title: "Social Responsibility Expectations",
      shortTitle: "Social Responsibility",
      exposureTitle: "Social Responsibility Expectations - Uncontrolled Risk Exposure",
      description:
        "This domain measures how seriously ESG, CSR, DEI, and stakeholder accountability are embedded beyond superficial commitments.",
      questions: [
        {
          id: "sr-1",
          text: "How does the organization ensure its commitments to ESG and CSR are substantive rather than superficial?",
        },
        {
          id: "sr-2",
          text: "What specific actions have been taken to improve diversity, equity, and inclusion?",
        },
        {
          id: "sr-3",
          text: "How does the company measure the effectiveness of its social responsibility initiatives?",
        },
        {
          id: "sr-4",
          text: "What are the reputational risks associated with failing to meet social responsibility expectations?",
        },
        {
          id: "sr-5",
          text: "How is the impact of social responsibility initiatives communicated to stakeholders?",
        },
        {
          id: "sr-6",
          text: "What challenges has the organization faced in implementing these initiatives?",
        },
        {
          id: "sr-7",
          text: "How are employees engaged in corporate social responsibility programs?",
        },
        {
          id: "sr-8",
          text: "What feedback has the organization received from stakeholders regarding its social initiatives?",
        },
        {
          id: "sr-9",
          text: "How does the organization plan to enhance its social responsibility efforts?",
        },
        {
          id: "sr-10",
          text: "What legal implications has the company faced related to social responsibility?",
        },
      ],
    },
    {
      id: "ethical-dilemmas-pressure",
      title: "Ethical Dilemmas Pressure",
      shortTitle: "Ethics",
      exposureTitle: "Ethical Dilemmas Pressure - Uncontrolled Risk Exposure",
      description:
        "Ethics pressure captures how the organization detects, addresses, and governs difficult ethical choices under performance pressure.",
      questions: [
        {
          id: "ed-1",
          text: "What ethical dilemmas are most prevalent within the organization?",
        },
        {
          id: "ed-2",
          text: "How does the organization support ethical decision-making under pressure?",
        },
        {
          id: "ed-3",
          text: "What training do employees receive on ethical practices and dilemmas?",
        },
        {
          id: "ed-4",
          text: "How are unethical behaviors identified and addressed?",
        },
        {
          id: "ed-5",
          text: "What systems are in place to encourage ethical behavior and whistleblowing?",
        },
        {
          id: "ed-6",
          text: "What consequences do employees face for unethical behavior?",
        },
        {
          id: "ed-7",
          text: "How does the organization ensure compliance with its ethical standards?",
        },
        {
          id: "ed-8",
          text: "How often are ethical standards reviewed and updated?",
        },
        {
          id: "ed-9",
          text: "What recent ethical challenges has the organization overcome?",
        },
        {
          id: "ed-10",
          text: "How does the organization promote a culture of ethics and integrity?",
        },
      ],
    },
  ],
  domainBands: [
    {
      label: "Negligible",
      min: 0,
      max: 4,
      summary: "Controls appear well established in this domain.",
    },
    {
      label: "Minor",
      min: 5,
      max: 8,
      summary: "Some weaknesses are present but mostly contained.",
    },
    {
      label: "Moderate",
      min: 9,
      max: 12,
      summary: "Noticeable gaps require structured mitigation.",
    },
    {
      label: "Significant",
      min: 13,
      max: 16,
      summary: "Risk exposure is elevated and requires board attention.",
    },
    {
      label: "Severe",
      min: 17,
      max: 20,
      summary: "Exposure is acute and requires immediate intervention.",
    },
  ],
  totalInterpretations: [
    {
      min: 81,
      max: 100,
      statement:
        "Organization likely unprepared for reputational, financial, or legal threat.",
    },
    {
      min: 61,
      max: 80,
      statement:
        "Somewhat prepared, but serious gaps likely present.",
    },
    {
      min: 41,
      max: 60,
      statement:
        "Has gaps to address, but overall reasonably prepared.",
    },
    {
      min: 21,
      max: 40,
      statement: "Likely well-insulated from many threats.",
    },
    {
      min: 0,
      max: 20,
      statement: "Proactive and likely quite well prepared.",
    },
  ],
};

export const riskOptions = [
  {
    label: "Negligible",
    value: 0,
    hint: "Risk is currently contained",
  },
  {
    label: "Moderate",
    value: 1,
    hint: "Risk exists and should be managed",
  },
  {
    label: "Severe",
    value: 2,
    hint: "High vulnerability and immediate concern",
  },
] as const;
