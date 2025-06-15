
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Church } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-body">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section
          id="#"
          className="relative h-[80vh] bg-cover bg-center text-white flex items-center justify-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1473177104440-ffee2f376098?q=80&w=2070&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative text-center px-4">
            <h1 className="text-4xl md:text-7xl font-bold mb-4 font-heading">
              Bem-vindo à Igreja Missionária Cristo Redentor
            </h1>
            <p className="text-lg md:text-2xl mb-8">
              Um lugar de fé, esperança e amor.
            </p>
            <Button size="lg" asChild>
              <a href="#sobre">QUERO ME TORNAR MEMBRO</a>
            </Button>
          </div>
        </section>

        {/* About Section */}
        <section id="sobre" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img src="https://images.unsplash.com/photo-1507692049482-4336f7384a56?q=80&w=1974&auto=format&fit=crop" alt="Comunidade da igreja" className="rounded-lg shadow-lg w-full h-auto object-cover aspect-square" />
              </div>
              <div className="text-left">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading">Sobre Nós</h2>
                <p className="text-muted-foreground text-lg mb-4">
                  A Igreja Missionária Cristo Redentor é uma comunidade de fé localizada no bairro Cristo Redentor em Ribeirão Preto - SP.
                </p>
                <p className="text-muted-foreground text-lg">
                  Nossa missão é compartilhar o amor de Cristo e servir à nossa comunidade com compaixão e dedicação. Junte-se a nós em nossos cultos e eventos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section id="eventos" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 font-heading">Nossos Cultos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img src="https://images.unsplash.com/photo-1594794617141-2d7f99b22223?q=80&w=2070&auto=format&fit=crop" alt="Culto de Domingo" className="w-full h-56 object-cover"/>
                <CardHeader>
                  <CardTitle className="font-heading">Culto de Domingo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Todos os Domingos às 19h</span>
                  </div>
                  <p>Um tempo de louvor, adoração e palavra de Deus.</p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                 <img src="https://images.unsplash.com/photo-1543621894-0a345e6b12de?q=80&w=2070&auto=format&fit=crop" alt="Estudo Bíblico" className="w-full h-56 object-cover"/>
                <CardHeader>
                  <CardTitle className="font-heading">Estudo Bíblico</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Todas as Quartas às 20h</span>
                  </div>
                  <p>Aprofunde seu conhecimento nas escrituras sagradas.</p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img src="https://images.unsplash.com/photo-1544219454-935243f7737e?q=80&w=2070&auto=format&fit=crop" alt="Rede de Jovens" className="w-full h-56 object-cover"/>
                <CardHeader>
                  <CardTitle className="font-heading">Rede de Jovens</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Todos os Sábados às 19h30</span>
                  </div>
                  <p>Um encontro dinâmico para os jovens da nossa comunidade.</p>
                </CardContent>
              </Card>
            </div>
            <div className="text-center">
              <Button size="lg" variant="outline">
                TODOS OS EVENTOS
              </Button>
            </div>
          </div>
        </section>

        {/* Contact/Location Section */}
        <section id="contato" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
             <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 font-heading">Localização</h2>
             <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3729.988588523903!2d-47.83060188451871!3d-20.79203896898144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b9bfa4a6312455%3A0xc3f6d296c66d2f34!2sIgreja%20Mission%C3%A1ria%20Cristo%20Redentor!5e0!3m2!1sen!2sbr!4v1620067677893!5m2!1sen!2sbr"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    className="rounded-lg shadow-lg"
                    title="Mapa de Localização da Igreja"
                  ></iframe>
                </div>
                <div className="text-left">
                  <h3 className="text-3xl font-bold mb-6 font-heading">Venha nos visitar</h3>
                  <div className="flex items-start text-muted-foreground text-lg mb-4">
                    <MapPin className="mr-4 h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <span>Rua Niterói, 230 - Cristo Redentor<br />Ribeirão Preto - SP, 14061-000</span>
                  </div>
                  <div className="flex items-center text-muted-foreground text-lg">
                    <Church className="mr-4 h-6 w-6 text-primary flex-shrink-0" />
                    <span>Junte-se a nós para uma experiência de fé e comunidade.</span>
                  </div>
                </div>
             </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
