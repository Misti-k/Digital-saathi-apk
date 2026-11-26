import type { Localized } from "@/types";

const L = (en: string, hi: string): Localized => ({ en, hi });

/** Every piece of visible interface text, in English and Hindi. */
export const content = {
  header: {
    logo: "Digital Saathi",
    logoLabel: L("Digital Saathi home", "डिजिटल साथी होम"),
    navLabel: L("Main navigation", "मुख्य मेनू"),
    controlsLabel: L("Text size controls", "अक्षर आकार नियंत्रण"),
    lessons: L("Lessons", "पाठ"),
    safety: L("Online Safety", "ऑनलाइन सुरक्षा"),
    quiz: L("Quiz", "प्रश्नोत्तरी"),
    feedback: L("Feedback", "प्रतिक्रिया"),
    smaller: L("Decrease text size", "अक्षर छोटे करें"),
    larger: L("Increase text size", "अक्षर बड़े करें"),
    read: L("🔊 Read", "🔊 सुनें"),
    switchLanguage: L("Switch language", "भाषा बदलें"),
    /** Label on the toggle shows the language you will switch TO. */
    languageButton: L("हिन्दी", "English"),
  },
  speech: {
    welcome: L(
      "Welcome to Digital Saathi. Learn to use your phone, explore the internet, and stay safe online.",
      "डिजिटल साथी में आपका स्वागत है। अपने फोन का उपयोग करना, इंटरनेट चलाना और ऑनलाइन सुरक्षित रहना सीखें।",
    ),
    unsupported: L(
      "Read aloud is not supported in this browser. Try an updated version of Chrome, Edge, or Safari.",
      "इस ब्राउज़र में पढ़कर सुनाने की सुविधा उपलब्ध नहीं है। Chrome, Edge या Safari का नया संस्करण आज़माएँ।",
    ),
  },
  hero: {
    eyebrow: L("LEARN AT YOUR OWN PACE", "अपनी गति से सीखें"),
    title: L("Technology is for everyone.", "तकनीक सबके लिए है।"),
    copy: L(
      "Learn to use your phone, explore the internet, and stay safe online with simple step-by-step lessons.",
      "अपने फोन का उपयोग करना, इंटरनेट चलाना और आसान चरणों में ऑनलाइन सुरक्षित रहना सीखें।",
    ),
    cta: L("Start Learning", "सीखना शुरू करें"),
    cardLabel: L("Learning message", "सीखने का संदेश"),
    cardTitle: L("One small step at a time", "एक बार में एक छोटा कदम"),
    cardText: L(
      "No experience needed. Practice, learn, and grow with confidence.",
      "पहले से अनुभव होना ज़रूरी नहीं। अभ्यास करें और आत्मविश्वास से सीखें।",
    ),
  },
  lessons: {
    eyebrow: L("LEARNING CORNER", "सीखने का कोना"),
    title: L("Choose a lesson", "एक पाठ चुनें"),
    subtitle: L(
      "Start with a topic that is useful in everyday life.",
      "रोज़मर्रा के जीवन में उपयोगी विषय से शुरुआत करें।",
    ),
    open: L("Open lesson", "पाठ खोलें"),
    close: L("✕ Close", "✕ बंद करें"),
    closeLabel: L("Close lesson", "पाठ बंद करें"),
    readAloud: L("🔊 Read this lesson aloud", "🔊 यह पाठ सुनें"),
    step: L("step", "चरण"),
    markComplete: L("☐ Mark as completed", "☐ पूरा हुआ चिह्नित करें"),
    completed: L("✓ Completed", "✓ पूरा हुआ"),
    completedBadge: L("✓ Completed", "✓ पूरा हुआ"),
  },
  safety: {
    eyebrow: L("STAY SAFE ONLINE", "ऑनलाइन सुरक्षित रहें"),
    title: L("Pause before you tap.", "क्लिक करने से पहले रुकें।"),
    text: L(
      "Scammers may pretend to be banks, delivery companies, or government offices. Take your time and ask someone you trust if something feels suspicious.",
      "धोखेबाज़ बैंक, डिलीवरी कंपनी या सरकारी कर्मचारी बनकर बात कर सकते हैं। जल्दबाज़ी न करें और संदेह होने पर भरोसेमंद व्यक्ति से पूछें।",
    ),
    tips: [
      L("Never share your OTP, PIN, or password.", "अपना OTP, PIN या पासवर्ड कभी किसी को न बताएँ।"),
      L("Do not click unexpected or suspicious links.", "अनपेक्षित या संदिग्ध लिंक पर क्लिक न करें।"),
      L(
        "Verify requests for money using a trusted phone number.",
        "पैसे माँगने वाले अनुरोध की पुष्टि किसी भरोसेमंद फोन नंबर से करें।",
      ),
      L(
        "Never install an app because a stranger tells you to.",
        "किसी अनजान व्यक्ति के कहने पर कोई ऐप इंस्टॉल न करें।",
      ),
    ],
  },
  quiz: {
    eyebrow: L("PRACTICE TIME", "अभ्यास का समय"),
    title: L("Quick safety quiz", "ऑनलाइन सुरक्षा प्रश्नोत्तरी"),
    subtitle: L(
      "Choose an answer. You will see feedback right away.",
      "उत्तर चुनें। आपको तुरंत प्रतिक्रिया मिलेगी।",
    ),
    wrong: L("Not quite. ", "यह सही उत्तर नहीं है। "),
    next: L("Next question", "अगला प्रश्न"),
    seeResult: L("See final result", "परिणाम देखें"),
    tryAgain: L("Try again", "फिर से प्रयास करें"),
    complete: L("Quiz complete", "प्रश्नोत्तरी पूरी हुई"),
    perfect: L(
      "Excellent! Keep following these safety habits.",
      "बहुत अच्छा! इन सुरक्षा आदतों को जारी रखें।",
    ),
    goodEffort: L(
      "Good effort! Review the tips and try again.",
      "अच्छा प्रयास! सुझाव पढ़ें और फिर कोशिश करें।",
    ),
  },
  feedback: {
    eyebrow: L("YOUR VOICE", "आपकी राय"),
    title: L("Tell us what you think", "हमें अपनी राय बताएँ"),
    subtitle: L(
      "Was a lesson unclear? Share a suggestion; it helps us improve.",
      "क्या कोई पाठ समझने में कठिन था? अपना सुझाव लिखें; इससे हमें सुधार करने में मदद मिलेगी।",
    ),
    ratingLabel: L("How helpful was Digital Saathi? (optional)", "डिजिटल साथी कितना उपयोगी लगा? (वैकल्पिक)"),
    ratingNone: L("Choose a rating", "रेटिंग चुनें"),
    ratings: [
      L("5 – Very helpful", "5 – बहुत उपयोगी"),
      L("4 – Helpful", "4 – उपयोगी"),
      L("3 – Okay", "3 – ठीक-ठाक"),
      L("2 – Needs work", "2 – सुधार चाहिए"),
      L("1 – Not helpful", "1 – उपयोगी नहीं"),
    ],
    messageLabel: L("Your message", "आपका संदेश"),
    submit: L("Send feedback", "प्रतिक्रिया भेजें"),
    sending: L("Sending…", "भेजा जा रहा है…"),
    sent: L("Thank you! Your feedback was sent.", "धन्यवाद! आपकी प्रतिक्रिया भेज दी गई है।"),
    error: L(
      "Sorry, we couldn't send your feedback. Please try again.",
      "क्षमा करें, आपकी प्रतिक्रिया नहीं भेजी जा सकी। कृपया फिर प्रयास करें।",
    ),
  },
  footer: {
    tagline: L("Learning has no age limit.", "सीखने की कोई उम्र नहीं होती।"),
    note: L(
      "A student project to promote digital confidence and online safety.",
      "डिजिटल आत्मविश्वास और ऑनलाइन सुरक्षा को बढ़ावा देने के लिए एक छात्र परियोजना।",
    ),
  },
} as const;

/** Small helpers for strings that contain numbers. */
export const formatters = {
  questionCount: (lang: "en" | "hi", n: number, total: number) =>
    lang === "hi" ? `प्रश्न ${n} / ${total}` : `Question ${n} of ${total}`,
  score: (lang: "en" | "hi", score: number) =>
    lang === "hi" ? `अंक: ${score}` : `Score: ${score}`,
  lessonProgress: (lang: "en" | "hi", done: number, total: number) =>
    lang === "hi" ? `${total} में से ${done} पाठ पूरे हुए` : `${done} of ${total} lessons completed`,
  quizStats: (lang: "en" | "hi", best: number, total: number, attempts: number) =>
    lang === "hi"
      ? `सर्वश्रेष्ठ अंक: ${best} / ${total} · प्रयास: ${attempts}`
      : `Best score: ${best} of ${total} · Attempts: ${attempts}`,
  finalScore: (lang: "en" | "hi", score: number, total: number) =>
    lang === "hi"
      ? `आपके ${total} में से ${score} अंक हैं।`
      : `You scored ${score} out of ${total}.`,
};
