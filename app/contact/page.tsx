"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/config/site";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(5).max(2000),
});

export default function ContactPage() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd.entries()));
    if (!parsed.success) {
      //   toast.error("Please fill in name, email and message.");
      return;
    }
    (e.target as HTMLFormElement).reset();
    // toast.success("Message sent — we'll reply shortly.");
  };

  return (
    <>
      <section className="border-b border-border bg-gradient-soft">
        <div className="container-tight py-14 sm:py-20">
          <span className="eyebrow">Contact</span>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            We'd love to hear from you.
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Talk to a biomedical engineer, request a quote or visit our
            headquarters. We respond within one business day.
          </p>
        </div>
      </section>

      <section className="container-tight py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card-soft">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Headquarters
                  </p>
                  <p className="font-medium">{site.address}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card-soft">
                <Phone className="h-5 w-5 text-primary" />
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Phone
                </p>
                <a
                  href={`tel:${site.phone}`}
                  className="mt-1 block font-display text-lg font-semibold hover:text-primary"
                >
                  {site.phone}
                </a>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card-soft">
                <Mail className="h-5 w-5 text-primary" />
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Email
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-1 block font-display text-base font-semibold hover:text-primary break-all"
                >
                  {site.email}
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-card-soft">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <p className="font-medium">{site.hours}</p>
              </div>
            </div>

            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-2xl border border-success/30 bg-success/10 p-6 transition-colors hover:bg-success/15"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-success">
                  Fastest response
                </p>
                <p className="mt-1 font-display text-lg font-semibold">
                  Message us on WhatsApp
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-success text-success-foreground">
                <MessageCircle className="h-5 w-5" />
              </div>
            </a>

            {/* Map */}
            <div className="overflow-hidden rounded-2xl border border-border shadow-card-soft">
              <iframe
                title="MediCore HQ map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d434.30480169580966!2d90.41262589692099!3d23.74373981202758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b861e8c62ad9%3A0x7eb53f043a1a2aae!2sMouchak%20Tower%2C%2083%2FB%20Shiddheswari%20-%20Malibag%20Mor%20Rd%2C%20Dhaka%201205!5e1!3m2!1sen!2sbd!4v1777485737261!5m2!1sen!2sbdhttps://maps.app.goo.gl/DPgoXMnwJoh7cMrj8"
                className="h-76 w-full"
                loading="lazy"
              />
            </div>
          </div>
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-border bg-card p-6 shadow-card-soft sm:p-8"
          >
            <h2 className="font-display text-xl font-bold">
              Send us a message
            </h2>
            <div className="mt-5 grid gap-4">
              <div>
                <Label htmlFor="cname">Name *</Label>
                <Input
                  id="cname"
                  name="name"
                  required
                  maxLength={80}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="cemail">Email *</Label>
                <Input
                  id="cemail"
                  type="email"
                  name="email"
                  required
                  maxLength={200}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="cmsg">Message *</Label>
                <Textarea
                  id="cmsg"
                  name="message"
                  rows={6}
                  required
                  maxLength={2000}
                  className="mt-1.5"
                />
              </div>
              <Button
                type="submit"
                variant="primary_cta"
                size="lg"
                className="mt-2"
              >
                Send message
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
