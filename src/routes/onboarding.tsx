import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MapBackground } from "#/components/MapBackground";
import { VisibilityBadge } from "#/components/VisibilityBadge";
import { useLang } from "#/lib/lang";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
});

const TOTAL = 5;

function ProgressHeader({
  step,
  lang,
  onSkip,
}: {
  step: number;
  lang: "ru" | "en";
  onSkip: () => void;
}) {
  return (
    <div className="px-[18px] py-[14px] flex items-center gap-[10px] shrink-0">
      <div className="flex-1 h-[3px] rounded-sm bg-rule relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-violet rounded-sm transition-[width] duration-300"
          style={{ width: `${(step / TOTAL) * 100}%` }}
        />
      </div>
      <div className="font-mono text-[11px] text-dim font-semibold min-w-[32px] text-right">
        {step}/{TOTAL}
      </div>
      <button
        type="button"
        onClick={onSkip}
        className="text-xs text-dim font-medium ml-1 bg-transparent border-none cursor-pointer"
      >
        {lang === "ru" ? "Позже" : "Skip"}
      </button>
    </div>
  );
}

function Footer({
  primary,
  secondary,
  onNext,
  accent,
}: {
  primary: string;
  secondary?: string;
  onNext: () => void;
  accent?: string;
}) {
  const bg = accent ?? "#4d3aef";
  const shadow = accent
    ? `0 8px 22px ${accent}66`
    : "0 8px 22px rgba(77,58,239,0.4)";

  return (
    <div className="px-[18px] pt-[14px] pb-[22px] border-t border-rule bg-paper shrink-0 flex flex-col gap-2">
      <button
        type="button"
        onClick={onNext}
        className="w-full px-[18px] py-[14px] rounded-xl text-white font-bold text-sm tracking-[0.02em] border-none cursor-pointer flex items-center justify-between"
        style={{ background: bg, boxShadow: shadow }}
      >
        <span>{primary}</span>
        <span>→</span>
      </button>
      {secondary && (
        <div className="py-[10px] text-center text-xs text-dim font-medium">
          {secondary}
        </div>
      )}
    </div>
  );
}

