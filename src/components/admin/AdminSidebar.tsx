
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, FileText, Calendar, Images, Link as LinkIcon, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const navLinks = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/site-content', icon: FileText, label: 'Conteúdo do Site' },
  // Futuras seções do admin
  // { to: '/admin/events', icon: Calendar, label: 'Eventos' },
  // { to: '/admin/hero-slides', icon: Images, label: 'Slides do Hero' },
  // { to: '/admin/nav-links', icon: LinkIcon, label: 'Links de Navegação' },
];

export const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <aside className="w-64 flex-shrink-0 border-r bg-white dark:bg-gray-900 dark:border-gray-800 flex flex-col h-screen sticky top-0">
      <div className="p-4 border-b dark:border-gray-800 flex items-center gap-2">
        <h2 className="text-xl font-semibold">Painel Admin</h2>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`
            }
          >
            <link.icon className="h-4 w-4" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 mt-auto border-t dark:border-gray-800">
        <Button variant="ghost" className="w-full justify-start gap-3" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          <span>Sair</span>
        </Button>
      </div>
    </aside>
  );
};
