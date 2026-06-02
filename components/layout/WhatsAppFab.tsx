import { site } from "@/config/site";
import { MessageCircle } from "lucide-react";

export const WhatsAppFab = () => (
  <a
    href={`https://wa.me/${site.whatsapp}?text=Hello%2C%20I%20am%20interested%20in%20your%20medical%20equipment.`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="group fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-success text-success-foreground shadow-elevated transition-transform hover:scale-105"
  >
    <MessageCircle className="h-6 w-6" />
    <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-md bg-foreground/95 px-3 py-1.5 text-xs font-medium text-background shadow-card-soft sm:group-hover:block">
      Chat with us
    </span>
  </a>
);
