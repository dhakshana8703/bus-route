"use client"

import { useMemo, useState } from "react"
import {
  ArrowRight,
  ArrowUpDown,
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CreditCard,
  HelpCircle,
  MapPin,
  Menu,
  Minus,
  Navigation,
  Plus,
  ShieldCheck,
  Sparkles,
  TrainFront,
  Users,
  X,
  Zap,
} from "lucide-react"

const routes = [
  { code: "BLR", city: "Bengaluru", station: "KSR Bengaluru" },
  { code: "MAA", city: "Chennai", station: "Chennai Central" },
  { code: "CJB", city: "Coimbatore", station: "Coimbatore Junction" },
  { code: "COK", city: "Kochi", station: "Ernakulam Junction" },
]

const journeys = [
  { id: 1, operator: "Vande Bharat", train: "VB 20643", depart: "06:00", arrive: "10:20", duration: "4h 20m", stops: 2, price: 1295, className: "Chair car", seats: 18 },
  { id: 2, operator: "Shatabdi Express", train: "SBC MAS 12028", depart: "07:15", arrive: "12:05", duration: "4h 50m", stops: 3, price: 980, className: "Executive chair", seats: 31 },
  { id: 3, operator: "InterCity Express", train: "IC 12678", depart: "13:10", arrive: "18:05", duration: "4h 55m", stops: 5, price: 745, className: "AC chair car", seats: 9 },
]

const stops = ["Bengaluru · KSR Bengaluru", "Hosur · Railway Station", "Salem · Junction", "Chennai · Chennai Central"]

const steps = ["Search", "Journey", "Seats", "Passenger", "Review", "Payment"]

