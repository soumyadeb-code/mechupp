import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  ChevronDown, 
  Globe, 
  Share2,
  MessageCircle,
  Video,
  Wrench, 
  MapPin, 
  BadgeCheck, 
  Loader2, 
  Mail, 
  CheckCircle2, 
  AlertCircle,
  LogIn,
  LogOut,
  UserCheck,
  ShieldAlert,
  Users,
  Database,
  Plus,
  Trash2,
  Edit,
  KeyRound,
  X,
  Search,
  Lock,
  Clock,
  Image as ImageIcon,
  Upload,
  Sliders,
  Type,
  Phone,
  Sparkles,
  ExternalLink,
  Check,
  RotateCcw,
  FileText,
  LayoutDashboard,
  ShieldCheck,
  Zap,
  Star,
  ArrowRight,
  ArrowLeft,
  Eye
} from 'lucide-react';

const defaultBikeHero = "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=2048&q=85";

function LogoMark({ className = "h-10 w-10", logoUrl = null }) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [logoUrl]);

  if (logoUrl && logoUrl.trim() !== '' && !imgError) {
    return (
      <img 
        src={logoUrl} 
        alt="MechUpp Logo" 
        className={`object-contain ${className}`}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div className={`grid place-items-center ${className}`}>
      <svg viewBox="0 0 40 40" className="h-full w-full" aria-hidden="true">
        <path d="M4 8 L16 8 L20 20 L24 8 L36 8 L36 12 L26 32 L22 32 L26 20 L20 34 L14 20 L18 32 L14 32 L4 12 Z" fill="#eb5f0d" />
      </svg>
    </div>
  );
}

function BrandLogo({ cmsSettings, className = "h-10 w-10", textSize = "text-2xl", taglineSize = "text-[10px]" }) {
  const logoTitle = cmsSettings?.logo_title || 'MechUpp';
  const logoTagline = cmsSettings?.logo_tagline || 'Tune Upp. Gear Upp. MechUpp';

  const renderFormattedTitle = (title) => {
    if (!title) return null;
    if (title.endsWith('Upp')) {
      const base = title.slice(0, -3);
      return <>{base}<span className="text-[#eb5f0d]">Upp</span></>;
    }
    if (title.endsWith('UPP')) {
      const base = title.slice(0, -3);
      return <>{base}<span className="text-[#eb5f0d]">UPP</span></>;
    }
    return title;
  };

  return (
    <div className="flex items-center gap-3">
      <LogoMark className={className} logoUrl={cmsSettings?.logo_url} />
      <div>
        <span className={`font-display ${textSize} font-black leading-none tracking-wider block text-white`}>
          {renderFormattedTitle(logoTitle)}
        </span>
        <span className={`${taglineSize} font-semibold text-[#8695a8] tracking-widest uppercase block mt-0.5`}>
          {logoTagline}
        </span>
      </div>
    </div>
  );
}

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setViewState] = useState(() => {
    return window.location.pathname === '/dashboard' ? 'dashboard' : 'landing';
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  // Global CMS Settings
  const [cmsSettings, setCmsSettings] = useState({
    logo_url: '',
    favicon_url: '',
    logo_title: 'MechUpp',
    logo_tagline: 'Tune Upp. Gear Upp. MechUpp',
    hero_badge: '⚡ 1-MINUTE PATNA RIDER SURVEY',
    hero_title: "HELP SHAPE PATNA'S 1ST QUICK BIKE CARE & LOCK YOUR DISCOUNT",
    hero_subtitle: "Claim your Early Bird spot! MechUpp Powered by Aethenox Motoserv is bringing Patna's 1st Quick Bike Care directly to your doorstep & road.",
    hero_image: defaultBikeHero,
    hero_cta_text: 'TAKE SURVEY AND CLAIM DISCOUNT',
    support_email: 'mechupp.official@gmail.com',
    support_phone: '+91 98765 43210',
    footer_text: '© 2026 MechUpp (Aethenox Motoserv Pvt. Ltd.). All rights reserved.',
    social_links: JSON.stringify([
      { id: '1', platform: 'Website', url: 'https://www.mechupp.com', icon: 'Globe' },
      { id: '2', platform: 'Instagram', url: 'https://instagram.com/mechupp', icon: 'Instagram' },
      { id: '3', platform: 'Twitter / X', url: 'https://x.com/mechupp', icon: 'Twitter' },
      { id: '4', platform: 'YouTube', url: 'https://youtube.com/@mechupp', icon: 'YouTube' },
      { id: '5', platform: 'WhatsApp', url: 'https://wa.me/919876543210', icon: 'WhatsApp' },
    ]),
  });

  const setView = (newView) => {
    setViewState(newView);
    const targetPath = newView === 'dashboard' ? '/dashboard' : '/';
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setViewState(window.location.pathname === '/dashboard' ? 'dashboard' : 'landing');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    fetch('/api/me')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          setCurrentUser(data.user);
        }
      })
      .catch(() => {});

    fetchCmsSettings();
  }, []);

  const fetchCmsSettings = async () => {
    try {
      const res = await fetch('/api/cms');
      const data = await res.json();
      if (res.ok && data.success && data.data) {
        setCmsSettings(prev => ({ ...prev, ...data.data }));
      }
    } catch {}
  };

  useEffect(() => {
    if (cmsSettings?.favicon_url) {
      let link = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = cmsSettings.favicon_url;
    }
  }, [cmsSettings?.favicon_url]);

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    setCurrentUser(null);
    setView('landing');
  };

  return (
    <div className="min-h-screen bg-[#0d0f14] font-sans text-white flex flex-col justify-between selection:bg-[#eb5f0d] selection:text-white">
      {view === 'dashboard' && currentUser ? (
        <DashboardLayout 
          currentUser={currentUser} 
          setView={setView} 
          onLogout={handleLogout}
          cmsSettings={cmsSettings}
          onUpdateCms={fetchCmsSettings}
        />
      ) : (
        <div>
          <Header 
            currentUser={currentUser} 
            view={view} 
            setView={setView} 
            onOpenLogin={() => setShowLoginModal(true)} 
            onLogout={handleLogout}
            cmsSettings={cmsSettings}
          />

          <PosterHero cmsSettings={cmsSettings} />
          <FeaturesBar />
          <SurveySection cmsSettings={cmsSettings} />
          
          <Footer cmsSettings={cmsSettings} />
        </div>
      )}

      {/* Auth Modals */}
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)}
          onSuccess={(user) => {
            setCurrentUser(user);
            setShowLoginModal(false);
            setView('dashboard');
          }}
          onOpenReset={() => {
            setShowLoginModal(false);
            setShowResetModal(true);
          }}
        />
      )}

      {showResetModal && (
        <ResetPasswordModal 
          onClose={() => setShowResetModal(false)}
          onSuccess={(user) => {
            setCurrentUser(user);
            setShowResetModal(false);
            setView('dashboard');
          }}
        />
      )}
    </div>
  );
}

