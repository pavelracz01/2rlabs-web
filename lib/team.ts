import fs from 'fs';
import path from 'path';

const teamDataPath = path.join(process.cwd(), 'content/team/team-members.json');

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  linkedin?: string;
  github?: string;
  email?: string;
  order: number;
}

export interface TeamData {
  members: TeamMember[];
}

export function getTeamMembers(): TeamMember[] {
  if (!fs.existsSync(teamDataPath)) {
    return [];
  }

  const fileContents = fs.readFileSync(teamDataPath, 'utf8');
  const data: TeamData = JSON.parse(fileContents);

  // Sort by order field
  return data.members.sort((a, b) => a.order - b.order);
}

export function getTeamMemberById(id: string): TeamMember | null {
  const members = getTeamMembers();
  return members.find((member) => member.id === id) || null;
}