export default function Home() {
  const [origin, setOrigin] = useState("Bengaluru")
  const [destination, setDestination] = useState("Chennai")
  const [passengers, setPassengers] = useState(1)
  const [date, setDate] = useState("Fri, Nov 14")
  const [searched, setSearched] = useState(false)
  const [selectedJourney, setSelectedJourney] = useState<(typeof journeys)[number] | null>(null)
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [expanded, setExpanded] = useState<number | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [complete, setComplete] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [sort, setSort] = useState("Recommended")
  const [passengerName, setPassengerName] = useState("")

  const seatOptions = ["12A", "12B", "12C", "13A", "13B", "14A", "14B", "14C", "15A", "15B"]
  const total = selectedJourney ? selectedJourney.price * passengers + selectedSeats.length * 120 : 0
  const canContinue = activeStep === 2 ? selectedSeats.length === passengers : activeStep === 3 ? passengerName.trim().length > 2 : true

  const sortedJourneys = useMemo(() => [...journeys].sort((a, b) => sort === "Price" ? a.price - b.price : sort === "Fastest" ? Number.parseInt(a.duration) - Number.parseInt(b.duration) : a.id - b.id), [sort])

  function swapStations() {
    setOrigin(destination)
    setDestination(origin)
  }

  function startSearch() {
    setSearched(true)
    setActiveStep(0)
    window.setTimeout(() => document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" }), 40)
  }

  function chooseJourney(journey: (typeof journeys)[number]) {
    setSelectedJourney(journey)
    setActiveStep(2)
    setExpanded(journey.id)
  }

  function continueFlow() {
    if (!canContinue) return
    if (activeStep === 5) {
      setComplete(true)
      return
    }
    setActiveStep((step) => Math.min(step + 1, 5))
  }

  function reset() {
    setComplete(false)
    setSearched(false)
    setSelectedJourney(null)
    setSelectedSeats([])
    setActiveStep(0)
    setPassengerName("")
  }

  return (
    <main className="min-h-screen bg-[#f7f8fb] text-[#182033]">
      <header className="border-b border-[#e6e9f0] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="RouteFlow home">
            <span className="flex size-9 items-center justify-center rounded-xl bg-[#1e2d5c] text-white"><TrainFront aria-hidden="true" /></span>
            <span className="text-[17px] font-bold tracking-[-0.03em]">Route<span className="text-[#e28b3d]">Flow</span></span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-[#687087] md:flex">
            <a href="#how-it-works" className="transition hover:text-[#1e2d5c]">How it works</a>
            <a href="#why-routeflow" className="transition hover:text-[#1e2d5c]">Why RouteFlow</a>
            <a href="#help" className="transition hover:text-[#1e2d5c]">Help center</a>
          </nav>
          <div className="hidden items-center gap-4 md:flex"><span className="text-sm text-[#687087]">Already booked?</span><button className="rounded-lg border border-[#d9deea] px-4 py-2 text-sm font-semibold text-[#1e2d5c] hover:bg-[#f7f8fb]">Manage trip</button></div>
          <button className="rounded-lg p-2 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <div className="border-t border-[#e6e9f0] px-5 py-4 md:hidden"><nav className="flex flex-col gap-4 text-sm font-medium"><a href="#how-it-works">How it works</a><a href="#why-routeflow">Why RouteFlow</a><a href="#help">Help center</a></nav></div>}
      </header>

      <section id="top" className="relative overflow-hidden border-b border-[#e6e9f0] bg-[#eef1f8]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-14 pt-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:pb-20 lg:pt-20">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#dce2ef] bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.13em] text-[#56627d]"><Sparkles className="size-3.5 text-[#e28b3d]" /> Travel, simplified</div>
            <h1 className="max-w-[600px] text-4xl font-bold leading-[1.05] tracking-[-0.055em] text-[#17213c] sm:text-5xl lg:text-[62px]">Your journey starts with a <span className="text-[#e28b3d]">better route.</span></h1>
            <p className="mt-6 max-w-[520px] text-base leading-7 text-[#657087] sm:text-lg">Compare train operators, choose your perfect seat, and book South India rail with confidence—all in one clear flow.</p>
            <div className="mt-8 flex flex-wrap gap-5 text-sm font-medium text-[#526078]"><span className="flex items-center gap-2"><ShieldCheck className="size-4 text-[#4b8a69]" /> Secure checkout</span><span className="flex items-center gap-2"><Zap className="size-4 text-[#e28b3d]" /> Instant confirmation</span></div>
          </div>
          <div className="relative lg:pl-8">
            <div className="absolute -right-16 -top-16 size-64 rounded-full border border-[#d8deed]" /><div className="absolute -bottom-24 -left-4 size-52 rounded-full border border-[#d8deed]" />
            <div className="relative rounded-2xl border border-[#dfe4ee] bg-white p-5 shadow-[0_18px_50px_rgba(35,49,88,0.10)] sm:p-7">
              <div className="mb-6 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8b94a8]">Plan your trip</p><h2 className="mt-1 text-xl font-bold tracking-[-0.03em]">Where are you going?</h2></div><span className="rounded-lg bg-[#f5ede5] px-2.5 py-1 text-xs font-bold text-[#a35e25]">Demo data</span></div>
              <div className="relative grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
                <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.1em] text-[#7b8498]">From</span><select value={origin} onChange={(e) => setOrigin(e.target.value)} className="h-12 w-full rounded-xl border border-[#dfe4ee] bg-white px-3 text-sm font-semibold outline-none focus:border-[#e28b3d]"><option>Bengaluru</option><option>Chennai</option><option>Coimbatore</option><option>Kochi</option></select></label>
                <button onClick={swapStations} className="mb-1 flex size-10 items-center justify-center rounded-full border border-[#dfe4ee] bg-white text-[#1e2d5c] shadow-sm hover:border-[#e28b3d]" aria-label="Swap origin and destination"><ArrowUpDown className="size-4" /></button>
                <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.1em] text-[#7b8498]">To</span><select value={destination} onChange={(e) => setDestination(e.target.value)} className="h-12 w-full rounded-xl border border-[#dfe4ee] bg-white px-3 text-sm font-semibold outline-none focus:border-[#e28b3d]"><option>Chennai</option><option>Bengaluru</option><option>Coimbatore</option><option>Kochi</option></select></label>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3"><label><span className="mb-2 block text-xs font-bold uppercase tracking-[0.1em] text-[#7b8498]">Departure</span><div className="relative"><CalendarDays className="absolute left-3 top-3.5 size-4 text-[#8992a5]" /><input value={date} onChange={(e) => setDate(e.target.value)} className="h-12 w-full rounded-xl border border-[#dfe4ee] pl-10 pr-3 text-sm font-semibold outline-none focus:border-[#e28b3d]" /></div></label><label><span className="mb-2 block text-xs font-bold uppercase tracking-[0.1em] text-[#7b8498]">Passengers</span><div className="flex h-12 items-center justify-between rounded-xl border border-[#dfe4ee] px-3"><Users className="size-4 text-[#8992a5]" /><button onClick={() => setPassengers(Math.max(1, passengers - 1))} className="rounded p-1 hover:bg-[#f2f4f8]" aria-label="Decrease passengers"><Minus className="size-4" /></button><span className="text-sm font-semibold">{passengers}</span><button onClick={() => setPassengers(Math.min(6, passengers + 1))} className="rounded p-1 hover:bg-[#f2f4f8]" aria-label="Increase passengers"><Plus className="size-4" /></button></div></label><button onClick={startSearch} className="h-12 self-end rounded-xl bg-[#1e2d5c] px-5 text-sm font-bold text-white shadow-sm transition hover:bg-[#263a73]">Search journeys <ArrowRight className="ml-1 inline size-4" /></button></div>
              <p className="mt-4 flex items-center gap-2 text-xs text-[#8992a5]"><ShieldCheck className="size-3.5" /> No fees to search. Prices shown include standard taxes.</p>
            </div>
          </div>
        </div>
      </section>

      {searched && !complete && <section id="results" className="mx-auto max-w-7xl scroll-mt-6 px-5 py-12 lg:px-8"><div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold text-[#e28b3d]">{date} · {passengers} passenger{passengers > 1 ? "s" : ""}</p><h2 className="mt-1 text-3xl font-bold tracking-[-0.04em]">{origin} <ArrowRight className="mx-1 inline size-6 text-[#8992a5]" /> {destination}</h2><p className="mt-2 text-sm text-[#727d92]">{sortedJourneys.length} journeys available · Demo availability</p></div><label className="flex items-center gap-2 text-sm font-medium text-[#667188]">Sort by <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-lg border border-[#dfe4ee] bg-white px-3 py-2 font-semibold text-[#1e2d5c] outline-none"><option>Recommended</option><option>Price</option><option>Fastest</option></select></label></div><div className="grid gap-4">{sortedJourneys.map((journey) => <article key={journey.id} className={`overflow-hidden rounded-2xl border bg-white transition ${selectedJourney?.id === journey.id ? "border-[#e28b3d] shadow-[0_10px_30px_rgba(226,139,61,0.12)]" : "border-[#e1e5ed]"}`}><div className="grid gap-5 p-5 lg:grid-cols-[1.15fr_1fr_auto] lg:items-center lg:p-6"><div className="flex items-start gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#eef1f8] text-[#1e2d5c]"><TrainFront className="size-5" /></span><div><div className="flex flex-wrap items-center gap-2"><h3 className="font-bold">{journey.operator}</h3><span className="rounded bg-[#f1f3f7] px-2 py-0.5 text-xs font-semibold text-[#717c91]">{journey.train}</span></div><p className="mt-1 text-sm text-[#7b8498]">{journey.className} · {journey.seats} seats left</p></div></div><div className="flex items-center justify-between gap-4"><div><p className="text-xl font-bold tracking-[-0.03em]">{journey.depart}</p><p className="text-xs text-[#8992a5]">{origin}</p></div><div className="min-w-[110px] text-center"><p className="text-xs font-medium text-[#8992a5]">{journey.duration}</p><div className="my-1 flex items-center gap-1"><span className="size-1.5 rounded-full bg-[#e28b3d]" /><span className="h-px flex-1 bg-[#cdd3df]" /><span className="size-1.5 rounded-full bg-[#1e2d5c]" /></div><p className="text-xs text-[#8992a5]">{journey.stops} stops</p></div><div className="text-right"><p className="text-xl font-bold tracking-[-0.03em]">{journey.arrive}</p><p className="text-xs text-[#8992a5]">{destination}</p></div></div><div className="flex items-center justify-between gap-3 lg:justify-end"><div className="lg:text-right"><p className="text-xs text-[#8992a5]">from</p><p className="text-xl font-bold text-[#1e2d5c]">$₹{journey.price}</p></div><button onClick={() => chooseJourney(journey)} className="rounded-xl bg-[#e28b3d] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#c9762b]">Select</button></div></div><div className="flex items-center justify-between border-t border-[#eef0f4] px-5 py-3 lg:px-6"><button onClick={() => setExpanded(expanded === journey.id ? null : journey.id)} className="flex items-center gap-2 text-sm font-semibold text-[#5f6b82] hover:text-[#1e2d5c]">{expanded === journey.id ? "Hide route" : "View route"}<ChevronDown className={`size-4 transition ${expanded === journey.id ? "rotate-180" : ""}`} /></button><span className="flex items-center gap-1.5 text-xs font-semibold text-[#4b8a69]"><BadgeCheck className="size-4" /> Free changes up to 24h</span></div>{expanded === journey.id && <div className="bg-[#fafbfc] px-5 pb-5 pt-2 lg:px-6"><div className="grid gap-0 sm:grid-cols-4">{stops.map((stop, index) => <div key={stop} className="relative flex gap-3 py-3 sm:block sm:pl-0 sm:pt-4"><span className={`relative z-10 mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 bg-[#fafbfc] ${index === 0 ? "border-[#e28b3d]" : index === stops.length - 1 ? "border-[#1e2d5c]" : "border-[#c7cfdd]"}`}>{(index === 0 || index === stops.length - 1) && <span className="size-1.5 rounded-full bg-current" />}</span>{index < stops.length - 1 && <span className="absolute left-[9px] top-8 h-full w-px bg-[#d5dbe6] sm:left-[10px] sm:top-6 sm:h-px sm:w-[calc(100%-10px)]" />}<p className="text-xs font-semibold text-[#4e5b73] sm:mt-3">{stop}</p><p className="mt-1 text-[11px] text-[#929bad]">{index === 0 ? "Board here" : index === stops.length - 1 ? "Arrive here" : <>Stop {index}</>}</p></div>)}</div></div>}</article>)}</div></section>}

      {searched && selectedJourney && !complete && <section className="border-t border-[#e6e9f0] bg-white"><div className="mx-auto max-w-7xl px-5 py-10 lg:px-8"><div className="mb-8 flex items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#e28b3d]">Your booking</p><h2 className="mt-1 text-2xl font-bold tracking-[-0.04em]">{steps[activeStep]}</h2></div><button onClick={reset} className="text-sm font-semibold text-[#687087] hover:text-[#1e2d5c]">Start over</button></div><div className="mb-10 flex items-center justify-between gap-1 overflow-x-auto pb-1">{steps.map((step, index) => <div key={step} className="flex min-w-fit items-center gap-2"><div className={`flex size-8 items-center justify-center rounded-full text-xs font-bold ${index < activeStep ? "bg-[#4b8a69] text-white" : index === activeStep ? "bg-[#1e2d5c] text-white" : "bg-[#edf0f5] text-[#8992a5]"}`}>{index < activeStep ? <Check className="size-4" /> : index + 1}</div><span className={`hidden text-xs font-bold sm:block ${index === activeStep ? "text-[#1e2d5c]" : "text-[#8992a5]"}`}>{step}</span>{index < steps.length - 1 && <span className="mx-1 h-px w-8 bg-[#dfe4ee] sm:w-12" />}</div>)}</div><div className="grid gap-8 lg:grid-cols-[1fr_320px]"><div className="rounded-2xl border border-[#e1e5ed] bg-[#fafbfc] p-5 sm:p-7">{activeStep === 2 && <div><h3 className="text-xl font-bold">Choose your seats</h3><p className="mt-2 text-sm text-[#727d92]">Select {passengers} seat{passengers > 1 ? "s" : ""}. Seat reservation is included in your fare.</p><div className="mx-auto mt-8 max-w-md rounded-2xl border border-[#dfe4ee] bg-white p-5"><div className="mb-5 flex items-center justify-between border-b border-[#eef0f4] pb-4 text-xs font-bold text-[#8992a5]"><span>QUIET COACH · {selectedJourney.train}</span><span>FRONT</span></div><div className="grid grid-cols-4 gap-3">{seatOptions.map((seat) => <button key={seat} onClick={() => setSelectedSeats(selectedSeats.includes(seat) ? selectedSeats.filter((s) => s !== seat) : selectedSeats.length < passengers ? [...selectedSeats, seat] : selectedSeats)} className={`rounded-lg border py-3 text-xs font-bold transition ${selectedSeats.includes(seat) ? "border-[#e28b3d] bg-[#f5ede5] text-[#a35e25]" : "border-[#dfe4ee] bg-white text-[#69748a] hover:border-[#1e2d5c]"}`}>{seat}</button>)}</div><div className="mt-5 flex items-center justify-center gap-4 text-xs text-[#8992a5]"><span className="flex items-center gap-1.5"><i className="size-3 rounded border border-[#dfe4ee] bg-white" /> Available</span><span className="flex items-center gap-1.5"><i className="size-3 rounded border border-[#e28b3d] bg-[#f5ede5]" /> Selected</span></div></div></div>}{activeStep === 3 && <div><h3 className="text-xl font-bold">Who&apos;s traveling?</h3><p className="mt-2 text-sm text-[#727d92]">Enter the name exactly as it appears on your government-issued ID.</p><label className="mt-7 block max-w-lg"><span className="mb-2 block text-sm font-bold">Passenger 1</span><input value={passengerName} onChange={(e) => setPassengerName(e.target.value)} placeholder="Full legal name" className="h-12 w-full rounded-xl border border-[#dfe4ee] bg-white px-4 text-sm outline-none focus:border-[#e28b3d]" /></label><div className="mt-6 flex items-start gap-3 rounded-xl border border-[#dfe4ee] bg-white p-4 text-sm text-[#69748a]"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#4b8a69]" /><span>Your information is encrypted and only shared with the rail operator for ticketing.</span></div></div>}{activeStep === 4 && <div><h3 className="text-xl font-bold">Review your trip</h3><div className="mt-6 rounded-xl border border-[#dfe4ee] bg-white p-5"><div className="flex items-center justify-between"><div><p className="text-lg font-bold">{origin} <ArrowRight className="mx-1 inline size-4" /> {destination}</p><p className="mt-1 text-sm text-[#7b8498]">{date} · {selectedJourney.train} · {selectedJourney.depart}–{selectedJourney.arrive}</p></div><TrainFront className="size-6 text-[#1e2d5c]" /></div><div className="my-5 border-t border-[#eef0f4]" /><div className="grid gap-3 text-sm sm:grid-cols-2"><p><span className="text-[#8992a5]">Passenger</span><br /><strong>{passengerName || "Not entered"}</strong></p><p><span className="text-[#8992a5]">Seat{selectedSeats.length > 1 ? "s" : ""}</span><br /><strong>{selectedSeats.join(", ") || "Not selected"}</strong></p></div></div></div>}{activeStep === 5 && <div><h3 className="text-xl font-bold">Demo payment</h3><p className="mt-2 text-sm text-[#727d92]">No real payment will be processed. This simulates a secure handoff to checkout.</p><div className="mt-7 flex items-center gap-4 rounded-xl border border-[#dfe4ee] bg-white p-5"><span className="flex size-11 items-center justify-center rounded-xl bg-[#eef1f8] text-[#1e2d5c]"><CreditCard className="size-5" /></span><div><p className="font-bold">Test card ending in 4242</p><p className="mt-1 text-sm text-[#8992a5]">Mock payment · No charge</p></div><Check className="ml-auto size-5 text-[#4b8a69]" /></div></div>}<div className="mt-8 flex justify-between border-t border-[#e5e8ef] pt-5"><button onClick={() => setActiveStep(Math.max(2, activeStep - 1))} className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-bold text-[#69748a] hover:bg-white" disabled={activeStep === 2}><ChevronLeft className="size-4" /> Back</button><button onClick={continueFlow} disabled={!canContinue} className="rounded-xl bg-[#1e2d5c] px-5 py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">{activeStep === 5 ? "Complete demo booking" : "Continue"} <ChevronRight className="ml-1 inline size-4" /></button></div></div><aside className="h-fit rounded-2xl border border-[#e1e5ed] bg-white p-5"><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8992a5]">Trip summary</p><div className="mt-4 flex items-start justify-between gap-3"><div><p className="font-bold">{selectedJourney.operator}</p><p className="mt-1 text-sm text-[#7b8498]">{selectedJourney.train} · {selectedJourney.className}</p></div><p className="font-bold">${selectedJourney.price}</p></div><div className="my-4 border-t border-[#eef0f4]" /><div className="flex justify-between text-sm text-[#727d92]"><span>Base fare × {passengers}</span><span>${selectedJourney.price * passengers}</span></div><div className="mt-2 flex justify-between text-sm text-[#727d92]"><span>Seat reservation</span><span>${selectedSeats.length * 12}</span></div><div className="mt-4 flex justify-between border-t border-[#eef0f4] pt-4 text-lg font-bold"><span>Total</span><span className="text-[#1e2d5c]">${total}</span></div><p className="mt-4 text-xs leading-5 text-[#8992a5]">Free changes up to 24 hours before departure. Demo fare includes taxes.</p></aside></div></div></section>}

      {complete && <section className="mx-auto max-w-2xl px-5 py-20 text-center lg:py-28"><div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#dff1e6] text-[#4b8a69]"><Check className="size-8" /></div><p className="mt-6 text-sm font-bold uppercase tracking-[0.14em] text-[#4b8a69]">Demo booking confirmed</p><h1 className="mt-3 text-4xl font-bold tracking-[-0.05em]">You&apos;re ready to roll.</h1><p className="mx-auto mt-4 max-w-md leading-7 text-[#727d92]">Your mock ticket for {origin} to {destination} is ready. In production, a confirmation and ticket would be sent to your email.</p><div className="mx-auto mt-8 max-w-sm rounded-2xl border border-[#e1e5ed] bg-white p-6 text-left shadow-sm"><div className="flex items-center justify-between"><span className="text-sm font-bold text-[#1e2d5c]">RouteFlow</span><span className="rounded-full bg-[#dff1e6] px-2.5 py-1 text-xs font-bold text-[#4b8a69]">CONFIRMED</span></div><div className="my-5 border-t border-dashed border-[#dfe4ee]" /><p className="text-2xl font-bold">{origin} <ArrowRight className="mx-1 inline size-5 text-[#e28b3d]" /> {destination}</p><p className="mt-2 text-sm text-[#727d92]">{date} · {selectedJourney?.train} · Seat {selectedSeats.join(", ")}</p><p className="mt-5 text-xs font-bold uppercase tracking-[0.1em] text-[#8992a5]">Confirmation code</p><p className="mt-1 font-mono text-lg font-bold text-[#1e2d5c]">RF-7K2M9Q</p></div><button onClick={reset} className="mt-8 rounded-xl bg-[#1e2d5c] px-5 py-3 text-sm font-bold text-white hover:bg-[#263a73]">Book another journey</button></section>}

      {!searched && <><section id="why-routeflow" className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="grid gap-8 sm:grid-cols-3"><div><div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-[#eef1f8] text-[#1e2d5c]"><Navigation className="size-5" /></div><h3 className="font-bold">Every route, one view</h3><p className="mt-2 text-sm leading-6 text-[#727d92]">Compare departure times, stops, operators, and fares without opening five tabs.</p></div><div><div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-[#f5ede5] text-[#a35e25]"><BadgeCheck className="size-5" /></div><h3 className="font-bold">Book with clarity</h3><p className="mt-2 text-sm leading-6 text-[#727d92]">See the exact route and seat before you commit. No surprise fees at the final step.</p></div><div><div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-[#e5f1eb] text-[#4b8a69]"><Clock3 className="size-5" /></div><h3 className="font-bold">Plans change. That&apos;s okay.</h3><p className="mt-2 text-sm leading-6 text-[#727d92]">Flexible fares and straightforward change policies keep your plans moving.</p></div></div></section><section id="how-it-works" className="border-y border-[#e6e9f0] bg-white"><div className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="max-w-xl"><p className="text-sm font-bold uppercase tracking-[0.12em] text-[#e28b3d]">A calmer way to travel</p><h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">From search to seat in three simple steps.</h2></div><div className="mt-10 grid gap-8 md:grid-cols-3">{[["01", "Search smarter", "Tell us where you&apos;re going and we&apos;ll surface the journeys that fit."], ["02", "Choose confidently", "Compare the details that matter, then pick your route and seat."], ["03", "Travel lightly", "Your ticket is clear, your plans are organized, and you&apos;re on your way."]].map(([number, title, body]) => <div key={number} className="border-l-2 border-[#e28b3d] pl-5"><span className="font-mono text-sm font-bold text-[#e28b3d]">{number}</span><h3 className="mt-4 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#727d92]">{body}</p></div>)}</div></div></section></>}

      <footer id="help" className="bg-[#17213c] text-white"><div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8"><div><div className="flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-lg bg-white/10"><TrainFront className="size-4" /></span><span className="font-bold">RouteFlow</span></div><p className="mt-3 text-sm text-[#aeb7ca]">Clearer journeys start here.</p></div><div className="flex flex-wrap gap-5 text-sm text-[#c1c8d7]"><a href="#help" className="hover:text-white">Help center</a><a href="#top" className="hover:text-white">Terms</a><a href="#top" className="hover:text-white">Privacy</a><span className="flex items-center gap-1.5"><HelpCircle className="size-4" /> Demo mode</span></div></div></footer>
    </main>
  )
}
