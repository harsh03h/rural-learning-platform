// Comprehensive Curriculum Courses for Classes 6 to 10
// GyanSetu Rural Digital Learning Platform

export const sampleCourses = [

  // ==========================================
  // CLASS 6 COURSES (Middle School Foundation)
  // ==========================================
  {
    id: "math-c6",
    subject: "math",
    classGrade: "Class 6",
    title: {
      en: "Class 6 Mathematics",
      hi: "कक्षा 6 गणित",
      mr: "इयत्ता 6 वी गणित"
    },
    icon: "Calculator",
    color: "from-amber-500 to-orange-600",
    chapters: [
      {
        id: "math-c6-ch1",
        title: {
          en: "Knowing Our Numbers & Whole Numbers",
          hi: "अपनी संख्याओं की जानकारी एवं पूर्ण संख्याएँ"
        },
        topicKey: "Number Systems",
        sizeKB: 22,
        isDownloaded: false,
        summary: {
          en: "Understanding large numbers, place value system, estimation, and properties of whole numbers with daily market examples.",
          hi: "स्थानीय मान, बड़ी संख्याओं की तुलना और दैनिक हाट-बाजार के लेन-देन में संख्याओं के उपयोग को समझें।"
        },
        lowDataContent: {
          en: `### 1. Indian Place Value System
Numbers are grouped from right to left:
- **Ones, Tens, Hundreds** (First period)
- **Thousands, Ten Thousands** (Second period)
- **Lakhs, Ten Lakhs** (Third period)
- **Crores, Ten Crores** (Fourth period)

Example: In 2,45,600:
- 2 is in Lakhs place = 2,00,000
- 4 is in Ten Thousands = 40,000
- 5 is in Thousands = 5,000

### 2. Whole Numbers & The Number Line
- Natural numbers (1, 2, 3...) along with 0 are **Whole Numbers** (0, 1, 2, 3...).
- The smallest whole number is **0**.
- Moving right on the number line indicates **Addition**.
- Moving left on the number line indicates **Subtraction**.

### 3. Practical Village Market Example
A farmer sold 3 sacks of wheat for ₹2,400 each. Total earning = 3 × 2,400 = **₹7,200**!`,
          hi: `### 1. भारतीय संख्या प्रणाली (Indian System)
दाएं से बाएं अल्पविराम (Commas) लगाने का नियम:
- पहला अल्पविराम 3 अंकों के बाद (सैकड़ा)
- उसके बाद प्रत्येक 2-2 अंकों के बाद (हजार, लाख, करोड़)

उदाहरण: 2,45,600 (दो लाख पैंतालीस हज़ार छह सौ)।

### 2. पूर्ण संख्याएँ (Whole Numbers)
- प्राकृतिक संख्याओं (1, 2, 3...) में 0 मिलाने पर **पूर्ण संख्याएँ** बनती हैं।
- सबसे छोटी पूर्ण संख्या **0** है।
- संख्या रेखा पर दाईं ओर चलना जोड़ना है और बाईं ओर चलना घटाना।`
        },
        audioScript: {
          en: "Welcome to Class 6 Mathematics. In this lesson, we study whole numbers and place values. The Indian place value system groups numbers into ones, thousands, lakhs, and crores. The smallest whole number is zero.",
          hi: "कक्षा 6 गणित में आपका स्वागत है। इस पाठ में हम पूर्ण संख्याएँ और स्थानीय मान सीखेंगे। सबसे छोटी पूर्ण संख्या शून्य है।"
        },
        quiz: [
          {
            id: "q-c6-math-1",
            question: {
              en: "What is the smallest whole number?",
              hi: "सबसे छोटी पूर्ण संख्या कौन सी है?"
            },
            options: ["1", "0", "-1", "10"],
            correct: 1,
            explanation: {
              en: "0 is the smallest whole number. Natural numbers start from 1, but whole numbers start from 0.",
              hi: "0 सबसे छोटी पूर्ण संख्या है। प्राकृतिक संख्याएँ 1 से शुरू होती हैं, जबकि पूर्ण संख्याएँ 0 से।"
            }
          }
        ]
      },
      {
        id: "math-c6-ch2",
        title: {
          en: "Basic Geometrical Ideas & 2D Shapes",
          hi: "आधारभूत ज्यामितीय अवधारणाएँ एवं आकृतियाँ"
        },
        topicKey: "Geometry",
        sizeKB: 20,
        isDownloaded: false,
        summary: {
          en: "Learn points, line segments, rays, angles, triangles, and village land boundaries.",
          hi: "बिंदु, रेखाखंड, किरण, कोण, त्रिभुज और खेत की मेड़ों के ज्यामितीय आकार को समझें।"
        },
        lowDataContent: {
          en: `### 1. Point, Line Segment, and Ray
- **Point:** A precise dot indicating position with no length or width.
- **Line Segment:** The shortest distance between two points (has fixed length).
- **Ray:** Starts from one fixed point and extends infinitely in one direction (like sunlight rays).

### 2. Polygons in Daily Rural Life
- A triangle has **3 sides** and **3 angles** (e.g., roof trusses).
- A quadrilateral has **4 sides** (e.g., rectangular crop fields).
- Perimeter is the total boundary distance.`,
          hi: `### 1. बिंदु, रेखाखंड और किरण
- **बिंदु:** स्थिति दर्शाने वाला सूक्ष्म चिह्न जिसकी कोई लंबाई-चौड़ाई नहीं होती।
- **रेखाखंड:** दो बिंदुओं के बीच की निश्चित दूरी।
- **किरण:** एक प्रारंभिक बिंदु से शुरू होकर अनंत तक जाने वाली रेखा (जैसे सूर्य की किरणें)।`
        },
        audioScript: {
          en: "Geometry helps us understand shapes and land boundaries. A point marks a location. A line segment has two fixed end points.",
          hi: "ज्यामिति हमें खेत की मेड़ों और आकृतियों को समझने में मदद करती है।"
        },
        quiz: [
          {
            id: "q-c6-math-2",
            question: {
              en: "How many end points does a line segment have?",
              hi: "एक रेखाखंड के कितने अंत बिंदु (End points) होते हैं?"
            },
            options: ["0", "1", "2", "Infinite"],
            correct: 2,
            explanation: {
              en: "A line segment connects two points and has exactly 2 end points.",
              hi: "रेखाखंड के ठीक 2 अंत बिंदु होते हैं।"
            }
          }
        ]
      }
    ]
  },
  {
    id: "sci-c6",
    subject: "science",
    classGrade: "Class 6",
    title: {
      en: "Class 6 Science",
      hi: "कक्षा 6 विज्ञान",
      mr: "इयत्ता 6 वी विज्ञान"
    },
    icon: "FlaskConical",
    color: "from-emerald-500 to-teal-700",
    chapters: [
      {
        id: "sci-c6-ch1",
        title: {
          en: "Components of Food & Balanced Rural Diet",
          hi: "भोजन के घटक एवं संतुलित आहार"
        },
        topicKey: "Biology",
        sizeKB: 24,
        isDownloaded: false,
        summary: {
          en: "Carbohydrates, proteins, fats, vitamins, and minerals found in locally grown grains and vegetables.",
          hi: "दालें, रोटी, हरी सब्जियां, दूध और गुड़ से मिलने वाले आवश्यक पोषक तत्व और संतुलित आहार।"
        },
        lowDataContent: {
          en: `### 1. Essential Nutrients in Food
Our food provides energy, growth, and disease resistance:
- **Carbohydrates:** Energy-giving food (Wheat, rice, potatoes, maize).
- **Fats:** Stored energy (Mustard oil, ghee, peanuts).
- **Proteins:** Body-building food (Lentils/dal, gram/chana, milk, eggs).
- **Vitamins & Minerals:** Disease protection (Amla, green leafy vegetables, carrots).

### 2. Balanced Diet on a Rural Plate
A balanced diet does not require expensive food! A simple meal of **roti, dal, seasonal spinach/saag, jaggery (gur), and buttermilk (chaas)** provides 100% of daily nutritional needs.`,
          hi: `### 1. भोजन के प्रमुख पोषक तत्व
- **कार्बोहाइड्रेट:** ऊर्जा देने वाले तत्व (गेहूं, चावल, बाजरा, आलू)।
- **प्रोटीन:** शरीर की वृद्धि और मरम्मत के लिए (दालें, चना, सोयाबीन, दूध)।
- **विटामिन एवं खनिज:** बीमारियों से बचाव (आंवला, हरी पत्तेदार सब्जियां, गाजर)।`
        },
        audioScript: {
          en: "Food gives our body energy and health. Carbohydrates from wheat and rice give us instant energy, while proteins from dal and milk help us grow strong.",
          hi: "भोजन हमारे शरीर को ऊर्जा और शक्ति देता है। दाल और दूध से प्रोटीन तथा रोटी से कार्बोहाइड्रेट मिलता है।"
        },
        quiz: [
          {
            id: "q-c6-sci-1",
            question: {
              en: "Which nutrient is primarily responsible for muscle growth and body repair?",
              hi: "शरीर की वृद्धि और मरम्मत के लिए कौन सा पोषक तत्व मुख्य रूप से आवश्यक है?"
            },
            options: ["Fats (वसा)", "Carbohydrates (कार्बोहाइड्रेट)", "Proteins (प्रोटीन)", "Roughage (आहारी रेशे)"],
            correct: 2,
            explanation: {
              en: "Proteins are body-building foods needed for growth and muscle tissue repair.",
              hi: "प्रोटीन को शरीर-निर्माता भोजन कहा जाता है जो मांसपेशियों और ऊतकों के निर्माण के लिए जरूरी है।"
            }
          }
        ]
      }
    ]
  },
  {
    id: "eng-c6",
    subject: "english",
    classGrade: "Class 6",
    title: {
      en: "Class 6 English",
      hi: "कक्षा 6 अंग्रेजी",
      mr: "इयत्ता 6 वी इंग्रजी"
    },
    icon: "BookOpen",
    color: "from-sky-500 to-blue-600",
    chapters: [
      {
        id: "eng-c6-ch1",
        title: {
          en: "A Tale of Two Birds & Polite Dialogue",
          hi: "दो पक्षियों की कहानी एवं शिष्टाचार संवाद"
        },
        topicKey: "English Literature",
        sizeKB: 18,
        isDownloaded: false,
        summary: {
          en: "Learn how company shapes character through the classic Panchatantra fable, and practice basic English sentences.",
          hi: "सत्संगति का प्रभाव और अंग्रेजी में रोजमर्रा के शिष्टाचार वाक्य बोलना सीखें।"
        },
        lowDataContent: {
          en: `### 1. Story Moral: "A Person is Known by the Company They Keep"
Two baby birds were separated by a fierce storm:
- One bird landed near a robbers' den and learned rude language.
- The other bird landed near a Rishi's ashram and learned gentle, welcoming greetings.

### 2. Common English Classroom Expressions
- *"May I come in, Sir / Ma'am?"*
- *"Thank you for teaching us."*
- *"Could you please repeat that question?"*`,
          hi: `### 1. कहानी का संदेश
जैसी संगति, वैसी ही बोली और संस्कार बनते हैं। आश्रम का पक्षी मधुर स्वागत करता है, जबकि डाकुओं के पास रहने वाला पक्षी कठोर बोलता है।`
        },
        audioScript: {
          en: "A Tale of Two Birds teaches us that good company brings polite manners and respect.",
          hi: "यह कहानी हमें सिखाती है कि अच्छी संगति से अच्छे विचार और भाषा का विकास होता है।"
        },
        quiz: [
          {
            id: "q-c6-eng-1",
            question: {
              en: "What is the correct polite phrase to ask permission to enter a classroom?",
              hi: "कक्षा में प्रवेश की अनुमति मांगने के लिए सही विनम्र वाक्य कौन सा है?"
            },
            options: ["I am entering now", "May I come in, teacher?", "Open the door", "Let me sit"],
            correct: 1,
            explanation: {
              en: "'May I come in, teacher?' is the polite formal request.",
              hi: "'May I come in, teacher?' विनम्र अनुमति मांगने का सही तरीका है।"
            }
          }
        ]
      }
    ]
  },
  {
    id: "soc-c6",
    subject: "social",
    classGrade: "Class 6",
    title: {
      en: "Class 6 Social Science",
      hi: "कक्षा 6 सामाजिक विज्ञान",
      mr: "इयत्ता 6 वी सामाजिक शास्त्र"
    },
    icon: "Compass",
    color: "from-emerald-500 to-teal-700",
    chapters: [
      {
        id: "soc-c6-ch1",
        title: {
          en: "Understanding Diversity & What is Government?",
          hi: "विविधता की समझ एवं सरकार क्या है?"
        },
        topicKey: "Civics",
        sizeKB: 21,
        isDownloaded: false,
        summary: {
          en: "Discover India's rich cultural, linguistic, and geographical unity in diversity and the basic functions of government.",
          hi: "भारत की विविधता में एकता और सरकार के बुनियादी स्तरों व जिम्मेदारियों को समझें।"
        },
        lowDataContent: {
          en: `### 1. Unity in Diversity
India is home to diverse languages, foods, festivals, and landscapes. Yet, during the freedom movement, people from all backgrounds united together under the tricolor.

### 2. Levels of Government in India
1. **Local Level:** Village Panchayat or Municipal town.
2. **State Level:** State Government covering Uttar Pradesh, Maharashtra, etc.
3. **National Level:** Central Government in New Delhi.`,
          hi: `### 1. विविधता में एकता
भारत में विभिन्न भाषाएं, बोलियां और त्यौहार होने के बावजूद हम सभी एक सूत्र में बंधे हैं।

### 2. सरकार के तीन स्तर
1. स्थानीय स्तर (ग्राम पंचायत व नगर पालिका)
2. राज्य स्तर (राज्य सरकार)
3. राष्ट्रीय स्तर (केंद्र सरकार)`
        },
        audioScript: {
          en: "India is proud of its unity in diversity. The government works at local village levels, state levels, and the national central level.",
          hi: "भारत की पहचान विविधता में एकता है। सरकार स्थानीय, राज्य और राष्ट्रीय स्तर पर कार्य करती है।"
        },
        quiz: [
          {
            id: "q-c6-soc-1",
            question: {
              en: "How many main levels of government operate in India?",
              hi: "भारत में सरकार कितने मुख्य स्तरों पर कार्य करती है?"
            },
            options: ["1 Level", "2 Levels", "3 Levels", "5 Levels"],
            correct: 2,
            explanation: {
              en: "India has 3 levels of government: Local, State, and National (Central).",
              hi: "भारत में सरकार 3 स्तरों पर कार्य करती है: स्थानीय, राज्य और राष्ट्रीय स्तर।"
            }
          }
        ]
      }
    ]
  },
  {
    id: "hindi-c6",
    subject: "hindi",
    classGrade: "Class 6",
    title: {
      en: "Class 6 Hindi Literature",
      hi: "कक्षा 6 हिंदी साहित्य (वसंत भाग-1)",
      mr: "इयत्ता 6 वी हिंदी साहित्य"
    },
    icon: "BookOpen",
    color: "from-rose-500 to-red-600",
    chapters: [
      {
        id: "hindi-c6-ch1",
        title: {
          en: "Vah Chidiya Jo (Poem by Kedarnath Agarwal)",
          hi: "वह चिड़िया जो (केदारनाथ अग्रवाल की कविता)"
        },
        topicKey: "Hindi Poetry",
        sizeKB: 18,
        isDownloaded: false,
        summary: {
          en: "A beautiful poem about a small blue bird that loves milk-filled grains, nature, and self-respect.",
          hi: "दूध भरे जुंडी के दानों से प्यार करने वाली नीले पंखों वाली नन्ही और संतोषी चिड़िया की प्रेरणादायक कविता।"
        },
        lowDataContent: {
          en: `### 1. Poem Core Lines
*"वह चिड़िया जो चोंच मार कर, दूध भरे जुंडी के दाने,*
*रुचि से, रस से खा लेती है, वह छोटी संतोषी चिड़िया,*
*नीले पंखों वाली मैं हूँ, मुझे अन्न से बहुत प्यार है।..."*

### 2. Key Meanings
- **जुंडी (Jundi):** Jowar/millets grain (ज्वार के दाने)
- **संतोषी:** Satisfied / Content (संतुष्ट स्वभाव वाली)
- **विपिन:** Forest (जंगल)`,
          hi: `### 1. कविता का भावार्थ
कवि ने नीले पंखों वाली चिड़िया के माध्यम से संतोषी स्वभाव और प्रकृति प्रेम का संदेश दिया है। चिड़िया ज्वार के कच्चे दूधिया दानों को बड़े चाव से खाती है।`
        },
        audioScript: {
          en: "Kedarnath Agarwal's poem tells us about the joyful blue bird that finds contentment in nature.",
          hi: "केदारनाथ अग्रवाल की इस कविता में नीले पंखों वाली संतोषी चिड़िया के प्रकृति प्रेम का वर्णन है।"
        },
        quiz: [
          {
            id: "q-c6-hin-1",
            question: {
              en: "What does the blue bird love to eat with relish in the poem?",
              hi: "कविता में चिड़िया किस चीज़ को चाव से खाती है?"
            },
            options: ["मिठाई (Sweets)", "दूध भरे जुंडी के दाने (Millets)", "चावल (Rice)", "फल (Fruits)"],
            correct: 1,
            explanation: {
              en: "The bird eats milk-filled jowar/millets grains (दूध भरे जुंडी के दाने) with great joy.",
              hi: "चिड़िया दूध भरे ज्वार के दानों को बड़े स्वाद से खाती है।"
            }
          }
        ]
      }
    ]
  },
  {
    id: "comp-c6",
    subject: "computer",
    classGrade: "Class 6",
    title: {
      en: "Class 6 Digital Literacy",
      hi: "कक्षा 6 डिजिटल साक्षरता व मोबाइल तकनीक",
      mr: "इयत्ता 6 वी डिजिटल साक्षरता"
    },
    icon: "Laptop",
    color: "from-indigo-500 to-purple-600",
    chapters: [
      {
        id: "comp-c6-ch1",
        title: {
          en: "Smartphone Basics & Offline Learning Apps",
          hi: "स्मार्टफोन का सही उपयोग व ऑफ़लाइन पढ़ाई"
        },
        topicKey: "Computer Science",
        sizeKB: 17,
        isDownloaded: false,
        summary: {
          en: "How touchscreens work, saving battery in rural areas, and downloading lessons for offline use.",
          hi: "टचस्क्रीन के इशारे, बैटरी बचत के उपाय और बिना इंटरनेट के ऑफ़लाइन पाठ पढ़ना सीखें।"
        },
        lowDataContent: {
          en: `### 1. Essential Touch Gestures
- **Tap (टैप):** Select an item or open a lesson.
- **Swipe (स्वाइप):** Turn pages or scroll up and down.
- **Pinch-to-zoom:** Enlarge small textbook diagrams.

### 2. Saving Battery & Data in Villages
1. Turn on **Airplane Mode** or **Battery Saver** while studying offline.
2. Download worksheets during good network hours and study later without consuming bandwidth!`,
          hi: `### 1. टचस्क्रीन के मूल जेस्चर
- टैप करना: बटन या लिंक खोलने के लिए।
- स्वाइप करना: पन्ने पलटने व ऊपर-नीचे करने के लिए।

### 2. गांव में बैटरी और डेटा बचाने के उपाय
ऑफ़लाइन डाउनलोड किए गए पाठों को पढ़ते समय डेटा बंद रखें ताकि बैटरी लंबे समय तक चले।`
        },
        audioScript: {
          en: "Smartphones allow us to study even when far away from school. Download your lessons when internet is available to study uninterrupted anytime.",
          hi: "स्मार्टफोन से आप कहीं भी पढ़ाई कर सकते हैं। ऑफ़लाइन डाउनलोड करने के बाद बिना इंटरनेट के भी पढ़ाई जारी रहती है।"
        },
        quiz: [
          {
            id: "q-c6-comp-1",
            question: {
              en: "How can you study lessons on GyanSetu when village cell reception is down?",
              hi: "गांव में नेटवर्क न होने पर ज्ञानसेतु पर पढ़ाई कैसे कर सकते हैं?"
            },
            options: ["Go to the roof", "Save chapters offline beforehand", "Restart phone", "Wait for broadband"],
            correct: 1,
            explanation: {
              en: "GyanSetu allows caching chapters offline so you can read anytime without mobile internet.",
              hi: "ज्ञानसेतु के पाठों को पहले से ऑफ़लाइन सेव करके बिना इंटरनेट कभी भी पढ़ा जा सकता है।"
            }
          }
        ]
      }
    ]
  },

  // ==========================================
  // CLASS 8 COURSES (Upper Primary & Advanced)
  // ==========================================
  {
    id: "math-c8",
    subject: "math",
    classGrade: "Class 8",
    title: {
      en: "Class 8 Mathematics",
      hi: "कक्षा 8 गणित",
      mr: "इयत्ता 8 वी गणित"
    },
    icon: "Calculator",
    color: "from-amber-500 to-orange-600",
    chapters: [
      {
        id: "math-c8-ch1",
        title: {
          en: "Rational Numbers & Number Line",
          hi: "परिमेय संख्याएँ एवं संख्या रेखा"
        },
        topicKey: "Rational Numbers",
        sizeKB: 25,
        isDownloaded: false,
        summary: {
          en: "Properties of rational numbers: closure, commutativity, associativity, and finding numbers between two fractions.",
          hi: "p/q के रूप में व्यक्त संख्याएँ, संवृत व क्रमविनिमेय गुणधर्म और दो संख्याओं के बीच परिमेय संख्याएँ ज्ञात करना।"
        },
        lowDataContent: {
          en: `### 1. What is a Rational Number?
A number that can be written in the form **p/q**, where **p and q are integers** and **q ≠ 0**.
Examples: 3/5, -2/7, 0 (0 = 0/1), and 4 (4 = 4/1).

### 2. Additive Inverse and Multiplicative Inverse
- **Additive Inverse of a:** -a (Sum equals 0: a + (-a) = 0).
- **Multiplicative Inverse (Reciprocal) of a/b:** b/a (Product equals 1: (a/b) × (b/a) = 1).

### 3. Number Line Representation
Positive rational numbers lie to the **right of 0**; negative rational numbers lie to the **left of 0**.`,
          hi: `### 1. परिमेय संख्या की परिभाषा
वह संख्या जिसे **p/q** के रूप में लिखा जा सके, जहाँ p और q पूर्णांक हैं तथा **q ≠ 0**।
उदाहरण: 2/3, -5/8, 0 (0 = 0/1)।

### 2. योज्य प्रतिलोम एवं गुणात्मक प्रतिलोम
- a का योज्य प्रतिलोम **-a** होता है (a + (-a) = 0)।
- a/b का गुणात्मक प्रतिलोम (व्युत्क्रम) **b/a** होता है।`
        },
        audioScript: {
          en: "Rational numbers are numbers written in the form p over q where q is not zero. Every whole number and fraction is a rational number.",
          hi: "परिमेय संख्याएं वे संख्याएं हैं जिन्हें p बटा q के रूप में लिखा जा सकता है जहां q शून्य नहीं होता।"
        },
        quiz: [
          {
            id: "q-c8-math-1",
            question: {
              en: "What is the multiplicative inverse (reciprocal) of -5/8?",
              hi: "-5/8 का गुणात्मक प्रतिलोम (व्युत्क्रम) क्या होगा?"
            },
            options: ["5/8", "-8/5", "8/5", "-5/-8"],
            correct: 1,
            explanation: {
              en: "Reciprocal of p/q is q/p with sign intact: -5/8 becomes -8/5 so their product is +1.",
              hi: "-5/8 का व्युत्क्रम -8/5 है ताकि दोनों का गुणनफल +1 प्राप्त हो।"
            }
          }
        ]
      },
      {
        id: "math-c8-ch2",
        title: {
          en: "Linear Equations in One Variable",
          hi: "एक चर वाले रैखिक समीकरण"
        },
        topicKey: "Linear Equations",
        sizeKB: 23,
        isDownloaded: false,
        summary: {
          en: "Solving algebraic equations with variables on one or both sides using transposition method.",
          hi: "पक्षांतरण विधि से रैखिक समीकरण हल करना और व्यावहारिक ग्रामीण समस्याओं को गणित में बदलना।"
        },
        lowDataContent: {
          en: `### 1. Linear Equation Basics
An equation where the highest power of the variable is **1**.
Example: **2x + 7 = 19**
- Subtract 7 from both sides: 2x = 12
- Divide by 2: **x = 6**

### 2. Transposition Rule (पक्षांतरण नियम)
- + turns into - when moved across =
- - turns into +
- × turns into ÷
- ÷ turns into ×`,
          hi: `### 1. रैखिक समीकरण
जिस समीकरण में चर की अधिकतम घात 1 हो।
उदाहरण: 3x - 5 = 16
पक्षांतरण करने पर: 3x = 16 + 5 = 21
x = 21 / 3 = 7`
        },
        audioScript: {
          en: "Linear equations help solve unknown quantities. When transposing terms across the equals sign, reverse the operations.",
          hi: "रैखिक समीकरण अज्ञात मानों को खोजने में मदद करते हैं।"
        },
        quiz: [
          {
            id: "q-c8-math-2",
            question: {
              en: "If 3x + 5 = 26, what is the value of x?",
              hi: "यदि 3x + 5 = 26 हो, तो x का मान क्या होगा?"
            },
            options: ["5", "7", "8", "9"],
            correct: 1,
            explanation: {
              en: "3x = 26 - 5 = 21. Therefore x = 21 / 3 = 7.",
              hi: "3x = 26 - 5 = 21. अतः x = 21 / 3 = 7."
            }
          }
        ]
      }
    ]
  },
  {
    id: "sci-c8",
    subject: "science",
    classGrade: "Class 8",
    title: {
      en: "Class 8 Science",
      hi: "कक्षा 8 विज्ञान",
      mr: "इयत्ता 8 वी विज्ञान"
    },
    icon: "FlaskConical",
    color: "from-emerald-500 to-teal-700",
    chapters: [
      {
        id: "sci-c8-ch1",
        title: {
          en: "Crop Production & Scientific Farming",
          hi: "फसल उत्पादन एवं वैज्ञानिक कृषि प्रबंध"
        },
        topicKey: "Agriculture Science",
        sizeKB: 27,
        isDownloaded: false,
        summary: {
          en: "Soil preparation, seed selection, drip irrigation, organic manure vs chemical fertilizers, and crop storage.",
          hi: "मिट्टी की तैयारी, उन्नत बीज, ड्रिप सिंचाई, जैविक खाद बनाम उर्वरक और सुरक्षित अनाज भंडारण।"
        },
        lowDataContent: {
          en: `### 1. Kharif vs Rabi Crops
- **Kharif Crops:** Sown in rainy season (June to September). Examples: Paddy (Dhan), Maize, Soyabean, Groundnut.
- **Rabi Crops:** Sown in winter season (October to March). Examples: Wheat, Gram (Chana), Mustard, Pea.

### 2. Modern Water-Saving Irrigation
1. **Sprinkler System:** Best for uneven sandy soil.
2. **Drip Irrigation:** Water falls drop by drop directly at roots; zero water waste!

### 3. Manure vs Chemical Fertilizers
- **Manure (गोबर खाद):** Natural organic substance that enriches humus and soil microbes.
- **Fertilizers (यूरिया, DAP):** Inorganic mineral salts rich in N-P-K, but excessive use degrades soil fertility over time.`,
          hi: `### 1. खरीफ एवं रबी फसलें
- **खरीफ:** वर्षा ऋतु में (जून-सितंबर) - धान, मक्का, मूंगफली।
- **रबी:** शीत ऋतु में (अक्टूबर-मार्च) - गेहूं, चना, सरसों, मटर।

### 2. जल संरक्षण वाली सिंचाई विधियां
- ड्रिप (टपक) सिंचाई: बूंद-बूंद पानी सीधे जड़ों में गिरता है, जिससे पानी की भारी बचत होती है।`
        },
        audioScript: {
          en: "Crop production is the backbone of rural life. Kharif crops like paddy grow in monsoons, while Rabi crops like wheat thrive in winter.",
          hi: "फसल उत्पादन हमारे ग्रामीण जीवन का आधार है। खरीफ की फसलें वर्षा ऋतु में और रबी की फसलें सर्दी में उगाई जाती हैं।"
        },
        quiz: [
          {
            id: "q-c8-sci-1",
            question: {
              en: "Which of the following is a classic Rabi crop grown during winter months?",
              hi: "निम्नलिखित में से कौन सी सर्दियों में उगाई जाने वाली रबी की फसल है?"
            },
            options: ["Paddy / धान", "Wheat / गेहूँ", "Cotton / कपास", "Maize / मक्का"],
            correct: 1,
            explanation: {
              en: "Wheat is a Rabi crop sown in October-November and harvested in March-April.",
              hi: "गेहूं रबी की मुख्य फसल है जिसे अक्टूबर-नवंबर में बोया जाता है।"
            }
          }
        ]
      }
    ]
  },
  {
    id: "eng-c8",
    subject: "english",
    classGrade: "Class 8",
    title: {
      en: "Class 8 English",
      hi: "कक्षा 8 अंग्रेजी",
      mr: "इयत्ता 8 वी इंग्रजी"
    },
    icon: "BookOpen",
    color: "from-sky-500 to-blue-600",
    chapters: [
      {
        id: "eng-c8-ch1",
        title: {
          en: "The Best Christmas Present in the World & Tenses",
          hi: "विश्व का सर्वश्रेष्ठ उपहार एवं काल (Tenses)",
        },
        topicKey: "English Grammar",
        sizeKB: 21,
        isDownloaded: false,
        summary: {
          en: "A moving wartime letter by Michael Morpurgo, paired with mastering Simple Past vs Past Perfect tenses.",
          hi: "सैनिकों के भाईचारे की मार्मिक कहानी और पास्ट टेंस (भूतकाल) का सटीक व्याकरण अभ्यास।"
        },
        lowDataContent: {
          en: `### 1. Story Context
During World War I on Christmas Day 1914, British and German soldiers laid down their rifles, met in No Man's Land, shared cakes, and played football in peaceful harmony.

### 2. Past Perfect Tense (had + V3)
Used when an action occurred before another past event:
- *"The train **had left** before we reached the railway station."*
- *"Jim **had written** the letter before the war ended."*`,
          hi: `### 1. कहानी का सारांश
प्रथम विश्व युद्ध के दौरान क्रिसमस पर दोनों पक्षों के सैनिकों ने युद्ध रोककर शांति और भाईचारे का संदेश दिया।

### 2. Past Perfect Tense का प्रयोग
जब भूतकाल में किसी एक कार्य से पहले दूसरा कार्य पूरा हो चुका हो (had + क्रिया का तीसरा रूप)।`
        },
        audioScript: {
          en: "This story reminds us that peace and human kindness are greater than any war.",
          hi: "यह कहानी हमें सिखाती है कि शांति और सद्भाव युद्ध से कहीं अधिक मूल्यवान हैं।"
        },
        quiz: [
          {
            id: "q-c8-eng-1",
            question: {
              en: "Fill in the blank: 'The bell _______ (ring) before the students entered the classroom.'",
              hi: "रिक्त स्थान भरें: 'The bell _______ before the students entered the classroom.'"
            },
            options: ["rang", "had rung", "rings", "is ringing"],
            correct: 1,
            explanation: {
              en: "Use Past Perfect 'had rung' for the earlier action in past time.",
              hi: "पहले घंटी बजी, इसलिए 'had rung' (Past Perfect) का प्रयोग होगा।"
            }
          }
        ]
      }
    ]
  },
  {
    id: "soc-c8",
    subject: "social",
    classGrade: "Class 8",
    title: {
      en: "Class 8 Social Science",
      hi: "कक्षा 8 सामाजिक विज्ञान",
      mr: "इयत्ता 8 वी सामाजिक शास्त्र"
    },
    icon: "Compass",
    color: "from-emerald-500 to-teal-700",
    chapters: [
      {
        id: "soc-c8-ch1",
        title: {
          en: "The Indian Constitution & Fundamental Rights",
          hi: "भारतीय संविधान एवं मौलिक अधिकार"
        },
        topicKey: "Civics & Constitution",
        sizeKB: 24,
        isDownloaded: false,
        summary: {
          en: "Dr. B.R. Ambedkar's vision, federalism, separation of powers, and the 6 Fundamental Rights protecting every citizen.",
          hi: "बाबासाहेब डॉ. भीमराव आंबेडकर का संविधान, संघवाद, शक्तियों का बंटवारा और नागरिकों के 6 मौलिक अधिकार।"
        },
        lowDataContent: {
          en: `### 1. Key Pillars of the Indian Constitution
Drafted under the chairmanship of **Dr. B.R. Ambedkar**, it came into effect on **26th January 1950**.
- **Federalism:** Existence of more than one level of government.
- **Separation of Powers:** Legislature (lawmakers), Executive (law enforcers), Judiciary (courts).

### 2. Six Fundamental Rights (मौलिक अधिकार)
1. **Right to Equality:** All citizens equal before the law regardless of caste, religion, or gender.
2. **Right to Freedom:** Speech, assembly, and movement.
3. **Right against Exploitation:** Bans child labor.
4. **Right to Freedom of Religion.**
5. **Cultural & Educational Rights.**
6. **Right to Constitutional Remedies.**`,
          hi: `### 1. भारतीय संविधान के प्रमुख लक्षण
26 जनवरी 1950 को लागू हुआ हमारा संविधान देश का सर्वोच्च कानून है।
- **संघवाद:** केंद्र और राज्य स्तर पर सरकारें।
- **समानता का अधिकार:** कानून के समक्ष सभी नागरिक समान हैं।

### 2. मौलिक अधिकार
संविधान प्रत्येक नागरिक को जाति, धर्म या लिंग के भेदभाव के बिना समानता और सम्मान का अधिकार देता है।`
        },
        audioScript: {
          en: "The Indian Constitution protects the dignity of every citizen through fundamental rights, guaranteeing equal opportunities in every village and town.",
          hi: "भारतीय संविधान प्रत्येक नागरिक को समानता और स्वतंत्रता की गारंटी देता है।"
        },
        quiz: [
          {
            id: "q-c8-soc-1",
            question: {
              en: "Who was the Chairman of the Drafting Committee of the Indian Constitution?",
              hi: "भारतीय संविधान की प्रारूप समिति के अध्यक्ष कौन थे?"
            },
            options: ["Mahatma Gandhi", "Dr. B.R. Ambedkar", "Jawaharlal Nehru", "Sardar Patel"],
            correct: 1,
            explanation: {
              en: "Dr. B.R. Ambedkar led the Drafting Committee and is recognized as the Father of the Indian Constitution.",
              hi: "डॉ. भीमराव आंबेडकर संविधान सभा की प्रारूप समिति के अध्यक्ष थे।"
            }
          }
        ]
      }
    ]
  },
  {
    id: "hindi-c8",
    subject: "hindi",
    classGrade: "Class 8",
    title: {
      en: "Class 8 Hindi Literature",
      hi: "कक्षा 8 हिंदी साहित्य (वसंत भाग-3)",
      mr: "इयत्ता 8 वी हिंदी साहित्य"
    },
    icon: "BookOpen",
    color: "from-rose-500 to-red-600",
    chapters: [
      {
        id: "hindi-c8-ch1",
        title: {
          en: "Dhwani (Poem by Suryakant Tripathi 'Nirala')",
          hi: "ध्वनि (सूर्यकांत त्रिपाठी 'निराला' की कविता)"
        },
        topicKey: "Hindi Poetry",
        sizeKB: 18,
        isDownloaded: false,
        summary: {
          en: "Nirala's energetic poem urging youth to wake from slumber and fill life with spring's fresh enthusiasm.",
          hi: "युवा पीढ़ी में आलस्य त्यागकर जीवन में नई ऊर्जा, उत्साह और वसंत का संचार करने का अमर संदेश।"
        },
        lowDataContent: {
          en: `### 1. Poem Stanza
*"अभी न होगा मेरा अंत,*
*अभी-अभी ही तो आया है,*
*मेरे वन में मृदुल वसंत,*
*अभी न होगा मेरा अंत।..."*

### 2. Moral Theme
The poet expresses optimism and confidence, comparing his youthful creative energy to springtime flowers.`,
          hi: `### 1. कविता का मूल संदेश
महाकवि निराला इस कविता में आशावाद और आत्मविश्वास का संचार करते हैं। वे कहते हैं कि अभी उनका अंत नहीं हो सकता, क्योंकि उनके जीवन में युवा उत्साह का वसंत आया है।`
        },
        audioScript: {
          en: "Nirala's poem Dhwani inspires us to live with optimism, hard work, and energy.",
          hi: "निराला जी की कविता ध्वनि हमें आशावादी और परिश्रमी बनने की प्रेरणा देती है।"
        },
        quiz: [
          {
            id: "q-c8-hin-1",
            question: {
              en: "Who is the poet of the famous poem 'ध्वनि' (Dhwani)?",
              hi: "प्रसिद्ध कविता 'ध्वनि' के रचयिता कौन हैं?"
            },
            options: ["महादेवी वर्मा", "सूर्यकांत त्रिपाठी 'निराला'", "रामधारी सिंह दिनकर", "जयशंकर प्रसाद"],
            correct: 1,
            explanation: {
              en: "Suryakant Tripathi 'Nirala' is the poet of 'Dhwani'.",
              hi: "'ध्वनि' कविता महाकवि सूर्यकांत त्रिपाठी 'निराला' द्वारा रचित है।"
            }
          }
        ]
      }
    ]
  },
  {
    id: "comp-c8",
    subject: "computer",
    classGrade: "Class 8",
    title: {
      en: "Class 8 Digital Literacy",
      hi: "कक्षा 8 कंप्यूटर व सूचना प्रौद्योगिकी",
      mr: "इयत्ता 8 वी डिजिटल साक्षरता"
    },
    icon: "Laptop",
    color: "from-indigo-500 to-purple-600",
    chapters: [
      {
        id: "comp-c8-ch1",
        title: {
          en: "Computer Hardware & Bilingual Typing",
          hi: "कंप्यूटर हार्डवेयर व हिंदी/अंग्रेजी टाइपिंग"
        },
        topicKey: "Computer Science",
        sizeKB: 20,
        isDownloaded: false,
        summary: {
          en: "CPU, RAM, storage drives, keyboard shortcuts, and typing in regional Hindi scripts.",
          hi: "सीपीयू, रैम, हार्ड ड्राइव और मंगल फॉन्ट से हिंदी टाइपिंग के मूल सिद्धांत।"
        },
        lowDataContent: {
          en: `### 1. CPU vs RAM vs Storage
- **CPU (Central Processing Unit):** Brain of computer that executes calculations.
- **RAM (Random Access Memory):** Temporary high-speed memory for running apps.
- **Hard Drive / SSD:** Permanent storage for saving documents and offline quizzes.

### 2. Common Keyboard Shortcuts
- **Ctrl + C:** Copy text.
- **Ctrl + V:** Paste text.
- **Ctrl + S:** Save document immediately.`,
          hi: `### 1. कंप्यूटर के प्रमुख भाग
- **CPU:** कंप्यूटर का मस्तिष्क।
- **RAM:** अस्थाई तीव्र मेमोरी।
- **Storage:** स्थाई मेमोरी जहां फाइलें सुरक्षित रहती हैं।`
        },
        audioScript: {
          en: "Computers use CPU for processing and storage drives for saving documents safely.",
          hi: "कंप्यूटर में सीपीयू प्रोसेसिंग का कार्य करता है और मेमोरी में डेटा सुरक्षित रहता है।"
        },
        quiz: [
          {
            id: "q-c8-comp-1",
            question: {
              en: "Which component is known as the 'Brain' of a computer?",
              hi: "कंप्यूटर का 'मस्तिष्क' किस घटक को कहा जाता है?"
            },
            options: ["Monitor", "RAM", "CPU", "Keyboard"],
            correct: 2,
            explanation: {
              en: "CPU (Central Processing Unit) performs all processing and controls operations.",
              hi: "CPU को कंप्यूटर का मस्तिष्क कहा जाता है।"
            }
          }
        ]
      }
    ]
  },

  // ==========================================
  // CLASS 9 COURSES (Secondary Core Concepts)
  // ==========================================
  {
    id: "math-c9",
    subject: "math",
    classGrade: "Class 9",
    title: {
      en: "Class 9 Mathematics",
      hi: "कक्षा 9 गणित",
      mr: "इयत्ता 9 वी गणित"
    },
    icon: "Calculator",
    color: "from-amber-500 to-orange-600",
    chapters: [
      {
        id: "math-c9-ch1",
        title: {
          en: "Number Systems & Irrational Numbers",
          hi: "संख्या पद्धति एवं अपरिमेय संख्याएँ"
        },
        topicKey: "Number Systems",
        sizeKB: 26,
        isDownloaded: false,
        summary: {
          en: "Real numbers, terminating vs non-terminating decimals, proving √2 is irrational, and rationalizing denominators.",
          hi: "वास्तविक संख्याएं, सांत व असांत दशमलव, अपरिमेय संख्याओं का निरूपण और हर का परिमेयकरण।"
        },
        lowDataContent: {
          en: `### 1. Real Number Hierarchy
- **Rational Numbers:** Decimal expansion is either terminating (e.g. 0.5) or non-terminating recurring (e.g. 0.333...).
- **Irrational Numbers:** Decimal expansion is **non-terminating and non-recurring** (e.g. √2 = 1.4142135..., π = 3.14159...).
- **Real Numbers:** The complete set containing both rational and irrational numbers.

### 2. Rationalizing the Denominator
To remove square roots from denominator:
- Multiply numerator and denominator of 1/√3 by √3: **(1×√3) / (√3×√3) = √3 / 3**.`,
          hi: `### 1. परिमेय बनाम अपरिमेय संख्याएं
- परिमेय संख्याओं का दशमलव प्रसार या तो **सांत** होता है या **असांत आवर्ती**।
- अपरिमेय संख्याओं का दशमलव प्रसार **असांत अनावर्ती** होता है (जैसे √2, √3, π)।`
        },
        audioScript: {
          en: "In Class 9, we discover irrational numbers like square root of two, whose decimal digits never terminate and never repeat.",
          hi: "कक्षा 9 में हम अपरिमेय संख्याओं को सीखते हैं जिनका दशमलव प्रसार असांत अनावर्ती होता है।"
        },
        quiz: [
          {
            id: "q-c9-math-1",
            question: {
              en: "Which of the following is an irrational number?",
              hi: "निम्नलिखित में से कौन सी एक अपरिमेय संख्या है?"
            },
            options: ["√4", "3/7", "√5", "0.25"],
            correct: 2,
            explanation: {
              en: "√5 cannot be expressed as p/q and has a non-terminating non-repeating decimal, making it irrational. (√4 = 2 is rational).",
              hi: "√5 एक अपरिमेय संख्या है क्योंकि इसे p/q के रूप में व्यक्त नहीं किया जा सकता (जबकि √4 = 2 परिमेय है)।"
            }
          }
        ]
      },
      {
        id: "math-c9-ch2",
        title: {
          en: "Polynomials & Factoring",
          hi: "बहुपद एवं गुणनखंडन"
        },
        topicKey: "Algebra",
        sizeKB: 25,
        isDownloaded: false,
        summary: {
          en: "Degree of polynomials, zeroes of polynomials, Remainder Theorem, and factorizing quadratics by splitting middle term.",
          hi: "बहुपद की घात, बहुपद के शून्यक, शेषफल प्रमेय और मध्य पद विभक्त करके गुणनखंड करना।"
        },
        lowDataContent: {
          en: `### 1. Degree of Polynomial
The highest power of variable x:
- Degree 1: **Linear** (e.g. 3x + 5)
- Degree 2: **Quadratic** (e.g. x² + 5x + 6)
- Degree 3: **Cubic** (e.g. 2x³ - 4x² + 1)

### 2. Splitting the Middle Term
To factorize **x² + 5x + 6**:
- Find two numbers whose product is 6 and sum is 5 (numbers are 2 and 3).
- x² + 2x + 3x + 6 = x(x + 2) + 3(x + 2) = **(x + 2)(x + 3)**!`,
          hi: `### 1. बहुपद की घात
चर x की उच्चतम घात को बहुपद की घात कहते हैं।
- रैखिक बहुपद: घात 1
- द्विघात बहुपद: घात 2 (जैसे x² + 5x + 6)

### 2. मध्य पद तोड़कर गुणनखंड करना
x² + 5x + 6 = (x + 2)(x + 3)`
        },
        audioScript: {
          en: "Polynomials are foundational in high school algebra. A quadratic polynomial has degree two and can be factorized by splitting its middle term.",
          hi: "द्विघात बहुपद की अधिकतम घात दो होती है।"
        },
        quiz: [
          {
            id: "q-c9-math-2",
            question: {
              en: "What is the degree of the polynomial P(x) = 4x³ + 2x² - 9x + 7?",
              hi: "बहुपद P(x) = 4x³ + 2x² - 9x + 7 की घात क्या है?"
            },
            options: ["1", "2", "3", "7"],
            correct: 2,
            explanation: {
              en: "The highest power of variable x is 3, so its degree is 3.",
              hi: "चर x की उच्चतम घात 3 है, इसलिए बहुपद की घात 3 है।"
            }
          }
        ]
      }
    ]
  },
  {
    id: "sci-c9",
    subject: "science",
    classGrade: "Class 9",
    title: {
      en: "Class 9 Science",
      hi: "कक्षा 9 विज्ञान",
      mr: "इयत्ता 9 वी विज्ञान"
    },
    icon: "FlaskConical",
    color: "from-emerald-500 to-teal-700",
    chapters: [
      {
        id: "sci-c9-ch1",
        title: {
          en: "The Fundamental Unit of Life: Cell",
          hi: "जीवन की मौलिक इकाई: कोशिका"
        },
        topicKey: "Cell Biology",
        sizeKB: 28,
        isDownloaded: false,
        summary: {
          en: "Robert Hooke's discovery, plasma membrane, nucleus, mitochondria (powerhouse of cell), and plant vs animal cells.",
          hi: "रॉबर्ट हुक द्वारा कोशिका की खोज, कोशिका झिल्ली, केंद्रक, माइटोकॉन्ड्रिया (कोशिका का ऊर्जाघर) और पादप व जंतु कोशिका।"
        },
        lowDataContent: {
          en: `### 1. Cell Discovery
In 1665, **Robert Hooke** observed thin slices of cork under his microscope and named the tiny compartments "cells".

### 2. Key Cell Organelles
- **Plasma Membrane:** Selectively permeable boundary controlling entry and exit of molecules.
- **Nucleus:** Brain of cell containing genetic chromosomes (DNA).
- **Mitochondria:** "Powerhouse of the cell" that produces energy packets called ATP.
- **Chloroplasts:** Present only in plant cells for photosynthesis.
- **Cell Wall:** Rigid outer cellulose wall present in plant cells for mechanical support.`,
          hi: `### 1. कोशिका की खोज
1665 में रॉबर्ट हुक ने कॉर्क की पतली काट में कोशिका की खोज की।

### 2. प्रमुख कोशिकांग
- **माइटोकॉन्ड्रिया:** कोशिका का 'बिजलीघर' या 'ऊर्जाघर' (Powerhouse) जो ATP बनाता है।
- **केंद्रक:** कोशिका की सभी जैविक क्रियाओं का नियंत्रण केंद्र।
- **कोशिका भित्ति व क्लोरोप्लास्ट:** केवल पादप कोशिकाओं में पाए जाते हैं।`
        },
        audioScript: {
          en: "The cell is the basic structural and functional unit of all living organisms. Mitochondria generates energy for cellular functions.",
          hi: "कोशिका सभी जीवों की मौलिक संरचनात्मक और कार्यात्मक इकाई है।"
        },
        quiz: [
          {
            id: "q-c9-sci-1",
            question: {
              en: "Which cell organelle is known as the 'Powerhouse of the Cell'?",
              hi: "किस कोशिकांग को 'कोशिका का ऊर्जाघर' (Powerhouse) कहा जाता है?"
            },
            options: ["Ribosome", "Mitochondria", "Lysosome", "Golgi Body"],
            correct: 1,
            explanation: {
              en: "Mitochondria generates cellular energy in the form of ATP molecules, hence called the powerhouse of the cell.",
              hi: "माइटोकॉन्ड्रिया ATP के रूप में ऊर्जा बनाता है, इसलिए इसे कोशिका का ऊर्जाघर कहते हैं।"
            }
          }
        ]
      }
    ]
  },
  {
    id: "eng-c9",
    subject: "english",
    classGrade: "Class 9",
    title: {
      en: "Class 9 English",
      hi: "कक्षा 9 अंग्रेजी",
      mr: "इयत्ता 9 वी इंग्रजी"
    },
    icon: "BookOpen",
    color: "from-sky-500 to-blue-600",
    chapters: [
      {
        id: "eng-c9-ch1",
        title: {
          en: "The Fun They Had & Active/Passive Voice",
          hi: "भविष्य के स्कूल एवं कर्तृवाच्य/कर्मवाच्य"
        },
        topicKey: "English Literature & Grammar",
        sizeKB: 21,
        isDownloaded: false,
        summary: {
          en: "Isaac Asimov's science-fiction story set in year 2157 comparing robotic screens to human village schools.",
          hi: "आइजैक असीमोव की भविष्यवादी कहानी जहां बच्चे रोबोट से पढ़ते हैं और पुराने मानवीय स्कूलों को याद करते हैं।"
        },
        lowDataContent: {
          en: `### 1. Story Context
In year 2157, children Margie and Tommy study individually at home through robotic mechanical teachers on screens. When Tommy finds a real printed paper book from centuries ago, they marvel at how ancient children studied together in common classrooms with human teachers!

### 2. Active Voice vs Passive Voice
- **Active:** *"The teacher explained the lesson."* (Subject performs action)
- **Passive:** *"The lesson was explained by the teacher."* (Object is focused)`,
          hi: `### 1. कहानी का संदेश
तकनीक कितनी भी आगे बढ़ जाए, साथी बच्चों के साथ मिलकर पढ़ने और मानवीय शिक्षक के स्नेह का कोई मुकाबला नहीं है।`
        },
        audioScript: {
          en: "Isaac Asimov's story shows that studying together in school with friends is a joyful privilege.",
          hi: "यह कहानी दर्शाती है कि दोस्तों के साथ स्कूल में मिलकर पढ़ना कितना सुखद अनुभव है।"
        },
        quiz: [
          {
            id: "q-c9-eng-1",
            question: {
              en: "Convert to Passive Voice: 'The farmer ploughed the field.'",
              hi: "पैसिव वॉइस में बदलें: 'The farmer ploughed the field.'"
            },
            options: [
              "The field was ploughed by the farmer.",
              "The field is ploughed by farmer.",
              "The farmer was ploughing.",
              "The field has been ploughed."
            ],
            correct: 0,
            explanation: {
              en: "Simple past passive form is 'was/were + V3': 'The field was ploughed by the farmer.'",
              hi: "भूतकाल में पैसिव वॉइस का नियम: was + V3 + by subject।"
            }
          }
        ]
      }
    ]
  },
  {
    id: "soc-c9",
    subject: "social",
    classGrade: "Class 9",
    title: {
      en: "Class 9 Social Science",
      hi: "कक्षा 9 सामाजिक विज्ञान",
      mr: "इयत्ता 9 वी सामाजिक शास्त्र"
    },
    icon: "Compass",
    color: "from-emerald-500 to-teal-700",
    chapters: [
      {
        id: "soc-c9-ch1",
        title: {
          en: "What is Democracy? Why Democracy?",
          hi: "लोकतंत्र क्या और क्यों?"
        },
        topicKey: "Political Science",
        sizeKB: 24,
        isDownloaded: false,
        summary: {
          en: "Key features of democracy, free and fair elections, rule of law, and universal adult franchise.",
          hi: "लोकतंत्र की विशेषताएं, निष्पक्ष चुनाव, कानून का शासन और एक व्यक्ति-एक वोट-एक मूल्य का सिद्धांत।"
        },
        lowDataContent: {
          en: `### 1. Definition of Democracy
A form of government in which **rulers are elected by the people**.
Abraham Lincoln: *"Democracy is government of the people, by the people, for the people."*

### 2. Four Pillars of Democratic Elections
1. Final decision-making power rests with elected representatives.
2. Free, competitive, and fair elections with genuine choice.
3. **One person, One vote, One value:** Every adult citizen has equal voting power.
4. Government rules within constitutional law and citizen rights.`,
          hi: `### 1. लोकतंत्र का अर्थ
जनता द्वारा चुनी गई शासन प्रणाली। अब्राहम लिंकन: 'लोकतंत्र जनता का, जनता द्वारा, जनता के लिए शासन है।'

### 2. मुख्य सिद्धांत
- स्वतंत्र और निष्पक्ष चुनाव।
- एक व्यक्ति, एक वोट, एक समान मूल्य।`
        },
        audioScript: {
          en: "Democracy ensures every adult citizen has an equal voice through free elections.",
          hi: "लोकतंत्र में प्रत्येक नागरिक को समान वोट और निर्णय लेने की शक्ति मिलती है।"
        },
        quiz: [
          {
            id: "q-c9-soc-1",
            question: {
              en: "What does 'Universal Adult Franchise' mean in Indian democracy?",
              hi: "भारतीय लोकतंत्र में 'सार्वभौमिक वयस्क मताधिकार' का क्या अर्थ है?"
            },
            options: [
              "Only educated people can vote",
              "Every adult citizen (18+) has the right to vote equally",
              "Only landowners can vote",
              "Voting depends on tax payments"
            ],
            correct: 1,
            explanation: {
              en: "All Indian citizens aged 18 or above have the right to vote with equal weight, regardless of wealth, caste, or education.",
              hi: "18 वर्ष या उससे अधिक आयु के सभी नागरिकों को बिना किसी भेदभाव के समान वोट का अधिकार प्राप्त है।"
            }
          }
        ]
      }
    ]
  },
  {
    id: "hindi-c9",
    subject: "hindi",
    classGrade: "Class 9",
    title: {
      en: "Class 9 Hindi Literature",
      hi: "कक्षा 9 हिंदी साहित्य (क्षितिज भाग-1)",
      mr: "इयत्ता 9 वी हिंदी साहित्य"
    },
    icon: "BookOpen",
    color: "from-rose-500 to-red-600",
    chapters: [
      {
        id: "hindi-c9-ch1",
        title: {
          en: "Do Bailon Ki Katha (Munshi Premchand)",
          hi: "दो बैलों की कथा (मुंशी प्रेमचंद की प्रसिद्ध कहानी)"
        },
        topicKey: "Hindi Prose",
        sizeKB: 22,
        isDownloaded: false,
        summary: {
          en: "The heroic friendship of bullocks Heera and Moti highlighting animal emotions, freedom, and resistance against cruelty.",
          hi: "हीरा और मोती दो बैलों की अटूट मित्रता, स्वाभिमान और आज़ादी के लिए संघर्ष की कालजयी कहानी।"
        },
        lowDataContent: {
          en: `### 1. Story Characters & Theme
- **Characters:** झूरी (मालिक), गया (क्रूर साला), हीरा एवं मोती (स्वाभिमानी बैल)।
- **Theme:** Even mute animals deeply value dignity and freedom, standing united through thick and thin.`,
          hi: `### 1. कहानी का सारांश
मुंशी प्रेमचंद की यह कहानी दर्शाती है कि स्वतंत्रता सहज नहीं मिलती, उसके लिए संघर्ष करना पड़ता है। हीरा और मोती का परस्पर प्रेम और स्वाभिमान अनुकरणीय है।`
        },
        audioScript: {
          en: "Munshi Premchand's story reminds us to treat animals with compassion and celebrate friendship and freedom.",
          hi: "प्रेमचंद की यह कहानी पशुओं के प्रति संवेदना और स्वतंत्रता के मूल्य को दर्शाती है।"
        },
        quiz: [
          {
            id: "q-c9-hin-1",
            question: {
              en: "Who is the author of 'दो बैलों की कथा' (Do Bailon Ki Katha)?",
              hi: "'दो बैलों की कथा' के प्रसिद्ध लेखक कौन हैं?"
            },
            options: ["मुंशी प्रेमचंद", "हजारी प्रसाद द्विवेदी", "महादेवी वर्मा", "हरिशंकर परसाई"],
            correct: 0,
            explanation: {
              en: "Munshi Premchand authored this classic story.",
              hi: "यह कहानी उपन्यास सम्राट मुंशी प्रेमचंद द्वारा रचित है।"
            }
          }
        ]
      }
    ]
  },
  {
    id: "comp-c9",
    subject: "computer",
    classGrade: "Class 9",
    title: {
      en: "Class 9 Digital Literacy",
      hi: "कक्षा 9 कंप्यूटर व डेटा प्रबंधन",
      mr: "इयत्ता 9 वी डिजिटल साक्षरता"
    },
    icon: "Laptop",
    color: "from-indigo-500 to-purple-600",
    chapters: [
      {
        id: "comp-c9-ch1",
        title: {
          en: "Spreadsheets & Online Privacy",
          hi: "स्प्रेडशीट (Excel) व ऑनलाइन गोपनीयता"
        },
        topicKey: "Computer Applications",
        sizeKB: 21,
        isDownloaded: false,
        summary: {
          en: "Rows, columns, cells, basic formulas (=SUM, =AVERAGE), and protecting personal digital data.",
          hi: "स्प्रेडशीट में पंक्ति, स्तंभ, सेल, बुनियादी सूत्र और डिजिटल जानकारी को सुरक्षित रखने के नियम।"
        },
        lowDataContent: {
          en: `### 1. Spreadsheet Building Blocks
- **Rows:** Horizontal numbered blocks (1, 2, 3...)
- **Columns:** Vertical lettered blocks (A, B, C...)
- **Cell:** Intersection of row and column (e.g. A1, B5)

### 2. Common Formulas
- To calculate total marks: '=SUM(B2:B10)'
- To find average marks: '=AVERAGE(B2:B10)'`,
          hi: `### 1. स्प्रेडशीट के मूल तत्व
- रो (पंक्ति) और कॉलम (स्तंभ) के मिलन को सेल (Cell) कहते हैं।
- सभी फॉर्मूले बराबर चिह्न (=) से शुरू होते हैं। जैसे =SUM(A1:A5)`
        },
        audioScript: {
          en: "Spreadsheets help organize marks, crop yields, and calculations with automated formulas.",
          hi: "स्प्रेडशीट में गणितीय गणनाएं स्वचालित सूत्रों से की जाती हैं।"
        },
        quiz: [
          {
            id: "q-c9-comp-1",
            question: {
              en: "With which symbol must every spreadsheet formula begin?",
              hi: "स्प्रेडशीट का प्रत्येक फॉर्मूला किस चिह्न से शुरू होना अनिवार्य है?"
            },
            options: ["#", "@", "=", "+"],
            correct: 2,
            explanation: {
              en: "In Excel and Google Sheets, all formulas start with the equals sign (=).",
              hi: "सभी फॉर्मूले '=' चिह्न से शुरू होते हैं।"
            }
          }
        ]
      }
    ]
  },

  // ==========================================
  // CLASS 10 COURSES (Secondary Board Exams)
  // ==========================================
  {
    id: "math-c10",
    subject: "math",
    classGrade: "Class 10",
    title: {
      en: "Class 10 Mathematics (Board Prep)",
      hi: "कक्षा 10 गणित (बोर्ड परीक्षा विशेष)",
      mr: "इयत्ता 10 वी गणित"
    },
    icon: "Calculator",
    color: "from-amber-500 to-orange-600",
    chapters: [
      {
        id: "math-c10-ch1",
        title: {
          en: "Real Numbers & Fundamental Theorem of Arithmetic",
          hi: "वास्तविक संख्याएं एवं अंकगणित की आधारभूत प्रमेय"
        },
        topicKey: "Real Numbers",
        sizeKB: 27,
        isDownloaded: false,
        summary: {
          en: "Euclid's Division Lemma, Fundamental Theorem of Arithmetic, HCF × LCM = a × b, and proving irrationality of √3.",
          hi: "अंकगणित की आधारभूत प्रमेय, अभाज्य गुणनखंड विधि से म.स. और ल.स. ज्ञात करना और सिद्ध करना कि √3 अपरिमेय है।"
        },
        lowDataContent: {
          en: `### 1. Fundamental Theorem of Arithmetic
Every composite number can be expressed as a product of primes uniquely, apart from the order in which the prime factors occur.
Example: 360 = 2³ × 3² × 5

### 2. Golden Property for Two Numbers
For any two positive integers a and b:
**HCF(a, b) × LCM(a, b) = a × b**

### 3. Proving Irrationality (Proof by Contradiction)
To prove √5 is irrational, assume √5 = a/b (co-primes). Squaring gives 5b² = a², proving 5 divides a and b, which contradicts that a and b are co-prime!`,
          hi: `### 1. अंकगणित की आधारभूत प्रमेय
प्रत्येक भाज्य संख्या को अभाज्य संख्याओं के एक अद्वितीय गुणनफल के रूप में व्यक्त किया जा सकता है।

### 2. दो संख्याओं के लिए महत्वपूर्ण सूत्र
**म.स. (HCF) × ल.स. (LCM) = पहली संख्या × दूसरी संख्या**`
        },
        audioScript: {
          en: "Welcome to Class 10 Board Mathematics. Every composite number can be uniquely factorized into primes. The product of HCF and LCM always equals the product of the two numbers.",
          hi: "कक्षा 10 बोर्ड गणित में आपका स्वागत है। दो संख्याओं का HCF और LCM का गुणनफल उन दोनों संख्याओं के गुणनफल के बराबर होता है।"
        },
        quiz: [
          {
            id: "q-c10-math-1",
            question: {
              en: "If HCF(306, 657) = 9, what is LCM(306, 657)?",
              hi: "यदि HCF(306, 657) = 9 हो, तो LCM(306, 657) क्या होगा?"
            },
            options: ["22,338", "18,450", "20,120", "25,600"],
            correct: 0,
            explanation: {
              en: "LCM = (306 × 657) / 9 = 201,042 / 9 = 22,338.",
              hi: "LCM = (306 × 657) / 9 = 22,338."
            }
          }
        ]
      },
      {
        id: "math-c10-ch2",
        title: {
          en: "Quadratic Equations & Quadratic Formula",
          hi: "द्विघात समीकरण एवं द्विघाती सूत्र (श्रीधराचार्य सूत्र)"
        },
        topicKey: "Quadratic Equations",
        sizeKB: 26,
        isDownloaded: false,
        summary: {
          en: "Standard form ax² + bx + c = 0, discriminant D = b² - 4ac, and nature of real roots.",
          hi: "मानक रूप ax² + bx + c = 0, विविक्तकर D = b² - 4ac और मूलों की प्रकृति।"
        },
        lowDataContent: {
          en: `### 1. Standard Form
**ax² + bx + c = 0** (where a ≠ 0).

### 2. Discriminant (D = b² - 4ac)
- If **D > 0:** Two distinct real roots.
- If **D = 0:** Two equal real roots.
- If **D < 0:** No real roots.

### 3. Quadratic Formula (Shreedharacharya Formula)
**x = (-b ± √(b² - 4ac)) / (2a)**`,
          hi: `### 1. द्विघात समीकरण का मानक रूप
**ax² + bx + c = 0** (जहाँ a ≠ 0)

### 2. विविक्तकर (Discriminant) D = b² - 4ac
- D > 0: दो भिन्न वास्तविक मूल
- D = 0: दो बराबर वास्तविक मूल (-b / 2a)
- D < 0: कोई वास्तविक मूल नहीं

### 3. श्रीधराचार्य सूत्र
**x = (-b ± √D) / 2a**`
        },
        audioScript: {
          en: "Quadratic equations model projectile motions and geometric areas. The discriminant determines whether the roots are real or equal.",
          hi: "द्विघात समीकरण में विविक्तकर b² - 4ac मूलों की प्रकृति तय करता है।"
        },
        quiz: [
          {
            id: "q-c10-math-2",
            question: {
              en: "What is the nature of roots for 2x² - 4x + 2 = 0?",
              hi: "समीकरण 2x² - 4x + 2 = 0 के मूलों की प्रकृति क्या होगी?"
            },
            options: [
              "Two distinct real roots",
              "Two equal real roots (D = 0)",
              "No real roots",
              "Cannot be determined"
            ],
            correct: 1,
            explanation: {
              en: "D = b² - 4ac = (-4)² - 4(2)(2) = 16 - 16 = 0. When D = 0, roots are real and equal.",
              hi: "D = (-4)² - 4(2)(2) = 16 - 16 = 0. अतः दोनों मूल वास्तविक और बराबर होंगे।"
            }
          }
        ]
      },
      {
        id: "math-c10-ch3",
        title: {
          en: "Introduction to Trigonometry",
          hi: "त्रिकोणमिति का परिचय"
        },
        topicKey: "Trigonometry",
        sizeKB: 25,
        isDownloaded: false,
        summary: {
          en: "Ratios sin, cos, tan in right-angled triangles, standard values for 0°, 30°, 45°, 60°, 90°, and sin²θ + cos²θ = 1.",
          hi: "समकोण त्रिभुज में त्रिकोणमितीय अनुपात (sin, cos, tan), मानक कोणों के मान और सर्वसमिकाएं।"
        },
        lowDataContent: {
          en: `### 1. Trigonometric Ratios (Right Triangle)
For acute angle θ:
- **sin θ** = Opposite / Hypotenuse (लम्ब / कर्ण)
- **cos θ** = Adjacent / Hypotenuse (आधार / कर्ण)
- **tan θ** = Opposite / Adjacent = sin θ / cos θ (लम्ब / आधार)

### 2. Standard Values to Memorize
- sin 30° = 1/2, sin 45° = 1/√2, sin 60° = √3/2
- cos 30° = √3/2, cos 45° = 1/√2, cos 60° = 1/2
- tan 45° = 1

### 3. Fundamental Identity
**sin²θ + cos²θ = 1**`,
          hi: `### 1. त्रिकोणमितीय अनुपात
- sin θ = लम्ब / कर्ण
- cos θ = आधार / कर्ण
- tan θ = लम्ब / आधार

### 2. प्रमुख मान
sin 30° = 1/2, cos 60° = 1/2, tan 45° = 1
सर्वसमिका: **sin²θ + cos²θ = 1**`
        },
        audioScript: {
          en: "Trigonometry connects side lengths and angles in right-angled triangles, widely used in astronomy, engineering, and height calculations.",
          hi: "त्रिकोणमिति समकोण त्रिभुज की भुजाओं और कोणों के बीच संबंध स्थापित करती है।"
        },
        quiz: [
          {
            id: "q-c10-math-3",
            question: {
              en: "What is the exact value of tan 45°?",
              hi: "tan 45° का सटीक मान क्या होता है?"
            },
            options: ["0", "1/2", "1", "√3"],
            correct: 2,
            explanation: {
              en: "tan 45° = sin 45° / cos 45° = (1/√2) / (1/√2) = 1.",
              hi: "tan 45° का मान 1 होता है।"
            }
          }
        ]
      }
    ]
  },
  {
    id: "sci-c10",
    subject: "science",
    classGrade: "Class 10",
    title: {
      en: "Class 10 Science (Board Prep)",
      hi: "कक्षा 10 विज्ञान (बोर्ड परीक्षा विशेष)",
      mr: "इयत्ता 10 वी विज्ञान"
    },
    icon: "FlaskConical",
    color: "from-emerald-500 to-teal-700",
    chapters: [
      {
        id: "sci-c10-ch1",
        title: {
          en: "Chemical Reactions and Equations",
          hi: "रासायनिक अभिक्रियाएं एवं समीकरण"
        },
        topicKey: "Chemistry",
        sizeKB: 27,
        isDownloaded: false,
        summary: {
          en: "Balancing chemical equations, combination, decomposition, displacement, and redox (oxidation-reduction) reactions.",
          hi: "रासायनिक समीकरण संतुलित करना, संयोजन, वियोजन, विस्थापन और उपचयन-अपचयन (रेडॉक्स) अभिक्रियाएं।"
        },
        lowDataContent: {
          en: `### 1. Law of Conservation of Mass
Mass can neither be created nor destroyed in a chemical reaction. Therefore, number of atoms of each element on reactant side must equal product side!

### 2. Types of Chemical Reactions
1. **Combination:** Two or more reactants combine to form a single product. (e.g. CaO + H2O → Ca(OH)2)
2. **Decomposition:** Single compound breaks down into two or more products upon heating or electricity.
3. **Displacement:** More reactive metal displaces less reactive metal. (e.g. Fe + CuSO4 → FeSO4 + Cu)
4. **Redox:** Oxidation (gain of oxygen / loss of hydrogen) and Reduction occur simultaneously.`,
          hi: `### 1. द्रव्यमान संरक्षण का नियम
अभिक्रिया में अभिकारकों का कुल द्रव्यमान उत्पादों के कुल द्रव्यमान के बराबर होना चाहिए।

### 2. अभिक्रियाओं के प्रकार
- संयोजन अभिक्रिया: दो या अधिक पदार्थ मिलकर एक नया उत्पाद बनाते हैं।
- विस्थापन अभिक्रिया: अधिक क्रियाशील तत्व कम क्रियाशील तत्व को विस्थापित कर देता है।`
        },
        audioScript: {
          en: "Chemical equations describe atomic transformations. When balancing, ensure mass is conserved on both sides.",
          hi: "रासायनिक समीकरणों को संतुलित करते समय दोनों ओर परमाणुओं की संख्या समान होनी चाहिए।"
        },
        quiz: [
          {
            id: "q-c10-sci-1",
            question: {
              en: "When an iron nail is dipped in blue Copper Sulphate solution, what happens?",
              hi: "जब लोहे की कील को नीले कॉपर सल्फेट विलयन में डुबोया जाता है, तो क्या होता है?"
            },
            options: [
              "No reaction occurs",
              "Solution turns pale green and copper deposits on nail (Displacement)",
              "Nail dissolves completely",
              "Gas is evolved violently"
            ],
            correct: 1,
            explanation: {
              en: "Iron is more reactive than copper; it displaces copper from CuSO4 forming light-green FeSO4 solution.",
              hi: "लोहा कॉपर से अधिक सक्रिय है, इसलिए वह कॉपर को विस्थापित कर हरा फेरस सल्फेट बनाता है।"
            }
          }
        ]
      },
      {
        id: "sci-c10-ch2",
        title: {
          en: "Life Processes: Nutrition & Respiration",
          hi: "जैव प्रक्रम: पोषण एवं श्वसन"
        },
        topicKey: "Biology",
        sizeKB: 28,
        isDownloaded: false,
        summary: {
          en: "Autotrophic vs heterotrophic nutrition, human digestive system, and aerobic vs anaerobic breakdown of glucose.",
          hi: "स्वपोषी व विषमपोषी पोषण, मानव पाचन तंत्र और ग्लूकोज का वायवीय व अवायवीय विखंडन।"
        },
        lowDataContent: {
          en: `### 1. Human Digestive System Steps
- **Mouth:** Salivary amylase breaks starch into simple sugars.
- **Stomach:** Gastric juices (HCl provides acidic medium, Pepsin digests proteins).
- **Small Intestine:** Complete digestion of carbs, proteins, fats with bile and pancreatic juice; villi absorb nutrients.

### 2. Breakdown of Glucose
- In Cytoplasm: Glucose (6-carbon) breaks into **Pyruvate** (3-carbon).
- In Mitochondria (with Oxygen): Pyruvate produces **CO2 + H2O + 38 ATP** (Aerobic).
- In Muscle cells (lack of oxygen): Produces **Lactic Acid**, causing muscle cramps!`,
          hi: `### 1. मानव पाचन तंत्र
- मुख में लार एमाइलेज स्टार्च को पचाता है।
- आमाशय में हाइड्रोक्लोरिक अम्ल (HCl) और पेप्सिन प्रोटीन का पाचन करते हैं।
- क्षुद्रांत्र (छोटी आंत) में भोजन का पूर्ण पाचन होता है।

### 2. श्वसन के प्रकार
- वायवीय श्वसन (ऑक्सीजन की उपस्थिति में): माइटोकॉन्ड्रिया में अधिक ऊर्जा (ATP) उत्पन्न होती है।`
        },
        audioScript: {
          en: "Life processes keep living organisms functioning. Aerobic respiration in mitochondria produces ATP energy packets.",
          hi: "जैव प्रक्रम जीवों के जीवन को बनाए रखने वाले आवश्यक कार्य हैं।"
        },
        quiz: [
          {
            id: "q-c10-sci-2",
            question: {
              en: "Accumulation of which substance in muscle cells causes cramps after sudden intense sprinting?",
              hi: "अचानक तेज़ दौड़ने के बाद मांसपेशियों में किस पदार्थ के जमाव से ऐंठन (Cramps) होती है?"
            },
            options: ["Carbon dioxide", "Ethanol", "Lactic Acid (लैक्टिक अम्ल)", "Hydrochloric acid"],
            correct: 2,
            explanation: {
              en: "Anaerobic respiration in muscle cells under oxygen deficit produces lactic acid, causing cramps.",
              hi: "ऑक्सीजन की कमी में अवायवीय श्वसन से लैक्टिक अम्ल बनता है जिससे मांसपेशियों में ऐंठन होती है।"
            }
          }
        ]
      }
    ]
  },
  {
    id: "eng-c10",
    subject: "english",
    classGrade: "Class 10",
    title: {
      en: "Class 10 English (Board Prep)",
      hi: "कक्षा 10 अंग्रेजी (बोर्ड परीक्षा विशेष)",
      mr: "इयत्ता 10 वी इंग्रजी"
    },
    icon: "BookOpen",
    color: "from-sky-500 to-blue-600",
    chapters: [
      {
        id: "eng-c10-ch1",
        title: {
          en: "A Letter to God & Formal Letters",
          hi: "ए लेटर टू गॉड एवं औपचारिक पत्र लेखन"
        },
        topicKey: "English Board Literature",
        sizeKB: 23,
        isDownloaded: false,
        summary: {
          en: "G.L. Fuentes' story of farmer Lencho's unshakable faith in God, paired with Class 10 Board formal letter formats.",
          hi: "किसान लेंचो का ईश्वर पर अटूट विश्वास और बोर्ड परीक्षा हेतु औपचारिक पत्र (Formal Letter) प्रारूप।"
        },
        lowDataContent: {
          en: `### 1. Story Synopsis
Hardworking farmer Lencho's entire corn crop is destroyed by a devastating hailstorm. With complete faith, he writes a letter addressed directly to "God" requesting 100 pesos. The kind postmaster collects 70 pesos from postal staff to keep his faith alive!

### 2. Class 10 Formal Letter Format
1. Sender's Address & Date
2. Receiver's Designation (The Editor / The Headmaster)
3. Subject: (Underlined and concise)
4. Salutation: (Sir / Ma'am)
5. Body (3 paragraphs: Intro, Detail, Resolution)
6. Yours faithfully / sincerely, followed by Name.`,
          hi: `### 1. कहानी का सारांश
ओलावृष्टि से फसल नष्ट होने पर किसान लेंचो भगवान को पत्र लिखकर 100 पेसो की मांग करता है। डाकघर के कर्मचारी उसकी मदद करते हैं।`
        },
        audioScript: {
          en: "Lencho's story reminds us of simple innocent faith and the quiet generosity of helpful strangers.",
          hi: "यह कहानी निश्छल विश्वास और दयालुता का सुंदर उदाहरण है।"
        },
        quiz: [
          {
            id: "q-c10-eng-1",
            question: {
              en: "Why did the postmaster decide to reply to Lencho's letter to God?",
              hi: "पोस्टमास्टर ने लेंचो के पत्र का उत्तर देने का निर्णय क्यों लिया?"
            },
            options: [
              "To make fun of him",
              "To preserve the farmer's extraordinary faith in God",
              "Because God ordered him to",
              "To get a reward from government"
            ],
            correct: 1,
            explanation: {
              en: "The postmaster was deeply moved and did not want to shake the writer's profound faith in God.",
              hi: "पोस्टमास्टर लेंचो के ईश्वर पर अटूट विश्वास को टूटने नहीं देना चाहता था।"
            }
          }
        ]
      }
    ]
  },
  {
    id: "soc-c10",
    subject: "social",
    classGrade: "Class 10",
    title: {
      en: "Class 10 Social Science",
      hi: "कक्षा 10 सामाजिक विज्ञान (बोर्ड विशेष)",
      mr: "इयत्ता 10 वी सामाजिक शास्त्र"
    },
    icon: "Compass",
    color: "from-emerald-500 to-teal-700",
    chapters: [
      {
        id: "soc-c10-ch1",
        title: {
          en: "Resources, Development & Federalism",
          hi: "संसाधन एवं विकास तथा संघवाद"
        },
        topicKey: "Geography & Civics",
        sizeKB: 25,
        isDownloaded: false,
        summary: {
          en: "Sustainable resource planning, soil types of India (Alluvial, Black, Red), and Union-State power distribution in Indian Federalism.",
          hi: "सतत पोषणीय विकास, भारत की मृदा के प्रकार और केंद्र-राज्य शक्तियों का संवैधानिक बंटवारा (संघ सूची, राज्य सूची, समवर्ती सूची)।"
        },
        lowDataContent: {
          en: `### 1. Major Soils of India
- **Alluvial Soil (जलोढ़ मिट्टी):** Most fertile soil deposited by Ganga and Indus; ideal for wheat and paddy.
- **Black Soil (काली मिट्टी / रेगुर):** Rich in clay; best for cotton cultivation in Deccan plateau.
- **Red & Yellow Soil:** Formed on crystalline rocks in low rainfall areas.

### 2. Three Legislative Lists in Indian Federalism
1. **Union List (संघ सूची):** Defense, foreign affairs, banking, currency (Only Central Govt makes laws).
2. **State List (राज्य सूची):** Police, agriculture, irrigation, health (State Govts make laws).
3. **Concurrent List (समवर्ती सूची):** Education, forests, marriage (Both Center and State make laws).`,
          hi: `### 1. भारत की प्रमुख मिट्टियाँ
- जलोढ़ मृदा: गंगा-यमुना के मैदानों में पाई जाने वाली सबसे उपजाऊ मिट्टी।
- काली मृदा: कपास की खेती के लिए सर्वोत्तम (रेगुर मिट्टी)।

### 2. शक्तियों का त्रिस्तरीय विभाजन
- संघ सूची: रक्षा, विदेश मामले
- राज्य सूची: पुलिस, कृषि, स्थानीय शासन
- समवर्ती सूची: शिक्षा, वन`
        },
        audioScript: {
          en: "Indian federalism distributes power between the Union government and state governments across three legislative lists.",
          hi: "भारतीय संघवाद में केंद्र और राज्यों के बीच शक्तियों का स्पष्ट विभाजन किया गया है।"
        },
        quiz: [
          {
            id: "q-c10-soc-1",
            question: {
              en: "Under which list of the Indian Constitution does 'Education' fall?",
              hi: "भारतीय संविधान की किस सूची के अंतर्गत 'शिक्षा' का विषय आता है?"
            },
            options: ["Union List (संघ सूची)", "State List (राज्य सूची)", "Concurrent List (समवर्ती सूची)", "Residuary List"],
            correct: 2,
            explanation: {
              en: "Education is in the Concurrent List, allowing both Central and State governments to formulate educational policies.",
              hi: "शिक्षा समवर्ती सूची (Concurrent List) में है, जिस पर केंद्र और राज्य दोनों कानून बना सकते हैं।"
            }
          }
        ]
      }
    ]
  },
  {
    id: "hindi-c10",
    subject: "hindi",
    classGrade: "Class 10",
    title: {
      en: "Class 10 Hindi Literature",
      hi: "कक्षा 10 हिंदी साहित्य (क्षितिज भाग-2)",
      mr: "इयत्ता 10 वी हिंदी साहित्य"
    },
    icon: "BookOpen",
    color: "from-rose-500 to-red-600",
    chapters: [
      {
        id: "hindi-c10-ch1",
        title: {
          en: "Surdas Ke Pad (Poetry by Surdas)",
          hi: "सूरदास के पद (भ्रमरगीत सार)"
        },
        topicKey: "Hindi Poetry",
        sizeKB: 20,
        isDownloaded: false,
        summary: {
          en: "Gopis' witty dialogues with Uddhav in Braj Bhasha expressing selfless love and devotion over dry intellectual yoga.",
          hi: "ब्रजभाषा में गोपियों और उद्धव का संवाद, जहां प्रेम और भक्ति के आगे ज्ञान और योग का अहंकार परास्त होता है।"
        },
        lowDataContent: {
          en: `### 1. Key Pad Stanza
*"ऊधौ, तुम हौ अति बड़भागी।*
*अपरस रहत सनेह तगा तैं, नाहिन मन अनुरागी।..."*

### 2. Literary Essence
Surdas uses gentle irony to show that true devotion and empathy matter more than pride in dry knowledge.`,
          hi: `### 1. पद का भावार्थ
गोपियां उद्धव पर व्यंग्य करती हैं कि वे कृष्ण के पास रहकर भी प्रेम के सागर से अछूते रहे। गोपियों के लिए कृष्ण प्रेम ही सर्वोपरि है।`
        },
        audioScript: {
          en: "Surdas's poetry celebrates the supremacy of pure devotion and heart over intellectual detachment.",
          hi: "सूरदास के पदों में प्रेम और भक्ति की विजय का मार्मिक चित्रण है।"
        },
        quiz: [
          {
            id: "q-c10-hin-1",
            question: {
              en: "In which regional dialect did poet Surdas compose his devotional verses?",
              hi: "महाकवि सूरदास ने अपने पदों की रचना किस भाषा/बोली में की?"
            },
            options: ["अवधी (Awadhi)", "ब्रजभाषा (Braj Bhasha)", "खड़ी बोली", "मैथिली"],
            correct: 1,
            explanation: {
              en: "Surdas composed his masterpiece Sur Sagar in Braj Bhasha.",
              hi: "सूरदास जी ने अपने पदों की रचना ब्रजभाषा में की है।"
            }
          }
        ]
      }
    ]
  },
  {
    id: "comp-c10",
    subject: "computer",
    classGrade: "Class 10",
    title: {
      en: "Class 10 Digital Literacy & Cyber Ethics",
      hi: "कक्षा 10 साइबर नीतिशास्त्र व डिजिटल करियर",
      mr: "इयत्ता 10 वी डिजिटल साक्षरता"
    },
    icon: "Laptop",
    color: "from-indigo-500 to-purple-600",
    chapters: [
      {
        id: "comp-c10-ch1",
        title: {
          en: "Cyber Ethics, Board Exam Portals & Career Readiness",
          hi: "साइबर सुरक्षा, बोर्ड परीक्षा पोर्टल व डिजिटल कौशल"
        },
        topicKey: "Information Technology",
        sizeKB: 23,
        isDownloaded: false,
        summary: {
          en: "Copyright, open source software, navigating government exam portals, two-factor authentication, and digital job opportunities.",
          hi: "कॉपीराइट, ओपन सोर्स, सरकारी बोर्ड परीक्षा पोर्टल का उपयोग, दो-चरणीय प्रमाणीकरण (2FA) और डिजिटल करियर के अवसर।"
        },
        lowDataContent: {
          en: `### 1. Cyber Ethics Principles
- **Plagiarism:** Copying someone else's work without attribution is unethical and illegal.
- **Two-Factor Authentication (2FA):** Combining a password with an SMS OTP creates unbeatable account defense.
- **Digital Footprint:** Everything you post online leaves a permanent record.

### 2. Accessing Government Board Exam & Scholarship Portals
- Always verify official URL ends with **.gov.in** or **.nic.in**.
- Never pay exam fees to unverified personal UPI numbers.`,
          hi: `### 1. साइबर सुरक्षा के सुनहरे नियम
- किसी भी अनजान लिंक पर क्लिक न करें।
- सरकारी छात्रवृत्ति या बोर्ड फॉर्म भरते समय केवल **.gov.in** या **.nic.in** वाली आधिकारिक वेबसाइट का ही उपयोग करें।`
        },
        audioScript: {
          en: "Class 10 students must be digital leaders. Use strong passwords, verify official government portals, and respect cyber safety.",
          hi: "बोर्ड परीक्षा और छात्रवृत्ति के लिए हमेशा आधिकारिक सरकारी वेबसाइटों का ही उपयोग करें।"
        },
        quiz: [
          {
            id: "q-c10-comp-1",
            question: {
              en: "Which domain extension indicates an authentic official Indian Government portal?",
              hi: "कौन सा डोमेन एक्सटेंशन आधिकारिक भारत सरकार के पोर्टल की पहचान कराता है?"
            },
            options: [".com", ".gov.in / .nic.in", ".free-exam.org", ".biz"],
            correct: 1,
            explanation: {
              en: "Official Indian Government websites end with .gov.in or .nic.in.",
              hi: "आधिकारिक सरकारी वेबसाइटों का पता .gov.in या .nic.in पर समाप्त होता है।"
            }
          }
        ]
      }
    ]
  }
,
  // ==========================================
  // CLASS 7 COURSES (Middle School Core)
  // ==========================================
{
    id: "math-c7",
    subject: "math",
    classGrade: "Class 7",
    title: {
      en: "Class 7 Mathematics",
      hi: "कक्षा 7 गणित",
      mr: "इयत्ता 7 वी गणित",
      bn: "সপ্তম শ্রেণী গণিত",
      te: "7వ తరగతి గణితం",
      ta: "7ஆம் வகுப்பு கணிதம்",
      gu: "ધોરણ 7 ગણિત",
      kn: "7 ನೇ ತರಗತಿ ಗಣಿತ",
      pa: "ਜਮਾਤ 7ਵੀਂ ਗਣਿਤ",
      od: "ସପ୍ତମ ଶ୍ରେଣୀ ଗଣିତ"
    },
    icon: "Calculator",
    color: "from-amber-500 to-orange-600",
    chapters: [
      {
        id: "math-c7-ch1",
        title: {
          en: "Fractions & Decimals",
          hi: "भिन्न एवं दशमलव",
          mr: "अपूर्णांक आणि दशांश",
          bn: "ভগ্নাংশ ও দশমিক",
          te: "భిన్నాలు మరియు దశాంశాలు",
          ta: "பின்னங்கள் மற்றும் தசமங்கள்",
          gu: "અપૂર્ણાંક અને દશાંશ",
          kn: "ಭಿನ್ನರಾಶಿಗಳು ಮತ್ತು ದಶಮಾಂಶಗಳು",
          pa: "ਭਿੰਨ ਅਤੇ ਦਸ਼ਮਲਵ",
          od: "ଭଗ୍ନାଂଶ ଏବଂ ଦଶମିକ"
        },
        topicKey: "Fractions",
        sizeKB: 24,
        isDownloaded: true,
        summary: {
          en: "Understanding parts of a whole using everyday examples like dividing roti or land.",
          hi: "रोटी या खेत बांटने जैसे दैनिक उदाहरणों से हिस्से और भिन्न को समझें।",
          mr: "भाकरी किंवा शेत वाटण्याच्या रोजच्या उदाहरणांवरून अपूर्णांक समजून घ्या.",
          bn: "রুটি বা জমি ভাগ করার মতো দৈনন্দিন উদাহরণের মাধ্যমে ভগ্নাংশ বুঝুন।",
          te: "రొట్టె లేదా పొలం పంచడం వంటి రోజువారీ ఉదాహరణలతో భిన్నాలను అర్థం చేసుకోండి.",
          ta: "ரொட்டி அல்லது நிலத்தைப் பிரிப்பது போன்ற அன்றாட உதாரணங்கள் மூலம் பின்னங்களைப் புரிந்து கொள்ளுங்கள்.",
          gu: "રોટલી કે ખેતર વહેંચવાના રોજીંદા ઉદાહરણો દ્વારા અપૂર્ણાંક સમજો.",
          kn: "ರೊಟ್ಟಿ ಅಥವಾ ಜಮೀನು ಹಂಚುವಂತಹ ದೈನಂದಿನ ಉದಾಹರಣೆಗಳೊಂದಿಗೆ ಭಿನ್ನರಾಶಿಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",
          pa: "ਰੋਟੀ ਜਾਂ ਖੇਤ ਵੰਡਣ ਦੀਆਂ ਉਦਾਹਰਨਾਂ ਰਾਹੀਂ ਭਿੰਨਾਂ ਨੂੰ ਸਮਝੋ।",
          od: "ରୁଟି କିମ୍ବା ଜମି ବାଣ୍ଟିବା ଭଳି ଦୈନନ୍ଦିନ ଉଦାହରଣ ମାଧ୍ୟମରେ ଭଗ୍ନାଂଶ ବୁଝନ୍ତୁ।"
        },
        lowDataContent: {
          en: `### 1. What is a Fraction?
A fraction represents a part of a whole. 
If 1 roti is equally divided among 4 children, each child receives **1/4 (one-fourth)** of the roti.

- **Numerator:** The top number (parts we have). In 3/4, numerator is 3.
- **Denominator:** The bottom number (total equal parts). In 3/4, denominator is 4.

### 2. Types of Fractions
1. **Proper Fraction:** Numerator is smaller than denominator (e.g. 2/5, 3/7).
2. **Improper Fraction:** Numerator is larger than or equal to denominator (e.g. 7/4, 5/2).
3. **Mixed Fraction:** Combination of whole number and proper fraction (e.g. 1 3/4).

### 3. Real-life Rural Application
If a farmer divides his 6-acre field: 2 acres for wheat (2/6) and 3 acres for mustard (3/6), the total cultivated field is (2+3)/6 = **5/6**!`,
          hi: `### 1. भिन्न क्या होती है?
भिन्न किसी पूरी वस्तु के एक हिस्से को दर्शाती है।
यदि 1 रोटी को 4 बच्चों में बराबर बांटा जाए, तो प्रत्येक बच्चे को **1/4 (एक चौथाई)** रोटी मिलेगी।

- **अंश (Numerator):** ऊपर की संख्या (हमारे पास कितने हिस्से हैं)। उदाहरण: 3/4 में अंश 3 है।
- **हर (Denominator):** नीचे की संख्या (कुल कितने बराबर हिस्से किए गए)। उदाहरण: 3/4 में हर 4 है।

### 2. भिन्न के प्रकार
1. **उचित भिन्न (Proper):** अंश हर से छोटा होता है (जैसे 2/5, 3/7)।
2. **अनुचित भिन्न (Improper):** अंश हर से बड़ा होता है (जैसे 7/4, 5/2)।
3. **मिश्रित भिन्न (Mixed):** पूर्ण संख्या और उचित भिन्न का मेल (जैसे 1 3/4)।

### 3. ग्रामीण जीवन में प्रयोग
यदि एक किसान अपने खेत के 2/6 हिस्से पर गेहूं और 3/6 हिस्से पर सरसों बोता है, तो कुल बोया गया खेत = (2+3)/6 = **5/6** हिस्सा है!`,
          mr: `### 1. अपूर्णांक म्हणजे काय?
अपूर्णांक म्हणजे संपूर्ण वस्तूचा एक भाग.
जर 1 भाकरी 4 मुलांमध्ये समान वाटली, तर प्रत्येक मुलाला भाकरीचा **1/4 (पाव भाग)** मिळतो.

- **अंश (Numerator):** वरची संख्या (आपल्याकडे किती भाग आहेत). उदाहरण: 3/4 मध्ये अंश 3 आहे.
- **छेद (Denominator):** खालची संख्या (एकूण समान भाग). उदाहरण: 3/4 मध्ये छेद 4 आहे.

### 2. अपूर्णांकांची बेरीज
समान छेद असल्यास फक्त अंशांची बेरीज करा:
- 1/5 + 2/5 = (1 + 2)/5 = **3/5**`
        },
        audioScript: {
          en: "Welcome to Fractions. A fraction represents a part of a whole. For example, dividing one roti into four equal pieces gives one-fourth to each person. The top number is the numerator and the bottom number is the denominator.",
          hi: "भिन्न के पाठ में आपका स्वागत है। भिन्न किसी पूरी वस्तु का एक हिस्सा होती है। जैसे यदि आप एक रोटी के चार बराबर टुकड़े करें, तो प्रत्येक को एक बटा चार हिस्सा मिलता है। ऊपर की संख्या अंश और नीचे की संख्या हर कहलाती है।",
          mr: "अपूर्णांकांच्या पाठात आपले स्वागत आहे. अपूर्णांक म्हणजे संपूर्ण वस्तूचा एक भाग. जसे की एका भाकरीचे चार तुकडे केले तर प्रत्येकाला एक चतुर्थांश भाग मिळतो. वरची संख्या अंश आणि खालची संख्या छेद असते.",
          bn: "ভগ্নাংশের পাঠে আপনাকে স্বাগতম। ভগ্নাংশ হলো কোনো পূর্ণ বস্তুর একটি অংশ। একটি রুটিকে সমান চার ভাগে ভাগ করলে প্রতি ভাগকে এক-চতুর্থাংশ বলে।",
          te: "భిన్నాల పాఠానికి స్వాగతం. ఒక పూర్తి వస్తువులోని భాగాన్ని భిన్నం అంటారు. ఉదాహరణకు ఒక రొట్టెను నాలుగు సమాన భాగాలుగా చేస్తే ప్రతి భాగం నాలుగో వంతు అవుతుంది.",
          ta: "பின்னங்கள் பாடத்திற்கு வரவேற்கிறோம். ஒரு முழுப் பொருளின் ஒரு பகுதியை பின்னம் குறிக்கிறது. ஒரு ரொட்டியை நான்கு சம பாகங்களாகப் பிரித்தால் ஒவ்வொரு பகுதியும் கால் பகுதி ஆகும்.",
          gu: "અપૂર્ણાંકના પાઠમાં આપનું સ્વાગત છે. અપૂર્ણાંક એટલે કોઈપણ પૂર્ણ વસ્તુનો એક ભાગ. એક રોટલીના ચાર સરખા ભાગ કરીએ તો દરેક ભાગને એક ચતુર્થાંશ કહેવાય.",
          kn: "ಭಿನ್ನರಾಶಿಗಳ ಪಾಠಕ್ಕೆ ಸುಸ್ವಾಗತ. ಪೂರ್ಣ ವಸ್ತುವಿನ ಒಂದು ಭಾಗವನ್ನು ಭಿನ್ನರಾಶಿ ಎನ್ನಲಾಗುತ್ತದೆ. ಒಂದು ರೊಟ್ಟಿಯನ್ನು ನಾಲ್ಕು ಸಮಭಾಗ ಮಾಡಿದರೆ ಪ್ರತಿಯೊಂದು ಕಾಲು ಭಾಗವಾಗುತ್ತದೆ.",
          pa: "ਭਿੰਨਾਂ ਦੇ ਪਾਠ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ। ਕਿਸੇ ਪੂਰੀ ਚੀਜ਼ ਦੇ ਇੱਕ ਹਿੱਸੇ ਨੂੰ ਭਿੰਨ ਕਿਹਾ ਜਾਂਦਾ ਹੈ। ਜਿਵੇਂ ਇੱਕ ਰੋਟੀ ਦੇ ਚਾਰ ਬਰਾਬਰ ਟੁਕੜੇ ਕੀਤੇ ਜਾਣ ਤਾਂ ਹਰੇਕ ਚੌਥਾਈ ਹਿੱਸਾ ਹੁੰਦਾ ਹੈ।",
          od: "ଭଗ୍ନାଂଶ ପାଠକୁ ସ୍ୱାଗତ। ଗୋଟିଏ ସମ୍ପୂର୍ଣ୍ଣ ବସ୍ତୁର ଅଂଶକୁ ଭଗ୍ନାଂଶ କୁହାଯାଏ। ଯେପରି ଗୋଟିଏ ରୁଟିକୁ ଚାରି ଭାଗ କଲେ ପ୍ରତ୍ୟେକ ଭାଗ ଏକ ଚତୁର୍ଥାଂଶ ହୁଏ।"
        },
        quiz: [
          {
            id: "q-frac-1",
            question: {
              en: "In the fraction 3/8, what is the numerator?",
              hi: "भिन्न 3/8 में अंश (Numerator) कौन सी संख्या है?",
              mr: "3/8 या अपूर्णांकात अंश कोणता आहे?",
              bn: "৩/৮ ভগ্নাংশে লব (Numerator) কোনটি?",
              te: "3/8 భిన్నంలో లవం (Numerator) ఏది?",
              ta: "3/8 பின்னத்தில் தொகுதி (Numerator) எது?",
              gu: "અપૂર્ણાંક 3/8 માં અંશ કઈ સંખ્યા છે?",
              kn: "3/8 ಭಿನ್ನರಾಶಿಯಲ್ಲಿ ಅಂಶ (Numerator) ಯಾವುದು?",
              pa: "ਭਿੰਨ 3/8 ਵਿੱਚ ਅੰਸ਼ ਕਿਹੜਾ ਹੈ?",
              od: "ଭଗ୍ନାଂଶ ୩/୮ ରେ ଲବ (Numerator) କିଏ?"
            },
            options: ["3", "8", "11", "5"],
            correct: 0,
            explanation: {
              en: "The top number is the numerator. In 3/8, 3 is on top.",
              hi: "ऊपर लिखी संख्या अंश होती है। 3/8 में 3 ऊपर है, अतः 3 अंश है।",
              mr: "वरची संख्या अंश असते. 3/8 मध्ये 3 वर आहे, म्हणून 3 अंश आहे.",
              bn: "উপরের সংখ্যাটি হলো লব। ৩/৮-এ ৩ উপরে আছে।",
              te: "పై సంఖ్య లవం. 3/8 లో 3 పైన ఉంది.",
              ta: "மேலே உள்ள எண் தொகுதி ஆகும். 3/8 இல் 3 மேலே உள்ளது."
            }
          },
          {
            id: "q-frac-2",
            question: {
              en: "Solve: 2/7 + 3/7 = ?",
              hi: "हल कीजिए: 2/7 + 3/7 = ?",
              mr: "सोडवा: 2/7 + 3/7 = ?",
              bn: "সমাধান করুন: ২/৭ + ৩/৭ = ?",
              te: "సాధించండి: 2/7 + 3/7 = ?",
              ta: "தீர்வு காண்க: 2/7 + 3/7 = ?",
              gu: "ઉકેલો: 2/7 + 3/7 = ?",
              kn: "ಬಿಡಿಸಿ: 2/7 + 3/7 = ?",
              pa: "ਹੱਲ ਕਰੋ: 2/7 + 3/7 = ?",
              od: "ସମାଧାନ କରନ୍ତୁ: ୨/୭ + ୩/୭ = ?"
            },
            options: ["5/14", "5/7", "6/7", "1/7"],
            correct: 1,
            explanation: {
              en: "When denominators are identical, simply add numerators: (2 + 3)/7 = 5/7.",
              hi: "जब हर समान हों, तो केवल अंशों को जोड़ते हैं: 2 + 3 = 5, उत्तर 5/7 होगा।"
            }
          }
        ]
      },
      {
        id: "math-c7-ch2",
        title: {
          en: "Percentages & Simple Interest",
          hi: "प्रतिशत एवं साधारण ब्याज",
          mr: "टक्केवारी आणि सरळ व्याज",
          bn: "শতকরা ও সরল সুদ",
          te: "శాతం మరియు సాధారణ వడ్డీ",
          ta: "சதவீதம் மற்றும் தனிவட்டி",
          gu: "ટકાવારી અને સાદુ વ્યાજ",
          kn: "ಶೇಕಡಾವಾರು ಮತ್ತು ಸರಳ ಬಡ್ಡಿ",
          pa: "ਪ੍ਰਤੀਸ਼ਤ ਅਤੇ ਸਧਾਰਨ ਵਿਆਜ",
          od: "ଶତକଡ଼ା ଏବଂ ସରଳ ସୁଧ"
        },
        topicKey: "Percentages",
        sizeKB: 28,
        isDownloaded: false,
        summary: {
          en: "Percentage means 'per hundred'. Learn how village markets, crops, and loans calculate percentages.",
          hi: "प्रतिशत का अर्थ है 'प्रति सैकड़ा'। जाने मंडी के भाव, फसल उपज और ब्याज में प्रतिशत का महत्व।",
          mr: "टक्केवारी म्हणजे 'दर शेकडा'. बाजारभाव, पीक उत्पादन आणि कर्जावरील व्याज समजून घ्या.",
          bn: "শতকরা মানে 'প্রতি একশ'। শস্য উৎপাদন ও ঋণের সুদে এর ব্যবহার জানুন।",
          te: "శాతం అంటే 'ప్రతి వందకు'. మార్కెట్ ధరలు మరియు పంట దిగుబడిలో శాతాన్ని లెక్కించడం నేర్చుకోండి.",
          ta: "சதவீதம் என்றால் 'நூற்றுக்கு' என்று பொருள். சந்தை மற்றும் வட்டி கணக்குகளைப் புரிந்து கொள்ளுங்கள்.",
          gu: "ટકાવારી એટલે 'દર સોએ'. મંડીના ભાવ અને પાક ઉત્પાદનમાં ટકાવારીનું મહત્વ સમજો.",
          kn: "ಶೇಕಡಾವಾರು ಎಂದರೆ 'ಪ್ರತಿ ನೂರಕ್ಕೆ'. ಮಾರುಕಟ್ಟೆ ಮತ್ತು ಬಡ್ಡಿಯಲ್ಲಿ ಇದರ ಬಳಕೆಯನ್ನು ತಿಳಿಯಿರಿ.",
          pa: "ਪ੍ਰਤੀਸ਼ਤ ਦਾ ਅਰਥ ਹੈ 'ਪ੍ਰਤੀ ਸੌ'। ਫ਼ਸਲ ਉਪਜ ਅਤੇ ਮੰਡੀ ਦੇ ਹਿਸਾਬ ਵਿੱਚ ਇਸਦੀ ਵਰਤੋਂ ਸਿੱਖੋ।",
          od: "ଶତକଡ଼ାର ଅର୍ଥ 'ପ୍ରତି ଶହେରେ'। ଫସଲ ଉତ୍ପାଦନ ଏବଂ ସୁଧ ହିସାବରେ ଏହାର ବ୍ୟବହାର ଜାଣନ୍ତୁ।"
        },
        lowDataContent: {
          en: `### 1. Meaning of Percentage
Percentage means **out of 100**. Symbol: **%**
- 25% means 25 out of 100 (or 1/4).
- 50% means half of total.

### 2. Rural Context Example
If a bag of seeds costs ₹500 and the Krishi Kendra offers a **10% discount**:
- Discount = (10/100) × 500 = **₹50**
- Final price = ₹450`,
          hi: `### 1. प्रतिशत का अर्थ
प्रतिशत का मतलब होता है **प्रति 100 में से**। चिन्ह: **%**
- 25% का अर्थ है 100 में से 25 (या 1/4)।
- 50% का अर्थ है कुल का आधा।

### 2. ग्रामीण उदाहरण
यदि बीज की एक बोरी ₹500 की है और कृषि केंद्र पर **10% की छूट** मिल रही है:
- छूट की राशि = (10/100) × 500 = **₹50**
- किसान को देने होंगे = **₹450**`
        },
        audioScript: {
          en: "Percentage means out of 100. Fifty percent means half. To find ten percent of five hundred rupees, multiply ten by five hundred and divide by one hundred, which gives fifty rupees.",
          hi: "प्रतिशत का अर्थ है प्रति 100 में से। पचास प्रतिशत का मतलब आधा होता है। पांच सौ रुपये का दस प्रतिशत निकालने के लिए दस को पांच सौ से गुणा कर सौ से भाग दें, जो पचास रुपये बनता है।",
          mr: "टक्केवारी म्हणजे दर शंभरामागे. पन्नास टक्के म्हणजे निम्मे. पाचशे रुपयांचे दहा टक्के म्हणजे पन्नास रुपये होतात.",
          bn: "শতকরা মানে প্রতি একশতে কত। পাঁচশত টাকার দশ শতাংশ হলো পঞ্চাশ টাকা।",
          te: "శాతం అంటే ప్రతి వందకు ఎంత అని అర్థం. ఐదు వందల రూపాయలలో పది శాతం అంటే యాభై రూపాయలు అవుతుంది.",
          ta: "சதவீதம் என்பது நூற்றுக்கு எவ்வளவு என்பதைக் குறிக்கும். ஐந்நூறு ரூபாயில் பத்து சதவீதம் என்பது ஐம்பது ரூபாய் ஆகும்."
        },
        quiz: [
          {
            id: "q-perc-1",
            question: {
              en: "What is 20% of 200?",
              hi: "200 का 20% कितना होगा?",
              mr: "200 चे 20% किती?",
              bn: "২০০ এর ২০% কত?",
              te: "200 లో 20% ఎంత?",
              ta: "200 இல் 20% எவ்வளவு?",
              gu: "200 ના 20% કેટલા થાય?",
              kn: "200 ರ 20% ಎಷ್ಟು?",
              pa: "200 ਦਾ 20% ਕਿੰਨਾ ਹੋਵੇਗਾ?",
              od: "୨୦୦ ର ୨୦% କେତେ?"
            },
            options: ["20", "40", "50", "10"],
            correct: 1,
            explanation: {
              en: "(20 / 100) * 200 = 40.",
              hi: "(20 / 100) × 200 = 40."
            }
          }
        ]
      }
    ]
  },
  {
    id: "sci-c7",
    subject: "science",
    classGrade: "Class 7",
    title: {
      en: "Class 7 Science",
      hi: "कक्षा 7 विज्ञान",
      mr: "इयत्ता 7 वी विज्ञान",
      bn: "সপ্তম শ্রেণী বিজ্ঞান",
      te: "7వ తరగతి సైన్స్",
      ta: "7ஆம் வகுப்பு அறிவியல்",
      gu: "ધોરણ 7 વિજ્ઞાન",
      kn: "7 ನೇ ತರಗತಿ ವಿಜ್ಞಾನ",
      pa: "ਜਮਾਤ 7ਵੀਂ ਵਿਗਿਆਨ",
      od: "ସପ୍ତମ ଶ୍ରେଣୀ ବିଜ୍ଞାନ"
    },
    icon: "FlaskConical",
    color: "from-emerald-500 to-teal-700",
    chapters: [
      {
        id: "sci-c7-ch1",
        title: {
          en: "Nutrition in Plants (Photosynthesis)",
          hi: "पादपों में पोषण (प्रकाश संश्लेषण)",
          mr: "वनસ્પતીंमधील पोषण (प्रकाशसंश्लेषण)",
          bn: "উদ্ভিদের পুষ্টি (সালোকসংশ্লেষ)",
          te: "మొక్కలలో పోషణ (కిరణజన్య సంయోగక్రియ)",
          ta: "தாவரங்களில் ஊட்டச்சத்து (ஒளிச்சேர்க்கை)",
          gu: "વનસ્પતિમાં પોષણ (પ્રકાશસંશ્લેષણ)",
          kn: "ಸಸ್ಯಗಳಲ್ಲಿ ಪೋಷಣೆ (ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ)",
          pa: "ਪੌਦਿਆਂ ਵਿੱਚ ਪੋਸ਼ਣ (ਪ੍ਰਕਾਸ਼ ਸੰਸ਼ਲੇਸ਼ਣ)",
          od: "ଉଦ୍ଭିଦରେ ପୋଷଣ (ଆଲୋକ ସଂଶ୍ଳେଷଣ)"
        },
        topicKey: "Photosynthesis",
        sizeKB: 26,
        isDownloaded: true,
        summary: {
          en: "How green leaves prepare food using sunlight, water, and air like a solar kitchen.",
          hi: "हरी पत्तियां धूप, पानी और हवा से भोजन कैसे बनाती हैं - प्रकृति की रसोई।",
          mr: "हिरवी पाने सूर्यप्रकाश, पाणी आणि हवेचा वापर करून अन्न कसे तयार करतात ते शिका.",
          bn: "সবুজ পাতা কীভাবে সূর্যালোক, জল এবং বাতাসের সাহায্যে খাদ্য তৈরি করে তা জানুন।",
          te: "ఆకుపచ్చని ఆకులు సూర్యరశ్మి, నీరు మరియు గాలితో ఆహారాన్ని ఎలా తయారుచేస్తాయో తెలుసుకోండి.",
          ta: "சூரிய ஒளி, நீர் மற்றும் காற்றைப் பயன்படுத்தி பச்சை இலைகள் எவ்வாறு உணவைத் தயாரிக்கின்றன என்று அறிக.",
          gu: "લીલા પાંદડા સૂર્યપ્રકાશ, પાણી અને હવા દ્વારા પોતાનો ખોરાક કેવી રીતે બનાવે છે તે સમજો.",
          kn: "ಹಸಿರು ಎಲೆಗಳು ಸೂರ್ಯನ ಬೆಳಕು, ನೀರು ಮತ್ತು ಗಾಳಿಯಿಂದ ಹೇಗೆ ಆಹಾರ ತಯಾರಿಸುತ್ತವೆ ಎಂದು ತಿಳಿಯಿರಿ.",
          pa: "ਹਰੇ ਪੱਤੇ ਧੁੱਪ, ਪਾਣੀ ਅਤੇ ਹਵਾ ਤੋਂ ਭੋਜਨ ਕਿਵੇਂ ਤਿਆਰ ਕਰਦੇ ਹਨ।",
          od: "ସବୁଜ ପତ୍ର ସୂର୍ଯ୍ୟାଲୋକ, ଜଳ ଓ ବାୟୁରୁ କିପରି ଖାଦ୍ୟ ପ୍ରସ୍ତୁତ କରେ ତାହା ଜାଣନ୍ତୁ।"
        },
        lowDataContent: {
          en: `### 1. What is Photosynthesis?
Green plants make their own food using:
1. **Chlorophyll:** Green pigment in leaves.
2. **Sunlight:** Natural solar energy.
3. **Carbon Dioxide (CO2):** Gas absorbed through leaf pores (Stomata).
4. **Water & Minerals:** Absorbed from soil by roots.

### 2. Equation of Food Making
CO2 + Water --[Sunlight + Chlorophyll]--> **Glucose (Food) + Oxygen**`,
          hi: `### 1. प्रकाश संश्लेषण क्या है?
हरे पौधे अपना भोजन स्वयं बनाते हैं:
1. **क्लोरोफिल (पर्णहरित):** पत्तियों में मौजूद हरा रंग जो धूप को सोखता है।
2. **सूर्य का प्रकाश:** प्राकृतिक ऊर्जा का स्रोत।
3. **कार्बन डाइऑक्साइड:** पत्तियों के छिद्रों (रंध्र / Stomata) द्वारा ली जाती है।
4. **जल और खनिज:** जड़ों द्वारा मिट्टी से सोखे जाते हैं।

### 2. रासायनिक प्रक्रिया
CO2 + जल --[धूप + क्लोरोफिल]--> **ग्लूकोज (भोजन) + ऑक्सीजन**`
        },
        audioScript: {
          en: "Plants make their food using sunlight, water, carbon dioxide, and chlorophyll. This process is called photosynthesis. In return, plants release fresh oxygen for us to breathe.",
          hi: "पौधे सूर्य के प्रकाश, पानी, कार्बन डाइऑक्साइड और क्लोरोफिल की मदद से अपना भोजन बनाते हैं। इस प्रक्रिया को प्रकाश संश्लेषण कहते हैं और बदले में वे हमें सांस लेने के लिए ऑक्सीजन देते हैं।",
          mr: "वनस्पती सूर्यप्रकाश, पाणी, कार्बन डायऑक्साइड आणि हरितद्रव्याच्या मदतीने अन्न तयार करतात. या प्रक्रियेला प्रकाशसंश्लेषण म्हणतात.",
          bn: "উদ্ভিদ সূর্যালোক, জল, কার্বন ডাই অক্সাইড এবং ক্লোরোফিলের সাহায্যে খাদ্য তৈরি করে। একে সালোকসংশ্লেষ বলে।",
          te: "మొక్కలు సూర్యరశ్మి, నీరు, కార్బన్ డయాక్సైడ్ మరియు పత్రహరితం సహాయంతో ఆహారాన్ని తయారు చేసుకుంటాయి. దీనిని కిరణజన్య సంయోగక్రియ అంటారు.",
          ta: "தாவரங்கள் சூரிய ஒளி, நீர், கார்பன் டை ஆக்சைடு மற்றும் பச்சையம் ஆகியவற்றைப் பயன்படுத்தி உணவு தயாரிக்கின்றன. இது ஒளிச்சேர்க்கை எனப்படும்."
        },
        quiz: [
          {
            id: "q-sci-1",
            question: {
              en: "Which green pigment in leaves captures sunlight?",
              hi: "पत्तियों में कौन सा हरा वर्णक सूर्य के प्रकाश को अवशोषित करता है?",
              mr: "पानांमधील कोणते हरितद्रव्य सूर्यप्रकाश शोषून घेते?",
              bn: "পাতায় কোন সবুজ রঞ্জক সূর্যালোক শোষণ করে?",
              te: "ఆకులలో సూర్యరశ్మిని గ్రహించే ఆకుపచ్చ వర్ణద్రవ్యం ఏది?",
              ta: "இலைகளில் சூரிய ஒளியை ஈர்க்கும் பச்சை நிறமி எது?",
              gu: "પાંદડામાં કયું લીલું દ્રવ્ય સૂર્યપ્રકાશ શોષે છે?",
              kn: "ಎಲೆಗಳಲ್ಲಿ ಸೂರ್ಯನ ಬೆಳಕನ್ನು ಹೀರಿಕೊಳ್ಳುವ ಹಸಿರು ವರ್ಣದ್ರವ್ಯ ಯಾವುದು?",
              pa: "ਪੱਤਿਆਂ ਵਿੱਚ ਕਿਹੜਾ ਹਰਾ ਤੱਤ ਧੁੱਪ ਨੂੰ ਸੋਖਦਾ ਹੈ?",
              od: "ପତ୍ରରେ ଥିବା କେଉଁ ସବୁଜ କଣିକା ସୂର୍ଯ୍ୟାଲୋକ ଶୋଷଣ କରେ?"
            },
            options: ["Stomata", "Chlorophyll", "Glucose", "Hemoglobin"],
            correct: 1,
            explanation: {
              en: "Chlorophyll is the green pigment that traps sunlight.",
              hi: "क्लोरोफिल पत्तियों में पाया जाने वाला हरा रंगद्रव्य है जो धूप सोखता है।"
            }
          }
        ]
      }
    ]
  },
  {
    id: "eng-c7",
    subject: "english",
    classGrade: "Class 7",
    title: {
      en: "Class 7 English Communication",
      hi: "कक्षा 7 अंग्रेजी संचार व व्याकरण",
      mr: "इयत्ता 7 वी इंग्रजी संवाद",
      bn: "সপ্তম শ্রেণী ইংরেজি যোগাযোগ",
      te: "7వ తరగతి ఆంగ్ల సంభాషణ",
      ta: "7ஆம் வகுப்பு ஆங்கில உரையாடல்",
      gu: "ધોરણ 7 અંગ્રેજી સંવાદ",
      kn: "7 ನೇ ತರಗತಿ ಇಂಗ್ಲಿಷ್ ಸಂವಹನ",
      pa: "ਜਮਾਤ 7ਵੀਂ ਅੰਗਰੇਜ਼ੀ ਸੰਚਾਰ",
      od: "ସପ୍ତମ ଶ୍ରେଣୀ ଇଂରାଜୀ ଯୋଗାଯୋଗ"
    },
    icon: "BookOpen",
    color: "from-sky-500 to-blue-600",
    chapters: [
      {
        id: "eng-c7-ch1",
        title: {
          en: "Everyday English & Self-Introduction",
          hi: "दैनिक बोलचाल व अपना परिचय",
          mr: "दैनंदिन संवाद आणि स्वतःची ओळख",
          bn: "দৈনন্দিন ইংরেজি ও আত্মপরিচয়",
          te: "రోజువారీ ఇంగ్లీష్ & స్వీయ పరిచయం",
          ta: "அன்றாட ஆங்கிலம் & சுய அறிமுகம்",
          gu: "રોજીંદુ અંગ્રેજી અને સ્વ-પરિચય",
          kn: "ದೈನಂದಿನ ಇಂಗ್ಲಿಷ್ ಮತ್ತು ಸ್ವಯಂ ಪರಿಚಯ",
          pa: "ਰੋਜ਼ਾਨਾ ਅੰਗਰੇਜ਼ੀ ਅਤੇ ਆਪਣੀ ਜਾਣ-ਪਛਾਣ",
          od: "ଦୈନନ୍ଦିନ ଇଂରାଜୀ ଏବଂ ଆତ୍ମ ପରିଚୟ"
        },
        topicKey: "English Grammar",
        sizeKB: 18,
        isDownloaded: false,
        summary: {
          en: "Learn to introduce yourself, greet teachers, and ask simple questions politely.",
          hi: "अंग्रेजी में आत्मविश्वास से अपना परिचय देना, अभिवादन करना और सरल सवाल पूछना सीखें।",
          mr: "आत्मविश्वासाने इंग्रजीत स्वतःची ओळख करून देणे आणि साधे प्रश्न विचारणे शिका.",
          bn: "ইংরেজি ভাষায় নিজের পরিচয় দেওয়া ও অভিবাদন জানানো শিখুন।",
          te: "ఇంగ్లీషులో ఆత్మవిశ్వాసంతో మిమ్మల్ని మీరు పరిచయం చేసుకోవడం నేర్చుకోండి.",
          ta: "ஆங்கிலத்தில் உங்களை நம்பிக்கையுடன் அறிமுகப்படுத்த கற்றுக்கொள்ளுங்கள்.",
          gu: "અંગ્રેજીમાં આત્મવિશ્વાસથી પોતાનો પરિચય આપતા શીખો.",
          kn: "ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ನಿಮ್ಮನ್ನು ಪರಿಚಯಿಸಿಕೊಳ್ಳುವುದನ್ನು ಕಲಿಯಿರಿ.",
          pa: "ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਆਪਣੀ ਜਾਣ-ਪਛਾਣ ਕਰਵਾਉਣਾ ਸਿੱਖੋ।",
          od: "ଇଂରାଜୀରେ ନିଜର ପରିଚୟ ଦେବା ଶିଖନ୍ତୁ।"
        },
        lowDataContent: {
          en: `### 1. Greetings in English
- **Good Morning:** 6:00 AM to 12:00 PM (Used with teachers and elders)
- **Good Afternoon:** 12:00 PM to 5:00 PM
- **Good Evening:** 5:00 PM onwards

### 2. How to Introduce Yourself
1. "Hello, my name is **Rohan**."
2. "I study in **Class 7** at Model School."
3. "My favourite subject is **Mathematics**."
4. "Nice to meet you!"

### 3. Polite Words
Always use:
- **Please:** when requesting something ("Please lend me your pencil.")
- **Thank you:** when receiving help ("Thank you, teacher!")
- **Excuse me:** when seeking attention politely.`,
          hi: `### 1. अंग्रेजी में अभिवादन (Greetings)
- **Good Morning:** सुबह 6 से दोपहर 12 बजे तक (शिक्षकों व बड़ों के लिए)
- **Good Afternoon:** दोपहर 12 से शाम 5 बजे तक
- **Good Evening:** शाम 5 बजे के बाद

### 2. अपना परिचय कैसे दें (Self-Introduction)
1. "Hello, my name is **रोहन**।" (नमस्ते, मेरा नाम रोहन है।)
2. "I study in **Class 7**।" (मैं कक्षा 7 में पढ़ता हूँ।)
3. "My favourite subject is **Science**।" (मेरा प्रिय विषय विज्ञान है।)
4. "Nice to meet you!" (आपसे मिलकर खुशी हुई!)

### 3. विनम्र शब्द (Golden Polite Words)
- **Please:** किसी चीज़ के अनुरोध के लिए ("कृपया...")
- **Thank you:** सहायता मिलने पर ("धन्यवाद!")
- **Sorry:** गलती होने पर क्षमा मांगने के लिए।`
        },
        audioScript: {
          en: "Welcome to English Communication. Today we learn how to introduce ourselves. You can say: Hello, my name is Rohan, and I study in Class 7. Always use polite words like Please and Thank You.",
          hi: "अंग्रेजी संवाद पाठ में आपका स्वागत है। आज हम अपना परिचय देना सीखेंगे। आप कह सकते हैं: Hello, my name is Rohan. हमेशा Please और Thank You जैसे विनम्र शब्दों का प्रयोग करें।"
        },
        quiz: [
          {
            id: "q-eng-1",
            question: {
              en: "What should you say to a teacher at 9:00 in the morning?",
              hi: "सुबह 9 बजे शिक्षक को क्या कहना चाहिए?",
              mr: "सकाळी 9 वाजता शिक्षकांना काय म्हणाल?",
              bn: "সকাল ৯টায় শিক্ষককে কী বলা উচিত?",
              te: "ఉదయం 9 గంటలకు ఉపాధ్యాయుడికి ఏమి చెప్పాలి?",
              ta: "காலை 9 மணிக்கு ஆசிரியரிடம் என்ன சொல்ல வேண்டும்?",
              gu: "સવારે 9 વાગ્યે શિક્ષકને શું કહેવું જોઈએ?",
              kn: "ಬೆಳಿಗ್ಗೆ 9 ಗಂಟೆಗೆ ಶಿಕ್ಷಕರಿಗೆ ಏನು ಹೇಳಬೇಕು?",
              pa: "ਸਵੇਰੇ 9 ਵਜੇ ਅਧਿਆਪਕ ਨੂੰ ਕੀ ਕਹਿਣਾ ਚਾਹੀਦਾ ਹੈ?",
              od: "ସକାଳ ୯ଟାରେ ଶିକ୍ଷକଙ୍କୁ କ’ଣ କହିବା ଉଚିତ?"
            },
            options: ["Good Night", "Good Morning", "Good Evening", "Goodbye"],
            correct: 1,
            explanation: {
              en: "Between 6 AM and 12 PM, we greet with Good Morning.",
              hi: "सुबह 6 से दोपहर 12 बजे तक Good Morning कहा जाता है।"
            }
          }
        ]
      }
    ]
  },
  {
    id: "soc-c7",
    subject: "social",
    classGrade: "Class 7",
    title: {
      en: "Class 7 Social Science & Civics",
      hi: "कक्षा 7 सामाजिक विज्ञान व नागरिक शास्त्र",
      mr: "इयत्ता 7 वी सामाजिक शास्त्र आणि नागरिकशास्त्र",
      bn: "সপ্তম শ্রেণী সমাজবিজ্ঞান ও পৌরবিজ্ঞান",
      te: "7వ తరగతి సాంఘిక శాస్త్రం",
      ta: "7ஆம் வகுப்பு சமூக அறிவியல்",
      gu: "ધોરણ 7 સામાજિક વિજ્ઞાન",
      kn: "7 ನೇ ತರಗತಿ ಸಮಾಜ ವಿಜ್ಞಾನ",
      pa: "ਜਮਾਤ 7ਵੀਂ ਸਮਾਜਿਕ ਵਿਗਿਆਨ",
      od: "ସପ୍ତମ ଶ୍ରେଣୀ ସାମାଜିକ ବିଜ୍ଞାନ"
    },
    icon: "Compass",
    color: "from-emerald-500 to-teal-700",
    chapters: [
      {
        id: "soc-c7-ch1",
        title: {
          en: "Gram Panchayat & Village Governance",
          hi: "ग्राम पंचायत एवं स्थानीय ग्रामीण शासन",
          mr: "ग्रामपंचायत आणि स्थानिक ग्रामीण शासन",
          bn: "গ্রাম পঞ্চায়েত ও স্থানীয় গ্রামীণ শাসন",
          te: "గ్రామ పంచాయతీ & స్థానిక పాలన",
          ta: "கிராம பஞ்சாயத்து & உள்ளாட்சி நிர்வாகம்",
          gu: "ગ્રામ પંચાયત અને સ્થાનિક શાસન",
          kn: "ಗ್ರಾಮ ಪಂಚಾಯತ್ ಮತ್ತು ಸ್ಥಳೀಯ ಆಡಳಿತ",
          pa: "ਗ੍ਰਾਮ ਪੰਚਾਇਤ ਅਤੇ ਪੇਂਡੂ ਪ੍ਰਸ਼ਾਸਨ",
          od: "ଗ୍ରାମ ପଞ୍ଚାୟତ ଏବଂ ଗ୍ରାମୀଣ ପ୍ରଶାସନ"
        },
        topicKey: "Civics",
        sizeKB: 21,
        isDownloaded: false,
        summary: {
          en: "Learn how the Gram Sabha meets, how the Sarpanch/Pradhan is elected, and how village funds are used for schools and handpumps.",
          hi: "जानें कि ग्राम सभा की बैठक कैसे होती है, प्रधान का चुनाव और गांव में स्कूल-नल-सड़क का विकास कैसे होता है।",
          mr: "ग्रामसभेची बैठक कशी होते आणि सरपंचांची निवड कशी होते ते जाणून घ्या.",
          bn: "গ্রামসভা কীভাবে কাজ করে এবং প্রধান কীভাবে নির্বাচিত হয় তা জানুন।",
          te: "గ్రామసభ ఎలా పనిచేస్తుందో మరియు సర్పంచ్ ఎలా ఎన్నికవుతారో తెలుసుకోండి.",
          ta: "கிராம சபை எவ்வாறு செயல்படுகிறது என்பதை அறியுங்கள்.",
          gu: "ગ્રામ પંચાયત અને સરપંચની કામગીરી સમજો.",
          kn: "ಗ್ರಾಮ ಸಭೆ ಮತ್ತು ಪಂಚಾಯತ್ ಕಾರ್ಯವೈಖರಿಯನ್ನು ತಿಳಿಯಿರಿ.",
          pa: "ਗ੍ਰਾਮ ਪੰਚਾਇਤ ਦੇ ਕੰਮਕਾਜ ਬਾਰੇ ਜਾਣੋ।",
          od: "ଗ୍ରାମ ପଞ୍ଚାୟତର କାର୍ଯ୍ୟାବଳୀ ବୁଝନ୍ତୁ।"
        },
        lowDataContent: {
          en: `### 1. What is a Gram Sabha?
The **Gram Sabha** consists of all adult villagers who are 18 years or older and registered to vote in the village.
- The Gram Sabha reviews the work of the Gram Panchayat.
- It prevents the Panchayat from misusing public funds.

### 2. The 3-Tier Panchayati Raj System
1. **Gram Panchayat (Village Level):** Headed by the Sarpanch / Gram Pradhan.
2. **Panchayat Samiti / Block Level:** Coordinates several village panchayats.
3. **Zila Parishad (District Level):** Coordinates development plans for the entire district.

### 3. Key Responsibilities
- Construction and maintenance of water sources, village roads, and school buildings.
- Executing rural development schemes (MNREGA, scholarship distribution).`,
          hi: `### 1. ग्राम सभा क्या है?
**ग्राम सभा** गांव के उन सभी वयस्क ग्रामीणों की सभा है जिनकी आयु 18 वर्ष या उससे अधिक है और जिनका नाम मतदाता सूची में दर्ज है।
- ग्राम सभा ग्राम पंचायत के कार्यों की निगरानी करती है।
- यह विकास योजनाओं और सार्वजनिक धन के सदुपयोग को सुनिश्चित करती है।

### 2. पंचायती राज के तीन स्तर (3-Tiers)
1. **ग्राम पंचायत (ग्राम स्तर):** मुखिया/प्रधान व वार्ड सदस्यों द्वारा संचालित।
2. **क्षेत्र पंचायत/ब्लॉक (प्रखंड स्तर):** कई ग्राम पंचायतों का समूह।
3. **जिला परिषद (जिला स्तर):** पूरे जिले के विकास कार्यों की योजना बनाना।

### 3. ग्राम पंचायत के प्रमुख कार्य
- गांव की गलियों, खड़ंजों, नालियों और हैंडपंपों की मरम्मत।
- प्राथमिक विद्यालय, आंगनवाड़ी और स्वास्थ्य सुविधाओं की देखरेख।`
        },
        audioScript: {
          en: "Welcome to Social Science. Today we explore the Gram Panchayat, our village local government. The Gram Sabha includes all villagers aged 18 and above. They elect the Gram Pradhan to maintain village roads, water pumps, and local schools.",
          hi: "सामाजिक विज्ञान में आपका स्वागत है। आज हम ग्राम पंचायत और स्थानीय शासन के बारे में जानेंगे। 18 वर्ष से अधिक उम्र के सभी ग्रामीण ग्राम सभा के सदस्य होते हैं जो प्रधान का चुनाव करते हैं।"
        },
        quiz: [
          {
            id: "q-soc-1",
            question: {
              en: "What is the minimum age to be a voting member of the Gram Sabha?",
              hi: "ग्राम सभा का मतदाता सदस्य बनने के लिए न्यूनतम आयु क्या है?",
              mr: "ग्रामसभेचे सदस्य होण्यासाठी किमान वय किती असावे?",
              bn: "গ্রামসভার সদস্য হওয়ার জন্য ন্যূনতম বয়স কত?",
              te: "గ్రామసభలో సభ్యుడిగా ఉండటానికి కనీస వయస్సు ఎంత?",
              ta: "கிராம சபை உறுப்பினராக குறைந்தபட்ச வயது என்ன?",
              gu: "ગ્રામસભાના સભ્ય બનવા માટે લઘુત્તમ ઉંમર કેટલી છે?",
              kn: "ಗ್ರಾಮ ಸಭೆಯ ಸದಸ್ಯರಾಗಲು ಕನಿಷ್ಠ ವಯಸ್ಸು ಎಷ್ಟು?",
              pa: "ਗ੍ਰਾਮ ਸਭਾ ਦਾ ਮੈਂਬਰ ਬਣਨ ਲਈ ਘੱਟੋ-ਘੱਟ ਉਮਰ ਕਿੰਨੀ ਹੈ?",
              od: "ଗ୍ରାମସଭାର ସଦସ୍ୟ ହେବା ପାଇଁ ସର୍ବନିମ୍ନ ବୟସ କେତେ?"
            },
            options: ["16 Years", "18 Years", "21 Years", "25 Years"],
            correct: 1,
            explanation: {
              en: "Every Indian citizen aged 18 or above with voting rights in the village is a Gram Sabha member.",
              hi: "18 वर्ष या उससे अधिक आयु के पंजीकृत मतदाता ग्राम सभा के सदस्य होते हैं।"
            }
          }
        ]
      }
    ]
  },
  {
    id: "hindi-c7",
    subject: "hindi",
    classGrade: "Class 7",
    title: {
      en: "Class 7 Hindi Literature (Vasant)",
      hi: "कक्षा 7 हिंदी साहित्य (वसंत भाग-2)",
      mr: "इयत्ता 7 वी हिंदी साहित्य",
      bn: "সপ্তম শ্রেণী হিন্দি সাহিত্য",
      te: "7వ తరగతి హిందీ సాహిత్యం",
      ta: "7ஆம் வகுப்பு இந்தி இலக்கியம்",
      gu: "ધોરણ 7 હિન્દી સાહિત્ય",
      kn: "7 ನೇ ತರಗತಿ ಹಿಂದಿ ಸಾಹಿತ್ಯ",
      pa: "ਜਮਾਤ 7ਵੀਂ ਹਿੰਦੀ ਸਾਹਿਤ",
      od: "ସପ୍ତମ ଶ୍ରେଣୀ ହିନ୍ଦୀ ସାହିତ୍ୟ"
    },
    icon: "BookOpen",
    color: "from-rose-500 to-red-600",
    chapters: [
      {
        id: "hindi-c7-ch1",
        title: {
          en: "Hum Panchhi Unmukt Gagan Ke (Poem)",
          hi: "हम पंछी उन्मुक्त गगन के (कविता)",
          mr: "आम्ही मुक्त आकाशातील पक्षी (कविता)",
          bn: "আমরা মুক্ত আকাশের পাখি (কবিতা)",
          te: "మేము స్వేచ్ఛా పక్షులం (కవిత)",
          ta: "நாங்கள் சுதந்திரப் பறவைகள் (கவிதை)",
          gu: "અમે મુક્ત આકાશના પંખી (કાવ્ય)",
          kn: "ನಾವು ಮುಕ್ತ ಆಕಾಶದ ಹಕ್ಕಿಗಳು (ಕವಿತೆ)",
          pa: "ਅਸੀਂ ਮੁਕਤ ਅਸਮਾਨ ਦੇ ਪੰਛੀ (ਕਵਿਤਾ)",
          od: "ଆମେ ମୁକ୍ତ ଆକାଶର ପକ୍ଷୀ (କବିତା)"
        },
        topicKey: "Hindi Poetry",
        sizeKB: 19,
        isDownloaded: false,
        summary: {
          en: "Dr. Shivmangal Singh 'Suman's poetic masterpiece celebrating the joy of freedom over gold cages.",
          hi: "डॉ. शिवमंगल सिंह 'सुमन' द्वारा रचित प्रसिद्ध कविता जो सोने के पिंजरे से बेहतर आज़ादी की उड़ान को बताती है।",
          mr: "स्वातंत्र्याचे मोल समजावणारी प्रसिद्ध कविता.",
          bn: "স্বাধীনতার আনন্দ প্রকাশ করে ড. শিবমঙ্গল সিংহের বিখ্যাত কবিতা।",
          te: "స్వేచ్ఛ యొక్క ప్రాముఖ్యతను వివరించే కవిత.",
          ta: "சுதந்திரத்தின் பெருமையை விளக்கும் கவிதை.",
          gu: "સ્વાતંત્ર્યનું મહત્વ સમજાવતી સુંદર કવિતા.",
          kn: "ಸ್ವಾತಂತ್ರ್ಯದ ಮಹತ್ವವನ್ನು ಸಾರುವ ಕವನ.",
          pa: "ਆਜ਼ਾਦੀ ਦੀ ਮਹੱਤਤਾ ਦਰਸਾਉਂਦੀ ਪ੍ਰਸਿੱਧ ਕਵਿਤਾ।",
          od: "ସ୍ୱାଧୀନତାର ମହତ୍ତ୍ୱ ବର୍ଣ୍ଣନା କରୁଥିବା କବିତା।"
        },
        lowDataContent: {
          en: `### 1. Poem Theme: Freedom & Nature
The poet speaks in the voice of caged birds who declare that they cannot sing in captivity, even if kept in cages of gold.

### 2. Key Stanzas
*"हम पंछी उन्मुक्त गगन के, पिंजरबद्ध न गा पाएँगे।*
*कनक-तीलियों से टकराकर, पुलकित पंख टूट जाएँगे।..."*

### 3. Word Meanings (शब्दार्थ)
- **उन्मुक्त (Unmukt):** Open / Free (खुला / आज़ाद)
- **कनक (Kanak):** Gold (सोना)
- **कटुक निंबौरी (Katuk Nimbouri):** Bitter neem fruit (नीम का कड़वा फल)
- **नीड़ (Need):** Nest (घोंसला)`,
          hi: `### 1. कविता का मूल भाव
इस कविता में कवि डॉ. शिवमंगल सिंह 'सुमन' ने पक्षियों के माध्यम से आज़ादी के महत्व को दर्शाया है। पक्षी कहते हैं कि सोने के पिंजरे में बंद रहकर वे गा नहीं पाएंगे।

### 2. प्रमुख पंक्तियाँ
*"हम पंछी उन्मुक्त गगन के,*
*पिंजरबद्ध न गा पाएँगे।*
*कनक-तीलियों से टकराकर,*
*पुलकित पंख टूट जाएँगे।..."*

### 3. कठिन शब्दार्थ
- **उन्मुक्त:** खुला, बंधनमुक्त।
- **कनक:** सोना (Gold)।
- **कटुक निंबौरी:** नीम का कड़वा फल।
- **नीड़:** घोंसला (आश्रय)।`
        },
        audioScript: {
          en: "Welcome to Hindi Literature. Today we recite the poem 'Hum Panchhi Unmukt Gagan Ke' by Dr. Shivmangal Singh Suman. The poem teaches us that freedom is precious for every living creature, even more valuable than gold bowls.",
          hi: "हिंदी साहित्य में आपका स्वागत है। आज हम डॉ. शिवमंगल सिंह 'सुमन' की कविता 'हम पंछी उन्मुक्त गगन के' सुनेंगे। यह कविता आज़ादी और स्वाभिमान का संदेश देती है।"
        },
        quiz: [
          {
            id: "q-hin-1",
            question: {
              en: "What does the word 'कनक' (Kanak) mean in the poem?",
              hi: "कविता में 'कनक' शब्द का क्या अर्थ है?",
              mr: "कवितेत 'कनक' शब्दाचा अर्थ काय आहे?",
              bn: "কবিতায় 'কনক' শব্দের অর্থ কী?",
              te: "కవితలో 'కనక్' పదానికి అర్థం ఏమిటి?",
              ta: "கவிதையில் 'கனக்' என்ற சொல்லின் பொருள் என்ன?",
              gu: "કવિતામાં 'કનક' શબ્દનો અર્થ શું છે?",
              kn: "ಕವಿತೆಯಲ್ಲಿ 'ಕನಕ' ಪದದ ಅರ್ಥವೇನು?",
              pa: "ਕਵਿਤਾ ਵਿੱਚ 'ਕਨਕ' ਸ਼ਬਦ ਦਾ ਕੀ ਅਰਥ ਹੈ?",
              od: "କବିତାରେ 'କନକ' ଶବ୍ଦର ଅର୍ଥ କ’ଣ?"
            },
            options: ["लोहा (Iron)", "सोना (Gold)", "चांदी (Silver)", "लकड़ी (Wood)"],
            correct: 1,
            explanation: {
              en: "'कनक' means Gold (सोना).",
              hi: "'कनक' का अर्थ सोना (Gold) होता है।"
            }
          }
        ]
      }
    ]
  },
  {
    id: "comp-c7",
    subject: "computer",
    classGrade: "Class 7",
    title: {
      en: "Class 7 Digital Literacy & Cyber Safety",
      hi: "कक्षा 7 डिजिटल साक्षरता व साइबर सुरक्षा",
      mr: "इयत्ता 7 वी डिजिटल साक्षरता",
      bn: "সপ্তম শ্রেণী ডিজিটাল সাক্ষরতা",
      te: "7వ తరగతి డిజిటల్ అక్షరాస్యత",
      ta: "7ஆம் வகுப்பு டிஜிட்டல் எழுத்தறிவு",
      gu: "ધોરણ 7 ડિજિટલ સાક્ષરતા",
      kn: "7 ನೇ ತರಗತಿ ಡಿಜಿಟಲ್ ಸಾಕ್ಷರತೆ",
      pa: "ਜਮਾਤ 7ਵੀਂ ਡਿਜੀਟਲ ਸਾਖਰਤਾ",
      od: "ସପ୍ତମ ଶ୍ରେଣୀ ଡିଜିଟାଲ ସାକ୍ଷରତା"
    },
    icon: "Cpu",
    color: "from-indigo-500 to-purple-600",
    chapters: [
      {
        id: "comp-c7-ch1",
        title: {
          en: "Smartphone Basics & Safe UPI / Internet",
          hi: "स्मार्टफोन मूल बातें व सुरक्षित UPI/इंटरनेट",
          mr: "स्मार्टफोन आणि सुरक्षित इंटरनेट वापर",
          bn: "স্মার্টফোন ও নিরাপদ ইন্টারনেট ব্যবহার",
          te: "స్మార్ట్‌ఫోన్ & సురక్షిత ఇంటర్నెట్",
          ta: "ஸ்மார்ட்போன் & பாதுகாப்பான இணையம்",
          gu: "સ્માર્ટફોન અને સુરક્ષિત ઇન્ટરનેટ",
          kn: "ಸ್ಮಾರ್ಟ್‌ಫೋನ್ ಮತ್ತು ಸುರಕ್ಷಿತ ಇಂಟರ್ನೆಟ್",
          pa: "ਸਮਾਰਟਫੋਨ ਅਤੇ ਸੁਰੱਖਿਅਤ ਇੰਟਰਨੈੱਟ",
          od: "ସ୍ମାର୍ଟଫୋନ୍ ଏବଂ ସୁରକ୍ଷିତ ଇଣ୍ଟରନେଟ୍"
        },
        topicKey: "Cyber Safety",
        sizeKB: 20,
        isDownloaded: false,
        summary: {
          en: "Crucial digital skills: safe QR code scanning, never sharing bank OTP, creating strong passwords, and avoiding cyber fraud.",
          hi: "जरूरी डिजिटल ज्ञान: सुरक्षित QR कोड स्कैनिंग, बैंक OTP कभी साझा न करना, मजबूत पासवर्ड और साइबर फ्रॉड से बचाव।",
          mr: "सुरक्षित इंटरनेट, ओटीपी सुरक्षा आणि सायबर फसवणुकीपासून बचाव शिका.",
          bn: "নিরাপদ কিউআর কোড স্ক্যানিং ও ওটিপি সুরক্ষার নিয়ম জানুন।",
          te: "సురక్షితమైన ఇంటర్నెట్ మరియు సైబర్ భద్రతా పద్ధతులను తెలుసుకోండి.",
          ta: "பாதுகாப்பான இணையப் பயன்பாடு மற்றும் சைபர் பாதுகாப்பு விதிகள்.",
          gu: "ઓનલાઇન છેતરપિંડીથી બચવા માટે ડિજિટલ જાગૃતિ.",
          kn: "ಸೈಬರ್ ಸುರಕ್ಷತೆ ಮತ್ತು ಆನ್‌ಲೈನ್ ವಂಚನೆಗಳಿಂದ ರಕ್ಷಣೆ.",
          pa: "ਸਾਈਬਰ ਧੋਖਾਧੜੀ ਤੋਂ ਬਚਣ ਦੇ ਤਰੀਕੇ ਸਿੱਖੋ।",
          od: "ସାଇବର ନିରାପତ୍ତା ଏବଂ ସୁରକ୍ଷିତ ଇଣ୍ଟରନେଟ୍ ବ୍ୟବହାର।"
        },
        lowDataContent: {
          en: `### 1. Digital India: What is a QR Code?
A **QR (Quick Response) Code** is a matrix barcode that can be scanned using a smartphone camera.
- Scanning a merchant QR lets you make payments via UPI without cash.
- **Golden Rule:** To *RECEIVE* money, you NEVER need to enter your UPI PIN or scan a QR code!

### 2. OTP Security (One-Time Password)
- Never share OTP or PIN with anyone, even if someone claims to be a bank manager or school officer on the phone.
- Banks NEVER ask for OTP or passwords over phone calls.

### 3. Cyber Safety Rules
1. Never click on unknown lottery or free recharge links received on WhatsApp or SMS.
2. Use strong passwords combining letters, numbers, and symbols.`,
          hi: `### 1. क्यूआर कोड (QR Code) क्या है?
**QR कोड** एक विशेष चौकोर कोड होता है जिसे फोन के कैमरे से स्कैन किया जाता है।
- **सुनहरा नियम (Golden Rule):** किसी से पैसे *प्राप्त करने (Receive)* के लिए कभी भी UPI PIN दर्ज नहीं करना पड़ता! PIN केवल पैसे भेजने (Send) के समय डाला जाता है।

### 2. ओटीपी (OTP) सुरक्षा
- फोन पर बैंक कर्मचारी या सरकारी अधिकारी बनकर कॉल करने वाले किसी भी व्यक्ति को OTP या पिन कभी न बताएं।
- कोई भी बैंक फोन पर OTP नहीं मांगता।

### 3. साइबर सुरक्षा के जरूरी नियम
1. WhatsApp या SMS पर आए "मुफ्त रिचार्ज" या "लॉटरी" वाले अज्ञात लिंक पर कभी क्लिक न करें।
2. अपना फोन पासवर्ड या फिंगरप्रिंट लॉक हमेशा सक्रिय रखें।`
        },
        audioScript: {
          en: "Welcome to Digital Literacy. Always remember the golden rule of cyber safety: Never share your OTP with anyone, and never enter your UPI PIN to receive money. Stay alert against fraud messages.",
          hi: "डिजिटल साक्षरता में आपका स्वागत है। हमेशा याद रखें: पैसे प्राप्त करने के लिए कभी UPI PIN न डालें, और फोन पर किसी को भी अपना बैंक OTP न बताएं। साइबर धोखाधड़ी से सावधान रहें।"
        },
        quiz: [
          {
            id: "q-comp-1",
            question: {
              en: "Do you need to enter your UPI PIN to RECEIVE money in your bank account?",
              hi: "क्या अपने बैंक खाते में पैसे प्राप्त करने के लिए UPI PIN दर्ज करने की आवश्यकता होती है?",
              mr: "खात्यात पैसे मिळवण्यासाठी यूपीआय पिन टाकण्याची गरज असते का?",
              bn: "ব্যাংক একাউন্টে টাকা পেতে কি ইউপিআই পিন দিতে হয়?",
              te: "బ్యాంకులో డబ్బులు పొందడానికి UPI పిన్ ఎంటర్ చేయాలా?",
              ta: "பணம் பெற UPI PIN உள்ளிட வேண்டுமா?",
              gu: "પૈસા મેળવવા માટે UPI PIN નાખવાની જરૂર છે?",
              kn: "ಹಣ ಪಡೆಯಲು UPI ಪಿನ್ ನಮೂದಿಸಬೇಕೆ?",
              pa: "ਕੀ ਪੈਸੇ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ UPI PIN ਦਰਜ ਕਰਨ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ?",
              od: "ଟଙ୍କା ପାଇବା ପାଇଁ UPI PIN ଦେବା ଆବଶ୍ୟକ କି?"
            },
            options: [
              "No, NEVER enter PIN to receive money",
              "Yes, always enter PIN",
              "Only on Sundays",
              "Only for large amounts"
            ],
            correct: 0,
            explanation: {
              en: "UPI PIN is ONLY entered when SENDING money or deducting from your account.",
              hi: "पिन केवल पैसे भेजने या कटौती के समय डाला जाता है, पैसे आने पर कभी नहीं।"
            }
          }
        ]
      }
    ]
  }
];
