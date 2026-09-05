import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, RotateCcw } from "lucide-react";
import { Reveal, useReducedMotion } from "./motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const transcript = [
  { at: "23:47:02", who: "Caller", line: "Our heating has stopped and the house is freezing." },
  { at: "23:47:06", who: "Zocalo AI", line: "Is this a residential or commercial property?" },
  { at: "23:47:11", who: "Caller", line: "Residential. 14 Ardmore Road, BT9." },
  { at: "23:47:15", who: "Zocalo AI", line: "Is there a fault code or no response at all?" },
  { at: "23:47:22", who: "Caller", line: "No response. Nothing on the display." },
  { at: "23:47:28", who: "Zocalo AI", line: "Understood. I’ve logged an urgent no-heat call." },
];

const T = { answer: 900, transcriptStart: 1450, transcriptStep: 950, card: 7500, logged: 8700, loop: 10400 };

type Stage = { answered: boolean; lines: number; card: boolean; logged: boolean };
const EMPTY: Stage = { answered: false, lines: 0, card: false, logged: false };
const FINAL: Stage = { answered: true, lines: transcript.length, card: true, logged: true };

function LeadCard({ compact = false }: { compact?: boolean }) {
  return (
    <div className="border border-primary/35 bg-[color-mix(in_oklab,var(--demo-panel)_88%,var(--primary))] p-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-medium text-[color-mix(in_oklab,var(--demo-ink)_94%,transparent)]">14 Ardmore Road</p>
          <p className="mt-1 font-mono text-[0.58rem] text-[color-mix(in_oklab,var(--demo-ink)_46%,transparent)]">ZC-4182 · 23:47</p>
        </div>
        <span className="border border-gold/35 px-1.5 py-0.5 font-mono text-[0.52rem] text-gold uppercase">Urgent</span>
      </div>
      {!compact ? (
        <dl className="mt-3 grid gap-1.5 font-mono text-[0.58rem] text-[color-mix(in_oklab,var(--demo-ink)_48%,transparent)]">
          <div className="flex justify-between gap-3"><dt>Service</dt><dd className="text-[color-mix(in_oklab,var(--demo-ink)_78%,transparent)]">No heat</dd></div>
          <div className="flex justify-between gap-3"><dt>Contact</dt><dd className="text-[color-mix(in_oklab,var(--demo-ink)_78%,transparent)]">+44 7700 900431</dd></div>
        </dl>
      ) : null}
    </div>
  );
}

