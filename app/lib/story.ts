/*
 * Project: MO — Beyond the Frame
 * Creator: Mohamed Hussein · https://iegy.net
 * Project ID: MO-IEGY-01 · Chapter signature: MH-4047
 * Build: MO-1.0.0-IEGY
 */

export type Language = "ar" | "en";
export type ArtKey =
  | "city"
  | "workshop"
  | "edge"
  | "fall"
  | "margin"
  | "blank"
  | "escape"
  | "finale";
export type MoPose = "idle" | "walk" | "push" | "fall" | "land" | "run";
export type PixPose = "none" | "hover" | "curious" | "play" | "alarm" | "guide" | "protect";

export interface LocalizedCopy {
  ar: string;
  en: string;
}

export interface StoryScene {
  id: string;
  number: number;
  title: LocalizedCopy;
  kicker: LocalizedCopy;
  narration: LocalizedCopy;
  hint?: LocalizedCopy;
  art: ArtKey;
  moPose: MoPose;
  pixPose: PixPose;
  scrollVh: number;
  mood: "calm" | "playful" | "mystery" | "wonder" | "fear" | "action";
  interaction?: "look" | "sign" | "city" | "repair" | "pix" | "margin";
}

export const chapterTitle: LocalizedCopy = {
  ar: "الخطأ اللي ماكانش خطأ",
  en: "The Error That Wasn't",
};

