
-- Habilita a extensão para usar gen_random_uuid() se ainda não estiver habilitada
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

-- Tabela para os slides do banner principal (Hero Section)
CREATE TABLE public.hero_slides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    button_text TEXT NOT NULL,
    "order" INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela para blocos de conteúdo gerais do site
CREATE TABLE public.site_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_key TEXT UNIQUE NOT NULL, -- Ex: 'about_us_heading', 'logo_url'
    content_value TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela para os links de navegação
CREATE TABLE public.navigation_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    href TEXT NOT NULL,
    "order" INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela para os eventos e cultos
CREATE TABLE public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    day_of_week TEXT,
    time TEXT,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    "order" INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Inserir os dados atuais do site nas novas tabelas

-- Dados para Hero Slides
INSERT INTO public.hero_slides (category, title, description, button_text, "order")
VALUES
('O QUE ESTÁ ACONTECENDO', 'CULTOS DE CELEBRAÇÃO', 'Participe dos nossos cultos de domingo. Um tempo de louvor, adoração e uma palavra que vai abençoar sua vida.', 'VER HORÁRIOS', 1),
('EVENTO ESPECIAL', 'NOITE DE LOUVOR E ADORAÇÃO', 'Uma noite especial para nos unirmos em louvor e adoração. Traga sua família e amigos.', 'SAIBA MAIS', 2),
('NOSSA COMUNIDADE', 'PROJETO ALCANCE', 'Participe do nosso projeto de serviço comunitário e faça a diferença na vida das pessoas.', 'SEJA VOLUNTÁRIO', 3);

-- Dados para Conteúdo do Site (Sobre, Contato, Rodapé, etc.)
INSERT INTO public.site_content (section_key, content_value)
VALUES
('logo_url', '/lovable-uploads/510dc53b-a62d-4953-9368-b33e0abc2d6d.png'),
('about_us_heading', 'Sobre Nós'),
('about_us_p1', 'A Igreja Missionária Cristo Redentor é uma comunidade de fé localizada no bairro Cristo Redentor em Ribeirão Preto - SP.'),
('about_us_p2', 'Nossa missão é compartilhar o amor de Cristo e servir à nossa comunidade com compaixão e dedicação. Junte-se a nós em nossos cultos e eventos.'),
('about_us_image', '/lovable-uploads/326e9cbc-61c9-469a-a8fe-76d7ead588bd.png'),
('sunday_services_title', 'Sunday Services'),
('sunday_services_time_1', '9am'),
('sunday_services_time_2', '11am'),
('sunday_services_time_3', '5pm'),
('watch_online_text', 'Watch Online'),
('watch_online_link', '#'),
('contact_heading', 'Localização'),
('contact_visit_us_heading', 'Venha nos visitar'),
('contact_address', 'Rua Niterói, 230 - Cristo Redentor<br />Ribeirão Preto - SP, 14061-000'),
('contact_invitation', 'Junte-se a nós para uma experiência de fé e comunidade.'),
('footer_logo_text', 'Igreja Missionária Cristo Redentor'),
('footer_about_text', 'Um lugar de fé, esperança e amor no coração de Ribeirão Preto.'),
('footer_instagram_url', 'https://www.instagram.com/igrejamissionariacr/'),
('footer_facebook_url', 'https://www.facebook.com/rede.adolescentes/');

-- Dados para Links de Navegação
INSERT INTO public.navigation_links (title, href, "order", is_active)
VALUES
('Início', '#', 1, true),
('Sobre Nós', '#sobre', 2, true),
('Nossos Cultos', '#eventos', 3, true),
('Contato', '#contato', 4, true);

