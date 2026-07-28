import React, { useEffect, useMemo, useState } from 'react'

/* ============================================================================
   EASY-TO-EDIT SETTINGS  ── tweak these without touching the rest
   ==========================================================================*/

// Password Anjali types to get in.
const PASSWORD = 'sleezy'

// Secret preview for you (Sachin): add ?preview=sachin31 to the URL and every
// chapter unseals regardless of the clock, so you can proofread the whole day
// early. Share the PLAIN url (no ?preview=) with her.
const PREVIEW_TOKEN = 'sachin31'

// The day it runs. Toronto's summer offset is EDT = -04:00 on Jul 31, 2026.
// Baking the offset in means chapters unlock at the right Toronto minute no
// matter what time zone her phone is set to.
const TZ = '-04:00'
const at = (hms) => new Date(`2026-07-31T${hms}${TZ}`).getTime()

const P = '/photos/'

/* ---------------------------------------------------------------------------
   THE DAY
   band: 'am' (gold accent, sweet) | 'pm' (rose accent, teasing)
   Locked chapters hide their title on purpose — mystery until the clock says so.
   ------------------------------------------------------------------------- */
const CHAPTERS = [
  {
    n: 1, t: at('08:00:00'), clock: '8:00 AM', band: 'am',
    eyebrow: 'Chapter I · Morning',
    title: 'The first page',
    body: [
      "Good morning, my favourite person. Happy eighteen months.",
      "No rushing today — the whole thing is already planned, so all you have to do is follow the notes as they open. First order of business: a real breakfast, something with actual protein in it. You'll thank me by 10.",
      "Wear something cute and comfortable; you'll be moving this morning. Glasses or contacts, doesn't matter even a little — I'm obsessed with you in both.",
    ],
    photos: [{ src: 'c01.jpg', cap: 'us. exhibit A.' }],
  },
  {
    n: 2, t: at('09:00:00'), clock: '9:00 AM', band: 'am',
    eyebrow: 'Chapter II · Morning',
    title: 'Chapter one is sweat',
    place: 'Club Sūdō',
    address: '16 Famous Ave, Unit 145, Woodbridge (Vaughan)',
    mapQ: 'Club Sudo, 16 Famous Ave Unit 145, Vaughan ON',
    body: [
      "Order your ride to Club Sūdō and aim to be there by 9:00 so you can settle in before class. Yes — this one's a gift: I set you up with a 10-day trial. Happy anniversary, athlete.",
      "Check in under your name, Anjali Gandhi. Your reformer Pilates class is at 9:30 — ask for Hope McCleary, she knows you're coming. Go be strong and a little smug about it.",
    ],
    keycard: {
      label: 'Your trial — if they need details at the desk',
      name: 'Anjali Gandhi',
      email: 'spasricha@qmed.ca',
      password: 'sachinpasricha',
    },
    photos: [{ src: 'c02.jpg', cap: 'you mid-laugh — my favourite genre.' }],
  },
  {
    n: 3, t: at('10:30:00'), clock: '10:30 AM', band: 'am',
    eyebrow: 'Chapter III · Morning',
    title: 'Hot, then cold',
    place: 'Contrast Therapy — Open Flow, Club Sūdō',
    body: [
      "Straight from the reformer into contrast therapy — open flow, move at your own pace. Sauna until you're melty, cold plunge until you gasp, repeat until you feel unstoppable.",
      "Breathe. Reset. Think about me if you want to (you don't have to — but you will).",
    ],
    photos: [{ src: 'c03.jpg', cap: 'cold day, warm you.' }],
  },
  {
    n: 4, t: at('11:15:00'), clock: '11:15 AM', band: 'am',
    eyebrow: 'Chapter IV · Morning',
    title: 'Freshen up',
    place: 'Shower & glow — Club Sūdō',
    body: [
      "Grab a shower and get yourself looking cute — for you first, for your partner second.",
      "Glasses or contacts, whatever you feel like today; he loves you exactly the same in both. (It's me. I'm your partner.) And don't overthink the look — you'll have plenty of time to get properly dressed up before dinner.",
    ],
    photos: [{ src: 'c04.jpg', cap: 'proof we clean up okay.' }],
  },
  {
    n: 5, t: at('12:00:00'), clock: '12:00 PM', band: 'am',
    eyebrow: 'Chapter V · Midday',
    title: 'Table for one (I\u2019m sorry)',
    place: 'Lunch — Clementina',
    address: '16 Famous Ave, Unit 143, Woodbridge — same plaza',
    mapQ: 'Clementina, 16 Famous Ave Unit 143, Vaughan ON',
    body: [
      "Here's the part I hate: I can't be at this one. Walk over to Clementina — it's right there in the plaza — and treat yourself to a proper lunch.",
      "Order whatever you want, sit like the main character, and know I'm thinking about you the entire time. (If Clementina isn't calling your name, anywhere in the plaza works.)",
    ],
    photos: [{ src: 'c05.jpg', cap: 'this one lives in my head rent-free.' }],
  },
  {
    n: 6, t: at('12:30:00'), clock: '12:30 PM', band: 'am',
    eyebrow: 'Chapter VI · Midday',
    title: 'Your chariot',
    place: 'Uber → Vaughan Metropolitan Centre Station',
    mapQ: 'Vaughan Metropolitan Centre Station',
    body: [
      "Time to point yourself downtown. Order an Uber to Vaughan Metropolitan Centre subway station — the big shiny one at the end of the line.",
      "Don't worry about where you're headed yet. Just get in the car.",
    ],
    photos: [{ src: 'c06.jpg', cap: 'look at us.' }],
  },
  {
    n: 7, t: at('12:45:00'), clock: '12:45 PM', band: 'am',
    eyebrow: 'Chapter VII · Midday',
    title: 'Down the line',
    place: 'Line 1 southbound, from VMC',
    body: [
      "Tap in and hop on the subway heading south. Grab a seat, put a good song on, and enjoy twenty-odd minutes of doing absolutely nothing.",
      "You're going most of the way downtown — get off at Osgoode. The next note tells you where to walk. Almost there.",
    ],
    photos: [{ src: 'c07.jpg', cap: 'my favourite plus-one.' }],
  },
  {
    n: 8, t: at('13:30:00'), clock: '1:30 PM', band: 'am',
    eyebrow: 'Chapter VIII · Afternoon',
    title: 'Read something we\u2019ll share',
    place: 'Flying Books at Neverland',
    address: '371 Queen St W (near Osgoode station)',
    mapQ: 'Flying Books at Neverland, 371 Queen St W, Toronto',
    body: [
      "Walk to Flying Books at Neverland — 371 Queen St W. It's a bookshop and a wine bar pretending to be one cozy room, and it's yours for the next hour.",
      "Your mission: pick a book you actually want us to read together. Whatever you choose, I promise to read it within two years — a real promise, in writing, timestamped right here.",
      "While you browse, order yourself a glass of wine or a ridiculous fancy coffee. Take your time. Fall in love with something on the shelf.",
    ],
    photos: [
      { src: 'c08.jpg', cap: 'wine and you — a theme develops.' },
      { src: 'c09.jpg', cap: 'you make the camera nervous.' },
    ],
  },
  {
    n: 9, t: at('15:15:00'), clock: '3:15 PM', band: 'pm',
    eyebrow: 'Chapter IX · Afternoon',
    title: 'Come to me',
    place: "→ Sachin\u2019s condo (you know the way)",
    body: [
      "Close the book — buy it, obviously — and head to my place. You know the address by heart.",
      "This is the turn where the day starts pointing at the evening. And the evening, just so we're clear, is pointing at you.",
    ],
    photos: [{ src: 'c10.jpg', cap: 'dressed up, still goofy.' }],
  },
  {
    n: 10, t: at('15:45:00'), clock: '3:45 PM', band: 'pm',
    eyebrow: 'Chapter X · Evening approaches',
    title: 'Get ready (read: sexy)',
    place: "Get ready at Sachin\u2019s — until 5:00",
    body: [
      "You've got the place to yourself for a bit while I wrap something up. Use it. Take your time getting ready and — I'll use our word — dress sexy. The cute, knock-the-wind-out-of-me kind.",
      "This is the version of tonight I've been picturing since I planned the whole thing. Pour yourself something if you like. Make me regret scheduling a meeting.",
    ],
    photos: [{ src: 'c11.jpg', cap: 'eighteen months of this face.' }],
  },
  {
    n: 11, t: at('17:15:00'), clock: '5:15 PM', band: 'pm',
    eyebrow: 'Chapter XI · Evening',
    title: 'Back out into it',
    place: 'Uber → Flying Books, College St',
    address: '784 College St',
    mapQ: 'Flying Books, 784 College St, Toronto',
    body: [
      "When you're ready — and you look unreal, I already know — order an Uber to the other Flying Books, 784 College St.",
      "Yes, there are two. Yes, I sent you to the second one on purpose. Browse for a few minutes. Someone might be waiting for you nearby.",
    ],
    photos: [{ src: 'c12.jpg', cap: "hi. it\u2019s us again." }],
  },
  {
    n: 12, t: at('18:15:00'), clock: '6:15 PM', band: 'pm',
    eyebrow: 'Chapter XII · Evening',
    title: 'Dinner',
    place: 'Bar Isabel',
    address: '797 College St — right across the street',
    mapQ: 'Bar Isabel, 797 College St, Toronto',
    body: [
      "Dinner is at Bar Isabel, right across from the bookshop. Order too much, share all of it, let the night run long.",
      "I want the kind of dinner where we forget to check the time and the candles get low. Sit close. You're stuck with me tonight.",
    ],
    photos: [
      { src: 'c13.jpg', cap: 'table for two, always.' },
      { src: 'c14.jpg', cap: 'closer.' },
    ],
  },
  {
    n: 13, t: at('20:00:00'), clock: '8:00 PM', band: 'pm',
    eyebrow: 'Chapter XIII · Evening',
    title: 'Something sweet',
    place: 'Bang Bang Ice Cream',
    address: '93A Ossington Ave — a short walk over',
    mapQ: 'Bang Bang Ice Cream, 93A Ossington Ave, Toronto',
    body: [
      "Walk it off toward Ossington and get in line at Bang Bang, 93A Ossington. If the line's a monster we bail and find trouble elsewhere — no ice cream is worth an hour.",
      "But if it's moving: get the weird flavour, share a cone with me under the lights. (They close around 8:45, so don't dawdle, gorgeous.)",
    ],
    photos: [{ src: 'c15.jpg', cap: 'closer still.' }],
  },
  {
    n: 14, t: at('21:30:00'), clock: '9:30 PM', band: 'pm',
    eyebrow: 'Chapter XIV · Home',
    title: 'Head home for\u2026',
    body: [
      "That's the whole itinerary, my love. Eighteen months, one day built entirely around you.",
      "Now we go home. I'll let you imagine the rest — I've been imagining it all week.",
      "Happy anniversary, Anjali. I'm completely, ridiculously yours. — Sachin",
    ],
    photos: [
      { src: 'c16.jpg', cap: "okay now I\u2019m just showing off." },
      { src: 'c17_kiss.jpg', cap: "and that\u2019s the whole point." },
    ],
  },
]

