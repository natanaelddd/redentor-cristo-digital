
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Book, Calendar, Clock, User } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const ReadingPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dados sincronizados com BibleReadingSection
  const readingPlans = [
    {
      id: 1,
      title: "As Cicatrizes e Marcas da Vida",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2074&auto=format&fit=crop",
      category: "Mulheres",
      description: "Um plano focado na cura e restauração através da Palavra de Deus.",
      author: "Priscilla Shirer",
      duration: "7 dias",
      readings: [
        { day: 1, title: "Cicatrizes que Curam", passage: "Salmos 147:3", content: "Ele sara os quebrantados de coração e cuida das suas feridas. Deus não apenas conhece nossas dores, mas ativamente trabalha para nos curar." },
        { day: 2, title: "Marcas da Graça", passage: "2 Coríntios 12:9", content: "A minha graça te basta, porque o meu poder se aperfeiçoa na fraqueza. Nossas limitações se tornam o palco para a força de Deus." },
        { day: 3, title: "Restauração Divina", passage: "Joel 2:25", content: "Restituir-vos-ei os anos que comeu o gafanhoto. Deus tem o poder de restaurar completamente aquilo que foi perdido ou destruído." },
        { day: 4, title: "Nova Criatura", passage: "2 Coríntios 5:17", content: "Se alguém está em Cristo, nova criatura é; as coisas velhas já passaram; eis que tudo se fez novo." },
        { day: 5, title: "Força na Fraqueza", passage: "Isaías 40:31", content: "Os que esperam no Senhor renovarão as suas forças, subirão com asas como águias." },
        { day: 6, title: "Perdão e Libertação", passage: "1 João 1:9", content: "Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar." },
        { day: 7, title: "Vida Abundante", passage: "João 10:10", content: "Eu vim para que tenham vida e a tenham com abundância. Cristo oferece plenitude de vida." }
      ]
    },
    {
      id: 2,
      title: "Pentecostes: O Fogo que Permanece",
      image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=2070&auto=format&fit=crop",
      category: "Mulheres",
      description: "Explore o poder transformador do Espírito Santo em sua jornada de fé.",
      author: "Beth Moore",
      duration: "5 dias",
      readings: [
        { day: 1, title: "A Promessa do Pai", passage: "Atos 1:4-5", content: "Aguardassem a promessa do Pai, que de mim ouvistes. O Espírito Santo é a promessa cumprida de Deus." },
        { day: 2, title: "O Derramar do Espírito", passage: "Atos 2:1-4", content: "E todos foram cheios do Espírito Santo e começaram a falar noutras línguas." },
        { day: 3, title: "Poder para Testemunhar", passage: "Atos 1:8", content: "Recebereis poder ao descer sobre vós o Espírito Santo, e ser-me-eis testemunhas." },
        { day: 4, title: "Frutos do Espírito", passage: "Gálatas 5:22-23", content: "O fruto do Espírito é: amor, alegria, paz, paciência, benignidade, bondade, fidelidade." },
        { day: 5, title: "Vida no Espírito", passage: "Romanos 8:14", content: "Todos os que são guiados pelo Espírito de Deus são filhos de Deus." }
      ]
    },
    {
      id: 3,
      title: "Namoro Cristão",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=2074&auto=format&fit=crop",
      category: "Mulheres",
      description: "Princípios bíblicos para relacionamentos saudáveis e honrosos.",
      author: "Joshua Harris",
      duration: "6 dias",
      readings: [
        { day: 1, title: "Fundamentos do Amor", passage: "1 Coríntios 13:4-7", content: "O amor é paciente, é benigno; o amor não é invejoso, não é soberbo." },
        { day: 2, title: "Pureza no Relacionamento", passage: "1 Tessalonicenses 4:3-4", content: "Esta é a vontade de Deus: a vossa santificação, que vos abstenhais da impureza." },
        { day: 3, title: "Sabedoria na Escolha", passage: "Provérbios 3:5-6", content: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento." },
        { day: 4, title: "Comunicação Saudável", passage: "Efésios 4:29", content: "Nenhuma palavra torpe saia da vossa boca, mas só a que for boa para promover a edificação." },
        { day: 5, title: "Honrando a Deus", passage: "1 Coríntios 10:31", content: "Portanto, quer comais, quer bebais ou façais qualquer outra coisa, fazei tudo para a glória de Deus." },
        { day: 6, title: "Preparação para o Casamento", passage: "Gênesis 2:24", content: "Deixará o homem pai e mãe e se unirá à sua mulher, e serão ambos uma carne." }
      ]
    }
  ];

  const plan = readingPlans.find(p => p.id === parseInt(id || ""));

  const handleBackNavigation = () => {
    console.log('Voltando para home');
    navigate("/#planos-leitura");
    // Scroll para a seção de planos após um pequeno delay
    setTimeout(() => {
      const element = document.getElementById('planos-leitura') || 
                     document.querySelector('[data-section="planos-leitura"]') ||
                     document.querySelector('.bible-reading-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Book className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Plano não encontrado</h1>
          <p className="text-gray-600 mb-4">O plano de leitura que você procura não existe.</p>
          <Button onClick={() => navigate("/")} className="bg-black text-white hover:bg-gray-800">
            Voltar ao Início
          </Button>
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
              onClick={handleBackNavigation}
              className="mb-6 hover:bg-gray-100"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar aos Planos
            </Button>
            
            <div className="relative h-64 rounded-lg overflow-hidden mb-6 shadow-lg">
              <img
                src={plan.image}
                alt={plan.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.log('Erro ao carregar imagem do plano:', plan.image);
                  e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2074&auto=format&fit=crop";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h1 className="text-4xl font-bold mb-2">{plan.title}</h1>
                  <p className="text-lg opacity-90">{plan.description}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{plan.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Book className="h-5 w-5" />
                <span>{plan.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>Por {plan.author}</span>
              </div>
            </div>
          </div>

          {/* Leituras diárias */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Leituras Diárias</h2>
            {plan.readings.map((reading) => (
              <Card key={reading.day} className="hover:shadow-md transition-shadow border-l-4 border-l-black">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {reading.day}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg">{reading.title}</h3>
                      <p className="text-sm text-gray-600 font-normal">{reading.passage}</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 italic mb-4">"{reading.content}"</p>
                  <div className="pt-4 border-t bg-gray-50 -mx-6 -mb-6 px-6 py-4">
                    <p className="text-sm text-gray-600">
                      💡 <strong>Reflexão:</strong> Como este versículo pode transformar sua vida hoje?
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to action */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Complete sua jornada espiritual</h3>
                <p className="text-gray-600 mb-6">
                  Dedique alguns minutos por dia para meditar nestes versículos e fortalecer sua fé. 
                  Cada leitura é uma oportunidade de crescer em intimidade com Deus.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="bg-black text-white hover:bg-gray-800"
                    onClick={() => window.open('https://www.bible.com/pt/reading-plans', '_blank')}
                  >
                    Explorar Mais Planos
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleBackNavigation}
                  >
                    Ver Outros Planos
                  </Button>
                </div>
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
