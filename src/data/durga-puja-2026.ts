// Event information supplied by MCSA. Keep shared links and programme details here.
// See docs/durga-puja-2026-content-review.md for items awaiting organiser confirmation.
export const durgaPuja = {
  path: "/durga-puja-2026",
  url: "https://www.mithilaculturalsociety.au/durga-puja-2026",
  dates: "17–19 October 2026",
  venue: "Quakers Hill Community Centre",
  address: "7 Lalor Road, Quakers Hill NSW 2763",
  email: "mithilaculturalsoc@gmail.com",
  contacts: [
    { name: "Shishirendu", phone: "0426 399 461", href: "tel:+61426399461" },
    { name: "Chandra", phone: "0416 476 725", href: "tel:+61416476725" }
  ],
  donationUrl: "https://gofund.me/726018cad",
  sevaUrl: "https://events.humanitix.com/durga-puja/tickets",
  dandiyaUrl: "https://events.humanitix.com/dandiya-nights",
  sponsorshipUrl: "https://events.humanitix.com/durga-puja-sponsorship/tickets",
  stallUrl: "https://events.humanitix.com/mithila-haat/tickets",
  directionsUrl: "https://www.google.com/maps/search/?api=1&query=Quakers+Hill+Community+Centre+7+Lalor+Road+Quakers+Hill+NSW+2763",
  calendarUrl: "/downloads/durga-puja-2026.ics",
  programmeConfirmed: true
} as const;

export const festivalDays = [
  {
    id: "saturday", day: "Saturday", date: "17 October", number: "01",
    title: "A sacred beginning",
    description: "Welcome Maa Bhagwati, celebrate Mithila, and gather in devotion.",
    items: [
      { time: "10:00 am", title: "Sthapana (Ghat Sthapana)" },
      { time: "10:00 am–12:30 pm", title: "Pujan", detail: "Vedic rituals and chanting" },
      { time: "12:30–1:00 pm", title: "Pushpanjali", detail: "Floral offerings" },
      { time: "1:00 pm", title: "Aarti" },
      { time: "1:00–2:00 pm", title: "Prasad distribution & Bhog" },
      { time: "3:30–6:30 pm", title: "Mithila Mahotsav", detail: "Music, dance, language and culture", ticketed: true },
      { time: "6:30–9:30 pm", title: "Mata ki Chowki", detail: "Devotional bhajans and kirtan" },
      { time: "9:30 pm", title: "Community dinner" }
    ]
  },
  {
    id: "sunday", day: "Sunday", date: "18 October", number: "02",
    title: "Blessings & celebration",
    description: "Sacred traditions by day. An evening of Dandiya, music and togetherness.",
    items: [
      { time: "9:00–11:30 am", title: "Pujan (Mahashtami / Mahanavami Puja)" },
      { time: "11:30 am–12:00 noon", title: "Pushpanjali" },
      { time: "12:30 pm", title: "Aarti" },
      { time: "12:30–1:30 pm", title: "Prasad distribution" },
      { time: "1:30–2:30 pm", title: "Kanya Pujan", detail: "Honouring Kanya Swaroop" },
      { time: "2:30–4:30 pm", title: "Maithilani Khoichha", detail: "A sacred Mithila blessing ritual" },
      { time: "5:00–9:00 pm", title: "Dandiya Utsav", detail: "Folk dance and celebration", ticketed: true },
      { time: "9:00 pm", title: "Food distribution & dinner" }
    ]
  },
  {
    id: "monday", day: "Monday", date: "19 October", number: "03",
    title: "Gratitude & farewell",
    description: "Come together for the closing prayers and farewell to Maa Durga.",
    items: [
      { time: "9:00–11:30 am", title: "Dashami Pujan & Samarpan" },
      { time: "11:30 am–12:00 noon", title: "Pushpanjali" },
      { time: "12:00 noon", title: "Aarti" },
      { time: "12:00–12:30 pm", title: "Prasad distribution" },
      { time: "12:30 pm", title: "Visarjan", detail: "Farewell rituals to Maa Durga" },
      { time: "Following Visarjan", title: "Sindoor Khela", detail: "Festive blessings and celebration" }
    ]
  }
] satisfies Array<{
  id: string; day: string; date: string; number: string; title: string; description: string;
  items: Array<{ time: string; title: string; detail?: string; ticketed?: boolean }>;
}>;