const FIRST = CHAPTERS[0].t

/* ============================================================================
   Small hooks / helpers
   ==========================================================================*/
function useNow(preview) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (preview) return
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [preview])
  return now
}

function torontoClock(now) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Toronto', hour: 'numeric', minute: '2-digit',
      second: '2-digit', hour12: true,
    }).format(now)
  } catch { return '' }
}

function countdown(ms) {
  if (ms <= 0) return 'now'
  const s = Math.floor(ms / 1000)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m ${sec}s`
  return `${sec}s`
}

const mapHref = (q) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`

const store = {
  get(k) { try { return sessionStorage.getItem(k) } catch { return null } },
  set(k, v) { try { sessionStorage.setItem(k, v) } catch {} },
}

/* ============================================================================
   Password gate
   ==========================================================================*/
function Gate({ onPass }) {
  const [val, setVal] = useState('')
  const [err, setErr] = useState(false)
  const submit = () => {
    if (val.trim().toLowerCase() === PASSWORD) onPass()
    else { setErr(true); setVal('') }
  }
  return (
    <div className="gate">
      <div className="gate-card">
        <div className="eyebrow">A day for the two of you</div>
        <h1 className="gate-title">Eighteen<span className="amp"> months</span></h1>
        <p className="gate-sub">Sachin &amp; Anjali · Friday, July 31</p>
        <p className="gate-hint">There's a word only you two use. Type it.</p>
        <div className={`gate-row ${err ? 'shake' : ''}`}>
          <input
            className="gate-input"
            type="password"
            autoFocus
            value={val}
            placeholder="password"
            onChange={(e) => { setVal(e.target.value); setErr(false) }}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            aria-label="Password"
          />
          <button className="gate-btn" onClick={submit}>Enter</button>
        </div>
        {err && <p className="gate-err">Not quite. Try our word.</p>}
      </div>
    </div>
  )
}

/* ============================================================================
   Photo
   ==========================================================================*/
function Photo({ src, cap, i }) {
  const tilt = (i % 2 === 0 ? -1 : 1) * (1.1 + (i % 3) * 0.5)
  return (
    <figure className="photo" style={{ '--tilt': `${tilt}deg` }}>
      <img src={P + src} alt={cap || 'us'} loading="lazy" decoding="async" />
      {cap && <figcaption>{cap}</figcaption>}
    </figure>
  )
}

/* ============================================================================
   Chapter
   ==========================================================================*/
function Chapter({ c, now, preview, opened, onOpen }) {
  const unlocked = preview || now >= c.t
  const isOpen = preview || opened
  const remaining = c.t - now

  const node = !unlocked ? '🔒' : isOpen ? '✓' : c.n
  const status = !unlocked
    ? 'locked' : isOpen ? 'open' : 'ready'

  return (
    <article className={`ch ch-${c.band} ${status}`}>
      <div className="rail">
        <span className="node" aria-hidden="true">{node}</span>
      </div>

      <div className="ch-body">
        <div className="ch-top">
          <span className="ch-eyebrow">{c.eyebrow}</span>
          <span className="ch-clock">{c.clock}</span>
        </div>

        {!unlocked && (
          <div className="sealed">
            <p className="sealed-title">Sealed</p>
            <p className="sealed-sub">
              Opens at {c.clock} · <span className="mono">{countdown(remaining)}</span>
            </p>
          </div>
        )}

        {unlocked && !isOpen && (
          <button className="open-btn" onClick={onOpen}>
            <span className="wax">✦</span>
            <span>Open this note</span>
          </button>
        )}

        {unlocked && isOpen && (
          <div className="reveal">
            <h2 className="ch-title">{c.title}</h2>
            {c.place && <p className="ch-place">{c.place}</p>}
            {c.address && (
              <a className="ch-addr" href={mapHref(c.mapQ || c.address)}
                 target="_blank" rel="noreferrer">
                {c.address} <span className="pin">↗</span>
              </a>
            )}

            <div className="ch-text">
              {c.body.map((p, k) => <p key={k}>{p}</p>)}
            </div>

            {c.keycard && (
              <div className="keycard">
                <div className="keycard-label">{c.keycard.label}</div>
                <dl>
                  <div><dt>Name</dt><dd>{c.keycard.name}</dd></div>
                  <div><dt>Email</dt><dd className="mono">{c.keycard.email}</dd></div>
                  <div><dt>Password</dt><dd className="mono">{c.keycard.password}</dd></div>
                </dl>
              </div>
            )}

            {c.photos?.length > 0 && (
              <div className={`gallery g-${c.photos.length}`}>
                {c.photos.map((ph, k) => (
                  <Photo key={ph.src} src={ph.src} cap={ph.cap} i={c.n + k} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

/* ============================================================================
   App
   ==========================================================================*/
export default function App() {
  const preview = useMemo(() => {
    try {
      return new URLSearchParams(window.location.search).get('preview') === PREVIEW_TOKEN
    } catch { return false }
  }, [])

  const [authed, setAuthed] = useState(() => store.get('anniv_ok') === '1')
  const now = useNow(preview)

  const [openedSet, setOpenedSet] = useState(() => {
    try { return new Set(JSON.parse(store.get('anniv_open') || '[]')) }
    catch { return new Set() }
  })
  const open = (n) => setOpenedSet((prev) => {
    const next = new Set(prev); next.add(n)
    store.set('anniv_open', JSON.stringify([...next]))
    return next
  })

  useEffect(() => { if (authed) store.set('anniv_ok', '1') }, [authed])

  if (!authed) return <><Style /><Gate onPass={() => setAuthed(true)} /></>

  const unlockedCount = preview
    ? CHAPTERS.length
    : CHAPTERS.filter((c) => now >= c.t).length
  const beforeStart = !preview && now < FIRST

  return (
    <>
      <Style />
      <div className="page">
        <header className="hero">
          <div className="eyebrow">A day for the two of you</div>
          <h1 className="hero-title">
            Eighteen <em>months</em>
          </h1>
          <p className="hero-names">Sachin &amp; Anjali</p>
          <p className="hero-date">Friday · July 31 · 2026</p>

          <div className="clock">
            <span className="clock-time mono">{torontoClock(now)}</span>
            <span className="clock-zone">Toronto time{preview ? ' · preview' : ''}</span>
          </div>

          <div className="progress">
            <span className="mono">{unlockedCount}</span> of{' '}
            <span className="mono">{CHAPTERS.length}</span> chapters unsealed
          </div>

          <div className="note">
            <p>
              Eighteen months ago there was a striped shirt, a questionable
              Super&nbsp;Bowl take, and you deciding I was worth a reply. Today the
              whole day is yours — but you unlock it one hour at a time.
            </p>
            <p>
              Each note below is sealed until its moment arrives. No skipping ahead
              (the locks are real — I checked). Follow them in order, trust me, and
              I'll see you sooner than you think.
            </p>
            <p className="note-sign">Happy eighteen months, Anjali. — S</p>
          </div>

          <div className="origin">
            <span className="origin-label">where it started</span>
            <div className="origin-shots">
              <Photo src="hinge_her.jpg" i={0}
                     cap="still judging celebrity homes, together." />
              <Photo src="hinge_chat.jpg" i={1}
                     cap="&ldquo;my life will have peaked.&rdquo; reader: it did." />
            </div>
          </div>

          {beforeStart && (
            <p className="waiting">
              The day hasn't started yet. The first note opens at 8:00 AM —{' '}
              <span className="mono">{countdown(FIRST - now)}</span> to go.
            </p>
          )}
        </header>

        <main className="timeline">
          {CHAPTERS.map((c) => (
            <Chapter
              key={c.n} c={c} now={now} preview={preview}
              opened={openedSet.has(c.n)} onOpen={() => open(c.n)}
            />
          ))}
        </main>

        <footer className="foot">
          <span className="foot-mark">✦</span>
          <p>made for you, on purpose, by someone who's yours.</p>
        </footer>
      </div>
    </>
  )
}

/* ============================================================================
   Styles (single injected stylesheet — self-contained, no build config needed)
   ==========================================================================*/
function Style() {
  return <style>{CSS}</style>
}

const CSS = `
:root{
  --bg:#160f1c; --bg2:#1e1426; --panel:#241830; --panel2:#2c1d3a;
  --line:rgba(226,183,110,.16);
  --gold:#e2b76e; --gold-dim:#b78f4e;
  --rose:#e79aa6; --rose-deep:#cf7488;
  --cream:#f3e7d6; --soft:#cbb7c6; --dim:#9a879a;
  --display:'Fraunces', Georgia, serif;
  --bodyf:'Mulish', system-ui, -apple-system, sans-serif;
  --mono:'Space Mono', ui-monospace, monospace;
}
*{box-sizing:border-box}
html,body,#root{margin:0;min-height:100%}
body{
  background:var(--bg);
  color:var(--cream);
  font-family:var(--bodyf);
  -webkit-font-smoothing:antialiased;
  line-height:1.65;
}
.mono{font-family:var(--mono);letter-spacing:-.02em}
.eyebrow{
  font-family:var(--mono);font-size:.7rem;letter-spacing:.34em;
  text-transform:uppercase;color:var(--gold-dim);
}

/* ---------- background glow ---------- */
.page, .gate{
  position:relative;
  background:
    radial-gradient(1100px 620px at 78% -8%, rgba(226,183,110,.10), transparent 60%),
    radial-gradient(900px 640px at 10% 108%, rgba(207,116,136,.12), transparent 60%),
    linear-gradient(180deg, var(--bg), var(--bg2));
  min-height:100vh;
}

/* ---------- gate ---------- */
.gate{display:flex;align-items:center;justify-content:center;padding:24px}
.gate-card{
  width:min(440px,92vw);text-align:center;padding:48px 30px;
  background:linear-gradient(180deg, rgba(44,29,58,.72), rgba(30,20,38,.72));
  border:1px solid var(--line);border-radius:22px;
  box-shadow:0 40px 90px -50px #000, inset 0 1px 0 rgba(255,255,255,.04);
  backdrop-filter:blur(6px);
}
.gate-title{
  font-family:var(--display);font-weight:600;font-size:2.9rem;line-height:1;
  margin:.5rem 0 .2rem;font-optical-sizing:auto;
}
.gate-title .amp{font-style:italic;color:var(--gold)}
.gate-sub{color:var(--soft);margin:.1rem 0 1.6rem;font-size:.95rem}
.gate-hint{color:var(--dim);font-size:.9rem;margin:0 0 1rem}
.gate-row{display:flex;gap:8px;justify-content:center}
.gate-input{
  flex:1;min-width:0;padding:13px 15px;border-radius:12px;
  background:rgba(22,15,28,.8);border:1px solid var(--line);
  color:var(--cream);font-family:var(--mono);font-size:.95rem;outline:none;
}
.gate-input:focus{border-color:var(--gold-dim);box-shadow:0 0 0 3px rgba(226,183,110,.14)}
.gate-btn{
  padding:13px 20px;border-radius:12px;border:1px solid var(--gold-dim);
  background:linear-gradient(180deg,var(--gold),var(--gold-dim));
  color:#2a1c12;font-weight:700;font-family:var(--bodyf);cursor:pointer;
}
.gate-btn:hover{filter:brightness(1.06)}
.gate-err{color:var(--rose);font-size:.85rem;margin:.9rem 0 0}
.shake{animation:shake .4s}
@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-7px)}40%,80%{transform:translateX(7px)}}

/* ---------- page shell ---------- */
.page{padding:0 20px 80px}
.hero{max-width:640px;margin:0 auto;padding:64px 4px 26px;text-align:center}
.hero-title{
  font-family:var(--display);font-weight:500;font-optical-sizing:auto;
  font-size:clamp(3rem,12vw,5.2rem);line-height:.94;margin:.5rem 0 .1rem;
  letter-spacing:-.01em;
}
.hero-title em{font-style:italic;color:var(--gold)}
.hero-names{
  font-family:var(--display);font-style:italic;font-size:1.35rem;
  color:var(--rose);margin:.2rem 0 .1rem;
}
.hero-date{
  font-family:var(--mono);font-size:.78rem;letter-spacing:.2em;
  text-transform:uppercase;color:var(--dim);margin:.2rem 0 1.6rem;
}
.clock{display:flex;flex-direction:column;gap:2px;margin:0 0 .5rem}
.clock-time{font-size:1.5rem;color:var(--cream)}
.clock-zone{font-family:var(--mono);font-size:.66rem;letter-spacing:.28em;text-transform:uppercase;color:var(--gold-dim)}
.progress{font-size:.86rem;color:var(--soft);margin:.2rem 0 2rem}
.progress .mono{color:var(--gold)}

.note{
  text-align:left;max-width:520px;margin:0 auto;
  background:linear-gradient(180deg, rgba(44,29,58,.5), rgba(30,20,38,.35));
  border:1px solid var(--line);border-left:2px solid var(--gold-dim);
  border-radius:16px;padding:22px 24px;
}
.note p{margin:0 0 .8rem;color:var(--soft);font-size:1rem}
.note p:last-child{margin-bottom:0}
.note-sign{font-family:var(--display);font-style:italic;color:var(--cream)!important}

.origin{margin:30px auto 0;max-width:520px}
.origin-label{
  font-family:var(--mono);font-size:.64rem;letter-spacing:.3em;text-transform:uppercase;
  color:var(--dim);display:block;margin-bottom:12px;
}
.origin-shots{display:flex;gap:14px;justify-content:center}
.origin-shots .photo{width:min(46%,190px)}

.waiting{margin:26px auto 0;max-width:520px;color:var(--dim);font-size:.9rem}
.waiting .mono{color:var(--gold)}

/* ---------- timeline ---------- */
.timeline{max-width:640px;margin:36px auto 0;position:relative}
.ch{display:grid;grid-template-columns:44px 1fr;gap:8px;position:relative;padding-bottom:26px}
.rail{display:flex;flex-direction:column;align-items:center}
.rail::after{content:"";flex:1;width:2px;margin-top:6px;
  background:linear-gradient(180deg,var(--line),transparent)}
.ch:last-child .rail::after{display:none}
.node{
  width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;
  font-family:var(--mono);font-size:.85rem;font-weight:700;
  background:var(--panel);border:1px solid var(--line);color:var(--dim);
  flex:none;transition:transform .3s, box-shadow .3s;
}
.ch.ready .node{
  color:#2a1c12;border-color:transparent;
  background:linear-gradient(180deg,var(--gold),var(--gold-dim));
  box-shadow:0 0 0 4px rgba(226,183,110,.14), 0 8px 22px -8px rgba(226,183,110,.5);
  animation:pulse 2.4s ease-in-out infinite;
}
.ch-pm.ready .node{
  background:linear-gradient(180deg,var(--rose),var(--rose-deep));
  box-shadow:0 0 0 4px rgba(207,116,136,.16), 0 8px 22px -8px rgba(207,116,136,.5);
}
.ch.open .node{color:var(--gold);background:var(--panel2);border-color:var(--line)}
.ch-pm.open .node{color:var(--rose)}
@keyframes pulse{50%{transform:scale(1.07)}}

.ch-body{
  background:linear-gradient(180deg, rgba(44,29,58,.42), rgba(30,20,38,.32));
  border:1px solid var(--line);border-radius:16px;padding:16px 18px;min-width:0;
}
.ch.ready .ch-body{border-color:rgba(226,183,110,.34)}
.ch-pm.ready .ch-body{border-color:rgba(207,116,136,.34)}
.ch.locked .ch-body{background:rgba(30,20,38,.28);border-style:dashed;opacity:.72}

.ch-top{display:flex;justify-content:space-between;align-items:baseline;gap:10px}
.ch-eyebrow{font-family:var(--mono);font-size:.62rem;letter-spacing:.24em;text-transform:uppercase;color:var(--gold-dim)}
.ch-pm .ch-eyebrow{color:var(--rose-deep)}
.ch-clock{font-family:var(--mono);font-size:.78rem;color:var(--soft)}

.sealed{padding:8px 0 2px}
.sealed-title{font-family:var(--display);font-style:italic;font-size:1.25rem;margin:.3rem 0 .1rem;color:var(--soft)}
.sealed-sub{font-size:.86rem;color:var(--dim);margin:0}
.sealed-sub .mono{color:var(--gold-dim)}

.open-btn{
  margin-top:12px;width:100%;display:flex;align-items:center;justify-content:center;gap:10px;
  padding:14px 16px;border-radius:12px;cursor:pointer;
  background:linear-gradient(180deg, rgba(226,183,110,.16), rgba(226,183,110,.06));
  border:1px solid rgba(226,183,110,.4);color:var(--cream);
  font-family:var(--bodyf);font-weight:600;font-size:1rem;
}
.ch-pm .open-btn{
  background:linear-gradient(180deg, rgba(231,154,166,.16), rgba(231,154,166,.06));
  border-color:rgba(231,154,166,.42);
}
.open-btn:hover{filter:brightness(1.08)}
.open-btn .wax{
  width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;
  background:radial-gradient(circle at 35% 30%, var(--gold), var(--gold-dim));
  color:#2a1c12;font-size:.8rem;
}
.ch-pm .open-btn .wax{background:radial-gradient(circle at 35% 30%, var(--rose), var(--rose-deep))}

.reveal{animation:reveal .5s ease both}
@keyframes reveal{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.ch-title{font-family:var(--display);font-weight:500;font-size:1.7rem;line-height:1.1;margin:.5rem 0 .2rem}
.ch-place{font-family:var(--display);font-style:italic;color:var(--gold);margin:.1rem 0 .2rem;font-size:1.05rem}
.ch-pm .ch-place{color:var(--rose)}
.ch-addr{
  display:inline-block;font-family:var(--mono);font-size:.78rem;color:var(--soft);
  text-decoration:none;border-bottom:1px dotted var(--dim);padding-bottom:1px;margin:.1rem 0 .3rem;
}
.ch-addr:hover{color:var(--gold)}
.ch-addr .pin{color:var(--gold-dim)}
.ch-text{margin:.6rem 0 0}
.ch-text p{margin:0 0 .7rem;color:var(--soft)}
.ch-text p:last-child{margin-bottom:0}

.keycard{
  margin-top:14px;border:1px solid var(--line);border-radius:12px;
  background:rgba(22,15,28,.6);padding:12px 14px;
}
.keycard-label{font-family:var(--mono);font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold-dim);margin-bottom:8px}
.keycard dl{margin:0;display:flex;flex-direction:column;gap:6px}
.keycard dl>div{display:flex;justify-content:space-between;gap:12px;align-items:baseline}
.keycard dt{color:var(--dim);font-size:.8rem}
.keycard dd{margin:0;color:var(--cream);font-size:.86rem;text-align:right;word-break:break-all}

.gallery{margin-top:16px;display:grid;gap:12px}
.gallery.g-2{grid-template-columns:1fr 1fr}
@media(max-width:460px){.gallery.g-2{grid-template-columns:1fr}}
.photo{margin:0;transform:rotate(var(--tilt,0deg));transition:transform .3s}
.photo:hover{transform:rotate(0deg) scale(1.015)}
.photo img{
  width:100%;display:block;border-radius:12px;
  border:1px solid var(--line);background:var(--panel);
  box-shadow:0 24px 50px -30px #000;
}
.photo figcaption{
  font-family:var(--display);font-style:italic;font-size:.86rem;color:var(--soft);
  margin-top:7px;text-align:center;
}

/* ---------- footer ---------- */
.foot{max-width:640px;margin:40px auto 0;text-align:center;color:var(--dim)}
.foot-mark{color:var(--gold-dim);display:block;font-size:1.1rem;margin-bottom:6px}
.foot p{font-family:var(--display);font-style:italic;font-size:.95rem;margin:0}

@media (prefers-reduced-motion: reduce){
  *{animation:none!important}
  .photo{transform:none}
}
`
