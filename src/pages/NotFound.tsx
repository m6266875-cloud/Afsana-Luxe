import { Button, Reveal } from "../components/ui";

export default function NotFound() {
  return (
    <section className="container-lux flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <Reveal>
        <p className="eyebrow text-[0.55rem] text-gold-500">Error 404</p>
        <h1 className="mt-5 font-display text-6xl leading-none font-light text-cocoa-900 sm:text-7xl">
          A missing chapter
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed font-light text-cocoa-500">
          The page you are looking for has been moved or no longer exists. Let us take you back to
          the collection.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button to="/">Back to Home</Button>
          <Button to="/shop" variant="outline">
            Shop the Collection
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
