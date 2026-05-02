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
    title: "Batismo nas Águas",
    questions: [
      {
        id: 1,
        question: "O que é o batismo? É o primeiro passo que a pessoa que recebeu a Cristo tem que dar em sua nova vida.",
        bibleRef: {
          reference: "Marcos 16:16; Atos 2:38",
          text: "Quem crer e for batizado será salvo, mas quem não crer será condenado. (Marcos 16:16)"
        }
      },
      {
        id: 2,
        question: "Quem deve ser batizado nas águas?",
        bibleRef: {
          reference: "Marcos 16:15-16",
          text: "Ide por todo o mundo, e pregai o evangelho a toda criatura. Quem crer e for batizado será salvo, mas quem não crer será condenado."
        }
      },
      {
        id: 3,
        question: "Por que devemos ser batizados?",
        bibleRef: {
          reference: "1 Pedro 3:20-21; Romanos 6:3-4; Colossenses 2:12",
          text: "O batismo simboliza que estamos salvos e limpos do pecado, com uma consciência pura. É um testemunho público, sepultamento do velho homem e declaração de vitória."
        }
      },
      {
        id: 4,
        question: "O que simboliza o batismo?",
        bibleRef: {
          reference: "Romanos 6:4; Colossenses 2:12",
          text: "De sorte que fomos sepultados com ele pelo batismo na morte; para que, como Cristo ressuscitou dos mortos pela glória do Pai, assim andemos nós também em novidade de vida."
        }
      },
      {
        id: 5,
        question: "Quando devemos ser batizados?",
        bibleRef: {
          reference: "Atos 22:16; Atos 17:30; 2 Coríntios 6:2",
          text: "E agora por que te deténs? Levanta-te e batiza-te... (Atos 22:16)"
        }
      },
      {
        id: 6,
        question: "Qual a nova identidade que recebemos ao ser batizados?",
        bibleRef: {
          reference: "Gálatas 3:27-28",
          text: "Porque todos quantos fostes batizados em Cristo já vos revestistes de Cristo. Nisto não há judeu nem grego; não há servo nem livre; não há macho nem fêmea; porque todos vós sois um em Cristo Jesus."
        }
      },
      {
        id: 7,
        question: "Dê alguns exemplos de batismo da Bíblia",
        bibleRef: {
          reference: "Atos 2:37-41; Atos 8:35-38; Atos 9:17-18",
          text: "O dia do Pentecostes (Atos 2:37,38,41), O eunuco Etíope (Atos 8:35-38), Saulo de Tarso (Atos 9:17,18), Os Coríntios (Atos 18:8)"
        }
      }
    ]
  },
  {
    number: 5,
    title: "Batismo no Espírito Santo",
    questions: [
      {
        id: 1,
        question: "Quem é o Espírito Santo?",
        bibleRef: {
          reference: "João 16:13-14; 1 Coríntios 2:9-11",
          text: "O Espírito Santo é uma pessoa, não uma mera influência ou poder. (João 16:13,14). Ele possui inteligência, sentimentos e vontade."
        }
      },
      {
        id: 2,
        question: "O que é batismo no Espírito Santo?",
        bibleRef: {
          reference: "Atos 2:38-39; Atos 1:4-5",
          text: "É uma experiência distinta do arrependimento, da conversão e batismo na água. É uma promessa e mandamento. (Atos 1:4-5)"
        }
      },
      {
        id: 3,
        question: "Por que Cristo quer nos batizar no Espírito Santo?",
        bibleRef: {
          reference: "Atos 1:8",
          text: "Mas recebereis poder, ao descer sobre vós o Espírito Santo, e sereis minhas testemunhas, tanto em Jerusalém como em toda a Judéia e Samaria, e até os confins da terra."
        }
      },
      {
        id: 4,
        question: "Que poder Deus nos concede através do batismo no Espírito Santo?",
        bibleRef: {
          reference: "Romanos 8:3-4; Filipenses 4:13; 2 Coríntios 3:18",
          text: "Poder para fazermos toda a vontade de Deus. Poder para orar, amar, louvar, perdoar, suportar, obedecer a Deus. Poder para sermos transformados à imagem de Cristo."
        }
      },
      {
        id: 5,
        question: "Como receber o batismo no Espírito Santo?",
        bibleRef: {
          reference: "Atos 2:38-39; João 7:37-39; Lucas 11:9-13",
          text: "Precisamos de fé; crer que a promessa é para todos nós; ouvir com fé; receber com fé; deixar fluir os rios com fé."
        }
      },
      {
        id: 6,
        question: "O que é falar em línguas?",
        bibleRef: {
          reference: "Atos 2:4; 1 Coríntios 14:2,4",
          text: "Todos ficaram cheios do Espírito e passaram falar em outras línguas. (Atos 2:4)\nÉ uma consequência e evidência do batismo no Espírito Santo."
        }
      }
    ]
  },
  {
    number: 6,
    title: "Ceia do Senhor",
    questions: [
      {
        id: 1,
        question: "Quem instituiu a Santa Ceia, e em que dia?",
        bibleRef: {
          reference: "1 Coríntios 11:23-26",
          text: "O Senhor Jesus, na noite em que foi traído, tomou o pão; e tendo dado graças, o partiu e disse; isto é o meu corpo, que é dado por vós; fazei isto em memória de mim."
        }
      },
      {
        id: 2,
        question: "Qual o motivo da Ceia do Senhor?",
        bibleRef: {
          reference: "1 Coríntios 11:24-25",
          text: "Fazei isto em memória de mim. Porque todas as vezes que comerdes este pão e beberdes o cálice, anunciais a morte do Senhor, até que Ele venha."
        }
      },
      {
        id: 3,
        question: "Quais os elementos principais da Ceia?",
        bibleRef: {
          reference: "1 Coríntios 11:23-25",
          text: "Tomou o pão... tomou também o cálice. O pão representa o corpo de Cristo e o vinho (cálice) representa a nova aliança no sangue de Cristo."
        }
      },
      {
        id: 4,
        question: "O que significa o pão? O que significa o vinho?",
        bibleRef: {
          reference: "1 Coríntios 11:24-25",
          text: "Isto é o meu corpo, que é dado por vós. (O Pão)\nEste cálice é a nova aliança no meu sangue. (O Vinho)"
        }
      },
      {
        id: 5,
        question: "Quais são os outros títulos dados a esta ordenação?",
        bibleRef: {
          reference: "1 Coríntios 10:16,21",
          text: "A Mesa do Senhor (1 Co 10:21) e A Comunhão (1 Co 10:16)"
        }
      },
      {
        id: 6,
        question: "Com que atitude devemos chegar à mesa do Senhor?",
        bibleRef: {
          reference: "Lucas 22:14-15; Hebreus 11:6; 1 Coríntios 11:24-25",
          text: "Com desejo de participar (Lucas 22:14,15), em fé crendo (Hebreus 11:6), lembrando – memorial (1 Co 11:24-25)"
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
