
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

type SiteContent = {
  id: string;
  section_key: string;
  content_value: string | null;
};

const fetchSiteContent = async (): Promise<SiteContent[]> => {
  const { data, error } = await supabase.from("site_content").select("*");
  if (error) throw new Error(error.message);
  return data || [];
};

export const SiteContentPage = () => {
  const queryClient = useQueryClient();

  const { data: siteContent, isLoading } = useQuery<SiteContent[]>({
    queryKey: ["site_content_admin"],
    queryFn: fetchSiteContent,
  });

  const formSchema = React.useMemo(() => {
    if (!siteContent) return z.object({});
    const shape = siteContent.reduce((acc, item) => {
      acc[item.section_key] = z.string().optional();
      return acc;
    }, {} as Record<string, z.ZodType<any, any>>);
    return z.object(shape);
  }, [siteContent]);

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  React.useEffect(() => {
    if (siteContent) {
      const defaultValues = siteContent.reduce((acc, item) => {
        acc[item.section_key] = item.content_value || "";
        return acc;
      }, {} as Record<string, string>);
      form.reset(defaultValues);
    }
  }, [siteContent, form]);

  const updateMutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const updates = Object.entries(values)
        .filter(([key, value]) => {
          const original = siteContent?.find(item => item.section_key === key);
          return original && original.content_value !== value;
        })
        .map(([key, value]) => ({
          section_key: key,
          content_value: value as string,
        }));
      
      if (updates.length === 0) {
        toast.info("Nenhuma alteração para salvar.");
        return null;
      }

      const { error } = await supabase.from("site_content").upsert(updates, { onConflict: 'section_key' });

      if (error) {
        throw new Error(error.message);
      }
      return updates;
    },
    onSuccess: (data) => {
      if (data) {
        toast.success("Conteúdo do site atualizado com sucesso!");
        queryClient.invalidateQueries({ queryKey: ["site_content_admin"] });
        queryClient.invalidateQueries({ queryKey: ["site_data"] });
      }
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar: ${error.message}`);
    },
  });

  const onSubmit = (values: FormValues) => {
    updateMutation.mutate(values);
  };
  
  const getInputComponent = (key: string) => {
    if (key.includes('_text') || key.includes('description')) {
        return Textarea;
    }
    return Input;
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-9 w-1/2" />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-6">
            {[...Array(5)].map((_, i) => <div key={i} className="space-y-2"><Skeleton className="h-4 w-1/4" /><Skeleton className="h-10 w-full" /></div>)}
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-32" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gerenciar Conteúdo do Site</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Editar Conteúdo</CardTitle>
              <CardDescription>
                Atualize os textos, links e outras informações que aparecem no site.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {siteContent?.sort((a,b) => a.section_key.localeCompare(b.section_key)).map((item) => {
                const InputComponent = getInputComponent(item.section_key);
                return (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name={item.section_key as keyof FormValues}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="capitalize">{item.section_key.replace(/_/g, ' ')}</FormLabel>
                        <FormControl>
                          <InputComponent
                            placeholder={`Valor para ${item.section_key.replace(/_/g, ' ')}`}
                            {...field}
                            value={field.value ?? ""}
                            rows={item.section_key.includes('_text') ? 5 : 1}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              })}
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default SiteContentPage;
