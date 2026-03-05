import Image from 'next/image'

export default function Home() {
  return (
    <main>
      {/* ── HERO ── */}
      <section className="relative w-full h-screen overflow-hidden bg-black">
        {/* Page frame — stays with hero */}
        <div className="absolute inset-8 border border-gold/85 pointer-events-none z-[9999] shadow-[inset_0_0_80px_rgba(184,148,106,0.04),inset_0_0_2px_rgba(184,148,106,0.15)] before:content-[''] before:absolute before:inset-[5px] before:border before:border-gold/25" />

        {/* Hero image */}
        <Image
          src="/images/hero-bg.jpg"
          alt="KT Equestrian"
          fill
          priority
          className="object-cover object-center grayscale brightness-[0.65] contrast-110 opacity-72"
        />

        {/* Hero frame border */}
        <div className="absolute inset-[14px] border border-gold/85 pointer-events-none z-10 shadow-[inset_0_0_40px_rgba(184,148,106,0.06),0_0_60px_rgba(184,148,106,0.08)]" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 z-20"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.65) 100%), radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.35) 100%)'
          }}
        />

        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-[90px] py-[68px]">
          <div className="flex items-center gap-3 opacity-0 animate-fade-down" style={{ animationDelay: '0.3s' }}>
            <Image
              src="/images/kt_logo.png"
              alt="KT Equestrian"
              width={38}
              height={38}
              className="brightness-0 invert"
            />
            <div className="w-5 h-px bg-gold" />
            <span className="font-[var(--font-cinzel)] text-[13px] tracking-[0.35em] text-champagne uppercase">
              KT Equestrian
            </span>
          </div>
          <div className="flex items-center gap-10 opacity-0 animate-fade-down" style={{ animationDelay: '0.5s' }}>
            <div className="hidden md:flex flex-col items-end gap-0.5">
              <span className="font-[var(--font-jost)] text-[10px] tracking-[0.2em] text-champagne/65 uppercase">info@ktequestrian.com</span>
              <span className="font-[var(--font-jost)] text-[11px] tracking-[0.15em] text-champagne">+352 621 000 000</span>
            </div>
            <a
              href="#contact"
              className="font-[var(--font-cinzel)] text-[10px] tracking-[0.3em] text-champagne uppercase border border-gold/50 px-5 py-2.5 transition-all duration-300 hover:bg-gold/15 hover:border-gold hover:text-gold"
            >
              Contact Us
            </a>
            <button className="flex flex-col gap-1 cursor-pointer p-1">
              <span className="block w-[22px] h-px bg-champagne transition-all" />
              <span className="block w-[22px] h-px bg-champagne transition-all" />
              <span className="block w-[14px] h-px bg-champagne transition-all" />
            </button>
          </div>
        </nav>

        {/* Hero content */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-[120px]">
          <div className="flex items-center gap-5 mb-6 opacity-0 animate-fade-up" style={{ animationDelay: '0.8s' }}>
            <span className="w-[50px] h-px bg-gold" />
            <span className="font-[var(--font-cinzel)] text-[11px] tracking-[0.5em] text-gold uppercase">The Art of Riding</span>
            <span className="w-[50px] h-px bg-gold" />
          </div>
          <h1
            className="font-[var(--font-cinzel)] font-normal text-champagne uppercase tracking-[0.12em] leading-[0.9] mb-8"
            style={{ fontSize: 'clamp(52px, 9vw, 110px)' }}
          >
            Equestrian
            <em className="block font-[var(--font-cormorant)] not-italic italic text-[1.1em] text-champagne tracking-[0.06em]">
              Excellence
            </em>
          </h1>
          <a
            href="#about"
            className="inline-block font-[var(--font-cinzel)] text-[10px] tracking-[0.45em] text-champagne uppercase border border-gold/60 px-9 py-3.5 mt-2 transition-all duration-400 cursor-pointer opacity-0 animate-fade-up relative overflow-hidden group"
            style={{ animationDelay: '1.3s' }}
          >
            <span className="absolute bottom-0 left-0 w-0 h-full bg-gold/15 transition-all duration-400 group-hover:w-full" />
            <span className="relative">Discover Our World</span>
          </a>
        </div>

        {/* Side socials */}
        <div className="hidden lg:flex absolute right-[90px] top-1/2 -translate-y-1/2 z-30 flex-col gap-[18px] items-center opacity-0 animate-fade-in before:content-[''] before:w-px before:h-[50px] before:bg-gold/40 before:mb-2.5" style={{ animationDelay: '1.5s' }}>
          <a href="#" className="font-[var(--font-cinzel)] text-[9px] tracking-[0.25em] text-champagne/60 no-underline [writing-mode:vertical-rl] uppercase transition-colors hover:text-gold">Instagram</a>
          <a href="#" className="font-[var(--font-cinzel)] text-[9px] tracking-[0.25em] text-champagne/60 no-underline [writing-mode:vertical-rl] uppercase transition-colors hover:text-gold">Facebook</a>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-[72px] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2.5 opacity-0 animate-fade-in" style={{ animationDelay: '2s' }}>
          <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent animate-scroll-pulse" />
          <span className="font-[var(--font-cinzel)] text-[8px] tracking-[0.5em] text-champagne/50 uppercase">Scroll</span>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="relative bg-champagne px-[80px] py-[90px] grid grid-cols-1 lg:grid-cols-2 gap-[80px] items-center overflow-hidden before:content-[''] before:absolute before:top-0 before:left-[80px] before:right-[80px] before:h-px before:bg-gradient-to-r before:from-transparent before:via-gold before:to-transparent">
        {/* Image */}
        <div className="relative">
          <Image
            src="/images/kelly-with-horse.jpg"
            alt="Kelly with her horse"
            width={600}
            height={480}
            className="w-full h-[480px] object-cover sepia-[5%] contrast-105"
          />
          <div className="absolute inset-[-12px_-12px_12px_12px] border border-burgundy/20 pointer-events-none -z-10" />
          <div className="absolute top-5 -right-5 bg-burgundy text-champagne font-[var(--font-cinzel)] text-[8px] tracking-[0.4em] uppercase px-[18px] py-2.5 [writing-mode:vertical-rl]">
            Est. 2015
          </div>
        </div>

        {/* Text */}
        <div className="pl-5">
          <div className="flex items-center gap-3.5 font-[var(--font-cinzel)] text-[10px] tracking-[0.5em] text-gold uppercase mb-5 before:content-[''] before:w-[30px] before:h-px before:bg-gold">
            Every Bit
          </div>
          <h2 className="font-[var(--font-cinzel)] font-semibold text-burgundy uppercase tracking-[0.1em] leading-[1.15] mb-7" style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}>
            Prestigious
            <em className="block font-[var(--font-cormorant)] italic font-light text-[1.2em] text-burgundy tracking-[0.06em]">
              &amp; Passionate
            </em>
          </h2>
          <p className="font-[var(--font-jost)] font-light text-[14px] leading-[1.9] text-burgundy/70 max-w-[400px] mb-10">
            Moien ech sinn d&apos;Kelly, an ech reiden net nemmen op Paerd. Ech sinn eng leidenschaftlech
            Reiderin, Trainerin an Paerdeliebhaberin mat iwwer 10 Joer Erfahrung am Reitsport.
            Ech soen net nëmmen d&apos;Konscht vum Reiden, mee ech liewen et.
          </p>
          <a href="#contact" className="inline-flex items-center gap-[18px] font-[var(--font-cinzel)] text-[10px] tracking-[0.4em] text-burgundy uppercase no-underline border-b border-gold pb-2 transition-all duration-300 cursor-pointer hover:text-gold hover:gap-[26px]">
            Our Vision
            <span className="relative w-[30px] h-px bg-current after:content-[''] after:absolute after:right-0 after:top-[-3px] after:w-[6px] after:h-[6px] after:border-r after:border-t after:border-current after:rotate-45" />
          </a>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="relative bg-burgundy px-[80px] py-10 grid grid-cols-3 before:content-[''] before:absolute before:top-2 before:left-[30px] before:right-[30px] before:bottom-2 before:border before:border-gold/20 before:pointer-events-none">
        {[
          { num: '10', sup: '+', label: 'Years of Excellence' },
          { num: '20', sup: null, label: 'Horses' },
          { num: '100', sup: '+', label: 'Happy Riders' },
        ].map((stat, i) => (
          <div key={i} className={`flex flex-col items-center text-center px-10 py-5 relative ${i < 2 ? 'after:content-[\'\'] after:absolute after:right-0 after:top-[20%] after:h-[60%] after:w-px after:bg-gold/30' : ''}`}>
            <span className="font-[var(--font-cormorant)] font-light text-[52px] text-champagne leading-none mb-2">
              {stat.num}
              {stat.sup && <sup className="text-[0.4em] align-super text-gold font-[var(--font-cinzel)]">{stat.sup}</sup>}
            </span>
            <span className="font-[var(--font-cinzel)] text-[9px] tracking-[0.4em] text-champagne/50 uppercase">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-text-dark px-[80px] py-10 flex items-center justify-between">
        <span className="font-[var(--font-cinzel)] text-[10px] tracking-[0.3em] text-champagne/40 uppercase">
          © {new Date().getFullYear()} KT Equestrian
        </span>
        <span className="font-[var(--font-jost)] text-[10px] tracking-[0.15em] text-champagne/30 uppercase">
          Horsetraining &amp; Coaching
        </span>
      </footer>
    </main>
  )
}
