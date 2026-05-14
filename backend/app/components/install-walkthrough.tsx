// backend/app/components/install-walkthrough.tsx

import Image from "next/image";

type Tile = {
  src: string;
  alt: string;
  caption: string;
};

const TILES: Tile[] = [
  {
    src: "/walkthrough/01-install.png",
    alt: "WinBack listing in the Stripe App Marketplace with the Install button visible",
    caption: "Install from the Stripe App Marketplace.",
  },
  {
    src: "/walkthrough/02-open-dispute.png",
    alt: "Stripe Dashboard dispute view with WinBack open in the side panel",
    caption:
      "Open any dispute in your dashboard. WinBack is right there in the side panel.",
  },
  {
    src: "/walkthrough/03-playbook.png",
    alt: "WinBack reason-code playbook open inside the dispute view",
    caption:
      "Get the reason-code playbook: what evidence wins, what doesn't, and why.",
  },
  {
    src: "/walkthrough/04-submit.png",
    alt: "WinBack narrative preview with AI-drafted dispute response ready to submit",
    caption:
      "Review your AI-drafted narrative, edit anything, submit on your terms.",
  },
];

export function InstallWalkthrough() {
  return (
    <section
      id="walkthrough"
      className="max-w-7xl mx-auto px-6 py-16 md:py-32"
    >
      <div className="text-center mb-10 md:mb-16 space-y-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-[family-name:var(--font-plus-jakarta)] font-extrabold text-white tracking-tighter">
          See it in your Stripe Dashboard.
        </h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto">
          From the Stripe App Marketplace to a submitted dispute response, the
          four-step path.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {TILES.map((tile) => (
          <figure
            key={tile.src}
            className="bg-surface-low rounded-2xl border border-white/5 p-2 flex flex-col gap-3"
          >
            <div className="aspect-[4/3] relative bg-surface-container rounded-xl overflow-hidden">
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              />
            </div>
            <figcaption className="text-on-surface-variant text-sm px-2 pb-2">
              {tile.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
