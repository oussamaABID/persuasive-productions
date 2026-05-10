import { Stat } from '@/lib/types';
import { MotionReveal } from '@/components/ui/MotionReveal';

interface StatsSectionProps {
  stats: Stat[];
}

/**
 * Stats section organism.
 * Server Component delegating animations to MotionReveal.
 */
export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="relative py-32 overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-muted/20" />
      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
          {stats?.map((stat, i) => (
            <MotionReveal 
              key={stat.label}
              delay={i * 0.1}
              className="group text-center md:text-left"
            >
              <div className="flex flex-col gap-2">
                <span className="stat-label">{stat.label}</span>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-subtitle">{stat.subtitle}</div>
              </div>
              <div className="stat-card-divider" />
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