export const festivalFaqs = [
  { question: "How can I take part in Khoichha or Kanya Pujan?", answer: "Use the participation links in Sacred moments. Shared joy. Ladies can express interest in Mithila Khoichha. A parent or guardian can submit interest for girls taking part in Kanya Pujan using their own contact details. The organising team will confirm arrangements; submitting interest does not reserve a place." },
  { question: "When and where is the celebration?", answer: "Join us from Saturday 17 to Monday 19 October 2026 at Quakers Hill Community Centre, 7 Lalor Road, Quakers Hill NSW 2763. All programme times on this page are Sydney local time (AEDT)." },
  { question: "Do I need a ticket?", answer: "Mithila Mahotsav and Dandiya are marked as ticketed events in the programme. Contact the organising team for Puja admission and Mithila Mahotsav ticket details. Dandiya bookings and Seva packages are available through the links on this page; check your package inclusions before booking separately." },
  { question: "Can I donate without booking a Seva package?", answer: "Yes. Use the GoFundMe link to make a donation, or the bank details in the support section. Seva packages are booked separately through Humanitix. A GoFundMe donation does not book an event ticket or Seva package." },
  { question: "Are families and children welcome?", answer: "Yes. Families and friends from all communities are welcome to celebrate together. The festival includes cultural activities, Bhog and Prasad, and activities for children. Contact the team for details of individual activities and any admission requirements." },
  { question: "Will there be food and Prasad?", answer: "Bhog, Prasad distribution and community meals are included in the programme. Please contact the organisers in advance about dietary needs or allergies and to confirm arrangements for the session you plan to attend." },
  { question: "What about parking and accessibility?", answer: "Use the directions link to plan your journey to 7 Lalor Road. For parking arrangements, step-free access, accessible facilities or assistance on arrival, please contact the organising team before your visit." },
  { question: "How can I volunteer, perform or represent my organisation?", answer: "Visit our volunteer page or email the organising team about performing, community partnerships, endorsements and in-kind support. The team can confirm available opportunities and the next steps." }
];

export const ritualActivities = {
  khoichha: {
    name: "Mithila Khoichha",
    subtitle: "Maithilani Khoichha · A sacred offering to Maa Bhagwati",
    description: "A cherished Mithila tradition of devotion, offerings and blessings. Ladies are invited to come together and express their interest in taking part. The organising team will share preparation and participation details.",
    audience: "For ladies wishing to participate",
    cta: "Express interest in Khoichha",
    programmeTitle: "Maithilani Khoichha"
  },
  "kanya-pujan": {
    name: "Kanya Pujan",
    subtitle: "Celebrating the Divine Feminine",
    description: "Join us in honouring Kanya Swaroop during Maa Bhagwati Durga Puja. Parents and guardians can express interest for their young girls to participate. The team will contact you about suitability, arrival and arrangements.",
    audience: "Interest submitted by a parent or guardian",
    cta: "Express interest for Kanya Pujan",
    programmeTitle: "Kanya Pujan"
  }
} as const;

export type RitualActivity = keyof typeof ritualActivities;

export function ritualParticipationUrl(activity: RitualActivity) {
  return `${durgaPuja.path}/participate?activity=${activity}`;
}

export function ritualActivityTime(activity: RitualActivity) {
  return festivalDays.find(day => day.id === "sunday")?.items.find(item => item.title === ritualActivities[activity].programmeTitle)?.time;
}
