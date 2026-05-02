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
    title: "Salvação",
    questions: [
      {
        id: 1,
        question: "Em que estado o homem se encontra? Explique",
        bibleRef: {
          reference: "Efésios 2:1; Romanos 3:23",
          text: "Ele vos vivificou, estando vós mortos nos vossos delitos e pecados. (Efésios 2:1)\nPorque todos pecaram e destituídos estão da glória de Deus. (Romanos 3:23)"
        }
      },
      {
        id: 2,
        question: "Pode o homem sair desse estado? De que maneira?",
        bibleRef: {
          reference: "Atos 3:19; Atos 16:31",
          text: "Arrependei-vos, pois, e convertei-vos, para que sejam apagados os vossos pecados. (Atos 3:19)\nCreia no Senhor Jesus e você será salvo. Você e a sua família. (Atos 16:31)"
        }
      },
      {
        id: 3,
        question: "Posso alcançar a salvação através de boas obras? Explique",
        bibleRef: {
          reference: "Efésios 2:8-9; João 3:16",
          text: "Porque pela graça sois salvos, por meio da fé; e isso não vem de vós; é dom de Deus. Não vem das obras, para que ninguém se glorie. (Efésios 2:8-9)"
        }
      },
      {
        id: 4,
        question: "Existe alguma pré-condição para que o homem possa ser salvo? Explique",
        bibleRef: {
          reference: "Atos 3:19; Atos 16:31",
          text: "Arrependei-vos, pois, e convertei-vos, para que sejam apagados os vossos pecados. (Atos 3:19)\nCreia no Senhor Jesus e você será salvo. (Atos 16:31)"
        }
      },
      {
        id: 5,
        question: "O que é a vida eterna?",
        bibleRef: {
          reference: "1 João 5:11-13",
          text: "E o testemunho é este: que Deus nos deu a vida eterna; e esta vida está no seu Filho. Aquele que tem o Filho tem a vida; aquele que não tem o Filho de Deus não tem a vida."
        }
      },
      {
        id: 6,
        question: "O que é um novo nascimento?",
        bibleRef: {
          reference: "João 3:1-5; 2 Coríntios 5:17",
          text: "Na verdade, na verdade, te digo que aquele que não nascer da água e do espírito, não pode entrar no Reino de Deus. (João 3:5)\nSe alguém está em Cristo, nova criatura é. (2 Coríntios 5:17)"
        }
      }
    ]
  },
  {
    number: 2,
    title: "Arrependimento",
    questions: [
      {
        id: 1,
        question: "Defina com suas próprias palavras o que é arrependimento.",
        bibleRef: {
          reference: "Marcos 1:15",
          text: "O tempo está cumprido, e o reino de Deus está próximo. Arrependei-vos e crede no evangelho."
        }
      },
      {
        id: 2,
        question: "O arrependimento implica em uma real mudança de atitude? Explique. Dê um exemplo.",
        bibleRef: {
          reference: "Efésios 2:3; Colossenses 1:21",
          text: "Entre os quais todos nós também antes andávamos nos desejos da nossa carne, fazendo a vontade da carne e dos pensamentos. (Efésios 2:3)"
        }
      },
      {
        id: 3,
        question: "Quais os frutos do arrependimento?",
        bibleRef: {
          reference: "Mateus 3:8",
          text: "Produzi, pois, frutos dignos de arrependimento."
        }
      },
      {
        id: 4,
        question: "Quais são as provas de um verdadeiro arrependimento?",
        bibleRef: {
          reference: "Atos 2:37; Salmo 32:1-5; Provérbios 28:13",
          text: "Ouvindo eles isto, compungiram-se em seu coração. (Atos 2:37)\nO que encobre as suas transgressões nunca prosperará; mas o que as confessa e deixa alcançará misericórdia. (Provérbios 28:13)"
        }
      },
      {
        id: 5,
        question: "Você se arrepende por ter sido surpreendido em pecado ou por que sabe que é pecado? Explique",
        bibleRef: {
          reference: "2 Coríntios 7:10",
          text: "Porque a tristeza segundo Deus opera arrependimento para a salvação, da qual ninguém se arrepende; mas a tristeza do mundo opera a morte."
        }
      },
      {
        id: 6,
        question: "Apenas confessar o pecado é suficiente? Explique",
        bibleRef: {
          reference: "Provérbios 28:13; 1 João 1:9",
          text: "O que encobre as suas transgressões nunca prosperará; mas o que as confessa e deixa alcançará misericórdia. (Provérbios 28:13)"
        }
      }
    ]
  },
  {
    number: 3,
    title: "Fé",
    questions: [
      {
        id: 1,
        question: "O que é que a Bíblia ensina para todos?",
        bibleRef: {
          reference: "Atos 20:21",
          text: "...Devem se converter a Deus, arrepender-se e ter fé em nosso Senhor Jesus Cristo."
        }
      },
      {
        id: 2,
        question: "Quais as duas coisas que devem existir naquele que verdadeiramente se converte?",
        bibleRef: {
          reference: "Atos 20:21",
          text: "...Devem se converter a Deus, arrepender-se e ter fé em nosso Senhor Jesus Cristo."
        }
      },
      {
        id: 3,
        question: "Qual é a fonte da verdadeira fé? É a Palavra de Deus.",
        bibleRef: {
          reference: "Romanos 10:17",
          text: "De sorte que a fé é pelo ouvir, e o ouvir pela palavra de Deus."
        }
      },
      {
        id: 4,
        question: "O que desagrada a Deus; a fé sem obra ou a obra sem fé? Explique",
        bibleRef: {
          reference: "Tiago 2:26; Hebreus 11:6",
          text: "Porque, assim como o corpo sem o espírito está morto, assim também a fé sem obras é morta. (Tiago 2:26)"
        }
      },
      {
        id: 5,
        question: "Cite 3 exemplos de fé?",
        bibleRef: {
          reference: "Mateus 6:30; Mateus 8:10; Tiago 2:22",
          text: "Pequena fé (Mateus 6:30)\nGrande fé (Mateus 8:10)\nPerfeita fé (Tiago 2:22)"
        }
      },
      {
        id: 6,
        question: "Através de que adquirimos a fé? Explique",
        bibleRef: {
          reference: "Romanos 10:17",
          text: "De sorte que a fé é pelo ouvir, e o ouvir pela palavra de Deus."
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
