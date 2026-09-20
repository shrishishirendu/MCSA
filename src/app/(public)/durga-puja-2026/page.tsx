import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { FestivalShareButton } from "@/components/events/FestivalShareButton";
import { durgaPuja, festivalDays, festivalFaqs, ritualActivities, ritualActivityTime, ritualParticipationUrl, type RitualActivity } from "@/data/durga-puja-2026";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Durga Puja 2026 · Programme, Events & Seva",
  description: "Celebrate Durga Puja and Mithila Mahotsav in Sydney, 17–19 October 2026. Explore the three-day programme, Dandiya, Seva, donations, stalls and visitor information.",
  alternates: { canonical: durgaPuja.url },
  openGraph: {
    title: "Durga Puja 2026 · Mithila Welcomes Mahashakti",
    description: "Three days of devotion, culture and community. 17–19 October · Quakers Hill, Sydney.",
    url: durgaPuja.url,
    type: "website",
    images: [{ url: "https://www.mithilaculturalsociety.au/images/durga-puja-2026/festival-banner.webp", width: 1942, height: 809, alt: "Durga Puja 2026 — Mithila Welcomes Mahashakti" }]
  },
  twitter: { card: "summary_large_image" }
};

const mail = (subject: string) => `mailto:${durgaPuja.email}?subject=${encodeURIComponent(subject)}`;

function Action({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  const external = href.startsWith("https://");
  return <a href={href} className={`${styles.button} ${secondary ? styles.buttonSecondary : ""}`} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}<span aria-hidden="true">{external ? "↗" : "→"}</span></a>;
}

function Heading({ label, title, children }: { label: string; title: string; children?: ReactNode }) {
  return <div className={styles.sectionHeading}><p className={styles.eyebrow}>{label}</p><h2>{title}</h2>{children && <p className={styles.intro}>{children}</p>}</div>;
}

