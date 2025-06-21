
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Book, Calendar, Clock } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const ReadingPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dados dos planos de leitura (mesmos da BibleReadingSection)
  const readingPlans = [
    {
      id: 1,
      title: "As Cicatrizes e Marcas da Vida",
      image: "https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=2074&auto=format&fit=crop",
      category: "Mulheres",
      description: "Um plano focado na cura e restauração através da Palavra.",
      duration: "7 dias",
      readings: [
        { day: 1, title: "Cicatrizes que Curam", passage: "Salmos 147:3", content: "Ele sara os quebrantados de coração e cuida das suas feridas." },
        { day: 2, title: "Marcas da Graça", passage: "2 Coríntios 12:9", content: "A minha graça te basta, porque o meu poder se aperfeiçoa na fraqueza." },
        { day: 3, title: "Restauração Divina", passage: "Joel 2:25", content: "Restituir-vos-ei os anos que comeu o gafanhoto." },
        { day: 4, title: "Nova Criatura", passage: "2 Coríntios 5:17", content: "Se alguém está em Cristo, nova criatura é." },
        { day: 5, title: "Força na Fraqueza", passage: "Isaías 40:31", content: "Os que esperam no Senhor renovarão as suas forças." },
        { day: 6, title: "Perdão e Libertação", passage: "1 João 1:9", content: "Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar." },
        { day: 7, title: "Vida Abundante", passage: "João 10:10", content: "Eu vim para que tenham vida e a tenham com abundância." }
      ]
    },
    {
      id: 2,
      title: "Pentecostes: O Fogo que Permanece",
      image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=2070&auto=format&fit=crop",
      category: "Mulheres",
      description: "Explore o poder do Espírito Santo em sua vida.",
      duration: "5 dias",
      readings: [
        { day: 1, title: "A Promessa do Pai", passage: "Atos 1:4-5", content: "Aguardassem a promessa do Pai, que de mim ouvistes." },
        { day: 2, title: "O Derramar do Espírito", passage: "Atos 2:1-4", content: "E todos foram cheios do Espírito Santo." },
        { day: 3, title: "Poder para Testemunhar", passage: "Atos 1:8", content: "Recebereis poder ao descer sobre vós o Espírito Santo." },
        { day: 4, title: "Frutos do Espírito", passage: "Gálatas 5:22-23", content: "O fruto do Espírito é: amor, alegria, paz..." },
        { day: 5, title: "Vida no Espírito", passage: "Romanos 8:14", content: "Todos os que são guiados pelo Espírito de Deus são filhos de Deus." }
      ]
    },
    {
      id: 3,
      title: "Namoro Cristão",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=2074&auto=format&fit=crop",
      category: "Mulheres",
      description: "Princípios bíblicos para relacionamentos saudáveis.",
      duration: "6 dias",
      readings: [
        { day: 1, title: "Fundamentos do Amor", passage: "1 Coríntios 13:4-7", content: "O amor é paciente, é benigno..." },
        { day: 2, title: "Pureza no Relacionamento", passage: "1 Tessalonicenses 4:3-4", content: "Esta é a vontade de Deus: a vossa santificação." },
        { day: 3, title: "Sabedoria na Escolha", passage: "Provérbios 3:5-6", content: "Confia no Senhor de todo o teu coração." },
        { day: 4, title: "Comunicação Saudável", passage: "Efésios 4:29", content: "Nenhuma palavra torpe saia da vossa boca." },
        { day: 5, title: "Honrando a Deus", passage: "1 Coríntios 10:31", content: "Fazei tudo para a glória de Deus." },
        { day: 6, title: "Preparação para o Casamento", passage: "Gênesis 2:24", content: "Deixará o homem pai e mãe e se unirá à sua mulher." }
      ]
    }
  ];

  const plan = readingPlans.find(p => p.id === parseInt(id || ""));

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Plano não encontrado</h1>
          <Button onClick={() => navigate("/")}>Voltar ao Início</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white font-body">
      <Header logoUrl="/lovable-uploads/52bb9865-eabf-4a7f-aee6-c64d183500e9.png" />
      <main className="flex-grow py-16">
        <div className="container mx-auto px-8 max-w-4xl">
          {/* Header do plano */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar aos Planos
            </Button>
            
            <div className="relative h-64 rounded-lg overflow-hidden mb-6">
              <img
                src={plan.image}
                alt={plan.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
                <div className="p-6 text-white">
                  <h1 className="text-4xl font-bold mb-2">{plan.title}</h1>
                  <p className="text-lg opacity-90">{plan.description}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{plan.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Book className="h-5 w-5" />
                <span>{plan.category}</span>
              </div>
            </div>
          </div>

          {/* Leituras diárias */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Leituras Diárias</h2>
            {plan.readings.map((reading) => (
              <Card key={reading.day} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {reading.day}
                    </div>
                    <div>
                      <h3 className="text-lg">{reading.title}</h3>
                      <p className="text-sm text-gray-600 font-normal">{reading.passage}</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 italic">"{reading.content}"</p>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-gray-600">
                      💡 Reflita sobre como este versículo se aplica à sua vida hoje.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to action */}
          <div className="mt-12 text-center">
            <Card className="bg-gray-50">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Complete sua jornada</h3>
                <p className="text-gray-600 mb-6">
                  Dedique alguns minutos por dia para meditar nestes versículos e fortalecer sua fé.
                </p>
                <Button 
                  className="bg-black text-white hover:bg-gray-800"
                  onClick={() => window.open('https://www.bible.com/pt/reading-plans', '_blank')}
                >
                  Explorar Mais Planos
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReadingPlan;
