import {
  advisors,
  coreCommittee,
  culturalImages
} from "@/data/placeholders";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { UpcomingEventPopup } from "@/components/sections/UpcomingEventPopup";
import { AnnouncementShowcase } from "@/components/sections/AnnouncementShowcase";
import {
  getPublicAnnouncements,
  getPublishedBlogPosts
} from "@/lib/content-data";

const yajmaanUrl = "https://events.humanitix.com/durga-puja/tickets";

const mahotsavMarquee =
  "Mithila Mahotsav 2026 - Mithila Welcomes Mahashakti, from 17-19 October 2026 at Quakers Hill Community Hall, Sydney";

const correctedTirhutaHeroText =
  "𑒧𑒱𑒟𑒱𑒪𑒰 𑒏𑒪𑓂𑒔𑒩𑒪 𑒮𑒻𑒮𑒰𑒃𑒙𑒲 𑒍𑒮𑓂𑒙𑓂𑒩𑒹𑒪𑒱𑒨𑒰 𑒮𑒰𑓀𑒮𑓂𑒏𑒵𑒞𑒱𑒏 𑒏𑒰𑒩𑓂𑒨𑒏𑓂𑒩𑒧, 𑒧𑒺𑒟𑒱𑒪𑒲 𑒦𑒰𑒭𑒰, 𑒧𑒡𑒳𑒥𑒢𑒲 𑒏𑒪𑒰, 𑒮𑒠𑒮𑓂𑒨𑒞𑒰, 𑒮𑓂𑒫𑒨𑓀𑒮𑒹𑒫𑒰 𑒂 𑒮𑒰𑒧𑒳𑒠𑒰𑒨𑒱𑒏 𑒮𑒯𑒨𑒻𑒑𑒏 𑒧𑒰𑒡𑓂𑒨𑒧𑒮𑒿 𑒮𑒧𑓂𑒣𑒴𑒩𑓂𑒝 𑒍𑒮𑓂𑒙𑓂𑒩𑒹𑒪𑒱𑒨𑒰𑒧𑒹 𑒥𑒮𑒪 𑒧𑒺𑒟𑒱𑒪 𑒮𑒦𑒏𑒹𑒿 𑒋𑒏 𑒮𑒴𑒞𑓂𑒩𑒧𑒹 𑒖𑒻𑒛𑓃𑒺𑒞 𑒁𑒕𑒱 𑒂 𑒧𑒱𑒟𑒱𑒪𑒰𑒏 𑒫𑒱𑒩𑒰𑒮𑒞𑒏𑒹𑒿 𑒖𑒲𑒫𑒱𑒞 𑒩𑒐𑒺𑒞 𑒁𑒕𑒱।";

