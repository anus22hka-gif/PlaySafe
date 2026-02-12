import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertTriangle, TrendingUp, Zap, Timer } from "lucide-react";
import StatCard from "@/components/StatCard";
import RiskGauge from "@/components/RiskGauge";
import TacticalTimeline from "@/components/TacticalTimeline";
import FatigueChart from "@/components/FatigueChart";
import AlertsFeed from "@/components/AlertsFeed";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const chartsRef = useRef<HTMLDivElement>(null);
  const alertsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      if (headerRef.current) {
        gsap.fromTo(headerRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
      }

      // Stats stagger
      if (statsRef.current) {
        gsap.fromTo(statsRef.current.children,
          { opacity: 0, y: 30, scale: 0.93 },
          {
            opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.6, ease: "power3.out",
            scrollTrigger: { trigger: statsRef.current, start: "top 90%", toggleActions: "play none none none" },
          }
        );
      }

      // Timeline scroll reveal
      if (timelineRef.current) {
        gsap.fromTo(timelineRef.current,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: timelineRef.current, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      }

      // Charts scroll reveal
      if (chartsRef.current) {
        gsap.fromTo(chartsRef.current.children,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: chartsRef.current, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      }

      // Alerts scroll reveal
      if (alertsRef.current) {
        gsap.fromTo(alertsRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: alertsRef.current, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-6 pt-24 pb-16">
      <div ref={headerRef} style={{ opacity: 0 }}>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Live Analysis</p>
            <h1 className="mt-1.5 text-3xl font-bold font-display text-foreground tracking-tight">Match Overview</h1>
            <p className="mt-1 text-sm text-muted-foreground">FC United vs City Rovers — Feb 9, 2026</p>
          </div>
          <div className="glass-card rounded-lg px-4 py-2 text-xs font-semibold text-primary flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
            Processing Complete
          </div>
        </div>
      </div>

      <div ref={statsRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Team Risk Score" value="42" subtitle="Moderate overall" icon={AlertTriangle} variant="warning" trend={{ value: "8% from last match", positive: false }} />
        <StatCard title="Sprint Load" value="347" subtitle="Total high-intensity runs" icon={Zap} variant="primary" trend={{ value: "12% increase", positive: true }} />
        <StatCard title="Deceleration Events" value="89" subtitle="High-stress braking" icon={TrendingUp} variant="default" />
        <StatCard title="Avg Recovery Time" value="4.2s" subtitle="Between sprints" icon={Timer} variant="default" trend={{ value: "0.3s slower", positive: false }} />
      </div>

      <div ref={timelineRef} style={{ opacity: 0 }}>
        <TacticalTimeline />
      </div>

      <div ref={chartsRef} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2" style={{ opacity: 0 }}>
          <FatigueChart />
        </div>
        <div className="glass-card rounded-xl p-6" style={{ opacity: 0 }}>
          <h3 className="text-sm font-semibold font-display text-foreground mb-6">Player Risk Snapshot</h3>
          <div className="grid grid-cols-2 gap-6">
            <RiskGauge score={72} label="J. Martinez" size="sm" />
            <RiskGauge score={34} label="L. Chen" size="sm" />
            <RiskGauge score={56} label="A. Diallo" size="sm" />
            <RiskGauge score={18} label="R. Kim" size="sm" />
          </div>
        </div>
      </div>

      <div ref={alertsRef} style={{ opacity: 0 }}>
        <AlertsFeed />
      </div>
    </div>
  );
};

export default Index;