// Step 1: Hello / intro
function Step1({ lang, onNext }: { lang: "ru" | "en"; onNext: () => void }) {
  const cards = [
    {
      top: 22,
      left: 18,
      rot: -6,
      v: "public" as const,
      title:
        lang === "ru"
          ? "Boiler Room · Воробьёвы горы"
          : "Boiler Room · Vorobyovy",
      sub: lang === "ru" ? "980 идут · 23:30" : "980 going · 23:30",
    },
    {
      top: 100,
      left: 48,
      rot: 3,
      v: "neighbors" as const,
      title: lang === "ru" ? "Кофе во дворе" : "Courtyard coffee",
      sub: lang === "ru" ? "14/30 · Пресня · 380 м" : "14/30 · Presnya · 380m",
    },
    {
      top: 178,
      left: 22,
      rot: -3,
      v: "private" as const,
      title: lang === "ru" ? "Гараж-сейл для дома" : "Building garage sale",
      sub: lang === "ru" ? "по приглашению · 6 идут" : "invite only · 6 going",
    },
  ];

  return (
    <>
      <div className="flex-1 px-[22px] pt-[10px] overflow-y-auto scrollbar-hide">
        {/* Stacked cards illustration */}
        <div className="mt-[10px] mb-[22px] h-[260px] rounded-2xl relative bg-gradient-to-br from-[#e3f0ea] to-[#eae7fb] overflow-hidden">
          {cards.map((c, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-[10px] px-3 py-[10px] border border-rule flex items-center gap-[10px] shadow-[0_10px_24px_rgba(0,0,0,0.08)]"
              style={{
                top: c.top,
                left: c.left,
                right: 18,
                transform: `rotate(${c.rot}deg)`,
              }}
            >
              <VisibilityBadge v={c.v} lang={lang} />
              <div>
                <div className="text-xs font-semibold leading-[1.2]">
                  {c.title}
                </div>
                <div className="text-[10px] text-dim">{c.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <h1 className="font-serif text-[32px] font-medium tracking-[-0.03em] leading-[1.02] mb-3">
          {lang === "ru" ? (
            <>
              Концерт в клубе
              <br />и <em className="text-violet italic">кофе на лавочке</em> —
              <br />
              оба здесь.
            </>
          ) : (
            <>
              Club nights
              <br />
              and <em className="text-violet italic">coffee on a bench</em> —
              <br />
              both live here.
            </>
          )}
        </h1>
        <p className="text-sm text-dim leading-[1.5] max-w-[320px]">
          {lang === "ru"
            ? "goout — площадка, где афишу собирают сами горожане. Публикуйте открыто, для соседей, или по приглашению."
            : "goout is where the guide is built by people who live here. Post openly, for neighbors, or invite only."}
        </p>
      </div>
      <Footer
        primary={lang === "ru" ? "Поехали" : "Let's go"}
        onNext={onNext}
      />
    </>
  );
}

// Step 2: Location
function Step2({ lang, onNext }: { lang: "ru" | "en"; onNext: () => void }) {
  const pins = [
    { x: 28, y: 30, c: "#15141a" },
    { x: 78, y: 38, c: "#15141a" },
    { x: 42, y: 66, c: "#2f8a6b" },
    { x: 62, y: 72, c: "#ff6d5a" },
  ];

  return (
    <>
      <div className="flex-1 px-[22px] pt-3 overflow-y-auto scrollbar-hide">
        <div className="h-[200px] rounded-2xl mt-1 mb-[22px] relative overflow-hidden border border-rule">
          <MapBackground theme="paper" />
          {/* Radius circle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-[170px] h-[170px] rounded-full border-[1.5px] border-dashed border-mint bg-mint/[0.08]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-mint border-[3px] border-white shadow-[0_0_0_1px_rgba(47,138,107,0.5)]" />
          </div>
          {pins.map((p, i) => (
            <div
              key={i}
              className="absolute w-[10px] h-[10px] rounded-full border-2 border-white shadow-[0_2px_4px_rgba(0,0,0,0.2)] -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${p.x}%`, top: `${p.y}%`, background: p.c }}
            />
          ))}
        </div>

        <h2 className="font-serif text-[28px] font-medium tracking-[-0.025em] leading-[1.05] mb-[10px]">
          {lang === "ru" ? (
            <>
              Где <em>вы</em> живёте?
            </>
          ) : (
            <>
              Where do <em>you</em> live?
            </>
          )}
        </h2>
        <p className="text-[13px] text-dim leading-[1.5] mb-5">
          {lang === "ru"
            ? "Нужно, чтобы показывать события в вашем районе и соседские встречи в радиусе 500 м — 2 км."
            : "So we can show events in your area and neighbor events within 500m – 2km."}
        </p>

        {[
          {
            icon: "◉",
            title: lang === "ru" ? "По GPS · точно" : "Use GPS · precise",
            sub:
              lang === "ru"
                ? "обновляется, когда открываете приложение"
                : "updates when you open the app",
            badge: lang === "ru" ? "РЕКОМ." : "PICK",
          },
          {
            icon: "◎",
            title: lang === "ru" ? "Указать вручную" : "Set manually",
            sub:
              lang === "ru"
                ? "выбрать район на карте"
                : "pick your neighborhood on the map",
            badge: null,
          },
        ].map((opt) => (
          <div
            key={opt.title}
            className="px-4 py-[14px] rounded-xl bg-white border border-rule mb-[10px] flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-[10px] bg-vis-nbr flex items-center justify-center text-[18px] text-mint shrink-0">
              {opt.icon}
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-semibold">{opt.title}</div>
              <div className="text-[11px] text-dim">{opt.sub}</div>
            </div>
            {opt.badge && (
              <div className="text-[10px] font-bold text-mint px-2 py-1 rounded-full bg-vis-nbr tracking-[0.1em]">
                {opt.badge}
              </div>
            )}
          </div>
        ))}
      </div>
      <Footer
        primary={
          lang === "ru"
            ? "Разрешить доступ к геолокации"
            : "Allow location access"
        }
        secondary={lang === "ru" ? "Указать вручную" : "Set manually"}
        onNext={onNext}
        accent="#2f8a6b"
      />
    </>
  );
}

// Step 3: Interests
function Step3({ lang, onNext }: { lang: "ru" | "en"; onNext: () => void }) {
  const [selected, setSelected] = useState<string[]>(["music", "food"]);

  const interests = [
    { id: "music", ru: "Музыка", en: "Music", icon: "♪" },
    { id: "art", ru: "Искусство", en: "Art", icon: "◐" },
    { id: "theatre", ru: "Театр", en: "Theatre", icon: "◇" },
    { id: "cinema", ru: "Кино", en: "Cinema", icon: "▶" },
    { id: "sport", ru: "Спорт", en: "Sport", icon: "◉" },
    { id: "food", ru: "Еда", en: "Food", icon: "◍" },
    { id: "talks", ru: "Лекции", en: "Talks", icon: "❝" },
    { id: "party", ru: "Вечеринки", en: "Parties", icon: "✺" },
    { id: "kids", ru: "Детям", en: "Kids", icon: "☻" },
  ];

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  return (
    <>
      <div className="flex-1 px-[22px] pt-4 overflow-y-auto scrollbar-hide">
        <h2 className="font-serif text-[28px] font-medium tracking-[-0.025em] leading-[1.05] mb-1.5">
          {lang === "ru" ? (
            <>
              Что вас <em>интересует?</em>
            </>
          ) : (
            <>
              What <em>interests</em> you?
            </>
          )}
        </h2>
        <p className="text-[13px] text-dim leading-[1.5] mb-5">
          {lang === "ru"
            ? "Выберите несколько — подберём события по вкусу."
            : "Pick a few — we'll curate events to match."}
        </p>

        <div className="grid grid-cols-3 gap-2 mb-[18px]">
          {interests.map((item) => {
            const on = selected.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggle(item.id)}
                className={`px-2 py-[14px] rounded-xl text-center cursor-pointer border-[1.5px] transition-colors ${
                  on
                    ? "bg-vis-pub border-violet text-violet"
                    : "bg-white border-rule text-ink"
                }`}
              >
                <div className="text-[20px] mb-1">{item.icon}</div>
                <div className={`text-xs ${on ? "font-bold" : "font-medium"}`}>
                  {lang === "ru" ? item.ru : item.en}
                </div>
              </button>
            );
          })}
        </div>

        {/* Neighbor events toggle */}
        <div className="px-4 py-[14px] rounded-xl bg-vis-nbr border border-mint/20">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[13px] font-semibold text-ink">
                ◉ {lang === "ru" ? "Соседские встречи" : "Neighbor events"}
              </div>
              <div className="text-[11px] text-mint mt-0.5">
                {lang === "ru"
                  ? "кофе, гараж-сейлы, совместные дела"
                  : "coffee, garage sales, shared tasks"}
              </div>
            </div>
            <div className="w-11 h-[26px] rounded-full bg-mint relative shrink-0">
              <div className="absolute top-[3px] right-[3px] w-5 h-5 rounded-full bg-white" />
            </div>
          </div>
        </div>
      </div>
      <Footer
        primary={
          lang === "ru"
            ? `Дальше · ${selected.length} выбрано`
            : `Next · ${selected.length} picked`
        }
        onNext={onNext}
      />
    </>
  );
}

// Step 4: Notifications
function Step4({ lang, onNext }: { lang: "ru" | "en"; onNext: () => void }) {
  const items = [
    {
      icon: "◉",
      title: lang === "ru" ? "Соседские события" : "Neighbor events",
      sub: lang === "ru" ? "за час до начала" : "1 hour before start",
      bg: "#e3f0ea",
      color: "#2f8a6b",
    },
    {
      icon: "♪",
      title:
        lang === "ru"
          ? "Новые события по интересам"
          : "New events by interests",
      sub: lang === "ru" ? "1 раз в день, утром" : "once a day, morning",
      bg: "#eae7fb",
      color: "#4d3aef",
    },
    {
      icon: "✦",
      title: lang === "ru" ? "Приглашения" : "Invitations",
      sub: lang === "ru" ? "мгновенно" : "instantly",
      bg: "#fde8e4",
      color: "#ff6d5a",
    },
  ];

  return (
    <>
      <div className="flex-1 px-[22px] pt-4 overflow-y-auto scrollbar-hide">
        {/* Fake push notification */}
        <div className="h-[140px] rounded-2xl bg-vis-pub mt-1 mb-[22px] relative overflow-hidden flex items-center justify-center">
          <div className="bg-white rounded-[14px] px-4 py-3 mx-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)] flex gap-3 items-center w-full">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#fddb92] to-[#d1fdff] shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold mb-0.5">goout</div>
              <div className="text-[11px] text-dim leading-[1.3]">
                {lang === "ru"
                  ? "◉ Кофе во дворе — через 1 ч · Пресня"
                  : "◉ Courtyard coffee — in 1h · Presnya"}
              </div>
            </div>
            <div className="text-[10px] text-dim">сейчас</div>
          </div>
        </div>

        <h2 className="font-serif text-[28px] font-medium tracking-[-0.025em] leading-[1.05] mb-[10px]">
          {lang === "ru" ? (
            <>
              Не пропустите <em>своё</em>
            </>
          ) : (
            <>
              Don't miss <em>yours</em>
            </>
          )}
        </h2>
        <p className="text-[13px] text-dim leading-[1.5] mb-5">
          {lang === "ru"
            ? "Присылаем только о событиях, которые вам подходят. Не чаще одного раза в день."
            : "We only send about events that match you. No more than once a day."}
        </p>

        {items.map((item) => (
          <div
            key={item.title}
            className="px-[14px] py-3 rounded-xl bg-white border border-rule mb-2 flex items-center gap-3"
          >
            <div
              className="w-9 h-9 rounded-[10px] flex items-center justify-center text-base shrink-0"
              style={{ background: item.bg, color: item.color }}
            >
              {item.icon}
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-semibold">{item.title}</div>
              <div className="text-[11px] text-dim">{item.sub}</div>
            </div>
            <div
              className="w-11 h-[26px] rounded-full relative shrink-0"
              style={{ background: item.color }}
            >
              <div className="absolute top-[3px] right-[3px] w-5 h-5 rounded-full bg-white" />
            </div>
          </div>
        ))}
      </div>
      <Footer
        primary={
          lang === "ru" ? "Включить уведомления" : "Enable notifications"
        }
        secondary={lang === "ru" ? "Не сейчас" : "Not now"}
        onNext={onNext}
      />
    </>
  );
}

// Step 5: Done
function Step5({ lang, onDone }: { lang: "ru" | "en"; onDone: () => void }) {
  return (
    <>
      <div className="flex-1 px-[22px] pt-4 overflow-y-auto scrollbar-hide">
        <div className="h-[160px] rounded-2xl bg-gradient-to-br from-[#e3f0ea] to-[#eae7fb] mt-1 mb-6 flex items-center justify-center flex-col gap-3">
          <div className="w-[60px] h-[60px] rounded-full bg-violet flex items-center justify-center text-white text-[26px]">
            ◱
          </div>
          <div className="font-serif text-[22px] font-medium tracking-[-0.02em]">
            goout·
          </div>
        </div>

        <h1 className="font-serif text-[32px] font-medium tracking-[-0.03em] leading-[1.02] mb-[14px]">
          {lang === "ru" ? (
            <>
              Всё готово.
              <br />
              <em className="text-violet">Исследуйте</em> город.
            </>
          ) : (
            <>
              You're all set.
              <br />
              <em className="text-violet">Explore</em> your city.
            </>
          )}
        </h1>
        <p className="text-[13px] text-dim leading-[1.5] mb-6">
          {lang === "ru"
            ? "Видите кофе на лавочке в ленте? Значит, кто-то в 500 метрах уже ждёт."
            : "See courtyard coffee in your feed? Someone 500m away is already waiting."}
        </p>

        <div className="px-4 py-[14px] rounded-xl bg-vis-nbr border border-mint/20">
          <div className="text-[11px] font-bold text-mint mb-1">
            ◉ {lang === "ru" ? "Совет дня" : "Quick tip"}
          </div>
          <div className="text-[13px] text-ink leading-[1.5]">
            {lang === "ru"
              ? "Создайте первое соседское событие — хотя бы кофе во дворе. Иногда этого достаточно, чтобы познакомиться с соседями."
              : "Create your first neighbor event — even just courtyard coffee. Sometimes that's all it takes to meet the people next door."}
          </div>
        </div>
      </div>
      <Footer
        primary={lang === "ru" ? "Открыть афишу" : "Open the guide"}
        onNext={onDone}
      />
    </>
  );
}

function OnboardingPage() {
  const { lang } = useLang();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const finish = () => {
    localStorage.setItem("onboarding_done", "1");
    navigate({ to: "/" });
  };

  const next = () => {
    if (step < TOTAL) setStep((s) => s + 1);
    else finish();
  };

  const skip = () => finish();

  return (
    <div className="app-frame flex flex-col h-dvh">
      <ProgressHeader step={step} lang={lang} onSkip={skip} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {step === 1 && <Step1 lang={lang} onNext={next} />}
        {step === 2 && <Step2 lang={lang} onNext={next} />}
        {step === 3 && <Step3 lang={lang} onNext={next} />}
        {step === 4 && <Step4 lang={lang} onNext={next} />}
        {step === 5 && <Step5 lang={lang} onDone={finish} />}
      </div>
    </div>
  );
}
