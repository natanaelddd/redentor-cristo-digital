export interface BibleReference {
  reference: string;
  text: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  bibleRef?: BibleReference;
}

export interface QuizLesson {
  number: number;
  title: string;
  questions: QuizQuestion[];
}

export const quizLessons: QuizLesson[] = [
  {
    number: 1,
    title: "Certeza da Salvação",
    questions: [
      {
        id: 1,
        question: "Qual é a condição que Deus requer para recebermos a salvação?",
        bibleRef: {
          reference: "Atos 16:31",
          text: "E eles disseram: Crê no Senhor Jesus Cristo e serás salvo, tu e a tua casa."
        }
      },
      {
        id: 2,
        question: "Quem nos garante a salvação?",
        bibleRef: {
          reference: "1 João 5:11-13",
          text: "E o testemunho é este: que Deus nos deu a vida eterna; e esta vida está no seu Filho. Quem tem o Filho tem a vida; quem não tem o Filho de Deus não tem a vida. Estas coisas vos escrevi, para que saibais que tendes a vida eterna e para que creiais no nome do Filho de Deus."
        }
      },
      {
        id: 3,
        question: "Quando alguém crê no Senhor, o que acontece em sua vida?",
        bibleRef: {
          reference: "2 Coríntios 5:17",
          text: "Assim que, se alguém está em Cristo, nova criatura é: as coisas velhas já passaram; eis que tudo se fez novo."
        }
      },
      {
        id: 4,
        question: "A vida eterna depende das nossas obras?",
        bibleRef: {
          reference: "Efésios 2:8-9",
          text: "Porque pela graça sois salvos, por meio da fé; e isso não vem de vós; é dom de Deus. Não vem das obras, para que ninguém se glorie."
        }
      },
      {
        id: 5,
        question: "O que Jesus disse sobre quem nEle crê?",
        bibleRef: {
          reference: "João 5:24",
          text: "Na verdade, na verdade vos digo que quem ouve a minha palavra e crê naquele que me enviou tem a vida eterna e não entrará em condenação, mas passou da morte para a vida."
        }
      },
      {
        id: 6,
        question: "Se um crente pecar, ele perde a salvação?",
        bibleRef: {
          reference: "1 João 1:9",
          text: "Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar de toda injustiça."
        }
      }
    ]
  },
  {
    number: 2,
    title: "A Bíblia - Palavra de Deus",
    questions: [
      {
        id: 1,
        question: "Quem é o autor da Bíblia?",
        bibleRef: {
          reference: "2 Timóteo 3:16",
          text: "Toda Escritura é divinamente inspirada e proveitosa para ensinar, para redarguir, para corrigir, para instruir em justiça."
        }
      },
      {
        id: 2,
        question: "Em quantas partes se divide a Bíblia?",
        bibleRef: {
          reference: "Lucas 24:44",
          text: "E disse-lhes: São estas as palavras que vos disse estando ainda convosco: convinha que se cumprisse tudo o que de mim estava escrito na Lei de Moisés, e nos Profetas, e nos Salmos."
        }
      },
      {
        id: 3,
        question: "Quantos livros tem o Antigo Testamento e o Novo Testamento?",
        bibleRef: {
          reference: "2 Pedro 1:21",
          text: "Porque a profecia nunca foi produzida por vontade de homem algum, mas os homens santos de Deus falaram inspirados pelo Espírito Santo."
        }
      },
      {
        id: 4,
        question: "Para que serve a Palavra de Deus em nossa vida?",
        bibleRef: {
          reference: "Salmos 119:105",
          text: "Lâmpada para os meus pés é a tua palavra e luz para o meu caminho."
        }
      },
      {
        id: 5,
        question: "A Bíblia pode ser mudada ou alterada?",
        bibleRef: {
          reference: "Mateus 24:35",
          text: "O céu e a terra passarão, mas as minhas palavras não hão de passar."
        }
      },
      {
        id: 6,
        question: "Qual o assunto principal da Bíblia?",
        bibleRef: {
          reference: "João 5:39",
          text: "Examinais as Escrituras, porque vós cuidais ter nelas a vida eterna, e são elas que de mim testificam."
        }
      }
    ]
  },
  {
    number: 3,
    title: "A Oração",
    questions: [
      {
        id: 1,
        question: "O que é orar?",
        bibleRef: {
          reference: "Filipenses 4:6",
          text: "Não estejais inquietos por coisa alguma; antes, as vossas petições sejam em tudo conhecidas diante de Deus, pela oração e súplicas, com ação de graças."
        }
      },
      {
        id: 2,
        question: "Quais são os tipos de oração mencionados na Bíblia?",
        bibleRef: {
          reference: "1 Timóteo 2:1",
          text: "Admoesto-te, pois, antes de tudo, que se façam deprecações, orações, intercessões e ações de graças por todos os homens."
        }
      },
      {
        id: 3,
        question: "Em nome de quem devemos orar?",
        bibleRef: {
          reference: "João 14:13-14",
          text: "E tudo quanto pedirdes em meu nome, eu o farei, para que o Pai seja glorificado no Filho. Se pedirdes alguma coisa em meu nome, eu o farei."
        }
      },
      {
        id: 4,
        question: "O que pode impedir as nossas orações?",
        bibleRef: {
          reference: "Isaías 59:2",
          text: "Mas as vossas iniquidades fazem separação entre vós e o vosso Deus; e os vossos pecados encobrem o seu rosto de vós, para que vos não ouça."
        }
      },
      {
        id: 5,
        question: "Quando devemos orar?",
        bibleRef: {
          reference: "1 Tessalonicenses 5:17",
          text: "Orai sem cessar."
        }
      },
      {
        id: 6,
        question: "Qual é o modelo de oração que Jesus ensinou?",
        bibleRef: {
          reference: "Mateus 6:9-13",
          text: "Portanto, vós orareis assim: Pai nosso, que estás nos céus, santificado seja o teu nome. Venha o teu reino. Seja feita a tua vontade, tanto na terra como no céu. O pão nosso de cada dia dá-nos hoje. Perdoa-nos as nossas dívidas, assim como nós perdoamos aos nossos devedores. E não nos induzas à tentação, mas livra-nos do mal; porque teu é o Reino, e o poder, e a glória, para sempre. Amém!"
        }
      }
    ]
  },
  {
    number: 4,
    title: "A Igreja",
    questions: [
      {
        id: 1,
        question: "O que é a Igreja segundo a Bíblia?",
        bibleRef: {
          reference: "1 Coríntios 12:27",
          text: "Ora, vós sois o corpo de Cristo e seus membros em particular."
        }
      },
      {
        id: 2,
        question: "Quem é o fundamento da Igreja?",
        bibleRef: {
          reference: "1 Coríntios 3:11",
          text: "Porque ninguém pode pôr outro fundamento, além do que já está posto, o qual é Jesus Cristo."
        }
      },
      {
        id: 3,
        question: "Quem é o cabeça da Igreja?",
        bibleRef: {
          reference: "Efésios 1:22-23",
          text: "E sujeitou todas as coisas a seus pés e, sobre todas as coisas, o constituiu como cabeça da igreja, que é o seu corpo, a plenitude daquele que cumpre tudo em todos."
        }
      },
      {
        id: 4,
        question: "Qual a missão da Igreja?",
        bibleRef: {
          reference: "Mateus 28:19-20",
          text: "Portanto, ide, ensinai todas as nações, batizando-as em nome do Pai, e do Filho, e do Espírito Santo; ensinando-as a guardar todas as coisas que eu vos tenho mandado; e eis que eu estou convosco todos os dias, até à consumação dos séculos. Amém!"
        }
      },
      {
        id: 5,
        question: "Por que devemos congregar?",
        bibleRef: {
          reference: "Hebreus 10:25",
          text: "Não deixando a nossa congregação, como é costume de alguns; antes, admoestando-nos uns aos outros; e tanto mais quanto vedes que se vai aproximando aquele Dia."
        }
      }
    ]
  },
  {
    number: 5,
    title: "O Batismo",
    questions: [
      {
        id: 1,
        question: "O que é o batismo?",
        bibleRef: {
          reference: "Romanos 6:4",
          text: "De sorte que fomos sepultados com ele pelo batismo na morte; para que, como Cristo ressuscitou dos mortos pela glória do Pai, assim andemos nós também em novidade de vida."
        }
      },
      {
        id: 2,
        question: "O batismo é necessário para a salvação?",
        bibleRef: {
          reference: "Efésios 2:8-9",
          text: "Porque pela graça sois salvos, por meio da fé; e isso não vem de vós; é dom de Deus. Não vem das obras, para que ninguém se glorie."
        }
      },
      {
        id: 3,
        question: "Quem pode ser batizado?",
        bibleRef: {
          reference: "Atos 8:36-37",
          text: "E, indo eles caminhando, chegaram ao pé de alguma água, e disse o eunuco: Eis aqui água; que impede que eu seja batizado? E disse Filipe: É lícito, se crês de todo o coração. E, respondendo ele, disse: Creio que Jesus Cristo é o Filho de Deus."
        }
      },
      {
        id: 4,
        question: "Em nome de quem somos batizados?",
        bibleRef: {
          reference: "Mateus 28:19",
          text: "Portanto, ide, ensinai todas as nações, batizando-as em nome do Pai, e do Filho, e do Espírito Santo."
        }
      },
      {
        id: 5,
        question: "Qual a forma correta do batismo?",
        bibleRef: {
          reference: "Atos 8:38-39",
          text: "E mandou parar o carro, e desceram ambos à água, tanto Filipe como o eunuco, e o batizou. E, quando saíram da água, o Espírito do Senhor arrebatou a Filipe, e não o viu mais o eunuco; e, jubiloso, continuou o seu caminho."
        }
      }
    ]
  },
  {
    number: 6,
    title: "A Ceia do Senhor",
    questions: [
      {
        id: 1,
        question: "Quem instituiu a Ceia do Senhor?",
        bibleRef: {
          reference: "1 Coríntios 11:23-24",
          text: "Porque eu recebi do Senhor o que também vos ensinei: que o Senhor Jesus, na noite em que foi traído, tomou o pão; e, tendo dado graças, o partiu e disse: Tomai, comei; isto é o meu corpo que é partido por vós; fazei isto em memória de mim."
        }
      },
      {
        id: 2,
        question: "O que o pão e o vinho representam na Ceia?",
        bibleRef: {
          reference: "1 Coríntios 11:24-25",
          text: "E, tendo dado graças, o partiu e disse: Tomai, comei; isto é o meu corpo que é partido por vós; fazei isto em memória de mim. Semelhantemente também, depois de cear, tomou o cálice, dizendo: Este cálice é o Novo Testamento no meu sangue; fazei isto, todas as vezes que beberdes, em memória de mim."
        }
      },
      {
        id: 3,
        question: "Quem pode participar da Ceia do Senhor?",
        bibleRef: {
          reference: "1 Coríntios 11:28",
          text: "Examine-se, pois, o homem a si mesmo, e, assim, coma deste pão, e beba deste cálice."
        }
      },
      {
        id: 4,
        question: "O que devemos fazer antes de participar da Ceia?",
        bibleRef: {
          reference: "1 Coríntios 11:27-29",
          text: "Portanto, qualquer que comer este pão ou beber o cálice do Senhor, indignamente, será culpado do corpo e do sangue do Senhor. Examine-se, pois, o homem a si mesmo, e, assim, coma deste pão, e beba deste cálice. Porque o que come e bebe indignamente come e bebe para sua própria condenação, não discernindo o corpo do Senhor."
        }
      },
      {
        id: 5,
        question: "A Ceia é um sacramento ou uma ordenança?",
        bibleRef: {
          reference: "Lucas 22:19",
          text: "E, tomando o pão, e havendo dado graças, partiu-o e deu-lho, dizendo: Isto é o meu corpo, que por vós é dado; fazei isto em memória de mim."
        }
      }
    ]
  },
  {
    number: 7,
    title: "O Corpo de Cristo",
    questions: [
      {
        id: 1,
        question: "O que é o corpo de Cristo?",
        bibleRef: {
          reference: "Efésios 1:22-23",
          text: "E sujeitou todas as coisas a seus pés e, sobre todas as coisas, o constituiu como cabeça da igreja, que é o seu corpo, a plenitude daquele que cumpre tudo em todos."
        }
      },
      {
        id: 2,
        question: "O que é a Igreja universal?",
        bibleRef: {
          reference: "Efésios 4:4-6",
          text: "Há um só corpo e um só Espírito, como também fostes chamados em uma só esperança da vossa vocação; um só Senhor, uma só fé, um só batismo; um só Deus e Pai de todos, o qual é sobre todos, e por todos, e em todos vós."
        }
      },
      {
        id: 3,
        question: "O que é a Igreja local?",
        bibleRef: {
          reference: "Atos 2:46-47",
          text: "E, perseverando unânimes todos os dias no templo e partindo o pão em casa, comiam juntos com alegria e singeleza de coração, louvando a Deus e caindo na graça de todo o povo. E todos os dias acrescentava o Senhor à igreja aqueles que se haviam de salvar."
        }
      },
      {
        id: 4,
        question: "Qual é a importância de nos reunirmos em uma Igreja local?",
        bibleRef: {
          reference: "Hebreus 10:24-25",
          text: "E consideremo-nos uns aos outros, para nos estimularmos à caridade e às boas obras, não deixando a nossa congregação, como é costume de alguns; antes, admoestando-nos uns aos outros; e tanto mais quanto vedes que se vai aproximando aquele Dia."
        }
      },
      {
        id: 5,
        question: "Cite algumas desculpas comuns para não se ir à Igreja?",
        bibleRef: {
          reference: "Hebreus 10:25",
          text: "Não deixando a nossa congregação, como é costume de alguns; antes, admoestando-nos uns aos outros; e tanto mais quanto vedes que se vai aproximando aquele Dia."
        }
      },
      {
        id: 6,
        question: "Só faremos parte de uma Igreja universal (invisível) agindo de que maneira?",
        bibleRef: {
          reference: "1 Coríntios 12:12-13",
          text: "Porque, assim como o corpo é um e tem muitos membros, e todos os membros, sendo muitos, são um só corpo, assim é Cristo também. Pois todos nós fomos batizados em um Espírito, formando um corpo, quer judeus, quer gregos, quer servos, quer livres, e todos temos bebido de um Espírito."
        }
      }
    ]
  },
  {
    number: 8,
    title: "Mordomos de Deus",
    questions: [
      {
        id: 1,
        question: "O que significa ser mordomo de Deus?",
        bibleRef: {
          reference: "1 Crônicas 29:11-14",
          text: "Tua é, Senhor, a magnificência, e o poder, e a honra, e a vitória, e a majestade; porque teu é tudo quanto há nos céus e na terra; teu é, Senhor, o reino, e tu te exaltaste por cabeça sobre todos. Tudo vem de Ti, e das Tuas mãos to damos."
        }
      },
      {
        id: 2,
        question: "Dê uma definição própria do que é mordomia cristã",
        bibleRef: {
          reference: "1 Pedro 4:10",
          text: "Cada um administre aos outros o dom como o recebeu, como bons despenseiros da multiforme graça de Deus."
        }
      },
      {
        id: 3,
        question: "O que nos foi entregue para ser usado no serviço do Reino de Deus?",
        bibleRef: {
          reference: "Mateus 25:14-30",
          text: "Porque isto é também como um homem que, partindo para fora da terra, chamou os seus servos e entregou-lhes os seus bens. E a um deu cinco talentos, e a outro, dois, e a outro, um, a cada um segundo a sua capacidade, e ausentou-se logo para longe."
        }
      },
      {
        id: 4,
        question: "O que é dízimo?",
        bibleRef: {
          reference: "Malaquias 3:8-10",
          text: "Roubará o homem a Deus? Todavia, vós me roubais e dizeis: Em que te roubamos? Nos dízimos e nas ofertas alçadas. Com maldição sois amaldiçoados, porque me roubais, vós, a nação toda. Trazei todos os dízimos à casa do tesouro, para que haja mantimento em minha casa, e depois fazei prova de mim, diz o Senhor dos Exércitos, se eu não vos abrir as janelas dos céus e não derramar sobre vós uma bênção tal, que dela vos advenha a maior abastança."
        }
      },
      {
        id: 5,
        question: "O que é oferta?",
        bibleRef: {
          reference: "2 Coríntios 9:7",
          text: "Cada um contribua segundo propôs no seu coração, não com tristeza ou por necessidade; porque Deus ama ao que dá com alegria."
        }
      },
      {
        id: 6,
        question: "Em que roubamos o Senhor?",
        bibleRef: {
          reference: "Malaquias 3:8",
          text: "Roubará o homem a Deus? Todavia, vós me roubais e dizeis: Em que te roubamos? Nos dízimos e nas ofertas alçadas."
        }
      },
      {
        id: 7,
        question: "Que espírito é repreendido pelo Senhor quando dizimamos?",
        bibleRef: {
          reference: "Malaquias 3:11",
          text: "E, por causa de vós, repreenderei o devorador, para que não vos consuma o fruto da terra; e a vide no campo não vos será estéril, diz o Senhor dos Exércitos."
        }
      }
    ]
  }
];