export const scenes: StoryScene[] = [
  {
    id: "ch01-sc01-awakening",
    number: 1,
    title: { ar: "صباح جديد", en: "A New Morning" },
    kicker: { ar: "كل حاجة في مكانها", en: "Everything in its place" },
    narration: {
      ar: "خطوط رفيعة رسمت المدينة واحدة واحدة. النور اشتغل، الشوارع اتحركت، ومو بدأ يومه زي كل يوم.",
      en: "Thin lines drew the city awake. Lights blinked on, streets began to move, and Mo started another perfectly ordinary day.",
    },
    hint: { ar: "المس مو وخليه يبص ناحيتك", en: "Tap Mo and he may notice you" },
    art: "city",
    moPose: "walk",
    pixPose: "none",
    scrollVh: 150,
    mood: "calm",
    interaction: "look",
  },
  {
    id: "ch01-sc02-no-errors",
    number: 2,
    title: { ar: "مفيش أخطاء النهارده", en: "No Errors Today" },
    kicker: { ar: "يوم هادي... غالبًا", en: "A quiet day. Probably." },
    narration: {
      ar: "مو فرح باللافتة. أخد خطوة واحدة بس... واللافتة غيرت رأيها.",
      en: "Mo liked the sign. One step later, the sign reconsidered.",
    },
    hint: { ar: "جرّب تضغط على اللافتة ٣ مرات", en: "Try tapping the sign three times" },
    art: "city",
    moPose: "walk",
    pixPose: "none",
    scrollVh: 180,
    mood: "playful",
    interaction: "sign",
  },
  {
    id: "ch01-sc03-city-walk",
    number: 3,
    title: { ar: "الطريق للشغل", en: "The Walk to Work" },
    kicker: { ar: "المدينة بتحب النظام", en: "The city loves routine" },
    narration: {
      ar: "الماكينة رمت الكوباية بعد ما مو عدى، والدرون نزل يسلم، والصندوق المقفول كان—كالعادة—مقفول.",
      en: "The machine dispensed a cup one second too late, a drone dropped by to say hello, and the locked box remained impressively locked.",
    },
    hint: { ar: "استكشف الحاجات اللي بتنور", en: "Explore the glowing details" },
    art: "city",
    moPose: "walk",
    pixPose: "none",
    scrollVh: 180,
    mood: "playful",
    interaction: "city",
  },
  {
    id: "ch01-sc04-error4047",
    number: 4,
    title: { ar: "خطأ 4047", en: "Error 4047" },
    kicker: { ar: "محاولة... واتنين... وتلاتة", en: "Once. Twice. Three times." },
    narration: {
      ar: "مو صلّح الوحدة مرة ورا مرة. في المحاولة الرابعة خبطها خبطة صغيرة... فاشتغلت. ومن جوّاها هرب نور برتقالي.",
      en: "Mo repaired the unit again and again. On the fourth try, one tiny tap brought it to life—and set a little orange light free.",
    },
    hint: { ar: "اضغط على الوحدة وساعد مو", en: "Tap the unit and help Mo" },
    art: "workshop",
    moPose: "push",
    pixPose: "none",
    scrollVh: 180,
    mood: "playful",
    interaction: "repair",
  },
  {
    id: "ch01-sc05-pix",
    number: 5,
    title: { ar: "بيكس", en: "PIX" },
    kicker: { ar: "ضوء صغير... وسر كبير", en: "A little light. A big secret." },
    narration: {
      ar: "النور لف حوالين مو، قلّد تعبيره، وفلت من إيده كل مرة. وبعدين طار ناحية مكان مافيش المفروض بعده أي حاجة.",
      en: "The light circled Mo, copied his face, and slipped away from every grab—then flew toward an edge that should have ended everything.",
    },
    hint: { ar: "المس بيكس لو قدرت", en: "Try to catch PIX" },
    art: "workshop",
    moPose: "idle",
    pixPose: "play",
    scrollVh: 170,
    mood: "playful",
    interaction: "pix",
  },
  {
    id: "ch01-sc06-the-edge",
    number: 6,
    title: { ar: "الحافة", en: "The Edge" },
    kicker: { ar: "إيه اللي بعد الكادر؟", en: "What lies past the panel?" },
    narration: {
      ar: "بيكس عدى الخط ببساطة. مو لمسه، دخل إيده من خلاله، سحبها بسرعة... وبعدها جرّب يزق.",
      en: "PIX crossed the border as if it were nothing. Mo touched it, reached through, recoiled—then pushed.",
    },
    art: "edge",
    moPose: "push",
    pixPose: "curious",
    scrollVh: 190,
    mood: "mystery",
  },
  {
    id: "ch01-sc07-frame-break",
    number: 7,
    title: { ar: "كسر الإطار", en: "Frame Break" },
    kicker: { ar: "الواقع بيتني", en: "Reality starts to bend" },
    narration: {
      ar: "الخط اتمطّ زي الورق، واتشوّش زي الشاشة، واتشرخ كأنه جزء من العالم نفسه. مو زق أكتر... فالإطار اتفتح.",
      en: "The border stretched like paper, glitched like an interface, and cracked like reality itself. Mo pushed harder—and the frame opened.",
    },
    art: "edge",
    moPose: "push",
    pixPose: "guide",
    scrollVh: 230,
    mood: "wonder",
  },
  {
    id: "ch01-sc08-fall",
    number: 8,
    title: { ar: "السقوط بين العوالم", en: "Falling Between Worlds" },
    kicker: { ar: "مفيش تحت", en: "There is no down" },
    narration: {
      ar: "مدينة من نور، محيط واقف بالطول، غابة كابلات، عالم مرسوم بالقلم، وصحراء ميكانيكية. مو مسك طرف كادر واحتفل... فالطرف اتقطع.",
      en: "A neon city. A vertical ocean. A cable forest. A pencil world. A mechanical desert. Mo caught a panel edge and celebrated—until it tore away.",
    },
    hint: { ar: "دوّر على ظل بعيد شبه مو", en: "Look for a distant familiar silhouette" },
    art: "fall",
    moPose: "fall",
    pixPose: "guide",
    scrollVh: 300,
    mood: "wonder",
  },
  {
    id: "ch01-sc09-margin",
    number: 9,
    title: { ar: "الهامش", en: "The Margin" },
    kicker: { ar: "مكان بين الحكايات", en: "A place between stories" },
    narration: {
      ar: "أبواب من غير حيطان، شبابيك بتفتح على عوالم تانية، سلالم رايحة ولا حتة، وطرق نسيت كانت بتوصل لفين.",
      en: "Doors without walls. Windows into other worlds. Stairs leading nowhere. Roads that had forgotten their destinations.",
    },
    hint: { ar: "افتح باب، بص من شباك، وجرّب السلم", en: "Open a door, peek through a window, try the stairs" },
    art: "margin",
    moPose: "land",
    pixPose: "hover",
    scrollVh: 210,
    mood: "mystery",
    interaction: "margin",
  },
  {
    id: "ch01-sc10-followed",
    number: 10,
    title: { ar: "في حاجة وراهم", en: "Something Follows" },
    kicker: { ar: "التفاصيل بتختفي", en: "The details are disappearing" },
    narration: {
      ar: "الأرض فقدت ملمسها. الألوان هديت. خطوط بعيدة اختفت. القارئ شافها الأول... وبعدها بيكس وقف مكانه من الخوف.",
      en: "Texture vanished from the ground. Color drained. Distant outlines went missing. The reader saw it first—then PIX froze.",
    },
    art: "blank",
    moPose: "idle",
    pixPose: "alarm",
    scrollVh: 190,
    mood: "fear",
  },
  {
    id: "ch01-sc11-blank",
    number: 11,
    title: { ar: "الفراغ", en: "The Blank" },
    kicker: { ar: "مش وحش... غياب", en: "Not a monster. An absence." },
    narration: {
      ar: "نص الباب اختفى كأنه ما اترسمش أصلًا. مو مد إيده، لكن بيكس منعه بسرعة وأشار له يهرب. واضح إنه شاف الفراغ قبل كده.",
      en: "Half the doorway disappeared as if it had never been drawn. Mo reached out. PIX stopped him—and urgently pointed away. He had seen the Blank before.",
    },
    art: "blank",
    moPose: "idle",
    pixPose: "protect",
    scrollVh: 210,
    mood: "fear",
  },
  {
    id: "ch01-sc12-escape",
    number: 12,
    title: { ar: "اهرب!", en: "Run!" },
    kicker: { ar: "قبل ما الطريق يتمسح", en: "Before the road is erased" },
    narration: {
      ar: "الأرض اختفت، والكوبري ناقص، وقطع الكادرات بتقع. أول باب فتح على حيطة. التاني فتح فعلًا. مو وبيكس عدّوا في آخر لحظة.",
      en: "The ground vanished. The bridge was missing. Panels fell around them. The first door opened onto a wall. The second opened for real. Mo and PIX made it through—just.",
    },
    hint: { ar: "سرعة السكرول بتغيّر سرعة جري مو—من غير خسارة", en: "Your scroll changes Mo's pace—there is no fail state" },
    art: "escape",
    moPose: "run",
    pixPose: "guide",
    scrollVh: 260,
    mood: "action",
  },
];

