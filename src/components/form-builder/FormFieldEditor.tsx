import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, X } from 'lucide-react';
import { FormField } from '@/types/form';

interface FormFieldEditorProps {
  field: FormField;
  onUpdate: (field: FormField) => void;
  onDelete: () => void;
}

export const FormFieldEditor: React.FC<FormFieldEditorProps> = ({ 
  field, 
  onUpdate, 
  onDelete 
}) => {
  const [localField, setLocalField] = useState<FormField>(field);
  const [newOption, setNewOption] = useState('');

  useEffect(() => {
    setLocalField(field);
  }, [field]);

  const handleChange = (key: string, value: any) => {
    const updatedField = { ...localField, [key]: value };
    setLocalField(updatedField);
    onUpdate(updatedField);
  };

  const addOption = () => {
    if (newOption.trim()) {
      const newOptions = [...localField.options, { value: newOption.trim(), label: newOption.trim() }];
      handleChange('options', newOptions);
      setNewOption('');
    }
  };

  const removeOption = (index: number) => {
    const newOptions = localField.options.filter((_, i) => i !== index);
    handleChange('options', newOptions);
  };

  const generateFieldName = (label: string) => {
    return label
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '_')
      .replace(/_+/g, '_')
      .trim();
  };

  const handleLabelChange = (label: string) => {
    handleChange('label', label);
    handleChange('field_name', generateFieldName(label));
  };

  const requiresOptions = ['select', 'checkbox', 'radio'].includes(localField.field_type);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Editar Campo</CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onDelete}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Badge variant="secondary">{localField.field_type}</Badge>
        </div>

        <div>
          <Label htmlFor="label">Rótulo do Campo</Label>
          <Input
            id="label"
            value={localField.label}
            onChange={(e) => handleLabelChange(e.target.value)}
            placeholder="Ex: Nome Completo"
          />
        </div>

        <div>
          <Label htmlFor="field_name">Nome do Campo (interno)</Label>
          <Input
            id="field_name"
            value={localField.field_name}
            onChange={(e) => handleChange('field_name', e.target.value)}
            placeholder="nome_completo"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Nome usado para identificar o campo nos dados
          </p>
        </div>

        <div>
          <Label htmlFor="placeholder">Placeholder</Label>
          <Input
            id="placeholder"
            value={localField.placeholder || ''}
            onChange={(e) => handleChange('placeholder', e.target.value)}
            placeholder="Texto de exemplo..."
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="required">Campo Obrigatório</Label>
          <Switch
            id="required"
            checked={localField.is_required}
            onCheckedChange={(checked) => handleChange('is_required', checked)}
          />
        </div>

        {requiresOptions && (
          <div>
            <Label>Opções</Label>
            <div className="space-y-2">
              {localField.options.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={option.label}
                    onChange={(e) => {
                      const newOptions = [...localField.options];
                      newOptions[index] = { ...option, label: e.target.value, value: e.target.value };
                      handleChange('options', newOptions);
                    }}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeOption(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <div className="flex items-center gap-2">
                <Input
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  placeholder="Nova opção..."
                  onKeyPress={(e) => e.key === 'Enter' && addOption()}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addOption}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {localField.field_type === 'number' && (
          <div className="space-y-2">
            <Label>Validação de Número</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="min">Mínimo</Label>
                <Input
                  id="min"
                  type="number"
                  value={localField.validation_rules?.min || ''}
                  onChange={(e) => handleChange('validation_rules', {
                    ...localField.validation_rules,
                    min: e.target.value ? parseInt(e.target.value) : undefined
                  })}
                />
              </div>
              <div>
                <Label htmlFor="max">Máximo</Label>
                <Input
                  id="max"
                  type="number"
                  value={localField.validation_rules?.max || ''}
                  onChange={(e) => handleChange('validation_rules', {
                    ...localField.validation_rules,
                    max: e.target.value ? parseInt(e.target.value) : undefined
                  })}
                />
              </div>
            </div>
          </div>
        )}

        {localField.field_type === 'text' && (
          <div>
            <Label htmlFor="maxLength">Tamanho Máximo</Label>
            <Input
              id="maxLength"
              type="number"
              value={localField.validation_rules?.maxLength || ''}
              onChange={(e) => handleChange('validation_rules', {
                ...localField.validation_rules,
                maxLength: e.target.value ? parseInt(e.target.value) : undefined
              })}
              placeholder="Ex: 100"
            />
          </div>
        )}

        {localField.field_type === 'file' && (
          <div>
            <Label htmlFor="acceptedTypes">Tipos de Arquivo Aceitos</Label>
            <Input
              id="acceptedTypes"
              value={localField.validation_rules?.acceptedTypes || ''}
              onChange={(e) => handleChange('validation_rules', {
                ...localField.validation_rules,
                acceptedTypes: e.target.value
              })}
              placeholder="Ex: .pdf,.doc,.jpg,.png"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};