const maithiliDevanagariHeroText =
  "मिथिला कल्चरल सोसाइटी ऑस्ट्रेलिया सांस्कृतिक कार्यक्रम, मैथिली भाषा, मधुबनी कला, सदस्यता, स्वयंसेवा आ सामुदायिक सहयोगक माध्यमसँ सम्पूर्ण ऑस्ट्रेलियामे बसल मैथिल सभकेँ एक सूत्रमे जोड़ैत अछि आ मिथिलाक विरासतकेँ जीवित रखैत अछि।";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [blogPosts, announcements] = await Promise.all([
    getPublishedBlogPosts(),
    getPublicAnnouncements()
  ]);
  const latestBlogPosts = blogPosts.slice(0, 3);
  const latestAnnouncements = announcements.slice(0, 3);
  const scrollingHighlights = Array.from({ length: 6 }, () => mahotsavMarquee);

  return (
    <main>
      <UpcomingEventPopup yajmaanUrl={yajmaanUrl} />

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8 lg:py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-lotus-700">
            Mithila Cultural Society Australia
          </p>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-indigoInk sm:text-4xl">
            Preserving Mithila Heritage, Building Community in Australia
          </h1>
          <p className="mt-4 text-base leading-7 text-indigoInk/75">
            The Mithila Cultural Society Australia (MCSA) is a registered
            not-for-profit community organization established to preserve,
            promote, and celebrate the rich linguistic, artistic, and cultural
            heritage of the Mithila region.
          </p>
          <p className="mt-3 text-sm leading-6 text-indigoInk/70">
            Founded by a group of passionate Maithil families across Australia,
            our society serves as a home away from home. We are dedicated to
            fostering unity, cultural education, and social connection among the
            Maithil diaspora while introducing the wider Australian community to
            our vibrant traditions - from Madhubani art and folk music to our
            timeless festivals and cuisine.
          </p>
          <p
            lang="mai-Tirh"
            className="font-tirhuta mt-5 border-l-2 border-lotus-500 pl-4 text-sm leading-7 text-lotus-700"
          >
            {correctedTirhutaHeroText}
          </p>
          <p
            lang="mai"
            className="mt-3 border-l-2 border-lotus-100 pl-4 text-sm leading-6 text-indigoInk/65"
          >
            {maithiliDevanagariHeroText}
          </p>
        </div>
        <HeroCarousel images={culturalImages} />
      </section>

      <section className="overflow-hidden border-y border-indigoInk/10 bg-white">
        <div className="flex w-max animate-scroll-x gap-3 py-4">
          {scrollingHighlights.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="rounded-full border border-lotus-100 bg-lotus-50 px-5 py-2 text-sm font-semibold text-indigoInk"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <p className="text-sm font-semibold uppercase tracking-wide text-lotus-700">
              Our Vision
            </p>
            <h2 className="mt-3 text-2xl font-bold text-indigoInk">
              Traditions of Mithila alive for future generations
            </h2>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-indigoInk/75">
              <li>
                To keep the traditions of Mithila alive for future generations,
                no matter where in the world we are.
              </li>
            </ul>
          </Card>

          <Card>
            <p className="text-sm font-semibold uppercase tracking-wide text-lotus-700">
              Our Values
            </p>
            <h2 className="mt-3 text-2xl font-bold text-indigoInk">
              The principles that guide our community
            </h2>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-indigoInk/75">
              <li>
                <span className="font-semibold text-indigoInk">
                  Inclusivity:
                </span>{" "}
                Welcoming all Maithils and friends of Mithila.
              </li>
              <li>
                <span className="font-semibold text-indigoInk">
                  Cultural Preservation:
                </span>{" "}
                Passing down our language (Maithili) and rituals.
              </li>
              <li>
                <span className="font-semibold text-indigoInk">
                  Community Service:
                </span>{" "}
                Supporting our members through social and cultural events.
              </li>
            </ul>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mb-6 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-lotus-700">
            Leadership
          </p>
          <h2 className="mt-3 text-3xl font-bold text-indigoInk">
            Elected members
          </h2>
          <p className="mt-4 text-base leading-7 text-indigoInk/70">
            The elected members support governance, events, membership and
            community programs for Mithila Cultural Society Australia.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coreCommittee.map((person) => (
            <Card key={person.name}>
              <div className="grid size-16 place-items-center rounded-full border border-lotus-100 bg-lotus-50 text-xl font-bold text-lotus-700">
                {person.name
                  .split(" ")
                  .map((part) => part.charAt(0))
                  .join("")}
              </div>
              <h3 className="mt-5 text-lg font-bold text-indigoInk">
                {person.name}
              </h3>
              <p className="mt-1 text-sm font-semibold text-lotus-700">
                {person.role}
              </p>
              <p className="mt-1 text-sm font-semibold text-indigoInk/70">
                {person.phone}
              </p>
              <p className="mt-3 text-sm leading-6 text-indigoInk/70">
                {person.focus}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-lotus-50/60">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-6 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-lotus-700">
              Guidance
            </p>
            <h2 className="mt-3 text-3xl font-bold text-indigoInk">
              Advisors and guides
            </h2>
            <p className="mt-4 text-base leading-7 text-indigoInk/70">
              Our advisors guide Mithila Cultural Society Australia with
              experience, cultural understanding and strategic direction so the
              organisation continues moving in the right direction.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {advisors.map((person) => (
              <Card key={person.name}>
                <div className="grid size-16 place-items-center rounded-full border border-lotus-100 bg-white text-lg font-bold text-lotus-700">
                  {person.name
                    .replace("Sri ", "")
                    .replace("Smt. ", "")
                    .replace("Dr. ", "")
                    .replace(" Ji", "")
                    .split(" ")
                    .map((part) => part.charAt(0))
                    .join("")}
                </div>
                <h3 className="text-lg font-bold text-indigoInk">
                  {person.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-lotus-700">
                  {person.role}
                </p>
                <p className="mt-3 text-sm leading-6 text-indigoInk/70">
                  {person.focus}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Card className="overflow-hidden p-0 lg:col-span-2">
          <div className="relative">
            <Image
              src="/images/mahotsav-invitation-card.png"
              alt="Upcoming event invitation for Celebrate Durga Puja and Mithila Mahotsav 2026"
              width={1104}
              height={579}
              className="h-auto w-full"
            />
            <a
              href={yajmaanUrl}
              aria-label="Become Our Yajmaan"
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-[6%] left-[12%] h-[16%] w-[35%] rounded-md focus:outline-none focus:ring-4 focus:ring-turmeric/70"
            >
              <span className="sr-only">Become Our Yajmaan</span>
            </a>
          </div>
        </Card>
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-bold text-indigoInk">Latest stories</h2>
          <div className="mt-4 grid gap-3">
            {latestBlogPosts.map((post) => (
              <div key={post.id} className="rounded-md bg-lotus-50 p-4">
                <p className="font-semibold text-indigoInk">{post.title}</p>
                <p className="text-sm text-indigoInk/65">{post.excerpt}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <AnnouncementShowcase announcements={latestAnnouncements} />

    </main>
  );
}
