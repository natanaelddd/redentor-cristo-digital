
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ReadingPlan = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  plan_url: string;
};

interface ReadingPlansSectionProps {
  plans?: ReadingPlan[];
}

export const ReadingPlansSection = ({ plans = [] }: ReadingPlansSectionProps) => {
  if (!plans || plans.length === 0) {
    return null;
  }

  return (
    <section id="planos-leitura" className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-heading">
          Planos de Leitura
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card key={plan.id} className="flex flex-col overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
              <CardHeader className="p-0">
                {plan.image_url ? (
                  <img src={plan.image_url} alt={plan.title} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 bg-gray-200 dark:bg-gray-700"></div>
                )}
              </CardHeader>
              <CardContent className="flex-grow p-6">
                <CardTitle className="font-bold text-xl mb-2">{plan.title}</CardTitle>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full">
                  <a href={plan.plan_url} target="_blank" rel="noopener noreferrer">
                    Ver Plano
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
