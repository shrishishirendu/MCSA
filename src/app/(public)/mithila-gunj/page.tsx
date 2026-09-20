import type { Metadata } from "next";
import { MithilaGunjImage } from "@/components/sections/MithilaGunjImage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mithila Gunj | Maithili Radio from Sydney",
  description: "Listen to Mithila Gunj with Shishirendu Jha, every Sunday from 8–9 am Sydney time on 2TripleO 98.5 FM. Appan Bhasha. Appan Sanskriti. Appan Awaaz."
};

const listeningLinks = [
  { name: "2TripleO — official station", href: "https://www.radio2tripleo.com.au/", detail: "Open the station website and choose Listen Live or press Play." },
  { name: "Online Radio Box", href: "https://onlineradiobox.com/au/2ooo/?cs=au.2ooo", detail: "Listen through Online Radio Box." },
  { name: "Radio Australia", href: "http://www.radioau.net/mobile/2000/", detail: "An alternative mobile listening option." },
  { name: "TuneIn", href: "https://tunein.com/radio/Radio-2000-985-s87270/", detail: "Find Radio 2000 / 2TripleO on TuneIn." }
];

const topics = [
  "The history and intellectual traditions of Mithila",
  "Maithili language, poetry and literature",
  "The timeless works of Mahakavi Vidyapati",
  "Folk songs, devotional music and contemporary Maithili music",
  "Festivals, customs and family traditions",
  "Madhubani painting and other forms of Mithila art",
  "Historic, spiritual and cultural places across Mithila",
  "Conversations with artists, scholars, community leaders and young people",
  "Stories and achievements of the global Maithil diaspora"
];

