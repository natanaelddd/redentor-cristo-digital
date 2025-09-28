import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { FormFieldEditor } from '@/components/form-builder/FormFieldEditor';
import { FieldTypeSidebar } from '@/components/form-builder/FieldTypeSidebar';
import { FormPreview } from '@/components/form-builder/FormPreview';
import { Save, Eye, ArrowLeft, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { FieldType, FormField, EventForm } from '@/types/form';

const FormBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isNew = id === 'new';

  const [form, setForm] = useState<EventForm>({
    id: '',
    name: '',
    description: '',
    slug: '',
    banner_title: '',
    banner_description: '',
    page_title: '',
    page_description: ''
  });
  
  const [fields, setFields] = useState<FormField[]>([]);
  const [selectedField, setSelectedField] = useState<FormField | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Fetch form data if editing
  const { data: formData, isLoading } = useQuery({
    queryKey: ['event_form', id],
    queryFn: async () => {
      if (isNew) return null;
      
      const { data, error } = await supabase
        .from('event_forms')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !isNew
  });

  // Fetch form fields if editing
  const { data: fieldsData } = useQuery({
    queryKey: ['event_form_fields', id],
    queryFn: async () => {
      if (isNew) return [];
      
      const { data, error } = await supabase
        .from('event_form_fields')
        .select('*')
        .eq('form_id', id)
        .order('order_position');
      
      if (error) throw error;
      return data;
    },
    enabled: !isNew
  });

  useEffect(() => {
    if (formData) {
      setForm(formData);
    }
  }, [formData]);

  useEffect(() => {
    if (fieldsData) {
      setFields(fieldsData.map(field => ({
        ...field,
        options: Array.isArray(field.options) ? field.options : [],
        validation_rules: field.validation_rules || {}
      })));
    }
  }, [fieldsData]);

  const saveFormMutation = useMutation({
    mutationFn: async () => {
      // Validate form data
      if (!form.name?.trim()) {
        throw new Error('Nome do formulário é obrigatório');
      }
      if (!form.slug?.trim()) {
        throw new Error('URL (slug) é obrigatório');
      }

      if (isNew) {
        // Create new form
        const formData = {
          name: form.name.trim(),
          description: form.description?.trim() || null,
          slug: form.slug.trim(),
          banner_title: form.banner_title?.trim() || null,
          banner_description: form.banner_description?.trim() || null,
          page_title: form.page_title?.trim() || null,
          page_description: form.page_description?.trim() || null,
          is_active: false,
          created_by: null
        };

        const { data: newForm, error: formError } = await supabase
          .from('event_forms')
          .insert([formData])
          .select()
          .single();

        if (formError) throw formError;

        // Save fields
        if (fields.length > 0) {
          const fieldsToInsert = fields.map((field, index) => ({
            form_id: newForm.id,
            field_type: field.field_type as FieldType,
            field_name: field.field_name.trim(),
            label: field.label.trim(),
            placeholder: field.placeholder?.trim() || null,
            is_required: field.is_required,
            options: field.options || [],
            validation_rules: field.validation_rules || {},
            order_position: index
          }));

          const { error: fieldsError } = await supabase
            .from('event_form_fields')
            .insert(fieldsToInsert);

          if (fieldsError) throw fieldsError;
        }

        return newForm;
      } else {
        // Update existing form
        const formData = {
          name: form.name.trim(),
          description: form.description?.trim() || null,
          slug: form.slug.trim(),
          banner_title: form.banner_title?.trim() || null,
          banner_description: form.banner_description?.trim() || null,
          page_title: form.page_title?.trim() || null,
          page_description: form.page_description?.trim() || null,
          updated_at: new Date().toISOString()
        };

        const { error: formError } = await supabase
          .from('event_forms')
          .update(formData)
          .eq('id', id);

        if (formError) throw formError;

        // Delete existing fields and recreate
        await supabase
          .from('event_form_fields')
          .delete()
          .eq('form_id', id);

        if (fields.length > 0) {
          const fieldsToInsert = fields.map((field, index) => ({
            form_id: id as string,
            field_type: field.field_type as FieldType,
            field_name: field.field_name.trim(),
            label: field.label.trim(),
            placeholder: field.placeholder?.trim() || null,
            is_required: field.is_required,
            options: field.options || [],
            validation_rules: field.validation_rules || {},
            order_position: index
          }));

          const { error: fieldsError } = await supabase
            .from('event_form_fields')
            .insert(fieldsToInsert);

          if (fieldsError) throw fieldsError;
        }

        return { id };
      }
    },
    onSuccess: (data) => {
      toast.success('Formulário salvo com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['event_forms'] });
      if (isNew) {
        navigate(`/admin/forms/${data.id}/builder`);
      }
    },
    onError: (error) => {
      toast.error('Erro ao salvar formulário: ' + error.message);
    }
  });

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newFields = Array.from(fields);
    const [reorderedField] = newFields.splice(result.source.index, 1);
    newFields.splice(result.destination.index, 0, reorderedField);

    setFields(newFields);
  };

  const addField = (fieldType: FieldType) => {
    const newField: FormField = {
      id: `temp-${Date.now()}`,
      field_type: fieldType,
      field_name: `field_${fields.length + 1}`,
      label: `Novo Campo ${fields.length + 1}`,
      placeholder: '',
      is_required: false,
      options: [],
      validation_rules: {},
      order_position: fields.length
    };

    setFields([...fields, newField]);
    setSelectedField(newField);
  };

  const updateField = (updatedField: FormField) => {
    setFields(fields.map(field => 
      field.id === updatedField.id ? updatedField : field
    ));
    setSelectedField(updatedField);
  };

  const deleteField = (fieldId: string) => {
    setFields(fields.filter(field => field.id !== fieldId));
    if (selectedField?.id === fieldId) {
      setSelectedField(null);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/admin/forms')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <div>
                <h1 className="text-xl font-semibold">
                  {isNew ? 'Criar Novo Formulário' : 'Editar Formulário'}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {form.name || 'Formulário sem nome'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye className="h-4 w-4 mr-2" />
                {showPreview ? 'Editor' : 'Preview'}
              </Button>
              
              <Button 
                onClick={() => saveFormMutation.mutate()}
                disabled={saveFormMutation.isPending || !form.name.trim()}
              >
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {showPreview ? (
        <FormPreview form={form} fields={fields} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
          {/* Sidebar com tipos de campo */}
          <div className="lg:col-span-1">
            <FieldTypeSidebar onAddField={addField} />
          </div>

          {/* Área principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Configurações do formulário */}
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Formulário</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome do Formulário</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => {
                        const name = e.target.value;
                        setForm(prev => ({
                          ...prev,
                          name,
                          slug: generateSlug(name)
                        }));
                      }}
                      placeholder="Ex: Encontro com Deus 2024"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="slug">URL (slug)</Label>
                    <Input
                      id="slug"
                      value={form.slug}
                      onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="encontro-com-deus-2024"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descrição do evento..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="banner_title">Título do Banner</Label>
                    <Input
                      id="banner_title"
                      value={form.banner_title}
                      onChange={(e) => setForm(prev => ({ ...prev, banner_title: e.target.value }))}
                      placeholder="Título que aparece no banner"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="banner_description">Descrição do Banner</Label>
                    <Input
                      id="banner_description"
                      value={form.banner_description}
                      onChange={(e) => setForm(prev => ({ ...prev, banner_description: e.target.value }))}
                      placeholder="Descrição do banner"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Campos do formulário */}
            <Card>
              <CardHeader>
                <CardTitle>Campos do Formulário</CardTitle>
              </CardHeader>
              <CardContent>
                {fields.length === 0 ? (
                  <div className="text-center py-8">
                    <Plus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Nenhum campo adicionado ainda. Use a barra lateral para adicionar campos.
                    </p>
                  </div>
                ) : (
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="form-fields">
                      {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                          {fields.map((field, index) => (
                            <Draggable 
                              key={field.id} 
                              draggableId={field.id} 
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  className={`p-4 border rounded-lg mb-2 cursor-pointer transition-colors ${
                                    selectedField?.id === field.id 
                                      ? 'border-primary bg-primary/5' 
                                      : 'border-border hover:border-primary/50'
                                  } ${snapshot.isDragging ? 'shadow-lg' : ''}`}
                                  onClick={() => setSelectedField(field)}
                                >
                                  <div 
                                    {...provided.dragHandleProps}
                                    className="flex items-center justify-between"
                                  >
                                    <div>
                                      <p className="font-medium">{field.label}</p>
                                      <p className="text-sm text-muted-foreground">
                                        {field.field_type} • {field.field_name}
                                        {field.is_required && ' • Obrigatório'}
                                      </p>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteField(field.id);
                                      }}
                                    >
                                      ×
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Editor de campo selecionado */}
          <div className="lg:col-span-1">
            {selectedField ? (
              <FormFieldEditor 
                field={selectedField} 
                onUpdate={updateField}
                onDelete={() => deleteField(selectedField.id)}
              />
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">
                    Selecione um campo para editar suas propriedades
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormBuilder;