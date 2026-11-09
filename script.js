document.addEventListener('DOMContentLoaded', () => {
  const appShell = document.querySelector('.app-shell');
  const menuToggle = document.querySelector('.menu-toggle');
  const navItems = Array.from(document.querySelectorAll('.nav-item'));
  const pageViews = Array.from(document.querySelectorAll('.page-view'));
  const signupDialog = document.querySelector('#signup-dialog');
  const signupForm = document.querySelector('#signup-form');
  const signupOpenButton = document.querySelector('#signup-open');
  const accountLogoutButton = document.querySelector('#account-logout');
  const signupStatus = document.querySelector('#account-status');
  const signupError = document.querySelector('#signup-error');
  const welcomeScreen = document.querySelector('#welcome-screen');
  const welcomeError = document.querySelector('#welcome-error');
  const registrationForm = document.querySelector('#registration-form');
  const registrationError = document.querySelector('#registration-error');
  const researchForm = document.querySelector('#research-form');
  const assetSelect = document.querySelector('#asset-select');
  const monteCarloButton = document.querySelector('#monte-carlo-button');
  const fisherForm = document.querySelector('#fisher-form');
  const tradingViewContainer = document.querySelector('#tradingview-chart');
  const chartSizeSmaller = document.querySelector('#chart-size-smaller');
  const chartSizeLarger = document.querySelector('#chart-size-larger');
  const chartSizeValue = document.querySelector('#chart-size-value');
  const portfolioForm = document.querySelector('#portfolio-form');
  const portfolioList = document.querySelector('#portfolio-list');
  const portfolioStatus = document.querySelector('#portfolio-status');
  const compoundForm = document.querySelector('#compound-form');
  const compoundUsePortfolioButton = document.querySelector('#compound-use-portfolio');
  const compoundHistoricalButton = document.querySelector('#compound-historical-button');
  const investmentProgressKey = 'finpath-investment-progress-v1';
  const investmentNotebookKey = 'finpath-investment-notebook-v1';
  const investmentPathways = document.querySelector('#investment-pathways');
  const investmentLessonPanel = document.querySelector('#investment-lesson-panel');
  const investmentProgressStatus = document.querySelector('#investment-progress-status');
  const academyOverview = document.querySelector('#academy-overview');
  const generalInvestmentContent = document.querySelector('#general-investment-content');
  const portfolioStorageKey = 'finpath-portfolio-v1';
  const portfolioFxStorageKey = 'finpath-portfolio-usd-kzt-v1';
  const goalTargetsStorageKey = 'finpath-goal-targets-v1';
  let goalTargets = { car: null, home: null, retirement: null, education: null, phone: null };
  let goalTargetStatus = '';
  const portfolioAssets = {
    tesla: 'Tesla',
    apple: 'Apple',
    nvidia: 'NVIDIA',
    gold: 'Gold',
    sp500: 'S&P 500',
    nasdaq: 'NASDAQ 100',
    bitcoin: 'Bitcoin',
    eurusd: 'EUR/USD',
    deposit: 'Депозит'
  };
  const portfolioAssetAliases = {
    tesla: 'tesla',
    tsla: 'tesla',
    apple: 'apple',
    aapl: 'apple',
    nvidia: 'nvidia',
    nvda: 'nvidia'
  };
  const normalizePortfolioAsset = (asset) => portfolioAssetAliases[String(asset || '').trim().toLowerCase()] || String(asset || '').trim().toLowerCase();
  const portfolioAssetCurrencies = {
    tesla: 'USD',
    apple: 'USD',
    nvidia: 'USD',
    gold: 'USD / трой унция',
    sp500: 'USD / индекс бірлігі',
    nasdaq: 'USD / индекс бірлігі',
    bitcoin: 'USD / BTC',
    eurusd: 'EUR / USD',
    deposit: 'KZT'
  };
  const portfolioAssetUnits = {
    tesla: { unit: 'акция', priceUnit: 'акция' },
    apple: { unit: 'акция', priceUnit: 'акция' },
    nvidia: { unit: 'акция', priceUnit: 'акция' },
    gold: { unit: 'трой унция', priceUnit: 'трой унция' },
    sp500: { unit: 'индекс бірлігі', priceUnit: 'индекс бірлігі' },
    nasdaq: { unit: 'индекс бірлігі', priceUnit: 'индекс бірлігі' },
    bitcoin: { unit: 'BTC', priceUnit: 'BTC' },
    eurusd: { unit: 'EUR', priceUnit: 'EUR' },
    deposit: { unit: 'бірлік', priceUnit: 'бірлік' }
  };
  const portfolioGoals = {
    car: 'Көлік',
    home: 'Үй',
    phone: 'Телефон',
    retirement: 'Зейнет',
    education: 'Білім',
    reserve: 'Қаржылық қор',
    other: 'Басқа'
  };
  const investmentLessons = [
    {
      id: 'foundations',
      title: 'Инвестиция негіздері',
      description: 'Жинақ, инфляция, тәуекел және кірістіліктің байланысын түсін.',
      icon: '01',
      topics: ['Инвестиция деген не?', 'Ақша жинау және инфляция', 'Тәуекел мен кіріс'],
      lessonTitle: 'Ақша неге уақыт өте құнын жоғалтады?',
      explanation: 'Инвестиция — болашақта құн немесе кіріс алу мақсатымен қаражатты активке орналастыру. Ақшаны жай сақтау инфляция кезінде оның сатып алу қабілетін төмендетуі мүмкін.',
      terms: [['Инфляция', 'тауарлар мен қызметтердің орташа бағасының өсуі'], ['Нақты кіріс', 'инфляциядан кейінгі сатып алу қабілетінің өзгерісі']],
      example: 'Мысалы, 100 000 ₸ жылына 8% өссе, ал инфляция 6% болса, нақты өсім шамамен 1,9% болады. Бұл — тек есептік мысал.',
      question: 'Инвестицияның нақты кірісін бағалағанда нені ескеру керек?',
      answers: ['Тек бастапқы салымды', 'Инфляцияны да', 'Актив атауын ғана'],
      correctAnswer: 1,
      explanationAnswer: 'Дұрыс. Номиналды кірістілікті инфляциямен салыстыру ақшаның сатып алу қабілеті қалай өзгергенін көрсетеді.',
      sections: [
        { heading: 'Инвестицияның мақсаты неде?', text: 'Инвестиция — ақшаңызды белгілі бір мерзімге активке орналастыру. Адамдар оны ұзақ мерзімді мақсатына жету, капиталын өсіру немесе ықтимал кіріс алу үшін қарастырады. Алдымен мақсат, мерзім және осы ақша қажет болатын уақытты анықтаған дұрыс.' },
        { heading: 'Жинақ пен инвестицияны шатастырмаңыз', text: 'Қаржы резерві күтпеген шығындарға арналған және қолжетімді болуы керек. Инвестиция құны өсуі де, төмендеуі де мүмкін, сондықтан күнделікті қажет ақшаға қысқа мерзімді тәуекел қабылдау орынды болмауы мүмкін.' },
        { heading: 'Номиналды және нақты кіріс', text: 'Номиналды кіріс шоттағы соманың қаншаға өзгергенін көрсетеді. Нақты кіріс инфляцияны ескеріп, сатып алу қабілетінің өзгерісін жуықтайды. Нақты байланыс: (1 + номиналды кіріс) / (1 + инфляция) − 1. Мысалы, 8% кіріс және 6% инфляция кезінде нақты кіріс шамамен 1,9% болады.' },
        { heading: 'Тәуекел мен уақыт', text: 'Кірістің өсу мүмкіндігімен бірге белгісіздік те болады: нарық бағасы ауытқиды, компанияның жағдайы өзгеруі мүмкін. Уақыт көкжиегі мен шығынды көтере алу қабілеті бірдей емес; әр адам оларды жеке бағалауы қажет.' }
      ],
      visual: { type: 'purchasing-power', title: 'Инфляция сатып алу қабілетіне қалай әсер етеді?', caption: 'ДЕМО ЕСЕП · 100 000 ₸ ақшаның сатып алу қабілеті 6% инфляциямен 10 жылда шамамен 55 800 ₸ деңгейіне теңеседі. Бұл болжам емес.' },
      takeaways: ['Мақсат пен мерзімді ақша салудан бұрын анықтаңыз.', 'Номиналды өсімді инфляциямен салыстырыңыз.', 'Инвестициялық актив құны төмендеуі мүмкін екенін ескеріңіз.'],
      activity: { heading: 'Ойлануға арналған тапсырма', text: '100 000 ₸ бір жылда 8% өсті делік. Инфляция 6% болса, тек номиналды өсімге қарап сатып алу қабілеті де 8% артты деп айтуға бола ма?' },
      deepDive: { heading: 'Мақсатты шешімге айналдыру', text: 'Мақсат сомасын, оған дейінгі уақытты және жолда ақша қажет болуы мүмкін жағдайларды бөлек жазыңыз. Номиналды өсімнен кейін комиссия мен инфляцияны есептеңіз: мысалы, 8% кіріс пен 6% инфляция нақты сатып алу қабілетін шамамен 1,9% арттырады. Бұл есепте салық, комиссия және нақты кірістің тұрақсыздығы кірмеген; сондықтан бір ғана болжамға сүйенбей, бірнеше жағдайды салыстырыңыз.' }
    },
    {
      id: 'asset-types',
      title: 'Инвестиция түрлері',
      description: 'Акция, облигация, ETF, алтын, жылжымайтын мүлік және криптоактив ерекшеліктері.',
      icon: '02',
      topics: ['Акциялар мен облигациялар', 'ETF және әртараптандыру', 'Алтын, мүлік, крипто'],
      lessonTitle: 'Акция мен облигацияның айырмасы',
      explanation: 'Акция компаниядағы үлесті білдіреді, ал облигация — ұйымға немесе мемлекетке берілген қарызды растайтын құрал. Олардың табыс көзі мен тәуекелі әртүрлі.',
      terms: [['Акция', 'компания капиталының үлесі'], ['Облигация', 'қарызға берілген қаражатты растайтын бағалы қағаз']],
      example: 'Акционер компания құны өскенде пайда көруі мүмкін, бірақ акция бағасы төмендеуі де ықтимал. Облигацияда төлем шарттары алдын ала белгіленуі мүмкін, алайда эмитент тәуекелі сақталады.',
      question: 'Компаниядағы меншік үлесін қай құрал білдіреді?',
      answers: ['Облигация', 'Акция', 'Депозит'],
      correctAnswer: 1,
      explanationAnswer: 'Дұрыс. Акция иесіне компаниядағы үлесті береді; ол тұрақты кіріске кепілдік бермейді.',
      sections: [
        { heading: 'Акция және облигация', text: 'Акция компаниядағы үлесті білдіреді. Бағасы компанияның нәтижесі мен нарық күтулеріне байланысты өзгеруі мүмкін; дивиденд төленетініне кепіл жоқ. Облигация — эмитенттің қарыз міндеттемесі: төлем кестесі болуы мүмкін, бірақ эмитент төлемей қалу тәуекелі бар.' },
        { heading: 'ETF дегеніміз не?', text: 'ETF — биржада саудаланатын қор. Бір ETF бірнеше бағалы қағазға немесе белгілі бір нарық индексіне экспозиция бере алады. Қордың құрамын, комиссиясын, әдістемесін және валюталық тәуекелін оқып түсіну маңызды.' },
        { heading: 'Басқа активтер', text: 'Алтынға баға, валюта және сұраныс әсер етеді; ол пайыздық кіріс төлемейді. Жылжымайтын мүлік жалға беру кірісін беруі мүмкін, бірақ сатып алу, жөндеу және сату шығындары бар. Криптоактивтер қатты құбылуы мүмкін және сақтау/платформа тәуекелін де қамтиды.' },
        { heading: 'Бір құрал бәріне бірдей емес', text: 'Активтерді мақсат, мерзім, өтімділік, комиссия, салық және түсіну деңгейі бойынша салыстырыңыз. Тек өткен нәтижеге қарап болашақ табысты болжауға болмайды.' }
      ],
      visual: { type: 'asset-map', title: 'Актив түрлері: неге иелік етесіз және қандай тәуекел бар?', caption: 'Түсіндірмелік салыстыру. Тәуекел деңгейлері жалпы сипатта берілген, нақты активке кепілдік емес.' },
      takeaways: ['Акция — меншік үлесі, облигация — қарыз міндеттемесі.', 'ETF құрамын және шығындарын тексеріңіз.', 'Активтер табыс пен тәуекелдің әртүрлі түрлерін береді.'],
      activity: { heading: 'Салыстырып көріңіз', text: 'Ұзақ мерзімді мақсат үшін екі құралды салыстырғанда, олардың бағасы қалай өзгеруі мүмкін, ақшаңызды қашан қайтара аласыз және қандай шығындар бар екенін қарастырыңыз.' },
      deepDive: { heading: 'Активті зерттеудің төрт сұрағы', text: '1) Құрал нені білдіреді: компаниядағы үлес пе, қарыз ба, әлде активтер қоржыны ма? 2) Кіріс қайдан пайда болуы мүмкін және оған кепіл бар ма? 3) Баға төмендесе немесе ақша ертерек керек болса не болады? 4) Комиссия, валюта, сақтау және салық шығыны қандай? Мысалы, ETF бірнеше қағазға таралғанымен, бір секторға шоғырлануы мүмкін; атауының өзінен әртараптандырылған деп қорытынды жасамаңыз.' }
    },
    {
      id: 'markets-brokers',
      title: 'Биржалар мен брокерлер',
      description: 'Биржа, брокер, өтінім және Қазақстан мен халықаралық нарықтардың негіздері.',
      icon: '03',
      topics: ['Биржаның қызметі', 'Брокер не істейді?', 'Нарық пен өтінімдер'],
      lessonTitle: 'Инвестор мен биржаның арасындағы брокер',
      explanation: 'Биржа — сатып алушылар мен сатушылардың өтінімдері кездесетін реттелген нарық. Брокер клиенттің тапсырмаларын орындауға мүмкіндік беретін делдал және қызмет көрсетуші.',
      terms: [['Биржа', 'қаржы құралдарымен сауда ұйымдастырылатын нарық'], ['Брокер', 'клиентке сауда инфрақұрылымын ұсынатын лицензияланған делдал']],
      example: 'Инвестор брокер қосымшасында сатып алу өтінімін жібереді. Брокер оны тиісті нарыққа жеткізеді; мәміленің орындалуы баға мен өтімділікке байланысты.',
      question: 'Жеке инвестордың биржаға өтінім жіберуіне көбіне кім көмектеседі?',
      answers: ['Брокер', 'Инфляция', 'ETF'],
      correctAnswer: 0,
      explanationAnswer: 'Дұрыс. Брокер сауда инфрақұрылымына қолжеткізу мен өтінім беруге көмектеседі. Қызмет шартын және рұқсаттарын тексеру қажет.',
      sections: [
        { heading: 'Биржа не істейді?', text: 'Биржа сатып алушы мен сатушының өтінімдерін белгілі ережелер бойынша сәйкестендіреді. Баға сұраныс пен ұсынысқа қарай қалыптасады. Нарықта әрдайым мәміле болатынына немесе қажетті бағамен бірден орындалатынына кепіл жоқ.' },
        { heading: 'Брокердің рөлі', text: 'Брокер клиентке сауда шотын және өтінім беру құралын ұсынады. Брокер биржаның өзі емес. Қызмет ақысын, валютаны айырбастау шартын, активтерді сақтау мен аудару тәртібін және реттеушінің ресми тізілімін тексеріңіз.' },
        { heading: 'Өтінім қалай өтеді?', text: 'Инвестор құрал, бағыт және мөлшерді таңдап өтінім береді. Брокер оны нарыққа жібереді. Өтінім орындалуы қарсы өтінімнің болуына, баға шегіне, өтімділік пен сауда уақытына тәуелді.' },
        { heading: 'Қауіпсіздік тексеруі', text: 'Шотты ашпас бұрын лицензия/рұқсатты ресми тізілімнен тексеріңіз, тарифті оқыңыз, екі факторлы қорғауды қосыңыз және құпиясөзді ешкімге бермеңіз. Жоғары табысқа кепілдік беретін хабарламаларға сақ болыңыз.' }
      ],
      visual: { type: 'market-flow', title: 'Өтінім инвестордан биржаға қалай барады?', caption: 'Жалпы түсіндірме схема: нақты брокердің рәсімдері мен нарық ережелері әртүрлі болуы мүмкін.' },
      takeaways: ['Биржа өтінімдерді нарық ережесімен сәйкестендіреді.', 'Брокер саудаға қолжеткізу инфрақұрылымын ұсынады.', 'Лицензия, тариф және шот қауіпсіздігін алдын ала тексеріңіз.'],
      activity: { heading: 'Брокерді тексеру тізімі', text: 'Ресми рұқсаттары, комиссиясы, валютаны айырбастау бағамы және активтерді шығару ережелері туралы ақпаратты тауып, әрқайсысына “тексерілді/тексерілмеді” деп белгілеңіз.' },
      deepDive: { heading: 'Өтінім берер алдындағы тексеріс', text: 'Нарықтық өтінім әдетте қолжетімді бағада орындалуға тырысады, бірақ бағаны бекітпейді. Лимиттік өтінім ең жоғары сатып алу не ең төмен сату бағасын шектейді, алайда мүлде орындалмауы мүмкін. Сатып алу мен сату бағасының айырмасы (спред), комиссия және айырбастау шығыны түпкі нәтижеге әсер етеді. Қосымшадағы актив атауын, валюта мен мөлшерді растаңыз; брокер шарттарын және лицензиясын ресми көзден өзіңіз тексеріңіз.' }
    },
    {
      id: 'strategies',
      title: 'Инвестициялық стратегиялар',
      description: 'Күрделі пайыз, DCA, әртараптандыру және ұзақ мерзімді жоспар.',
      icon: '04',
      topics: ['Күрделі пайыз', 'DCA тәсілі', 'Портфельді әртараптандыру'],
      lessonTitle: 'DCA: тұрақты сомамен жүйелі инвестициялау',
      explanation: 'DCA тәсілінде адам белгіленген кестемен бірдей ақша салады. Баға өзгерген сайын сол ақшаға сатып алынатын актив саны өзгереді. Бұл уақытты дәл таңдаудың қысымын азайтуы мүмкін, бірақ шығыннан қорғамайды.',
      terms: [['DCA', 'тұрақты аралықпен бірдей соманы инвестициялау тәсілі'], ['Әртараптандыру', 'қаражатты әртүрлі активтерге бөлу']],
      example: 'Ай сайын 20 000 ₸ салсаңыз, баға төмен айда көбірек, жоғары айда азырақ үлес сатып алынуы мүмкін. Комиссия мен салық нәтижеге әсер етеді.',
      question: 'DCA тәсілінің негізгі ерекшелігі қандай?',
      answers: ['Нарық бағасын әрдайым дәл болжау', 'Белгілі кестемен тұрақты сома салу', 'Тәуекелді толық жою'],
      correctAnswer: 1,
      explanationAnswer: 'Дұрыс. DCA тұрақты кесте мен соманы қолданады; тәуекелді жоймайды және пайдаға кепілдік бермейді.',
      sections: [
        { heading: 'Күрделі пайыздың әсері', text: 'Кіріс бастапқы салымға ғана емес, бұрын есептелген кіріске де есептелсе, күрделі өсім пайда болады. Нәтиже кірістілікке, уақытқа, салымдарға, шығындарға және салыққа тәуелді; тұрақты бір пайызбен өсуге кепіл жоқ.' },
        { heading: 'DCA: бірдей сомамен жүйелі салым', text: 'DCA тәсілінде жоспар бойынша белгіленген мерзім сайын бірдей ақша салынады. Баға төмен кезде сол ақша көбірек үлес, жоғары кезде азырақ үлес алуы мүмкін. Бұл нарық уақытын дәл табуға тәуелділікті азайтады, бірақ нарық құлдырауы мен шығын қаупін жоймайды.' },
        { heading: 'Әртараптандыру', text: 'Қаражатты әртүрлі компания, сала немесе актив түріне бөлу бір ғана инвестицияға тәуелділікті азайтуы мүмкін. Бірақ барлық активтер бірге төмендесе, әртараптандыру шығыннан толық қорғамайды.' },
        { heading: 'Жоспарды орындау', text: 'Салым сомасы күнделікті қажетті шығын мен қаржы резервіне кедергі келтірмеуі керек. Комиссиялар шағын тұрақты салымдарға әсер етуі мүмкін. Шешім қабылдамас бұрын шарт пен нақты шығындарды салыстырыңыз.' }
      ],
      visual: { type: 'dca-chart', title: 'DCA кезінде бірдей ақшаға әртүрлі үлес алынады', caption: 'ОЙДАН АЛЫНҒАН ДЕМО БАҒАЛАР · мысал болашақ бағаны немесе пайданы көрсетпейді.' },
      takeaways: ['Күрделі өсім үшін уақыт пен қайта инвестицияланған кіріс маңызды.', 'DCA — тұрақты кесте, бірақ пайдаға кепіл емес.', 'Әртараптандыру тәуекелді азайтуы мүмкін, бірақ жоймайды.'],
      activity: { heading: 'Өзіңіз тексеріңіз', text: 'Ай сайын 20 000 ₸ салғанда, шартты баға 10 000 ₸ болса қанша үлес аласыз? Баға 8 000 ₸ болса, комиссияны есептемегенде қанша болады?' },
      deepDive: { heading: 'Стратегияны шынайы өмірге бейімдеу', text: 'Мысалы, 20 000 ₸ тұрақты салым шартты 10 000 ₸ бағамен 2 үлес, ал 8 000 ₸ бағамен 2,5 үлес алуға жетеді (бөлшек үлеске рұқсат бар деп есептейік). Бұл орташа сатып алу бағасын өзгертуі мүмкін, бірақ актив арзандаса портфель де құн жоғалтады. Салым кестесін бюджетке сай қойыңыз, комиссияны есептеңіз, ал портфель үлестері жоспардан ауытқыса қайта теңгеру ережесін алдын ала зерттеңіз.' }
    },
    {
      id: 'mathematics',
      title: 'Математикалық әдістер',
      description: 'Monte Carlo, тәуекел/табыс көрсеткіштері және Fisher теңдеуі.',
      icon: '05',
      topics: ['Monte Carlo сценарийлері', 'Құбылмалылық және тәуекел', 'Нақты кіріс формуласы'],
      lessonTitle: 'Monte Carlo нені көрсетеді?',
      explanation: 'Monte Carlo симуляциясы болжамдарға сүйеніп көптеген ықтимал жолдарды есептейді. Ол болашақты айтпайды: нәтиже параметрлер мен кездейсоқ сценарийлерге тәуелді.',
      terms: [['Құбылмалылық', 'бағаның немесе кірістіліктің ауытқу деңгейі'], ['Процентиль', 'нәтижелер үлестіріміндегі белгілі бір шек']],
      example: 'Симуляцияның 5-процентилі — модельдік жолдардың 5%-ы сол мәннен төмен аяқталғанын білдіреді; бұл ең үлкен ықтимал шығынға кепіл емес.',
      question: 'Monte Carlo нәтижесін қалай түсіну керек?',
      answers: ['Нақты болашақ бағасы ретінде', 'Болжамдарға тәуелді ықтимал сценарийлер ретінде', 'Кепілдендірілген пайда ретінде'],
      correctAnswer: 1,
      explanationAnswer: 'Дұрыс. Симуляция модель болжамдарын зерттейді, бірақ болашақ нәтижені кепілдемейді.',
      sections: [
        { heading: 'Күтілетін кіріс пен құбылмалылық', text: 'Күтілетін кіріс — болжамдарға сүйенген орташа нәтиже, кепілденген табыс емес. Құбылмалылық кірістіліктің орташа мәннен ауытқу деңгейін көрсетеді; стандарттық ауытқу соны өлшеудің кең тараған тәсілі. Жоғары құбылмалылық тәуекелдің барлық түрін қамтымайды.' },
        { heading: 'VaR және ең үлкен төмендеу', text: 'Value at Risk (VaR) белгілі кезең мен сенімділік деңгейіне арналған модельдік шығын шегін бағалайды; одан да үлкен шығын болуы мүмкін. Maximum Drawdown — шыңнан кейінгі ең үлкен төмендеу. Бұл өткен құлдырауды сипаттайды, ал болашақтың кепілді шегі емес.' },
        { heading: 'Sharpe және тәуекел/сыйақы', text: 'Sharpe Ratio жуық түрде (портфель кірісі − тәуекелсіз мөлшерлеме) / кірістіліктің стандарттық ауытқуы деп есептеледі. Тәуекел/сыйақы қатынасы жоспарланған ықтимал табысты ықтимал шығынмен салыстырады. Екеуі де болжам мен бастапқы дерекке тәуелді; бір көрсеткішпен шешім қабылдамаңыз.' },
        { heading: 'Monte Carlo симуляциясы', text: 'Модель кірістілік пен құбылмалылық туралы енгізілген болжамнан көптеген ықтимал жол құрады. 5-процентиль нәтижелердің төменгі бөлігіндегі шекті, 50-процентиль ортасын, 95-процентиль жоғарғы бөлігін көрсетеді. Модельге кірмеген оқиғаларды ол болжай алмайды.' },
        { heading: 'Фишер теңдеуі', text: 'Номиналды кіріс, нақты кіріс және инфляцияның дәл байланысы: 1 + i = (1 + r)(1 + π). Сондықтан нақты кіріс r = (1 + i) / (1 + π) − 1. Жуық есептеуде r ≈ i − π қолданылады. Мысалы, 12% номиналды кіріс пен 8% инфляция шамамен 3,70% нақты кіріс береді.' }
      ],
      visual: { type: 'risk-distribution', title: 'Сценарийлердің үлестірімі — бір ғана нүктелік болжам емес', caption: 'Түсіндірмелік үлгі: 5%, 50% және 95% нүктелері ықтимал нәтижелер диапазонын сипаттайды, кепіл емес.' },
      takeaways: ['Әр тәуекел көрсеткішінің өз шектеуі мен есептеу кезеңі бар.', 'Monte Carlo нәтижесі енгізілген болжамдарға тәуелді.', 'Нақты кіріс инфляцияны ескереді; 12% және 8% мысалы шамамен 3,70% береді.'],
      activity: { heading: 'Фишер теңдеуін қолданып көріңіз', text: 'Номиналды кіріс 10%, инфляция 7% болса, жуық нақты кірісті r ≈ i − π арқылы және дәл формуламен есептеп салыстырыңыз.' },
      deepDive: { heading: 'Сандар модельдің жауабы, болашақтың уәдесі емес', text: 'Сценарийді оқығанда мерзімін, валюта бірлігін, кіріс пен құбылмалылық жорамалдарын, комиссияның есепке алынған-алынбағанын тексеріңіз. 5-процентиль шығынның ең нашар мүмкін шегін көрсетпейді: үлестірімнен тыс нәтиже де болуы мүмкін. Fisher теңдеуінде инфляция нақты кірісті өзгертеді; нақты кіріс теріс болса, шоттағы номиналды сома өскенімен сатып алу қабілеті азаюы ықтимал. Үш түрлі болжамды салыстыру бір санға байланып қалмауға көмектеседі.' }
    },
    {
      id: 'psychology',
      title: 'Инвестор психологиясы',
      description: 'Эмоция, FOMO, шығыннан қорқу және шешім тәртібі.',
      icon: '06',
      topics: ['FOMO және асығыс әрекет', 'Шығыннан қорқу', 'Жеке ереже мен жоспар'],
      lessonTitle: 'FOMO кезінде жоспарды сақтау',
      explanation: 'FOMO — өзгелер пайда көріп жатқандай сезініп, мүмкіндікті жіберіп аламын деп қорқу. Мұндай қысым жоспарсыз сатып алу немесе шамадан тыс тәуекелге итермелеуі мүмкін.',
      terms: [['FOMO', 'мүмкіндікті жіберіп алудан қорқу'], ['Тәуекел жоспары', 'алдын ала анықталған шектеулер мен әрекет тәртібі']],
      example: 'Актив бағасы күрт өскенін көргенде, бірден сатып алмай, мақсатыңызды, ықтимал шығынды және портфельдегі үлесін қайта тексеріңіз.',
      question: 'FOMO сезімі туғанда ең пайдалы алғашқы қадам?',
      answers: ['Жоспарды тексеріп, шешімді кідірту', 'Барлық жинақты бір активке салу', 'Тәуекелді елемеу'],
      correctAnswer: 0,
      explanationAnswer: 'Дұрыс. Үзіліс жасап, алдын ала жазылған жоспар мен тәуекел шегін қайта қарау эмоциялық шешімді азайтады.',
      sections: [
        { heading: 'Эмоция шешімге неліктен әсер етеді?', text: 'Баға жылдам өскенде мүмкіндікті жіберіп аламын деген сезім тууы мүмкін. Ал баға төмендегенде қорқыныш асығыс сатуға итермелеуі ықтимал. Біз өз шешімімізді өзгелердің сәтті көрінген нәтижесімен салыстырып, ықтимал шығынды асыра бағалауымыз мүмкін.' },
        { heading: 'FOMO және шығыннан қашу', text: 'FOMO (мүмкіндікті жіберіп алудан қорқу) шешімді шұғылдатуы мүмкін. Шығыннан қашу баға төмендегенде жоспарды қайта қарамай, асығыс әрекетке итермелеуі ықтимал. Екеуі де тәуекелді бағалауды қиындатады.' },
        { heading: 'Қарапайым шешім тәртібі', text: 'Әрекет етпес бұрын үзіліс жасаңыз, ақпарат көзін тексеріңіз, шешімнің мақсатқа сәйкестігін, портфельдегі үлесін және ең қолайсыз ықтимал нәтижені ойлаңыз. Алдын ала жазылған ережені ұстану эмоция әсерін азайтуы мүмкін.' },
        { heading: 'Өзіңізге сұрақ қойыңыз', text: '“Осы ақпаратты көрмеген болсам да, бұл шешімді қабылдар ма едім?”, “Қандай дерек менің пікірімді өзгертер еді?” және “Шығын болса, қаржылық жоспарым бұзыла ма?” деген сұрақтар асығыстықты тоқтатуға көмектеседі.' }
      ],
      visual: { type: 'decision-checklist', title: 'Эмоциялық түрткі мен саналы әрекеттің арасындағы үзіліс', caption: 'Оқу схемасы эмоцияны толық жоюды емес, шешімді тексеру дағдысын көрсетеді.' },
      takeaways: ['FOMO мен шығыннан қорқу шешімді асықтыруы мүмкін.', 'Шешім алдында мақсат, дерек және ықтимал шығынды тексеріңіз.', 'Жоспарды алдын ала жазу эмоция әсерін шектей алады.'],
      activity: { heading: 'Жеке ережеңізді жазыңыз', text: 'Нарық туралы ақпарат көргенде бірден әрекет етпес бұрын орындайтын үш қадамды белгілеңіз: үзіліс, ақпаратты тексеру, тәуекел лимитін салыстыру.' },
      deepDive: { heading: 'Шешім күнделігін жүргізу', text: 'Маңызды шешім алдында күнін, мақсатын, сүйенген дерегіңізді, ықтимал шығынды және шешім қабылдаған көңіл күйіңізді қысқаша жазыңыз. Кейін нәтиже қандай болғанын қосыңыз. Бұл “дұрыс/бұрыс” деп өзіңізді жазғыру үшін емес, шешім қабылдау тәсіліндегі қайталанатын әдеттерді байқау үшін қажет. Әлеуметтік желідегі бір сәттік жетістікті толық нәтиже деп қабылдамаңыз: шығын мен тәуекел туралы ақпаратты да іздеңіз.' }
    },
    {
      id: 'final-plan',
      title: 'Қорытынды тест және жеке оқу жоспары',
      description: 'Негізгі ұғымдарды қайталап, келесі оқу қадамын анықта.',
      icon: '07',
      topics: ['Білімді қайталау', 'Мақсат пен мерзім', 'Келесі қадам'],
      lessonTitle: 'Жеке инвестициялық оқу жоспары',
      explanation: 'Жоспарды мақсаттан бастаңыз: не үшін жинайсыз, қашан қажет болады және қандай ауытқуға дайынсыз? Содан кейін қаржы қорын, уақыт көкжиегін және түсінікті құралдарды зерттеңіз.',
      terms: [['Уақыт көкжиегі', 'мақсатқа дейінгі жоспарланған мерзім'], ['Тәуекелге төзімділік', 'қаржы ауытқуын көтере алу деңгейі']],
      example: 'Қысқа мерзімде керек ақшаға құбылмалы актив таңдау мақсатқа сай келмеуі мүмкін. Алдымен қажеттілік пен мерзімді бағалау маңызды.',
      question: 'Жеке оқу/инвестиция жоспарын неден бастаған дұрыс?',
      answers: ['Мақсат, мерзім және тәуекелді анықтаудан', 'Басқаның активін қайталаудан', 'Табысты кепілді деп қабылдаудан'],
      correctAnswer: 0,
      explanationAnswer: 'Дұрыс. Мақсат, мерзім және тәуекел мүмкіндігі келесі білім мен шешімдерді таңдауға негіз болады.',
      sections: [
        { heading: '1-қадам: мақсат пен мерзім', text: 'Мақсатты нақты сипаттаңыз: не үшін ақша жинайсыз, шамамен қашан қажет болады және мақсат құны өзгеруі мүмкін бе? Мерзім қысқа болса, ақшаның құбылуын көтеруге уақыт аз болуы мүмкін.' },
        { heading: '2-қадам: қаржылық негіз', text: 'Кіріс пен шығысты есептеп, күтпеген жағдайға арналған қолжетімді резервті қарастырыңыз. Жоғары пайызды қарыздар мен күнделікті қажет қаражатты инвестициялық жоспардан бөлек бағалаңыз.' },
        { heading: '3-қадам: білім мен құрал', text: 'Түсінетін активтерден бастаңыз. Шығын, өтімділік, валюта, эмитент және нарық тәуекелдерін оқыңыз. Жеке жағдайды білмейінше, бір ғана активке немесе басқа адамның шешіміне көшірмеңіз.' },
        { heading: '4-қадам: қайта қарау', text: 'Мақсатыңыз бен жағдайыңыз өзгерсе, жоспарыңызды қайта тексеріңіз. Күнделікті баға ауытқуына бола жоспарды асығыс өзгертпеңіз. Нәтижеге кепіл жоқ екенін есте сақтаңыз; күрделі немесе жеке жағдайды лицензиясы бар маманмен талқылауға болады.' }
      ],
      visual: { type: 'learning-roadmap', title: 'Мақсаттан шешімге дейінгі оқу жоспары', caption: 'Жалпы білім беру маршруты. Жеке қаржылық немесе инвестициялық ұсыныс емес.' },
      takeaways: ['Мақсат пен мерзім келесі қаржылық шешімдердің бағытын анықтайды.', 'Резерв пен инвестицияға арналған қаражатты ажыратыңыз.', 'Түсінетін активті ғана зерттеп, жоспарды мерзімді түрде қайта қараңыз.'],
      activity: { heading: 'Өзіңіздің оқу жоспарыңызды құрыңыз', text: 'Бір қаржылық мақсатыңызды, шамамен мерзімін және әлі түсініксіз үш тақырыпты жазыңыз. Осы курстың модульдері сол сұрақтарды зерттеуге көмектеседі.' },
      deepDive: { heading: 'Курстан кейінгі жеке оқу бағыты', text: 'Мақсатты өлшенетін етіп жазыңыз: қандай мақсат, шамамен қанша қаражат және қай уақытқа дейін. Қазір білетін нәрселерді, тексерілуі керек сұрақтарды және келесі аптада орындайтын бір шағын оқу қадамын белгілеңіз. Жоспарды жағдай өзгерген сайын қайта қарап, нақты қаржылық шешім алдында ресми құжаттарды, шығындарды және тәуекелді тексеріңіз. Оқу курсын аяқтау пайдаға немесе кез келген құралдың сізге сәйкестігіне кепіл бермейді.' }
    }
  ];
  const companyLogoUrls = {
    tesla: 'https://cdn.simpleicons.org/tesla/E82127',
    apple: 'https://cdn.simpleicons.org/apple/252C2A',
    nvidia: 'https://cdn.simpleicons.org/nvidia/76B900'
  };
  let currentChartSymbol = null;
  let portfolioPositions = [];
  let usdKztRate = null;
  let localProfile = null;
  let loadedUserStorageKey = null;
  let completedInvestmentLessons = [];
  let pendingPageScrollTarget = null;
  const getUserStorageKey = (key) => `${key}:${localProfile.username.toLowerCase()}`;

  const companyNews = [
    {
      asset: 'apple',
      company: 'Apple',
      date: '2026-11-02',
      headline: 'Apple 2026 қаржы жылының төртінші тоқсанын қорытындылады',
      summary: 'Apple тоқсандық түсімін 114,5 млрд долларға жеткізгенін хабарлады: бұл өткен жылмен салыстырғанда 12% жоғары. Services түсімі жаңа рекордқа жетті, ал акцияға шаққандағы пайда 2,10 доллар болды.',
      image: 'https://www.apple.com/newsroom/images/default/apple-logo-og.jpg',
      imageAlt: 'Apple логотипі',
      impact: 'Рекордтық түсім, Services өсімі және 28 млрд доллар операциялық ақша ағыны компанияның қаржылық тұрақтылығын бағалауға көмектеседі.',
      source: 'Apple Newsroom',
      url: 'https://www.apple.com/newsroom/2026/11/apple-reports-fourth-quarter-results/'
    },
    {
      asset: 'apple',
      company: 'Apple',
      date: '2026-11-03',
      headline: 'Apple Health жаңартуы көбірек тілге қолдау қосты',
      summary: 'Жаңартылған Health қолданбасы Apple Intelligence негізінде жұмыс істейді. Жаңа Insights, For You және Longevity бөлімдері денсаулық көрсеткіштерін жекелендіріп талдауға мүмкіндік береді; жаңарту әзірге iOS 27.3 developer beta нұсқасында.',
      image: 'https://www.apple.com/newsroom/images/2026/11/redesigned-health-app-expands-language-support/tile/Apple-Health-app-language-expansion.jpg.og.jpg',
      imageAlt: 'Apple Health қолданбасының жаңартылған интерфейсі',
      impact: 'Бұл жаңалық Apple экожүйесіндегі қызметтер мен AI мүмкіндіктерінің қолданылуын арттыруы мүмкін, бірақ нақты қаржылық әсері әлі белгісіз.',
      source: 'Apple Newsroom',
      url: 'https://www.apple.com/newsroom/2026/11/redesigned-health-app-expands-language-support/'
    },
    {
      asset: 'nvidia',
      company: 'NVIDIA',
      date: '2026-11-06',
      headline: 'NVIDIA 6G зерттеулеріне арналған ашық құралдардың қолданылуы артқанын хабарлады',
      summary: 'NVIDIA мәліметінше, AI Aerial және Sionna құралдарын әзірлеушілердің қолдануы бір жылда 10 есе өскен, ал 5G/6G ашық құралдары 1 млн-нан көп жүктелген. Платформаларды әлем бойынша 8 000-нан астам зерттеу және академиялық ұйым пайдаланады.',
      image: 'https://iprsoftwaremedia.com/219/files/202611/a27cc51720fd9a8615299143a36e44e0/6aedf9ac3d633293bf8bf12f_telco-promo-pack-brooklyn-6g-summit-corp-blog-1920x1080-1-1/telco-promo-pack-brooklyn-6g-summit-corp-blog-1920x1080-1-1_mid.jpg',
      imageAlt: 'NVIDIA 6G желілеріне арналған технологиялық материал',
      impact: 'Бұл GPU, edge AI және телеком инфрақұрылымы арасындағы ұзақ мерзімді сұранысты көрсетеді; бұл тоқсандық табыс болжамы емес.',
      source: 'NVIDIA Technical Blog',
      url: 'https://blogs.nvidia.com/blog/telco-open-source-tools-research-6g-networks/'
    },
    {
      asset: 'nvidia',
      company: 'NVIDIA',
      date: '2026-10-28',
      headline: 'NVIDIA үшінші тоқсан нәтижелерін 17 қарашада жариялайды',
      summary: 'Компания 2027 қаржы жылының үшінші тоқсаны бойынша есепті 17 қарашада жариялап, сол күні талдау конференциясын өткізетінін хабарлады. Тоқсан 25 қазанда аяқталған.',
      image: 'https://nvidianews.nvidia.com/media/themes/64d081263d633229694ae3db/images/NVIDIA-logo-BL.jpg',
      imageAlt: 'NVIDIA логотипі',
      impact: 'Есеп жарияланғанға дейінгі күту акция құбылмалылығын арттыруы мүмкін. Нақты қорытынды тек компанияның есептерінен кейін жасалады.',
      source: 'NVIDIA Newsroom',
      url: 'https://nvidianews.nvidia.com/news/nvidia-sets-conference-call-for-third-quarter-financial-results-6928873'
    },
  ];

  const assets = {
    tesla: { name: 'Tesla', symbol: 'NASDAQ:TSLA', yahooSymbol: 'TSLA', factors: 'Tesla: компания есептері, электр көлігі нарығы және технологиялық сектор факторлары.' },
    apple: { name: 'Apple', symbol: 'NASDAQ:AAPL', yahooSymbol: 'AAPL', factors: 'Apple: құрылғылар сатылымы, қызметтер сегменті және компания есептері.' },
    nvidia: { name: 'NVIDIA', symbol: 'NASDAQ:NVDA', yahooSymbol: 'NVDA', factors: 'NVIDIA: чиптерге сұраныс, дата-орталықтар және технологиялық сектор факторлары.' },
    gold: { name: 'Gold', symbol: 'OANDA:XAUUSD', yahooSymbol: 'GC=F', factors: 'Gold: мөлшерлеме, доллар және инфляция — бағасына ықпал ететін факторлар.' },
    sp500: { name: 'S&P 500', symbol: 'SP:SPX', yahooSymbol: '^GSPC', factors: 'S&P 500: компания табысы, пайыздық мөлшерлеме және экономикалық өсім — негізгі факторлар.' },
    nasdaq: { name: 'NASDAQ 100', symbol: 'NASDAQ:NDX', yahooSymbol: '^NDX', factors: 'NASDAQ 100: технология секторындағы өзгерістер мен пайыздық мөлшерлеме — негізгі факторлар.' },
    bitcoin: { name: 'Bitcoin', symbol: 'BINANCE:BTCUSDT', yahooSymbol: 'BTC-USD', factors: 'Bitcoin: жоғары құбылмалылық пен цифрлық активтер нарығының өзгерістері.' },
    eurusd: { name: 'EUR/USD', symbol: 'FX:EURUSD', yahooSymbol: 'EURUSD=X', factors: 'EUR/USD: орталық банктердің шешімдері мен валюталық нарық қозғалысы.' }
  };
  const historicalDataCache = new Map();
  let researchRequestId = 0;

  const readNumber = (id) => Number(document.querySelector(`#${id}`).value);
  const formatMoney = (value) => `${Math.round(value).toLocaleString('kk-KZ')} ₸`;
  const formatUsd = (value) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
  const getUsdKztRate = () => Number.isFinite(usdKztRate) ? usdKztRate : 0;
  const formatAssetCurrency = (value, assetKey) => {
    const currency = assetKey === 'eurusd' ? 'EUR' : assetKey === 'deposit' ? 'KZT' : 'USD';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  const formatPositionMoney = (value, assetKey) => `${formatAssetCurrency(value, assetKey)} · ${getAssetCurrencyLabel(assetKey)}`;
  const getAssetCurrencyLabel = (assetKey) => portfolioAssetCurrencies[assetKey] || 'USD';
  const formatMoneyPair = (usdValue) => `${formatUsd(usdValue)} · ${formatMoney(usdValue * getUsdKztRate())}`;
  const formatPercent = (value) => `${value.toFixed(2)}%`;
  const normalRandom = () => {
    const first = Math.max(Math.random(), Number.EPSILON);
    const second = Math.random();
    return Math.sqrt(-2 * Math.log(first)) * Math.cos(2 * Math.PI * second);
  };

  function calculateCompoundInterest() {
    const initial = readNumber('compound-initial');
    const monthly = readNumber('compound-monthly');
    const annualRate = readNumber('compound-rate');
    const years = readNumber('compound-years');
    if (![initial, monthly, annualRate, years].every(Number.isFinite)
      || initial < 0 || monthly < 0 || annualRate < 0 || annualRate > 100
      || years < 1 || years > 50 || !Number.isInteger(years)) {
      throw new Error('Мәндерді тексеріңіз: пайыз 0–100%, мерзім 1–50 жыл аралығында болуы керек.');
    }

    const monthlyRate = (1 + annualRate / 100) ** (1 / 12) - 1;
    const balances = [initial];
    const contributions = [initial];
    let balance = initial;
    let investedToDate = initial;
    const yearlyBreakdown = [{ year: 0, balance: initial, invested: initial, growth: 0 }];
    for (let month = 1; month <= years * 12; month += 1) {
      balance *= 1 + monthlyRate;
      balance += monthly;
      investedToDate += monthly;
      if (month % 12 === 0) {
        balances.push(balance);
        contributions.push(investedToDate);
        yearlyBreakdown.push({ year: month / 12, balance, invested: investedToDate, growth: balance - investedToDate });
      }
    }

    const invested = initial + monthly * years * 12;
    const interest = balance - invested;
    document.querySelector('#compound-final-value').textContent = formatMoney(balance);
    document.querySelector('#compound-contributions').textContent = formatMoney(invested);
    document.querySelector('#compound-interest').textContent = formatMoney(interest);
    document.querySelector('#compound-error').hidden = true;
    document.querySelector('#compound-chart-rate-label').textContent =
      `${annualRate.toFixed(1)}% жылдық модель · ай сайын салым және капиталдандыру`;

    const breakdown = document.querySelector('#compound-breakdown-list');
    breakdown.replaceChildren();
    yearlyBreakdown.forEach(({ year, balance: yearBalance, invested: yearInvested, growth: yearGrowth }) => {
      const row = document.createElement('div');
      row.className = 'compound-breakdown-row';
      row.innerHTML = `<span>${year === 0 ? 'Қазір' : `${year}-жыл соңы`}</span><strong>${formatMoney(yearBalance)}</strong><span>Өз салымы: ${formatMoney(yearInvested)}</span><span class="${yearGrowth >= 0 ? 'compound-growth-positive' : 'compound-growth-negative'}">Өсім: ${yearGrowth >= 0 ? '+' : ''}${formatMoney(yearGrowth)}</span>`;
      breakdown.append(row);
    });

    const width = 1000;
    const height = 260;
    const left = 76;
    const right = 18;
    const top = 16;
    const bottom = 32;
    const maximum = Math.max(...balances, ...contributions, 1);
    const chartHeight = height - top - bottom;
    const chartWidth = width - left - right;
    const pointsFor = (series) => series.map((value, index) => {
      const x = left + (index / Math.max(1, series.length - 1)) * chartWidth;
      const y = height - bottom - (value / maximum) * chartHeight;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    const totalPoints = pointsFor(balances);
    const investedPoints = pointsFor(contributions);
    const firstX = totalPoints[0].split(',')[0];
    const lastX = totalPoints[totalPoints.length - 1].split(',')[0];
    const baseline = height - bottom;
    document.querySelector('#compound-chart-line').setAttribute('points', totalPoints.join(' '));
    document.querySelector('#compound-chart-invested-line').setAttribute('points', investedPoints.join(' '));
    document.querySelector('#compound-chart-area').setAttribute('d', `M ${firstX} ${baseline} L ${totalPoints.join(' L ')} L ${lastX} ${baseline} Z`);
    const grid = document.querySelector('#compound-chart-grid');
    grid.replaceChildren();
    for (let step = 0; step <= 4; step += 1) {
      const y = top + (chartHeight / 4) * step;
      const value = maximum * (1 - step / 4);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', String(left));
      line.setAttribute('x2', String(width - right));
      line.setAttribute('y1', y.toFixed(1));
      line.setAttribute('y2', y.toFixed(1));
      line.setAttribute('class', 'compound-chart-gridline');
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', String(left - 8));
      label.setAttribute('y', String(y + 4));
      label.setAttribute('text-anchor', 'end');
      label.setAttribute('class', 'compound-chart-label');
      label.textContent = `${Math.round(value).toLocaleString('kk-KZ')} ₸`;
      grid.append(line, label);
    }
    document.querySelector('#compound-chart-start').textContent = '0 жыл';
    document.querySelector('#compound-chart-end').textContent = `${years} жыл`;
  }

  async function calculateHistoricalCompound() {
    const initial = readNumber('compound-initial');
    const monthly = readNumber('compound-monthly');
    const years = readNumber('compound-years');
    const assetKey = document.querySelector('#compound-asset').value;
    const asset = assets[assetKey];
    const status = document.querySelector('#compound-historical-status');
    if (![initial, monthly, years].every(Number.isFinite) || initial < 0 || monthly < 0 || years < 1 || years > 10 || !Number.isInteger(years)) {
      throw new Error('Нақты тарихи есеп үшін мерзімді 1–10 жыл аралығында енгізіңіз.');
    }
    if (!Number.isFinite(usdKztRate) || usdKztRate <= 0) throw new Error('USD/KZT нақты бағамы әлі жүктелмеді.');
    status.textContent = `${asset.name} бойынша тарихи бағалар жүктелуде...`;
    const response = await fetch(`/api/market?symbol=${encodeURIComponent(asset.yahooSymbol)}&range=10y&interval=1mo`, { cache: 'no-store' });
    if (!response.ok) throw new Error('Тарихи нарық деректері алынбады.');
    const payload = await response.json();
    const result = payload.chart?.result?.[0];
    const timestamps = result?.timestamp || [];
    const closes = result?.indicators?.adjclose?.[0]?.adjclose || result?.indicators?.quote?.[0]?.close || [];
    const series = timestamps.map((timestamp, index) => ({ timestamp, close: Number(closes[index]) }))
      .filter((point) => Number.isFinite(point.close) && point.close > 0)
      .slice(-(years * 12 + 1));
    if (series.length < years * 12) throw new Error('Таңдалған мерзімге тарихи дерек жеткіліксіз.');

    let shares = initial / usdKztRate / series[0].close;
    let invested = initial;
    let balance = initial;
    const balances = [initial];
    const contributions = [initial];
    const yearlyBreakdown = [{ year: 0, balance: initial, invested: initial, growth: 0 }];
    series.slice(1).forEach((point, index) => {
      const month = index + 1;
      const contribution = monthly / usdKztRate;
      shares += contribution / point.close;
      invested += monthly;
      balance = shares * point.close * usdKztRate;
      balances.push(balance);
      contributions.push(invested);
      if (month % 12 === 0) yearlyBreakdown.push({ year: month / 12, balance, invested, growth: balance - invested });
    });

    document.querySelector('#compound-final-value').textContent = formatMoney(balance);
    document.querySelector('#compound-contributions').textContent = formatMoney(invested);
    document.querySelector('#compound-interest').textContent = formatMoney(balance - invested);
    document.querySelector('#compound-chart-rate-label').textContent = `${asset.name} · нақты айлық тарихи баға · ${series.length - 1} ай`;
    document.querySelector('#compound-error').hidden = true;
    status.textContent = `${asset.name}: бастапқы ақшаға акция алынды, әр ай сайын ${formatMoney(monthly)} қосылып, сол айдағы тарихи жабылу бағасымен қайта акция алынды. Соңғы нәтиже соңғы нақты бағаға бағаланды.`;

    const breakdown = document.querySelector('#compound-breakdown-list');
    breakdown.replaceChildren();
    yearlyBreakdown.forEach(({ year, balance: yearBalance, invested: yearInvested, growth: yearGrowth }) => {
      const row = document.createElement('div');
      row.className = 'compound-breakdown-row';
      row.innerHTML = `<span>${year === 0 ? 'Қазір' : `${year}-жыл соңы`}</span><strong>${formatMoney(yearBalance)}</strong><span>Өз салымы: ${formatMoney(yearInvested)}</span><span class="${yearGrowth >= 0 ? 'compound-growth-positive' : 'compound-growth-negative'}">Өзгеріс: ${yearGrowth >= 0 ? '+' : ''}${formatMoney(yearGrowth)}</span>`;
      breakdown.append(row);
    });

    const width = 1000;
    const height = 260;
    const left = 76;
    const right = 18;
    const top = 16;
    const bottom = 32;
    const maximum = Math.max(...balances, ...contributions, 1);
    const chartHeight = height - top - bottom;
    const chartWidth = width - left - right;
    const pointsFor = (values) => values.map((value, index) => {
      const x = left + (index / Math.max(1, values.length - 1)) * chartWidth;
      const y = height - bottom - (value / maximum) * chartHeight;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    const totalPoints = pointsFor(balances);
    const investedPoints = pointsFor(contributions);
    document.querySelector('#compound-chart-line').setAttribute('points', totalPoints.join(' '));
    document.querySelector('#compound-chart-invested-line').setAttribute('points', investedPoints.join(' '));
    const firstX = totalPoints[0].split(',')[0];
    const lastX = totalPoints[totalPoints.length - 1].split(',')[0];
    document.querySelector('#compound-chart-area').setAttribute('d', `M ${firstX} ${height - bottom} L ${totalPoints.join(' L ')} L ${lastX} ${height - bottom} Z`);
    document.querySelector('#compound-chart-start').textContent = 'Бастау';
    document.querySelector('#compound-chart-end').textContent = `${years} жыл`;
  }

  function updateCompoundInterest() {
    const error = document.querySelector('#compound-error');
    if (!compoundForm.checkValidity()) {
      error.textContent = 'Енгізілген мәндерді тексеріңіз.';
      error.hidden = false;
      return;
    }
    try {
      calculateCompoundInterest();
    } catch (exception) {
      error.textContent = exception.message;
      error.hidden = false;
    }
  }

  function showWelcomeStep(step) {
    document.querySelectorAll('[data-welcome-step]').forEach((section) => {
      section.hidden = section.dataset.welcomeStep !== step;
    });
  }

  function updateRegistrationUI() {
    signupStatus.textContent = `Аккаунт: ${localProfile.username}`;
    signupStatus.hidden = false;
    signupOpenButton.hidden = true;
    accountLogoutButton.hidden = false;
  }

  function loadGoalTargets() {
    goalTargets = { car: null, home: null, retirement: null, education: null, phone: null };
    goalTargetStatus = '';
    try {
      const storedTargets = window.localStorage.getItem(getUserStorageKey(goalTargetsStorageKey));
      if (!storedTargets) return;
      const parsedTargets = JSON.parse(storedTargets);
      if (!parsedTargets || typeof parsedTargets !== 'object' || Array.isArray(parsedTargets)) {
        throw new Error('Мақсат сомаларының сақталған пішімі дұрыс емес.');
      }
      Object.keys(goalTargets).forEach((key) => {
        const target = parsedTargets[key];
        if (target === null || target === undefined) return;
        if (Number.isFinite(target) && target > 0) goalTargets[key] = target;
        else throw new Error('Мақсат сомасының сақталған мәні жарамсыз.');
      });
    } catch (error) {
      goalTargetStatus = `Мақсат сомаларын оқу мүмкін болмады: ${error.message}`;
    }
  }

  function initializeUserData() {
    const userStorageKey = localProfile.username.toLowerCase();
    if (loadedUserStorageKey === userStorageKey) return;
    loadedUserStorageKey = userStorageKey;
    loadGoalTargets();
    loadPortfolio();
    renderPortfolio();
    loadLiveUsdKztRate();
    loadInvestmentProgress();
    renderInvestmentProgress();
    renderInvestmentPathways();
    loadInvestmentNotebook();
    document.querySelector('#portfolio-asset').dispatchEvent(new Event('change'));
    renderGoals();
    renderDashboard();
  }

  function showAuthenticatedUser(user) {
    localProfile = user;
    welcomeScreen.hidden = true;
    appShell.hidden = false;
    welcomeError.hidden = true;
    updateRegistrationUI();
    initializeUserData();
    renderDashboard();
  }

  async function requestAuth(path, body) {
    const response = await fetch(path, {
      method: body ? 'POST' : 'GET',
      credentials: 'same-origin',
      headers: body ? { 'Content-Type': 'application/json' } : {},
      body: body ? JSON.stringify(body) : undefined,
      cache: 'no-store'
    });
    let payload;
    try {
      payload = await response.json();
    } catch {
      throw new Error('Серверден жарамды жауап алынбады.');
    }
    if (!response.ok) throw new Error(payload.error || 'Сұрауды орындау мүмкін болмады.');
    return payload;
  }

  function openSignup() {
    signupError.hidden = true;
    signupForm.reset();
    signupDialog.showModal();
  }

  async function restoreSession() {
    try {
      const { user } = await requestAuth('/api/auth/session');
      if (user) showAuthenticatedUser(user);
    } catch (error) {
      welcomeError.textContent = `Серверге қосылу мүмкін болмады: ${error.message}`;
      welcomeError.hidden = false;
      welcomeScreen.hidden = false;
      appShell.hidden = true;
    }
  }

  function setPortfolioStatus(message, isError = false) {
    if (!portfolioStatus) return;
    portfolioStatus.textContent = message;
    portfolioStatus.classList.toggle('status-error', isError);
  }

  async function loadLiveUsdKztRate() {
    const input = document.querySelector('#portfolio-fx-rate');
    const status = document.querySelector('#portfolio-fx-status');
    try {
      const response = await fetch('/api/market?symbol=USDKZT=X&range=2y&interval=1d', { cache: 'no-store' });
      if (!response.ok) throw new Error('Бағам сервері жауап бермеді.');
      const payload = await response.json();
      const meta = payload.chart?.result?.[0]?.meta;
      const rate = Number(meta?.regularMarketPrice);
      if (!Number.isFinite(rate) || rate <= 0) throw new Error('USD/KZT бағамы табылмады.');
      usdKztRate = rate;
      input.value = rate.toFixed(2);
      status.textContent = `Нақты бағам · Yahoo Finance · ${new Date().toLocaleString('kk-KZ')}`;
      setPortfolioStatus('USD/KZT нақты бағамы жаңартылды.');
      renderPortfolio();
    } catch (error) {
      input.value = 'Қолжетімсіз';
      status.textContent = 'Нақты бағамды жүктеу мүмкін болмады';
      setPortfolioStatus(`USD/KZT нақты бағамы алынбады: ${error.message}`, true);
      renderPortfolio();
    }

  }

  async function loadCurrentAssetPrice(assetKey) {
    const asset = assets[assetKey];
    const response = await fetch(`/api/market?symbol=${encodeURIComponent(asset.yahooSymbol)}&range=2y&interval=1d`, { cache: 'no-store' });
    if (!response.ok) throw new Error('Актив бағасы серверден алынбады.');
    const payload = await response.json();
    const price = Number(payload.chart?.result?.[0]?.meta?.regularMarketPrice);
    if (!Number.isFinite(price) || price <= 0) throw new Error(`${asset.name} үшін нақты баға табылмады.`);
    return price;
  }

  function updateInvestmentPreview() {
    const amount = Number(document.querySelector('#portfolio-investment-amount').value);
    const price = Number(document.querySelector('#portfolio-market-price').value);
    const quantityInput = document.querySelector('#portfolio-quantity');
    if (!Number.isFinite(amount) || amount <= 0 || !Number.isFinite(price) || price <= 0 || !Number.isFinite(usdKztRate) || usdKztRate <= 0) {
      quantityInput.value = '';
      return;
    }
    quantityInput.value = (amount / usdKztRate / price).toFixed(6);
  }

  function loadPortfolio() {
    try {
      const fxRate = window.localStorage.getItem(getUserStorageKey(portfolioFxStorageKey));
      if (fxRate !== null) {
        const parsedFxRate = Number(fxRate);
        if (!Number.isFinite(parsedFxRate) || parsedFxRate < 1 || parsedFxRate > 1000000) {
          usdKztRate = null;
          window.localStorage.removeItem(getUserStorageKey(portfolioFxStorageKey));
          setPortfolioStatus('Сақталған USD/KZT бағамы жарамсыз болды. Нақты бағам қайта жүктелуде.', true);
          document.querySelector('#portfolio-fx-rate').value = '';
        } else {
          usdKztRate = parsedFxRate;
          document.querySelector('#portfolio-fx-rate').value = String(parsedFxRate);
        }
      }
      const rate = getUsdKztRate();
      const stored = window.localStorage.getItem(getUserStorageKey(portfolioStorageKey));
      if (!stored) {
        portfolioPositions = [];
        return;
      }
      let parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) throw new Error('Сақталған портфель деректерінің пішімі дұрыс емес.');
      let migrated = false;
      const demoPositionIds = new Set(['mansur-tsla-demo', 'mansur-aapl-demo', 'mansur-nvda-demo']);
      const userPositions = parsed.filter((position) => !position || !demoPositionIds.has(position.id));
      if (userPositions.length !== parsed.length) {
        parsed = userPositions;
        migrated = true;
      }
      parsed.forEach((position) => {
        if (!position || typeof position !== 'object') throw new Error('Сақталған позиция пішімі дұрыс емес.');
        const normalizedAsset = normalizePortfolioAsset(position.asset);
        if (normalizedAsset !== position.asset) {
          position.asset = normalizedAsset;
          migrated = true;
        }
        if (!Number.isFinite(position.priceUsd) && Number.isFinite(position.price) && position.price > 0) {
          position.priceUsd = position.price / rate;
          position.marketPriceUsd = (position.marketPrice || position.price) / rate;
          delete position.price;
          delete position.marketPrice;
          migrated = true;
        }
      });
      const valid = parsed.every((position) =>
        typeof position.id === 'string' &&
        Object.hasOwn(portfolioAssets, position.asset) &&
        Object.hasOwn(portfolioGoals, position.goal) &&
        Number.isFinite(position.quantity) && position.quantity > 0 &&
        Number.isFinite(position.priceUsd) && position.priceUsd > 0 &&
        Number.isFinite(position.marketPriceUsd) && position.marketPriceUsd > 0 &&
        Number.isFinite(position.createdAt)
      );
      if (!valid) throw new Error('Сақталған портфель деректерінің пішімі дұрыс емес.');
      portfolioPositions = parsed;
      if (migrated) savePortfolio();
    } catch (error) {
      setPortfolioStatus(`Портфель браузерден оқылмады: ${error.message}`, true);
    }
  }

  function savePortfolio() {
    try {
      window.localStorage.setItem(getUserStorageKey(portfolioStorageKey), JSON.stringify(portfolioPositions));
      setPortfolioStatus('Позиция осы браузерде сақталды. USD бағалары мен бағамды қолмен жаңартыңыз; брокерге қосылмаған.');
    } catch (error) {
      setPortfolioStatus(`Өзгерістер осы бет ашық тұрғанша ғана сақталады: ${error.message}`, true);
    }
  }

  function formatQuantity(quantity) {
    return new Intl.NumberFormat('kk-KZ', { maximumFractionDigits: 6 }).format(quantity);
  }

  function createPositionElement(position) {
    const item = document.createElement('article');
    item.className = 'position-item';

    const heading = document.createElement('div');
    heading.className = 'position-item-heading';
    const assetName = document.createElement('strong');
    assetName.textContent = portfolioAssets[position.asset];
    const logo = document.createElement('span');
    logo.className = `position-logo holding-logo-${position.asset}`;
    const ticker = { tesla: 'T', apple: 'A', nvidia: 'N' }[position.asset] || portfolioAssets[position.asset].slice(0, 2).toUpperCase();
    logo.textContent = ticker;
    if (companyLogoUrls[position.asset]) {
      const image = document.createElement('img');
      image.src = companyLogoUrls[position.asset];
      image.alt = '';
      image.setAttribute('aria-hidden', 'true');
      image.addEventListener('load', () => logo.classList.add('has-image'), { once: true });
      image.addEventListener('error', () => image.remove(), { once: true });
      logo.append(image);
    }
    const nameRow = document.createElement('div');
    nameRow.className = 'position-name-row';
    nameRow.append(logo, assetName);

    const valueDetails = document.createElement('div');
    valueDetails.className = 'position-value';
    const totalValue = document.createElement('strong');
    totalValue.textContent = formatPositionMoney(position.quantity * position.marketPriceUsd, position.asset);
    const convertedValue = document.createElement('span');
    convertedValue.textContent = hasFxRate ? formatMoney(position.quantity * position.marketPriceUsd * getUsdKztRate()) : 'USD/KZT бағамы алынбады';
    const investedValue = document.createElement('span');
    investedValue.textContent = `${formatPositionMoney(position.quantity * position.priceUsd, position.asset)} салынған`;
    valueDetails.append(totalValue, convertedValue, investedValue);

    const removeButton = document.createElement('button');
    removeButton.className = 'position-delete';
    removeButton.type = 'button';
    removeButton.dataset.positionId = position.id;
    removeButton.setAttribute('aria-label', `${portfolioAssets[position.asset]} позициясын өшіру`);
    removeButton.textContent = '×';
    heading.append(nameRow, valueDetails, removeButton);

    const details = document.createElement('div');
    details.className = 'position-item-details';
    const assetQuantity = document.createElement('div');
    assetQuantity.className = 'position-quantity';
    const quantity = document.createElement('strong');
    quantity.textContent = `${formatQuantity(position.quantity)} ${portfolioAssetUnits[position.asset].unit}`;
    const goal = document.createElement('span');
    goal.className = 'goal-chip';
    goal.textContent = position.goal === 'other' && position.customGoal
      ? position.customGoal
      : portfolioGoals[position.goal];
    assetQuantity.append(quantity, goal);

    const unitPrice = document.createElement('span');
    unitPrice.className = 'position-unit-price';
    unitPrice.textContent = `Сатып алу ${formatAssetCurrency(position.priceUsd, position.asset)} / ${portfolioAssetUnits[position.asset].priceUnit}`;

    const livePrice = document.createElement('label');
    livePrice.className = 'position-live-price';
    const livePriceLabel = document.createElement('span');
    livePriceLabel.textContent = `Соңғы енгізілген баға, ${getAssetCurrencyLabel(position.asset)}`;
    const livePriceInput = document.createElement('input');
    livePriceInput.type = 'number';
    livePriceInput.min = '0.01';
    livePriceInput.max = '1000000000';
    livePriceInput.step = '0.01';
    livePriceInput.value = String(position.marketPriceUsd);
    livePriceInput.dataset.positionPrice = position.id;
    livePriceInput.setAttribute('aria-label', `${portfolioAssets[position.asset]} ${portfolioAssetUnits[position.asset].unit} соңғы енгізілген бағасы ${getAssetCurrencyLabel(position.asset)}`);
    livePrice.append(livePriceLabel, livePriceInput);

    const change = position.quantity * (position.marketPriceUsd - position.priceUsd);
    const returnValue = document.createElement('span');
    returnValue.className = `position-return ${change >= 0 ? 'positive' : 'negative'}`;
    const percentage = (change / (position.quantity * position.priceUsd)) * 100;
    returnValue.textContent = `${change >= 0 ? '+' : ''}${formatPositionMoney(change, position.asset)} · ${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;

    details.append(assetQuantity, unitPrice, livePrice, returnValue);
    item.append(heading, details);
    return item;
  }

  function renderGoals() {
    const hasFxRate = Number.isFinite(usdKztRate) && usdKztRate > 0;
    const goalDefinitions = [
      { key: 'car', title: 'Көлік', target: goalTargets.car, visual: '<svg viewBox="0 0 180 120" aria-hidden="true"><path d="M22 78h136v22H22z" fill="#16875e"/><path d="m45 78 13-29a10 10 0 0 1 9-6h47a10 10 0 0 1 9 6l13 29" fill="#20b879"/><path d="M67 64h50l-7-15H74z" fill="#d8f3e5"/><circle cx="53" cy="101" r="13" fill="#173b2d"/><circle cx="127" cy="101" r="13" fill="#173b2d"/><circle cx="53" cy="101" r="5" fill="#f3fff8"/><circle cx="127" cy="101" r="5" fill="#f3fff8"/><circle cx="145" cy="28" r="15" fill="#f5c967"/></svg>', description: 'Алғашқы көлікке немесе отбасылық автокөлікке қор жинау.', action: 'Көлікке актив қосу' },
      { key: 'home', title: 'Үй', target: goalTargets.home, visual: '<svg viewBox="0 0 180 120" aria-hidden="true"><circle cx="145" cy="25" r="15" fill="#f5c967"/><path d="m30 61 60-43 60 43v49H30z" fill="#e7f5eb" stroke="#16875e" stroke-width="6"/><path d="M75 110V75h30v35M49 66h20v18H49zm62 0h20v18h-20z" fill="#abdcc1" stroke="#16875e" stroke-width="4"/><path d="M20 111h140" stroke="#48a878" stroke-width="5" stroke-linecap="round"/></svg>', description: 'Баспанаға бастапқы жарна немесе үй қорын қалыптастыру.', action: 'Үйге актив қосу' },
      { key: 'retirement', title: 'Зейнет', target: goalTargets.retirement, visual: '<svg viewBox="0 0 180 120" aria-hidden="true"><circle cx="135" cy="30" r="18" fill="#f5c967"/><path d="M20 100h140" stroke="#16875e" stroke-width="6" stroke-linecap="round"/><path d="M35 88c20-30 38-42 57-30s32 9 53-25" fill="none" stroke="#20b879" stroke-width="8" stroke-linecap="round"/><path d="m130 34 15-2-3 15" fill="none" stroke="#16875e" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="48" cy="83" r="9" fill="#abdcc1"/></svg>', description: 'Ұзақ мерзімді еркіндікке арналған капитал.', action: 'Зейнетке актив қосу' },
      { key: 'education', title: 'Білім', target: goalTargets.education, visual: '<svg viewBox="0 0 180 120" aria-hidden="true"><path d="m25 48 65-28 65 28-65 28z" fill="#4a3c68"/><path d="M55 64v28c18 12 52 12 70 0V64" fill="#6a5a91"/><path d="M155 49v37" stroke="#16875e" stroke-width="5"/><circle cx="155" cy="91" r="7" fill="#f5c967"/><path d="M90 20v56" stroke="#f5c967" stroke-width="5"/></svg>', description: 'Оқу, курс немесе баланың білім қорына жинақ.', action: 'Білімге актив қосу' },
      { key: 'phone', title: 'Телефон', target: goalTargets.phone, visual: '<svg viewBox="0 0 180 120" aria-hidden="true"><rect x="61" y="12" width="58" height="96" rx="11" fill="#d8f3e5" stroke="#16875e" stroke-width="6"/><rect x="69" y="23" width="42" height="68" rx="4" fill="#20b879"/><circle cx="90" cy="100" r="3" fill="#16875e"/><circle cx="145" cy="28" r="15" fill="#f5c967"/></svg>', description: 'Құрылғы немесе байланысқа қажет қаражат.', action: 'Телефонға актив қосу' }
    ];
    const navigator = document.querySelector('#goal-navigator');
    const totals = new Map(goalDefinitions.map(({ key }) => [key, 0]));
    portfolioPositions.forEach((position) => {
      if (totals.has(position.goal)) totals.set(position.goal, totals.get(position.goal) + getPositionInvested(position));
    });
    navigator.replaceChildren();
    goalDefinitions.forEach((goalDefinition) => {
      const amount = totals.get(goalDefinition.key);
      const hasTarget = hasFxRate && Number.isFinite(goalDefinition.target) && goalDefinition.target > 0;
      const percentage = hasTarget ? Math.min((amount / goalDefinition.target) * 100, 100) : 0;
      const card = document.createElement('article');
      card.className = 'goal-navigator-card';
      card.innerHTML = `<div class="goal-art">${goalDefinition.visual}<span class="goal-art-caption">FINPATH · ${goalDefinition.title.toUpperCase()}</span></div><div class="goal-card-heading"><div><span class="goal-card-kicker">МАҚСАТ ҚОРЫ</span><h2>${goalDefinition.title}</h2></div><span class="goal-percent">${hasTarget ? `${percentage.toFixed(1)}%` : '—'}</span></div><p class="goal-description">${goalDefinition.description}</p><div class="goal-target-line"><span>Салым ретінде енгізілгені</span><strong>${hasFxRate ? formatMoney(amount) : 'Бағам жүктелуде'}</strong></div><label class="goal-target-input"><span>Мақсат сомасы, ₸</span><input type="number" min="1" step="1" data-goal-target="${goalDefinition.key}" value="${Number.isFinite(goalDefinition.target) ? goalDefinition.target : ''}" placeholder="Өз соманы енгізіңіз" aria-label="${goalDefinition.title} мақсатының сомасы"></label><div class="goal-progress-bar" role="progressbar" aria-label="${goalDefinition.title} мақсатының орындалуы" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(percentage)}"><div class="goal-progress-fill" style="width:${percentage}%"></div></div><div class="goal-target-row"><span>${hasTarget ? `Мақсат: ${formatMoney(goalDefinition.target)}` : goalDefinition.target ? 'USD/KZT бағамы алынбады' : 'Мақсат сомасы енгізілмеген'}</span><strong>${hasTarget ? `Қалды: ${formatMoney(Math.max(0, goalDefinition.target - amount))}` : '—'}</strong></div><button class="recalculate-button goal-action" type="button" data-add-goal="${goalDefinition.key}">${goalDefinition.action} →</button>`;
      navigator.append(card);
    });

    const total = Array.from(totals.values()).reduce((sum, amount) => sum + amount, 0);
    document.querySelector('#goals-total-progress').textContent = hasFxRate ? formatMoney(total) : '—';
    const chart = document.querySelector('#goals-chart-bars');
    const max = Math.max(...goalDefinitions.map(({ key }) => totals.get(key)), 1);
    chart.replaceChildren();
    goalDefinitions.forEach((goal, index) => {
      const x = 50 + index * (840 / Math.max(1, goalDefinitions.length - 1));
      const barHeight = (totals.get(goal.key) / max) * 165;
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', String(x));
      rect.setAttribute('y', String(210 - barHeight));
      rect.setAttribute('width', '90');
      rect.setAttribute('height', String(barHeight));
      rect.setAttribute('rx', '9');
      rect.setAttribute('class', 'goals-chart-bar');
      const amountLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      amountLabel.setAttribute('x', String(x + 45));
      amountLabel.setAttribute('y', String(Math.max(26, 198 - barHeight)));
      amountLabel.setAttribute('text-anchor', 'middle');
      amountLabel.textContent = hasFxRate ? formatMoney(totals.get(goal.key)) : '—';
      const categoryLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      categoryLabel.setAttribute('x', String(x + 45));
      categoryLabel.setAttribute('y', '244');
      categoryLabel.setAttribute('text-anchor', 'middle');
      categoryLabel.textContent = goal.title;
      chart.append(rect, amountLabel, categoryLabel);
    });
    document.querySelector('#goal-target-status').textContent =
      goalTargetStatus || 'Мақсат сомаларын әр картаға өзіңіз енгізіп, өзгерісті сақтаңыз.';
    const actionList = document.querySelector('#goals-action-list');
    actionList.replaceChildren();
    const actions = [
      ['1', 'Мақсатты таңдаңыз', 'Портфельден мақсатқа сәйкес бағытты белгілеңіз.'],
      ['2', 'Ай сайын ақша қосыңыз', 'Тұрақты салым мақсат прогресін жылдамдатады.'],
      ['3', 'Нәтижені бақылаңыз', 'Нақты жиналған соманы, қалған қаражатты және пайызды салыстырыңыз.']
    ];
    actions.forEach(([number, title, text]) => {
      const item = document.createElement('div');
      item.className = 'goals-action-item';
      item.innerHTML = `<span>${number}</span><div><strong>${title}</strong><p>${text}</p></div>`;
      actionList.append(item);
    });
  }

  function getPositionInvested(position) {
    return position.quantity * position.priceUsd * getUsdKztRate();
  }

  function getPositionMarketValue(position) {
    return position.quantity * position.marketPriceUsd * getUsdKztRate();
  }

  function renderDashboard() {
    const greeting = document.querySelector('#dashboard-greeting');
    const holdingsContainer = document.querySelector('#dashboard-holdings');
    if (!holdingsContainer) return;
    const hasFxRate = Number.isFinite(usdKztRate) && usdKztRate > 0;

    greeting.textContent = localProfile
      ? `Сәлем, ${localProfile.name}!`
      : 'Қош келдіңіз!';

    const invested = portfolioPositions.reduce((sum, position) => sum + getPositionInvested(position), 0);
    const holdingsValue = portfolioPositions.reduce((sum, position) => sum + getPositionMarketValue(position), 0);
    const totalCapital = holdingsValue;
    const netChange = holdingsValue - invested;

    document.querySelector('#dashboard-capital').textContent = hasFxRate ? formatMoney(totalCapital) : '—';
    document.querySelector('#dashboard-position-count').textContent = String(portfolioPositions.length);
    document.querySelector('#dashboard-position-assets').textContent = portfolioPositions.length
      ? [...new Set(portfolioPositions.map((position) => portfolioAssets[position.asset]))].join(' · ')
      : 'Әзірге актив жоқ';
    document.querySelector('#dashboard-onboarding').hidden = portfolioPositions.length > 0;
    document.querySelector('#dashboard-market-value').textContent = hasFxRate
      ? `${formatMoney(holdingsValue)} · ${formatUsd(portfolioPositions.reduce((sum, position) => sum + position.quantity * position.marketPriceUsd, 0))}`
      : 'USD/KZT бағамы алынбады';
    document.querySelector('#dashboard-market-invested').textContent = hasFxRate
      ? `${formatMoney(invested)} · ${formatUsd(portfolioPositions.reduce((sum, position) => sum + position.quantity * position.priceUsd, 0))}`
      : 'USD/KZT бағамы алынбады';
    const changeElement = document.querySelector('#dashboard-market-change');
    const changeUsd = portfolioPositions.reduce((sum, position) => sum + position.quantity * (position.marketPriceUsd - position.priceUsd), 0);
    changeElement.textContent = hasFxRate
      ? `${netChange > 0 ? '+' : ''}${formatMoney(netChange)} · ${changeUsd > 0 ? '+' : ''}${formatUsd(changeUsd)}`
      : 'USD/KZT бағамы алынбады';
    changeElement.classList.toggle('market-positive', netChange >= 0);
    changeElement.classList.toggle('market-negative', netChange < 0);

    holdingsContainer.replaceChildren();
    portfolioPositions.forEach((position) => {
      const change = position.quantity * (position.marketPriceUsd - position.priceUsd);
      const percentage = position.priceUsd > 0 ? ((position.marketPriceUsd - position.priceUsd) / position.priceUsd) * 100 : 0;
      const card = document.createElement('article');
      card.className = 'holding-card';

      const top = document.createElement('div');
      top.className = 'holding-card-top';
      const company = document.createElement('div');
      company.className = 'holding-company';
      const logo = document.createElement('span');
      logo.className = `holding-logo holding-logo-${position.asset}`;
      const logoText = position.asset === 'tesla' ? 'T' : position.asset === 'apple' ? 'A' : position.asset === 'nvidia' ? 'N' : portfolioAssets[position.asset].slice(0, 2).toUpperCase();
      logo.textContent = logoText;
      if (companyLogoUrls[position.asset]) {
        const logoImage = document.createElement('img');
        logoImage.src = companyLogoUrls[position.asset];
        logoImage.alt = '';
        logoImage.setAttribute('aria-hidden', 'true');
        logoImage.addEventListener('load', () => logo.classList.add('has-image'), { once: true });
        logoImage.addEventListener('error', () => logoImage.remove(), { once: true });
        logo.append(logoImage);
      }
      const companyText = document.createElement('div');
      const companyName = document.createElement('strong');
      companyName.textContent = portfolioAssets[position.asset];
      const ticker = document.createElement('span');
      ticker.textContent = position.asset === 'tesla' ? 'NASDAQ · TSLA' : position.asset === 'apple' ? 'NASDAQ · AAPL' : position.asset === 'nvidia' ? 'NASDAQ · NVDA' : portfolioAssets[position.asset];
      ticker.textContent += ` · ${formatQuantity(position.quantity)} ${portfolioAssetUnits[position.asset].unit}`;
      companyText.append(companyName, ticker);
      company.append(logo, companyText);

      top.append(company);

      const bottom = document.createElement('div');
      bottom.className = 'holding-card-bottom';
      const value = document.createElement('div');
      value.className = 'holding-value';
      const current = document.createElement('strong');
      current.textContent = `${formatPositionMoney(position.quantity * position.marketPriceUsd, position.asset)} · ${hasFxRate ? formatMoney(position.quantity * position.marketPriceUsd * getUsdKztRate()) : 'USD/KZT бағамы алынбады'}`;
      const basis = document.createElement('span');
      basis.textContent = `Салынғаны ${formatPositionMoney(position.quantity * position.priceUsd, position.asset)} · ${hasFxRate ? formatMoney(position.quantity * position.priceUsd * getUsdKztRate()) : 'USD/KZT бағамы алынбады'}`;
      value.append(current, basis);
      const returnLabel = document.createElement('span');
      returnLabel.className = `holding-return ${change >= 0 ? 'positive' : 'negative'}`;
      const positionChangeUsd = position.quantity * (position.marketPriceUsd - position.priceUsd);
      returnLabel.textContent = `${positionChangeUsd > 0 ? '+' : ''}${formatPositionMoney(positionChangeUsd, position.asset)} · ${percentage > 0 ? '+' : ''}${percentage.toFixed(2)}%`;
      bottom.append(value, returnLabel);
      card.append(top, bottom);
      holdingsContainer.append(card);

    });

    if (portfolioPositions.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'dashboard-empty';
      empty.textContent = 'Портфель бос. Позиция қосылғанда жалпы капитал мен мақсат прогресі қайта есептеледі.';
      holdingsContainer.append(empty);
    }

    const goalContributions = portfolioPositions
      .filter((position) => Object.hasOwn(goalTargets, position.goal))
      .reduce((sum, position) => sum + getPositionInvested(position), 0);
    document.querySelector('#dashboard-goal-contributions').textContent =
      Number.isFinite(usdKztRate) && usdKztRate > 0 ? formatMoney(goalContributions) : 'Бағам жүктелуде';

    renderNews();
  }

  function renderNews() {
    const heldAssets = new Set(portfolioPositions.map((position) => normalizePortfolioAsset(position.asset)));
    const homeNews = document.querySelector('#home-news-list');
    const officialNews = document.querySelector('#official-news-list');
    const monthNames = ['қаңтар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым', 'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша', 'желтоқсан'];
    const latestNewsDate = companyNews.reduce((latest, story) => story.date > latest ? story.date : latest, companyNews[0].date);
    document.querySelector('#news-updated-label').textContent = `Соңғы дерек: ${formatDate(new Date(`${latestNewsDate}T00:00:00`))}`;

    function createNewsCard(story) {
      const card = document.createElement('article');
      card.className = 'real-news-card';
      const image = document.createElement('img');
      image.className = 'real-news-image';
      image.src = story.image;
      image.alt = story.imageAlt;
      image.loading = 'lazy';
      image.referrerPolicy = 'no-referrer';
      image.addEventListener('error', () => {
        image.remove();
        const fallback = document.createElement('div');
        fallback.className = `news-visual-fallback news-visual-${story.asset}`;
        fallback.innerHTML = `<span>${story.asset === 'apple' ? 'A' : 'N'}</span><small>${story.company}</small>`;
        card.prepend(fallback);
      }, { once: true });

      const content = document.createElement('div');
      content.className = 'real-news-content';
      const meta = document.createElement('div');
      meta.className = 'real-news-meta';
      const [year, month, day] = story.date.split('-').map(Number);
      const isHeldAsset = heldAssets.has(normalizePortfolioAsset(story.asset));
      meta.textContent = `${story.company} · ${day} ${monthNames[month - 1]} ${year}${isHeldAsset ? ' · Портфеліңізде бар' : ''}`;
      const title = document.createElement('h3');
      title.textContent = story.headline;
      const summary = document.createElement('p');
      summary.textContent = story.summary;
      const impact = document.createElement('div');
      impact.className = 'news-impact';
      impact.innerHTML = `<strong>Инвестор үшін маңызы</strong><span>${story.impact}</span>`;
      const source = document.createElement('a');
      source.className = 'real-news-source';
      source.href = story.url;
      source.target = '_blank';
      source.rel = 'noopener noreferrer';
      source.textContent = `Дереккөз: ${story.source} ↗`;
      content.append(meta, title, summary, impact, source);
      card.append(image, content);
      return card;
    }

    if (homeNews) {
      if (!homeNews.dataset.navigationBound) {
        homeNews.addEventListener('click', (event) => {
          const button = event.target.closest('[data-open-page]');
          if (!button) return;
          const targetItem = navItems.find((item) => item.dataset.page === button.dataset.openPage);
          if (targetItem) targetItem.click();
        });
        homeNews.dataset.navigationBound = 'true';
      }
      const matchingStories = companyNews
        .filter((story) => heldAssets.has(story.asset))
        .sort((first, second) => second.date.localeCompare(first.date));
      homeNews.replaceChildren(...matchingStories.map(createNewsCard));
      if (matchingStories.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'real-news-empty';
        const heldNames = [...heldAssets]
          .filter((asset) => portfolioAssets[asset])
          .map((asset) => portfolioAssets[asset]);
        empty.textContent = heldNames.length
          ? `${heldNames.join(', ')} бойынша жаңа ресми жарияланым бұл шолуда жоқ. Барлық жаңалықтарды ашып, басқа компанияларды да тексеріңіз.`
          : 'Портфеліңізде компания акциясы жоқ. Компания қоссаңыз, оған қатысты жаңалықтар осы жерде көрсетіледі.';
        homeNews.append(empty);
        const openNews = document.createElement('button');
        openNews.type = 'button';
        openNews.className = 'dashboard-link';
        openNews.dataset.openPage = 'news';
        openNews.textContent = 'Барлық жаңалықтарды ашу →';
        homeNews.append(openNews);
      }
    }

    if (officialNews) {
      const filters = Array.from(document.querySelectorAll('[data-news-filter]'));
      const showStories = (filter) => {
        const stories = companyNews
          .filter((story) => filter === 'all' || story.asset === filter)
          .sort((first, second) => second.date.localeCompare(first.date));
        officialNews.replaceChildren(...stories.map(createNewsCard));
        if (filters.length) filters.forEach((button) => button.classList.toggle('active', button.dataset.newsFilter === filter));
      };
      showStories('all');
      filters.forEach((button) => {
        button.onclick = () => showStories(button.dataset.newsFilter);
      });
    }
  }

  function renderPortfolio() {
    if (!portfolioList) return;
    const hasFxRate = Number.isFinite(usdKztRate) && usdKztRate > 0;
    const totalInvestedUsd = portfolioPositions.reduce((sum, position) => sum + position.quantity * position.priceUsd, 0);
    const totalInvested = totalInvestedUsd * getUsdKztRate();
    const totalMarketValueUsd = portfolioPositions.reduce((sum, position) => sum + position.quantity * position.marketPriceUsd, 0);
    const totalMarketValue = totalMarketValueUsd * getUsdKztRate();
    const totalChangeUsd = totalMarketValueUsd - totalInvestedUsd;
    const totalChange = totalChangeUsd * getUsdKztRate();
    const totalChangePercent = totalInvestedUsd > 0 ? (totalChangeUsd / totalInvestedUsd) * 100 : 0;
    const goalTotals = new Map();
    const assetMarketTotals = new Map();
    portfolioPositions.forEach((position) => {
      const amount = position.quantity * position.priceUsd * getUsdKztRate();
      goalTotals.set(position.goal, (goalTotals.get(position.goal) || 0) + amount);
      const marketAmount = position.quantity * position.marketPriceUsd * getUsdKztRate();
      assetMarketTotals.set(position.asset, (assetMarketTotals.get(position.asset) || 0) + marketAmount);
    });
    const goalsCount = goalTotals.size;

    document.querySelector('#portfolio-invested').textContent = hasFxRate ? formatMoney(totalInvested) : '—';
    document.querySelector('#portfolio-invested-usd').textContent = `${formatUsd(totalInvestedUsd)} · сатып алу құны`;
    document.querySelector('#portfolio-market-value').textContent = hasFxRate ? formatMoney(totalMarketValue) : '—';
    document.querySelector('#portfolio-market-value-usd').textContent = `${formatUsd(totalMarketValueUsd)} · енгізілген бағалар бойынша`;
    const totalChangeElement = document.querySelector('#portfolio-total-change');
    totalChangeElement.textContent = hasFxRate ? `${totalChange >= 0 ? '+' : ''}${formatMoney(totalChange)}` : '—';
    totalChangeElement.classList.toggle('portfolio-hero-positive', totalChange >= 0);
    totalChangeElement.classList.toggle('portfolio-hero-negative', totalChange < 0);
    const totalChangeUsdElement = document.querySelector('#portfolio-total-change-usd');
    totalChangeUsdElement.textContent = `${totalChangeUsd >= 0 ? '+' : ''}${formatUsd(totalChangeUsd)} · ${totalChangePercent >= 0 ? '+' : ''}${totalChangePercent.toFixed(2)}%`;
    totalChangeUsdElement.classList.toggle('portfolio-hero-positive', totalChangeUsd >= 0);
    totalChangeUsdElement.classList.toggle('portfolio-hero-negative', totalChangeUsd < 0);
    document.querySelector('#portfolio-position-count').textContent = String(portfolioPositions.length);
    document.querySelector('#portfolio-overview-position-count').textContent = String(portfolioPositions.length);
    document.querySelector('#portfolio-goal-count').textContent = String(goalsCount);
    document.querySelector('#portfolio-overview-change').textContent = hasFxRate
      ? `${totalChange >= 0 ? '+' : ''}${formatMoney(totalChange)}`
      : '—';
    document.querySelector('#portfolio-overview-change-usd').textContent =
      `${totalChangeUsd >= 0 ? '+' : ''}${formatUsd(totalChangeUsd)} · ${totalChangePercent >= 0 ? '+' : ''}${totalChangePercent.toFixed(2)}%`;
    document.querySelector('#portfolio-overview-change').classList.toggle('portfolio-change-positive', totalChange >= 0);
    document.querySelector('#portfolio-overview-change').classList.toggle('portfolio-change-negative', totalChange < 0);
    document.querySelector('#portfolio-overview-change-usd').classList.toggle('portfolio-change-positive', totalChangeUsd >= 0);
    document.querySelector('#portfolio-overview-change-usd').classList.toggle('portfolio-change-negative', totalChangeUsd < 0);

    const assetColors = ['#8df0bd', '#67dca4', '#4cbf8a', '#a4b8ff', '#ffc96b', '#8ed9e8', '#ed9cbb', '#c6a4f0', '#a9bbb3'];
    const circumference = 2 * Math.PI * 44;
    const donutSegments = document.querySelector('#portfolio-donut-segments');
    const assetLegend = document.querySelector('#portfolio-asset-legend');
    donutSegments.replaceChildren();
    assetLegend.replaceChildren();
    const sortedAssetTotals = Array.from(assetMarketTotals.entries()).sort((first, second) => second[1] - first[1]);
    if (totalMarketValue > 0) {
      let offset = 0;
      sortedAssetTotals.forEach(([asset, amount], index) => {
        const portion = amount / totalMarketValue;
        const segmentLength = circumference * portion;
        const segment = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        segment.setAttribute('cx', '60');
        segment.setAttribute('cy', '60');
        segment.setAttribute('r', '44');
        segment.setAttribute('class', 'portfolio-donut-segment');
        segment.setAttribute('stroke', assetColors[index % assetColors.length]);
        segment.setAttribute('stroke-dasharray', `${segmentLength} ${circumference - segmentLength}`);
        segment.setAttribute('stroke-dashoffset', String(-offset));
        donutSegments.append(segment);
        offset += segmentLength;

        const item = document.createElement('div');
        item.className = 'portfolio-asset-legend-item';
        const marker = document.createElement('span');
        marker.className = 'portfolio-asset-legend-marker';
        marker.style.backgroundColor = assetColors[index % assetColors.length];
        const name = document.createElement('span');
        name.textContent = portfolioAssets[asset];
        const share = document.createElement('strong');
        share.textContent = `${(portion * 100).toFixed(1)}%`;
        item.append(marker, name, share);
        assetLegend.append(item);
      });
    } else {
      const empty = document.createElement('span');
      empty.className = 'portfolio-legend-empty';
      empty.textContent = 'Позиция қосқанда портфель құрамы осында көрінеді';
      assetLegend.append(empty);
    }

    document.querySelector('#portfolio-empty').hidden = portfolioPositions.length > 0;
    document.querySelector('#clear-portfolio').hidden = portfolioPositions.length === 0;
    portfolioList.replaceChildren(...portfolioPositions.map(createPositionElement));

    const allocation = document.querySelector('#goal-allocation');
    allocation.replaceChildren();
    if (!hasFxRate) {
      const emptyMessage = document.createElement('p');
      emptyMessage.textContent = 'Мақсат бөлінісін есептеу үшін USD/KZT нақты бағамы қажет.';
      allocation.append(emptyMessage);
    } else if (portfolioPositions.length === 0) {
      const emptyMessage = document.createElement('p');
      emptyMessage.textContent = 'Позиция қосылғанда бөлініс осы жерде есептеледі.';
      allocation.append(emptyMessage);
    } else {
      Array.from(goalTotals.entries())
        .sort((first, second) => second[1] - first[1])
        .forEach(([goalKey, amount]) => {
          const row = document.createElement('div');
          row.className = 'allocation-row';
          const label = document.createElement('span');
          label.textContent = goalKey === 'other' && portfolioPositions.find((position) => position.goal === goalKey)?.customGoal
            ? portfolioPositions.find((position) => position.goal === goalKey).customGoal
            : portfolioGoals[goalKey];
          const track = document.createElement('div');
          track.className = 'allocation-track';
          const fill = document.createElement('div');
          fill.className = 'allocation-fill';
          const target = goalTargets[goalKey];
          const progressPercent = target ? Math.min((amount / target) * 100, 100) : (totalInvested > 0 ? (amount / totalInvested) * 100 : 0);
          fill.style.width = `${progressPercent}%`;
          track.append(fill);
          const value = document.createElement('span');
          value.className = 'allocation-amount';
          if (target) {
            const remaining = Math.max(0, target - amount);
            value.textContent = `${formatMoney(amount)} / ${formatMoney(target)} · ${progressPercent.toFixed(1)}% · қалды: ${formatMoney(remaining)}`;
          } else {
            value.textContent = `${formatMoney(amount)} · портфельдің ${totalInvested > 0 ? ((amount / totalInvested) * 100).toFixed(1) : '0.0'}%`;
          }
          row.append(label, track, value);
          allocation.append(row);
        });
    }

    renderGoals();

    renderDashboard();
    renderNews();
  }

  function renderTradingView(asset) {
    const container = document.querySelector('#tradingview-chart');
    if (!container) return;
    if (currentChartSymbol === asset.symbol && container.querySelector('iframe, .tradingview-widget-container__widget')) return;
    container.replaceChildren();
    currentChartSymbol = asset.symbol;

    const widget = document.createElement('div');
    widget.className = 'tradingview-widget-container__widget';
    widget.style.height = '100%';
    widget.style.width = '100%';
    container.append(widget);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.textContent = JSON.stringify({
      autosize: true,
      symbol: asset.symbol,
      interval: 'D',
      timezone: 'Asia/Almaty',
      theme: 'light',
      style: '1',
      locale: 'en',
      allow_symbol_change: false,
      calendar: false,
      support_host: 'https://www.tradingview.com'
    });
    const showFallback = () => {
      if (container.querySelector('iframe')) return;
      const fallback = document.createElement('div');
      fallback.className = 'tv-fallback';
      fallback.innerHTML = `<strong>TradingView графигі жүктелмеді</strong><span>Интернет байланысын немесе сыртқы виджетке рұқсатты тексеріңіз.</span><a href="https://www.tradingview.com/chart/?symbol=${encodeURIComponent(asset.symbol)}" target="_blank" rel="noopener noreferrer">TradingView-де ${asset.name} графигін ашу ↗</a>`;
      container.replaceChildren(fallback);
    };
    script.addEventListener('error', showFallback);
    container.append(script);
    window.setTimeout(showFallback, 8000);
  }

  async function loadHistoricalData(asset) {
    if (historicalDataCache.has(asset.yahooSymbol)) return historicalDataCache.get(asset.yahooSymbol);
    const request = (async () => {
      const baseUrl = `/api/market?symbol=${encodeURIComponent(asset.yahooSymbol)}`;
      const [longResponse, dailyResponse] = await Promise.all([
        fetch(`${baseUrl}&range=10y&interval=1mo`, { cache: 'no-store' }),
        fetch(`${baseUrl}&range=2y&interval=1d`, { cache: 'no-store' })
      ]);
      if (!longResponse.ok || !dailyResponse.ok) throw new Error('Нарық деректерінің сервері жауап бермеді.');
      const [longPayload, dailyPayload] = await Promise.all([longResponse.json(), dailyResponse.json()]);
      const parseSeries = (payload) => {
        const result = payload.chart?.result?.[0];
        const timestamps = result?.timestamp || [];
        const closes = result?.indicators?.adjclose?.[0]?.adjclose || result?.indicators?.quote?.[0]?.close || [];
        const series = timestamps.map((timestamp, index) => ({ timestamp, close: Number(closes[index]) }))
          .filter((point) => Number.isFinite(point.close) && point.close > 0);
        if (series.length < 24) throw new Error('Ұзақ мерзімді тарихи қатар жеткіліксіз.');
        return series;
      };
      const longSeries = parseSeries(longPayload);
      const dailySeries = parseSeries(dailyPayload);
      const returns = (series) => series.slice(1).map((point, index) => (point.close / series[index].close) - 1);
      const longReturns = returns(longSeries);
      const dailyReturns = returns(dailySeries);
      const average = dailyReturns.reduce((sum, value) => sum + value, 0) / dailyReturns.length;
      const variance = dailyReturns.reduce((sum, value) => sum + ((value - average) ** 2), 0) / Math.max(1, dailyReturns.length - 1);
      const first = longSeries[0];
      const last = longSeries[longSeries.length - 1];
      const years = Math.max(1, (last.timestamp - first.timestamp) / (365.25 * 24 * 60 * 60));
      const annualReturn = (last.close / first.close) ** (1 / years) - 1;
      const volatility = Math.sqrt(variance * 252);
      const sortedLosses = dailyReturns.map((value) => -value).sort((a, b) => a - b);
      const var95 = Math.max(0, sortedLosses[Math.floor(sortedLosses.length * 0.95)]);
      let peak = longSeries[0].close;
      let maximumDrawdown = 0;
      longSeries.forEach(({ close }) => {
        peak = Math.max(peak, close);
        maximumDrawdown = Math.min(maximumDrawdown, close / peak - 1);
      });
      return {
        annualReturn,
        volatility,
        var95,
        maximumDrawdown,
        currentPrice: last.close,
        longSeries,
        dailyCount: dailySeries.length,
        startDate: new Date(first.timestamp * 1000),
        endDate: new Date(last.timestamp * 1000)
      };
    })();
    historicalDataCache.set(asset.yahooSymbol, request);
    try {
      return await request;
    } catch (error) {
      historicalDataCache.delete(asset.yahooSymbol);
      throw error;
    }
  }

  function formatDate(date) {
    const value = date instanceof Date ? date : new Date(date);
    const day = String(value.getDate()).padStart(2, '0');
    const month = String(value.getMonth() + 1).padStart(2, '0');
    return `${day}.${month}.${value.getFullYear()}`;
  }

  function setResearchLoading(message) {
    document.querySelector('#research-data-badge').textContent = message;
    document.querySelector('#research-mode-label').textContent = 'жүктелуде';
    document.querySelector('#research-disclaimer').textContent = message;
    document.querySelector('#historical-analysis').textContent = message;
  }

  function getFormValues() {
    const values = {
      monthly: readNumber('monthly-input'),
      goal: readNumber('goal-input'),
      years: readNumber('years-input'),
      capital: readNumber('capital-input')
    };
    if (!Object.values(values).every(Number.isFinite) || values.monthly < 0 || values.goal <= 0 || values.capital < 0 || values.years < 1 || values.years > 50 || !Number.isInteger(values.years)) {
      throw new Error('Енгізілген мәндерді тексеріңіз: мерзім 1–50 жыл аралығында, мақсат нөлден үлкен болуы керек.');
    }
    return values;
  }

  function drawSimulationChart(prices) {
    const width = 1200;
    const height = 260;
    const padding = 12;
    const minimum = Math.min(...prices);
    const maximum = Math.max(...prices);
    const span = maximum - minimum || 1;
    const points = prices.map((price, index) => {
      const x = padding + (index / (prices.length - 1)) * (width - padding * 2);
      const y = height - padding - ((price - minimum) / span) * (height - padding * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    const firstPoint = points[0].split(',')[0];
    const lastPoint = points[points.length - 1].split(',')[0];
    document.querySelector('#chart-line').setAttribute('points', points.join(' '));
    document.querySelector('#chart-area').setAttribute('d', `M ${firstPoint} ${height - padding} L ${points.join(' L ')} L ${lastPoint} ${height - padding} Z`);
  }

  async function updateResearch() {
    const asset = assets[assetSelect.value];
    const requestId = ++researchRequestId;
    setResearchLoading(`${asset.name}: соңғы 10 жылдық нақты дерек жүктелуде...`);
    document.querySelector('#selected-asset-name').textContent = asset.name;
    document.querySelector('#research-data-badge').textContent = 'Нарық дерегі жүктелуде...';
    document.querySelector('#research-mode-label').textContent = 'тарихи дерек жүктелуде';
    document.querySelector('#chart-data-label').textContent = 'Дерек жүктелуде';
    document.querySelector('#period-days').textContent = '—';
    document.querySelector('#chart-range-label').textContent = '—';
    document.querySelector('#historical-analysis').textContent = '—';
    document.querySelector('#simulation-chart').hidden = true;
    document.querySelector('#chart-line').setAttribute('points', '');
    document.querySelector('#chart-area').setAttribute('d', '');
    document.querySelectorAll('#metric-return, #metric-volatility, #metric-deviation, #metric-var, #metric-drawdown, #metric-sharpe, #metric-risk-reward, #metric-risk')
      .forEach((element) => { element.textContent = '—'; });
    let historical;
    try {
      historical = await loadHistoricalData(asset);
    } catch (error) {
      if (requestId !== researchRequestId) return;
      document.querySelector('#selected-asset-name').textContent = asset.name;
      document.querySelector('#research-data-badge').textContent = 'Нарық дерегі қолжетімсіз';
      document.querySelector('#research-mode-label').textContent = 'тарихи дерек жоқ';
      document.querySelector('#research-disclaimer').textContent = `Нақты нарық дерегі алынбады: ${error.message} Байланысты тексеріп, кейін қайта жүктеңіз.`;
      document.querySelector('#historical-analysis').textContent = 'Нақты дерек болмағандықтан көрсеткіштер есептелмеді.';
      document.querySelector('#chart-data-label').textContent = 'Дерек жоқ';
      document.querySelector('#period-days').textContent = '—';
      document.querySelector('#chart-range-label').textContent = 'Нақты дерек жүктелмеді';
      document.querySelector('#simulation-chart').hidden = true;
      document.querySelector('#chart-line').setAttribute('points', '');
      document.querySelector('#chart-area').setAttribute('d', '');
      document.querySelectorAll('#metric-return, #metric-volatility, #metric-deviation, #metric-var, #metric-drawdown, #metric-sharpe, #metric-risk-reward, #metric-risk')
        .forEach((element) => { element.textContent = '—'; });
      document.querySelector('#goal-impact-text').textContent = 'Нақты нарық дерегі алынбағандықтан ықтимал сценарий есептелмеді.';
      return;
    }
    if (requestId !== researchRequestId) return;
    const result = {
      prices: historical.longSeries.map((point) => point.close / historical.longSeries[0].close * 100),
      var95: historical.var95,
      maximumDrawdown: historical.maximumDrawdown
    };
    const volatility = historical.volatility;
    const expectedReturn = historical.annualReturn;
    const sharpe = volatility > 0 ? (expectedReturn - 0.03) / volatility : 0;
    const returnVolatilityRatio = volatility > 0 ? expectedReturn / volatility : 0;

    document.querySelector('#selected-asset-name').textContent = asset.name;
    document.querySelector('#research-data-badge').textContent = 'Нақты тарихи дерек · Yahoo Finance';
    document.querySelector('#research-mode-label').textContent = 'нақты тарихи есеп';
    document.querySelector('#simulation-chart').hidden = false;
    document.querySelector('#chart-data-label').textContent = 'Нақты айлық жабылу бағалары';
    document.querySelector('#period-days').textContent = `${historical.dailyCount} күн`;
    document.querySelector('#chart-range-label').textContent = `${formatDate(historical.startDate)} – ${formatDate(historical.endDate)}`;
    document.querySelector('#metric-return').textContent = formatPercent(expectedReturn * 100);
    document.querySelector('#metric-volatility').textContent = formatPercent(volatility * 100);
    const capital = Number(document.querySelector('#capital-input').value);
    document.querySelector('#metric-deviation').textContent = Number.isFinite(capital) && capital > 0
      ? formatMoney(capital * volatility)
      : '—';
    document.querySelector('#metric-var').textContent = Number.isFinite(capital) && capital > 0
      ? formatMoney(capital * result.var95)
      : '—';
    document.querySelector('#metric-drawdown').textContent = formatPercent(result.maximumDrawdown * 100);
    document.querySelector('#metric-sharpe').textContent = sharpe.toFixed(2);
    document.querySelector('#metric-risk-reward').textContent = returnVolatilityRatio.toFixed(2);
    document.querySelector('#metric-risk').textContent = volatility >= 0.4 ? 'Жоғары' : volatility >= 0.2 ? 'Орташа' : 'Төмен';
    document.querySelector('#research-disclaimer').textContent = `${asset.factors} Есеп ${formatDate(historical.startDate)}–${formatDate(historical.endDate)} аралығындағы нақты жабылу бағаларына негізделген. Соңғы қолжетімді жабылу бағасы: ${formatUsd(historical.currentPrice)}. Өткен нәтиже болашақ кіріске кепілдік бермейді.`;
    document.querySelector('#historical-analysis').textContent = `Осы тарихи кезеңдегі CAGR ${formatPercent(expectedReturn * 100)}, жылдық құбылмалылық ${formatPercent(volatility * 100)}, ең терең төмендеу ${formatPercent(historical.maximumDrawdown * 100)}. Бұл өткен деректің есебі, болашақ нәтижесінің болжамы емес.`;
    drawSimulationChart(result.prices);
    if (!document.querySelector('[data-view="research"]').hidden) renderTradingView(asset);
    document.querySelector('#goal-impact-text').textContent = 'Сценарийді есептеу үшін өз кіріс және құбылмалылық мәндеріңізді енгізіңіз.';
  }

  function drawMonteCarloDistribution(results) {
    const chart = document.querySelector('#mc-distribution-chart');
    const binCount = 24;
    const minimum = results[0];
    const maximum = results[results.length - 1];
    const range = maximum - minimum;
    const bins = Array.from({ length: binCount }, () => 0);
    results.forEach((value) => {
      const index = range === 0 ? 0 : Math.min(binCount - 1, Math.floor(((value - minimum) / range) * binCount));
      bins[index] += 1;
    });
    const peak = Math.max(...bins);
    chart.replaceChildren();
    bins.forEach((count, index) => {
      const column = document.createElement('div');
      column.className = 'distribution-bin';
      column.setAttribute('aria-label', `${count} сценарий`);
      column.title = `${count.toLocaleString('kk-KZ')} сценарий`;
      const bar = document.createElement('span');
      bar.style.height = `${Math.max(2, (count / peak) * 100)}%`;
      if (index < Math.floor(binCount * 0.2)) bar.classList.add('distribution-bin-low');
      else if (index >= Math.ceil(binCount * 0.8)) bar.classList.add('distribution-bin-high');
      column.append(bar);
      chart.append(column);
    });
    document.querySelector('#mc-distribution-caption').textContent =
      `${formatMoney(minimum)} – ${formatMoney(maximum)} · ${results.length.toLocaleString('kk-KZ')} сценарий`;
  }

  function calculateGoalProbability() {
    const values = getFormValues();
    const months = values.years * 12;
    const expectedReturn = readNumber('mc-return') / 100;
    const volatility = readNumber('mc-volatility') / 100;
    const trials = Number(document.querySelector('#mc-trials').value);
    if (!Number.isFinite(expectedReturn) || expectedReturn < -0.99 || expectedReturn > 1
      || !Number.isFinite(volatility) || volatility < 0 || volatility > 2
      || ![1000, 5000, 10000].includes(trials)) {
      throw new Error('Кіріс болжамын −99% бен 100%, ал құбылмалылықты 0–200% аралығында енгізіңіз.');
    }
    const monthlyVolatility = volatility / Math.sqrt(12);
    const monthlyDrift = (expectedReturn - (volatility ** 2) / 2) / 12;
    const totalContributions = values.capital + values.monthly * months;
    const results = [];
    let successes = 0;
    let losses = 0;

    for (let trial = 0; trial < trials; trial += 1) {
      let balance = values.capital;
      for (let month = 0; month < months; month += 1) {
        balance = balance * Math.exp(monthlyDrift + monthlyVolatility * normalRandom()) + values.monthly;
      }
      if (!Number.isFinite(balance)) {
        throw new Error('Есеп нәтижесі тым үлкен болды. Кіріс болжамын немесе мерзімді азайтыңыз.');
      }
      results.push(balance);
      if (balance >= values.goal) successes += 1;
      if (balance < totalContributions) losses += 1;
    }

    results.sort((first, second) => first - second);
    const percentile = (value) => results[Math.round((results.length - 1) * value)];
    const average = results.reduce((sum, value) => sum + value / results.length, 0);
    const probability = (successes / trials) * 100;
    document.querySelector('#goal-impact-text').textContent =
      `${values.years} жылға ${trials.toLocaleString('kk-KZ')} сценарий есептелді. Мақсат: ${formatMoney(values.goal)}. Нәтиже ықтимал сценарийлерді көрсетеді, кепілдік емес.`;
    document.querySelector('#mc-p05').textContent = formatMoney(percentile(0.05));
    document.querySelector('#mc-p50').textContent = formatMoney(percentile(0.5));
    document.querySelector('#mc-mean').textContent = formatMoney(average);
    document.querySelector('#mc-p95').textContent = formatMoney(percentile(0.95));
    document.querySelector('#mc-goal-probability').textContent = formatPercent(probability);
    document.querySelector('#mc-loss-probability').textContent = formatPercent((losses / trials) * 100);
    drawMonteCarloDistribution(results);
  }

  function updateFisherCalculation() {
    const error = document.querySelector('#fisher-error');
    const outputs = ['#fisher-real', '#fisher-approx', '#fisher-nominal-value', '#fisher-real-value'];
    outputs.forEach((selector) => { document.querySelector(selector).textContent = '—'; });
    document.querySelector('#fisher-explanation').textContent = '';
    if (Array.from(fisherForm.querySelectorAll('input')).every((input) => input.value === '')) {
      error.hidden = true;
      return;
    }
    if (!fisherForm.checkValidity()) {
      error.textContent = 'Номиналдық кіріс, инфляция, бастапқы сома және мерзім мәндерін тексеріңіз.';
      error.hidden = false;
      return;
    }

    const nominal = readNumber('fisher-nominal') / 100;
    const inflation = readNumber('fisher-inflation') / 100;
    const capital = readNumber('fisher-capital');
    const years = readNumber('fisher-years');
    if (nominal <= -1 || inflation <= -1 || !Number.isInteger(years)) {
      error.textContent = 'Кіріс пен инфляция −100%-дан жоғары, ал мерзім бүтін жыл болуы керек.';
      error.hidden = false;
      return;
    }

    const realReturn = ((1 + nominal) / (1 + inflation)) - 1;
    const approximateReturn = nominal - inflation;
    const nominalValue = capital * ((1 + nominal) ** years);
    const realValue = capital * ((1 + realReturn) ** years);
    if (![realReturn, approximateReturn, nominalValue, realValue].every(Number.isFinite)) {
      error.textContent = 'Нәтиже тым үлкен болды. Пайызды немесе мерзімді азайтыңыз.';
      error.hidden = false;
      return;
    }

    document.querySelector('#fisher-real').textContent = formatPercent(realReturn * 100);
    document.querySelector('#fisher-approx').textContent = formatPercent(approximateReturn * 100);
    document.querySelector('#fisher-nominal-value').textContent = formatMoney(nominalValue);
    document.querySelector('#fisher-real-value').textContent = formatMoney(realValue);
    document.querySelector('#fisher-explanation').textContent = realReturn >= 0
      ? `Номиналдық кіріс пен инфляцияны есептегенде нақты жылдық кіріс ${formatPercent(realReturn * 100)}. ${years} жылдан кейінгі сатып алу қабілеті бүгінгі ақшамен шамамен ${formatMoney(realValue)} болады.`
      : `Инфляция номиналдық кірістен жоғары: нақты жылдық кіріс ${formatPercent(realReturn * 100)}. Номинал сома өскенімен, ${years} жылдан кейінгі сатып алу қабілеті бүгінгі ақшамен шамамен ${formatMoney(realValue)} болады.`;
    error.hidden = true;
  }

  function updateLearningMonteCarlo() {
    const error = document.querySelector('#learn-mc-error');
    const ids = ['learn-mc-capital', 'learn-mc-monthly', 'learn-mc-years', 'learn-mc-return', 'learn-mc-volatility'];
    const fields = ids.map((id) => document.querySelector(`#${id}`));
    ['learn-mc-p05', 'learn-mc-p50', 'learn-mc-mean', 'learn-mc-p95'].forEach((id) => {
      document.querySelector(`#${id}`).textContent = '—';
    });
    document.querySelector('#learn-mc-caption').textContent = 'Өз мәндеріңізді енгізіп, есепті іске қосыңыз';
    document.querySelector('#learn-mc-chart').replaceChildren();
    if (fields.every((field) => field.value === '')) {
      error.hidden = true;
      return;
    }
    if (fields.some((field) => field.value === '' || !field.checkValidity())) {
      error.textContent = 'Өрістердегі мәндер рұқсат етілген аралықта болуы керек.';
      error.hidden = false;
      return;
    }

    const capital = readNumber('learn-mc-capital');
    const monthly = readNumber('learn-mc-monthly');
    const years = readNumber('learn-mc-years');
    const annualReturn = readNumber('learn-mc-return') / 100;
    const volatility = readNumber('learn-mc-volatility') / 100;
    const trials = Number(document.querySelector('#learn-mc-trials').value);
    if (!Number.isInteger(years) || ![500, 1000, 3000].includes(trials)) {
      error.textContent = 'Мерзім бүтін жыл, ал сынақ саны ұсынылған нұсқалардың бірі болуы керек.';
      error.hidden = false;
      return;
    }

    const months = years * 12;
    const monthlyVolatility = volatility / Math.sqrt(12);
    const monthlyDrift = (annualReturn - volatility ** 2 / 2) / 12;
    const results = [];
    for (let trial = 0; trial < trials; trial += 1) {
      let balance = capital;
      for (let month = 0; month < months; month += 1) {
        balance = balance * Math.exp(monthlyDrift + monthlyVolatility * normalRandom()) + monthly;
      }
      if (!Number.isFinite(balance)) {
        error.textContent = 'Нәтиже тым үлкен. Кірісті немесе мерзімді азайтып көріңіз.';
        error.hidden = false;
        return;
      }
      results.push(balance);
    }

    results.sort((first, second) => first - second);
    const percentile = (value) => results[Math.round((results.length - 1) * value)];
    const average = results.reduce((sum, value) => sum + value / results.length, 0);
    document.querySelector('#learn-mc-p05').textContent = formatMoney(percentile(0.05));
    document.querySelector('#learn-mc-p50').textContent = formatMoney(percentile(0.5));
    document.querySelector('#learn-mc-mean').textContent = formatMoney(average);
    document.querySelector('#learn-mc-p95').textContent = formatMoney(percentile(0.95));
    document.querySelector('#learn-mc-caption').textContent =
      `${trials.toLocaleString('kk-KZ')} сценарий · ${formatMoney(results[0])} – ${formatMoney(results[results.length - 1])}`;

    const chart = document.querySelector('#learn-mc-chart');
    const bins = Array.from({ length: 28 }, () => 0);
    const range = results[results.length - 1] - results[0];
    results.forEach((value) => {
      const index = range === 0 ? 0 : Math.min(bins.length - 1, Math.floor(((value - results[0]) / range) * bins.length));
      bins[index] += 1;
    });
    const peak = Math.max(...bins);
    chart.replaceChildren();
    bins.forEach((count, index) => {
      const bar = document.createElement('span');
      bar.className = 'learning-histogram-bar';
      bar.style.height = `${Math.max(2, (count / peak) * 100)}%`;
      bar.title = `${count.toLocaleString('kk-KZ')} сценарий`;
      bar.setAttribute('aria-label', `${count} сценарий`);
      if (index < 5) bar.classList.add('learning-histogram-low');
      if (index >= 23) bar.classList.add('learning-histogram-high');
      chart.append(bar);
    });
    error.hidden = true;
  }

  function updateLearningRisk() {
    const error = document.querySelector('#learn-risk-error');
    const ids = ['learn-risk-capital', 'learn-risk-return', 'learn-risk-volatility', 'learn-risk-free'];
    const fields = ids.map((id) => document.querySelector(`#${id}`));
    ['learn-risk-value', 'learn-risk-deviation', 'learn-risk-var', 'learn-risk-sharpe'].forEach((id) => {
      document.querySelector(`#${id}`).textContent = '—';
    });
    document.querySelector('#learn-risk-marker').setAttribute('hidden', '');
    document.querySelector('#learn-risk-marker-label').setAttribute('hidden', '');
    if (fields.every((field) => field.value === '')) {
      error.hidden = true;
      return;
    }
    if (ids.some((id) => {
      const field = document.querySelector(`#${id}`);
      return field.value === '' || !field.checkValidity();
    })) {
      error.textContent = 'Өрістердегі мәндер рұқсат етілген аралықта болуы керек.';
      error.hidden = false;
      return;
    }

    const capital = readNumber('learn-risk-capital');
    const annualReturn = readNumber('learn-risk-return') / 100;
    const volatility = readNumber('learn-risk-volatility') / 100;
    const riskFree = readNumber('learn-risk-free') / 100;
    const yearEndValue = capital * (1 + annualReturn);
    const deviation = capital * volatility;
    const dailyVar = capital * 1.645 * volatility / Math.sqrt(252);
    const sharpe = volatility > 0 ? (annualReturn - riskFree) / volatility : null;
    if (![yearEndValue, deviation, dailyVar].every(Number.isFinite)) {
      error.textContent = 'Нәтиже тым үлкен. Инвестиция сомасын немесе пайыздарды азайтып көріңіз.';
      error.hidden = false;
      return;
    }

    document.querySelector('#learn-risk-value').textContent = formatMoney(yearEndValue);
    document.querySelector('#learn-risk-deviation').textContent = formatMoney(deviation);
    document.querySelector('#learn-risk-var').textContent = formatMoney(dailyVar);
    document.querySelector('#learn-risk-sharpe').textContent = sharpe === null ? 'Есептелмейді · құбылмалылық 0%' : sharpe.toFixed(2);

    const marker = document.querySelector('#learn-risk-marker');
    const markerLabel = document.querySelector('#learn-risk-marker-label');
    const x = 72 + (Math.min(2, Math.max(0, volatility)) / 2) * 528;
    const y = 270 - ((Math.min(1, Math.max(-0.99, annualReturn)) + 0.99) / 1.99) * 236;
    marker.setAttribute('cx', x.toFixed(1));
    marker.setAttribute('cy', y.toFixed(1));
    marker.removeAttribute('hidden');
    markerLabel.setAttribute('x', Math.min(490, x + 15).toFixed(1));
    markerLabel.setAttribute('y', Math.max(48, y - 13).toFixed(1));
    markerLabel.removeAttribute('hidden');
    error.hidden = true;
  }

  function updateLearningFisher() {
    const error = document.querySelector('#learn-fisher-error');
    const ids = ['learn-fisher-capital', 'learn-fisher-nominal', 'learn-fisher-inflation', 'learn-fisher-years'];
    const fields = ids.map((id) => document.querySelector(`#${id}`));
    ['learn-fisher-real', 'learn-fisher-approx', 'learn-fisher-nominal-value', 'learn-fisher-real-value'].forEach((id) => {
      document.querySelector(`#${id}`).textContent = '—';
    });
    document.querySelector('#learn-fisher-chart').replaceChildren();
    if (fields.every((field) => field.value === '')) {
      error.hidden = true;
      return;
    }
    if (ids.some((id) => {
      const field = document.querySelector(`#${id}`);
      return field.value === '' || !field.checkValidity();
    })) {
      error.textContent = 'Өрістердегі мәндер рұқсат етілген аралықта болуы керек.';
      error.hidden = false;
      return;
    }

    const capital = readNumber('learn-fisher-capital');
    const nominal = readNumber('learn-fisher-nominal') / 100;
    const inflation = readNumber('learn-fisher-inflation') / 100;
    const years = readNumber('learn-fisher-years');
    if (nominal <= -1 || inflation <= -1 || !Number.isInteger(years)) {
      error.textContent = 'Кіріс пен инфляция −100%-дан жоғары, ал мерзім бүтін жыл болуы керек.';
      error.hidden = false;
      return;
    }

    const realReturn = ((1 + nominal) / (1 + inflation)) - 1;
    const approximateReturn = nominal - inflation;
    const nominalValue = capital * (1 + nominal) ** years;
    const realValue = capital * (1 + realReturn) ** years;
    if (![realReturn, approximateReturn, nominalValue, realValue].every(Number.isFinite)) {
      error.textContent = 'Нәтиже тым үлкен болды. Пайызды немесе мерзімді азайтыңыз.';
      error.hidden = false;
      return;
    }

    document.querySelector('#learn-fisher-real').textContent = formatPercent(realReturn * 100);
    document.querySelector('#learn-fisher-approx').textContent = formatPercent(approximateReturn * 100);
    document.querySelector('#learn-fisher-nominal-value').textContent = formatMoney(nominalValue);
    document.querySelector('#learn-fisher-real-value').textContent = formatMoney(realValue);
    const chart = document.querySelector('#learn-fisher-chart');
    chart.replaceChildren();
    const values = Array.from({ length: years + 1 }, (_, year) => ({
      year,
      nominal: capital * (1 + nominal) ** year,
      real: capital * (1 + realReturn) ** year
    }));
    const maximum = Math.max(...values.map((value) => value.nominal), 1);
    values.forEach((value) => {
      const group = document.createElement('div');
      group.className = 'fisher-year-column';
      group.setAttribute('aria-label', `${value.year}-жыл: номинал ${formatMoney(value.nominal)}, сатып алу қабілеті ${formatMoney(value.real)}`);
      group.title = `${value.year}-жыл · номинал: ${formatMoney(value.nominal)} · нақты құн: ${formatMoney(value.real)}`;
      const bars = document.createElement('div');
      bars.className = 'fisher-year-bars';
      [value.nominal, value.real].forEach((amount, index) => {
        const bar = document.createElement('span');
        bar.className = index === 0 ? 'fisher-nominal-bar' : 'fisher-real-bar';
        bar.style.height = `${Math.max(2, (amount / maximum) * 100)}%`;
        bars.append(bar);
      });
      const label = document.createElement('small');
      label.textContent = value.year === 0 || value.year === years || value.year % Math.max(1, Math.ceil(years / 5)) === 0
        ? `${value.year} ж.`
        : '';
      group.append(bars, label);
      chart.append(group);
    });
    error.hidden = true;
  }

  function loadInvestmentProgress() {
    try {
      completedInvestmentLessons = [];
      const stored = window.localStorage.getItem(getUserStorageKey(investmentProgressKey));
      if (!stored) return;
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed) || parsed.some((id) => !investmentLessons.some((lesson) => lesson.id === id))) {
        throw new Error('Сақталған оқу барысының пішімі жарамсыз.');
      }
      const storedLessons = new Set(parsed);
      completedInvestmentLessons = [];
      for (const lesson of investmentLessons) {
        if (!storedLessons.has(lesson.id)) break;
        completedInvestmentLessons.push(lesson.id);
      }
    } catch (error) {
      investmentProgressStatus.textContent = `Оқу барысын оқу мүмкін болмады: ${error.message}`;
      investmentProgressStatus.hidden = false;
    }
  }

  function renderInvestmentProgress() {
    const completedCount = completedInvestmentLessons.length;
    const percentage = Math.round((completedCount / investmentLessons.length) * 100);
    document.querySelector('#investment-progress-percent').textContent = `${percentage}%`;
    document.querySelector('#investment-progress-count').textContent = `${completedCount} / ${investmentLessons.length} сабақ`;
    document.querySelector('#investment-progress-fill').style.width = `${percentage}%`;
    document.querySelector('.investment-progress-track').setAttribute('aria-valuenow', String(percentage));
  }

  function renderInvestmentPathways() {
    const nextLessonIndex = investmentLessons.findIndex((lesson) => !completedInvestmentLessons.includes(lesson.id));
    const unlockedThrough = nextLessonIndex === -1 ? investmentLessons.length - 1 : nextLessonIndex;
    investmentPathways.replaceChildren(...investmentLessons.map((lesson, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'investment-pathway-card';
      const locked = index > unlockedThrough;
      button.classList.toggle('is-locked', locked);
      button.disabled = locked;
      button.dataset.lessonId = lesson.id;
      button.setAttribute('aria-controls', 'investment-lesson-panel');
      button.setAttribute('aria-expanded', 'false');
      if (locked) button.setAttribute('aria-label', `${lesson.title}. Алдыңғы модуль тестінен соң ашылады.`);

      const number = document.createElement('span');
      number.className = 'investment-pathway-number';
      number.textContent = String(index + 1).padStart(2, '0');
      const content = document.createElement('span');
      content.className = 'investment-pathway-content';
      const eyebrow = document.createElement('small');
      eyebrow.textContent = `МОДУЛЬ ${String(index + 1).padStart(2, '0')} / ${String(investmentLessons.length).padStart(2, '0')}`;
      const title = document.createElement('strong');
      title.textContent = lesson.title;
      const description = document.createElement('span');
      description.textContent = locked ? 'Алдыңғы сабақтың тестіне дұрыс жауап беріңіз.' : lesson.description;
      const topicList = document.createElement('span');
      topicList.className = 'investment-pathway-topics';
      topicList.textContent = `Бұл сабақта: ${lesson.topics.join(' · ')}`;
      content.append(eyebrow, title, description);
      if (!locked) content.append(topicList);

      const status = document.createElement('span');
      status.className = 'investment-pathway-status';
      const completed = completedInvestmentLessons.includes(lesson.id);
      status.textContent = locked ? '🔒' : completed ? '✓' : '→';
      if (completed && !locked) status.setAttribute('aria-label', 'Сабақ аяқталған');
      if (locked) status.setAttribute('aria-label', 'Сабақ жабық');
      button.append(number, content, status);
      return button;
    }));
  }

  function loadInvestmentNotebook() {
    const status = document.querySelector('#investment-notebook-status');
    try {
      const stored = window.localStorage.getItem(getUserStorageKey(investmentNotebookKey));
      if (!stored) return;
      const notes = JSON.parse(stored);
      if (!notes || typeof notes.goal !== 'string' || typeof notes.reflection !== 'string') {
        throw new Error('Жазба пішімі жарамсыз.');
      }
      document.querySelector('#investment-notebook-goal').value = notes.goal;
      document.querySelector('#investment-notebook-reflection').value = notes.reflection;
      status.textContent = 'Сақталған жазбалар жүктелді. Өзгерістерді сақтауды ұмытпаңыз.';
      status.classList.remove('is-error');
    } catch (error) {
      status.textContent = `Дәптерді оқу мүмкін болмады: ${error.message}`;
      status.classList.add('is-error');
    }
  }

  function initializeInvestmentNotebook() {
    const goal = document.querySelector('#investment-notebook-goal');
    const reflection = document.querySelector('#investment-notebook-reflection');
    const status = document.querySelector('#investment-notebook-status');
    document.querySelector('#investment-notebook-save').addEventListener('click', () => {
      try {
        window.localStorage.setItem(getUserStorageKey(investmentNotebookKey), JSON.stringify({
          goal: goal.value,
          reflection: reflection.value,
          updatedAt: new Date().toISOString()
        }));
        status.textContent = 'Жазбаларыңыз осы құрылғыда сақталды.';
        status.classList.remove('is-error');
      } catch (error) {
        status.textContent = `Жазбаларды сақтау мүмкін болмады: ${error.message}`;
        status.classList.add('is-error');
      }
    });
    [goal, reflection].forEach((field) => {
      field.addEventListener('input', () => {
        status.textContent = 'Сақталмаған өзгеріс бар.';
        status.classList.remove('is-error');
      });
    });
  }

  function renderInvestmentLessonPlaceholder() {
    investmentLessonPanel.replaceChildren();
    const label = document.createElement('span');
    label.className = 'investment-section-kicker';
    label.textContent = 'КУРС ҚҰРЫЛЫМЫ';
    const title = document.createElement('h3');
    title.textContent = 'Алдымен бір модульді таңдаңыз';
    const description = document.createElement('p');
    description.className = 'investment-lesson-explanation';
    description.textContent = 'Сабақтар негізгі ұғымдардан басталып, активтер мен стратегияларға қарай біртіндеп жалғасады.';
    const steps = document.createElement('ol');
    steps.className = 'investment-lesson-outline';
    ['Қысқа теорияны оқыңыз', 'Мысал арқылы түсініңіз', 'Тесттен өтіп, келесі модульге өтіңіз'].forEach((text) => {
      const step = document.createElement('li');
      step.textContent = text;
      steps.append(step);
    });
    investmentLessonPanel.append(label, title, description, steps);
    investmentLessonPanel.hidden = false;
  }

  function createLessonSvgElement(name, attributes = {}) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', name);
    Object.entries(attributes).forEach(([attribute, value]) => element.setAttribute(attribute, String(value)));
    return element;
  }

  function buildInvestmentLessonVisual(visual) {
    const figure = document.createElement('figure');
    figure.className = `investment-lesson-visual visual-${visual.type}`;
    const heading = document.createElement('h4');
    heading.textContent = visual.title;
    const svg = createLessonSvgElement('svg', {
      viewBox: '0 0 720 270',
      role: 'img',
      'aria-label': visual.title,
      focusable: 'false'
    });
    const text = (x, y, value, className = '') => {
      const label = createLessonSvgElement('text', { x, y, class: className });
      label.textContent = value;
      svg.append(label);
      return label;
    };
    const rect = (x, y, width, height, className = '') => {
      const shape = createLessonSvgElement('rect', { x, y, width, height, rx: 12, class: className });
      svg.append(shape);
      return shape;
    };
    const line = (x1, y1, x2, y2, className = '') => {
      const shape = createLessonSvgElement('line', { x1, y1, x2, y2, class: className });
      svg.append(shape);
      return shape;
    };

    if (visual.type === 'purchasing-power') {
      [54, 104, 154, 204].forEach((y) => line(45, y, 680, y, 'lesson-svg-grid'));
      const bars = [
        { x: 135, height: 126, label: 'Бүгін', value: '100 000 ₸', color: 'lesson-svg-bar-primary' },
        { x: 390, height: 70, label: '10 жылдан соң', value: '≈55 800 ₸', color: 'lesson-svg-bar-secondary' }
      ];
      bars.forEach((bar) => {
        rect(bar.x, 204 - bar.height, 120, bar.height, bar.color);
        text(bar.x + 60, 230, bar.label, 'lesson-svg-label');
        text(bar.x + 60, 204 - bar.height - 13, bar.value, 'lesson-svg-value');
      });
      text(360, 38, '6% жылдық инфляциямен есептелген сатып алу қабілеті', 'lesson-svg-note');
    } else if (visual.type === 'asset-map') {
      const items = [
        ['Акция', 'Компаниядағы үлес', 'Баға мен компания тәуекелі'],
        ['Облигация', 'Қарыз міндеттемесі', 'Эмитент пен мөлшерлеме'],
        ['ETF', 'Қор үлесі', 'Құрам мен комиссия'],
        ['Алтын', 'Тауар активі', 'Баға және сақтау'],
        ['Жылжымайтын мүлік', 'Нақты актив', 'Өтімділік пен шығын'],
        ['Криптоактив', 'Цифрлық актив', 'Жоғары құбылмалылық']
      ];
      items.forEach(([name, type, risk], index) => {
        const column = index % 3;
        const row = Math.floor(index / 3);
        const x = 18 + column * 235;
        const y = 17 + row * 124;
        rect(x, y, 220, 108, index === 5 ? 'lesson-svg-card lesson-svg-card-caution' : 'lesson-svg-card');
        text(x + 15, y + 27, name, 'lesson-svg-card-title');
        text(x + 15, y + 51, type, 'lesson-svg-card-copy');
        text(x + 15, y + 78, `Ескеріңіз: ${risk}`, 'lesson-svg-card-note');
      });
    } else if (visual.type === 'market-flow') {
      const nodes = [
        { x: 16, title: 'Инвестор', copy: 'Шешім қабылдайды', detail: 'Құрал мен көлем' },
        { x: 196, title: 'Брокер', copy: 'Өтінімді қабылдайды', detail: 'Тарифті тексеріңіз' },
        { x: 376, title: 'Биржа', copy: 'Өтінімдерді сәйкестендіреді', detail: 'Сұраныс / ұсыныс' },
        { x: 556, title: 'Мәміле', copy: 'Шарт орындалса', detail: 'Нәтиже кепіл емес' }
      ];
      nodes.forEach((node, index) => {
        rect(node.x, 60, 148, 112, index === 3 ? 'lesson-svg-card lesson-svg-card-success' : 'lesson-svg-card');
        text(node.x + 74, 92, node.title, 'lesson-svg-card-title');
        text(node.x + 74, 119, node.copy, 'lesson-svg-card-copy');
        text(node.x + 74, 146, node.detail, 'lesson-svg-card-note');
        if (index < nodes.length - 1) {
          line(node.x + 151, 116, node.x + 174, 116, 'lesson-svg-connector');
          text(node.x + 163, 105, '›', 'lesson-svg-arrow');
        }
      });
      text(360, 218, 'Өтінімнің орындалуы бағаға, көлемге және нарық өтімділігіне тәуелді', 'lesson-svg-note');
    } else if (visual.type === 'dca-chart') {
      [52, 100, 148, 196].forEach((y) => line(58, y, 670, y, 'lesson-svg-grid'));
      const prices = [155, 85, 125, 64];
      const points = prices.map((y, index) => `${125 + index * 150},${y}`).join(' ');
      svg.append(createLessonSvgElement('polyline', { points, class: 'lesson-svg-line' }));
      prices.forEach((y, index) => {
        const x = 125 + index * 150;
        svg.append(createLessonSvgElement('circle', { cx: x, cy: y, r: 7, class: 'lesson-svg-point' }));
        text(x, 222, `${index + 1}-ай`, 'lesson-svg-label');
        text(x, y - 16, ['10 000 ₸', '8 000 ₸', '12 000 ₸', '9 000 ₸'][index], 'lesson-svg-value');
        const sharesHeight = [39, 49, 33, 44][index];
        rect(x - 18, 190 - sharesHeight, 36, sharesHeight, 'lesson-svg-bar-primary');
        text(x, 193, ['2 үлес', '2,5 үлес', '1,67 үлес', '2,22 үлес'][index], 'lesson-svg-card-note');
      });
      text(360, 26, 'Ай сайынғы бірдей салым: 20 000 ₸ · үлес саны бағаға қарай өзгереді', 'lesson-svg-note');
    } else if (visual.type === 'risk-distribution') {
      [57, 103, 149, 195].forEach((y) => line(58, y, 665, y, 'lesson-svg-grid'));
      svg.append(createLessonSvgElement('path', {
        d: 'M75 195 C170 194 195 176 245 128 C285 89 310 48 360 44 C410 48 435 89 475 128 C525 176 550 194 645 195',
        class: 'lesson-svg-bell'
      }));
      const markers = [
        { x: 195, value: '5%', label: 'Төменгі сценарий' },
        { x: 360, value: '50%', label: 'Орталық мән' },
        { x: 525, value: '95%', label: 'Жоғарғы сценарий' }
      ];
      markers.forEach((marker) => {
        line(marker.x, 78, marker.x, 196, 'lesson-svg-marker');
        text(marker.x, 68, marker.value, 'lesson-svg-value');
        text(marker.x, 222, marker.label, 'lesson-svg-label');
      });
      text(360, 252, 'Ықтимал нәтиже үлестірімі · болашақтың кепілі емес', 'lesson-svg-note');
    } else if (visual.type === 'decision-checklist') {
      const cards = [
        { x: 16, title: 'Нарық сигналы', copy: 'Баға қатты өзгерді' },
        { x: 196, title: 'Үзіліс жаса', copy: 'Бірден шешім қабылдама' },
        { x: 376, title: 'Тексер', copy: 'Мақсат · дерек · тәуекел' },
        { x: 556, title: 'Жоспар', copy: 'Ережеге сай әрекет ет' }
      ];
      cards.forEach((card, index) => {
        rect(card.x, 72, 148, 94, index === 1 ? 'lesson-svg-card lesson-svg-card-caution' : 'lesson-svg-card');
        text(card.x + 74, 108, card.title, 'lesson-svg-card-title');
        text(card.x + 74, 136, card.copy, 'lesson-svg-card-copy');
        if (index < cards.length - 1) {
          line(card.x + 151, 119, card.x + 174, 119, 'lesson-svg-connector');
          text(card.x + 163, 108, '›', 'lesson-svg-arrow');
        }
      });
      text(360, 216, 'Шешімге дейінгі қысқа кідіріс эмоция әсерін азайтуға көмектеседі', 'lesson-svg-note');
    } else if (visual.type === 'learning-roadmap') {
      const steps = [
        ['01', 'Мақсат', 'Не үшін және қашан?'],
        ['02', 'Қаржы негізі', 'Шығын және резерв'],
        ['03', 'Білім', 'Құрал мен тәуекел'],
        ['04', 'Жоспар', 'Қайта қарап отыру']
      ];
      steps.forEach(([number, title, copy], index) => {
        const x = 16 + index * 180;
        rect(x, 67, 148, 122, index === 3 ? 'lesson-svg-card lesson-svg-card-success' : 'lesson-svg-card');
        text(x + 18, 94, number, 'lesson-svg-step-number');
        text(x + 74, 126, title, 'lesson-svg-card-title');
        text(x + 74, 157, copy, 'lesson-svg-card-copy');
        if (index < steps.length - 1) {
          line(x + 151, 128, x + 174, 128, 'lesson-svg-connector');
          text(x + 163, 117, '›', 'lesson-svg-arrow');
        }
      });
      text(360, 229, 'Оқу реті: мақсат → мүмкіндік → түсінікті құрал → жоспарды бақылау', 'lesson-svg-note');
    }

    const caption = document.createElement('figcaption');
    caption.textContent = visual.caption;
    figure.append(heading, svg, caption);
    return figure;
  }

  function openInvestmentLesson(lessonId) {
    const lesson = investmentLessons.find((item) => item.id === lessonId);
    if (!lesson) throw new Error(`Оқу сабағы табылмады: ${lessonId}`);
    const lessonIndex = investmentLessons.indexOf(lesson);
    const nextLessonIndex = investmentLessons.findIndex((item) => !completedInvestmentLessons.includes(item.id));
    const unlockedThrough = nextLessonIndex === -1 ? investmentLessons.length - 1 : nextLessonIndex;
    if (lessonIndex > unlockedThrough) return;
    const panel = investmentLessonPanel;
    panel.replaceChildren();
    panel.hidden = false;

    const header = document.createElement('div');
    header.className = 'investment-lesson-heading';
    const headingCopy = document.createElement('div');
    const kicker = document.createElement('span');
    kicker.className = 'investment-section-kicker';
    kicker.textContent = `МОДУЛЬ ${String(investmentLessons.indexOf(lesson) + 1).padStart(2, '0')} · НЕГІЗГІ САБАҚ`;
    const title = document.createElement('h3');
    title.textContent = lesson.lessonTitle;
    title.tabIndex = -1;
    headingCopy.append(kicker, title);
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'investment-lesson-close';
    closeButton.textContent = 'Жабу ×';
    closeButton.addEventListener('click', () => {
      investmentPathways.querySelectorAll('.investment-pathway-card').forEach((card) => card.setAttribute('aria-expanded', 'false'));
      renderInvestmentLessonPlaceholder();
    });
    header.append(headingCopy, closeButton);

    const lessonBody = document.createElement('div');
    lessonBody.className = 'investment-lesson-body';
    const explanation = document.createElement('p');
    explanation.className = 'investment-lesson-explanation';
    explanation.textContent = lesson.explanation;
    lessonBody.append(explanation, buildInvestmentLessonVisual(lesson.visual));

    const sections = document.createElement('div');
    sections.className = 'investment-lesson-sections';
    lesson.sections.forEach((section) => {
      const article = document.createElement('article');
      article.className = 'investment-lesson-section';
      const heading = document.createElement('h4');
      heading.textContent = section.heading;
      const copy = document.createElement('p');
      copy.textContent = section.text;
      article.append(heading, copy);
      sections.append(article);
    });

    const deepDive = document.createElement('aside');
    deepDive.className = 'investment-lesson-deep-dive';
    const deepDiveTitle = document.createElement('h4');
    deepDiveTitle.textContent = lesson.deepDive.heading;
    const deepDiveText = document.createElement('p');
    deepDiveText.textContent = lesson.deepDive.text;
    deepDive.append(deepDiveTitle, deepDiveText);

    const outcomes = document.createElement('aside');
    outcomes.className = 'investment-lesson-outcomes';
    const outcomesHeading = document.createElement('h4');
    outcomesHeading.textContent = 'Есте сақтаңыз';
    const outcomesList = document.createElement('ul');
    lesson.takeaways.forEach((takeaway) => {
      const item = document.createElement('li');
      item.textContent = takeaway;
      outcomesList.append(item);
    });
    outcomes.append(outcomesHeading, outcomesList);

    const termsHeading = document.createElement('h4');
    termsHeading.textContent = 'Негізгі терминдер';
    const terms = document.createElement('dl');
    terms.className = 'investment-lesson-terms';
    lesson.terms.forEach(([term, definition]) => {
      const termName = document.createElement('dt');
      termName.textContent = term;
      const termDefinition = document.createElement('dd');
      termDefinition.textContent = definition;
      terms.append(termName, termDefinition);
    });
    const example = document.createElement('div');
    example.className = 'investment-lesson-example';
    const exampleTitle = document.createElement('strong');
    exampleTitle.textContent = 'Өмірлік мысал';
    const exampleText = document.createElement('p');
    exampleText.textContent = lesson.example;
    example.append(exampleTitle, exampleText);

    const activity = document.createElement('aside');
    activity.className = 'investment-lesson-activity';
    const activityTitle = document.createElement('strong');
    activityTitle.textContent = lesson.activity.heading;
    const activityText = document.createElement('p');
    activityText.textContent = lesson.activity.text;
    activity.append(activityTitle, activityText);

    const quiz = document.createElement('form');
    quiz.className = 'investment-lesson-quiz';
    const quizHeading = document.createElement('h4');
    quizHeading.textContent = 'Өзіңді тексер';
    const question = document.createElement('p');
    question.textContent = lesson.question;
    const answers = document.createElement('div');
    answers.className = 'investment-quiz-answers';
    lesson.answers.forEach((answer, index) => {
      const label = document.createElement('label');
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = `investment-quiz-${lesson.id}`;
      radio.value = String(index);
      radio.required = true;
      const answerText = document.createElement('span');
      answerText.textContent = answer;
      label.append(radio, answerText);
      answers.append(label);
    });
    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.className = 'investment-quiz-submit';
    submit.textContent = 'Жауапты тексеру';
    const feedback = document.createElement('p');
    feedback.className = 'investment-quiz-feedback';
    feedback.setAttribute('role', 'status');
    feedback.hidden = true;
    const lessonNavigation = document.createElement('div');
    lessonNavigation.className = 'investment-lesson-navigation';
    const nextLesson = investmentLessons[investmentLessons.indexOf(lesson) + 1];
    const nextButton = document.createElement('button');
    nextButton.type = 'button';
    nextButton.className = 'investment-next-lesson';
    nextButton.textContent = nextLesson ? `Келесі сабақ: ${nextLesson.title} →` : 'Курс аяқталды';
    nextButton.disabled = !nextLesson;
    nextButton.hidden = !completedInvestmentLessons.includes(lesson.id);
    if (nextLesson) {
      nextButton.addEventListener('click', () => {
        investmentPathways.querySelectorAll('.investment-pathway-card').forEach((card) => {
          card.setAttribute('aria-expanded', String(card.dataset.lessonId === nextLesson.id));
        });
        openInvestmentLesson(nextLesson.id);
      });
    }
    quiz.append(quizHeading, question, answers, submit, feedback, nextButton);
    quiz.addEventListener('submit', (event) => {
      event.preventDefault();
      const selected = quiz.querySelector(`input[name="investment-quiz-${lesson.id}"]:checked`);
      if (!selected) {
        feedback.textContent = 'Жалғастыру үшін бір жауапты таңдаңыз.';
        feedback.className = 'investment-quiz-feedback is-error';
        feedback.hidden = false;
        return;
      }
      if (Number(selected.value) !== lesson.correctAnswer) {
        feedback.textContent = `Қайта ойланып көр. ${lesson.explanationAnswer.replace(/^Дұрыс\.\s*/, '')}`;
        feedback.className = 'investment-quiz-feedback is-error';
        feedback.hidden = false;
        return;
      }

      feedback.textContent = `Дұрыс жауап. ${lesson.explanationAnswer}`;
      feedback.className = 'investment-quiz-feedback is-correct';
      feedback.hidden = false;
      if (!completedInvestmentLessons.includes(lesson.id)) {
        completedInvestmentLessons.push(lesson.id);
        let saved = true;
        try {
          window.localStorage.setItem(getUserStorageKey(investmentProgressKey), JSON.stringify(completedInvestmentLessons));
          investmentProgressStatus.hidden = true;
        } catch (error) {
          saved = false;
          completedInvestmentLessons = completedInvestmentLessons.filter((id) => id !== lesson.id);
          feedback.textContent += ` Прогресті сақтау мүмкін болмады: ${error.message}`;
          feedback.className = 'investment-quiz-feedback is-error';
        }
        renderInvestmentProgress();
        renderInvestmentPathways();
        const updatedCard = investmentPathways.querySelector(`[data-lesson-id="${lesson.id}"]`);
        if (updatedCard) updatedCard.setAttribute('aria-expanded', 'true');
        nextButton.hidden = !saved || !nextLesson;
      }
    });

    panel.append(header, lessonBody, sections, deepDive, outcomes, termsHeading, terms, example, activity, quiz);
    title.focus({ preventScroll: true });
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function initializeInvestmentScenarioSimulation() {
    const startButton = document.querySelector('#investment-simulation-start');
    const wizard = document.querySelector('#investment-simulation-wizard');
    const closeButton = document.querySelector('#investment-scenario-close');
    const form = document.querySelector('#investment-scenario-form');
    const steps = Array.from(form.querySelectorAll('.investment-scenario-step'));
    const backButton = document.querySelector('#investment-scenario-back');
    const nextButton = document.querySelector('#investment-scenario-next');
    const submitButton = document.querySelector('#investment-scenario-submit');
    const error = document.querySelector('#investment-scenario-error');
    const progress = document.querySelector('.investment-scenario-progress');
    const progressFill = document.querySelector('#investment-scenario-progress-fill');
    const results = document.querySelector('#investment-simulation-results');
    const reserveChoice = document.querySelector('#scenario-has-reserve');
    const reserveField = document.querySelector('#scenario-reserve-field');
    const reserveInput = document.querySelector('#scenario-reserve');
    let currentStep = 0;

    const renderStep = () => {
      steps.forEach((step, index) => {
        step.hidden = index !== currentStep;
      });
      backButton.hidden = currentStep === 0;
      nextButton.hidden = currentStep === steps.length - 1;
      submitButton.hidden = currentStep !== steps.length - 1;
      progress.setAttribute('aria-valuenow', String(currentStep + 1));
      progressFill.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
      error.hidden = true;
    };

    const validateCurrentStep = () => {
      const invalidField = steps[currentStep].querySelector(':invalid');
      if (invalidField) {
        invalidField.reportValidity();
        return false;
      }
      return true;
    };

    const currency = (value) => `${Math.round(value).toLocaleString('kk-KZ')} ₸`;
    const percent = (value) => `${value.toFixed(2).replace('.', ',')}%`;
    const labelForGoal = (value) => ({
      home: 'үй немесе баспана',
      education: 'білім',
      reserve: 'қаржылық қор',
      retirement: 'ұзақ мерзімді қор',
      other: 'жеке мақсатыңыз'
    })[value] || 'қаржылық мақсат';

    reserveChoice.addEventListener('change', () => {
      const hasReserve = reserveChoice.value === 'yes';
      reserveField.hidden = !hasReserve;
      reserveInput.required = hasReserve;
      reserveInput.disabled = !hasReserve;
      if (!hasReserve) reserveInput.value = '0';
    });

    startButton.addEventListener('click', () => {
      wizard.hidden = false;
      results.hidden = true;
      currentStep = 0;
      renderStep();
      wizard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    closeButton.addEventListener('click', () => {
      wizard.hidden = true;
      results.hidden = true;
      startButton.focus();
    });

    nextButton.addEventListener('click', () => {
      if (!validateCurrentStep()) return;
      currentStep += 1;
      renderStep();
    });

    backButton.addEventListener('click', () => {
      currentStep = Math.max(0, currentStep - 1);
      renderStep();
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!validateCurrentStep()) return;
      error.hidden = true;

      const initial = Number(document.querySelector('#scenario-initial').value);
      const monthly = Number(document.querySelector('#scenario-monthly').value);
      const expenses = Number(document.querySelector('#scenario-expenses').value);
      const hasReserve = reserveChoice.value === 'yes';
      const reserve = hasReserve ? Number(reserveInput.value) : 0;
      const target = Number(document.querySelector('#scenario-target').value);
      const years = Number(document.querySelector('#scenario-years').value);
      const inflation = Number(document.querySelector('#scenario-inflation').value) / 100;
      const annualReturn = Number(document.querySelector('#scenario-return').value) / 100;
      const annualVolatility = Number(document.querySelector('#scenario-volatility').value) / 100;
      const values = [initial, monthly, expenses, reserve, target, years, inflation, annualReturn, annualVolatility];
      const nonNegativeValues = [initial, monthly, expenses, reserve, target, years, inflation, annualVolatility];
      if (!values.every(Number.isFinite) || nonNegativeValues.some((value) => value < 0) || years < 1 || years > 50
        || inflation >= 1 || annualReturn <= -1 || annualReturn > 1 || annualVolatility > 2) {
        error.textContent = 'Мәндерді тексеріңіз: мерзім 1–50 жыл, кіріс −99–100%, құбылмалылық 0–200% аралығында болуы керек.';
        error.hidden = false;
        return;
      }

      const months = Math.round(years * 12);
      const monthlyReturn = (1 + annualReturn) ** (1 / 12) - 1;
      let projectedBalance = initial;
      for (let month = 0; month < months; month += 1) {
        projectedBalance = projectedBalance * (1 + monthlyReturn) + monthly;
      }
      const totalContributions = initial + monthly * months;
      const projectedRealValue = projectedBalance / ((1 + inflation) ** years);
      const exactRealReturn = ((1 + annualReturn) / (1 + inflation) - 1) * 100;
      const monthlyWithoutReturns = Math.max(0, (target - initial) / months);

      const samples = [];
      const scenarioCount = 1000;
      const monthlyVolatility = annualVolatility / Math.sqrt(12);
      const logDrift = Math.log(1 + annualReturn) / 12 - (monthlyVolatility ** 2) / 2;
      for (let trial = 0; trial < scenarioCount; trial += 1) {
        let balance = initial;
        const path = [balance];
        for (let month = 0; month < months; month += 1) {
          balance *= Math.exp(logDrift + monthlyVolatility * normalRandom());
          balance += monthly;
          if ((month + 1) % 12 === 0) path.push(balance);
        }
        samples.push({ balance, path });
      }
      samples.sort((left, right) => left.balance - right.balance);
      const percentile = (fraction) => samples[Math.min(samples.length - 1, Math.floor(fraction * (samples.length - 1)))];
      const goalLikelihood = (samples.filter((sample) => sample.balance >= target).length / samples.length) * 100;
      const lowerScenario = percentile(0.05);
      const medianScenario = percentile(0.5);
      const upperScenario = percentile(0.95);
      const lowerRange = lowerScenario.balance;
      const median = medianScenario.balance;
      const upperRange = upperScenario.balance;

      results.replaceChildren();
      results.hidden = false;
      results.classList.remove('is-visible');

      const resultHeader = document.createElement('header');
      resultHeader.className = 'investment-scenario-result-heading';
      const resultLabel = document.createElement('span');
      resultLabel.className = 'investment-section-kicker';
      resultLabel.textContent = 'СІЗДІҢ ОҚУ СЦЕНАРИЙІҢІЗ';
      const resultTitle = document.createElement('h3');
      resultTitle.textContent = `${labelForGoal(document.querySelector('#scenario-goal').value)} мақсаты`;
      const resultIntro = document.createElement('p');
      resultIntro.textContent = `${years} жыл · ${currency(initial)} бастапқы сома · айына ${currency(monthly)} · енгізілген кіріс ${percent(annualReturn * 100)} · құбылмалылық ${percent(annualVolatility * 100)}`;
      resultHeader.append(resultLabel, resultTitle, resultIntro);

      const summaryGrid = document.createElement('div');
      summaryGrid.className = 'investment-scenario-summary';
      const summaries = [
        { label: 'Күрделі пайыз моделі', value: currency(projectedBalance), detail: `Өз салымыңыз: ${currency(totalContributions)}` },
        { label: 'Бүгінгі сатып алу қабілеті', value: currency(projectedRealValue), detail: `Сіз енгізген ${percent(inflation * 100)} мөлшерлемесімен` },
        { label: 'Нақты жылдық кіріс', value: percent(exactRealReturn), detail: 'Fisher теңдеуі бойынша' },
        { label: 'Модельдің медианасы', value: currency(median), detail: `Мақсатқа жеткен сынақ үлесі: ${percent(goalLikelihood)}` }
      ];
      summaries.forEach((item, index) => {
        const card = document.createElement('article');
        card.className = 'investment-scenario-metric';
        card.style.setProperty('--scenario-order', String(index));
        const label = document.createElement('span');
        label.textContent = item.label;
        const value = document.createElement('strong');
        value.textContent = item.value;
        const detail = document.createElement('small');
        detail.textContent = item.detail;
        card.append(label, value, detail);
        summaryGrid.append(card);
      });

      const chartCard = document.createElement('article');
      chartCard.className = 'investment-scenario-chart-card';
      const chartHeading = document.createElement('div');
      chartHeading.className = 'investment-scenario-chart-heading';
      const chartTitle = document.createElement('h4');
      chartTitle.textContent = 'Бір мақсат, әртүрлі ықтимал жол';
      const chartNote = document.createElement('p');
      chartNote.textContent = 'Monte Carlo модель · енгізілген кіріс пен құбылмалылыққа негізделген сценарийлер';
      chartHeading.append(chartTitle, chartNote);
      const chart = createLessonSvgElement('svg', {
        viewBox: '0 0 720 290',
        role: 'img',
        'aria-label': `${years} жыл ішіндегі модельдік сценарийлердің капитал өзгерісі`
      });
      [50, 100, 150, 200].forEach((y) => {
        chart.append(createLessonSvgElement('line', { x1: 58, x2: 690, y1: y, y2: y, class: 'scenario-chart-gridline' }));
      });
      chart.append(createLessonSvgElement('line', { x1: 58, x2: 690, y1: 235, y2: 235, class: 'scenario-chart-axis' }));
      const chartPaths = [
        { sample: lowerScenario, className: 'scenario-line-low' },
        { sample: medianScenario, className: 'scenario-line-mid' },
        { sample: upperScenario, className: 'scenario-line-high' }
      ];
      const pathValues = chartPaths.flatMap((path) => path.sample.path);
      const minimum = Math.min(...pathValues);
      const maximum = Math.max(...pathValues, minimum + 1);
      chartPaths.forEach(({ sample, className }) => {
        const pathValuesForLine = sample.path;
        const points = pathValuesForLine.map((value, index) => {
          const x = 62 + (index / years) * 620;
          const y = 222 - ((value - minimum) / (maximum - minimum)) * 174;
          return `${x.toFixed(1)},${y.toFixed(1)}`;
        }).join(' ');
        chart.append(createLessonSvgElement('polyline', { points, pathLength: 1, class: `scenario-chart-line ${className}` }));
      });
      const startLabel = createLessonSvgElement('text', { x: 62, y: 260, class: 'scenario-chart-label' });
      startLabel.textContent = 'Бастапқы нүкте';
      const endLabel = createLessonSvgElement('text', { x: 678, y: 260, class: 'scenario-chart-label', 'text-anchor': 'end' });
      endLabel.textContent = `${years} жыл`;
      chart.append(startLabel, endLabel);
      const legend = document.createElement('div');
      legend.className = 'investment-scenario-legend';
      [
        ['scenario-line-low', `Төмен сценарий · ${currency(lowerRange)}`],
        ['scenario-line-mid', `Медиана · ${currency(median)}`],
        ['scenario-line-high', `Жоғары сценарий · ${currency(upperRange)}`]
      ].forEach(([className, labelText]) => {
        const item = document.createElement('span');
        const marker = document.createElement('i');
        marker.className = className;
        const text = document.createElement('span');
        text.textContent = labelText;
        item.append(marker, text);
        legend.append(item);
      });
      chartCard.append(chartHeading, chart, legend);

      const journeyTitle = document.createElement('div');
      journeyTitle.className = 'investment-scenario-journey-heading';
      const journeyKicker = document.createElement('span');
      journeyKicker.className = 'investment-section-kicker';
      journeyKicker.textContent = 'КЕЛЕСІ ҚАДАМДАР';
      const journeyHeading = document.createElement('h4');
      journeyHeading.textContent = 'Мақсатқа қарай оқу және әрекет реті';
      journeyTitle.append(journeyKicker, journeyHeading);
      const journey = document.createElement('ol');
      journey.className = 'investment-scenario-journey';
      const reserveMessage = hasReserve
        ? `Енгізген резервіңіз: ${currency(reserve)}. Бұл модель оның сізге жеткілікті екенін бағаламайды.`
        : 'Сіз резервіңіз бар деп көрсетпедіңіз. Өз қажеттілігіңізге сай резервті бөлек жоспарлаңыз.';
      const gap = monthlyWithoutReturns - monthly;
      const savingMessage = monthlyWithoutReturns === 0
        ? 'Енгізген бастапқы соманың өзі мақсат сомасына тең немесе одан жоғары. Бұл есеп кіріс/шығын, салық және баға өзгерісін толық қамтымайды.'
        : gap > 0
          ? `Кіріс өсімін есептемейтін қарапайым салыстыруда мақсатқа жету үшін айына ${currency(monthlyWithoutReturns)} бөлу қажет болар еді. Бұл енгізген сомаңыздан ${currency(gap)} жоғары; мерзім, мақсат сомасы және айлық бюджетті есеп ретінде салыстырыңыз.`
          : `Кіріс пен инфляцияны есептемейтін қарапайым салыстыруда айына ${currency(monthly)} бөлу ${currency(monthlyWithoutReturns)} мөлшеріндегі межеден жоғары. Бұл мақсатқа жетуге кепіл емес.`;
      const journeySteps = [
        { title: '1. Қауіпсіздік қорын бағалаңыз', text: reserveMessage },
        { title: '2. Мақсат пен айлық мүмкіндікті салыстырыңыз', text: savingMessage },
        { title: '3. Күрделі пайыз бен инфляцияны бірге қараңыз', text: `${currency(totalContributions)} — сіз енгізген жалпы ақша; базалық модельдегі сома ${currency(projectedBalance)}. Бүгінгі сатып алу қабілеті инфляция болжамымен ${currency(projectedRealValue)} шамасында.` },
        { title: '4. Белгісіз сценарийлерді зерттеңіз', text: `Симуляциядағы 5–95 процентиль аралығы ${currency(lowerRange)} мен ${currency(upperRange)} аралығында, ал мақсат сомасына жеткен сынақ үлесі ${percent(goalLikelihood)} болды. Бұл тек модель ішіндегі нәтиже.` }
      ];
      journeySteps.forEach((step, index) => {
        const item = document.createElement('li');
        item.className = 'investment-scenario-step-card';
        item.style.setProperty('--scenario-order', String(index));
        const number = document.createElement('span');
        number.className = 'investment-scenario-step-number';
        number.textContent = String(index + 1).padStart(2, '0');
        const content = document.createElement('div');
        const heading = document.createElement('h5');
        heading.textContent = step.title;
        const copy = document.createElement('p');
        copy.textContent = step.text;
        content.append(heading, copy);
        item.append(number, content);
        journey.append(item);
      });

      const disclaimer = document.createElement('p');
      disclaimer.className = 'investment-scenario-disclaimer';
      disclaimer.textContent = 'Бұл — өзіңіз енгізген шарттар бойынша есептелген математикалық сценарий; нарықтағы нақты кірісті, комиссияны, салықты немесе инфляцияны болжамайды. Инвестициялық кеңес емес.';
      const recalculate = document.createElement('button');
      recalculate.type = 'button';
      recalculate.className = 'investment-scenario-edit';
      recalculate.textContent = 'Жауаптарды өзгертіп, қайта есептеу';
      recalculate.addEventListener('click', () => {
        results.hidden = true;
        currentStep = 0;
        renderStep();
        steps[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      results.append(resultHeader, summaryGrid, chartCard, journeyTitle, journey, disclaimer, recalculate);
      results.classList.remove('is-visible');
      requestAnimationFrame(() => results.classList.add('is-visible'));
      results.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    reserveChoice.dispatchEvent(new Event('change'));
    renderStep();
  }

  renderInvestmentLessonPlaceholder();
  initializeInvestmentNotebook();
  initializeInvestmentScenarioSimulation();
  investmentPathways.addEventListener('click', (event) => {
    const card = event.target.closest('.investment-pathway-card');
    if (!card) return;
    investmentPathways.querySelectorAll('.investment-pathway-card').forEach((item) => item.setAttribute('aria-expanded', String(item === card)));
    openInvestmentLesson(card.dataset.lessonId);
  });

  const openNextInvestmentLesson = () => {
    const nextLesson = investmentLessons.find((lesson) => !completedInvestmentLessons.includes(lesson.id)) || investmentLessons[0];
    document.querySelector('#investment-pathways-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
    investmentPathways.querySelectorAll('.investment-pathway-card').forEach((card) => {
      card.setAttribute('aria-expanded', String(card.dataset.lessonId === nextLesson.id));
    });
    openInvestmentLesson(nextLesson.id);
  };
  document.querySelector('#academy-open-general-investment').addEventListener('click', () => {
    academyOverview.hidden = true;
    generalInvestmentContent.hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    openNextInvestmentLesson();
  });
  document.querySelector('#academy-back-to-overview').addEventListener('click', () => {
    generalInvestmentContent.hidden = true;
    academyOverview.hidden = false;
    document.querySelector('#academy-open-general-investment').focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  document.querySelector('#investment-start-learning').addEventListener('click', openNextInvestmentLesson);
  document.querySelector('#investment-resume-learning').addEventListener('click', openNextInvestmentLesson);

  if (menuToggle && appShell) {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.addEventListener('click', () => {
      const isOpen = appShell.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      const target = item.dataset.page;

      navItems.forEach((navItem) => navItem.classList.remove('active'));
      item.classList.add('active');
      appShell.classList.remove('open');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');

      if (target) {
        pageViews.forEach((view) => {
          const isTarget = view.dataset.view === target;
          view.hidden = !isTarget;
          view.classList.toggle('active', isTarget);
        });
        if (target === 'research') {
          currentChartSymbol = null;
          requestAnimationFrame(() => renderTradingView(assets[assetSelect.value]));
        }
        if (target === 'portfolio') renderPortfolio();
        if (target === 'goals') renderGoals();
        if (target === 'news') renderNews();
        if (pendingPageScrollTarget) {
          const destination = document.getElementById(pendingPageScrollTarget);
          pendingPageScrollTarget = null;
          if (!destination) throw new Error('Өту керек есептегіш беттен табылмады.');
          requestAnimationFrame(() => destination.scrollIntoView({ behavior: 'smooth', block: 'start' }));
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    });
  });

  document.querySelectorAll('[data-open-page]').forEach((button) => {
    button.addEventListener('click', () => {
      const targetItem = navItems.find((item) => item.dataset.page === button.dataset.openPage);
      if (targetItem) {
        pendingPageScrollTarget = button.dataset.scrollTarget || null;
        targetItem.click();
      }
    });
  });

  document.querySelectorAll('[data-open-topic]').forEach((button) => {
    button.addEventListener('click', () => {
      const targetView = `${button.dataset.openTopic}-details`;
      navItems.forEach((item) => item.classList.toggle('active', item.dataset.page === 'research'));
      pageViews.forEach((view) => {
        const isTarget = view.dataset.view === targetView;
        view.hidden = !isTarget;
        view.classList.toggle('active', isTarget);
      });
      const destination = button.dataset.scrollTarget
        ? document.getElementById(button.dataset.scrollTarget)
        : null;
      if (button.dataset.scrollTarget && !destination) throw new Error('Өту керек есептегіш табылмады.');
      if (destination) {
        requestAnimationFrame(() => destination.scrollIntoView({ behavior: 'smooth', block: 'start' }));
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  document.querySelector('#goal-navigator').addEventListener('click', (event) => {
    const button = event.target.closest('[data-add-goal]');
    if (!button) return;
      navItems.find((item) => item.dataset.page === 'portfolio').click();
      document.querySelector('#portfolio-goal').value = button.dataset.addGoal;
      document.querySelector('#portfolio-goal').dispatchEvent(new Event('change', { bubbles: true }));
  });
  document.querySelector('#goal-navigator').addEventListener('change', (event) => {
    const input = event.target.closest('[data-goal-target]');
    if (!input) return;
    if (!input.checkValidity()) {
      goalTargetStatus = 'Мақсат сомасы нөлден үлкен болуы керек.';
      document.querySelector('#goal-target-status').textContent = goalTargetStatus;
      return;
    }

    const target = input.value === '' ? null : Number(input.value);
    if (target !== null && (!Number.isFinite(target) || target <= 0)) {
      goalTargetStatus = 'Мақсат сомасының мәнін тексеріңіз.';
      document.querySelector('#goal-target-status').textContent = goalTargetStatus;
      return;
    }
    goalTargets[input.dataset.goalTarget] = target;
    try {
      window.localStorage.setItem(getUserStorageKey(goalTargetsStorageKey), JSON.stringify(goalTargets));
      goalTargetStatus = 'Мақсат сомасы осы браузерде сақталды.';
    } catch (error) {
      goalTargetStatus = `Мақсат сомасы сақталмады: ${error.message}`;
    }
    renderGoals();
  });

  if (portfolioForm) {
    portfolioForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!portfolioForm.reportValidity()) return;

      const investmentAmount = Number(document.querySelector('#portfolio-investment-amount').value);
      const quantity = Number(document.querySelector('#portfolio-quantity').value);
      const marketPrice = Number(document.querySelector('#portfolio-market-price').value);
      const asset = document.querySelector('#portfolio-asset').value;
      const goal = document.querySelector('#portfolio-goal').value;
      const customGoalInput = document.querySelector('#portfolio-custom-goal');
      const customGoal = customGoalInput.value.trim();
      if (!Number.isFinite(investmentAmount) || investmentAmount < 100 || !Number.isFinite(quantity) || quantity <= 0
        || !Number.isFinite(marketPrice) || marketPrice <= 0 || !Object.hasOwn(portfolioAssets, asset) || !Object.hasOwn(portfolioGoals, goal)
        || (goal === 'other' && !customGoal)) {
        setPortfolioStatus('Салынатын сома мен нақты актив бағасын тексеріңіз.', true);
        return;
      }

      const id = typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      portfolioPositions.unshift({ id, asset, quantity, priceUsd: marketPrice, marketPriceUsd: marketPrice, goal, customGoal, createdAt: Date.now() });
      savePortfolio();
      renderPortfolio();
    });
  }

  if (portfolioList) {
    portfolioList.addEventListener('change', (event) => {
      const input = event.target.closest('[data-position-price]');
      if (!input) return;
      const priceUsd = Number(input.value);
      if (!Number.isFinite(priceUsd) || priceUsd <= 0 || priceUsd > 1000000000) {
        setPortfolioStatus('Ағымдағы бірлік бағасы USD-мен нөлден үлкен болуы керек.', true);
        renderPortfolio();
        return;
      }
      const position = portfolioPositions.find((entry) => entry.id === input.dataset.positionPrice);
      if (!position) {
        setPortfolioStatus('Бағасын жаңарту керек позиция табылмады.', true);
        return;
      }
      position.marketPriceUsd = priceUsd;
      savePortfolio();
      renderPortfolio();
    });

    portfolioList.addEventListener('click', (event) => {
      const button = event.target.closest('[data-position-id]');
      if (!button) return;
      portfolioPositions = portfolioPositions.filter((position) => position.id !== button.dataset.positionId);
      savePortfolio();
      renderPortfolio();
    });
  }

  const clearPortfolioButton = document.querySelector('#clear-portfolio');
  if (clearPortfolioButton) {
    clearPortfolioButton.addEventListener('click', () => {
      if (!window.confirm('Портфельдегі барлық позицияны өшіресіз бе?')) return;
      portfolioPositions = [];
      savePortfolio();
      renderPortfolio();
    });
  }

  if (portfolioForm) {
    const goalSelect = document.querySelector('#portfolio-goal');
    const customGoalField = document.querySelector('#portfolio-custom-goal-field');
    const customGoalInput = document.querySelector('#portfolio-custom-goal');
    const updateCustomGoalField = () => {
      const isCustom = goalSelect.value === 'other';
      customGoalField.hidden = !isCustom;
      customGoalInput.required = isCustom;
      if (!isCustom) customGoalInput.value = '';
    };
    goalSelect.addEventListener('change', updateCustomGoalField);
    updateCustomGoalField();
    document.querySelector('#portfolio-asset').addEventListener('change', (event) => {
      const asset = event.target.value;
      const unit = portfolioAssetUnits[asset];
      document.querySelector('#portfolio-quantity-label').textContent = `Осы сомаға алынатын ${unit.unit} саны`;
      const currency = getAssetCurrencyLabel(asset);
      document.querySelector('#portfolio-market-price-label').textContent = `Соңғы нарық бағасы, ${currency} / ${unit.priceUnit}`;
      document.querySelector('#portfolio-market-price').value = '';
      document.querySelector('#portfolio-quantity').value = '';
      const currentPriceRequest = asset === 'deposit'
        ? Promise.reject(new Error('Депозиттің бағасы мен шарттары банкке байланысты, автоматты нарық дерегі жоқ.'))
        : loadCurrentAssetPrice(asset);
      currentPriceRequest
        .then((currentPrice) => {
          if (document.querySelector('#portfolio-asset').value !== asset) return;
          document.querySelector('#portfolio-market-price').value = currentPrice.toFixed(2);
          updateInvestmentPreview();
          setPortfolioStatus(`${portfolioAssets[asset]} нақты бағасы жаңартылды: ${formatAssetCurrency(currentPrice, asset)}.`);
        })
        .catch((error) => {
          setPortfolioStatus(`Нақты баға алынбады: ${error.message}`, true);
        });
    });
    document.querySelector('#portfolio-investment-amount').addEventListener('input', updateInvestmentPreview);
  }

  if (compoundForm) {
    compoundForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!compoundForm.reportValidity()) return;
      updateCompoundInterest();
    });
    compoundForm.querySelectorAll('input').forEach((input) => {
      input.addEventListener('input', updateCompoundInterest);
    });
    compoundUsePortfolioButton.addEventListener('click', () => {
      const totalInvested = portfolioPositions.reduce((sum, position) => sum + getPositionInvested(position), 0);
      document.querySelector('#compound-initial').value = String(Math.round(totalInvested));
      updateCompoundInterest();
    });
    compoundHistoricalButton.addEventListener('click', () => {
      calculateHistoricalCompound().catch((error) => {
        document.querySelector('#compound-error').textContent = error.message;
        document.querySelector('#compound-error').hidden = false;
        document.querySelector('#compound-historical-status').textContent = 'Нақты тарихи есеп орындалмады.';
      });
    });
    updateCompoundInterest();
  }

  document.querySelector('#welcome-start').addEventListener('click', () => showWelcomeStep('questions'));
  document.querySelector('#welcome-back-intro').addEventListener('click', () => showWelcomeStep('intro'));
  document.querySelector('#welcome-back-questions').addEventListener('click', () => showWelcomeStep('questions'));
  document.querySelector('#welcome-login').addEventListener('click', openSignup);
  document.querySelector('#registration-login').addEventListener('click', openSignup);
  document.querySelector('#login-register').addEventListener('click', () => {
    signupDialog.close();
    welcomeScreen.hidden = false;
    showWelcomeStep('questions');
  });
  document.querySelector('#interest-form').addEventListener('submit', (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    registrationError.hidden = true;
    welcomeError.hidden = true;
    showWelcomeStep('register');
    document.querySelector('#registration-name').focus();
  });

  registrationForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    registrationError.hidden = true;
    if (!registrationForm.reportValidity()) return;
    const submit = document.querySelector('#registration-submit');
    submit.disabled = true;
    try {
      const { user } = await requestAuth('/api/auth/register', {
        name: document.querySelector('#registration-name').value.trim(),
        username: document.querySelector('#registration-username').value.trim(),
        password: document.querySelector('#registration-password').value,
        interest: document.querySelector('#signup-interest').value,
        plan: document.querySelector('#signup-plan').value.trim()
      });
      registrationForm.reset();
      document.querySelector('#interest-form').reset();
      showAuthenticatedUser(user);
    } catch (error) {
      registrationError.textContent = error.message;
      registrationError.hidden = false;
    } finally {
      submit.disabled = false;
    }
  });

  signupOpenButton.addEventListener('click', openSignup);
  document.querySelector('#signup-close').addEventListener('click', () => signupDialog.close());
  signupDialog.addEventListener('click', (event) => {
    if (event.target === signupDialog) signupDialog.close();
  });

  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    signupError.hidden = true;
    if (!signupForm.reportValidity()) return;
    const submit = document.querySelector('#login-submit');
    submit.disabled = true;
    try {
      const { user } = await requestAuth('/api/auth/login', {
        username: document.querySelector('#login-username').value.trim(),
        password: document.querySelector('#login-password').value
      });
      signupForm.reset();
      signupDialog.close();
      showAuthenticatedUser(user);
    } catch (error) {
      signupError.textContent = error.message;
      signupError.hidden = false;
    } finally {
      submit.disabled = false;
    }
  });

  accountLogoutButton.addEventListener('click', async () => {
    accountLogoutButton.disabled = true;
    try {
      await requestAuth('/api/auth/logout', {});
      localProfile = null;
      loadedUserStorageKey = null;
      appShell.hidden = true;
      welcomeScreen.hidden = false;
      showWelcomeStep('intro');
    } catch (error) {
      signupError.textContent = `Аккаунттан шығу мүмкін болмады: ${error.message}`;
      signupError.hidden = false;
      if (!signupDialog.open) signupDialog.showModal();
    } finally {
      accountLogoutButton.disabled = false;
    }
  });

  restoreSession();

  if (researchForm) {
    researchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!researchForm.reportValidity()) return;
      try {
        updateResearch().catch((error) => {
          document.querySelector('#goal-impact-text').textContent = error.message;
        });
      } catch (error) {
        document.querySelector('#goal-impact-text').textContent = error.message;
      }
    });

    updateResearch().catch((error) => {
      document.querySelector('#goal-impact-text').textContent = error.message;
    });
  }

  if (assetSelect) {
    assetSelect.addEventListener('change', () => {
      try {
        updateResearch().catch((error) => {
          document.querySelector('#goal-impact-text').textContent = error.message;
        });
      } catch (error) {
        document.querySelector('#goal-impact-text').textContent = error.message;
      }
    });
  }

  if (monteCarloButton) {
    monteCarloButton.addEventListener('click', () => {
      try {
        if (!document.querySelector('#mc-return').checkValidity() || !document.querySelector('#mc-volatility').checkValidity()) {
          throw new Error('Кіріс болжамы мен құбылмалылық мәндерін тексеріңіз.');
        }
        calculateGoalProbability();
      } catch (error) {
        document.querySelector('#goal-impact-text').textContent = error.message;
      }
    });
  }

  if (fisherForm) {
    fisherForm.addEventListener('submit', (event) => event.preventDefault());
    fisherForm.querySelectorAll('input').forEach((input) => {
      input.addEventListener('input', updateFisherCalculation);
    });
    updateFisherCalculation();
  }

  document.querySelector('#learn-mc-run').addEventListener('click', updateLearningMonteCarlo);
  document.querySelectorAll('#learn-risk-capital, #learn-risk-return, #learn-risk-volatility, #learn-risk-free')
    .forEach((input) => input.addEventListener('input', updateLearningRisk));
  document.querySelectorAll('#learn-fisher-capital, #learn-fisher-nominal, #learn-fisher-inflation, #learn-fisher-years')
    .forEach((input) => input.addEventListener('input', updateLearningFisher));
  updateLearningMonteCarlo();
  updateLearningRisk();
  updateLearningFisher();

  if (tradingViewContainer && chartSizeSmaller && chartSizeLarger && chartSizeValue) {
    const minimumChartHeight = 320;
    const maximumChartHeight = 720;
    const chartHeightStep = 80;
    let chartHeight = Math.round(parseFloat(window.getComputedStyle(tradingViewContainer).height));

    function updateChartSize(change) {
      chartHeight = Math.max(minimumChartHeight, Math.min(maximumChartHeight, chartHeight + change));
      tradingViewContainer.style.setProperty('--tradingview-chart-height', `${chartHeight}px`);
      chartSizeValue.textContent = `${chartHeight} px`;
      chartSizeSmaller.disabled = chartHeight === minimumChartHeight;
      chartSizeLarger.disabled = chartHeight === maximumChartHeight;
    }

    updateChartSize(0);
    chartSizeSmaller.addEventListener('click', () => updateChartSize(-chartHeightStep));
    chartSizeLarger.addEventListener('click', () => updateChartSize(chartHeightStep));
  }

});