export const uiCopy = {
  ar: {
    series: "مو — خارج الإطار",
    chapter: "الفصل الأول",
    start: "ابدأ الفصل",
    continue: "كمّل من آخر مكان",
    restart: "ابدأ من الأول",
    scroll: "انزل لتبدأ الحكاية",
    soundOn: "الصوت شغال",
    soundOff: "الصوت مقفول",
    settings: "الإعدادات",
    close: "إغلاق",
    motion: "الحركة",
    fullMotion: "كاملة",
    reducedMotion: "مخفّضة",
    quality: "الأداء",
    auto: "تلقائي",
    balanced: "متوازن",
    lite: "خفيف",
    progress: "تقدّم الفصل",
    complete: "نهاية الفصل الأول",
    city: "مدينة كبيرة... وعالم جديد",
    ending: "مو بص لبيكس، وبص للمدينة، وبعدها بص ناحيتك. بعيد قوي، بقعة صغيرة من السما كانت ناقصة.",
    next: "الفصل الثاني",
    teaser: "محطة آخر الليل",
    teaserLine: "قطار بيعدّي في البياض... ومحطة مش موجودة على الخريطة.",
    unavailable: "قريبًا",
    credit: "تصميم وبرمجة محمد حسين — iegy.net",
    rights: "© 2026 محمد حسين. جميع الحقوق محفوظة.",
  },
  en: {
    series: "MO — Beyond the Frame",
    chapter: "Chapter 01",
    start: "Start chapter",
    continue: "Continue reading",
    restart: "Start from the beginning",
    scroll: "Scroll to enter the story",
    soundOn: "Sound on",
    soundOff: "Sound off",
    settings: "Settings",
    close: "Close",
    motion: "Motion",
    fullMotion: "Full",
    reducedMotion: "Reduced",
    quality: "Performance",
    auto: "Auto",
    balanced: "Balanced",
    lite: "Lite",
    progress: "Chapter progress",
    complete: "Chapter 01 complete",
    city: "A vast city. A brand-new world.",
    ending: "Mo looked at PIX, then the city, then straight at you. Far away, a tiny patch of sky was missing.",
    next: "Chapter 02",
    teaser: "The Last Stop",
    teaserLine: "A train crosses the white—and reaches a station that isn't on the map.",
    unavailable: "Coming soon",
    credit: "Designed & Developed by Mohamed Hussein — iegy.net",
    rights: "© 2026 Mohamed Hussein. All Rights Reserved.",
  },
} as const;

export const artFiles: Record<ArtKey, string> = {
  city: "city-workshop",
  workshop: "city-workshop",
  edge: "frame-fall",
  fall: "frame-fall",
  margin: "margin-blank",
  blank: "margin-blank",
  escape: "escape-finale",
  finale: "escape-finale",
};

export function copy<T extends LocalizedCopy>(value: T, language: Language) {
  return value[language];
}
