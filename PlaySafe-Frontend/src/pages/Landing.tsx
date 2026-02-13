import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { ArrowRight, Activity, Brain, HeartPulse, Shield, Zap, BarChart3, Sparkles } from "lucide-react";
import ParticleField from "@/components/webgl/ParticleField";
import { analyzeMatch } from "../api/playsafe";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Activity,
    title: "Real-Time Tracking",
    desc: "Monitor player biomechanics, sprint loads, and fatigue in real-time during matches.",
    gradient: "from-primary/20 to-primary/5",
    iconBg: "bg-primary/15",
    iconColor: "text-primary",
  },
  {
    icon: Brain,
    title: "AI-Powered Insights",
    desc: "Machine learning models predict injury risk and suggest tactical adjustments.",
    gradient: "from-accent/20 to-accent/5",
    iconBg: "bg-accent/15",
    iconColor: "text-accent",
  },
  {
    icon: Shield,
    title: "Injury Prevention",
    desc: "Identify stress patterns before they lead to injuries with 3D biomechanical analysis.",
    gradient: "from-success/20 to-success/5",
    iconBg: "bg-success/15",
    iconColor: "text-success",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    desc: "Detailed dashboards for match analysis, player comparisons, and trend tracking.",
    gradient: "from-primary/15 to-blue-500/5",
    iconBg: "bg-primary/15",
    iconColor: "text-primary",
  },
  {
    icon: HeartPulse,
    title: "Recovery Optimization",
    desc: "Personalized recovery protocols based on workload data and physiological markers.",
    gradient: "from-destructive/15 to-destructive/5",
    iconBg: "bg-destructive/15",
    iconColor: "text-destructive",
  },
  {
    icon: Zap,
    title: "Strategy Simulator",
    desc: "Test tactical formations and predict outcomes before stepping on the pitch.",
    gradient: "from-accent/15 to-amber-500/5",
    iconBg: "bg-accent/15",
    iconColor: "text-accent",
  },
];

const steps = [
  { num: "01", title: "Connect Sensors", desc: "Wearable GPS and IMU sensors capture movement data during training and matches.", color: "from-primary to-primary/70" },
  { num: "02", title: "AI Processes Data", desc: "Our models analyze biomechanics, fatigue patterns, and tactical positioning in real-time.", color: "from-accent to-accent/70" },
  { num: "03", title: "Get Actionable Insights", desc: "Coaches receive alerts, risk scores, and recommendations directly on the dashboard.", color: "from-success to-success/70" },
];

const Landing = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        const els = heroRef.current.querySelectorAll("[data-anim]");
        gsap.fromTo(els, { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out", delay: 0.2 });
      }

      if (featuresRef.current) {
        gsap.fromTo(featuresRef.current.querySelectorAll("[data-card]"),
          { opacity: 0, y: 50, scale: 0.93 },
          {
            opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.6, ease: "power3.out",
            scrollTrigger: { trigger: featuresRef.current, start: "top 80%" },
          }
        );
      }

      if (stepsRef.current) {
        gsap.fromTo(stepsRef.current.querySelectorAll("[data-step]"),
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0, stagger: 0.2, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: stepsRef.current, start: "top 80%" },
          }
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current, { opacity: 0, y: 50, scale: 0.95 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 85%" },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-gradient-hero">
        {/* Floating orbs */}
        <div className="orb orb-cyan w-[500px] h-[500px] -top-20 -left-40 z-0" style={{ animationDelay: "0s" }} />
        <div className="orb orb-amber w-[400px] h-[400px] top-1/3 -right-32 z-0" style={{ animationDelay: "2s" }} />
        <div className="orb orb-blue w-[350px] h-[350px] bottom-20 left-1/4 z-0" style={{ animationDelay: "4s" }} />

        <div className="absolute inset-0 z-[1] opacity-40">
          <ParticleField />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background z-[2]" />

        <div ref={heroRef} className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-20">
          <div data-anim className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-8 glow-border">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary tracking-wide">AI-POWERED SPORTS ANALYTICS</span>
          </div>

          <h1 data-anim className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display text-foreground tracking-tight leading-[1.1]">
            Smarter Decisions.<br />
            <span className="text-gradient-primary">Safer Athletes.</span>
          </h1>

          <p data-anim className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            PlayWise uses AI and biomechanical analysis to predict injuries, optimize performance, and give coaches real-time tactical intelligence.
          </p>

          <div data-anim className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/match"
              className="group inline-flex items-center gap-2 gradient-primary text-primary-foreground px-8 py-3.5 rounded-xl text-sm font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-105"
            >
              Explore Dashboard <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/players"
              className="inline-flex items-center gap-2 glass-card glow-border px-8 py-3.5 rounded-xl text-sm font-semibold text-foreground hover:bg-primary/5 transition-all"
            >
              View Players
            </Link>
          </div>

          <div data-anim className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { val: "99.2%", label: "Accuracy", color: "text-primary" },
              { val: "50ms", label: "Latency", color: "text-accent" },
              { val: "2.4K+", label: "Athletes", color: "text-success" },
            ].map((s) => (
              <div key={s.label} className="glass-card rounded-xl p-4 glow-border">
                <p className={`text-2xl font-bold font-display ${s.color}`}>{s.val}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 relative overflow-hidden mesh-gradient-features" ref={featuresRef}>
        <div className="orb orb-green w-[300px] h-[300px] top-10 -right-20" style={{ animationDelay: "1s" }} />
        <div className="orb orb-cyan w-[250px] h-[250px] bottom-10 -left-16" style={{ animationDelay: "3s" }} />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-4">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Features</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-foreground">Everything You Need</h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">Comprehensive tools for performance analysis, injury prevention, and tactical optimization.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                data-card
                className={`relative rounded-2xl p-6 bg-gradient-to-br ${f.gradient} border border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group glow-border overflow-hidden`}
              >
                <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl ${f.iconBg} mb-4 group-hover:scale-110 transition-transform`}>
                  <f.icon className={`h-5 w-5 ${f.iconColor}`} />
                </div>
                <h3 className="text-base font-semibold font-display text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 relative overflow-hidden" ref={stepsRef}>
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30" />
        <div className="orb orb-amber w-[350px] h-[350px] top-20 left-1/2 -translate-x-1/2" style={{ animationDelay: "2s" }} />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 mb-4">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">How It Works</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-foreground">Three Simple Steps</h2>
          </div>
          <div className="space-y-6">
            {steps.map((s) => (
              <div key={s.num} data-step className="flex items-start gap-6 glass-card glow-border rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className={`flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br ${s.color} text-primary-foreground font-bold font-display text-lg shadow-lg`}>
                  {s.num}
                </div>
                <div>
                  <h3 className="text-lg font-semibold font-display text-foreground mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-hidden mesh-gradient-cta" ref={ctaRef} style={{ opacity: 0 }}>
        <div className="orb orb-cyan w-[400px] h-[400px] -bottom-32 left-1/4" style={{ animationDelay: "1s" }} />
        <div className="orb orb-blue w-[300px] h-[300px] -top-20 right-1/4" style={{ animationDelay: "3s" }} />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="glass-card glow-border rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-6">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold text-primary tracking-wide">GET STARTED</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-foreground mb-4">Ready to Transform Your Team?</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">Start using AI-powered analytics to keep your athletes safe and performing at their best.</p>
              <Link
                to="/match"
                className="group inline-flex items-center gap-2 gradient-primary text-primary-foreground px-8 py-3.5 rounded-xl text-sm font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-105"
              >
                Get Started <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
