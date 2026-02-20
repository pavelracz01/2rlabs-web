import { Card, CardContent } from '@/components/ui/card';
import { LinkedinIcon, GithubIcon, MailIcon } from 'lucide-react';
import type { TeamMember } from '@/lib/team';

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card className="text-center hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="mb-4">
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-muted">
            {member.photo ? (
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-muted-foreground">
                {member.name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
        <p className="text-sm text-brand-600 font-medium mb-3">{member.role}</p>
        <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>

        <div className="flex justify-center gap-3">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-brand-600 transition-colors"
            >
              <LinkedinIcon size={20} />
            </a>
          )}
          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-brand-600 transition-colors"
            >
              <GithubIcon size={20} />
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="text-muted-foreground hover:text-brand-600 transition-colors"
            >
              <MailIcon size={20} />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