export default function MithilaGunjPage() {
  return (
    <main className="bg-lotus-50">
      <section className="bg-indigoInk text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-turmeric">A voice for the global Maithil community</p>
            <h1 className="mt-5 text-5xl font-bold sm:text-6xl">Mithila Gunj</h1>
            <p className="mt-5 text-xl text-turmeric">Appan Bhasha. Appan Sanskriti. Appan Awaaz.</p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">Our weekly Maithili radio program brings the language, literature, music and living heritage of Mithila into homes around the world.</p>
            <a href="#listen" className="mt-8 inline-flex rounded-full bg-turmeric px-6 py-3 font-bold text-indigoInk hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Listen to Mithila Gunj</a>
          </div>
          <aside aria-label="Broadcast details" className="self-center rounded-2xl border border-white/20 bg-white/5 p-8">
            <div className="mb-6"><MithilaGunjImage /></div>
            <p className="text-sm font-semibold uppercase tracking-widest text-turmeric">Every Sunday</p>
            <p className="mt-3 text-4xl font-bold">8:00–9:00 am</p>
            <p className="mt-2 text-white/80">Sydney local time · Australia/Sydney</p>
            <p className="mt-6 text-2xl font-semibold">2TripleO 98.5 FM</p>
            <p className="mt-3 text-white/85">Presented by Shishirendu Jha</p>
            <p className="mt-5 text-sm leading-6 text-white/75">Tune in on FM in Sydney or listen online from anywhere. Sydney time follows local daylight saving changes.</p>
          </aside>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 sm:px-6 lg:px-8">
        <section id="listen" className="scroll-mt-24" aria-labelledby="listen-heading">
          <h2 id="listen-heading" className="text-3xl font-bold text-indigoInk">Listen wherever you are</h2>
          <p className="mt-3 max-w-3xl leading-7 text-indigoInk/80">Join us every Sunday, 8–9 am Sydney time. These links play the station’s live broadcast; outside our weekly hour, you will hear other 2TripleO programming.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {listeningLinks.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-indigoInk/15 bg-white p-6 transition hover:border-lotus-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lotus-700">
                <h3 className="text-lg font-bold text-lotus-700">{link.name} <span aria-hidden="true">↗</span></h3>
                <p className="mt-2 text-sm leading-6 text-indigoInk/80">{link.detail}</p>
                <span className="sr-only">Opens in a new tab</span>
              </a>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2" aria-labelledby="community-heading">
          <div className="space-y-4 leading-7 text-indigoInk/85">
            <h2 id="community-heading" className="text-3xl font-bold text-indigoInk">Connected by language. Rooted in Mithila.</h2>
            <p>Created to preserve, celebrate and promote the language and cultural heritage of Mithila, Mithila Gunj connects Maithils living in India, Nepal, Australia, the United States and across the world.</p>
            <p>The program was founded on a simple belief: wherever we may live, our mother language, shared memories and cultural traditions can keep us connected to our roots.</p>
            <p>Presented primarily in Maithili, complemented by Hindi and English, the program welcomes listeners of different generations.</p>
          </div>
          <div className="space-y-4 rounded-2xl bg-white p-7 leading-7 text-indigoInk/85">
            <h3 className="text-xl font-bold text-indigoInk">A voice for the global Maithil community</h3>
            <p>Mithila is one of South Asia’s oldest cultural regions and the sacred land of Maa Janaki. Its history is enriched by philosophers, poets and scholars such as King Janaka, Yajnavalkya, Gargi, Maitreyi and Mahakavi Vidyapati.</p>
            <p>For families away from their ancestral homeland, Mithila Gunj brings language, stories and traditions into their homes. Connecting Sydney with Darbhanga, Madhubani, Janakpur and beyond, it reminds us that distance need not weaken cultural belonging.</p>
          </div>
        </section>

        <section aria-labelledby="topics-heading">
          <h2 id="topics-heading" className="text-3xl font-bold text-indigoInk">What you will hear</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => <li key={topic} className="rounded-xl border-l-4 border-turmeric bg-white p-5 leading-7 text-indigoInk">{topic}</li>)}
          </ul>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 leading-7 text-indigoInk/85">
            <h2 className="text-3xl font-bold text-indigoInk">Our heritage, their future</h2>
            <p>Our children may grow up thousands of kilometres from Mithila, but they should still have the opportunity to hear its language, understand its stories and take pride in their cultural identity.</p>
            <p>Preserving a language means speaking it, singing its songs, sharing its literature and passing its stories from one generation to the next. Through radio, music and meaningful conversations, Mithila Gunj carries these traditions forward.</p>
          </div>
          <div className="space-y-4 rounded-2xl bg-indigoInk p-7 leading-7 text-white/85">
            <h2 className="text-2xl font-bold text-white">Your voice belongs here</h2>
            <p>Writers, musicians, artists, scholars, professionals, community organisers, families and young people are invited to share their knowledge, experiences and creative work.</p>
            <p>Whether you live in Mithila, Sydney, New York, London, Toronto, Kathmandu or anywhere else, your connection to Mithila can be celebrated here.</p>
            <a href="mailto:mithilaculturalsoc@gmail.com?subject=Mithila%20Gunj%20-%20Participation%20enquiry" className="inline-block font-bold text-turmeric underline underline-offset-4">Share your story with Mithila Gunj</a>
          </div>
        </section>

        <section className="rounded-2xl border border-indigoInk/15 bg-white p-7 sm:p-10" aria-labelledby="recognition-heading">
          <p className="text-sm font-semibold uppercase tracking-widest text-lotus-700">International recognition</p>
          <h2 id="recognition-heading" className="mt-3 text-2xl font-bold text-indigoInk">From Sydney to the wider world</h2>
          <p className="mt-4 max-w-3xl leading-7 text-indigoInk/85">US-based diaspora publication New India Abroad featured the program in “Mithila Gunj: Uniting the Global Maithil Diaspora,” recognising its mission to keep Maithili voices heard among families far from their ancestral homeland.</p>
          <a href="https://www.newindiaabroad.com/english/indian-diaspora-community/mithila-gunj-uniting-global-maithil-diaspora" target="_blank" rel="noopener noreferrer" className="mt-5 inline-block font-bold text-lotus-700 underline underline-offset-4">Read the New India Abroad feature <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
        </section>
        <p lang="hi" className="text-center text-2xl font-bold text-lotus-700">जय मिथिला! जय जानकी!</p>
      </div>
    </main>
  );
}
