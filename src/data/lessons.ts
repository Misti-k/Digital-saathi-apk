import type { Lesson } from "@/types";

export const lessons: Lesson[] = [
  {
    key: "phone",
    icon: "📞",
    title: { en: "Smartphone Basics", hi: "स्मार्टफोन की बुनियादी बातें" },
    summary: {
      en: "Save a contact, send a message, and make a video call.",
      hi: "कॉन्टैक्ट सेव करना, संदेश भेजना और वीडियो कॉल करना सीखें।",
    },
    steps: {
      en: [
        "Open the Contacts app on your phone.",
        "Tap Add Contact, enter the person's name and phone number, then tap Save.",
        "Open your messaging app, type a message such as “Hello!”, and tap Send.",
        "Open a trusted video-calling app and tap the video-call button to call someone.",
      ],
      hi: [
        "अपने फोन में Contacts ऐप खोलें।",
        "Add Contact दबाएँ, व्यक्ति का नाम और फोन नंबर लिखें, फिर Save दबाएँ।",
        "मैसेज ऐप खोलें, “Hello!” जैसा संदेश लिखें और Send दबाएँ।",
        "किसी को वीडियो कॉल करने के लिए भरोसेमंद ऐप खोलें और वीडियो कॉल बटन दबाएँ।",
      ],
    },
    images: [
      "/images/phone-contacts.jpg",
      "/images/phone-save-contact.jpg",
      "/images/phone-message.jpg",
      "/images/phone-video-call.jpg",
    ],
  },
  {
    key: "internet",
    icon: "🌐",
    title: { en: "Using the Internet", hi: "इंटरनेट का उपयोग" },
    summary: {
      en: "Open a browser and search for information carefully.",
      hi: "ब्राउज़र खोलना और सावधानी से जानकारी खोजना सीखें।",
    },
    steps: {
      en: [
        "Open a web browser such as Chrome.",
        "Tap the Google search box and type what you want to find.",
        "Check the website address before opening it; the example shown is a government website.",
        "Read online-safety guidance and protect your personal details while browsing.",
      ],
      hi: [
        "Chrome जैसा वेब ब्राउज़र खोलें।",
        "Google खोज बॉक्स में वह जानकारी लिखें जिसे आप ढूँढ़ना चाहते हैं।",
        "वेबसाइट खोलने से पहले उसका पता जाँचें; चित्र में सरकारी वेबसाइट का उदाहरण है।",
        "इंटरनेट सुरक्षा के सुझाव पढ़ें और ब्राउज़ करते समय अपनी निजी जानकारी सुरक्षित रखें।",
      ],
    },
    images: [
      "/images/internet-browser.jpg",
      "/images/internet-search.jpg",
      "/images/internet-website-check.jpg",
      "/images/internet-safety.jpg",
    ],
  },
  {
    key: "email",
    icon: "✉️",
    title: { en: "Email Basics", hi: "ईमेल की बुनियादी बातें" },
    summary: {
      en: "Understand an email, its subject, and its attachments.",
      hi: "ईमेल, उसका विषय और अटैचमेंट को समझें।",
    },
    steps: {
      en: [
        "Open your email app, such as Gmail.",
        "Tap Compose to start a new email.",
        "Enter the recipient's email address and add a subject.",
        "Use the paperclip button to attach a file; only open attachments you trust.",
      ],
      hi: [
        "Gmail जैसे ईमेल ऐप को खोलें।",
        "नया ईमेल लिखने के लिए Compose दबाएँ।",
        "प्राप्तकर्ता का ईमेल पता लिखें और विषय जोड़ें।",
        "फ़ाइल जोड़ने के लिए पेपरक्लिप बटन दबाएँ; केवल भरोसेमंद अटैचमेंट खोलें।",
      ],
    },
    images: [
      "/images/email-open.jpg",
      "/images/email-compose.jpg",
      "/images/email-recipient.jpg",
      "/images/email-attachment-safety.jpg",
    ],
  },
  {
    key: "payments",
    icon: "💳",
    title: { en: "Digital Payments", hi: "डिजिटल भुगतान" },
    summary: {
      en: "Learn basic precautions before using UPI or other payment apps.",
      hi: "UPI या अन्य भुगतान ऐप इस्तेमाल करने से पहले की बुनियादी सावधानियाँ जानें।",
    },
    steps: {
      en: [
        "Open a trusted UPI payment app, such as BHIM.",
        "Scan the recipient's QR code using the payment app.",
        "Enter the amount, check it carefully, and tap Pay.",
        "Enter your UPI PIN privately to authorize the payment; never tell it to anyone.",
      ],
      hi: [
        "BHIM जैसे भरोसेमंद UPI भुगतान ऐप को खोलें।",
        "भुगतान ऐप से प्राप्तकर्ता का QR कोड स्कैन करें।",
        "राशि लिखें, उसे ध्यान से जाँचें और Pay दबाएँ।",
        "भुगतान की पुष्टि के लिए अपना UPI PIN निजी रूप से दर्ज करें; इसे किसी को न बताएँ।",
      ],
    },
    images: [
      "/images/upi-open-app.jpg",
      "/images/upi-check-recipient.jpg",
      "/images/upi-payment-pin-safety.jpg",
      "/images/upi-never-share-pin.jpg",
    ],
  },
  {
    key: "scams",
    icon: "🔎",
    title: { en: "Spotting Fake Messages", hi: "नकली संदेश पहचानें" },
    summary: {
      en: "Recognize common warning signs in suspicious calls and messages.",
      hi: "संदिग्ध कॉल और संदेशों में आम चेतावनी के संकेत पहचानें।",
    },
    steps: {
      en: [
        "Be cautious of unexpected prize messages that urge you to click a link.",
        "Check the sender carefully; be wary of messages from unknown numbers.",
        "Never share an OTP, even if a message asks you to send it.",
        "Use the Report option for suspicious messages instead of replying or clicking.",
      ],
      hi: [
        "अचानक मिलने वाले इनाम के संदेशों से सावधान रहें जो लिंक पर क्लिक करने को कहते हैं।",
        "भेजने वाले की जानकारी ध्यान से जाँचें; अनजान नंबरों से आए संदेशों से सावधान रहें।",
        "कोई संदेश माँगे तब भी अपना OTP कभी साझा न करें।",
        "संदिग्ध संदेश का जवाब देने या लिंक खोलने के बजाय Report विकल्प चुनें।",
      ],
    },
    images: [
      "/images/scam-urgent-message.jpg",
      "/images/scam-fake-link.jpg",
      "/images/scam-fake-number.jpg",
      "/images/scam-verify-contact.jpg",
    ],
  },
];
