import { PageShell } from '../components/page-shell';
import { apiFetch } from '../lib/api';

interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  roles: string[];
  email: string;
  department: string;
  language: string;
}

export default async function SettingsPage() {
  const users = await apiFetch<UserProfile[]>('/users');

  return (
    <PageShell>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">User & RBAC Overview</h1>
        <p className="text-sm text-muted-foreground">
          Role-based access control with audit-ready summaries and bilingual preferences.
        </p>
      </header>
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="min-w-full divide-y divide-border text-sm">
          <thead className="bg-muted/60 text-left">
            <tr>
              <th className="px-4 py-2 font-medium">Name</th>
              <th className="px-4 py-2 font-medium">Username</th>
              <th className="px-4 py-2 font-medium">Department</th>
              <th className="px-4 py-2 font-medium">Roles</th>
              <th className="px-4 py-2 font-medium">Language</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => (
              <tr key={user.id} className="bg-card">
                <td className="px-4 py-2 font-medium">{user.fullName}</td>
                <td className="px-4 py-2 text-muted-foreground">{user.username}</td>
                <td className="px-4 py-2">{user.department}</td>
                <td className="px-4 py-2 text-xs uppercase tracking-wide">{user.roles.join(', ')}</td>
                <td className="px-4 py-2 text-xs">{user.language}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageShell>
  );
}
