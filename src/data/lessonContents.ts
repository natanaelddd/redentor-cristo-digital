export interface LessonSection {
  title?: string;
  content: string;
}

export interface LessonContent {
  number: number;
  title: string;
  sections: LessonSection[];
}

export const lessonContents: LessonContent[] = [
  {
    number: 1,
    title: "Certeza da Salvação",
    sections: [
      {
        title: "Introdução",
        content: "A maior necessidade do ser humano é a salvação da sua alma. Vivemos num mundo cheio de pecado e maldade, e somente Deus pode nos dar a verdadeira salvação. Mas como podemos ter certeza de que somos salvos? A Bíblia nos dá essa resposta com toda clareza."
      },
      {
        title: "1 – O que é Salvação?",
        content: "Salvação é o ato de Deus pelo qual Ele livra o homem da condenação eterna do pecado. \"Porque o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna, por Cristo Jesus, nosso Senhor.\" (Romanos 6:23). Todos pecaram (Romanos 3:23), e por isso todos precisam de salvação."
      },
      {
        title: "2 – Como recebemos a Salvação?",
        content: "A salvação é recebida pela fé em Jesus Cristo. \"Crê no Senhor Jesus Cristo e serás salvo\" (Atos 16:31). Não é pelas obras: \"Porque pela graça sois salvos, por meio da fé; e isso não vem de vós; é dom de Deus. Não vem das obras, para que ninguém se glorie.\" (Efésios 2:8-9). É necessário:\n\na) Reconhecer que é pecador (Romanos 3:23)\nb) Arrepender-se dos pecados (Atos 3:19)\nc) Confessar a Jesus como Senhor (Romanos 10:9-10)\nd) Crer de todo coração (João 3:16)"
      },
      {
        title: "3 – Podemos ter certeza da Salvação?",
        content: "Sim! A Bíblia afirma: \"Estas coisas vos escrevi, para que saibais que tendes a vida eterna e para que creiais no nome do Filho de Deus.\" (1 João 5:13). Jesus disse: \"Na verdade, na verdade vos digo que quem ouve a minha palavra e crê naquele que me enviou tem a vida eterna e não entrará em condenação, mas passou da morte para a vida.\" (João 5:24)"
      },
      {
        title: "4 – O que acontece quando somos salvos?",
        content: "a) Somos feitos nova criatura: \"Se alguém está em Cristo, nova criatura é\" (2 Coríntios 5:17)\nb) Recebemos o Espírito Santo: \"O Espírito testifica com o nosso espírito que somos filhos de Deus\" (Romanos 8:16)\nc) Temos paz com Deus: \"Justificados pela fé, temos paz com Deus\" (Romanos 5:1)\nd) Nosso nome é escrito no Livro da Vida (Apocalipse 3:5)"
      },
      {
        title: "5 – Se o crente pecar, perde a salvação?",
        content: "Não. A salvação é eterna. Porém, quando pecamos, perdemos a comunhão com Deus. Devemos confessar nossos pecados: \"Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar de toda injustiça.\" (1 João 1:9). Jesus disse: \"As minhas ovelhas ouvem a minha voz, e eu conheço-as, e elas me seguem; e dou-lhes a vida eterna, e nunca hão de perecer, e ninguém as arrebatará da minha mão.\" (João 10:27-28)"
      },
      {
        title: "Conclusão",
        content: "A salvação é um dom de Deus, recebido pela fé. Podemos ter plena certeza dela, pois a Palavra de Deus é verdadeira e suas promessas são fiéis. Se você já entregou sua vida a Jesus, alegre-se! Você tem a vida eterna."
      }
    ]
  },
  {
    number: 2,
    title: "A Bíblia – Palavra de Deus",
    sections: [
      {
        title: "Introdução",
        content: "A Bíblia é o livro mais lido, mais traduzido e mais distribuído em todo o mundo. Ela é a Palavra de Deus escrita para nós. Através dela conhecemos a Deus, Seus planos e Sua vontade para as nossas vidas."
      },
      {
        title: "1 – A inspiração da Bíblia",
        content: "A Bíblia foi escrita por aproximadamente 40 homens, num período de 1600 anos. Porém, o verdadeiro autor é Deus: \"Toda Escritura é divinamente inspirada\" (2 Timóteo 3:16). \"Homens santos de Deus falaram inspirados pelo Espírito Santo\" (2 Pedro 1:21). Apesar de ter sido escrita por muitos autores diferentes, em épocas diferentes, a Bíblia não se contradiz."
      },
      {
        title: "2 – As divisões da Bíblia",
        content: "A Bíblia divide-se em duas partes:\n\na) Antigo Testamento – 39 livros (de Gênesis a Malaquias)\n- Lei (Pentateuco): 5 livros\n- Históricos: 12 livros\n- Poéticos: 5 livros\n- Profetas Maiores: 5 livros\n- Profetas Menores: 12 livros\n\nb) Novo Testamento – 27 livros (de Mateus a Apocalipse)\n- Evangelhos: 4 livros\n- Histórico: 1 livro (Atos)\n- Epístolas Paulinas: 13 cartas\n- Epístolas Gerais: 8 cartas\n- Profético: 1 livro (Apocalipse)\n\nTotal: 66 livros"
      },
      {
        title: "3 – O assunto principal da Bíblia",
        content: "O assunto principal da Bíblia é Jesus Cristo. Ele disse: \"Examinais as Escrituras, porque vós cuidais ter nelas a vida eterna, e são elas que de mim testificam\" (João 5:39). No Antigo Testamento, Jesus é profetizado; no Novo Testamento, Ele é revelado."
      },
      {
        title: "4 – Para que serve a Bíblia?",
        content: "a) Para ensinar o caminho da salvação (2 Timóteo 3:15)\nb) Para guiar nossa vida: \"Lâmpada para os meus pés é a tua palavra\" (Salmos 119:105)\nc) Para nos alimentar espiritualmente (1 Pedro 2:2)\nd) Para nos corrigir e instruir (2 Timóteo 3:16)\ne) Para fortalecer nossa fé (Romanos 10:17)"
      },
      {
        title: "5 – A permanência da Bíblia",
        content: "A Bíblia é eterna e imutável: \"O céu e a terra passarão, mas as minhas palavras não hão de passar\" (Mateus 24:35). Ninguém pode alterar a Palavra de Deus (Apocalipse 22:18-19)."
      },
      {
        title: "Conclusão",
        content: "A Bíblia é a Palavra de Deus inspirada, completa e suficiente. Devemos lê-la, estudá-la e praticá-la diariamente. Ela é nosso manual de vida e fé."
      }
    ]
  },
  {
    number: 3,
    title: "A Oração",
    sections: [
      {
        title: "Introdução",
        content: "Oração é conversar com Deus. É o meio pelo qual nos comunicamos com nosso Pai Celestial. A oração é essencial na vida do crente, pois é através dela que mantemos comunhão com Deus."
      },
      {
        title: "1 – O que é orar?",
        content: "Orar é falar com Deus. É abrir o coração diante dEle: \"Não estejais inquietos por coisa alguma; antes, as vossas petições sejam em tudo conhecidas diante de Deus, pela oração e súplicas, com ação de graças\" (Filipenses 4:6). Oração não é repetição de palavras vãs (Mateus 6:7), mas uma conversa sincera com o Pai."
      },
      {
        title: "2 – Tipos de oração",
        content: "a) Adoração – Louvar a Deus por quem Ele é\nb) Ação de graças – Agradecer pelo que Ele faz\nc) Confissão – Reconhecer nossos pecados\nd) Súplica – Pedir por nossas necessidades\ne) Intercessão – Orar pelos outros (1 Timóteo 2:1)"
      },
      {
        title: "3 – Em nome de quem devemos orar?",
        content: "Devemos orar em nome de Jesus: \"E tudo quanto pedirdes em meu nome, eu o farei, para que o Pai seja glorificado no Filho\" (João 14:13). Jesus é nosso mediador: \"Há um só Deus e um só mediador entre Deus e os homens, Jesus Cristo\" (1 Timóteo 2:5)."
      },
      {
        title: "4 – O que pode impedir nossas orações?",
        content: "a) Pecados não confessados (Isaías 59:2)\nb) Falta de fé (Tiago 1:6-7)\nc) Motivações erradas (Tiago 4:3)\nd) Desobediência à Palavra de Deus (Provérbios 28:9)\ne) Falta de perdão (Marcos 11:25-26)"
      },
      {
        title: "5 – Quando devemos orar?",
        content: "\"Orai sem cessar\" (1 Tessalonicenses 5:17). Devemos ter uma vida de oração constante. Daniel orava três vezes ao dia (Daniel 6:10). Jesus orava de madrugada (Marcos 1:35). Podemos orar em todo tempo e lugar."
      },
      {
        title: "6 – O modelo de oração",
        content: "Jesus ensinou o \"Pai Nosso\" como modelo (Mateus 6:9-13):\n- \"Pai nosso, que estás nos céus\" – Reconhecimento\n- \"Santificado seja o teu nome\" – Adoração\n- \"Venha o teu reino\" – Submissão\n- \"O pão nosso de cada dia\" – Petição\n- \"Perdoa-nos as nossas dívidas\" – Confissão\n- \"Não nos induzas à tentação\" – Proteção"
      },
      {
        title: "Conclusão",
        content: "A oração é o nosso canal de comunicação com Deus. Devemos orar com fé, em nome de Jesus, com um coração sincero e limpo. Deus ouve e responde as orações dos seus filhos."
      }
    ]
  },
  {
    number: 4,
    title: "A Igreja",
    sections: [
      {
        title: "Introdução",
        content: "A palavra \"Igreja\" vem do grego \"ekklesia\", que significa \"chamados para fora\" ou \"assembleia dos chamados\". A Igreja não é um prédio, mas um povo – o povo de Deus, reunido em torno de Jesus Cristo."
      },
      {
        title: "1 – O que é a Igreja?",
        content: "A Igreja é o corpo de Cristo na terra (1 Coríntios 12:27). É composta por todos aqueles que receberam a Jesus como Salvador e Senhor. A Igreja não é uma organização humana, mas um organismo vivo, formado por Cristo."
      },
      {
        title: "2 – Quem fundou a Igreja?",
        content: "Jesus Cristo é o fundador e fundamento da Igreja: \"Sobre esta pedra edificarei a minha igreja\" (Mateus 16:18). \"Ninguém pode pôr outro fundamento, além do que já está posto, o qual é Jesus Cristo\" (1 Coríntios 3:11)."
      },
      {
        title: "3 – Quem é o cabeça da Igreja?",
        content: "Cristo é o cabeça da Igreja: \"E sujeitou todas as coisas a seus pés e, sobre todas as coisas, o constituiu como cabeça da igreja, que é o seu corpo\" (Efésios 1:22-23). Nenhum homem é cabeça da Igreja universal."
      },
      {
        title: "4 – A missão da Igreja",
        content: "a) Evangelizar: \"Ide por todo o mundo, pregai o evangelho a toda criatura\" (Marcos 16:15)\nb) Fazer discípulos: \"Ensinai todas as nações\" (Mateus 28:19-20)\nc) Adorar a Deus (João 4:23-24)\nd) Edificar os santos (Efésios 4:11-12)\ne) Servir ao próximo (Gálatas 6:10)"
      },
      {
        title: "5 – Por que devemos congregar?",
        content: "\"Não deixando a nossa congregação, como é costume de alguns\" (Hebreus 10:25). Devemos congregar para:\n- Adorar juntos\n- Ouvir a Palavra\n- Ter comunhão uns com os outros\n- Ser edificados e fortalecidos\n- Participar das ordenanças (Batismo e Ceia)"
      },
      {
        title: "Conclusão",
        content: "A Igreja é o corpo de Cristo. Todo crente deve fazer parte de uma igreja local, congregando fielmente, servindo e sendo edificado na fé."
      }
    ]
  },
  {
    number: 5,
    title: "O Batismo",
    sections: [
      {
        title: "Introdução",
        content: "O batismo é uma das ordenanças de Cristo para a Sua Igreja. É um ato de obediência e testemunho público da fé em Jesus Cristo. Não é um sacramento que salva, mas uma demonstração exterior de uma transformação interior."
      },
      {
        title: "1 – O que é o batismo?",
        content: "Batismo significa \"imersão\" ou \"mergulho\". É o ato de ser mergulhado nas águas, simbolizando a morte, sepultamento e ressurreição com Cristo: \"Fomos sepultados com ele pelo batismo na morte; para que, como Cristo ressuscitou dos mortos pela glória do Pai, assim andemos nós também em novidade de vida\" (Romanos 6:4)."
      },
      {
        title: "2 – O batismo salva?",
        content: "Não. A salvação é pela graça, mediante a fé (Efésios 2:8-9). O batismo é um ato de obediência após a salvação. O ladrão na cruz foi salvo sem ser batizado (Lucas 23:43). O batismo é o primeiro passo de obediência do novo convertido."
      },
      {
        title: "3 – Quem pode ser batizado?",
        content: "Somente aqueles que creram em Jesus Cristo. \"Quem crer e for batizado será salvo\" (Marcos 16:16). Filipe disse ao eunuco: \"É lícito, se crês de todo o coração\" (Atos 8:37). O batismo é para quem já é salvo pela fé, não para bebês ou crianças que ainda não podem exercer fé pessoal."
      },
      {
        title: "4 – Em nome de quem somos batizados?",
        content: "\"Em nome do Pai, e do Filho, e do Espírito Santo\" (Mateus 28:19). Isso mostra a doutrina da Trindade: um só Deus em três pessoas."
      },
      {
        title: "5 – A forma do batismo",
        content: "O batismo bíblico é por imersão: \"Desceram ambos à água, tanto Filipe como o eunuco, e o batizou\" (Atos 8:38). A palavra grega \"baptizo\" significa mergulhar, imergir. Aspersão ou derramamento não representam o significado bíblico de morte, sepultamento e ressurreição."
      },
      {
        title: "Conclusão",
        content: "O batismo é uma ordenança de Cristo, não um sacramento. É um ato de obediência e testemunho público. Deve ser por imersão, em nome do Pai, do Filho e do Espírito Santo, e somente para quem já creu em Jesus como Salvador."
      }
    ]
  },
  {
    number: 6,
    title: "A Ceia do Senhor",
    sections: [
      {
        title: "Introdução",
        content: "A Ceia do Senhor é a segunda ordenança deixada por Cristo à Sua Igreja. Foi instituída na noite em que Jesus foi traído, como um memorial do Seu sacrifício na cruz."
      },
      {
        title: "1 – Quem instituiu a Ceia?",
        content: "Jesus Cristo instituiu a Ceia na noite em que foi traído: \"O Senhor Jesus, na noite em que foi traído, tomou o pão; e, tendo dado graças, o partiu\" (1 Coríntios 11:23-24)."
      },
      {
        title: "2 – O que o pão e o vinho representam?",
        content: "O pão representa o corpo de Cristo, partido por nós na cruz: \"Isto é o meu corpo que é partido por vós\" (1 Coríntios 11:24). O vinho (cálice) representa o sangue de Cristo, derramado para remissão dos nossos pecados: \"Este cálice é o Novo Testamento no meu sangue\" (1 Coríntios 11:25). São símbolos, não se transformam literalmente no corpo e sangue de Cristo."
      },
      {
        title: "3 – Quem pode participar da Ceia?",
        content: "Somente os crentes batizados e em comunhão com Deus e com a Igreja. \"Examine-se, pois, o homem a si mesmo, e, assim, coma deste pão, e beba deste cálice\" (1 Coríntios 11:28)."
      },
      {
        title: "4 – O que devemos fazer antes de participar?",
        content: "Devemos nos examinar: \"Qualquer que comer este pão ou beber o cálice do Senhor, indignamente, será culpado do corpo e do sangue do Senhor\" (1 Coríntios 11:27). Isso significa confessar pecados, perdoar ofensas, e estar em paz com os irmãos antes de participar."
      },
      {
        title: "5 – A Ceia é sacramento ou ordenança?",
        content: "É uma ordenança, não um sacramento. Ordenança é algo que Jesus ordenou que fizéssemos: \"Fazei isto em memória de mim\" (Lucas 22:19). Não é um meio de graça salvadora, mas um ato de obediência e memorial. A Ceia aponta para trás (a cruz) e para frente (a volta de Cristo): \"Todas as vezes que comerdes este pão e beberdes este cálice, anunciais a morte do Senhor, até que venha\" (1 Coríntios 11:26)."
      },
      {
        title: "Conclusão",
        content: "A Ceia do Senhor é um memorial do sacrifício de Cristo. Devemos participar dela com reverência, examinando nosso coração, em memória do que Jesus fez por nós na cruz."
      }
    ]
  },
  {
    number: 7,
    title: "O Corpo de Cristo",
    sections: [
      {
        title: "Introdução",
        content: "A Bíblia usa a figura do corpo humano para descrever a Igreja. Assim como um corpo tem muitos membros e cada um tem uma função, assim é a Igreja de Cristo."
      },
      {
        title: "1 – O que é o corpo de Cristo?",
        content: "O corpo de Cristo é a Igreja, representada aqui na terra: \"Vós sois o corpo de Cristo e seus membros em particular\" (1 Coríntios 12:27). Cristo é a cabeça e nós somos os membros."
      },
      {
        title: "2 – A Igreja Universal",
        content: "A Igreja Universal (invisível) é o corpo de Cristo no mundo, composta por todos os salvos de todos os tempos e lugares: \"Há um só corpo e um só Espírito\" (Efésios 4:4)."
      },
      {
        title: "3 – A Igreja Local",
        content: "A Igreja Local é onde congregamos, onde temos comunhão uns com os outros. É o corpo de Cristo reunido em um lugar específico para adorar, aprender, servir e ter comunhão (Atos 2:46-47)."
      },
      {
        title: "4 – A importância de congregar",
        content: "É ter lugar para reunir, participar da Ceia, para disciplina, para oração, ouvir a Palavra, para ofertar, para ministrar uns nos outros e receber ministração. \"Não deixando a nossa congregação\" (Hebreus 10:25)."
      },
      {
        title: "As desculpas mais comuns",
        content: "a) \"Nós podemos ter de Deus o mesmo tanto a sós em nosso quarto quanto na congregação local.\"\nb) \"O que importa não é onde nos encontramos com Deus, mas como encontramos.\"\nc) \"Nossa família é tão ocupada com tantas atividades que não há tempo suficiente na semana para irmos à Igreja.\"\nd) \"Envolver com pessoas traz muitas decepções, é melhor estar sozinho com Deus, Ele me entende melhor.\""
      },
      {
        title: "Conclusão",
        content: "É claro na Palavra de Deus a instrução para congregarmos. Porque somos membros do Corpo de Cristo. Fazemos parte de uma Igreja Universal, agregados em uma Igreja Local, onde devemos cumprir as ordenanças Bíblicas e servir uns aos outros. Não existem desculpas para não congregar. Por mais espiritual que pareça esta desculpa, ela está fora da palavra de Deus."
      }
    ]
  },
  {
    number: 8,
    title: "Mordomos de Deus",
    sections: [
      {
        title: "Introdução",
        content: "A Bíblia diz: \"Senhor, ... teu é tudo quanto há nos céus e na terra\" (1 Crônicas 29:11). Deus é dono de todas as coisas e nós somos como um encarregado (mordomos) duma fazenda. O encarregado tem que administrar ou usar os bens da fazenda. Porém, a fazenda pertence a Deus. Outra vez a Bíblia diz: \"Tudo vem de Ti, e das Tuas mãos to damos.\" (1 Crônicas 29:14). Ser mordomos de Deus significa que todas as coisas pertecem a Ele e não a nós."
      },
      {
        title: "1 – Definição do que é mordomia cristã",
        content: "É a prática de se dar, sistematicamente e proporcionalmente, do tempo, habilidade e possessões materiais, baseada na convicção de que estes nos são confiados por Deus para serem usados no Seu serviço em benefício do Seu Reino. É uma Sociedade divino-humana com Deus como sócio principal; É um modo de viver; é o reconhecimento de Deus como possuidor de nossa pessoa, nossos poderes, e nossa possessões, é o uso fiel desses para a promoção do Reino de Cristo neste mundo."
      },
      {
        title: "2 – O que nos foi entregue para ser usados no serviço do Reino de Deus?",
        content: "Deus é o doador, possuidor, o dono, o galardoador. O homem é o recebedor, mordomo, responsável, presta contas, pode usar (mas não abusar, porque pode perder), é recompensado. Nesta relação de dono e mordomo nos foram entregues as seguintes coisas:\n\na) VIDA – \"...porque Ele mesmo é quem dá a todos a vida, a respiração, e todas as coisas\" (Atos 17:25)\nb) TEMPO – O que nos foi outorgado (Provérbios 24:30-34; Salmo 90:12)\nc) TALENTOS – O que foi dado para usar (Mateus 25:14-30)\nd) POSSESSÕES – O que nos é confiado (Mateus 6:19-21)\ne) FINANÇAS – O que ganhamos com nosso trabalho (1 Coríntios 16:1,2)"
      },
      {
        title: "3 – O que a Bíblia ensina sobre dízimos e ofertas?",
        content: "Baseado no princípio de que Deus é Dono de todas as coisas, e que somos mordomos que devem prestar contas de tudo que Ele nos tem dado, queremos considerar o que devemos fazer com que Deus nos dá.\n\na) DÍZIMOS – É a décima parte de sua renda. Tanto no Velho Testamento como o Novo Testamento confirmam a verdade que os Crentes devem dar o dízimo.\n\n  a.1) O dízimo antes da Lei – Abraão deu o dízimo sob aliança (Gênesis 14:18-20). Jacó promete dar o dízimo de tudo (Gênesis 28:22).\n  b.2) O dízimo sob a Lei – A Nação de Israel sob aliança mosaica pagava o dízimo (Levítico 27:30-33; Números 18:20-32).\n  c.3) O dízimo sob a Graça – Jesus confirmou o dízimo. O dízimo não era da Lei, mas antes da Lei (Mateus 23:23; Lucas 11:42; Hebreus 7:1-21)."
      },
      {
        title: "4 – Não pagar o dízimo e ofertas é estar roubando a Deus",
        content: "\"Roubará o homem a Deus? Todavia vós me roubais, e dizeis: Em que de roubamos? Nos dízimos e nas ofertas alçadas. Com maldição sois amaldiçoados, porque me roubais, vós, a nação toda. Trazei todos os dízimos à casa do tesouro, para que haja mantimento em minha casa, e depois fazei prova de mim, diz o Senhor dos Exércitos, se eu não vos abrir as janelas dos céus, e derramar sobre vós uma bênção tal, que dela vos advenha a maior abastança.\" (Malaquias 3:8-10)\n\nO dízimo não é seu para dar; já pertence a Deus. Se a pessoa retém em sua mão o dízimo, ela está roubando de Deus. A pessoa que só paga o dízimo, e não dá ofertas, não está dando nada a Deus.\n\nNão é você que decide o que fazer com seu dízimo, ele é dado na \"casa do Tesouro\", onde o povo de Deus é alimentado pela Palavra. A Administração dos dízimos é de responsabilidade dos Pastores/Presbíteros que dirigem a Igreja Local."
      },
      {
        title: "5 – Quais são alguns dos princípios em dar?",
        content: "a) Dar-nos primeiramente ao Senhor (II Coríntios 8:5)\nb) Dar de boa vontade (II Coríntios 8:3,12)\nc) Dar com alegria (II Coríntios 9:7)\nd) Dar com generosidade, liberalmente (II Coríntios 8:2; 9:13)\ne) Dar proporcionalmente (I Coríntios 9:6; 8:14,15)\nf) Dar regularmente (I Coríntios 16:1,2)\ng) Dar sistematicamente (II Coríntios 9:7) – metodicamente\nh) Dar com amor (II Coríntios 8:24)\ni) Dar com gratidão (II Coríntios 9:11,12)\nj) Dar como ministração ao Senhor e Seus santos (II Coríntios 9:12,13)"
      },
      {
        title: "Conclusão",
        content: "Como mordomos de Deus, vamos prestar conta de tudo o que for entregue em nossas mãos. Como Fiel Servo do Senhor, vamos trazer nossas ofertas e pagar nosso dízimo conforme ensina a Palavra de Deus. Sabendo que a promessa de Deus vai se cumprir em nossas vidas. Porque Ele mesmo diz: \"Provai-Me se Eu não vos abrir as janelas do céu, e não derramar sobre vós bênção sem medida.\""
      }
    ]
  }
];
