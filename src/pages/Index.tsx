
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Church } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section
          id="#"
          className="relative h-[60vh] bg-cover bg-center text-white flex items-center justify-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1473177104440-ffee2f376098?q=80&w=2070&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Bem-vindo à Igreja Missionária Cristo Redentor
            </h1>
            <p className="text-lg md:text-2xl">
              Um lugar de fé, esperança e amor.
            </p>
          </div>
        </section>

        {/* About Section */}
        <section id="sobre" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 text-center">
            <Church className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Sobre Nós</h2>
            <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
              A Igreja Missionária Cristo Redentor é uma comunidade de fé localizada no bairro Cristo Redentor em Ribeirão Preto - SP. Nossa missão é compartilhar o amor de Cristo e servir à nossa comunidade com compaixão e dedicação. Junte-se a nós em nossos cultos e eventos.
            </p>
          </div>
        </section>

        {/* Events Section */}
        <section id="eventos" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Nossos Eventos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Culto de Domingo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Todos os Domingos às 19h</span>
                  </div>
                  <p>Um tempo de louvor, adoração e palavra de Deus.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Estudo Bíblico</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Todas as Quartas às 20h</span>
                  </div>
                  <p>Aprofunde seu conhecimento nas escrituras sagradas.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Rede de Jovens</CardTitle>
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
          </div>
        </section>

        {/* Contact/Location Section */}
        <section id="contato" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 text-center">
             <MapPin className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Onde nos encontrar</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Bairro Cristo Redentor, Ribeirão Preto - SP
            </p>
            <Button size="lg" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">Ver no mapa</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
