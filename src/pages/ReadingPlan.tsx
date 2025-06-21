import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Book, Calendar, Clock, User } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const ReadingPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Scroll para o topo quando o componente carrega
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Dados sincronizados com BibleReadingSection - TODOS os 9 planos completos
  const readingPlans = [
    {
      id: 1,
      title: "As Cicatrizes e Marcas da Vida",
      image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=2070&auto=format&fit=crop",
      category: "Pais",
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
      image: "/lovable-uploads/a1e5e946-664e-44f1-b527-639019f7dd99.png",
      category: "Pais",
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
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
      category: "Pais",
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
    },
    {
      id: 4,
      title: "O Silêncio que Cura",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
      category: "Novo na Fé",
      description: "Encontre paz e direção através da meditação e quietude com Deus.",
      author: "Max Lucado",
      duration: "10 dias",
      readings: [
        { day: 1, title: "Aquietando a Alma", passage: "Salmos 46:10", content: "Aquietai-vos e sabei que eu sou Deus. No silêncio encontramos a presença divina." },
        { day: 2, title: "Ouvindo a Voz de Deus", passage: "1 Reis 19:12", content: "E depois do terremoto um fogo, porém o Senhor não estava no fogo; e depois do fogo uma voz mansa e delicada." },
        { day: 3, title: "Paz Interior", passage: "Filipenses 4:7", content: "E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos sentimentos." },
        { day: 4, title: "Meditação na Palavra", passage: "Salmos 1:2", content: "Antes tem o seu prazer na lei do Senhor, e na sua lei medita de dia e de noite." },
        { day: 5, title: "Descanso em Deus", passage: "Mateus 11:28", content: "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei." },
        { day: 6, title: "Confiança no Silêncio", passage: "Isaías 30:15", content: "Porque assim diz o Senhor Jeová, o Santo de Israel: Em vos converterdes e em sossegardes está a vossa salvação." },
        { day: 7, title: "Adoração Silenciosa", passage: "Habacuque 2:20", content: "Mas o Senhor está no seu santo templo; cale-se diante dele toda a terra." },
        { day: 8, title: "Esperando em Deus", passage: "Lamentações 3:26", content: "Bom é esperar, e em silêncio, pela salvação do Senhor." },
        { day: 9, title: "Oração Contemplativa", passage: "Salmos 62:1", content: "A minha alma espera somente em Deus; dele vem a minha salvação." },
        { day: 10, title: "Renovação no Silêncio", passage: "Isaías 40:31", content: "Mas os que esperam no Senhor renovarão as suas forças; subirão com asas como águias." }
      ]
    },
    {
      id: 5,
      title: "Casais Abençoados Em Deus",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop",
      category: "Novo na Fé",
      description: "Fortaleça seu casamento com fundamentos cristãos sólidos.",
      author: "Gary Chapman",
      duration: "14 dias",
      readings: [
        { day: 1, title: "O Design de Deus para o Casamento", passage: "Gênesis 2:24", content: "Deixará o homem pai e mãe e se unirá à sua mulher, e serão ambos uma carne." },
        { day: 2, title: "Amor Sacrificial", passage: "Efésios 5:25", content: "Vós, maridos, amai vossas mulheres, como também Cristo amou a igreja." },
        { day: 3, title: "Respeito Mútuo", passage: "Efésios 5:33", content: "Cada um de vós ame a sua própria mulher como a si mesmo, e a mulher reverencie o marido." },
        { day: 4, title: "Comunicação com Amor", passage: "Efésios 4:15", content: "Antes, seguindo a verdade em amor, cresçamos em tudo naquele que é a cabeça, Cristo." },
        { day: 5, title: "Perdão no Relacionamento", passage: "Colossenses 3:13", content: "Suportando-vos uns aos outros, e perdoando-vos uns aos outros." },
        { day: 6, title: "Oração em Casal", passage: "Mateus 18:19", content: "Se dois de vós concordarem na terra acerca de qualquer coisa que pedirem, isso lhes será feito." },
        { day: 7, title: "Servindo Juntos", passage: "Gálatas 5:13", content: "Servi-vos uns aos outros pelo amor." },
        { day: 8, title: "Paciência e Bondade", passage: "1 Coríntios 13:4", content: "O amor é sofredor, é benigno; o amor não é invejoso." },
        { day: 9, title: "Unidade em Cristo", passage: "Eclesiastes 4:12", content: "E, se alguém prevalecer contra um, os dois lhe resistirão; e o cordão de três dobras não se quebra." },
        { day: 10, title: "Honrando o Cônjuge", passage: "1 Pedro 3:7", content: "Igualmente vós, maridos, coabitai com elas com entendimento, dando honra à mulher." },
        { day: 11, title: "Crescimento Conjunto", passage: "Provérbios 27:17", content: "Ferro com ferro se aguça, assim o homem aguça o rosto do seu amigo." },
        { day: 12, title: "Proteção do Relacionamento", passage: "Cantares 8:6", content: "Põe-me como selo sobre o teu coração, como selo sobre o teu braço." },
        { day: 13, title: "Gratidão um pelo outro", passage: "1 Tessalonicenses 5:18", content: "Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco." },
        { day: 14, title: "Legado de Amor", passage: "Salmos 127:3", content: "Eis que os filhos são herança do Senhor, e o fruto do ventre o seu galardão." }
      ]
    },
    {
      id: 6,
      title: "Em Quem Confiar?",
      image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=2070&auto=format&fit=crop",
      category: "Novo na Fé",
      description: "Desenvolva uma confiança inabalável em Deus em todas as circunstâncias.",
      author: "Charles Stanley",
      duration: "8 dias",
      readings: [
        { day: 1, title: "Confiança Absoluta", passage: "Provérbios 3:5-6", content: "Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento." },
        { day: 2, title: "Deus é Fiel", passage: "1 Coríntios 10:13", content: "Não veio sobre vós tentação, senão humana; mas fiel é Deus, que não vos deixará tentar." },
        { day: 3, title: "Refúgio Seguro", passage: "Salmos 91:2", content: "Direi do Senhor: Ele é o meu Deus, o meu refúgio, a minha fortaleza, e nele confiarei." },
        { day: 4, title: "Confiança em Tempos Difíceis", passage: "Salmos 23:4", content: "Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo." },
        { day: 5, title: "Planos de Deus", passage: "Jeremias 29:11", content: "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz." },
        { day: 6, title: "Força na Fraqueza", passage: "2 Coríntios 12:9", content: "A minha graça te basta, porque o meu poder se aperfeiçoa na fraqueza." },
        { day: 7, title: "Paz que Excede", passage: "Filipenses 4:7", content: "E a paz de Deus, que excede todo o entendimento, guardará os vossos corações." },
        { day: 8, title: "Esperança Segura", passage: "Hebreus 6:19", content: "A qual temos como âncora da alma, segura e firme, e que penetra até ao interior do véu." }
      ]
    },
    {
      id: 7,
      title: "O que Jesus Postaria?",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2039&auto=format&fit=crop",
      category: "Juventude",
      description: "Navegue nas redes sociais com sabedoria e propósito cristão.",
      author: "Craig Groeschel",
      duration: "5 dias",
      readings: [
        { day: 1, title: "Palavras que Edificam", passage: "Efésios 4:29", content: "Nenhuma palavra torpe saia da vossa boca, mas só a que for boa para promover a edificação." },
        { day: 2, title: "Testemunho Digital", passage: "Mateus 5:16", content: "Assim resplandeça a vossa luz diante dos homens, para que vejam as vossas boas obras." },
        { day: 3, title: "Verdade e Amor", passage: "Efésios 4:15", content: "Antes, seguindo a verdade em amor, cresçamos em tudo naquele que é a cabeça, Cristo." },
        { day: 4, title: "Pensamentos Puros", passage: "Filipenses 4:8", content: "Quanto ao mais, irmãos, tudo o que é verdadeiro, tudo o que é honesto, tudo o que é justo." },
        { day: 5, title: "Influência Positiva", passage: "1 Coríntios 10:31", content: "Portanto, quer comais, quer bebais, ou façais qualquer outra coisa, fazei tudo para glória de Deus." }
      ]
    },
    {
      id: 8,
      title: "Amigos Verdadeiros",
      image: "https://images.unsplash.com/photo-1543269664-7eef42226a21?q=80&w=2070&auto=format&fit=crop",
      category: "Juventude",
      description: "Descubra o valor das amizades baseadas em princípios cristãos.",
      author: "Francis Chan",
      duration: "7 dias",
      readings: [
        { day: 1, title: "Amor Verdadeiro", passage: "João 15:13", content: "Ninguém tem maior amor do que este, de dar alguém a sua vida pelos seus amigos." },
        { day: 2, title: "Ferro Afia Ferro", passage: "Provérbios 27:17", content: "Ferro com ferro se aguça, assim o homem aguça o rosto do seu amigo." },
        { day: 3, title: "Amizade Fiel", passage: "Provérbios 17:17", content: "Em todo o tempo ama o amigo e para a hora da angústia nasce o irmão." },
        { day: 4, title: "Conselho Sábio", passage: "Provérbios 27:6", content: "Fiéis são as feridas do amigo, mas os beijos do inimigo são enganosos." },
        { day: 5, title: "Companheirismo na Fé", passage: "Eclesiastes 4:12", content: "E, se alguém prevalecer contra um, os dois lhe resistirão; e o cordão de três dobras não se quebra." },
        { day: 6, title: "Influências Positivas", passage: "1 Coríntios 15:33", content: "Não erreis: as más conversações corrompem os bons costumes." },
        { day: 7, title: "Comunhão Cristã", passage: "Hebreus 10:24-25", content: "E consideremo-nos uns aos outros, para nos estimularmos ao amor e às boas obras." }
      ]
    },
    {
      id: 9,
      title: "Ar & Crescer",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2049&auto=format&fit=crop",
      category: "Juventude",
      description: "Crescimento espiritual autêntico para a nova geração de cristãos.",
      author: "Lecrae Moore",
      duration: "12 dias",
      readings: [
        { day: 1, title: "Nascido de Novo", passage: "João 3:3", content: "Jesus respondeu, e disse-lhe: Na verdade, na verdade te digo que aquele que não nascer de novo, não pode ver o reino de Deus." },
        { day: 2, title: "Crescendo na Graça", passage: "2 Pedro 3:18", content: "Antes crescei na graça e conhecimento de nosso Senhor e Salvador, Jesus Cristo." },
        { day: 3, title: "Renovação Diária", passage: "2 Coríntios 4:16", content: "Por isso não desfalecemos; mas, ainda que o nosso homem exterior se corrompa, o interior, contudo, se renova de dia em dia." },
        { day: 4, title: "Transformação", passage: "Romanos 12:2", content: "E não sede conformados com este mundo, mas sede transformados pela renovação do vosso entendimento." },
        { day: 5, title: "Frutos do Espírito", passage: "Gálatas 5:22-23", content: "Mas o fruto do Espírito é: amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão, temperança." },
        { day: 6, title: "Maturidade Espiritual", passage: "1 Coríntios 13:11", content: "Quando eu era menino, falava como menino, sentia como menino, discorria como menino, mas, logo que cheguei a ser homem, acabei com as coisas de menino." },
        { day: 7, title: "Fundamentos Sólidos", passage: "1 Coríntios 3:11", content: "Porque ninguém pode pôr outro fundamento além do que já está posto, o qual é Jesus Cristo." },
        { day: 8, title: "Conhecendo a Deus", passage: "Jeremias 9:24", content: "Mas o que se gloriar glorie-se nisto: em me entender e me conhecer, que eu sou o Senhor." },
        { day: 9, title: "Vida Abundante", passage: "João 10:10", content: "O ladrão não vem senão a roubar, a matar, e a destruir; eu vim para que tenham vida, e a tenham com abundância." },
        { day: 10, title: "Perseverança", passage: "Filipenses 1:6", content: "Tendo por certo isto mesmo, que aquele que em vós começou a boa obra a aperfeiçoará até ao dia de Jesus Cristo." },
        { day: 11, title: "Propósito Divino", passage: "Efésios 2:10", content: "Porque somos feitura sua, criados em Cristo Jesus para as boas obras, as quais Deus preparou para que andássemos nelas." },
        { day: 12, title: "Corrida da Fé", passage: "1 Coríntios 9:24", content: "Não sabeis vós que os que correm no estádio, todos, na verdade, correm, mas um só leva o prêmio? Correi de tal maneira que o alcanceis." }
      ]
    }
  ];

  const plan = readingPlans.find(p => p.id === parseInt(id || ""));

  const handleBackNavigation = () => {
    console.log('Voltando para home');
    navigate("/#planos-leitura");
    setTimeout(() => {
      const element = document.getElementById('planos-leitura');
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
          <div className="mb-8">
            <button 
              onClick={handleBackNavigation}
              className="mb-6 inline-flex items-center gap-3 bg-black text-white hover:bg-gray-800 active:bg-gray-900 px-6 py-3 text-base font-medium transition-all duration-200 rounded-lg cursor-pointer min-h-[48px] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <ArrowLeft className="h-5 w-5 flex-shrink-0" />
              <span className="leading-none">Voltar aos Planos</span>
            </button>
            
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

          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Leituras Diárias</h2>
            {plan.readings?.map((reading) => (
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
