import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { X } from 'lucide-react';
import { useState } from 'react';

interface EventAnnouncement {
  id: string;
  title: string;
  message: string;
  type: string;
  link_url?: string;
  link_text?: string;
  background_color: string;
  text_color: string;
  is_active: boolean;
  start_date?: string;
  end_date?: string;
  order_position: number;
}

export function EventAnnouncements() {
  const [dismissedAnnouncements, setDismissedAnnouncements] = useState<string[]>([]);

  const { data: announcements } = useQuery({
    queryKey: ['event_announcements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('event_announcements')
        .select('*')
        .eq('is_active', true)
        .order('order_position', { ascending: true });

      if (error) throw error;
      
      // Filter announcements based on date range
      const now = new Date();
      return (data as EventAnnouncement[]).filter(announcement => {
        const startDate = announcement.start_date ? new Date(announcement.start_date) : null;
        const endDate = announcement.end_date ? new Date(announcement.end_date) : null;
        
        if (startDate && startDate > now) return false;
        if (endDate && endDate < now) return false;
        
        return true;
      });
    }
  });

  const handleDismiss = (announcementId: string) => {
    setDismissedAnnouncements(prev => [...prev, announcementId]);
  };

  const visibleAnnouncements = announcements?.filter(
    announcement => !dismissedAnnouncements.includes(announcement.id)
  );

  if (!visibleAnnouncements || visibleAnnouncements.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {visibleAnnouncements.map((announcement) => (
        <div
          key={announcement.id}
          className="relative flex items-center justify-between px-4 py-3 rounded-md text-sm font-medium shadow-sm"
          style={{
            backgroundColor: announcement.background_color,
            color: announcement.text_color
          }}
        >
          <div className="flex-1 mr-4">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{announcement.title}</span>
              <span>•</span>
              <span>{announcement.message}</span>
              {announcement.link_url && (
                <a
                  href={announcement.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline ml-2"
                  style={{ color: announcement.text_color }}
                >
                  {announcement.link_text || 'Saiba mais'}
                </a>
              )}
            </div>
          </div>
          
          <button
            onClick={() => handleDismiss(announcement.id)}
            className="p-1 rounded-full hover:bg-black/10 transition-colors"
            aria-label="Fechar aviso"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}