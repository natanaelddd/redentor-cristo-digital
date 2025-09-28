import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, MapPin, Phone, Mail, User, CreditCard } from 'lucide-react';
import { FormField, EventForm } from '@/types/form';

interface EventFormPreview {
  name: string;
  description: string;
  page_title: string;
  page_description: string;
}

interface FormPreviewProps {
  form: EventFormPreview;
  fields: FormField[];
}

export const FormPreview: React.FC<FormPreviewProps> = ({ form, fields }) => {
  const renderField = (field: FormField) => {
    const baseProps = {
      id: field.field_name,
      placeholder: field.placeholder,
      required: field.is_required
    };

    const fieldIcon = {
      email: Mail,
      phone: Phone,
      address: MapPin,
      cpf: CreditCard,
      rg: User,
      date: CalendarIcon
    };

    const Icon = fieldIcon[field.field_type as keyof typeof fieldIcon];

    switch (field.field_type) {
      case 'text':
      case 'email':
      case 'number':
      case 'cpf':
      case 'rg':
        return (
          <div className="relative">
            {Icon && (
              <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            )}
            <Input 
              {...baseProps} 
              type={field.field_type === 'number' ? 'number' : 'text'}
              className={Icon ? 'pl-10' : ''}
            />
          </div>
        );

      case 'phone':
        return (
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              {...baseProps} 
              type="tel"
              className="pl-10"
              placeholder="(11) 99999-9999"
            />
          </div>
        );

      case 'date':
        return (
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              {...baseProps} 
              type="date"
              className="pl-10"
            />
          </div>
        );

      case 'textarea':
        return <Textarea {...baseProps} rows={4} />;

      case 'select':
        return (
          <Select>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || "Selecione uma opção"} />
            </SelectTrigger>
            <SelectContent>
              {field.options.map((option, index) => (
                <SelectItem key={index} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'radio':
        return (
          <RadioGroup>
            {field.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`${field.field_name}_${index}`} />
                <Label htmlFor={`${field.field_name}_${index}`}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox id={`${field.field_name}_${index}`} />
                <Label htmlFor={`${field.field_name}_${index}`}>{option.label}</Label>
              </div>
            ))}
          </div>
        );

      case 'address':
        return (
          <div className="space-y-2">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="CEP"
                className="pl-10"
              />
            </div>
            <Input placeholder="Rua" />
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Número" />
              <Input placeholder="Complemento" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Bairro" />
              <Input placeholder="Cidade" />
            </div>
            <Input placeholder="Estado" />
          </div>
        );

      case 'file':
        return (
          <Input 
            {...baseProps} 
            type="file"
            accept={field.validation_rules?.acceptedTypes}
          />
        );

      default:
        return <Input {...baseProps} />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {form.page_title || form.name || 'Visualização do Formulário'}
          </CardTitle>
          {(form.page_description || form.description) && (
            <p className="text-muted-foreground">
              {form.page_description || form.description}
            </p>
          )}
        </CardHeader>
        
        <CardContent>
          <form className="space-y-6">
            {fields.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Nenhum campo foi adicionado ainda. 
                  Volte para o editor para adicionar campos ao formulário.
                </p>
              </div>
            ) : (
              fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.field_name}>
                    {field.label}
                    {field.is_required && <span className="text-destructive ml-1">*</span>}
                  </Label>
                  {renderField(field)}
                </div>
              ))
            )}
            
            {fields.length > 0 && (
              <div className="pt-4">
                <Button type="submit" className="w-full" disabled>
                  Inscrever-se
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  * Esta é apenas uma visualização
                </p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};