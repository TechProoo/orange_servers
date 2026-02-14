import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Globe, Mail, Plus, Trash2, User } from "lucide-react";

type SiteNeed =
  | "migration"
  | "performance"
  | "security"
  | "management"
  | "not_sure";

type SiteInfo = {
  id: string;
  url: string;
  currentHost: string;
  monthlyVisitors: string;
  primaryNeed: SiteNeed;
  notes: string;
};

type QuoteForm = {
  name: string;
  email: string;
  company: string;
  sites: SiteInfo[];
};

type SubmitState = "idle" | "submitting" | "success";

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function newSite(): SiteInfo {
  return {
    id: makeId(),
    url: "",
    currentHost: "",
    monthlyVisitors: "",
    primaryNeed: "not_sure",
    notes: "",
  };
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

const Pricing = () => {
  const reduceMotion = useReducedMotion() ?? false;
  const easeOut = [0.16, 1, 0.3, 1] as const;

  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<QuoteForm>(() => ({
    name: "",
    email: "",
    company: "",
    sites: [newSite()],
  }));

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const isSubmitting = submitState === "submitting";
  const isSuccess = submitState === "success";

  const isLocked = isSubmitting || isSuccess;

  const canRemoveSite = form.sites.length > 1 && !isLocked;

  const summary = useMemo(() => {
    const urlCount = form.sites.filter((s) => s.url.trim().length > 0).length;
    return {
      totalSites: form.sites.length,
      urlsFilled: urlCount,
    };
  }, [form.sites]);

  function update<K extends keyof QuoteForm>(key: K, value: QuoteForm[K]) {
    setError(null);
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateSite(siteId: string, patch: Partial<SiteInfo>) {
    setError(null);
    setForm((prev) => ({
      ...prev,
      sites: prev.sites.map((s) => (s.id === siteId ? { ...s, ...patch } : s)),
    }));
  }

  function addSite() {
    setError(null);
    setForm((prev) => ({ ...prev, sites: [...prev.sites, newSite()] }));
  }

  function removeSite(siteId: string) {
    setError(null);
    setForm((prev) => ({
      ...prev,
      sites: prev.sites.filter((s) => s.id !== siteId),
    }));
  }

  function reset() {
    setError(null);
    setSubmitState("idle");
    setForm({ name: "", email: "", company: "", sites: [newSite()] });
  }

  function validate(): string | null {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.trim()) return "Please enter your email.";
    if (!isValidEmail(form.email)) return "Please enter a valid email.";

    const hasAtLeastOneUrl = form.sites.some((s) => s.url.trim().length > 0);
    if (!hasAtLeastOneUrl) return "Please add at least one website URL.";
    return null;
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting || isSuccess) return;

    const msg = validate();
    setError(msg);
    if (msg) return;

    setSubmitState("submitting");

    timeoutRef.current = window.setTimeout(() => {
      setSubmitState("success");
    }, 1800);
  }

  return (
    <section id="pricing" className="pricing_section">
      <div className="pricing_container">
        <header className="pricing_header">
          <h2 className="pricing_title">Get a quote</h2>
          <p className="pricing_subtitle">
            Tell us about your WordPress site(s) and we’ll recommend the best
            plan for speed, security, and near‑zero downtime.
          </p>
        </header>

        <div className="quote_layout">
          <div className="quote_info">
            <div className="quote_kicker">Quick estimate</div>
            <h3 className="quote_heading">
              Managed WordPress, tailored to you
            </h3>
            <p className="quote_copy">
              Add one or multiple websites. We’ll review your needs (migration,
              performance, security, or ongoing management) and reply with a
              recommended plan and next steps.
            </p>

            <div className="quote_stats" aria-label="Form summary">
              <div className="quote_stat">
                <div className="quote_statLabel">Websites</div>
                <div className="quote_statValue">{summary.totalSites}</div>
              </div>
              <div className="quote_stat">
                <div className="quote_statLabel">URLs filled</div>
                <div className="quote_statValue">{summary.urlsFilled}</div>
              </div>
            </div>

            <div className="quote_note">
              No payment required. This is just a quote request.
            </div>
          </div>

          <motion.form
            className="quote_form"
            onSubmit={onSubmit}
            initial={
              reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={
              reduceMotion ? { duration: 0 } : { duration: 0.7, ease: easeOut }
            }
            aria-label="Quote request form"
          >
            <div className="quote_formHeader">
              <div className="quote_formTitle">Your details</div>
              {isSuccess ? (
                <button type="button" className="quote_reset" onClick={reset}>
                  Start over
                </button>
              ) : null}
            </div>

            <div className="quote_fields2">
              <label className="quote_field">
                <span className="quote_label">
                  <User size={16} /> Name
                </span>
                <input
                  className="quote_input"
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Your full name"
                  required
                  disabled={isLocked}
                />
              </label>

              <label className="quote_field">
                <span className="quote_label">
                  <Mail size={16} /> Email
                </span>
                <input
                  className="quote_input"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@company.com"
                  required
                  disabled={isLocked}
                />
              </label>
            </div>

            <label className="quote_field">
              <span className="quote_label">Company (optional)</span>
              <input
                className="quote_input"
                type="text"
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                placeholder="Business / brand"
                disabled={isLocked}
              />
            </label>

            <div className="quote_divider" role="separator" aria-hidden />

            <div className="quote_formHeader">
              <div className="quote_formTitle">Website information</div>
              <button
                type="button"
                className="quote_add"
                onClick={addSite}
                disabled={isLocked}
              >
                <Plus size={16} /> Add website
              </button>
            </div>

            <div className="quote_sites">
              {form.sites.map((site, idx) => (
                <div key={site.id} className="quote_siteCard">
                  <div className="quote_siteHeader">
                    <div className="quote_siteTitle">Website {idx + 1}</div>
                    <button
                      type="button"
                      className="quote_remove"
                      onClick={() => removeSite(site.id)}
                      disabled={!canRemoveSite}
                      aria-disabled={!canRemoveSite}
                      title={
                        canRemoveSite
                          ? "Remove this website"
                          : "At least one website is required"
                      }
                    >
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>

                  <div className="quote_fields2">
                    <label className="quote_field">
                      <span className="quote_label">
                        <Globe size={16} /> Website URL
                      </span>
                      <input
                        className="quote_input"
                        type="url"
                        value={site.url}
                        onChange={(e) =>
                          updateSite(site.id, { url: e.target.value })
                        }
                        placeholder="https://example.com"
                        disabled={isLocked}
                        inputMode="url"
                      />
                    </label>

                    <label className="quote_field">
                      <span className="quote_label">
                        Current host (optional)
                      </span>
                      <input
                        className="quote_input"
                        type="text"
                        value={site.currentHost}
                        onChange={(e) =>
                          updateSite(site.id, { currentHost: e.target.value })
                        }
                        placeholder="e.g. Namecheap, GoDaddy, AWS"
                        disabled={isLocked}
                      />
                    </label>
                  </div>

                  <div className="quote_fields2">
                    <label className="quote_field">
                      <span className="quote_label">
                        Monthly visitors (optional)
                      </span>
                      <input
                        className="quote_input"
                        type="number"
                        min={0}
                        value={site.monthlyVisitors}
                        onChange={(e) =>
                          updateSite(site.id, {
                            monthlyVisitors: e.target.value,
                          })
                        }
                        placeholder="e.g. 25000"
                        disabled={isLocked}
                      />
                    </label>

                    <label className="quote_field">
                      <span className="quote_label">Primary need</span>
                      <select
                        className="quote_input"
                        value={site.primaryNeed}
                        onChange={(e) =>
                          updateSite(site.id, {
                            primaryNeed: e.target.value as SiteNeed,
                          })
                        }
                        disabled={isLocked}
                      >
                        <option value="not_sure">Not sure yet</option>
                        <option value="migration">
                          Migration / onboarding
                        </option>
                        <option value="performance">Performance tuning</option>
                        <option value="security">Security hardening</option>
                        <option value="management">Ongoing management</option>
                      </select>
                    </label>
                  </div>

                  <label className="quote_field">
                    <span className="quote_label">Notes (optional)</span>
                    <textarea
                      className="quote_textarea"
                      value={site.notes}
                      onChange={(e) =>
                        updateSite(site.id, { notes: e.target.value })
                      }
                      placeholder="Any issues you’ve noticed, goals, plugin/theme details, etc."
                      rows={3}
                      disabled={isLocked}
                    />
                  </label>
                </div>
              ))}
            </div>

            <AnimatePresence>
              {isSuccess ? (
                <motion.div
                  className="quote_success"
                  role="status"
                  initial={
                    reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
                  }
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.22, ease: easeOut }
                  }
                >
                  Request received. We’ll email you shortly.
                </motion.div>
              ) : null}
            </AnimatePresence>

            <AnimatePresence>
              {error ? (
                <motion.div
                  className="quote_error"
                  role="alert"
                  initial={
                    reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
                  }
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.22, ease: easeOut }
                  }
                >
                  {error}
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="quote_actions">
              <button
                type="submit"
                className="quote_submit"
                disabled={isLocked}
              >
                {isSubmitting ? (
                  <span className="quote_submitInner">
                    <LoaderDots reduceMotion={reduceMotion} />
                    Submitting…
                  </span>
                ) : isSuccess ? (
                  "Submitted ✓"
                ) : (
                  "Request quote"
                )}
              </button>

              <div className="quote_hint">
                {isSuccess
                  ? "We’ll reach out to you shortly."
                  : "We’ll reply within 1 business day."}
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

function LoaderDots({ reduceMotion }: { reduceMotion: boolean }) {
  const dot = {
    initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 0 },
    animate: reduceMotion
      ? { opacity: 1, y: 0 }
      : {
          opacity: [0.35, 1, 0.35],
          y: [0, -4, 0],
        },
  } as const;

  const transition = reduceMotion
    ? ({ duration: 0 } as const)
    : ({ duration: 0.75, repeat: Infinity, ease: "easeInOut" } as const);

  return (
    <span className="quote_loader" aria-hidden>
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.span
          key={i}
          className="quote_loaderDot"
          variants={dot}
          initial="initial"
          animate="animate"
          transition={{ ...transition, delay: reduceMotion ? 0 : i * 0.12 }}
        />
      ))}
    </span>
  );
}
