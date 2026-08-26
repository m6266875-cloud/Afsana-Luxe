import { Button, Reveal, SectionHeading, SmartImage } from "../components/ui";
import { useStore } from "../store/StoreContext";
import { formatPKR } from "../lib/format";

const chapters = [
  {
    year: "2021",
    title: "A lapel pin and a leap of faith",
    text: "Afsana Luxe began as a single Instagram page run from a bedroom in Lahore, selling hand-picked gold-plated bracelets to friends and cousins.",
  },
  {
    year: "2023",
    title: "From page to maison",
    text: "Demand outgrew the spare room. We moved into a small studio in Gulberg III, hired our first two artisans and introduced the Afsana Luxe gift box.",
  },
  {
    year: "2024",
    title: "Watches join the family",
    text: "Customers asked for a slim, feminine watch that didn't cost a month's salary. Our first mesh-bracelet design sold out in eleven days.",
  },
  {
    year: "2026",
    title: "Thirty pieces, one promise",
    text: "Today the cabinet holds thirty-plus designs — every one priced between Rs. 400 and Rs. 2,000, delivered cash-on-delivery across Pakistan.",
  },
];

const values = [
  {
    title: "Honest pricing",
    text: "Nothing in our cabinet costs more than Rs. 2,000. Luxury should not require a loan.",
  },
  {
    title: "Craft over quantity",
    text: "Small batches, hand-polished finishes, and a quality check on every single piece.",
  },
  {
    title: "Trust first",
    text: "Cash on delivery, seven-day returns and a real human on WhatsApp.",
  },
];