function Header({ currentUser, view, setView, onOpenLogin, onLogout, cmsSettings }) {
  return (
    <header className="border-b border-[#8695a8]/20 bg-[#161922]/90 backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
        <div className="cursor-pointer group" onClick={() => setView('landing')}>
          <BrandLogo cmsSettings={cmsSettings} className="h-10 w-10 transition-transform group-hover:scale-105" textSize="text-2xl" taglineSize="text-[10px]" />
        </div>

        <div className="flex items-center gap-4">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-bold text-white flex items-center gap-1.5 justify-end">
                  {currentUser.role === 'super_admin' ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#eb5f0d]/20 border border-[#eb5f0d]/40 text-[#eb5f0d] text-[10px] font-black uppercase tracking-wider">
                      Super Admin
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#8695a8]/20 border border-[#8695a8]/40 text-[#8695a8] text-[10px] font-black uppercase tracking-wider">
                      Admin
                    </span>
                  )}
                  {currentUser.name}
                </span>
                <span className="text-[11px] text-[#868687]">{currentUser.email}</span>
              </div>

              {view === 'landing' ? (
                <button
                  onClick={() => setView('dashboard')}
                  className="flex items-center gap-2 rounded-xl bg-[#eb5f0d] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#d05008] transition-all glow-orange"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </button>
              ) : (
                <button
                  onClick={() => setView('landing')}
                  className="flex items-center gap-2 rounded-xl border border-[#8695a8]/30 bg-white/5 px-4 py-2.5 text-xs font-semibold text-[#8695a8] hover:text-white hover:bg-white/10 transition-all"
                >
                  <Globe className="h-4 w-4 text-[#eb5f0d]" />
                  Main Site
                </button>
              )}

              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 rounded-xl border border-[#8695a8]/30 bg-white/5 px-3.5 py-2.5 text-xs font-semibold text-[#868687] hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-2 rounded-xl bg-[#eb5f0d] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#d05008] transition-all glow-orange"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

function PosterHero({ cmsSettings }) {
  const heroImg = cmsSettings?.hero_image || defaultBikeHero;

  return (
    <section className="poster-grain relative flex min-h-[72vh] flex-col overflow-hidden py-12 px-5">
      <div className="relative max-w-5xl mx-auto w-full text-center">
        {/* Top Tag Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#eb5f0d]/40 bg-[#eb5f0d]/10 px-5 py-2 text-xs font-extrabold tracking-widest text-[#eb5f0d] uppercase mb-6 backdrop-blur-sm">
          <Zap className="h-4 w-4 fill-[#eb5f0d]" />
          {cmsSettings?.hero_badge || 'Avail Your Early Bird Discount'}
        </div>

        {/* Main Headline */}
        <h1 className="font-display text-4xl sm:text-7xl font-black tracking-tight text-white uppercase leading-[1.08] max-w-4xl mx-auto">
          {cmsSettings?.hero_title || 'CLAIM YOUR EXCLUSIVE LAUNCH DISCOUNT'}
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-[#8695a8] max-w-2xl mx-auto leading-relaxed font-normal">
          {cmsSettings?.hero_subtitle || 'Claim your Early Bird spot! MechUpp Powered by Aethenox Motoserv is bringing Patna\'s 1st Quick Bike Care directly to your doorstep & road.'}
        </p>

        {/* Action Button */}
        <div className="mt-8">
          <a
            href="#register"
            className="font-display inline-flex items-center gap-3 rounded-2xl bg-[#eb5f0d] px-9 py-4.5 text-xl font-black tracking-widest text-white glow-orange hover:bg-[#d05008] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="h-5 w-5" />
            {cmsSettings?.hero_cta_text || 'AVAIL EARLY BIRD DISCOUNT'}
          </a>
        </div>

        {/* Hero Image Frame */}
        <div className="mt-12 relative max-w-4xl mx-auto">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#eb5f0d]/40 via-[#8695a8]/20 to-[#eb5f0d]/40 blur-xl opacity-60"></div>
          <img
            src={heroImg}
            alt="Quick Bike Care"
            width={1024}
            height={576}
            className="relative rounded-3xl object-cover shadow-2xl border border-[#8695a8]/30 max-h-[460px] w-full"
          />
        </div>
      </div>
    </section>
  );
}

function FeaturesBar() {
  const features = [
    { icon: Zap, title: "On-Road Breakdown", desc: "Instant mechanic dispatch anywhere in Patna" },
    { icon: ShieldCheck, title: "Verified Mechanics", desc: "Certified doorstep service specialists" },
    { icon: Star, title: "VIP Launch Discount", desc: "Exclusive early bird savings locked for you" },
  ];

  return (
    <div className="border-y border-[#8695a8]/20 bg-[#161922] py-8 px-5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-[#0d0f14]/60 border border-[#8695a8]/15">
            <div className="p-3 rounded-xl bg-[#eb5f0d]/15 border border-[#eb5f0d]/30 text-[#eb5f0d] shrink-0">
              <f.icon className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">{f.title}</h4>
              <p className="text-xs text-[#8695a8] mt-1 leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 
  ======================================================
  MCQ SURVEY & EARLY BIRD DISCOUNT COMPONENT
  ======================================================
*/
function SurveySection({ cmsSettings }) {
  // Gatekeeper Question: Do you own or ride a bike/scooter?
  const [ownsBike, setOwnsBike] = useState(null); // true | false | null

  // Step Counter (1 to 4)
  const [step, setStep] = useState(1);

  // Form Survey Data
  const [form, setForm] = useState({
    name: '',
    age_group: '',
    gender: '',
    occupation_type: '',
    vehicle_type: '',
    vehicle_details: '',
    servicing_frequency: '',
    current_servicing_place: '',
    satisfaction_level: '',
    main_frustrations: [],
    billing_transparency: '',
    had_breakdown: '',
    breakdown_action: '',
    would_use_doorstep: '',
    switch_reasons: [],
    email: '',
    phone_no: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [apiError, setApiError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  // Radio option helper
  const handleSingleSelect = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  // Multi-select checkbox helper
  const handleMultiSelect = (field, value, maxSelect = 6) => {
    setForm(prev => {
      const current = prev[field] || [];
      let updated = [];
      if (current.includes(value)) {
        updated = current.filter(v => v !== value);
      } else {
        if (current.length < maxSelect) {
          updated = [...current, value];
        } else {
          updated = current;
        }
      }
      return { ...prev, [field]: updated };
    });
  };

  const handleStepNext = (e) => {
    e?.preventDefault();
    setApiError('');

    // Step 1 Validation
    if (step === 1) {
      if (!form.name.trim()) {
        setErrors({ name: 'Please enter your name.' });
        return;
      }
      setStep(2);
    } 
    // Step 2 Validation
    else if (step === 2) {
      setStep(3);
    } 
    // Step 3 Validation
    else if (step === 3) {
      setStep(4);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiError('');
    setErrors({});

    if (!form.email.trim()) {
      setErrors({ email: 'Please enter your email address to lock your discount.' });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setDone(true);
        setEmailSent(data.email_sent || false);
      } else {
        if (data.errors) {
          const formatted = {};
          Object.keys(data.errors).forEach(k => {
            formatted[k] = data.errors[k][0];
          });
          setErrors(formatted);
        } else {
          setApiError(data.message || 'Failed to submit survey. Please try again.');
        }
      }
    } catch (err) {
      setApiError('Network error. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  // Option pill renderer
  const renderOptionPill = (field, label, isSelected, onClick, isMulti = false) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-3 rounded-xl border text-xs font-bold text-left transition-all flex items-center justify-between ${
        isSelected
          ? 'bg-[#eb5f0d] text-white border-[#eb5f0d] shadow-md shadow-[#eb5f0d]/30'
          : 'bg-[#0d0f14] text-[#8695a8] border-[#8695a8]/25 hover:border-[#eb5f0d]/50 hover:text-white'
      }`}
    >
      <span>{label}</span>
      <div className={`h-4 w-4 rounded-${isMulti ? 'md' : 'full'} border flex items-center justify-center shrink-0 ${isSelected ? 'border-white bg-white text-[#eb5f0d]' : 'border-[#868687]'}`}>
        {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
      </div>
    </button>
  );

  return (
    <section id="register" className="relative px-5 py-16 max-w-2xl mx-auto w-full">
      <div className="rounded-3xl border border-[#8695a8]/20 bg-[#161922] p-7 sm:p-10 shadow-2xl">
        {/* Survey Header */}
        <div className="flex items-center gap-2 mb-2">
          <BadgeCheck className="h-5 w-5 text-[#eb5f0d]" />
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#eb5f0d]">
            {cmsSettings?.hero_badge || 'Avail Your Early Bird Discount'}
          </p>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl font-black text-white leading-tight">
          AVAIL YOUR EARLY BIRD DISCOUNT
        </h2>

        <p className="mt-2.5 text-sm text-[#8695a8] leading-relaxed">
          Complete this quick 1-minute survey to lock your exclusive launch discount and VIP access for Patna's 1st Quick Bike Care.
        </p>

        {apiError && (
          <div className="mt-5 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs font-semibold text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{apiError}</span>
          </div>
        )}

        {/* 
          --------------------------------------------------
          COMPLETION SUCCESS SCREEN
          --------------------------------------------------
        */}
        {done ? (
          <div className="mt-8 rounded-2xl border border-[#eb5f0d]/40 bg-[#0d0f14] p-8 text-center shadow-2xl">
            <CheckCircle2 className="mx-auto h-16 w-16 text-[#eb5f0d] animate-bounce" />
            <h3 className="font-display mt-3 text-3xl font-black tracking-wide text-white">🎟️ EARLY BIRD DISCOUNT LOCKED!</h3>
            
            <p className="mt-3 text-sm text-white max-w-md mx-auto leading-relaxed">
              Thank you <strong className="text-[#eb5f0d]">{form.name}</strong> for claiming your spot! Your exclusive launch discount has been registered.
            </p>

            <div className="mt-6 p-4 rounded-xl bg-[#161922] border border-[#8695a8]/20 text-xs text-[#8695a8] flex items-center justify-center gap-2 text-left">
              <Mail className="h-5 w-5 text-[#eb5f0d] shrink-0" />
              <span>
                {emailSent 
                  ? `Confirmation email sent to ${form.email}!`
                  : `Survey saved! We will reach out to ${form.email} as soon as we open bookings.`}
              </span>
            </div>

            <button
              onClick={() => {
                setDone(false);
                setOwnsBike(null);
                setStep(1);
                setForm({
                  name: '', age_group: '', gender: '', occupation_type: '', vehicle_type: '',
                  vehicle_details: '', servicing_frequency: '', current_servicing_place: '',
                  satisfaction_level: '', main_frustrations: [], billing_transparency: '',
                  had_breakdown: '', breakdown_action: '', would_use_doorstep: '',
                  switch_reasons: [], email: '', phone_no: ''
                });
              }}
              className="mt-6 text-xs text-[#eb5f0d] underline font-bold hover:text-[#d05008]"
            >
              Take Survey Again / Submit Another
            </button>
          </div>
        ) : ownsBike === false ? (
          /* GATEKEEPER EXIT SCREEN (IF NO BIKE/SCOOTER) */
          <div className="mt-8 rounded-2xl border border-[#8695a8]/20 bg-[#0d0f14] p-8 text-center">
            <div className="h-14 w-14 mx-auto rounded-2xl bg-white/5 border border-[#8695a8]/20 flex items-center justify-center text-[#8695a8]">
              <Wrench className="h-7 w-7" />
            </div>
            <h3 className="font-display mt-4 text-2xl font-bold text-white">THANK YOU FOR YOUR TIME!</h3>
            <p className="mt-2 text-sm text-[#8695a8] leading-relaxed max-w-md mx-auto">
              MechUpp specializes in two-wheeler servicing, repair, and roadside assistance. If you acquire a bike or scooter in the future, we'd love to serve you!
            </p>
            <button
              onClick={() => setOwnsBike(null)}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition-all"
            >
              <RotateCcw className="h-4 w-4" />
              Restart Survey
            </button>
          </div>
        ) : ownsBike === null ? (
          /* GATEKEEPER QUESTION (INITIAL SCREEN) */
          <div className="mt-8 p-6 rounded-2xl border border-[#8695a8]/20 bg-[#0d0f14] text-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#eb5f0d] block mb-2">
              Quick Verification
            </span>
            <h3 className="font-display text-2xl font-black text-white mb-6">
              Do you own or regularly ride a bike or scooter?
            </h3>
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              <button
                onClick={() => setOwnsBike(true)}
                className="py-4 rounded-xl bg-[#eb5f0d] text-white font-black text-base glow-orange hover:bg-[#d05008] transition-all flex items-center justify-center gap-2"
              >
                <Check className="h-5 w-5" /> YES
              </button>
              <button
                onClick={() => setOwnsBike(false)}
                className="py-4 rounded-xl bg-white/5 border border-[#8695a8]/25 text-[#8695a8] font-bold text-base hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <X className="h-5 w-5" /> NO
              </button>
            </div>
          </div>
        ) : (
          /* 
            --------------------------------------------------
            4-STEP SURVEY FORM
            --------------------------------------------------
          */
          <form onSubmit={step === 4 ? handleSubmit : handleStepNext} className="mt-6 space-y-6">
            {/* Step Progress Indicator */}
            <div className="flex items-center justify-between gap-2 border-b border-[#8695a8]/20 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#eb5f0d] animate-pulse"></span>
                <span className="text-xs font-extrabold uppercase tracking-wider text-white">
                  Step {step} of 4: {
                    step === 1 ? 'Personal Profile' :
                    step === 2 ? 'Vehicle & Servicing' :
                    step === 3 ? 'Breakdown & Experience' :
                    'Lock Discount'
                  }
                </span>
              </div>
              <span className="text-xs font-mono text-[#8695a8]">{step * 25}% Completed</span>
            </div>

            {/* STEP 1: PERSONAL PROFILE */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Q1: Name */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#8695a8] mb-2">
                    1. Full Name <span className="text-[#eb5f0d]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: null });
                    }}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full rounded-xl border border-[#8695a8]/25 bg-[#0d0f14] px-4 py-3.5 text-sm text-white placeholder:text-[#868687] focus:border-[#eb5f0d] focus:outline-none"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                </div>

                {/* Q2: Age Group */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#8695a8] mb-2">
                    2. Age Group
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                    {['18–24', '24–35', '35–50', '50–60', '60+'].map(val => 
                      renderOptionPill('age_group', val, form.age_group === val, () => handleSingleSelect('age_group', val))
                    )}
                  </div>
                </div>

                {/* Q3: Gender */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#8695a8] mb-2">
                    3. Gender
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {['Male', 'Female', 'Prefer not to say'].map(val => 
                      renderOptionPill('gender', val, form.gender === val, () => handleSingleSelect('gender', val))
                    )}
                  </div>
                </div>

                {/* Q4: Occupation Type */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#8695a8] mb-2">
                    4. Occupation Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      'Service Employee', 'Business/Self-employed', 'Student',
                      'Gig Worker (delivery/cab/etc.)', 'Homemaker', 'Other'
                    ].map(val => 
                      renderOptionPill('occupation_type', val, form.occupation_type === val, () => handleSingleSelect('occupation_type', val))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: VEHICLE & SERVICING HABITS */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Q5: Vehicle Type Owned */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#8695a8] mb-2">
                    5. Vehicle Type Owned
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {['Bike', 'Scooter', 'Both'].map(val => 
                      renderOptionPill('vehicle_type', val, form.vehicle_type === val, () => handleSingleSelect('vehicle_type', val))
                    )}
                  </div>
                </div>

                {/* Q6: Vehicle Brand, Model & CC */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#8695a8] mb-2">
                    6. Vehicle Brand, Model & Engine CC
                  </label>
                  <input
                    type="text"
                    value={form.vehicle_details}
                    onChange={(e) => setForm({ ...form, vehicle_details: e.target.value })}
                    placeholder="e.g. Royal Enfield Hunter 350 / Honda Activa 6G 110cc"
                    className="w-full rounded-xl border border-[#8695a8]/25 bg-[#0d0f14] px-4 py-3.5 text-sm text-white placeholder:text-[#868687] focus:border-[#eb5f0d] focus:outline-none"
                  />
                </div>

                {/* Q7: Servicing Frequency */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#8695a8] mb-2">
                    7. How often does your vehicle need servicing/repair?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {['Every 1–2 months', 'Every 3–6 months', 'Only when it breaks down', 'Rarely track it'].map(val => 
                      renderOptionPill('servicing_frequency', val, form.servicing_frequency === val, () => handleSingleSelect('servicing_frequency', val))
                    )}
                  </div>
                </div>

                {/* Q8: Where Serviced */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#8695a8] mb-2">
                    8. Where do you currently get it serviced?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {['Authorized service center', 'Local garage/mechanic', 'Roadside mechanic', 'No fixed place'].map(val => 
                      renderOptionPill('current_servicing_place', val, form.current_servicing_place === val, () => handleSingleSelect('current_servicing_place', val))
                    )}
                  </div>
                </div>

                {/* Q9: Satisfaction Level */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#8695a8] mb-2">
                    9. Overall, how satisfied are you with your current servicing experience?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {['Very satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very dissatisfied'].map(val => 
                      renderOptionPill('satisfaction_level', val, form.satisfaction_level === val, () => handleSingleSelect('satisfaction_level', val))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: FRUSTRATIONS & BREAKDOWN EXPERIENCE */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Q10: What frustrates you most (Multi-select) */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#8695a8] mb-2">
                    10. What frustrates you most about getting your vehicle serviced? <span className="text-[#eb5f0d] font-normal">(Select all that apply)</span>
                  </label>
                  <div className="grid grid-cols-1 gap-2.5">
                    {[
                      'Time wasted / long wait',
                      'Overcharging / hidden costs',
                      'Poor quality of repair',
                      'No transparency on what was actually fixed',
                      'Hard to trust unknown mechanics',
                      'Travel to the garage is a hassle'
                    ].map(val => 
                      renderOptionPill(
                        'main_frustrations', val, 
                        (form.main_frustrations || []).includes(val), 
                        () => handleMultiSelect('main_frustrations', val),
                        true
                      )
                    )}
                  </div>
                </div>

                {/* Q11: Billing Breakdown */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#8695a8] mb-2">
                    11. On billing — do you usually get a clear breakdown of parts vs. labor cost?
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {['Always', 'Sometimes', 'Rarely / Never'].map(val => 
                      renderOptionPill('billing_transparency', val, form.billing_transparency === val, () => handleSingleSelect('billing_transparency', val))
                    )}
                  </div>
                </div>

                {/* Q12: Mid-road Breakdown */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#8695a8] mb-2">
                    12. Have you ever had a mid-road / emergency breakdown?
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {['Yes, once', 'Yes, multiple times', 'Never'].map(val => 
                      renderOptionPill('had_breakdown', val, form.had_breakdown === val, () => handleSingleSelect('had_breakdown', val))
                    )}
                  </div>
                </div>

                {/* Q12a: Breakdown Action */}
                {(form.had_breakdown === 'Yes, once' || form.had_breakdown === 'Yes, multiple times') && (
                  <div className="p-4 rounded-xl bg-[#0d0f14] border border-[#8695a8]/20">
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-[#eb5f0d] mb-2">
                      12a. What did you do during the breakdown?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        'Called known mechanic',
                        'Pushed to nearest garage',
                        'Called a friend/family',
                        "Used a roadside stranger's help",
                        'Was stranded a while'
                      ].map(val => 
                        renderOptionPill('breakdown_action', val, form.breakdown_action === val, () => handleSingleSelect('breakdown_action', val))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 4: SWITCH FACTORS & CONTACT INFO */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Q13: Would use Doorstep Mechanic */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#8695a8] mb-2">
                    13. Would you use a service where a verified mechanic comes to your home/office/breakdown spot?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {['Definitely', 'Probably', 'Not sure', 'Probably not'].map(val => 
                      renderOptionPill('would_use_doorstep', val, form.would_use_doorstep === val, () => handleSingleSelect('would_use_doorstep', val))
                    )}
                  </div>
                </div>

                {/* Q14: Switch Factors (pick top 1-2) */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#8695a8] mb-2">
                    14. What would make you switch from your current option? <span className="text-[#eb5f0d] font-normal">(Pick top 1–2)</span>
                  </label>
                  <div className="grid grid-cols-1 gap-2.5">
                    {[
                      'Lower/transparent pricing',
                      'Faster response time',
                      'Trust/verified mechanics',
                      '24x7 emergency availability',
                      "Doesn't need to leave home/work"
                    ].map(val => 
                      renderOptionPill(
                        'switch_reasons', val, 
                        (form.switch_reasons || []).includes(val), 
                        () => handleMultiSelect('switch_reasons', val, 2),
                        true
                      )
                    )}
                  </div>
                </div>

                {/* Q15: Contact Info */}
                <div className="p-5 rounded-2xl bg-[#0d0f14] border border-[#8695a8]/25 space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#eb5f0d]" />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-white">
                      15. Early-Access Discount Delivery
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-[#8695a8] mb-1.5">
                      Email Address <span className="text-[#eb5f0d]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => {
                        setForm({ ...form, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: null });
                      }}
                      placeholder="rahul@example.com"
                      className="w-full rounded-xl border border-[#8695a8]/25 bg-[#161922] px-4 py-3.5 text-sm text-white focus:border-[#eb5f0d] focus:outline-none"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#8695a8] mb-1.5">
                      Mobile Number <span className="text-[#868687] font-normal">(Optional for early updates)</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone_no}
                      onChange={(e) => setForm({ ...form, phone_no: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl border border-[#8695a8]/25 bg-[#161922] px-4 py-3.5 text-sm text-white focus:border-[#eb5f0d] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#8695a8]/20">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(prev => prev - 1)}
                  className="px-5 py-3 rounded-xl border border-[#8695a8]/30 bg-white/5 text-xs font-bold text-[#8695a8] hover:text-white hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setOwnsBike(null)}
                  className="px-4 py-3 rounded-xl text-xs font-bold text-[#868687] hover:text-white transition-all"
                >
                  Reset
                </button>
              )}

              {step < 4 ? (
                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-xl bg-[#eb5f0d] text-white font-black text-xs tracking-wider glow-orange hover:bg-[#d05008] transition-all flex items-center gap-2"
                >
                  Next Step <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 rounded-xl bg-[#eb5f0d] text-white font-black text-sm tracking-wider glow-orange hover:bg-[#d05008] transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> SUBMITTING...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" /> LOCK MY DISCOUNT
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

/* Auth Login Modal */
function LoginModal({ onClose, onSuccess, onOpenReset }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        onSuccess(data.user);
      } else {
        setError(data.message || 'Invalid email or password.');
      }
    } catch {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="relative w-full max-w-md rounded-3xl border border-[#8695a8]/25 bg-[#161922] p-7 shadow-2xl">
        <button onClick={onClose} className="absolute right-5 top-5 text-[#868687] hover:text-white">
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Lock className="h-5 w-5 text-[#eb5f0d]" />
          <h3 className="font-display text-3xl font-black text-white">ADMIN LOGIN</h3>
        </div>
        <p className="text-xs text-[#8695a8] mb-6">
          Sign in to access your MechUpp management dashboard.
        </p>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8695a8] mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@aethenoxmotoserv.com"
              className="w-full rounded-xl border border-[#8695a8]/25 bg-[#0d0f14] px-4 py-3 text-sm text-white focus:border-[#eb5f0d] focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8695a8]">
                Password
              </label>
              <button
                type="button"
                onClick={onOpenReset}
                className="text-xs text-[#eb5f0d] hover:underline font-bold"
              >
                Forgot Password?
              </button>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-[#8695a8]/25 bg-[#0d0f14] px-4 py-3 text-sm text-white focus:border-[#eb5f0d] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#eb5f0d] py-3.5 text-sm font-extrabold tracking-wider text-white glow-orange hover:bg-[#d05008] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
            LOG IN
          </button>
        </form>
      </div>
    </div>
  );
}

/* Reset Password Modal */
function ResetPasswordModal({ onClose, onSuccess }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(300);

  useEffect(() => {
    let timer = null;
    if (step === 2 && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [step, secondsLeft]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setInfo('');

    try {
      const res = await fetch('/api/forgot-password/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStep(2);
        setSecondsLeft(300);
        setInfo(data.message);
      } else {
        setError(data.message || (data.errors?.email ? data.errors.email[0] : 'Failed to send OTP.'));
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (secondsLeft <= 0) {
      setError('OTP timer has expired. Please click "Resend OTP" to generate a fresh 5-minute OTP.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/forgot-password/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email, otp, password: newPassword }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        onSuccess(data.user);
      } else {
        setError(data.message || 'Failed to reset password.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="relative w-full max-w-md rounded-3xl border border-[#8695a8]/25 bg-[#161922] p-7 shadow-2xl">
        <button onClick={onClose} className="absolute right-5 top-5 text-[#868687] hover:text-white">
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <KeyRound className="h-5 w-5 text-[#eb5f0d]" />
          <h3 className="font-display text-3xl font-black text-white">RESET PASSWORD</h3>
        </div>
        <p className="text-xs text-[#8695a8] mb-6">
          {step === 1 ? 'Enter registered admin email to receive a 5-minute valid OTP.' : 'Verify 6-digit OTP and set your new password.'}
        </p>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {info && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-[#eb5f0d]/30 bg-[#eb5f0d]/10 p-3 text-xs text-white">
            <Mail className="h-4 w-4 shrink-0 text-[#eb5f0d]" />
            <span>{info}</span>
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8695a8] mb-1.5">
                Admin Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sdexam00@gmail.com"
                className="w-full rounded-xl border border-[#8695a8]/25 bg-[#0d0f14] px-4 py-3 text-sm text-white focus:border-[#eb5f0d] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#eb5f0d] py-3.5 text-sm font-extrabold tracking-wider text-white glow-orange hover:bg-[#d05008] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
              SEND 5-MIN OTP TO MAIL
            </button>
          </form>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold ${secondsLeft > 0 ? 'bg-[#eb5f0d]/10 border-[#eb5f0d]/30 text-[#eb5f0d]' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 animate-pulse" />
                <span>{secondsLeft > 0 ? 'OTP Expiry Countdown:' : 'OTP Expired!'}</span>
              </div>
              <span className="font-mono text-base">{formatTime(secondsLeft)}</span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8695a8] mb-1.5">
                6-Digit OTP Code
              </label>
              <input
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="------"
                className="w-full rounded-xl border border-[#8695a8]/25 bg-[#0d0f14] px-4 py-3 text-lg tracking-[0.5em] text-center font-mono text-white focus:border-[#eb5f0d] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8695a8] mb-1.5">
                New Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full rounded-xl border border-[#8695a8]/25 bg-[#0d0f14] px-4 py-3 text-sm text-white focus:border-[#eb5f0d] focus:outline-none"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading}
                className="w-1/3 rounded-xl border border-[#8695a8]/30 bg-white/5 py-3 text-xs font-bold text-[#8695a8] hover:bg-white/10 transition-all"
              >
                Resend
              </button>

              <button
                type="submit"
                disabled={loading || secondsLeft <= 0}
                className="w-2/3 rounded-xl bg-[#eb5f0d] py-3 text-xs font-extrabold tracking-wider text-white glow-orange hover:bg-[#d05008] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                RESET & LOGIN
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* 
  ======================================================
  DASHBOARD LAYOUT WITH SIDEBAR & CONTENT PANELS
  ======================================================
*/
function DashboardLayout({ currentUser, setView, onLogout, cmsSettings, onUpdateCms }) {
  const [activeTab, setActiveTab] = useState('inquiries');
  const [inquiries, setInquiries] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSurvey, setSelectedSurvey] = useState(null);

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/inquiries');
      const data = await res.json();
      if (res.ok && data.success) {
        setInquiries(data.data);
      }
    } catch {}
    setLoading(false);
  };

  const fetchAdmins = async () => {
    if (currentUser.role !== 'super_admin') return;
    setLoading(true);
    try {
      const res = await fetch('/api/super-admin/admins');
      const data = await res.json();
      if (res.ok && data.success) {
        setAdmins(data.data);
      }
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    if (activeTab === 'inquiries') {
      fetchInquiries();
    } else if (activeTab === 'admins') {
      fetchAdmins();
    }
  }, [activeTab]);

  const handleDeleteInquiry = async (id) => {
    if (!confirm('Are you sure you want to delete this customer registration?')) return;
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries(inquiries.filter(i => i.id !== id));
      }
    } catch {}
  };

  const handleDeleteAdmin = async (id) => {
    if (!confirm('Are you sure you want to delete this admin account?')) return;
    try {
      const res = await fetch(`/api/super-admin/admins/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        setAdmins(admins.filter(a => a.id !== id));
      } else {
        alert(data.message || 'Failed to delete admin.');
      }
    } catch {}
  };

  const filteredInquiries = inquiries.filter(i => 
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.email.toLowerCase().includes(search.toLowerCase()) ||
    (i.phone_no && i.phone_no.toLowerCase().includes(search.toLowerCase())) ||
    (i.motor_name && i.motor_name.toLowerCase().includes(search.toLowerCase())) ||
    (i.vehicle_details && i.vehicle_details.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex min-h-screen bg-[#0d0f14]">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 border-r border-[#8695a8]/20 bg-[#161922] p-6 flex flex-col justify-between shrink-0 hidden md:flex">
        <div>
          {/* Brand Header */}
          <div className="pb-6 border-b border-[#8695a8]/20 cursor-pointer group" onClick={() => setView('landing')}>
            <BrandLogo cmsSettings={cmsSettings} className="h-9 w-9 transition-transform group-hover:scale-105" textSize="text-xl" taglineSize="text-[10px]" />
          </div>

          {/* User Profile Card */}
          <div className="my-6 p-4 rounded-2xl bg-[#0d0f14] border border-[#8695a8]/20 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#eb5f0d]/20 border border-[#eb5f0d]/40 flex items-center justify-center text-[#eb5f0d] font-black text-sm">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-[#eb5f0d]/20 text-[#eb5f0d] border border-[#eb5f0d]/30">
                {currentUser.role === 'super_admin' ? 'Super Admin' : 'Admin'}
              </span>
            </div>
          </div>

          {/* Sidebar Menu Items */}
          <nav className="space-y-2">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#868687] px-3 mb-2">
              Main Menu
            </p>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'inquiries'
                  ? 'bg-[#eb5f0d] text-white glow-orange'
                  : 'text-[#8695a8] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4" />
                <span>Survey Responses</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/40 font-mono font-bold">
                {inquiries.length}
              </span>
            </button>

            {currentUser.role === 'super_admin' && (
              <button
                onClick={() => setActiveTab('admins')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'admins'
                    ? 'bg-[#eb5f0d] text-white glow-orange'
                    : 'text-[#8695a8] hover:bg-white/5 hover:text-white'
                }`}
              >
                <ShieldAlert className="h-4 w-4" />
                <span>Manage Admins</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('cms')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'cms'
                  ? 'bg-[#eb5f0d] text-white glow-orange'
                  : 'text-[#8695a8] hover:bg-white/5 hover:text-white'
              }`}
            >
              <Sliders className="h-4 w-4" />
              <span>CMS & Branding</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="pt-6 border-t border-[#8695a8]/20 space-y-2.5">
          <button
            onClick={() => setView('landing')}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[#8695a8]/30 bg-white/5 text-xs font-semibold text-[#8695a8] hover:text-white hover:bg-white/10 transition-all"
          >
            <Globe className="h-4 w-4 text-[#eb5f0d]" />
            <span>View Main Site</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-red-500/20 bg-red-500/10 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-all"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex md:hidden flex-col w-full border-b border-[#8695a8]/20 bg-[#161922] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LogoMark className="h-8 w-8" logoUrl={cmsSettings?.logo_url} />
            <span className="font-display text-xl font-black tracking-wider text-white">
              MECH<span className="text-[#eb5f0d]">UPP</span>
            </span>
          </div>
          <button onClick={() => setView('landing')} className="text-xs text-[#eb5f0d] font-bold flex items-center gap-1">
            <Globe className="h-4 w-4" /> Main Site
          </button>
        </div>

        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-3 py-2 rounded-xl text-xs font-bold shrink-0 ${activeTab === 'inquiries' ? 'bg-[#eb5f0d] text-white' : 'bg-white/5 text-[#8695a8]'}`}
          >
            Surveys ({inquiries.length})
          </button>
          {currentUser.role === 'super_admin' && (
            <button
              onClick={() => setActiveTab('admins')}
              className={`px-3 py-2 rounded-xl text-xs font-bold shrink-0 ${activeTab === 'admins' ? 'bg-[#eb5f0d] text-white' : 'bg-white/5 text-[#8695a8]'}`}
            >
              Admins
            </button>
          )}
          <button
            onClick={() => setActiveTab('cms')}
            className={`px-3 py-2 rounded-xl text-xs font-bold shrink-0 ${activeTab === 'cms' ? 'bg-[#eb5f0d] text-white' : 'bg-white/5 text-[#8695a8]'}`}
          >
            CMS & Branding
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* TAB 1: CUSTOMER INQUIRIES & SURVEY RESPONSES */}
        {activeTab === 'inquiries' && (
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#8695a8]/20 pb-6 mb-8">
              <div>
                <h2 className="font-display text-3xl font-black tracking-tight text-white">EARLY BIRD SURVEY RESPONSES</h2>
                <p className="text-xs text-[#8695a8] mt-1">
                  Comprehensive 15-question market survey responses submitted by customers.
                </p>
              </div>

              <button
                onClick={fetchInquiries}
                className="flex items-center gap-2 rounded-xl border border-[#8695a8]/30 bg-[#161922] px-4 py-2.5 text-xs font-bold text-[#8695a8] hover:text-white hover:bg-white/5"
              >
                Refresh Table
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#868687]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, email, phone, or vehicle model..."
                  className="w-full rounded-xl border border-[#8695a8]/25 bg-[#161922] pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-[#868687] focus:border-[#eb5f0d] focus:outline-none"
                />
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-16 text-[#8695a8] gap-2">
                <Loader2 className="h-6 w-6 animate-spin text-[#eb5f0d]" />
                <span className="text-sm font-semibold">Loading survey responses...</span>
              </div>
            ) : filteredInquiries.length === 0 ? (
              <div className="rounded-2xl border border-[#8695a8]/20 bg-[#161922] p-12 text-center text-[#8695a8]">
                <Users className="mx-auto h-10 w-10 text-[#868687] mb-3" />
                <p className="font-bold text-white text-base">No Survey Responses Found</p>
                <p className="text-xs text-[#868687] mt-1">Submissions from the main website will appear here in real-time.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-[#8695a8]/20 bg-[#161922] shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0d0f14] text-[#8695a8] uppercase tracking-wider font-extrabold border-b border-[#8695a8]/20">
                    <tr>
                      <th className="px-5 py-4">#</th>
                      <th className="px-5 py-4">Customer Name</th>
                      <th className="px-5 py-4">Email</th>
                      <th className="px-5 py-4">Phone No</th>
                      <th className="px-5 py-4">Vehicle Details</th>
                      <th className="px-5 py-4">Age / Gender</th>
                      <th className="px-5 py-4">Doorstep Interest</th>
                      <th className="px-5 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#8695a8]/10 text-gray-200">
                    {filteredInquiries.map((row, idx) => (
                      <tr key={row.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-5 py-4 font-mono text-[#868687]">{idx + 1}</td>
                        <td className="px-5 py-4 font-bold text-white">{row.name}</td>
                        <td className="px-5 py-4 text-[#8695a8]">{row.email}</td>
                        <td className="px-5 py-4 font-mono text-[#8695a8]">{row.phone_no || 'Not Provided'}</td>
                        <td className="px-5 py-4">
                          <span className="px-3 py-1 rounded-full bg-[#eb5f0d]/15 border border-[#eb5f0d]/30 text-[#eb5f0d] font-bold">
                            {row.vehicle_details || row.motor_name || row.vehicle_type || 'Two-Wheeler'}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-[#868687]">
                          {row.age_group || 'N/A'} {row.gender ? `(${row.gender})` : ''}
                        </td>
                        <td className="px-5 py-4">
                          <span className={`px-2.5 py-1 rounded-full font-extrabold text-[10px] uppercase ${row.would_use_doorstep === 'Definitely' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-[#8695a8]'}`}>
                            {row.would_use_doorstep || 'N/A'}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedSurvey(row)}
                              className="p-2 text-[#8695a8] hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                              title="View Full Survey Responses"
                            >
                              <Eye className="h-4 w-4 text-[#eb5f0d]" />
                            </button>
                            <button
                              onClick={() => handleDeleteInquiry(row.id)}
                              className="p-2 text-[#868687] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                              title="Delete entry"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* SURVEY DETAILS MODAL */}
            {selectedSurvey && (
              <SurveyDetailsModal 
                survey={selectedSurvey} 
                onClose={() => setSelectedSurvey(null)} 
              />
            )}
          </div>
        )}

        {/* TAB 2: MANAGE ADMINS */}
        {activeTab === 'admins' && currentUser.role === 'super_admin' && (
          <div>
            <div className="flex items-center justify-between gap-4 border-b border-[#8695a8]/20 pb-6 mb-8">
              <div>
                <h2 className="font-display text-3xl font-black tracking-tight text-white">ADMIN MANAGEMENT</h2>
                <p className="text-xs text-[#8695a8] mt-1">Add, edit, or remove system administrator accounts.</p>
              </div>

              <button
                onClick={() => {
                  setEditingAdmin(null);
                  setShowAdminModal(true);
                }}
                className="flex items-center gap-2 rounded-xl bg-[#eb5f0d] px-4.5 py-2.5 text-xs font-extrabold text-white glow-orange hover:bg-[#d05008] transition-all"
              >
                <Plus className="h-4 w-4" />
                Add New Admin
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-16 text-[#8695a8] gap-2">
                <Loader2 className="h-6 w-6 animate-spin text-[#eb5f0d]" />
                <span className="text-sm font-semibold">Loading admin users...</span>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-[#8695a8]/20 bg-[#161922] shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0d0f14] text-[#8695a8] uppercase tracking-wider font-extrabold border-b border-[#8695a8]/20">
                    <tr>
                      <th className="px-5 py-4">ID</th>
                      <th className="px-5 py-4">Admin Name</th>
                      <th className="px-5 py-4">Email</th>
                      <th className="px-5 py-4">Role Permission</th>
                      <th className="px-5 py-4">Created Date</th>
                      <th className="px-5 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#8695a8]/10 text-gray-200">
                    {admins.map((adm) => (
                      <tr key={adm.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-5 py-4 font-mono text-[#868687]">#{adm.id}</td>
                        <td className="px-5 py-4 font-bold text-white flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-[#eb5f0d]" />
                          {adm.name}
                        </td>
                        <td className="px-5 py-4 text-[#8695a8]">{adm.email}</td>
                        <td className="px-5 py-4">
                          {adm.role === 'super_admin' ? (
                            <span className="px-3 py-1 rounded-full bg-[#eb5f0d]/20 border border-[#eb5f0d]/40 text-[#eb5f0d] font-black uppercase text-[10px]">
                              Super Admin
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-full bg-[#8695a8]/20 border border-[#8695a8]/40 text-[#8695a8] font-black uppercase text-[10px]">
                              Admin
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-[#868687]">{new Date(adm.created_at).toLocaleDateString()}</td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setEditingAdmin(adm);
                                setShowAdminModal(true);
                              }}
                              className="p-2 text-[#8695a8] hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                              title="Edit Admin"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            {adm.id !== currentUser.id && (
                              <button
                                onClick={() => handleDeleteAdmin(adm.id)}
                                className="p-2 text-[#868687] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                title="Delete Admin"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {showAdminModal && (
              <AdminFormModal 
                admin={editingAdmin}
                onClose={() => {
                  setShowAdminModal(false);
                  setEditingAdmin(null);
                }}
                onSave={() => {
                  setShowAdminModal(false);
                  setEditingAdmin(null);
                  fetchAdmins();
                }}
              />
            )}
          </div>
        )}

        {/* TAB 3: CMS & BRANDING SETTINGS */}
        {activeTab === 'cms' && (
          <CmsSettingsManager 
            cmsSettings={cmsSettings} 
            onUpdateCms={onUpdateCms} 
          />
        )}
      </main>
    </div>
  );
}

/* Modal to View Full Survey Response Details */
function SurveyDetailsModal({ survey, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl border border-[#8695a8]/25 bg-[#161922] p-7 shadow-2xl my-8">
        <button onClick={onClose} className="absolute right-5 top-5 text-[#868687] hover:text-white">
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <Eye className="h-6 w-6 text-[#eb5f0d]" />
          <h3 className="font-display text-2xl font-black text-white">SURVEY RESPONSE DETAILS</h3>
        </div>
        <p className="text-xs text-[#8695a8] mb-6">
          Submitted by <strong className="text-white">{survey.name}</strong> ({survey.email}) on {new Date(survey.created_at).toLocaleString()}
        </p>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {/* Section 1 */}
          <div className="p-4 rounded-2xl bg-[#0d0f14] border border-[#8695a8]/20 space-y-2">
            <h4 className="text-xs font-black uppercase text-[#eb5f0d] tracking-wider mb-2">1. Personal Profile</h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div><span className="text-[#868687]">Name:</span> <strong className="text-white block">{survey.name}</strong></div>
              <div><span className="text-[#868687]">Age Group:</span> <strong className="text-white block">{survey.age_group || 'N/A'}</strong></div>
              <div><span className="text-[#868687]">Gender:</span> <strong className="text-white block">{survey.gender || 'N/A'}</strong></div>
              <div><span className="text-[#868687]">Occupation:</span> <strong className="text-white block">{survey.occupation_type || 'N/A'}</strong></div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="p-4 rounded-2xl bg-[#0d0f14] border border-[#8695a8]/20 space-y-2">
            <h4 className="text-xs font-black uppercase text-[#eb5f0d] tracking-wider mb-2">2. Vehicle & Servicing</h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div><span className="text-[#868687]">Vehicle Type:</span> <strong className="text-white block">{survey.vehicle_type || 'N/A'}</strong></div>
              <div><span className="text-[#868687]">Brand, Model & CC:</span> <strong className="text-white block">{survey.vehicle_details || survey.motor_name || 'N/A'}</strong></div>
              <div><span className="text-[#868687]">Servicing Frequency:</span> <strong className="text-white block">{survey.servicing_frequency || 'N/A'}</strong></div>
              <div><span className="text-[#868687]">Current Servicing Place:</span> <strong className="text-white block">{survey.current_servicing_place || 'N/A'}</strong></div>
              <div className="col-span-2"><span className="text-[#868687]">Satisfaction Level:</span> <strong className="text-white block">{survey.satisfaction_level || 'N/A'}</strong></div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="p-4 rounded-2xl bg-[#0d0f14] border border-[#8695a8]/20 space-y-2">
            <h4 className="text-xs font-black uppercase text-[#eb5f0d] tracking-wider mb-2">3. Servicing Pain Points</h4>
            <div className="text-xs space-y-2">
              <div>
                <span className="text-[#868687] block mb-1">Frustrations:</span>
                <div className="flex flex-wrap gap-1.5">
                  {Array.isArray(survey.main_frustrations) && survey.main_frustrations.length > 0 ? (
                    survey.main_frustrations.map((f, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-white/5 border border-[#8695a8]/20 text-white font-semibold">
                        {f}
                      </span>
                    ))
                  ) : <span className="text-[#868687]">None selected</span>}
                </div>
              </div>
              <div><span className="text-[#868687]">Billing Transparency:</span> <strong className="text-white block">{survey.billing_transparency || 'N/A'}</strong></div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="p-4 rounded-2xl bg-[#0d0f14] border border-[#8695a8]/20 space-y-2">
            <h4 className="text-xs font-black uppercase text-[#eb5f0d] tracking-wider mb-2">4. Breakdown & Doorstep Interest</h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div><span className="text-[#868687]">Had Breakdown:</span> <strong className="text-white block">{survey.had_breakdown || 'N/A'}</strong></div>
              <div><span className="text-[#868687]">Breakdown Action:</span> <strong className="text-white block">{survey.breakdown_action || 'N/A'}</strong></div>
              <div className="col-span-2"><span className="text-[#868687]">Would Use Doorstep Mechanic:</span> <strong className="text-[#eb5f0d] font-bold block">{survey.would_use_doorstep || 'N/A'}</strong></div>
            </div>

            <div className="text-xs pt-2">
              <span className="text-[#868687] block mb-1">Top Reasons to Switch:</span>
              <div className="flex flex-wrap gap-1.5">
                {Array.isArray(survey.switch_reasons) && survey.switch_reasons.length > 0 ? (
                  survey.switch_reasons.map((r, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-[#eb5f0d]/15 border border-[#eb5f0d]/30 text-[#eb5f0d] font-bold">
                      {r}
                    </span>
                  ))
                ) : <span className="text-[#868687]">None selected</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#8695a8]/20 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-white/10 text-xs font-bold text-white hover:bg-white/20 transition-all"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}

/* CMS & Branding Settings Manager Component */
function CmsSettingsManager({ cmsSettings, onUpdateCms }) {
  const [form, setForm] = useState({
    logo_title: cmsSettings?.logo_title || 'MechUpp',
    logo_tagline: cmsSettings?.logo_tagline || 'Tune Upp. Gear Upp. MechUpp',
    logo_url: cmsSettings?.logo_url || '',
    favicon_url: cmsSettings?.favicon_url || '',
    hero_badge: cmsSettings?.hero_badge || '',
    hero_title: cmsSettings?.hero_title || '',
    hero_subtitle: cmsSettings?.hero_subtitle || '',
    hero_image: cmsSettings?.hero_image || '',
    hero_cta_text: cmsSettings?.hero_cta_text || '',
    support_email: cmsSettings?.support_email || '',
    support_phone: cmsSettings?.support_phone || '',
    footer_text: cmsSettings?.footer_text || '',
    social_links: cmsSettings?.social_links || '[]',
  });

  const [socialLinksList, setSocialLinksList] = useState([]);
  const [removeLogo, setRemoveLogo] = useState(false);

  useEffect(() => {
    try {
      const parsed = typeof cmsSettings?.social_links === 'string'
        ? JSON.parse(cmsSettings.social_links)
        : (cmsSettings?.social_links || []);
      setSocialLinksList(Array.isArray(parsed) && parsed.length > 0 ? parsed : [
        { id: '1', platform: 'Website', url: 'https://www.mechupp.com', icon: 'Globe' },
        { id: '2', platform: 'Instagram', url: 'https://instagram.com/mechupp', icon: 'Share2' },
        { id: '3', platform: 'Twitter / X', url: 'https://x.com/mechupp', icon: 'MessageCircle' },
        { id: '4', platform: 'YouTube', url: 'https://youtube.com/@mechupp', icon: 'Video' },
        { id: '5', platform: 'WhatsApp', url: 'https://wa.me/919876543210', icon: 'Phone' },
      ]);
    } catch {
      setSocialLinksList([]);
    }
  }, [cmsSettings?.social_links]);

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(cmsSettings?.logo_url || '');

  const [faviconFile, setFaviconFile] = useState(null);
  const [faviconPreview, setFaviconPreview] = useState(cmsSettings?.favicon_url || '');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (cmsSettings) {
      setForm({
        logo_title: cmsSettings.logo_title || 'MechUpp',
        logo_tagline: cmsSettings.logo_tagline || 'Tune Upp. Gear Upp. MechUpp',
        logo_url: cmsSettings.logo_url || '',
        favicon_url: cmsSettings.favicon_url || '',
        hero_badge: cmsSettings.hero_badge || '',
        hero_title: cmsSettings.hero_title || '',
        hero_subtitle: cmsSettings.hero_subtitle || '',
        hero_image: cmsSettings.hero_image || '',
        hero_cta_text: cmsSettings.hero_cta_text || '',
        support_email: cmsSettings.support_email || '',
        support_phone: cmsSettings.support_phone || '',
        footer_text: cmsSettings.footer_text || '',
        social_links: cmsSettings.social_links || '[]',
      });
      setLogoPreview(cmsSettings.logo_url || '');
      setFaviconPreview(cmsSettings.favicon_url || '');
      setRemoveLogo(false);
    }
  }, [cmsSettings]);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
      setRemoveLogo(false);
    }
  };

  const handleResetLogo = () => {
    setLogoFile(null);
    setLogoPreview('');
    setForm(prev => ({ ...prev, logo_url: '' }));
    setRemoveLogo(true);
  };

  const handleFaviconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFaviconFile(file);
      setFaviconPreview(URL.createObjectURL(file));
    }
  };

  const handleAddSocialLink = () => {
    const newLink = {
      id: Date.now().toString(),
      platform: 'Custom Link',
      url: 'https://',
      icon: 'Globe'
    };
    setSocialLinksList(prev => [...prev, newLink]);
  };

  const handleUpdateSocialLink = (index, field, value) => {
    setSocialLinksList(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleDeleteSocialLink = (index) => {
    setSocialLinksList(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    const formData = new FormData();
    Object.keys(form).forEach(key => {
      if (key !== 'social_links') {
        formData.append(key, form[key]);
      }
    });

    formData.append('social_links', JSON.stringify(socialLinksList));

    if (removeLogo) {
      formData.append('remove_logo', '1');
    }

    if (logoFile) {
      formData.append('logo', logoFile);
    }
    if (faviconFile) {
      formData.append('favicon', faviconFile);
    }

    try {
      const res = await fetch('/api/admin/cms', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessage('CMS settings and branding uploaded successfully!');
        onUpdateCms();
      } else {
        setError(data.message || 'Failed to update CMS settings.');
      }
    } catch {
      setError('Network error during upload.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between border-b border-[#8695a8]/20 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2.5">
            <Sliders className="h-6 w-6 text-[#eb5f0d]" />
            <h2 className="font-display text-3xl font-black tracking-tight text-white">CMS & BRANDING MANAGEMENT</h2>
          </div>
          <p className="text-xs text-[#8695a8] mt-1">
            Customize site branding, logo text & tagline, hero section, button labels, footer texts, and social links in real-time.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-[#eb5f0d] px-5 py-2.5 text-xs font-bold text-white glow-orange hover:bg-[#d05008] transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
          SAVE CMS CHANGES
        </button>
      </div>

      {message && (
        <div className="mb-6 flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-bold text-emerald-400">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="mb-6 flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs font-bold text-red-400">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* BRAND IDENTITY & LOGO EDITING */}
        <div className="rounded-3xl border border-[#8695a8]/20 bg-[#161922] p-7 shadow-xl">
          <div className="flex items-center gap-2.5 mb-5 border-b border-[#8695a8]/20 pb-3.5">
            <ImageIcon className="h-5 w-5 text-[#eb5f0d]" />
            <h3 className="font-display text-xl font-bold text-white">BRAND IDENTITY (LOGO & TAGLINE)</h3>
          </div>

          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#8695a8] mb-1.5">
                  Logo Brand Title (e.g. MechUpp)
                </label>
                <input
                  type="text"
                  value={form.logo_title}
                  onChange={(e) => setForm({ ...form, logo_title: e.target.value })}
                  placeholder="e.g. MechUpp"
                  className="w-full rounded-xl border border-[#8695a8]/25 bg-[#0d0f14] px-4 py-3 text-sm font-bold text-white focus:border-[#eb5f0d] focus:outline-none"
                />
                <p className="text-[11px] text-[#868687] mt-1">
                  Mixed-case brand name (ends with 'Upp' to highlight in orange).
                </p>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#8695a8] mb-1.5">
                  Logo Tagline Text
                </label>
                <input
                  type="text"
                  value={form.logo_tagline}
                  onChange={(e) => setForm({ ...form, logo_tagline: e.target.value })}
                  placeholder="e.g. Tune Upp. Gear Upp. MechUpp"
                  className="w-full rounded-xl border border-[#8695a8]/25 bg-[#0d0f14] px-4 py-3 text-sm text-white focus:border-[#eb5f0d] focus:outline-none"
                />
                <p className="text-[11px] text-[#868687] mt-1">
                  Tagline displayed underneath logo mark.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Logo Upload & URL Box */}
            <div className="p-5 rounded-2xl bg-[#0d0f14] border border-[#8695a8]/20 flex flex-col justify-between">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-white mb-2">
                  Header & Footer Custom Logo Image
                </label>
                <p className="text-[11px] text-[#868687] mb-3">
                  Upload logo image (.PNG, .JPG, .SVG, .WEBP) or enter image URL below:
                </p>

                <input
                  type="text"
                  value={form.logo_url}
                  onChange={(e) => {
                    const val = e.target.value;
                    setForm(prev => ({ ...prev, logo_url: val }));
                    setLogoPreview(val);
                    setRemoveLogo(false);
                  }}
                  placeholder="Image URL e.g. /uploads/cms/logo.png or https://..."
                  className="w-full rounded-xl border border-[#8695a8]/25 bg-[#161922] px-3.5 py-2 text-xs text-white focus:border-[#eb5f0d] focus:outline-none mb-3"
                />

                <div className="h-28 rounded-xl border-2 border-dashed border-[#8695a8]/30 bg-white/5 flex items-center justify-center relative overflow-hidden group">
                  {logoPreview ? (
                    <img 
                      src={logoPreview} 
                      alt="Logo preview" 
                      className="max-h-20 max-w-full object-contain p-2"
                      onError={() => setLogoPreview('')} 
                    />
                  ) : (
                    <div className="text-center text-[#868687]">
                      <Upload className="mx-auto h-6 w-6 mb-1 text-[#8695a8]" />
                      <span className="text-xs">Click or Browse Image File</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-[#8695a8] truncate">
                  {logoFile ? logoFile.name : (form.logo_url ? 'Custom Logo Active' : 'Default Vector SVG Active')}
                </span>
                <div className="flex items-center gap-3">
                  {(form.logo_url || logoFile) && (
                    <button
                      type="button"
                      onClick={handleResetLogo}
                      className="text-xs text-red-400 font-bold hover:underline flex items-center gap-1"
                    >
                      <RotateCcw className="h-3 w-3" /> Revert
                    </button>
                  )}
                  <label className="cursor-pointer font-bold text-[#eb5f0d] hover:underline flex items-center gap-1">
                    <Upload className="h-3.5 w-3.5" />
                    Browse
                    <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                  </label>
                </div>
              </div>
            </div>

            {/* Favicon Upload Box */}
            <div className="p-5 rounded-2xl bg-[#0d0f14] border border-[#8695a8]/20 flex flex-col justify-between">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-white mb-2">
                  Browser Favicon Upload
                </label>
                <p className="text-[11px] text-[#868687] mb-4">
                  Upload website tab icon (.ICO, .PNG, .SVG). Max 2MB.
                </p>

                <div className="h-28 rounded-xl border-2 border-dashed border-[#8695a8]/30 bg-white/5 flex items-center justify-center relative overflow-hidden">
                  {faviconPreview ? (
                    <div className="flex items-center gap-3 bg-[#161922] p-3 rounded-xl border border-[#8695a8]/20">
                      <img src={faviconPreview} alt="Favicon preview" className="h-8 w-8 object-contain" />
                      <div className="text-left">
                        <span className="text-xs font-bold text-white block">Active Favicon</span>
                        <span className="text-[10px] text-[#8695a8]">Live tab icon updated</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-[#868687]">
                      <Upload className="mx-auto h-6 w-6 mb-1 text-[#8695a8]" />
                      <span className="text-xs">Select Favicon File</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*,.ico"
                    onChange={handleFaviconChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-[#8695a8] truncate">
                  {faviconFile ? faviconFile.name : (cmsSettings?.favicon_url ? 'Custom Favicon Active' : 'Default Favicon')}
                </span>
                <label className="cursor-pointer font-bold text-[#eb5f0d] hover:underline flex items-center gap-1">
                  <Upload className="h-3.5 w-3.5" />
                  Browse
                  <input type="file" accept="image/*,.ico" onChange={handleFaviconChange} className="hidden" />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* HERO SECTION CMS EDITING OPTIONS */}
        <div className="rounded-3xl border border-[#8695a8]/20 bg-[#161922] p-7 shadow-xl">
          <div className="flex items-center gap-2.5 mb-5 border-b border-[#8695a8]/20 pb-3.5">
            <Type className="h-5 w-5 text-[#eb5f0d]" />
            <h3 className="font-display text-xl font-bold text-white">HERO SECTION CMS EDITING</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#8695a8] mb-1.5">
                Hero Tag Badge Text (e.g. "Avail Your Early Bird Discount" or "⚡ 1-MINUTE PATNA RIDER SURVEY")
              </label>
              <input
                type="text"
                value={form.hero_badge}
                onChange={(e) => setForm({ ...form, hero_badge: e.target.value })}
                placeholder="e.g. ⚡ 1-MINUTE PATNA RIDER SURVEY"
                className="w-full rounded-xl border border-[#8695a8]/25 bg-[#0d0f14] px-4 py-3 text-sm text-white focus:border-[#eb5f0d] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#8695a8] mb-1.5">
                Hero Main Headline Text Change
              </label>
              <input
                type="text"
                value={form.hero_title}
                onChange={(e) => setForm({ ...form, hero_title: e.target.value })}
                placeholder="e.g. HELP SHAPE PATNA'S 1ST QUICK BIKE CARE & LOCK YOUR DISCOUNT"
                className="w-full rounded-xl border border-[#8695a8]/25 bg-[#0d0f14] px-4 py-3 text-sm font-black text-white focus:border-[#eb5f0d] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#8695a8] mb-1.5">
                Hero Subtitle Description Change Option
              </label>
              <textarea
                rows={3}
                value={form.hero_subtitle}
                onChange={(e) => setForm({ ...form, hero_subtitle: e.target.value })}
                placeholder="e.g. Claim your Early Bird spot! MechUpp Powered by Aethenox Motoserv is bringing Patna's 1st Quick Bike Care directly to your doorstep & road."
                className="w-full rounded-xl border border-[#8695a8]/25 bg-[#0d0f14] px-4 py-3 text-sm text-white focus:border-[#eb5f0d] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#8695a8] mb-1.5">
                Hero CTA Action Button Text Change Option
              </label>
              <input
                type="text"
                value={form.hero_cta_text}
                onChange={(e) => setForm({ ...form, hero_cta_text: e.target.value })}
                placeholder="e.g. TAKE SURVEY AND CLAIM DISCOUNT"
                className="w-full rounded-xl border border-[#8695a8]/25 bg-[#0d0f14] px-4 py-3 text-sm font-black text-white focus:border-[#eb5f0d] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#8695a8] mb-1.5">
                Hero Image Frame URL
              </label>
              <input
                type="text"
                value={form.hero_image}
                onChange={(e) => setForm({ ...form, hero_image: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full rounded-xl border border-[#8695a8]/25 bg-[#0d0f14] px-4 py-3 text-sm text-white focus:border-[#eb5f0d] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* SOCIAL MEDIA LINKS MANAGEMENT */}
        <div className="rounded-3xl border border-[#8695a8]/20 bg-[#161922] p-7 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#8695a8]/20 pb-3.5 mb-5">
            <div className="flex items-center gap-2.5">
              <Share2 className="h-5 w-5 text-[#eb5f0d]" />
              <h3 className="font-display text-xl font-bold text-white">SOCIAL MEDIA LINKS MANAGEMENT</h3>
            </div>
            <button
              type="button"
              onClick={handleAddSocialLink}
              className="flex items-center gap-1.5 rounded-xl bg-[#eb5f0d]/20 border border-[#eb5f0d]/40 px-3.5 py-1.5 text-xs font-bold text-[#eb5f0d] hover:bg-[#eb5f0d]/30 transition-all"
            >
              <Plus className="h-4 w-4" />
              Add Social Link
            </button>
          </div>

          <div className="space-y-4">
            {socialLinksList.map((item, index) => (
              <div key={item.id || index} className="p-4 rounded-2xl bg-[#0d0f14] border border-[#8695a8]/20 flex flex-col md:flex-row items-stretch md:items-center gap-3">
                <div className="w-full md:w-1/4">
                  <label className="block text-[10px] font-bold uppercase text-[#868687] mb-1">Platform Label</label>
                  <input
                    type="text"
                    value={item.platform}
                    onChange={(e) => handleUpdateSocialLink(index, 'platform', e.target.value)}
                    placeholder="Instagram / WhatsApp"
                    className="w-full rounded-xl border border-[#8695a8]/25 bg-[#161922] px-3 py-2 text-xs text-white focus:border-[#eb5f0d] focus:outline-none"
                  />
                </div>

                <div className="w-full md:w-2/4">
                  <label className="block text-[10px] font-bold uppercase text-[#868687] mb-1">Link URL</label>
                  <input
                    type="text"
                    value={item.url}
                    onChange={(e) => handleUpdateSocialLink(index, 'url', e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-[#8695a8]/25 bg-[#161922] px-3 py-2 text-xs text-white focus:border-[#eb5f0d] focus:outline-none"
                  />
                </div>

                <div className="w-full md:w-1/4">
                  <label className="block text-[10px] font-bold uppercase text-[#868687] mb-1">Icon Type</label>
                  <select
                    value={item.icon || 'Globe'}
                    onChange={(e) => handleUpdateSocialLink(index, 'icon', e.target.value)}
                    className="w-full rounded-xl border border-[#8695a8]/25 bg-[#161922] px-3 py-2 text-xs text-white focus:border-[#eb5f0d] focus:outline-none"
                  >
                    <option value="Globe">Website (Globe)</option>
                    <option value="Share2">Instagram / Social</option>
                    <option value="MessageCircle">Twitter / X</option>
                    <option value="Video">YouTube / Video</option>
                    <option value="Phone">WhatsApp / Phone</option>
                    <option value="Mail">Email / Mail</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteSocialLink(index)}
                  className="self-end md:self-center p-2 text-[#868687] hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors mt-2 md:mt-4"
                  title="Remove link"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CONTACT & FOOTER CMS */}
        <div className="rounded-3xl border border-[#8695a8]/20 bg-[#161922] p-7 shadow-xl">
          <div className="flex items-center gap-2.5 mb-5 border-b border-[#8695a8]/20 pb-3.5">
            <Phone className="h-5 w-5 text-[#eb5f0d]" />
            <h3 className="font-display text-xl font-bold text-white">CONTACT & FOOTER CMS EDITING</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#8695a8] mb-1.5">
                Support Email
              </label>
              <input
                type="email"
                value={form.support_email}
                onChange={(e) => setForm({ ...form, support_email: e.target.value })}
                placeholder="mechupp.official@gmail.com"
                className="w-full rounded-xl border border-[#8695a8]/25 bg-[#0d0f14] px-4 py-3 text-sm text-white focus:border-[#eb5f0d] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#8695a8] mb-1.5">
                Support Phone Number
              </label>
              <input
                type="text"
                value={form.support_phone}
                onChange={(e) => setForm({ ...form, support_phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full rounded-xl border border-[#8695a8]/25 bg-[#0d0f14] px-4 py-3 text-sm text-white focus:border-[#eb5f0d] focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#8695a8] mb-1.5">
                Footer Copyright Text Option
              </label>
              <input
                type="text"
                value={form.footer_text}
                onChange={(e) => setForm({ ...form, footer_text: e.target.value })}
                placeholder="© 2026 MechUpp (Aethenox Motoserv Pvt. Ltd.). All rights reserved."
                className="w-full rounded-xl border border-[#8695a8]/25 bg-[#0d0f14] px-4 py-3 text-sm text-white focus:border-[#eb5f0d] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-[#eb5f0d] py-4 text-base font-extrabold tracking-wider text-white glow-orange hover:bg-[#d05008] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Check className="h-5 w-5" />}
          SAVE & PUBLISH ALL CMS CHANGES
        </button>
      </form>
    </div>
  );
}

/* Modal for Adding/Editing Admins */
function AdminFormModal({ admin, onClose, onSave }) {
  const isEdit = Boolean(admin);
  const [name, setName] = useState(admin ? admin.name : '');
  const [email, setEmail] = useState(admin ? admin.email : '');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(admin ? admin.role : 'admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = { name, email, role };
    if (password) payload.password = password;

    const url = isEdit ? `/api/super-admin/admins/${admin.id}` : '/api/super-admin/admins';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        onSave();
      } else {
        setError(data.message || (data.errors ? Object.values(data.errors)[0][0] : 'Error saving admin.'));
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="relative w-full max-w-md rounded-3xl border border-[#8695a8]/25 bg-[#161922] p-7 shadow-2xl">
        <button onClick={onClose} className="absolute right-5 top-5 text-[#868687] hover:text-white">
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <ShieldAlert className="h-6 w-6 text-[#eb5f0d]" />
          <h3 className="font-display text-2xl font-black text-white">
            {isEdit ? 'EDIT ADMIN ACCOUNT' : 'ADD NEW ADMIN'}
          </h3>
        </div>
        <p className="text-xs text-[#8695a8] mb-6">
          🔒 Restricted Action: Only Super Admin can create or manage admin privileges.
        </p>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8695a8] mb-1.5">
              Admin Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Vikram Singh"
              className="w-full rounded-xl border border-[#8695a8]/25 bg-[#0d0f14] px-4 py-3 text-sm text-white focus:border-[#eb5f0d] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8695a8] mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@aethenoxmotoserv.com"
              className="w-full rounded-xl border border-[#8695a8]/25 bg-[#0d0f14] px-4 py-3 text-sm text-white focus:border-[#eb5f0d] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8695a8] mb-1.5">
              Password {isEdit && <span className="text-[#868687] font-normal">(Leave blank to keep current)</span>}
            </label>
            <input
              type="password"
              required={!isEdit}
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isEdit ? "••••••••" : "Minimum 6 characters"}
              className="w-full rounded-xl border border-[#8695a8]/25 bg-[#0d0f14] px-4 py-3 text-sm text-white focus:border-[#eb5f0d] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8695a8] mb-1.5">
              Role Permission
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border border-[#8695a8]/25 bg-[#0d0f14] px-4 py-3 text-sm text-white focus:border-[#eb5f0d] focus:outline-none"
            >
              <option value="admin">Standard Admin (View Customers & CMS)</option>
              <option value="super_admin">Super Admin (Full Access & Add Admin Privileges)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#eb5f0d] py-3.5 text-sm font-extrabold tracking-wider text-white glow-orange hover:bg-[#d05008] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
            {isEdit ? 'SAVE ADMIN CHANGES' : 'CREATE ADMIN ACCOUNT'}
          </button>
        </form>
      </div>
    </div>
  );
}

function Footer({ cmsSettings }) {
  let socialLinks = [];
  try {
    socialLinks = typeof cmsSettings?.social_links === 'string'
      ? JSON.parse(cmsSettings.social_links)
      : (cmsSettings?.social_links || []);
  } catch {
    socialLinks = [];
  }

  if (!Array.isArray(socialLinks) || socialLinks.length === 0) {
    socialLinks = [
      { id: '1', platform: 'Website', url: 'https://www.mechupp.com', icon: 'Globe' },
      { id: '2', platform: 'Instagram', url: 'https://instagram.com/mechupp', icon: 'Share2' },
      { id: '3', platform: 'Twitter / X', url: 'https://x.com/mechupp', icon: 'MessageCircle' },
      { id: '4', platform: 'YouTube', url: 'https://youtube.com/@mechupp', icon: 'Video' },
      { id: '5', platform: 'WhatsApp', url: 'https://wa.me/919876543210', icon: 'Phone' },
    ];
  }

  const getSocialIcon = (iconName) => {
    switch ((iconName || '').toLowerCase()) {
      case 'globe': case 'website': return Globe;
      case 'share2': case 'instagram': return Share2;
      case 'messagecircle': case 'twitter': case 'x': return MessageCircle;
      case 'video': case 'youtube': return Video;
      case 'phone': case 'whatsapp': return Phone;
      case 'mail': return Mail;
      default: return ExternalLink;
    }
  };

  return (
    <footer className="border-t border-[#8695a8]/20 bg-[#161922] px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <BrandLogo cmsSettings={cmsSettings} className="h-8 w-8" textSize="text-xl" taglineSize="text-[10px]" />
          <p className="mt-2 flex items-center gap-1.5 text-xs text-[#8695a8]">
            <MapPin className="h-3.5 w-3.5 text-[#eb5f0d]" />
            Patna's 1st Quick Bike Care — <strong>Powered by Aethenox Motoserv</strong>
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {socialLinks.map((item, idx) => {
            const IconComponent = getSocialIcon(item.icon || item.platform);
            return (
              <a
                key={item.id || idx}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl border border-[#8695a8]/25 bg-[#0d0f14] px-4 py-2.5 text-xs font-semibold text-[#8695a8] hover:text-white hover:border-[#eb5f0d]/50 transition-colors"
              >
                <IconComponent className="h-3.5 w-3.5 text-[#eb5f0d]" />
                {item.platform}
              </a>
            );
          })}
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-[#868687]">
        {cmsSettings?.footer_text || '© 2026 MechUpp (Aethenox Motoserv Pvt. Ltd.). All rights reserved.'} Support: <span className="text-[#8695a8]">{cmsSettings?.support_email || 'mechupp.official@gmail.com'}</span>
      </p>
    </footer>
  );
}

const rootElement = document.getElementById('app');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}

