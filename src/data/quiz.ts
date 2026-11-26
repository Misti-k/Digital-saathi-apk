import type { QuizQuestion } from "@/types";

export const questions: QuizQuestion[] = [
  {
    question: {
      en: "A caller says they are from your bank and asks for your OTP. What should you do?",
      hi: "बैंक का नाम बताकर कोई आपसे OTP माँगे, तो क्या करें?",
    },
    options: [
      { en: "Share the OTP", hi: "OTP साझा करें" },
      { en: "Do not share it", hi: "OTP साझा न करें" },
      { en: "Send it by message", hi: "संदेश में भेजें" },
    ],
    answer: 1,
    explanation: {
      en: "Never share an OTP, PIN, or password with anyone.",
      hi: "किसी के साथ OTP, PIN या पासवर्ड साझा न करें।",
    },
  },
  {
    question: {
      en: "You receive an unexpected message with a suspicious link. What is safest?",
      hi: "अचानक संदिग्ध लिंक वाला संदेश आए, तो सबसे सुरक्षित कदम क्या है?",
    },
    options: [
      { en: "Click it quickly", hi: "जल्दी से खोलें" },
      { en: "Forward it to everyone", hi: "सबको भेज दें" },
      { en: "Do not click; verify it first", hi: "क्लिक न करें; पहले जाँचें" },
    ],
    answer: 2,
    explanation: {
      en: "Avoid suspicious links and verify through a trusted contact method.",
      hi: "संदिग्ध लिंक से बचें और भरोसेमंद संपर्क से जाँचें।",
    },
  },
  {
    question: {
      en: "A stranger asks you to install a remote-access app to fix your bank account. What should you do?",
      hi: "बैंक खाता ठीक करने के नाम पर कोई अनजान व्यक्ति ऐप इंस्टॉल करने को कहे, तो क्या करें?",
    },
    options: [
      { en: "Install it immediately", hi: "तुरंत इंस्टॉल करें" },
      { en: "Refuse and verify with the bank", hi: "मना करें और बैंक से जाँचें" },
      { en: "Share your password too", hi: "पासवर्ड भी साझा करें" },
    ],
    answer: 1,
    explanation: {
      en: "Do not install apps or give device access because a stranger asks you to.",
      hi: "किसी अनजान व्यक्ति के कहने पर ऐप इंस्टॉल न करें और फोन का नियंत्रण न दें।",
    },
  },
  {
    question: {
      en: "Which detail should you check before sending money with a payment app?",
      hi: "भुगतान ऐप से पैसे भेजने से पहले क्या जाँचना चाहिए?",
    },
    options: [
      { en: "Recipient's name and amount", hi: "प्राप्तकर्ता का नाम और राशि" },
      { en: "The phone wallpaper", hi: "फोन का वॉलपेपर" },
      { en: "The message font", hi: "संदेश का फ़ॉन्ट" },
    ],
    answer: 0,
    explanation: {
      en: "Check the recipient and amount carefully before confirming a payment.",
      hi: "भुगतान की पुष्टि से पहले प्राप्तकर्ता और राशि ध्यान से जाँचें।",
    },
  },
  {
    question: {
      en: "Someone says you must tell them your UPI PIN to receive money. What should you do?",
      hi: "कोई कहे कि पैसे पाने के लिए UPI PIN बताना होगा, तो क्या करें?",
    },
    options: [
      { en: "Tell them the PIN", hi: "PIN बता दें" },
      { en: "Share it only on a call", hi: "सिर्फ कॉल पर बताएँ" },
      { en: "Never share it", hi: "कभी साझा न करें" },
    ],
    answer: 2,
    explanation: {
      en: "You do not need to share your UPI PIN to receive money.",
      hi: "पैसे प्राप्त करने के लिए UPI PIN साझा करने की आवश्यकता नहीं होती।",
    },
  },
];
