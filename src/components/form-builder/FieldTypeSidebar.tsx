import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Type, 
  Mail, 
  Phone, 
  Hash, 
  Calendar, 
  MapPin, 
  FileText, 
  List, 
  CheckSquare, 
  Circle, 
  Upload,
  CreditCard,
  User
} from 'lucide-react';
import { FieldType, FieldTypeConfig } from '@/types/form';

const fieldTypes: FieldTypeConfig[] = [
  {
    type: 'text',
    label: 'Texto',
    icon: Type,
    description: 'Campo de texto simples'
  },
  {
    type: 'email',
    label: 'Email',
    icon: Mail,
    description: 'Campo de email com validação'
  },
  {
    type: 'phone',
    label: 'Telefone',
    icon: Phone,
    description: 'Campo de telefone com máscara'
  },
  {
    type: 'number',
    label: 'Número',
    icon: Hash,
    description: 'Campo numérico'
  },
  {
    type: 'date',
    label: 'Data',
    icon: Calendar,
    description: 'Seletor de data'
  },
  {
    type: 'address',
    label: 'Endereço',
    icon: MapPin,
    description: 'Endereço com busca por CEP'
  },
  {
    type: 'textarea',
    label: 'Texto Longo',
    icon: FileText,
    description: 'Área de texto grande'
  },
  {
    type: 'select',
    label: 'Lista Suspensa',
    icon: List,
    description: 'Seleção única de opções'
  },
  {
    type: 'checkbox',
    label: 'Checkbox',
    icon: CheckSquare,
    description: 'Seleção múltipla'
  },
  {
    type: 'radio',
    label: 'Radio Button',
    icon: Circle,
    description: 'Seleção única de opções'
  },
  {
    type: 'file',
    label: 'Arquivo',
    icon: Upload,
    description: 'Upload de arquivos'
  },
  {
    type: 'cpf',
    label: 'CPF',
    icon: CreditCard,
    description: 'Campo de CPF com validação'
  },
  {
    type: 'rg',
    label: 'RG',
    icon: User,
    description: 'Campo de RG'
  }
];

interface FieldTypeSidebarProps {
  onAddField: (fieldType: FieldType) => void;
}

export const FieldTypeSidebar: React.FC<FieldTypeSidebarProps> = ({ onAddField }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Tipos de Campo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {fieldTypes.map((fieldType) => {
            const Icon = fieldType.icon;
            return (
              <Button
                key={fieldType.type}
                variant="outline"
                className="w-full justify-start h-auto p-3"
                onClick={() => onAddField(fieldType.type as FieldType)}
              >
                <div className="flex items-start gap-3">
                  <Icon className="h-5 w-5 mt-0.5 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">{fieldType.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {fieldType.description}
                    </div>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};