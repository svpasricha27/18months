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
// The day the plan runs. Change this one line back to '2026-07-31' for the real day.
const DAY = '2026-07-28'
const at = (hms) => new Date(`${DAY}T${hms}${TZ}`).getTime()

const DAY_DT = new Date(`${DAY}T12:00:00${TZ}`)
const dfmt = (opts) => DAY_DT.toLocaleDateString('en-US', { timeZone: 'America/Toronto', ...opts })
const WEEKDAY = dfmt({ weekday: 'long' })     // e.g. "Tuesday"
const MONTHDAY = dfmt({ month: 'long', day: 'numeric' }) // e.g. "July 28"
const YEAR = dfmt({ year: 'numeric' })        // e.g. "2026"

const P = '/photos/'

/* ---------------------------------------------------------------------------
   THE DAY
   band: 'am' (gold accent, sweet) | 'pm' (rose accent, teasing)
   Locked chapters hide their title on purpose — mystery until the clock says so.
   ------------------------------------------------------------------------- */
const CHAPTERS = [
  {
    n: 1, t: at('07:45:00'), clock: '7:45 AM', band: 'am',
    eyebrow: 'Chapter I \u00b7 Morning',
    title: 'The first page',
    body: [
      "Good morning, my favourite person. Happy eighteen months.",
      "No rushing today. The whole thing is already planned; all you have to do is follow the notes as they open. First, a real breakfast with actual protein in it. You'll thank me by 10.",
      "One sweet rule for today: photograph it. Every stop, every little moment, take a picture so tonight I can live the whole day back through your eyes. So do your lashes, put your face on, and start the morning already picture-ready. Glasses or contacts, either one, you are breathtaking in both.",
      "Get dressed in your gym clothes first, that's look number one. Then pack a bag, because here's the important part: once you leave this morning, you are not coming back home until the night is over. Everything you need comes with you, in one backpack you'll carry all day.",
    ],
    packlist: {
      label: "Pack this. You won't be home again until tonight.",
      items: [
        "The gym clothes you're wearing right now",
        "A bathing suit",
        "A cute daytime outfit",
        "A sexy dinner dress for the evening",
        "An even sexier one for after dinner \ud83d\ude09",
      ],
    },
    photos: [{ src: 'c01.jpg', cap: 'us. exhibit A.' }],
  },
  {
    n: 2, t: at('09:15:00'), clock: '9:15 AM', band: 'am',
    eyebrow: 'Chapter II \u00b7 Morning',
    title: 'Chapter one is sweat',
    place: 'Club S\u016bd\u014d',
    address: '16 Famous Ave, Unit 145, Woodbridge (Vaughan)',
    mapQ: 'Club Sudo, 16 Famous Ave Unit 145, Vaughan ON',
    body: [
      "Around 9:15, get a ride to Club S\u016bd\u014d, from your dad or an Uber, and bring your backpack, since you won't be swinging back home after this. Give yourself time to arrive, settle in, and get in the zone before class.",
      "This one's a gift: I set you up with a 10-day trial, so check in under your name, Anjali Gandhi. Your class is Steady Strength, Intermediate, at 10:30, so ask for Allexa Schabel, she knows you're coming.",
      "Go work that booty and be a little smug about it. Snap a flushed, proud, glowing photo when you're done, I want to see exactly how strong you looked.",
    ],
    keycard: {
      label: 'Your trial, in case they need details at the desk',
      name: 'Anjali Gandhi',
      email: 'spasricha@qmed.ca',
      password: 'sachinpasricha',
    },
    photos: [
      { src: 'c02.jpg', cap: 'you mid-laugh, my favourite genre.' },
      { src: 'c04.jpg', cap: 'proof we clean up okay.' },
    ],
  },
  {
    n: 3, t: at('11:30:00'), clock: '11:30 AM', band: 'am',
    eyebrow: 'Chapter III \u00b7 Midday',
    title: 'Hot, then cold',
    place: 'Contrast Therapy \u00b7 Open Flow, Club S\u016bd\u014d',
    body: [
      "Straight into contrast therapy, open flow, move at your own pace. Sauna until you're melty, cold plunge until you gasp, repeat.",
      "Keep it to about 20 to 30 minutes today though. There's plenty more day ahead of you, and your trial means you can come back and linger any time over the next 10 days.",
      "When you're done, rinse off and freshen up, then change into your cute daytime outfit. A quick one is all you need; you'll have plenty of time to get properly dressed up before dinner. Think about me if you want to (you don't have to, but you will).",
    ],
    photos: [{ src: 'c03.jpg', cap: 'cold day, warm you.' }],
  },
  {
    n: 4, t: at('12:15:00'), clock: '12:15 PM', band: 'am',
    eyebrow: 'Chapter IV \u00b7 Midday',
    title: 'Grab and go',
    place: "Lunch, wherever\u2019s quickest",
    body: [
      "This one's all yours, and it's quick. You're a little pressed for time now, so grab something tasty wherever's fastest, the plaza, a spot near the station, wherever, as long as it travels well.",
      "Keep it grab-and-go, the kind of thing you can eat on the subway. (Clementina in the plaza works if it's speedy, but don't wait around.) I love that I get to feed you even from here.",
    ],
    photos: [{ src: 'c05.jpg', cap: 'this one lives in my head rent-free.' }],
  },
  {
    n: 5, t: at('12:45:00'), clock: '12:45 PM', band: 'am',
    eyebrow: 'Chapter V \u00b7 Midday',
    title: 'Your chariot, then the train',
    place: 'Uber \u2192 Vaughan Metropolitan Centre, then Line 1 south',
    mapQ: 'Vaughan Metropolitan Centre Station',
    body: [
      "Order your Uber now to Vaughan Metropolitan Centre subway station, the big shiny one at the end of the line.",
      "From there, tap in and hop on Line 1 heading south. Grab a seat, put a good song on, eat your lunch, and enjoy twenty-odd minutes of doing nothing. Get off at Osgoode. The next note tells you where to walk from there. Almost there.",
    ],
    photos: [
      { src: 'c06.jpg', cap: 'look at us.' },
      { src: 'c07.jpg', cap: 'my favourite plus-one.' },
    ],
  },
  {
    n: 6, t: at('13:45:00'), clock: '1:45 PM', band: 'am',
    eyebrow: 'Chapter VI \u00b7 Afternoon',
    title: 'Read something we\u2019ll share',
    place: 'Flying Books at Neverland',
    address: '371 Queen St W (near Osgoode station)',
    mapQ: 'Flying Books at Neverland, 371 Queen St W, Toronto',
    body: [
      "Walk to Flying Books at Neverland, 371 Queen St W. It's a bookshop and a wine bar pretending to be one cozy room, and it's yours for the next hour.",
      "Your mission: pick a book you actually want us to read together. Whatever you choose, I promise to read it within two years. A real promise, in writing, timestamped right here.",
      "While you browse, order yourself a glass of wine or a ridiculous fancy coffee. Take your time and enjoy your own company (and one more photo for me). This is your last solo stop before you come find me.",
    ],
    photos: [
      { src: 'c08.jpg', cap: 'wine and you, a theme develops.' },
      { src: 'c09.jpg', cap: 'you make the camera nervous.' },
    ],
  },
  {
    n: 7, t: at('15:15:00'), clock: '3:15 PM', band: 'pm',
    eyebrow: 'Chapter VII \u00b7 Afternoon',
    title: 'Come to me',
    place: "\u2192 Sachin\u2019s condo (you know the way)",
    body: [
      "Close the book (buy it, obviously) and head to my place. You know the address by heart.",
      "This is where the solo part ends and I finally get you all to myself. Come to me. From here on, I'm right by your side for the rest of the night.",
    ],
    photos: [{ src: 'c10.jpg', cap: 'dressed up, still goofy.' }],
  },
  {
    n: 8, t: at('15:45:00'), clock: '3:45 PM', band: 'pm',
    eyebrow: 'Chapter VIII \u00b7 Evening approaches',
    title: 'Get ready sexy',
    place: "Get ready at Sachin\u2019s, until 5:00",
    body: [
      "Take your time getting ready, and I'll be right there with you while you do. Slip into that dinner dress and dress in a way that makes me want to end the night early \ud83d\ude09",
      "This is the version of tonight I've been picturing since I started planning all of this. Pour yourself something if you like, and enjoy having me all to yourself again.",
    ],
    photos: [{ src: 'c11.jpg', cap: 'eighteen months of this face.' }],
  },
  {
    n: 9, t: at('17:15:00'), clock: '5:15 PM', band: 'pm',
    eyebrow: 'Chapter IX \u00b7 Evening',
    title: 'Back out into it',
    place: 'Uber \u2192 Flying Books, College St',
    address: '784 College St',
    mapQ: 'Flying Books, 784 College St, Toronto',
    body: [
      "When you're ready, and you look unreal, I already know, we'll grab an Uber together to the other Flying Books, 784 College St.",
      "Yes, there are two locations. This is the second one, a lovely little detour before dinner. Browse the shelves with me for a few minutes.",
    ],
    photos: [{ src: 'c12.jpg', cap: "hi. it\u2019s us again." }],
  },
  {
    n: 10, t: at('18:15:00'), clock: '6:15 PM', band: 'pm',
    eyebrow: 'Chapter X \u00b7 Evening',
    title: 'Dinner',
    place: 'Bar Isabel',
    address: '797 College St, right across the street',
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
    n: 11, t: at('19:45:00'), clock: '7:45 PM', band: 'pm',
    eyebrow: 'Chapter XI \u00b7 Evening',
    title: 'Something sweet',
    place: 'Bang Bang Ice Cream',
    address: '93A Ossington Ave, a short walk over',
    mapQ: 'Bang Bang Ice Cream, 93A Ossington Ave, Toronto',
    body: [
      "Walk it off toward Ossington and get in line at Bang Bang, 93A Ossington. If the line's a monster we bail and find trouble elsewhere, no ice cream is worth an hour.",
      "But if it's moving, get the weird flavour and share a cone with me under the lights. (They close around 8:45, so we're heading over a little early to be safe, gorgeous.)",
    ],
    photos: [
      { src: 'c15.jpg', cap: 'closer still.' },
      { src: 'c16.jpg', cap: "okay now I\u2019m just showing off." },
    ],
  },
  {
    n: 12, t: at('21:30:00'), clock: '9:30 PM', band: 'pm',
    eyebrow: 'Chapter XII \u00b7 Home',
    title: 'Head home for\u2026',
    body: [
      "That's the whole itinerary, my love. Eighteen months, one day built entirely around you.",
      "Now we go home, together, finally. I'll let you imagine the rest, I've been imagining it all week.",
      "Happy anniversary, Anjali. I'm completely, ridiculously yours. Sachin",
    ],
    photos: [
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
        <p className="gate-sub">Sachin &amp; Anjali · {WEEKDAY}, {MONTHDAY}</p>
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

            {c.packlist && (
              <div className="packlist">
                <div className="packlist-label">{c.packlist.label}</div>
                <ul>
                  {c.packlist.items.map((it, k) => <li key={k}>{it}</li>)}
                </ul>
              </div>
            )}

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
          <p className="hero-date">{WEEKDAY} · {MONTHDAY} · {YEAR}</p>

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
              Super&nbsp;Bowl take, and you deciding I was worth a reply. I planned
              this entire day for you, top to bottom, and I could not be more
              excited about it.
            </p>
            <p>
              The first half is yours to enjoy on your own. I won't be next to you
              for it, but make no mistake: I'm guiding every step, and I'm watching.
              Each note below stays sealed until its moment arrives, so no skipping
              ahead (the locks are real, I checked). Follow them in order and trust
              me.
            </p>
            <p className="note-sign">Happy eighteen months, Anjali. Yours, S</p>
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
              The day hasn't started yet. The first note opens at {CHAPTERS[0].clock}.{' '}
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

.packlist{margin-top:14px;border:1px solid var(--line);border-radius:12px;background:rgba(22,15,28,.5);padding:14px 16px}
.packlist-label{font-family:var(--mono);font-size:.62rem;letter-spacing:.16em;text-transform:uppercase;color:var(--gold-dim);margin-bottom:11px}
.packlist ul{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:9px}
.packlist li{position:relative;padding-left:22px;color:var(--soft);font-size:.94rem;line-height:1.4}
.packlist li::before{content:"";position:absolute;left:3px;top:.55em;width:7px;height:7px;border-radius:2px;transform:rotate(45deg);background:linear-gradient(135deg,var(--gold),var(--gold-dim))}
.packlist li:last-child{color:var(--rose)}
.packlist li:last-child::before{background:linear-gradient(135deg,var(--rose),var(--rose-deep))}

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
