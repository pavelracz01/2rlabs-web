import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { getTeamMembers } from '@/lib/team';
import { TeamMemberCard } from '@/components/team/TeamMemberCard';
import { Button } from '@/components/ui/button';

export default function TeamPreview({ locale }: { locale: string }) {
  const t = useTranslations('teamPreview');
  const teamMembers = getTeamMembers().slice(0, 4);

  if (teamMembers.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-muted-foreground">
            Experienced professionals dedicated to your success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>

        <div className="text-center">
          <Link href={`/${locale}/about`}>
            <Button variant="outline" size="lg">
              Learn More About Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
