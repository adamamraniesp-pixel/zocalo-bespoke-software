import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, PhoneIncoming, Play, RotateCcw } from "lucide-react";
import { Reveal, useReducedMotion } from "./motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const transcript = [
  { time: "10:32:15", text: "🔹 Lead captured: John Doe" },
  { time: "10:32:22", text: "📞 Phone verified: +1 555-0142" },
  { time: "10:32:30", text: "📋 Service: Roofing estimate" },
  { time: "10:32:45", text: "📂 Case ID: #R-2026-0842" },
  { time: "10:33:02", text: "✅ AI qualification: High intent" },
  { time: "10:33:18", text: "📤 Pushed to CRM: Salesforce" },
];

/** Timeline (ms from start) for each stage of the sequence. */
const T = {
  ring: 300,
  answer: 1500,
  transcriptStart: 2200,
  transcriptStep: 1300,
  card: 7600,
  logged: 8600,
  loop: 10600,
};

type Stage = {
  ringing: boolean;
  answered: boolean;
  lines: number;
  card: boolean;
  logged: boolean;
};

const EMPTY: Stage = { ringing: false, answered: false, lines: 0, card: false, logged: false };
const FINAL: Stage = { ringing: false, answered: true, lines: transcript.length, card: true, logged: true };

export function LiveDemo() {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<Stage>(EMPTY);
  const [playing, setPlaying] = useState(true);
  const [runKey, setRunKey] = useState(0);
  const timers = useRef<number[]>([]);

  const clear = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  useEffect(() => {
    clear();
    if (reduced) {
      setStage(FINAL);
      return;
    }
    if (!playing) return;

    setStage(EMPTY);
    const at = (ms: number, fn: () => void) => {
      timers.current.push(window.setTimeout(fn, ms));
    };

    at(T.ring, () => setStage((s) => ({ ...s, ringing: true })));
    at(T.answer, () => setStage((s) => ({ ...s, ringing: false, answered: true })));
    transcript.forEach((_, i) => {
      at(T.transcriptStart + i * T.transcriptStep, () => setStage((s) => ({ ...s, lines: i + 1 })));
    });
    at(T.card, () => setStage((s) => ({ ...s, card: true })));
    at(T.logged, () => setStage((s) => ({ ...s, logged: true })));
    at(T.loop, () => setRunKey((k) => k + 1));

    return clear;
  }, [runKey, playing, reduced, clear]);

  return (
    <section className="section relative overflow-hidden border-t border-border">
      <div className="container-x relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="eyebrow">Live Demo</p>
            </Reveal>
            <Reveal delay={50}>
              <h2 className="mt-6 max-w-xl text-3xl leading-[1.15] font-medium tracking-display md:text-[2.6rem]">
                Watch an after-hours call become a lead
              </h2>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <p className="max-w-xs text-sm leading-[1.7] text-muted-foreground">
              A simplified view of a system running in production: call answered, transcribed, qualified, and
              logged—without anyone picking up.
            </p>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div className="demo-chrome mt-12 overflow-hidden rounded-lg border border-[color-mix(in_oklab,var(--primary)_22%,transparent)]">
            {/* window bar */}
            <div className="flex items-center justify-between gap-4 border-b border-[color-mix(in_oklab,white_10%,transparent)] px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-gold/80" />
                <span className="size-2.5 rounded-full bg-primary/60" />
                <span className="size-2.5 rounded-full bg-[color-mix(in_oklab,white_28%,transparent)]" />
                <span className="ml-3 font-mono text-[0.7rem] tracking-[0.18em] text-[color-mix(in_oklab,white_62%,transparent)] uppercase">
                  ops console · 02:14
                </span>
              </div>
              <div className="flex items-center gap-2">
                {!reduced ? (
                  <button
                    type="button"
                    onClick={() => setPlaying((p) => !p)}
                    aria-label={playing ? "Pause demo" : "Play demo"}
                    className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,white_18%,transparent)] px-3 py-1.5 text-[0.7rem] tracking-[0.1em] text-[color-mix(in_oklab,white_78%,transparent)] uppercase transition-colors duration-200 hover:border-gold hover:text-gold"
                  >
                    {playing ? <Pause className="size-3" /> : <Play className="size-3" />}
                    {playing ? "Pause" : "Play"}
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => {
                    setPlaying(true);
                    setRunKey((k) => k + 1);
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,white_18%,transparent)] px-3 py-1.5 text-[0.7rem] tracking-[0.1em] text-[color-mix(in_oklab,white_78%,transparent)] uppercase transition-colors duration-200 hover:border-gold hover:text-gold"
                >
                  <RotateCcw className="size-3" />
                  Replay
                </button>
              </div>
            </div>

            <div className="grid gap-px bg-[color-mix(in_oklab,white_8%,transparent)] md:grid-cols-[1fr_1fr]">
              {/* Left: call + transcript */}
              <div className="bg-transparent p-6 md:p-8">
                <div className="min-h-[4.5rem]">
                  <AnimatePresence mode="wait" initial={false}>
                    {stage.ringing ? (
                      <motion.div
                        key="ringing"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="flex items-center gap-3 rounded-md border border-gold/40 bg-[color-mix(in_oklab,var(--gold)_12%,transparent)] px-4 py-3"
                      >
                        <motion.span
                          animate={{ scale: [1, 1.18, 1] }}
                          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                          className="inline-flex size-8 items-center justify-center rounded-full bg-gold/20 text-gold"
                        >
                          <PhoneIncoming className="size-4" />
                        </motion.span>
                        <div>
                          <p className="text-sm font-medium text-[color-mix(in_oklab,white_92%,transparent)]">
                            Incoming call · +44 7700 900431
                          </p>
                          <p className="text-xs text-[color-mix(in_oklab,white_58%,transparent)]">
                            Out of hours — routing to AI receptionist
                          </p>
                        </div>
                      </motion.div>
                    ) : stage.answered ? (
                      <motion.div
                        key="answered"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="flex items-center gap-3 rounded-md border border-primary/40 bg-[color-mix(in_oklab,var(--primary)_14%,transparent)] px-4 py-3"
                      >
                        <span className="inline-flex size-8 items-center justify-center rounded-full bg-primary/25 text-[color-mix(in_oklab,white_92%,transparent)]">
                          <PhoneIncoming className="size-4" />
                        </span>
                        <div>
                          <p className="text-sm font-medium text-[color-mix(in_oklab,white_92%,transparent)]">
                            Answered by Zocalo AI
                          </p>
                          <p className="text-xs text-[color-mix(in_oklab,white_58%,transparent)]">Transcribing live</p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.p
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="font-mono text-xs tracking-[0.14em] text-[color-mix(in_oklab,white_45%,transparent)] uppercase"
                      >
                        Standing by…
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <p className="mt-7 font-mono text-[0.65rem] tracking-[0.2em] text-[color-mix(in_oklab,white_45%,transparent)] uppercase">
                  Transcript
                </p>
                <ul className="mt-4 space-y-3">
                  {transcript.slice(0, stage.lines).map((t, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="text-sm leading-[1.7]"
                    >
                      <span className="mr-2 font-mono text-[0.65rem] tracking-[0.12em] text-primary">{t.time}</span>
                      <span className="text-[color-mix(in_oklab,white_88%,transparent)]">{t.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Right: pipeline */}
              <div className="bg-transparent p-6 md:p-8">
                <p className="font-mono text-[0.65rem] tracking-[0.2em] text-[color-mix(in_oklab,white_45%,transparent)] uppercase">
                  CRM pipeline
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded-md border border-[color-mix(in_oklab,white_12%,transparent)] p-3">
                    <p className="text-[0.7rem] tracking-[0.12em] text-[color-mix(in_oklab,white_58%,transparent)] uppercase">
                      New leads
                    </p>
                    <div className="mt-3 space-y-3">
                      <AnimatePresence initial={false}>
                        {stage.card ? (
                          <motion.div
                            key="lead"
                            initial={{ opacity: 0, x: -28, scale: 0.96 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 22 }}
                            className="rounded-md border border-primary/40 bg-[color-mix(in_oklab,var(--primary)_16%,transparent)] p-3"
                          >
                            <p className="text-sm font-medium text-[color-mix(in_oklab,white_92%,transparent)]">
                              14 Ardmore Road
                            </p>
                            <div className="mt-2 space-y-1 text-xs text-[color-mix(in_oklab,white_70%,transparent)]">
                              <p>
                                <span className="text-blue-400">📞</span> +1 555-0142
                              </p>
                              <p>
                                <span className="text-blue-400">📋</span> Roofing estimate
                              </p>
                              <p>
                                <span className="text-blue-400">🆔</span> #R-2026-0842
                              </p>
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                              <span className="size-1.5 rounded-full bg-gold" />
                              <span className="font-mono text-[0.6rem] tracking-[0.14em] text-gold uppercase">
                                Urgent
                              </span>
                            </div>
                          </motion.div>
                        ) : (
                          <div className="h-[8rem] rounded-md border border-dashed border-[color-mix(in_oklab,white_12%,transparent)]" />
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <div className="rounded-md border border-[color-mix(in_oklab,white_12%,transparent)] p-3">
                    <p className="text-[0.7rem] tracking-[0.12em] text-[color-mix(in_oklab,white_58%,transparent)] uppercase">
                      Dispatch
                    </p>
                    <div className="mt-3 h-[8rem] rounded-md border border-dashed border-[color-mix(in_oklab,white_12%,transparent)]" />
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  {[
                    { label: "Call transcribed", on: stage.lines >= transcript.length },
                    { label: "Lead qualified as urgent", on: stage.card },
                    { label: "Engineer notified for 8am", on: stage.logged },
                  ].map((r) => (
                    <div key={r.label} className="flex items-center gap-3">
                      <span
                        className={`size-1.5 rounded-full transition-colors duration-500 ${
                          r.on ? "bg-gold" : "bg-[color-mix(in_oklab,white_18%,transparent)]"
                        }`}
                      />
                      <span
                        className={`font-mono text-[0.65rem] tracking-[0.14em] uppercase transition-colors duration-500 ${
                          r.on
                            ? "text-[color-mix(in_oklab,white_82%,transparent)]"
                            : "text-[color-mix(in_oklab,white_36%,transparent)]"
                        }`}
                      >
                        {r.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
