import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Edit3, Save, X, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface LiveEditorProps {
  isAdmin: boolean;
}

export const LiveEditor: React.FC<LiveEditorProps> = ({ isAdmin }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showEditButton, setShowEditButton] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    setShowEditButton(isAdmin);
  }, [isAdmin]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    // Add visual indicators to editable elements
    if (!isEditMode) {
      document.body.classList.add('live-edit-mode');
    } else {
      document.body.classList.remove('live-edit-mode');
    }
  };

  if (!showEditButton) return null;

  return (
    <>
      {/* Floating Edit Button */}
      <div className="fixed top-4 right-4 z-[9999]">
        <Button
          onClick={toggleEditMode}
          className={`${
            isEditMode 
              ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground' 
              : 'bg-primary hover:bg-primary/90'
          } shadow-lg`}
          size="sm"
        >
          {isEditMode ? (
            <>
              <EyeOff className="h-4 w-4 mr-2" />
              Sair da Edição
            </>
          ) : (
            <>
              <Edit3 className="h-4 w-4 mr-2" />
              Editar Site
            </>
          )}
        </Button>
      </div>

      {/* Edit Mode Styles */}
      {isEditMode && (
        <style>{`
          .live-edit-mode [data-editable] {
            outline: 2px dashed hsl(var(--primary)) !important;
            outline-offset: 2px !important;
            position: relative !important;
            cursor: text !important;
            transition: all 0.2s ease !important;
          }
          
          .live-edit-mode [data-editable]:hover {
            outline-color: hsl(var(--primary)/0.8) !important;
            background-color: hsl(var(--primary)/0.05) !important;
          }
          
          .live-edit-mode [data-editable]:before {
            content: attr(data-edit-label);
            position: absolute;
            top: -20px;
            left: 0;
            background: hsl(var(--primary));
            color: hsl(var(--primary-foreground));
            padding: 2px 8px;
            font-size: 10px;
            border-radius: 4px;
            pointer-events: none;
            z-index: 10;
          }
        `}</style>
      )}
    </>
  );
};

interface EditableTextProps {
  content: string;
  sectionKey: string;
  label: string;
  multiline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const EditableText: React.FC<EditableTextProps> = ({
  content,
  sectionKey,
  label,
  multiline = false,
  className = '',
  children
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(content || '');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateContentMutation = useMutation({
    mutationFn: async (newContent: string) => {
      const { error } = await supabase
        .from('site_content')
        .upsert(
          { section_key: sectionKey, content_value: newContent },
          { onConflict: 'section_key' }
        );
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Sucesso",
        description: "Conteúdo atualizado com sucesso",
      });
      queryClient.invalidateQueries({ queryKey: ['site_data'] });
      setIsEditing(false);
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Falha ao atualizar conteúdo: " + error.message,
        variant: "destructive",
      });
    }
  });

  const handleClick = () => {
    if (document.body.classList.contains('live-edit-mode')) {
      setIsEditing(true);
      setEditValue(content || '');
    }
  };

  const handleSave = () => {
    updateContentMutation.mutate(editValue);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(content || '');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="relative">
        {multiline ? (
          <Textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`${className} min-h-[100px]`}
            autoFocus
          />
        ) : (
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={className}
            autoFocus
          />
        )}
        <div className="flex gap-2 mt-2">
          <Button 
            size="sm" 
            onClick={handleSave}
            disabled={updateContentMutation.isPending}
          >
            <Save className="h-3 w-3 mr-1" />
            Salvar
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleCancel}
          >
            <X className="h-3 w-3 mr-1" />
            Cancelar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={className}
      data-editable
      data-edit-label={label}
      onClick={handleClick}
    >
      {children || content || 'Clique para editar...'}
    </div>
  );
};