export default function DurgaPujaPage() {
  return (
    <main className={styles.page} id="festival-top">
      <section className={styles.hero} aria-labelledby="festival-title">
        <div className={styles.heroCopy}>
          <p className={styles.invocation} lang="hi">जय माता दी · जय मिथिला · जय मैथिली</p>
          <p className={styles.eyebrow}>Mithila Cultural Society Australia presents</p>
          <h1 id="festival-title">Durga Puja <span>2026</span></h1>
          <p className={styles.heroSubtitle}>Mithila welcomes Mahashakti.</p>
          <div className={styles.heroFacts}><p><strong>{durgaPuja.dates}</strong><span>Saturday to Monday</span></p><p><strong>Quakers Hill, Sydney</strong><span>{durgaPuja.venue}</span></p></div>
          <p className={styles.heroDescription}>Three days to seek blessings, celebrate our roots, and make memories with the people who matter.</p>
          <div className={styles.actions}><Action href="#programme">Explore the programme</Action><Action href={durgaPuja.donationUrl} secondary>Donate via GoFundMe</Action></div>
          <p className={styles.heroFootnote}>Devotion. Culture. Heritage. Togetherness.</p>
        </div>
        <div className={styles.heroArt}>
          <Image src="/images/durga-puja-2026/family-devotion.webp" alt="Illustration of a family offering prayers together before Maa Durga" width={1448} height={1086} priority sizes="(max-width: 800px) 100vw, 70vw" />
          <div className={styles.artCaption}><span>Come with family. Celebrate together.</span><p>There is a place for everyone.</p></div>
        </div>
      </section>

      <nav className={styles.sectionNav} aria-label="Durga Puja page sections">
        <a href="#programme">Programme</a><a href="#celebrations">Celebrations</a><a href="#seva">Seva & donations</a><a href="#get-involved">Get involved</a><a href="#visit">Plan your visit</a><a href="#questions">FAQs</a>
      </nav>

      <section className={styles.welcome}>
        <p className={styles.eyebrow}>One festival. Many ways to belong.</p>
        <h2>Faith brings us together.<br />Culture makes it feel like home.</h2>
        <p>From morning prayers and Pushpanjali to Mithila Mahotsav, Mata ki Chowki and Dandiya, join a celebration of the living traditions of Mithila. Bring your family, meet your community, and share in the joy of welcoming Maa Bhagwati to Sydney.</p>
        <div className={styles.welcomeTags}><span>Three days of Puja</span><span>Music & cultural performances</span><span>Mithila Haat</span><span>Bhog & Prasad</span><span>Family activities</span></div>
      </section>

      <section id="programme" className={styles.section}>
        <div className={styles.headingRow}><Heading label="17–19 October · Sydney local time (AEDT)" title="Your three days, at a glance.">Find the prayers, performances and celebrations you would like to join.</Heading><a className={styles.textLink} href={durgaPuja.calendarUrl} download>Save the dates to your calendar ↓</a></div>
        {!durgaPuja.programmeConfirmed && <p className={styles.notice}>Programme preview: timings are awaiting final confirmation. Please check back before planning your visit.</p>}
        <div className={styles.programmeGrid}>
          {festivalDays.map(day => <article className={styles.dayCard} key={day.id} id={day.id}>
            <header><span className={styles.dayNumber}>{day.number}</span><p>{day.day} <strong>{day.date}</strong></p><h3>{day.title}</h3><p className={styles.dayDescription}>{day.description}</p></header>
            <ol className={styles.timeline}>{day.items.map(item => <li key={item.title}><p className={styles.time}>{item.time}</p><h4>{item.title}</h4>{"detail" in item && <p>{item.detail}</p>}{"ticketed" in item && item.ticketed && <a href={item.title === "Dandiya Utsav" ? durgaPuja.dandiyaUrl : mail("Mithila Mahotsav 2026 ticket enquiry")} className={styles.ticketTag} {...(item.title === "Dandiya Utsav" ? { target: "_blank", rel: "noopener noreferrer" } : {})}>Ticketed · {item.title === "Dandiya Utsav" ? "Book Dandiya ↗" : "Enquire about tickets ↗"}</a>}</li>)}</ol>
          </article>)}
        </div>
      </section>

      <section id="celebrations" className={`${styles.section} ${styles.celebrations}`}>
        <Heading label="Discover the celebration" title="Sacred moments. Shared joy.">Make a day of it, or join the moments closest to your heart.</Heading>
        <div className={styles.eventGrid}>
          <article className={`${styles.eventCard} ${styles.eventFeatured}`}>
            <Image src="/images/durga-puja-2026/family-seva.webp" alt="Illustration of a family taking part in Puja with a priest" width={1448} height={1086} sizes="(max-width: 800px) 100vw, 55vw" />
            <div className={styles.eventBody}><p className={styles.eyebrow}>Across all three days</p><h3>Maa Bhagwati Puja</h3><p>Offer your prayers, join Pushpanjali and Aarti, and receive Prasad. Families can explore Yajman Seva for Sankalp and participation in the Puja.</p><a href="#seva" className={styles.textLink}>Explore Seva opportunities →</a></div>
          </article>
          <article className={`${styles.eventCard} ${styles.mahotsavCard}`}><div className={styles.eventBody}><p className={styles.eyebrow}>Saturday 17 October · Cultural programme</p><span aria-hidden="true" className={styles.eventMotif}>✺</span><h3>Mithila Mahotsav</h3><p>A celebration of Maithili language, music, dance, poetry and folk traditions. Experience the heritage of Mithila through the creativity of our community.</p><p className={styles.eventMeta}>Ticketed event · 3:30–6:30 pm</p><Action href={mail("Mithila Mahotsav 2026 ticket enquiry")}>Enquire about tickets</Action></div></article>
          <article className={styles.eventCard}><div className={styles.eventBody}><p className={styles.eyebrow}>Saturday 17 October · Evening</p><h3>Mata ki Chowki</h3><p>Gather for devotional bhajans, kirtan and the blessings of Maa, with Mithila Cultural Society Australia and Hindu Federation of Australia.</p><p className={styles.eventMeta}>6:30–9:30 pm · Community dinner at 9:30 pm.</p><a href={mail("Mata ki Chowki 2026 enquiry")} className={styles.textLink}>Ask about attending →</a></div></article>
          <article className={`${styles.eventCard} ${styles.dandiyaCard}`}><div className={styles.eventBody}><p className={styles.eyebrow}>Sunday 18 October · 5:00–9:00 pm</p><h3>Dandiya Utsav</h3><p>Bring your festive spirit for an evening of folk dance, music and celebration with family and friends.</p><p className={styles.eventMeta}>Ticketed event · Listed as “Dandiya Nights” on Humanitix</p><Action href={durgaPuja.dandiyaUrl}>Explore Dandiya & tickets</Action></div></article>
        </div>
        <div className={`${styles.eventGrid} ${styles.participationGrid}`}>
          {(Object.keys(ritualActivities) as RitualActivity[]).map(activity => {
            const details = ritualActivities[activity];
            return <article key={activity} id={activity} className={`${styles.eventCard} ${styles.ritualCard}`}>
              {activity === "khoichha" ? <Image src="/images/durga-puja-2026/khoichha.jpeg" alt="Devotional artwork of ladies offering Khoichha to Maa Bhagwati" width={683} height={1024} sizes="(max-width: 800px) 100vw, 560px" className={styles.ritualArtwork} /> : <div className={styles.kanyaArtwork} aria-hidden="true"><span>✺</span><p>Honouring Kanya Swaroop</p></div>}
              <div className={styles.eventBody}>
                <p className={styles.eyebrow}>Sunday 18 October · {ritualActivityTime(activity)}</p>
                <h3>{details.name}</h3>
                <p className={styles.ritualSubtitle}>{details.subtitle}</p>
                <p>{details.description}</p>
                <p className={styles.eventMeta}>{details.audience}</p>
                <Action href={ritualParticipationUrl(activity)}>{details.cta}</Action>
                <p className={styles.smallPrint}>Share your interest. The team will confirm participation arrangements.</p>
              </div>
            </article>;
          })}
        </div>
        <div className={styles.ritualStrip}><div><p className={styles.eyebrow}>Traditions to experience</p><h3>Rooted in Mithila. Open to all.</h3></div><p><a href={ritualParticipationUrl("kanya-pujan")} className={styles.textLink}>Kanya Pujan →</a><br />Honouring Kanya Swaroop</p><p><a href={ritualParticipationUrl("khoichha")} className={styles.textLink}>Mithila Khoichha →</a><br />A sacred blessing ritual</p><p><strong>Sindoor Khela</strong>Blessings after Visarjan</p></div>
      </section>

      <section id="seva" className={styles.support}>
        <div className={styles.section}>
          <Heading label="Your offering makes a difference" title="Help bring this celebration to life.">Support the Puja, Bhog, venue and community arrangements in a way that is meaningful to you.</Heading>
          <div className={styles.supportGrid}>
            <article className={styles.donationCard}><span className={styles.smallLabel}>A contribution from the heart</span><h3>Give what you can.</h3><p>Every contribution helps our community welcome Maa Bhagwati and share the traditions of Mithila with the next generation.</p><Action href={durgaPuja.donationUrl}>Donate via GoFundMe</Action><p className={styles.smallPrint}>For general donations. Event tickets and Seva bookings are separate.</p></article>
            <article className={styles.sevaCard}><span className={styles.smallLabel}>Participate through Seva</span><h3>Make an offering with your family.</h3><p>Explore Community Seva, Shubh Family Seva and Yajman Seva on Humanitix.</p><ul><li>Support Puja and community arrangements</li><li>Explore family participation and package inclusions</li><li>Choose the offering that is right for you</li></ul><Action href={durgaPuja.sevaUrl} secondary>View Seva packages</Action><p className={styles.smallPrint}>See Humanitix for current prices, inclusions, availability and booking fees.</p></article>
          </div>
          <details className={styles.bankDetails}><summary>Prefer a bank transfer? <span aria-hidden="true">+</span></summary><div><dl><div><dt>Account name</dt><dd>Mithila Cultural Society Australia Inc.</dd></div><div><dt>Bank</dt><dd>Commonwealth Bank of Australia</dd></div><div><dt>BSB</dt><dd>062-452</dd></div><div><dt>Account number</dt><dd>1050 9708</dd></div></dl><p>For Seva, sponsorship or stall payments, please contact the team to confirm arrangements and use a reference with the purpose and your name.</p></div></details>
        </div>
      </section>

      <section id="get-involved" className={styles.section}>
        <Heading label="There is a place for everyone" title="Be part of something shared.">Bring your craft, your business, your time or your community. Together, we make the festival possible.</Heading>
        <div className={styles.involvementGrid}>
          <article className={styles.involvementCard}><p className={styles.cardIndex}>01 / Mithila Haat</p><h3>A marketplace full of culture.</h3><p>Discover handicrafts, Madhubani art, traditional clothing, jewellery, home décor, books and food.</p><p>Interested in exhibiting? Explore stall bookings and contact the team about your products, setup and requirements.</p><Action href={durgaPuja.stallUrl}>Explore stall bookings</Action></article>
          <article className={styles.involvementCard}><p className={styles.cardIndex}>02 / Sponsors & partners</p><h3>Support culture. Build community.</h3><p>Help deliver a welcoming celebration through business sponsorship, in-kind support or a community partnership.</p><Action href={durgaPuja.sponsorshipUrl}>Explore sponsorship</Action><a href={mail("Durga Puja 2026 community partnership and endorsement")} className={styles.textLink}>Community partnership enquiries →</a></article>
          <article className={styles.involvementCard}><p className={styles.cardIndex}>03 / Volunteers & performers</p><h3>Share your time and talent.</h3><p>Help welcome families, support the event team, or bring music, dance, poetry and creativity to the celebration.</p><Action href="/volunteer">Volunteer with us</Action><a href={mail("Mithila Mahotsav 2026 performance enquiry")} className={styles.textLink}>Ask about performing →</a></article>
        </div>
      </section>

      <section id="visit" className={`${styles.section} ${styles.visitSection}`}>
        <div><Heading label="We look forward to welcoming you" title="Plan your visit.">Join us in Quakers Hill for three days of devotion, culture and connection.</Heading><address className={styles.address}><strong>{durgaPuja.venue}</strong><span>{durgaPuja.address}</span><span>Sydney, Australia</span></address><div className={styles.actions}><Action href={durgaPuja.directionsUrl}>Get directions</Action><Action href={durgaPuja.calendarUrl} secondary>Save the dates</Action></div></div>
        <div className={styles.visitNotes}><div><h3>Come for the moments that matter</h3><p>Use the programme to plan your day. All times are Sydney local time (AEDT). Find each day’s Puja, cultural events and meal times above.</p></div><div><h3>Food, families & access</h3><p>Bhog, Prasad and family activities are part of the celebration. Contact us about dietary needs, parking or accessibility so we can help you plan.</p></div><div><h3>Speak to the organising team</h3><a className={styles.textLink} href={mail("Durga Puja 2026 enquiry")}>{durgaPuja.email}</a><p>For attendance, Puja, cultural events, sponsorship and stall enquiries.</p><ul className="mt-4 space-y-2">{durgaPuja.contacts.map(contact => <li key={contact.href}><a className={styles.textLink} href={contact.href}>{contact.name}: {contact.phone}</a></li>)}</ul><Link href="/contact" className={styles.textLink}>Use our contact form →</Link></div></div>
      </section>

      <section id="questions" className={`${styles.section} ${styles.faqSection}`}><Heading label="A little help before you arrive" title="Your questions, answered." /><div className={styles.faqList}>{festivalFaqs.map(faq => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></section>

      <section className={styles.shareSection}><div className={styles.section}><p className={styles.eyebrow}>An invitation worth sharing</p><h2>Bring your family.<br />Invite your community.</h2><p>One page for the programme, celebrations and ways to take part.</p><div className={styles.actions}><FestivalShareButton className={styles.button} /><a href="/images/durga-puja-2026/festival-banner.webp" download="durga-puja-2026-banner.webp" className={`${styles.button} ${styles.buttonSecondary}`}>Download event banner ↓</a></div><a className={styles.posterLink} href="/images/durga-puja-2026/festival-banner.webp" target="_blank" rel="noopener noreferrer"><Image src="/images/durga-puja-2026/festival-banner.webp" alt="Durga Puja 2026 invitation: 17–19 October at Quakers Hill, featuring Puja, cultural programmes, Mithila Haat, Bhog and family activities" width={1942} height={809} sizes="(max-width: 800px) 100vw, 1000px" /></a><p className={styles.closing}>Celebrate · Connect · Seek blessings</p></div></section>

      <nav className={styles.mobileActions} aria-label="Festival quick actions"><a href="#programme">Programme</a><a href={durgaPuja.sevaUrl} target="_blank" rel="noopener noreferrer">Book Seva ↗</a><a href={durgaPuja.donationUrl} target="_blank" rel="noopener noreferrer">Donate ↗</a></nav>
    </main>
  );
}