export function LiveDemo() {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<Stage>(EMPTY);
  const [playing, setPlaying] = useState(true);
  const [runKey, setRunKey] = useState(0);
  const timers = useRef<number[]>([]);

  const clear = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
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
    const at = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));
    at(T.answer, () => setStage((value) => ({ ...value, answered: true })));
    transcript.forEach((_, index) => at(T.transcriptStart + index * T.transcriptStep, () =>
      setStage((value) => ({ ...value, lines: index + 1 }))));
    at(T.card, () => setStage((value) => ({ ...value, card: true })));
    at(T.logged, () => setStage((value) => ({ ...value, logged: true })));
    at(T.loop, () => setRunKey((value) => value + 1));
    return clear;
  }, [clear, playing, reduced, runKey]);

  const isTranscribing = stage.answered && stage.lines < transcript.length;

  return (
    <section className="section border-t border-border">
      <div className="container-x">
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_22rem]">
          <div>
            <Reveal><p className="eyebrow">Live Demo</p></Reveal>
            <Reveal delay={50}>
              <h2 className="mt-6 max-w-2xl text-3xl leading-[1.15] font-medium tracking-display md:text-[2.6rem]">
                An after-hours call, captured end to end
              </h2>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <p className="text-sm leading-[1.75] text-muted-foreground">
              The caller gets an answer. Your team gets a qualified, structured lead—ready for action the next morning.
            </p>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div className="demo-window mt-12 overflow-hidden border border-border-strong">
            <div className="grid min-h-11 grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-[color-mix(in_oklab,var(--demo-ink)_10%,transparent)] px-3 sm:px-4">
              <div className="flex gap-1.5" aria-hidden>
                {[0, 1, 2].map((dot) => <span key={dot} className="size-2 rounded-full bg-[color-mix(in_oklab,var(--demo-ink)_22%,transparent)]" />)}
              </div>
              <div className="mx-auto flex h-7 w-full max-w-sm items-center justify-center border border-[color-mix(in_oklab,var(--demo-ink)_10%,transparent)] bg-[color-mix(in_oklab,var(--demo-ink)_3%,transparent)] px-3">
                <span className="truncate font-mono text-[0.62rem] text-[color-mix(in_oklab,var(--demo-ink)_48%,transparent)]">zocalo-crm.app / live-operations</span>
              </div>
              <div className="flex items-center gap-1">
                {!reduced ? (
                  <button type="button" onClick={() => setPlaying((value) => !value)} aria-label={playing ? "Pause demo" : "Play demo"} title={playing ? "Pause demo" : "Play demo"} className="demo-control">
                    {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                  </button>
                ) : null}
                <button type="button" onClick={() => { setPlaying(true); setRunKey((value) => value + 1); }} aria-label="Replay demo" title="Replay demo" className="demo-control">
                  <RotateCcw className="size-3.5" />
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="border-b border-[color-mix(in_oklab,var(--demo-ink)_10%,transparent)] p-5 sm:p-7 lg:border-r lg:border-b-0">
                <div className="flex min-h-8 items-center justify-between gap-4 border-b border-[color-mix(in_oklab,var(--demo-ink)_10%,transparent)] pb-4">
                  <div>
                    <p className="font-mono text-[0.62rem] text-[color-mix(in_oklab,var(--demo-ink)_45%,transparent)] uppercase">Live call · +44 7700 900431</p>
                    <p className="mt-1 text-xs text-[color-mix(in_oklab,var(--demo-ink)_78%,transparent)]">Emergency line / after hours</p>
                  </div>
                  <span className="flex items-center gap-2 font-mono text-[0.58rem] text-primary uppercase">
                    <motion.span className="size-1.5 rounded-full bg-primary" animate={isTranscribing && !reduced ? { opacity: [0.25, 1, 0.25] } : { opacity: 1 }} transition={{ duration: 1.2, repeat: Infinity }} />
                    {isTranscribing ? "Transcribing…" : stage.card ? "Complete" : "Connecting"}
                  </span>
                </div>

                <ol className="mt-5 min-h-[23rem] space-y-1.5">
                  <AnimatePresence initial={false}>
                    {transcript.slice(0, stage.lines).map((entry) => (
                      <motion.li key={entry.at} initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32, ease: EASE }} className={`grid grid-cols-[3.8rem_1fr] gap-3 border-l-2 px-3 py-2.5 ${entry.who === "Caller" ? "border-transparent bg-[color-mix(in_oklab,var(--demo-ink)_3%,transparent)]" : "border-primary/55 bg-[color-mix(in_oklab,var(--primary)_8%,transparent)]"}`}>
                        <time className="font-mono text-[0.57rem] text-[color-mix(in_oklab,var(--demo-ink)_34%,transparent)]">{entry.at}</time>
                        <div>
                          <p className={`font-mono text-[0.57rem] uppercase ${entry.who === "Caller" ? "text-[color-mix(in_oklab,var(--demo-ink)_48%,transparent)]" : "text-primary"}`}>{entry.who}</p>
                          <p className="mt-1 text-xs leading-[1.65] text-[color-mix(in_oklab,var(--demo-ink)_82%,transparent)]">{entry.line}</p>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ol>
              </div>

              <div className="p-5 sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <div><p className="font-mono text-[0.62rem] text-[color-mix(in_oklab,var(--demo-ink)_45%,transparent)] uppercase">Emergency pipeline</p><p className="mt-1 text-xs text-[color-mix(in_oklab,var(--demo-ink)_70%,transparent)]">6 September · Belfast</p></div>
                  <span className="font-mono text-[0.58rem] text-[color-mix(in_oklab,var(--demo-ink)_36%,transparent)]">3 active</span>
                </div>

                <div className="mt-5 grid min-w-[35rem] grid-cols-3 gap-2 overflow-hidden sm:min-w-0">
                  {["New", "Qualified", "Dispatched"].map((column, index) => (
                    <div key={column} className="min-h-[23rem] border border-[color-mix(in_oklab,var(--demo-ink)_10%,transparent)] bg-[color-mix(in_oklab,var(--demo-ink)_2%,transparent)] p-2.5">
                      <div className="flex items-center justify-between border-b border-[color-mix(in_oklab,var(--demo-ink)_9%,transparent)] pb-2.5">
                        <p className="font-mono text-[0.58rem] text-[color-mix(in_oklab,var(--demo-ink)_55%,transparent)] uppercase">{column}</p><span className="font-mono text-[0.56rem] text-[color-mix(in_oklab,var(--demo-ink)_30%,transparent)]">0{index + 1}</span>
                      </div>
                      <div className="mt-2.5 space-y-2.5">
                        {index === 0 ? <AnimatePresence initial={false}>{stage.card ? <motion.div key="lead" initial={reduced ? false : { opacity: 0, x: -150, y: -30, scale: 0.94 }} animate={{ opacity: 1, x: 0, y: 0, scale: 1 }} transition={{ duration: 0.75, ease: EASE }}><LeadCard /></motion.div> : null}</AnimatePresence> : null}
                        {index === 1 ? <><LeadCard compact /><div className="border border-[color-mix(in_oklab,var(--demo-ink)_8%,transparent)] p-3 text-[0.62rem] text-[color-mix(in_oklab,var(--demo-ink)_45%,transparent)]">Commercial service · ZC-4179</div></> : null}
                        {index === 2 ? <LeadCard compact /> : null}
                      </div>
                    </div>
                  ))}
                </div>
                <AnimatePresence>{stage.logged ? <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex items-center gap-2 font-mono text-[0.58rem] text-gold uppercase"><span className="h-px w-5 bg-gold" />Lead logged · engineer queue notified</motion.p> : null}</AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}