export default function About() {
  const { brand, products } = useStore();

  return (
    <>
      {/* hero */}
      <section className="relative isolate overflow-hidden bg-cocoa-950 text-cream-100">
        <div className="absolute inset-0">
          <SmartImage
            src="/images/cta.jpg"
            alt="Afsana Luxe collection flat lay"
            priority
            wrapperClassName="h-full w-full"
            className="opacity-40"
            fallback="https://images.pexels.com/photos/8306531/pexels-photo-8306531.jpeg?auto=compress&cs=tinysrgb&w=1600"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cocoa-950 via-cocoa-950/85 to-cocoa-950/40" />
        </div>
        <div className="container-lux relative py-24 md:py-32">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-[0.55rem] text-gold-300">
              <span className="h-px w-10 bg-gold-400/70" />
              Our Story · Est. {brand.since}
            </p>
            <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] font-light sm:text-5xl md:text-6xl">
              Every piece is a chapter of <span className="text-gold-300 italic">your</span> afsana.
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed font-light text-cream-200/80">
              Afsana means story. We build jewellery and watches for Pakistani women who want
              elegance without pretence — plated in 18K gold, finished by hand in Lahore, and priced
              so that beauty stays everyday.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button to="/shop" size="lg">
                Shop the Collection
              </Button>
              <Button href={brand.instagram} variant="outlineLight" size="lg">
                {brand.instagramHandle}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* story */}
      <section className="container-lux grid items-center gap-14 py-20 md:py-28 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="The Brand"
            title="Our products add beauty to your arm."
            description="What started as a hobby between two friends is now a small maison with a simple rule: never ship anything we wouldn't wear to a mehndi ourselves."
          />
          <div className="mt-8 space-y-5 text-[0.92rem] leading-relaxed font-light text-cocoa-600">
            <p>
              We design in Lahore, working with a family-run workshop that has plated jewellery for
              three generations. Each design begins as a sketch, becomes a brass prototype, and only
              enters the cabinet once it survives a week of real wear — chai, dupattas, office desks
              and all.
            </p>
            <p>
              Our watches use Japanese quartz movements and stainless or brass cases with 18K
              plating. Our jewellery is nickel-safe and anti-tarnish coated, because Pakistani
              summers are unkind to cheap metal.
            </p>
            <p>
              Everything ships in the signature Afsana Luxe box with a care card and polishing
              cloth. If a piece ever disappoints you, we make it right — that is the afsana promise.
            </p>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-cream-300 pt-8">
            {[
              [`${products.length}+`, "Designs"],
              ["4.8★", "Avg. rating"],
              ["20k+", "Orders shipped"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-display text-3xl text-cocoa-900">{value}</dt>
                <dd className="eyebrow mt-1 text-[0.5rem] text-gold-500">{label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="grid grid-cols-2 gap-4">
            <SmartImage
              src="/images/atelier.jpg"
              alt="Goldsmith at work in the Afsana Luxe studio"
              wrapperClassName="aspect-3/4 w-full rounded-sm"
              className="object-cover"
              fallback="https://images.pexels.com/photos/13325937/pexels-photo-13325937.jpeg?auto=compress&cs=tinysrgb&w=1000"
            />
            <div className="space-y-4 pt-10">
              <SmartImage
                src="/images/watch-2.jpg"
                alt="Rose gold Afsana Luxe watch"
                wrapperClassName="aspect-square w-full rounded-sm"
                className="object-cover"
                fallback="https://images.pexels.com/photos/13273982/pexels-photo-13273982.jpeg?auto=compress&cs=tinysrgb&w=1000"
              />
              <div className="bg-cocoa-900 p-6 text-cream-100">
                <p className="font-display text-2xl font-light italic">“{brand.tagline}”</p>
                <p className="eyebrow mt-3 text-[0.5rem] text-gold-400">
                  Since {brand.since} · {brand.city}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* timeline */}
      <section className="border-y border-cream-300 bg-cream-100 py-20 md:py-28">
        <div className="container-lux">
          <Reveal>
            <SectionHeading eyebrow="Chapters" title="How the afsana unfolded" />
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {chapters.map((chapter, index) => (
              <Reveal key={chapter.year} delay={index * 0.08}>
                <div className="h-full border-t border-cocoa-900/20 pt-6">
                  <p className="font-display text-4xl font-light text-gold-500">{chapter.year}</p>
                  <h3 className="mt-3 font-display text-xl text-cocoa-900">{chapter.title}</h3>
                  <p className="mt-3 text-[0.85rem] leading-relaxed font-light text-cocoa-500">
                    {chapter.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* leadership */}
      <section id="leadership" className="container-lux scroll-mt-32 py-20 md:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Leadership"
            title="The people behind the maison"
            description="Two people, one obsession with finishing things properly."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {[
            {
              role: brand.ceo.role,
              name: brand.ceo.name,
              handle: brand.ceo.handle,
              bio: "Zain founded Afsana Luxe in 2021 and still approves every prototype personally. He looks after sourcing, plating quality and the partnerships that keep our prices under Rs. 2,000.",
              focus: ["Sourcing & plating", "Product design", "Brand direction"],
              image: "/images/hero.jpg",
              fallback:
                "https://images.pexels.com/photos/18285660/pexels-photo-18285660.jpeg?auto=compress&cs=tinysrgb&w=1000",
            },
            {
              role: brand.manager.role,
              name: brand.manager.name,
              handle: brand.manager.handle,
              bio: "Ayesha runs the day-to-day — customer care, packaging, dispatch and the Instagram feed our customers love. If you have messaged us on WhatsApp, you have probably spoken to her.",
              focus: ["Client care", "Packaging & dispatch", "Social & styling"],
              image: "/images/watch-1.jpg",
              fallback:
                "https://images.pexels.com/photos/29986286/pexels-photo-29986286.jpeg?auto=compress&cs=tinysrgb&w=1000",
            },
          ].map((person, index) => (
            <Reveal key={person.handle} delay={index * 0.1}>
              <article className="group flex h-full flex-col border border-cream-300 bg-cream-100">
                <div className="relative overflow-hidden">
                  <SmartImage
                    src={person.image}
                    alt={`${brand.name} ${person.role}`}
                    wrapperClassName="aspect-16/10 w-full"
                    className="transition-transform duration-[1200ms] group-hover:scale-105"
                    fallback={person.fallback}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cocoa-950/80 via-transparent to-transparent" />
                  <p className="eyebrow absolute bottom-4 left-5 text-[0.5rem] text-gold-300">
                    {person.role}
                  </p>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-3xl text-cocoa-900">{person.name}</h3>
                  <a
                    href={`https://instagram.com/${person.handle.replace("@", "")}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="eyebrow mt-2 self-start text-[0.55rem] text-gold-500 underline decoration-gold-300 underline-offset-4 transition hover:text-cocoa-900"
                  >
                    {person.handle}
                  </a>
                  <p className="mt-5 text-[0.88rem] leading-relaxed font-light text-cocoa-600">
                    {person.bio}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2 border-t border-cream-300 pt-5">
                    {person.focus.map((item) => (
                      <span
                        key={item}
                        className="eyebrow border border-cream-300 bg-cream-50 px-3 py-1.5 text-[0.5rem] text-cocoa-600"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* values */}
      <section className="bg-cream-200/60 py-20 md:py-24">
        <div className="container-lux grid gap-10 md:grid-cols-3">
          {values.map((value, index) => (
            <Reveal key={value.title} delay={index * 0.08}>
              <div className="border-t border-cocoa-900/20 pt-6">
                <p className="eyebrow text-[0.5rem] text-gold-500">0{index + 1}</p>
                <h3 className="mt-3 font-display text-2xl text-cocoa-900">{value.title}</h3>
                <p className="mt-3 text-[0.88rem] leading-relaxed font-light text-cocoa-500">
                  {value.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* cta */}
      <section className="container-lux py-20 text-center md:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Join us"
            title="Wear the story"
            description={`Thirty-plus pieces, every one between ${formatPKR(400)} and ${formatPKR(
              2000,
            )} — delivered cash on delivery across Pakistan.`}
          />
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/shop" size="lg">
              Shop the Collection
            </Button>
            <Button to="/contact" variant="outline" size="lg">
              Talk to Us
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
