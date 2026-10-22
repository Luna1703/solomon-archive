import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to create task
function t(id, category, titleEn, titleHy, titleRu, descEn, descHy, descRu, hintEn, hintHy, hintRu, quoteEn, quoteHy, quoteRu) {
  return {
    id,
    category,
    title: { en: titleEn, hy: titleHy, ru: titleRu },
    description: { en: descEn, hy: descHy, ru: descRu },
    hint: { en: hintEn, hy: hintHy, ru: hintRu },
    solomonQuote: { en: quoteEn, hy: quoteHy, ru: quoteRu }
  };
}

const tasks = [
  // --- 1 to 15: Classical Core Relics & Nature ---
  t('solomon_001', 'artefact',
    'An Ancient or Weathered Object', 'Հին կամ ժամանակից մաշված առարկա', 'Древний или тронутый временем предмет',
    'Find an item that carries traces of age, history, or patina. It could be an heirloom, old coin, stone, or antique tool.',
    'Գտեք մի առարկա, որը կրում է տարիքի, պատմության կամ ժամանակի հետքեր: Դա կարող է լինել ընտանեկան մասունք, հին մետաղադրամ կամ հնաոճ իր:',
    'Найдите предмет, несущий следы возраста, истории или благородной патины. Старинная вещь, монета, реликвия или потертый инструмент.',
    'Look for scratches, natural oxidation, or textured wood.',
    'Ուշադրություն դարձրեք քերծվածքներին, օքսիդացմանը կամ փայտի նախշին:',
    'Ищите царапины, естественное окисление или фактуру старого дерева.',
    '"What has been will be again, what has been done will be done again; there is nothing new under the sun."',
    '«Ինչ եղել է, նույնն էլ լինելու է. և ինչ արվել է, նույնն էլ արվելու է, և արեգակի տակ ոչ մի նոր բան չկա»:',
    '«Что было, то и будет; и что делалось, то и будет делаться, и нет ничего нового под солнцем».'
  ),
  t('solomon_002', 'time',
    'An Instrument of Time', 'Ժամանակի Գործիք', 'Инструмент измерения времени',
    'Capture a clock, watch, hourglass, sundial, or any device that measures the fleeting moments.',
    'Լուսանկարեք ժամացույց, ավազի ժամացույց կամ ցանկացած սարք, որը չափում է անցնող պահերը:',
    'Запечатлейте часы, песочные часы, циферблат или любое устройство, отмеряющее ход мгновений.',
    'Catch the shadows cast by the hands or dial.',
    'Բռնեք սլաքների կամ թվատախտակի ստվերը:',
    'Поймайте игру стрелок или тень циферблата.',
    '"There is a time for everything, and a season for every activity under the heavens."',
    '«Ամեն ինչ իր ժամանակն ունի, և երկնքի տակ ամեն գործ՝ իր պահը»:',
    '«Всему свое время, и время всякой вещи под небом».'
  ),
  t('solomon_003', 'knowledge',
    'A Vessel of Written Word', 'Գրավոր Խոսքի Անոթ', 'Вместилище письменного слова',
    'Photograph a page of an open book, a handwritten letter, an encyclopedia, or a scroll.',
    'Լուսանկարեք բաց գրքի էջ, ձեռագիր նամակ, հանրագիտարան կամ մագաղաթ:',
    'Сфотографируйте страницу открытой книги, рукописное письмо, свиток или фолиант.',
    'Focus closely on the typography or ink texture on paper.',
    'Կենտրոնացեք տառատեսակի կամ թղթի վրայի թանաքի վրա:',
    'Сфокусируйтесь на типографике или текстуре чернил на бумаге.',
    '"For wisdom is better than rubies, and all the things one may desire cannot be compared with her."',
    '«Իմաստությունը լավ է գոհարներից, և ոչ մի ցանկալի բան չի համեմատվի նրա հետ»:',
    '«Потому что мудрость лучше жемчуга, и ничто из желаемого не сравнится с нею».'
  ),
  t('solomon_004', 'light',
    'A Source of Solitary Flame or Glow', 'Միայնակ Կրակի կամ Շողի Աղբյուր', 'Источник уединённого огня или свечения',
    'Photograph a burning candle, lantern, ember, or a warm stream of sunlight cutting through darkness.',
    'Լուսանկարեք վառվող մոմ, լապտեր, կայծ կամ արևի շող, որը կտրում է խավարը:',
    'Сфотографируйте горящую свечу, лампаду, уголёк или луч солнечного света, пробивающийся сквозь темноту.',
    'Lower your camera exposure to emphasize the warm radiant contrast.',
    'Նվազեցրեք էքսպոզիցիան՝ լույսի տաք հակադրությունն ընդգծելու համար:',
    'Уменьшите экспозицию, чтобы подчеркнуть золотое сияние во тьме.',
    '"The path of the righteous is like the morning sun, shining ever brighter till the full light of day."',
    '«Արդարների ճանապարհը ծագող լույսի նման է, որ գնալով ավելի է պայծառանում մինչև կեսօր»:',
    '«Стезя праведных — как светило лучезарное, которое более и более светлеет до полного дня».'
  ),
  t('solomon_005', 'nature',
    'A Living Botanical Specimen', 'Կենդանի Բուսական Նմուշ', 'Живой ботанический образец',
    'Photograph a green leaf with visible veins, a blossoming petal, or an intriguing indoor plant.',
    'Լուսանկարեք կանաչ տերև՝ տեսանելի երակներով, ծաղկի թերթիկ կամ հետաքրքիր սենյակային բույս:',
    'Сфотографируйте зелёный лист с прожилками, цветок или комнатное растение с причудливой формой.',
    'Look at the leaf against the light to see its intricate vascular structure.',
    'Նայեք տերևին լույսի դեմ՝ նրա նուրբ երակները տեսնելու համար:',
    'Снимите лист на просвет, чтобы обнажить сосудистый узор живой природы.',
    '"He spoke of trees, from the cedar of Lebanon to the hyssop that grows out of the wall."',
    '«Նա խոսեց ծառերի մասին՝ Լիբանանի մայրուց մինչև պատից աճող զոպան»:',
    '«И говорил он о деревах, от кедра, что в Ливане, до иссопа, вырастающего из стены».'
  ),
  t('solomon_006', 'artefact',
    'The Key to an Unseen Door', 'Անտեսանելի Դռան Բանալին', 'Ключ от невидимой двери',
    'Find and photograph a key — physical, ornamental, brass, or iron — that unlocks a portal.',
    'Գտեք և լուսանկարեք բանալի՝ մետաղյա, զարդարուն կամ հին, որը բացում է դռներ:',
    'Найдите и запечатлейте ключ — старинный, декоративный или повседневный — открывающий преграду.',
    'Place it on a dark, rustic, or textured surface for maximum presence.',
    'Դրեք այն մուգ կամ փայտե մակերեսի վրա:',
    'Положите его на контрастную или деревянную поверхность.',
    '"Apply your heart to instruction and your ears to words of knowledge."',
    '«Սիրտդ տուր խրատին և ականջներդ՝ գիտության խոսքերին»:',
    '«Приложи сердце твое к учению и уши твои — к умным словам».'
  ),
  t('solomon_007', 'everyday',
    'A Cup of Warmth or Elixir', 'Ջերմության կամ Էլիքսիրի Գավաթ', 'Чаша тепла или живительного напитка',
    'Photograph a cup of coffee, herbal tea, or water, highlighting the vapor or liquid reflection.',
    'Լուսանկարեք սուրճի, թեյի կամ ջրի գավաթ՝ ընդգծելով գոլորշին կամ անդրադարձումը:',
    'Сфотографируйте кружку чая, кофе или сосуд с водой, подчеркнув поднимающийся пар или отражение.',
    'Capture the steam swirling in a beam of morning or evening light.',
    'Բռնեք գոլորշին լույսի շողի մեջ:',
    'Попробуйте поймать струящийся пар в контровом свете.',
    '"Go, eat your food with gladness, and drink your wine with a joyful heart."',
    '«Գնա, ուրախությամբ կեր քո հացը և զվարթ սրտով խմիր քո գինին»:',
    '«Итак иди, ешь с весельем хлеб твой, и пей в радости сердца вино твое».'
  ),
  t('solomon_008', 'light',
    'A Dance of Geometric Shadow', 'Երկրաչափական Ստվերների Պար', 'Танец геометрических теней',
    'Capture shadows cast by blinds, a window frame, fence, or foliage onto a wall or floor.',
    'Լուսանկարեք պատուհանի, վարագույրի կամ ճաղերի ստվերները պատի կամ հատակի վրա:',
    'Запечатлейте тень от жалюзи, оконного переплета или веток на стене или полу.',
    'High contrast black-and-white style highlights geometric poetry.',
    'Սև-սպիտակ ոճը հիանալի ընդգծում է երկրաչափական գծերը:',
    'Чёткие графичные линии лучше всего смотрятся при боковом свете.',
    '"Like a passing shadow are our days on earth, and there is no hope of remaining."',
    '«Մեր օրերը երկրի վրա ստվերի պես են, և չկա հաստատուն ոչինչ»:',
    '«Дни наши на земле как тень, и нет ничего прочного».'
  ),
  t('solomon_009', 'everyday',
    'A Mirror or Reflective Surface', 'Հայելի կամ Անդրադարձնող Մակերես', 'Зеркало или отражающая гладь',
    'Photograph a mirror, polished metal, glass, or still puddle reflecting the world back at you.',
    'Լուսանկարեք հայելի, փայլեցված մետաղ, ապակի կամ ջրի մակերես, որն արտացոլում է աշխարհը:',
    'Сфотографируйте зеркало, полированный металл или спокойную гладь воды с отражением.',
    'Capture an unexpected angle where reality merges with reflection.',
    'Ընտրեք անսովոր անկյուն, որտեղ իրականությունն ու արտացոլումը միաձուլվում են:',
    'Найдите ракурс, в котором реальность переплетается с отражением.',
    '"As water reflects the face, so one’s life reflects the heart."',
    '«Ինչպես ջրի մեջ երեսը երեսին է նայում, այնպես էլ մարդու սիրտը՝ մարդուն»:',
    '«Как в воде лицо — к лицу, так сердце человека — к человеку».'
  ),
  t('solomon_010', 'nature',
    'Stone, Earth, or Mineral', 'Քար, Հող կամ Հանքանյութ', 'Камень, земля или минерал',
    'Photograph a pebble with distinct markings, a crystal, rough rock, or a handful of earth.',
    'Լուսանկարեք յուրահատուկ նախշերով քար, բյուրեղ կամ հողի հատիկներ:',
    'Сфотографируйте камень с необычным узором, кристалл, скалистый скол или минерал.',
    'Get very close to reveal micro-textures and ancient fissures.',
    'Մոտեցեք շատ մոտիկ՝ միկրո-կառուցվածքն ու ճաքերը տեսնելու համար:',
    'Приблизьтесь вплотную, чтобы запечатлеть микротрещины и текстуру породы.',
    '"A time to cast away stones, and a time to gather stones together."',
    '«Քարեր նետելու ժամանակ, և քարեր հավաքելու ժամանակ»:',
    '«Время разбрасывать камни, и время собирать камни».'
  ),
  t('solomon_011', 'artefact',
    'A Coin or Sovereign Currency', 'Մետաղադրամ կամ Արժույթ', 'Монета или знак чеканки',
    'Photograph a minted coin — old or new, rare or common — paying attention to its relief and rim.',
    'Լուսանկարեք մետաղադրամ՝ հին կամ նոր, ուշադրություն դարձնելով դրոշմին:',
    'Сфотографируйте монету — старинную или современную, обращая внимание на чеканку и рельеф.',
    'Raking light highlights the embossed profile and inscription.',
    'Կողային լույսը ընդգծում է դաջված պատկերն ու գրությունը:',
    'Боковой свет эффектно подчеркнет рельефный профиль и дату чеканки.',
    '"Choose my instruction instead of silver, knowledge rather than choice gold."',
    '«Ընդունեք իմ խրատը և ոչ թե արծաթը, և գիտությունը՝ ընտիր ոսկուց ավելի»:',
    '«Примите учение мое, а не серебро; лучше знание, нежели отборное золото».'
  ),
  t('solomon_012', 'everyday',
    'The Footwear of a Traveler', 'Ճանապարհորդի Կոշիկը', 'Обувь странника',
    'Capture boots or shoes that carry you across the paths of your daily journey.',
    'Լուսանկարեք կոշիկներ, որոնք ձեզ տանում են ձեր առօրյա ճանապարհներով:',
    'Запечатлейте обувь, которая проходит с вами путь каждого дня.',
    'Notice the wear on the leather or soles — proof of miles traveled.',
    'Ուշադրություն դարձրեք քայլված ճանապարհների հետքերին:',
    'Обратите внимание на потёртости подошвы — свидетельства пройденных вёрст.',
    '"Give careful thought to the paths for your feet and be steadfast in all your ways."',
    '«Ուշադիր եղիր քո ոտքերի շավիղներին, և քո բոլոր ճանապարհները թող հաստատ լինեն»:',
    '«Обдумай стезю для ноги твоей, и все пути твои да будут тверды».'
  ),
  t('solomon_013', 'knowledge',
    'The Scribe’s Pen or Stylus', 'Դպիրի Գրիչը կամ Փետուրը', 'Перо или стило летописца',
    'Photograph a pen, pencil, fountain pen, or brush used to immortalize thought.',
    'Լուսանկարեք գրիչ, մատիտ, փետուր կամ վրձին, որով գրառվում են մտքերը:',
    'Сфотографируйте ручку, карандаш, перьевую ручку или кисть, коими записывают мысли.',
    'Capture the nib resting on paper beside an ink mark.',
    'Բռնեք ծայրը՝ թղթի վրա թանաքի հետքի կողքին:',
    'Поймайте перо, касающееся листа бумаги.',
    '"Let love and faithfulness never leave you; bind them around your neck, write them on the tablet of your heart."',
    '«Ողորմությունն ու ճշմարտությունը թող չլքեն քեզ. կապիր դրանք քո պարանոցին, գրիր քո սրտի տախտակի վրա»:',
    '«Милость и истина да не оставляют тебя: обвяжи ими шею твою, напиши их на скрижали сердца твоего».'
  ),
  t('solomon_014', 'food',
    'A Seed, Nut, or Fruit of the Soil', 'Սերմ, Ընկույզ կամ Երկրի Պտուղ', 'Семя, плод или дар земли',
    'Capture a fruit, pomegranate, grain, seed, or spice that contains latent life or nourishment.',
    'Լուսանկարեք միրգ, նուռ, հացահատիկ կամ սերմ, որն իր մեջ կյանք է կրում:',
    'Запечатлейте плод, зерно, гранат, орех или пряность, хранящие в себе жизнь.',
    'A slice cut in half reveals sacred symmetry.',
    'Կիսված պտուղը ցույց է տալիս բնության սուրբ համաչափությունը:',
    'Разрезанный плод обнажает природную геометрию и скрытые семена.',
    '"Your shoots are an orchard of pomegranates with choice fruits, with henna and nard."',
    '«Քո ընձյուղները նռնենիների պարտեզ են՝ ընտիր պտուղներով, հինայով և նարդոսով»:',
    '«Рассадники твои — сад с гранатовыми яблоками, с превосходными плодами, киперы с нардами».'
  ),
  t('solomon_015', 'artefact',
    'A Glass Vessel of Clarity', 'Մաքրության Ապակե Անոթ', 'Стеклянный сосуд прозрачности',
    'Photograph a glass bottle, vial, goblet, or jar capturing ambient refractions.',
    'Լուսանկարեք ապակե շիշ, սրվակ, գավաթ կամ տարա, որը բեկում է լույսը:',
    'Сфотографируйте стеклянную бутыль, флакон, бокал или сосуд, преломляющий свет вокруг.',
    'Look at the curved highlights and reflections bent along the rim.',
    'Ուշադրություն դարձրեք ապակու եզրերի լուսային շողերին:',
    'Обратите внимание на искривлённые световые блики на гранях стекла.',
    '"Gold and glass cannot equal wisdom, nor can it be bought with jewels of fine gold."',
    '«Ոսկին և ապակին չեն կարող հավասարվել իմաստությանը, ոչ էլ այն կարելի է փոխանակել մաքուր ոսկյա զարդերով»:',
    '«Не равняется с нею золото и стекло, и не выменяешь ее на сосуды из чистого золота».'
  )
];

// Definition array for generating tasks 16 to 105 systematically
const categoriesPool = [
  // --- 16 to 25: Food & Sustenance ---
  {
    cat: 'food',
    en: ['Daily Loaf of Bread', 'Capture crusty bread, flatbread, or a loaf representing daily sustenance.', 'Focus on the flour dusting and porous crumb.', 'A crust of bread eaten in peace is better than a banquet with strife.'],
    hy: ['Ամենօրյա Հաց', 'Լուսանկարեք հաց, լավաշ կամ հացի շերտ՝ որպես կյանքի սնունդ:', 'Ուշադրություն դարձրեք ալյուրի փոշուն և կեղևի խրթխրթանությանը:', '«Մի պատառ չոր հացը խաղաղությամբ ավելի լավ է, քան կռվով լի տունը»:'],
    ru: ['Насущный ломоть хлеба', 'Запечатлейте хрустящую корочку свежего хлеба или лепешку.', 'Сфокусируйтесь на посыпке муки и пористости мякиша.', '«Лучше кусок сухого хлеба, и с ним мир, нежели дом, полный заколотого скота, с раздором».'],
  },
  {
    cat: 'food',
    en: ['Golden Honey or Sweet Nectar', 'Photograph flowing honey, jam, or sweet syrup glistening in light.', 'Capture a honey drizzle falling from a wooden spoon.', 'Eat honey, my son, for it is good; honey from the comb is sweet to your taste.'],
    hy: ['Ոսկե Մեղր կամ Քաղցր Նեկտար', 'Լուսանկարեք հոսող մեղր, մուրաբա կամ օշարակ՝ լույսի տակ փայլող:', 'Բռնեք գդալից հոսող մեղրի ոսկեգույն կաթիլը:', '«Կեր մեղրը, որդյակս, քանի որ այն քաղցր է քո քիմքին»:'],
    ru: ['Золотой мёд или нектар', 'Сфотографируйте текучий мёд, варенье или густой янтарный сироп.', 'Поймайте золотистую струйку мёда, стекающую с ложки.', '«Ешь, сын мой, мед, потому что он приятен, и сот, который сладок для гортани твоей».'],
  },
  {
    cat: 'food',
    en: ['Roasted Coffee Beans or Tea Leaves', 'Capture dry coffee beans, aromatic tea leaves, or dark roast grains.', 'Highlight the oily sheen on roasted arabica beans.', 'Pleasant words are a honeycomb, sweet to the soul and healing to the bones.'],
    hy: ['Սուրճի Հատիկներ կամ Թեյի Տերևներ', 'Լուսանկարեք բոված սուրճի հատիկներ կամ անուշաբույր թեյի տերևներ:', 'Ընդգծեք բոված հատիկների մուգ փայլը:', '«Հաճելի խոսքերը մեղրախորիսխ են՝ քաղցր հոգուն և բժշկություն ոսկորներին»:'],
    ru: ['Кофейные зёрна или чайные листья', 'Запечатлейте обжаренные зерна кофе или сухие листья душистого чая.', 'Подчеркните маслянистый отблеск на темных зернах.', '«Приятная речь — сотовый мед, сладка для души и целебна для костей».'],
  },
  {
    cat: 'food',
    en: ['Pungent Seasonings or Pepper', 'Photograph whole peppercorns, sea salt crystals, or ground cinnamon.', 'Use macro mode to capture crystalline textures.', 'Can that which is unsavory be eaten without salt?'],
    hy: ['Համեմունքներ կամ Աղի Բյուրեղներ', 'Լուսանկարեք պղպեղի հատիկներ, ծովի աղի բյուրեղներ կամ դարչին:', 'Օգտագործեք մակրո ռեժիմ՝ բյուրեղները ցուցադրելու համար:', '«Մի՞թե անհամ բանն առանց աղի կուտվի»:'],
    ru: ['Пряности или кристаллы соли', 'Сфотографируйте горошины перца, кристаллы морской соли или палочку корицы.', 'Используйте макросъёмку, чтобы передать кристаллическую текстуру.', '«Едят ли безвкусное без соли, и есть ли вкус в яичном белке?»'],
  },
  {
    cat: 'food',
    en: ['Ripe Citrus or Crimson Apple', 'Photograph a lemon, orange slice, or an apple with droplet beads.', 'A backlit cross-section displays glowing citrus pulp cells.', 'A word fitly spoken is like apples of gold in settings of silver.'],
    hy: ['Հասուն Ցիտրուս կամ Կարմիր Խնձոր', 'Լուսանկարեք կիտրոն, նարնջի շերտ կամ խնձոր՝ ցողի կաթիլներով:', 'Լույսի դեմ դրված շերտը ցույց է տալիս հյութալի բջիջները:', '«Ճիշտ ժամանակին ասված խոսքը ոսկե խնձոր է արծաթե սկուտեղի վրա»:'],
    ru: ['Спелый цитрус или яблоко', 'Сфотографируйте дольку лимона, апельсин или яблоко с каплями влаги.', 'Срез на просвет красиво обнажит полупрозрачные дольки.', '«Золотые яблоки в серебряных прозрачных сосудах — слово, сказанное прилично».'],
  },
  {
    cat: 'food',
    en: ['The Olive Branch and Oil', 'Photograph an olive, bottle of pure virgin olive oil, or olive branch.', 'Notice how golden oil refracts light in a clear dispenser.', 'Oil and perfume make the heart glad, and the sweetness of a friend comes from his earnest counsel.'],
    hy: ['Ձիթապտուղ և Ոսկե Ձեթ', 'Լուսանկարեք ձիթապտուղ, ձիթայուղի շիշ կամ ձիթենու ճյուղ:', 'Ուշադրություն դարձրեք յուղի ոսկեգույն բեկմանը ապակու մեջ:', '«Յուղն ու խունկն ուրախացնում են սիրտը, նույնպես և ընկերոջ քաղցր խորհուրդը»:'],
    ru: ['Оливы и золотистый елей', 'Сфотографируйте оливки, сосуд с оливковым маслом или веточку.', 'Обратите внимание на золотистое преломление масла в стекле.', '«Масть и курение радуют сердце; так сладок всякому друг сердечным советом своим».'],
  },
  {
    cat: 'food',
    en: ['A Single Fragile Egg', 'Photograph a whole brown or white egg resting on a textured cloth or nest.', 'Soft natural light wraps delicately around the ovoid surface.', 'Wisdom builds her house, but folly with her own hands tears it down.'],
    hy: ['Միայնակ Անբիծ Ձու', 'Լուսանկարեք ձու՝ դրված կտորի կամ փայտե տախտակի վրա:', 'Փափուկ բնական լույսը ընդգծում է կատարյալ կլորությունը:', '«Իմաստուն կինը շինում է իր տունը, իսկ հիմարն իր ձեռքով քանդում է այն»:'],
    ru: ['Хрупкое совершенное яйцо', 'Сфотографируйте куриное яйцо на льняной салфетке или деревянном столе.', 'Мягкий боковой свет красиво очертит плавную овальную форму.', '«Мудрая жена устроит дом свой, а глупая разрушит его своими руками».'],
  },
  {
    cat: 'food',
    en: ['Sack of Flour or Grains', 'Photograph grains of wheat, rice, oats, or a mound of white flour.', 'Show individual kernels scattering across a surface.', 'Whoever hoards grain, the people curse him, but a blessing is on the head of him who sells it.'],
    hy: ['Ցորենի Հատիկներ կամ Ալյուր', 'Լուսանկարեք ցորենի, բրնձի հատիկներ կամ ալյուրի կույտ:', 'Ցույց տվեք հատիկների բնական ցրվածությունը:', '«Հացահատիկ պահողին մարդիկ անիծում են, բայց օրհնություն կա նրա գլխին, ով վաճառում է»:'],
    ru: ['Зерна пшеницы или горсть муки', 'Сфотографируйте зерна пшеницы, риса или горку белоснежной муки.', 'Покажите отдельные колоски или рассыпанные по столу зерна.', '«Кто удерживает у себя хлеб, того клянет народ; а на голове продающего — благословение».'],
  },
  {
    cat: 'food',
    en: ['A Bunch of Grapes or Cluster', 'Photograph purple, green, or red grapes still on the vine or stem.', 'Dewdrops on dusty grape skin add depth and freshness.', 'The fruit of the righteous is a tree of life, and he who is wise wins souls.'],
    hy: ['Խաղողի Ողկույզ', 'Լուսանկարեք մուգ կամ կանաչ խաղողի ողկույզ:', 'Կաթիլները հատապտուղների վրա տալիս են թարմության շունչ:', '«Արդարի պտուղը կյանքի ծառ է, և իմաստունը հոգիներ է շահում»:'],
    ru: ['Гроздь винограда', 'Сфотографируйте сочную гроздь темного или янтарного винограда.', 'Матовый налет на ягодах и капли воды придадут живописность.', '«Плод праведника — древо жизни, и мудрый привлекает души».'],
  },
  {
    cat: 'food',
    en: ['Handcrafted Ceramic Bowl of Soup or Broth', 'Photograph warm broth, stew, or porridge in a rustic earthen bowl.', 'Steam gently rising against a dark backdrop creates poetic comfort.', 'Better is a dinner of herbs where love is, than a fattened calf with hatred.'],
    hy: ['Ապուրի կամ Շիլայի Կավե Աման', 'Լուսանկարեք գոլորշի արձակող տաք ապուր կավե ափսեի մեջ:', 'Մուգ ֆոնի վրա բարձրացող գոլորշին ստեղծում է ջերմություն:', '«Լավ է բանջարեղենով ճաշը սիրով, քան պարարտ եզը՝ ատելությամբ»:'],
    ru: ['Глиняная чаша с похлёбкой', 'Сфотографируйте горячее блюдо или суп в глиняной керамической миске.', 'Клубящийся пар на темном фоне создаст ощущение уюта.', '«Лучше блюдо зелени, и при нем любовь, нежели откормленный бык, и при нем ненависть».'],
  },

  // --- 26 to 35: Architecture & Buildings ---
  {
    cat: 'architecture',
    en: ['An Arched Portal or Vault', 'Photograph a stone arch, arched gateway, or vaulted ceiling.', 'Look straight up into the keystone or perspective curve.', 'Wisdom has built her house; she has hewn out its seven pillars.'],
    hy: ['Քարե Կամար կամ Դարպաս', 'Լուսանկարեք քարե կամար, կամարակապ մուտք կամ առաստաղ:', 'Ուղղեք կադրը վերև՝ կամարի գագաթաքարը տեսնելու համար:', '«Իմաստությունը շինեց իր տունը, կանգնեցրեց իր յոթ սյուները»:'],
    ru: ['Арочный свод или портал', 'Сфотографируйте каменную арку, сводчатый проход или свод потолка.', 'Направьте камеру снизу вверх, поймав перспективу замкового камня.', '«Премудрость построила себе дом, вытесала семь столбов его».'],
  },
  {
    cat: 'architecture',
    en: ['A Spiral or Ascending Staircase', 'Capture stairs leading upward or downward into shadow.', 'Highlight the repeating geometry of wooden or marble treads.', 'The path of life leads upward for the prudent.'],
    hy: ['Պարուրաձև կամ Բարձրացող Աստիճան', 'Լուսանկարեք դեպի վեր տանող աստիճանավանդակ:', 'Ընդգծեք աստիճանների կրկնվող ռիթմիկ երկրաչափությունը:', '«Կյանքի ճանապարհը խոհեմ մարդու համար տանում է դեպի վեր»:'],
    ru: ['Винтовая или крутая лестница', 'Запечатлейте ступени, уходящие вверх или спиралью вниз.', 'Подчеркните ритм параллельных ступеней и игру теней.', '«Путь жизни мудрого вверх, чтобы уклониться от преисподней внизу».'],
  },
  {
    cat: 'architecture',
    en: ['Weathered Brickwork or Stone Wall', 'Photograph ancient masonry, interlocking bricks, or a stone rampart.', 'Raking side light accentuates the crevices between mortar.', 'By wisdom a house is built, and through understanding it is established.'],
    hy: ['Քարաշեն կամ Աղյուսե Պատ', 'Լուսանկարեք հին շարվածք, քարե որմ կամ աղյուսե պատ:', 'Կողային լույսը ընդգծում է շարվածքի խորությունը:', '«Իմաստությամբ է տունը կառուցվում, և հանճարով՝ հաստատվում»:'],
    ru: ['Кирпичная кладка или каменная стена', 'Сфотографируйте старинную кладку, шероховатый кирпич или замковую стену.', 'Боковой свет подчеркнет рельеф швов и трещинки в растворе.', '«Мудростью устрояется дом и разумом утверждается».'],
  },
  {
    cat: 'architecture',
    en: ['Ornamental Balcony or Iron Lattice', 'Photograph wrought iron bars, ornate balustrades, or patterned grilles.', 'Silhouetted black ironwork against daylight forms an intricate lacework.', 'He looks in through the window, lattice and blinds.'],
    hy: ['Դարբնագործ Վանդակաճաղ կամ Պատշգամբ', 'Լուսանկարեք մետաղյա նախշազարդ ճաղավանդակ կամ պատշգամբ:', 'Երկաթյա նախշը լույսի դեմ ժանյակի պես է երևում:', '«Նա նայում է պատուհանից՝ վանդակապատի միջով»:'],
    ru: ['Кованая решётка или балкон', 'Сфотографируйте узор кованого железа, перила или ажурный балкон.', 'Силуэт черного металла на фоне неба напоминает тонкое кружево.', '«Вот, он стоит у нас за стеною, заглядывает в окно, мелькает сквозь решетку».'],
  },
  {
    cat: 'architecture',
    en: ['A Heavy Wooden Door with Iron Studs', 'Capture an old portal, rustic timber entrance, or courtyard gate.', 'Focus on the grain of the weathered timber boards.', 'Lift up your heads, O you gates; be lifted up, you ancient doors.'],
    hy: ['Փայտե Հին Դուռ', 'Լուսանկարեք փայտե զանգվածեղ մուտք կամ դարպաս:', 'Ուշադրություն դարձրեք փայտի մանրաթելերին և դարբնած մեխերին:', '«Բարձրացրե՛ք ձեր գլուխները, ո՛վ դռներ, և բացվե՛ք, հավիտենական դարպասներ»:'],
    ru: ['Массивная деревянная дверь', 'Запечатлейте старинную деревянную дверь или старые ворота.', 'Сфокусируйтесь на текстуре вековых досок и кованых петлях.', '«Поднимите, врата, верхи ваши, и поднимитесь, двери вечные».'],
  },
  {
    cat: 'architecture',
    en: ['A Window Reflecting Sky or Clouds', 'Photograph a pane of glass reflecting drifting clouds or architectural facades.', 'Angle yourself so the glass acts as a mirror of heavens.', 'The light of the eyes rejoices the heart.'],
    hy: ['Պատուհան՝ Երկնքի Արտացոլանքով', 'Լուսանկարեք ապակեպատ պատուհան, որտեղ երևում են ամպերը:', 'Ընտրեք անկյուն, որտեղ ապակին դառնում է երկնքի հայելի:', '«Աչքերի լույսն ուրախացնում է սիրտը»:'],
    ru: ['Окно, отражающее небо', 'Сфотографируйте оконное стекло с отражением облаков или соседних крыш.', 'Подберите угол, при котором стекло превращается в зеркало неба.', '«Светлый взгляд радует сердце, добрая весть утучняет кости».'],
  },
  {
    cat: 'architecture',
    en: ['Roof Tiles or Eaves against the Sky', 'Photograph terracotta shingles, copper roof crests, or eaves.', 'Capture the rhythmic overlapping geometry of tiles.', 'He who is slow to anger is better than the mighty.'],
    hy: ['Կղմինդրե Տանիք Երկնքի Ֆոնին', 'Լուսանկարեք կավե կղմինդրներ կամ տանիքի եզրագիծը:', 'Բռնեք կղմինդրների կրկնվող համաչափությունը:', '«Համբերատար մարդը լավ է հզորից, և իր ոգուն տիրողը՝ քաղաք գրավողից»:'],
    ru: ['Черепичная крыша или карниз', 'Сфотографируйте глиняную черепицу или силуэт крыши на фоне неба.', 'Передайте ритмичный узор набегающих друг на друга пластин.', '«Долготерпеливый лучше храброго, и владеющий собою лучше завоевателя города».'],
  },
  {
    cat: 'architecture',
    en: ['A Classical Column or Capital', 'Photograph a fluted column, stone pilaster, or carved pedestal.', 'Focus on the stone carvings and structural symmetry.', 'He set up the pillars at the portico of the temple.'],
    hy: ['Դասական Սյուն կամ Խոյակ', 'Լուսանկարեք քարե սյուն կամ քանդակազարդ խոյակ:', 'Կենտրոնացեք քարի փորագրության և հաստատունության վրա:', '«Նա կանգնեցրեց սյուները տաճարի գավթում»:'],
    ru: ['Классическая колонна или капитель', 'Сфотографируйте колонну с каннелюрами, пилястру или резной капитель.', 'Подчеркните вертикальную мощь камня и высеченный рельеф.', '«И поставил столбы к притвору храма; поставил правый столб и дал ему имя».'],
  },
  {
    cat: 'architecture',
    en: ['A Bridge across Water or Canyon', 'Photograph a footbridge, stone arch span, or overpass.', 'Lead the viewer’s eye along the walkway into the distance.', 'Make level paths for your feet and only be steadfast in all your ways.'],
    hy: ['Կամուրջ Գետի կամ Ձորի Վրայով', 'Լուսանկարեք հետիոտնային կամուրջ կամ քարե անցում:', 'Տարեք հայացքը կամրջի գծով դեպի հեռուն:', '«Հարթեցրո՛ւ քո ոտքերի ճանապարհը, և քո բոլոր ուղիները թող հաստատ լինեն»:'],
    ru: ['Мост через воду или переправу', 'Сфотографируйте пешеходный или каменный мост, уходящий вдаль.', 'Выстройте кадр по направляющим линиям мостового настила.', '«Обдумай стезю для ноги твоей, и все пути твои да будут тверды».'],
  },
  {
    cat: 'architecture',
    en: ['Corner where Two Walls Meet', 'Photograph the sharp vertical junction where shadow and light split two walls.', 'Minimalist composition with crisp geometrical contrast.', 'The stone that the builders rejected has become the cornerstone.'],
    hy: ['Երկու Պատերի Հատման Անկյունը', 'Լուսանկարեք պատերի անկյունը, որտեղ բախվում են լույսն ու ստվերը:', 'Մինիմալիստական կադր՝ երկրաչափական մաքուր գծերով:', '«Այն քարը, որ շինարարներն անարգեցին, նա դարձավ անկյան գլուխը»:'],
    ru: ['Угол схождения двух стен', 'Сфотографируйте архитектурный угол, где свет и тень разделяют грани.', 'Минималистичный кадр подчеркнет строгий объем здания.', '«Камень, который отвергли строители, соделался главою угла».'],
  },

  // --- 36 to 45: Transport & Pathways ---
  {
    cat: 'transport',
    en: ['The Spokes of a Bicycle Wheel', 'Photograph the metallic spoke network of a bicycle wheel.', 'A close-up looking through the circular wheel rim creates circular patterns.', 'The wheel turns at the cistern.'],
    hy: ['Հեծանվի Անիվի Ճաղերը', 'Լուսանկարեք հեծանվի անիվի մետաղյա ճաղերը:', 'Շրջանաձև կառուցվածքը ստեղծում է հիանալի նախշ:', '«Անիվը ջրհորի վրա պտտվում է»:'],
    ru: ['Спицы велосипедного колеса', 'Сфотографируйте колесо велосипеда с паутиной металлических спиц.', 'Крупный план втулки и радиальных спиц подчеркнет геометрию вращения.', '«И разобьется кувшин у источника, и обрушится колесо над колодезем».'],
  },
  {
    cat: 'transport',
    en: ['Railway Tracks Leading into Horizon', 'Photograph steel rails converging in single-point perspective.', 'Capture rails gleaming in afternoon light.', 'Let your eyes look straight ahead; fix your gaze directly before you.'],
    hy: ['Երկաթգծեր դեպի Հորիզոն', 'Լուսանկարեք պողպատե ռելսերը, որոնք միաձուլվում են հորիզոնում:', 'Արևի շողը ռելսերի վրա տալիս է հեռանկար:', '«Աչքերդ թող ուղիղ նայեն, և քո հայացքը դեպի առաջ թող լինի»:'],
    ru: ['Рельсы, уходящие за горизонт', 'Сфотографируйте стальные рельсы, сходящиеся в точке перспективы.', 'Поймайте блеск металла в лучах заходящего солнца.', '«Глаза твои пусть прямо смотрят, и ресницы твои да направлены будут прямо пред тобою».'],
  },
  {
    cat: 'transport',
    en: ['Car Headlight with Glass Fresnel Lens', 'Photograph the glass pattern or chrome reflector inside a vehicle light.', 'Look closely at the ribbed concentric grooves inside the glass.', 'The eye is the lamp of the body.'],
    hy: ['Լապտեր ապակե բեկումով', 'Լուսանկարեք մեքենայի լապտերը կամ քրոմապատ ռեֆլեկտորը:', 'Ապակու ակոսավոր նախշը գեղեցիկ բեկում է լույսը:', '«Մարմնի ճրագն աչքն է»:'],
    ru: ['Фара или стеклянный рефлектор', 'Сфотографируйте ребристую поверхность автомобильной фары или фонаря.', 'Концентрические насечки на толстом стекле создают оптический узор.', '«Светильник для тела есть око; итак, если око твое будет чисто, то все тело твое будет светло».'],
  },
  {
    cat: 'transport',
    en: ['A Boat, Oar, or Anchor by the Shore', 'Photograph a wooden dinghy, coiled mooring rope, or rowboat.', 'Reflections in surrounding water anchor the nautical stillness.', 'She is like the merchant ships, bringing her food from afar.'],
    hy: ['Նավակ կամ Խարիսխ Ափին', 'Լուսանկարեք փայտե նավակ, թիակ կամ կապված պարան ափին:', 'Ջրի հանդարտ արտացոլանքը ստեղծում է խաղաղություն:', '«Նա վաճառականի նավերի նման է, հեռվից է բերում իր ապրուստը»:'],
    ru: ['Лодка или весло у причала', 'Сфотографируйте деревянную лодку, причал или смотанный канат.', 'Отражение борта в тихой воде создаст меланхоличное спокойствие.', '«Она — как купеческие корабли, издалека добывает хлеб свой».'],
  },
  {
    cat: 'transport',
    en: ['A Pedestrian Crossing / Zebra Stripes', 'Photograph high contrast painted white lines on asphalt.', 'Capture a shoe stepping onto the white line from above.', 'A journey of a thousand cubits begins with a single step.'],
    hy: ['Հետիոտնային Անցում', 'Լուսանկարեք ասֆալտի սպիտակ գծերը վերևից:', 'Սև ու սպիտակի հակադրությունը հիանալի գրաֆիկա է ստեղծում:', '«Հազար կանգունի ճանապարհը սկսվում է առաջին քայլից»:'],
    ru: ['Пешеходная «зебра» на асфальте', 'Сфотографируйте контрастные белые полосы на темном асфальте.', 'Взгляд сверху вниз с шагающей ногой создаст динамичный кадр.', '«Обдумай стезю для ноги твоей, и все пути твои да будут тверды».'],
  },
  {
    cat: 'transport',
    en: ['A Directional Road Sign or Marker Post', 'Photograph a signpost pointing crossroads or miles to destination.', 'Show the pole standing solitary against open landscape.', 'Stand at the crossroads and look; ask for the ancient paths.'],
    hy: ['Ճանապարհային Ցուցանակ կամ Սյուն', 'Լուսանկարեք ցուցանակ, որը ցույց է տալիս ուղղությունը:', 'Միայնակ սյունը խորհրդանշում է ճիշտ ընտրություն:', '«Կանգնեք ճանապարհներին և նայեք, հարցրեք հին շավիղների մասին»:'],
    ru: ['Дорожный указатель или верстовой столб', 'Сфотографируйте указатель на развилке или километровый столб.', 'Одинокий столб подчеркнет тему выбора пути и путешествия.', '«Остановитесь на путях ваших и рассмотрите, и расспросите о путях древних, где путь добрый».'],
  },
  {
    cat: 'transport',
    en: ['Side Rearview Mirror with Landscape', 'Photograph a vehicle side mirror framing the road left behind.', 'Contrast the sharp mirror reflection with the blurred exterior.', 'Do not say, "Why were the old days better than these?" for that is not wise.'],
    hy: ['Հետևի Տեսադաշտի Հայելի', 'Լուսանկարեք հայելին, որտեղ երևում է անցած ճանապարհը:', 'Հայելու պարզությունն ու հետևում մնացած աշխարհը:', '«Մի՛ ասա. Ինչո՞ւ էին անցած օրերը սրանից լավ, քանզի իմաստությունից չէ այդ հարցը»:'],
    ru: ['Зеркало заднего вида с дорогой', 'Сфотографируйте боковое зеркало, в котором отражается оставшийся позади путь.', 'Резкое отражение в зеркале символизирует память о пройденном.', '«Не говори: "отчего это прежние дни были лучше нынешних?", потому что не от мудрости ты спрашиваешь об этом».'],
  },
  {
    cat: 'transport',
    en: ['Tire Tread Pattern on Wet Ground', 'Photograph the geometric grooved imprint left by a wheel in mud or dust.', 'Side illumination casts micro-shadows inside each tread groove.', 'As the wheel presses into the soil, so experience leaves its mark.'],
    hy: ['Անվադողի Հետքը Հողի Վրա', 'Լուսանկարեք անվադողի թողած հետքը թաց հողի կամ փոշու մեջ:', 'Կողային լույսը ընդգծում է հետքի խորությունը:', '«Ինչպես անիվն է հետք թողնում հողին, այնպես էլ փորձն է հետք թողնում մարդուն»:'],
    ru: ['Протектор шины на влажной земле', 'Сфотографируйте четкий отпечаток протектора колеса на земле или песке.', 'Низкое солнце подчеркнет рельефный оттиск путешествия.', '«Стезя праведных уклоняется от зла: тот бережет душу свою, кто хранит путь свой».'],
  },
  {
    cat: 'transport',
    en: ['A Tunnel or Underpass Opening', 'Photograph the dark portal of a tunnel with light shining at the exit.', 'Frame the darkness enveloping the distant beacon of daylight.', 'Even though I walk through the darkest valley, I will fear no evil.'],
    hy: ['Թունելի Մուտք և Ելքի Լույսը', 'Լուսանկարեք թունելը, որի վերջում երևում է լույսի շողը:', 'Խավարի և ելքի լույսի հզոր հակադրությունը:', '«Եթե նույնիսկ անցնեմ մահվան ստվերի ձորով, չեմ վախենա չարից»:'],
    ru: ['Свод тоннеля со светом на выходе', 'Сфотографируйте арку тоннеля или подземного перехода со светящимся выходом.', 'Темный силуэт стен подчеркнет сияющую точку надежды впереди.', '«Если я пойду и долиною смертной тени, не убоюсь зла, потому что Ты со мною».'],
  },
  {
    cat: 'transport',
    en: ['A Classic Suitcase or Travel Trunk', 'Photograph a vintage valise, leather duffel, or luggage handle.', 'Focus on worn brass latches and scuffed leather corners.', 'A wanderer gathers wisdom from every city he visits.'],
    hy: ['Ճամպրուկ կամ Ուղեբեռ', 'Լուսանկարեք կաշվե ճամպրուկ, փականներ կամ բռնակ:', 'Մաշված անկյունները պատմում են հեռավոր ուղևորությունների մասին:', '«Ճանապարհորդը իմաստություն է քաղում ամեն մի քաղաքից»:'],
    ru: ['Дорожный чемодан или саквояж', 'Сфотографируйте кожаный чемодан, медные застежки или ручку саквояжа.', 'Потертые углы говорят о многих дорогах и приключениях.', '«Человек путешествовавший знает многое, и многоопытный расскажет со смыслом».'],
  },

  // --- 46 to 55: Textures & Surfaces ---
  {
    cat: 'texture',
    en: ['Weathered Wood with Exposed Rings', 'Photograph a cut tree stump or old timber showing growth rings.', 'Each concentric circle represents a completed revolution of seasons.', 'A tree has hope: if it is cut down, it will sprout again.'],
    hy: ['Փայտի Տարեկան Օղակներ', 'Լուսանկարեք կտրված ծառաբուն՝ իր տարեկան շրջաններով:', 'Յուրաքանչյուր օղակ մի տարվա պատմություն է:', '«Ծառի համար հույս կա, եթե կտրվի էլ, նորից կբողբոջի»:'],
    ru: ['Годовые кольца спила дерева', 'Сфотографируйте срез бревна или старый пень с видимыми кольцами роста.', 'Концентрические линии читаются как летопись веков.', '«Для дерева есть надежда, что оно, если и будет срублено, снова оживет».'],
  },
  {
    cat: 'texture',
    en: ['Peeling Paint on an Old Surface', 'Photograph layers of dried paint cracking and peeling like parchment.', 'The underlying color peeking through tells of former epochs.', 'Vanity of vanities, all is vanity.'],
    hy: ['Պատի Թափվող Ներկի Շերտերը', 'Լուսանկարեք հին տախտակի կամ պատի ճաքճքած ներկը:', 'Շերտերի տակից երևացող գույները պատմում են անցյալի մասին:', '«Ունայնություն ունայնությանց, ամեն ինչ ունայն է»:'],
    ru: ['Облезлая краска и кракелюр', 'Сфотографируйте шелушащуюся краску на доске или штукатурке.', 'Многослойные сколы кракелюра напоминают абстрактное полотно.', '«Суета сует, сказал Екклесиаст, суета сует, — все суета!»'],
  },
  {
    cat: 'texture',
    en: ['Oxidized Rust on Aged Iron', 'Photograph burnt orange and amber rust patterns on a metal plate.', 'Rust is the slow combustion of metal yielding to the elements.', 'Iron sharpens iron, and one man sharpens another.'],
    hy: ['Ժանգոտած Մետաղի Նախշ', 'Լուսանկարեք նարնջագույն ժանգը մետաղական մակերեսի վրա:', 'Ժանգը ժամանակի անխուսափելի շունչն է:', '«Երկաթը երկաթով է սրվում, և մարդը սրում է իր ընկերոջ միտքը»:'],
    ru: ['Ржавчина на старом металле', 'Запечатлейте рыжую зернистую ржавчину на стальной пластине или гвозде.', 'Окисление металла рождает причудливую теплую текстуру.', '«Железо железо острит, и человек изощряет взгляд друга своего».'],
  },
  {
    cat: 'texture',
    en: ['Woven Burlap or Coarse Linen Fabric', 'Photograph natural textile fibers, canvas weave, or sackcloth.', 'Shoot in raking light to catch individual woven threads.', 'She seeks wool and flax, and works with willing hands.'],
    hy: ['Կտավի կամ Քաթանի Հյուսվածք', 'Լուսանկարեք բնական կտորի, քաթանի կամ վուշի թելերի հյուսվածքը:', 'Կողային լույսը ընդգծում է յուրաքանչյուր թելի ուղղությունը:', '«Նա բուրդ և վուշ է փնտրում և հաճույքով աշխատում իր ձեռքերով»:'],
    ru: ['Грубое льняное полотно или холст', 'Сфотографируйте переплетение нитей мешковины, льна или холста.', 'Боковой свет подчеркнет осязаемую фактуру пряжи.', '«Добывает шерсть и лен, и с охотою работает своими руками».'],
  },
  {
    cat: 'texture',
    en: ['Rough Concrete with Porous Cavities', 'Photograph an unfinished concrete wall or brutalist pillar.', 'Appreciate the industrial gray tone and organic cratered air pockets.', 'The name of the Lord is a strong tower; the righteous run into it and are safe.'],
    hy: ['Բետոնի Կոպիտ Մակերես', 'Լուսանկարեք անմշակ բետոնե պատ՝ իր ծակոտիներով:', 'Մոխրագույն երանգների և հաստատունության գեղեցկությունը:', '«Տիրոջ անունը ամուր աշտարակ է. արդարը դիմում է նրան և ապահով մնում»:'],
    ru: ['Пористый бетон или сырой камень', 'Сфотографируйте фактуру серого бетона с мелкими кавернами и песчинками.', 'Холодный индустриальный монолит обладает строгой красотой.', '«Имя Господа — крепкая башня: убегает в нее праведник — и безопасен».'],
  },
  {
    cat: 'texture',
    en: ['Porous Sponge or Coral Pattern', 'Photograph sea sponge, pumice stone, or natural porous sponge.', 'Tiny chambers form an infinite labyrinth of air spaces.', 'Deep calls to deep in the roar of your waterfalls.'],
    hy: ['Ծակոտկեն Սպունգ կամ Չեչաքար', 'Լուսանկարեք բնական սպունգ կամ հրաբխային չեչաքար:', 'Բազմաթիվ փոքրիկ խոռոչները ստեղծում են անվերջ լաբիրինթոս:', '«Անդունդը անդունդին է կանչում քո ջրվեժների ձայնով»:'],
    ru: ['Пористая губка или пемза', 'Сфотографируйте натуральную губку или кусок пористой пемзы.', 'Бесчисленные микро-лабиринты завораживают в макросъемке.', '«Бездна бездну призывает голосом водопадов Твоих».'],
  },
  {
    cat: 'texture',
    en: ['Wicker Basket or Reed Weaving', 'Photograph a woven rattan basket, straw mat, or wicker chair.', 'The interlocking herringbone or cross-weave creates rhythmic order.', 'A cord of three strands is not quickly broken.'],
    hy: ['Հյուսած Զամբյուղ կամ Եղեգնյա Գորգ', 'Լուսանկարեք ծղոտե զամբյուղի կամ եղեգի հյուսվածքը:', 'Միմյանց միահյուսված ճյուղերը ստեղծում են ամրություն:', '«Եռապատիկ թելը շուտով չի կտրվի»:'],
    ru: ['Плетёная корзина из лозы', 'Сфотографируйте плетеную корзину, циновку или берестяной короб.', 'Перекрестный ритм прутьев лозы хранит тепло ручного труда.', '«И нитка, втрое скрученная, нескоро порвется».'],
  },
  {
    cat: 'texture',
    en: ['Cracked Mud or Dry Earth Basin', 'Photograph dry baked earth patterned with polygonal fissures.', 'Geometrical polygons form naturally as moisture departs.', 'My soul thirsts for you like a parched land.'],
    hy: ['Ճաքճքած Չոր Հող', 'Լուսանկարեք արևից չորացած հողի բազմանկյուն ճաքերը:', 'Երկրաչափական գծերը բնության ծարավի հետքն են:', '«Իմ հոգին ծարավ է Քեզ, ինչպես չոր երկիրը՝ ջրին»:'],
    ru: ['Растрескавшаяся сухая земля', 'Сфотографируйте пересохшую глину с паутиной глубоких трещин.', 'Природные многоугольники образуют строгий мозаичный узор.', '«Жаждет душа моя к Тебе, истаявает по Тебе плоть моя в земле пустой, иссохшей и безводной».'],
  },
  {
    cat: 'texture',
    en: ['Velvet or Fur with Light Sheen', 'Photograph plush velvet, sheepskin, or fleece with smooth nap.', 'Brush your fingers through the fibers to create dual-tone contrast.', 'She makes coverings for her bed; her clothing is fine linen and purple.'],
    hy: ['Թավիշ կամ Փափուկ Գործվածք', 'Լուսանկարեք թավշյա կտոր՝ լույսի տակ փայլող մազմզուկներով:', 'Մատներով փոխեք թելերի ուղղությունը երկերանգ էֆեկտի համար:', '«Նա իր համար ծածկոցներ է պատրաստում, նրա հագուստը նուրբ կտավ է և ծիրանի»:'],
    ru: ['Бархат или мягкая шерсть', 'Сфотографируйте ворс бархата или овчину с переливом света.', 'Проведите рукой по ворсу, создав игру светлых и темных тонов.', '«Она делает себе ковры; виссон и пурпур — одежда ее».'],
  },
  {
    cat: 'texture',
    en: ['Frosted or Rain-Beaded Glass', 'Photograph a cold windowpane covered with condensation or raindrops.', 'Focus sharply on the droplets while blurring the background city.', 'He spreads the snow like wool and scatters the frost like ashes.'],
    hy: ['Քրտնած կամ Կաթիլներով Պատուհան', 'Լուսանկարեք պատուհանի ապակին՝ ծածկված անձրևի կաթիլներով:', 'Կենտրոնացեք կաթիլների վրա՝ ֆոնը թողնելով մշուշոտ:', '«Նա ձյունը տալիս է բրդի պես, եղյամը ցանում է մոխրի նման»:'],
    ru: ['Запотевшее стекло или капли дождя', 'Сфотографируйте капли дождя на холодном стекле или морозный узор.', 'Сфокусируйтесь на каплях, размыв огни вечернего города позади.', '«Дает снег, как волну; сыплет иней, как пепел».'],
  },

  // --- 56 to 65: Colors & Vibrance ---
  {
    cat: 'color',
    en: ['A Single Flash of Crimson Red', 'Photograph a solitary vibrant red object amidst a neutral or gray scene.', 'Red commands immediate focus like a scarlet cord.', 'Though your sins are like scarlet, they shall be as white as snow.'],
    hy: ['Կարմիրի Վառ Բռնկում', 'Լուսանկարեք վառ կարմիր մի առարկա չեզոք կամ մոխրագույն միջավայրում:', 'Կարմիրը գրավում է հայացքը առաջին իսկ պահին:', '«Եթե ձեր մեղքերը ալ կարմիր էլ լինեն, ձյան պես սպիտակ կդառնան»:'],
    ru: ['Одинокий алый акцент', 'Сфотографируйте яркий красный предмет в нейтральном или сером окружении.', 'Алый цвет притягивает взгляд подобно кардинальской мантии.', '«Если будут грехи ваши, как багряное, — как снег убелю».'],
  },
  {
    cat: 'color',
    en: ['Deep Ultramarine or Cobalt Blue', 'Photograph an object of royal, oceanic, or sky blue.', 'Blue evokes endless depth, tranquility, and wisdom.', 'Clear as sapphire stone was the pavement under his feet.'],
    hy: ['Խորը Կապույտ կամ Լազուր', 'Լուսանկարեք թագավորական կապույտ կամ երկնագույն առարկա:', 'Կապույտը խորհրդանշում է խաղաղություն, խորություն և իմաստություն:', '«Շափյուղայի պես պարզ էր հատակը նրա ոտքերի տակ»:'],
    ru: ['Глубокий ультрамарин или лазурь', 'Сфотографируйте предмет глубокого синего или небесного цвета.', 'Синий цвет дышит бесконечной глубиной и сосредоточенным покоем.', '«И видели Бога Израилева; и под ногами Его нечто подобное работе из чистого сапфира».'],
  },
  {
    cat: 'color',
    en: ['Radiant Golden Yellow Highlight', 'Photograph a bright marigold flower, brass trinket, or golden yellow leaf.', 'Yellow embodies morning light, warmth, and joy.', 'The sun rises and the sun sets, and hurries back to where it rises.'],
    hy: ['Ոսկեդեղին Վառ Շող', 'Լուսանկարեք դեղին ծաղիկ, փողպատ կամ ոսկե տերև:', 'Դեղինը արևի, ջերմության և ուրախության գույնն է:', '«Արևը ծագում է, և արևը մայր է մտնում, և շտապում է իր տեղը»:'],
    ru: ['Золотисто-жёлтый яркий блик', 'Сфотографируйте ярко-желтый цветок, спелый плод или золотую вещь.', 'Желтый цвет несет в себе утреннюю бодрость и тепло полудня.', '«Восходит солнце, и заходит солнце, и спешит к месту своему, где оно восходит».'],
  },
  {
    cat: 'color',
    en: ['Emerald or Deep Botanical Green', 'Photograph an object in moss green, jade, or rich emerald hue.', 'Green represents thriving vitality, spring, and restoration.', 'He makes me lie down in green pastures; he leads me beside quiet waters.'],
    hy: ['Զմրուխտե Կանաչ Երանգ', 'Լուսանկարեք զմրուխտե, նեֆրիտե կամ վառ կանաչ առարկա:', 'Կանաչը կյանքի, վերածննդի և հանգստության գույնն է:', '«Նա ինձ դալար արոտներում է հանգստացնում, հանդարտ ջրերի մոտ է առաջնորդում»:'],
    ru: ['Изумрудный или травяной зеленый', 'Сфотографируйте вещь глубокого изумрудного, нефритового или травяного цвета.', 'Зеленый символизирует жизненную силу, весну и обновление.', '«Он покоит меня на злачных пажитях и водит меня к водам тихим».'],
  },
  {
    cat: 'color',
    en: ['Pure Alabaster White on Dark Tone', 'Photograph a pristine white object isolated against dark slate or black.', 'The stark contrast evokes purity, clarity, and unblemished truth.', 'Purge me with hyssop, and I shall be clean; wash me, and I shall be whiter than snow.'],
    hy: ['Մաքուր Սպիտակը Մուգ Ֆոնի Վրա', 'Լուսանկարեք ձյունաթույր սպիտակ առարկա մուգ ֆոնի վրա:', 'Հակադրությունն արտացոլում է մաքրություն և անբասիր ճշմարտություն:', '«Մաքրիր ինձ զոպայով, և ես մաքուր կլինեմ, լվա՛ ինձ, և ձյունից ավելի սպիտակ կլինեմ»:'],
    ru: ['Белоснежная чистота на темном фоне', 'Сфотографируйте сияющий белый предмет на фоне темного сланца или тени.', 'Резкий контраст напоминает о ясности мысли и непорочности.', '«Окропи меня иссопом, и буду чист; омой меня, и буду белее снега».'],
  },
  {
    cat: 'color',
    en: ['Charcoal Black in Black Nuance', 'Photograph a matte black object displaying subtle shade gradients.', 'Notice how delicate highlights sculpt form out of shadow.', 'I am dark yet lovely, O daughters of Jerusalem.'],
    hy: ['Ածխագույն Սևի Նրբերանգները', 'Լուսանկարեք փայլատ սև առարկա՝ լույսի նուրբ անցումներով:', 'Ստվերների խաղը քանդակում է առարկայի ձևը:', '«Ես սև եմ, բայց գեղեցիկ, ո՛վ Երուսաղեմի դուստրեր»:'],
    ru: ['Матовый черный и игра теней', 'Сфотографируйте черный предмет, где форма читается лишь по бликам.', 'Глубокий темный тон подчеркивает благородную строгость формы.', '«Дема я, но красива, как шатры Кидарские, как завесы Соломоновы».'],
  },
  {
    cat: 'color',
    en: ['Warm Terracotta or Burnt Sienna', 'Photograph clay pots, warm brick, or terracotta tiles in sunlight.', 'Earth tones connect mankind to ancient pottery and soil.', 'The potter shapes the vessel from clay with patience.'],
    hy: ['Կավագույն Տերակոտա կամ Թրծած Կավ', 'Լուսանկարեք կավե աման կամ տաք հողագույն առարկա:', 'Կավի երանգները մեզ կապում են մեր արմատների հետ:', '«Բրուտը կավից աման է ձևավորում համբերությամբ»:'],
    ru: ['Терракота и обожжённая глина', 'Сфотографируйте глиняный горшок или терракоту в лучах солнца.', 'Теплые охристые тона возвращают нас к истокам гончарного ремесла.', '«Вот, как глина в руке горшечника, так вы в Моей руке».'],
  },
  {
    cat: 'color',
    en: ['Imperial Purple or Violet Essence', 'Photograph a violet flower, purple fabric, or plum skin.', 'Purple has historically honored kings, queens, and sacred mysteries.', 'Her clothing is fine linen and purple.'],
    hy: ['Արքայական Ծիրանի կամ Մանուշակագույն', 'Լուսանկարեք մանուշակագույն ծաղիկ կամ ծիրանի կտոր:', 'Ծիրանագույնը հնուց ի վեր խորհրդանշում է արքայական վեհություն:', '«Նրա հագուստը նուրբ կտավ է և ծիրանի»:'],
    ru: ['Царственный пурпур или фиолетовый', 'Сфотографируйте фиолетовый цветок, сливу или пурпурную ткань.', 'Пурпур с древних времен служил знаком царской мудрости.', '«Одеяние ее — виссон и пурпур».'],
  },
  {
    cat: 'color',
    en: ['Silver Metallic Sheen', 'Photograph polished silver, stainless steel, or chrome reflection.', 'Silver catches cool highlights like moonlight on water.', 'The words of the Lord are flawless, like silver purified in a crucible.'],
    hy: ['Արծաթափայլ Մետաղ', 'Լուսանկարեք արծաթյա զարդ, պողպատ կամ քրոմապատ մակերես:', 'Արծաթը որսում է լուսնի պաղ լույսի նման շողեր:', '«Տիրոջ խոսքերը մաքուր խոսքեր են՝ հալոցում մաքրված արծաթի պես»:'],
    ru: ['Серебряный холодный блеск', 'Сфотографируйте полированное серебро, сталь или столовый прибор.', 'Серебро хранит чистый, холодный блеск, подобный свету луны.', '«Слова Господни — слова чистые, серебро, очищенное от земли в горниле».'],
  },
  {
    cat: 'color',
    en: ['Duotone Complementary Harmony', 'Photograph two objects of contrasting colors (e.g., orange and teal, blue and yellow).', 'The tension between opposites elevates visual resonance.', 'To everything there is an opposite, balanced by wisdom.'],
    hy: ['Երկու Հակադիր Գույների Ներդաշնակություն', 'Լուսանկարեք երկու իրար լրացնող գույներ (օրինակ՝ կապույտ և նարնջագույն):', 'Հակադրությունը ծնում է տեսողական ուժեղ ներդաշնակություն:', '«Ամեն ինչ ունի իր հակադիրը՝ իմաստությամբ հավասարակշռված»:'],
    ru: ['Контрастная гармония двух цветов', 'Сфотографируйте кадр с двумя контрастными цветами (синий и желтый, красный и зеленый).', 'Столкновение противоположных цветов рождает сильную визуальную энергию.', '«Одно напротив другого создал Бог, чтобы человек ничего не мог сказать против Него».'],
  },

  // --- 66 to 75: Animals & Living Creatures ---
  {
    cat: 'animals',
    en: ['A Sleeping Domestic Animal', 'Photograph a sleeping cat, dog, or resting house pet.', 'Capture the serene breathing posture curled in peaceful rest.', 'A righteous man cares for the needs of his animal.'],
    hy: ['Քնած Ընտանի Կենդանի', 'Լուսանկարեք քնած կատու, շուն կամ հանգստացող կենդանի:', 'Բռնեք խաղաղ շնչառության և հանգստության պահը:', '«Արդար մարդը հոգ է տանում իր անասունի մասին»:'],
    ru: ['Спящий домашний питомец', 'Сфотографируйте спящего кота, собаку или птицу в покое.', 'Передайте безмятежность и тихое доверие отдыхающего животного.', '«Праведный печется и о жизни скота своего, сердце же нечестивых жестоко».'],
  },
  {
    cat: 'animals',
    en: ['A Bird Perched on a Branch or Ledge', 'Photograph a sparrow, pigeon, or crow watching from above.', 'Focus on the sleek feather contour and keen observant eye.', 'Even the sparrow has found a home, and the swallow a nest for herself.'],
    hy: ['Թռչուն՝ Ճյուղին կամ Քիվին', 'Լուսանկարեք ճնճղուկ, աղավնի կամ թռչուն բարձր տեղում:', 'Կենտրոնացեք փետուրների և զգոն հայացքի վրա:', '«Նույնիսկ ճնճղուկն է իրեն տուն գտնում, և ծիծեռնակը՝ բույն»:'],
    ru: ['Птица на ветке или карнизе', 'Сфотографируйте воробья, голубя или птицу, сидящую на ветке.', 'Поймайте настороженный взгляд и четкий контур оперения.', '«И птичка находит себе жилье, и ласточка гнездо себе».'],
  },
  {
    cat: 'animals',
    en: ['Animal Paw Print or Track', 'Photograph a paw imprint left in mud, dust, or snow.', 'Single paw impression reveals the passing of a silent companion.', 'There are three things which are stately in stride, yes, four which are stately in walk.'],
    hy: ['Թաթի Հետքը Հողին', 'Լուսանկարեք կենդանու թաթի հետքը փոշու կամ ցեխի վրա:', 'Մեկ հետքը պատմում է լուռ անցորդի մասին:', '«Երեք բան կա, որ գեղեցիկ են իրենց քայլվածքով»:'],
    ru: ['След лапы на снегу или земле', 'Сфотографируйте отпечаток кошачьей или собачьей лапы на песке или пыли.', 'Одиночный след рассказывает о тихом ночном страннике.', '«Вот трое, которые имеют стройную походку, и четверо, которые стройно выступают».'],
  },
  {
    cat: 'animals',
    en: ['An Industrious Ant or Tiny Insect', 'Photograph an ant carrying a crumb or a ladybug on a leaf.', 'Get as close as possible to document micro-perseverance.', 'Go to the ant, you sluggard; consider its ways and be wise!'],
    hy: ['Աշխատասեր Մրջյուն', 'Լուսանկարեք մրջյուն կամ զատիկ տերևի վրա:', 'Մակրո կադրով ցույց տվեք փոքրիկ արարածի աշխատասիրությունը:', '«Գնա՛ մրջյունի մոտ, ո՛վ ծույլ, նայի՛ր նրա ճանապարհներին և իմաստո՛ւն եղիր»:'],
    ru: ['Трудолюбивый муравей или букашка', 'Сфотографируйте муравья на дорожке или божью коровку на травинке.', 'Приблизьтесь вплотную, чтобы показать неутомимый микромир.', '«Пойди к муравью, ленивец, посмотри на действия его, и будь мудрым».'],
  },
  {
    cat: 'animals',
    en: ['A Single Fallen Bird Feather', 'Photograph a dropped wing or tail feather on cobblestone or grass.', 'Intricate barbs and downy shaft exhibit marvelous aeronautic design.', 'He will cover you with his pinions, and under his wings you will find refuge.'],
    hy: ['Ընկած Թռչնի Փետուր', 'Լուսանկարեք գետնին ընկած թռչնի փետուր:', 'Փետուրի նուրբ կառուցվածքը ինքնին արվեստի գործ է:', '«Նա իր փետուրներով կծածկի քեզ, և նրա թևերի տակ ապահով կլինես»:'],
    ru: ['Одинокое птичье перо', 'Сфотографируйте оброненное птичье перо на траве или камне.', 'Тончайшие бороздки пера поражают совершенством аэродинамики.', '«Перьями Своими осенит тебя, и под крыльями Его будешь безопасен».'],
  },
  {
    cat: 'animals',
    en: ['Fish in Clear Water', 'Photograph fish swimming beneath water ripples in an aquarium or pond.', 'Capture sunlight rays cutting through the water above their scales.', 'The path of a fish in the sea is an ancient wonder.'],
    hy: ['Ձուկը Մաքուր Ջրում', 'Լուսանկարեք լողացող ձկնիկ ջրի խաղաղ ալիքների տակ:', 'Արևի շողերը բեկվում են ջրի մեջ նրանց թեփուկների վրա:', '«Ձկան ճանապարհը ծովի մեջ հնագույն հրաշքներից է»:'],
    ru: ['Рыба в прозрачной воде', 'Сфотографируйте рыбу в водоеме или аквариуме среди преломлений света.', 'Поймайте блеск чешуи в прозрачной струящейся воде.', '«Путь рыбы в море — одна из вещей, непонятных для меня».'],
  },
  {
    cat: 'animals',
    en: ['Spider Web with Morning Dewdrops', 'Photograph a geometric spider web strung between twigs with moisture beads.', 'Look for the spiraling silk spokes illuminated by morning light.', 'The spider catches with its hands, yet is in kings’ palaces.'],
    hy: ['Սարդոստայն՝ Ցողի Կաթիլներով', 'Լուսանկարեք սարդոստայնը ճյուղերի միջև՝ ցողի փոքրիկ կաթիլներով:', 'Առավոտյան լույսը լուսավորում է մետաքսյա թելերը:', '«Սարդն իր ձեռքերով է բռնում և թագավորների պալատներում է լինում»:'],
    ru: ['Паутина с каплями росы', 'Сфотографируйте спиральную паутину на ветке с бисером утренней росы.', 'Контровый свет превратит паутинку в ожерелье сверкающих капель.', '«Паук лапками цепляется, но бывает в царских чертогах».'],
  },
  {
    cat: 'animals',
    en: ['Close-up of Cat or Dog Whiskers / Eyes', 'Photograph the expressive muzzle, whiskers, or warm pupil of a pet.', 'Natural window light gives life to the reflection in their eye.', 'Like a faithful companion whose eyes know the heart of its master.'],
    hy: ['Կենդանու Աչքերն ու Բեղիկները', 'Լուսանկարեք ձեր ընտանի կենդանու հավատարիմ աչքերն ու բեղիկները:', 'Պատուհանի լույսը կենդանություն է տալիս հայացքին:', '«Ինչպես հավատարիմ ընկեր, որի աչքերը ճանաչում են տիրոջ սիրտը»:'],
    ru: ['Взгляд питомца и усы крупным планом', 'Сфотографируйте выразительные глаза или усы кошки или собаки.', 'Блик окна в зрачке оживит портрет четвероногого друга.', '«Глаза рабыни обращены на руку госпожи ее, так очи наши — к Господу».'],
  },
  {
    cat: 'animals',
    en: ['Moth or Butterfly with Patterned Wings', 'Photograph a winged insect resting with open ornamental wings.', 'Study the symmetrical powder scales on their delicate wings.', 'Like wings fashioned with sacred symmetry.'],
    hy: ['Թիթեռ կամ Թիթեռնիկ', 'Լուսանկարեք ծաղկի վրա նստած թիթեռի նախշազարդ թևերը:', 'Թևերի համաչափությունը բնության հրաշքն է:', '«Թևեր՝ արարված սուրբ համաչափությամբ»:'],
    ru: ['Бабочка или мотылек с узором крыльев', 'Сфотографируйте бабочку или ночного мотылька со сложенными крыльями.', 'Рассмотрите бархатистую пыльцу и симметрию крыльев.', '«Как лилия между тернами, так прекрасна возлюбленная моя».'],
  },
  {
    cat: 'animals',
    en: ['Snail Shell with Spiral Swirl', 'Photograph a garden snail or an empty spiral snail shell.', 'The shell exhibits the divine golden Fibonacci ratio in nature.', 'Slow is the pace, yet steadfast is the home it carries.'],
    hy: ['Խխունջ կամ Պարուրաձև Խեցի', 'Լուսանկարեք պարուրաձև խխունջ կամ նրա խեցին:', 'Խեցին ցույց է տալիս բնության ոսկե համաչափությունը:', '«Դանդաղ է քայլը, բայց հաստատուն է իր տունը»:'],
    ru: ['Раковина улитки со спиралью', 'Сфотографируйте улитку на стебле или пустую спиральную раковину.', 'Спираль раковины воплощает математическое золотое сечение.', '«Тиха поступь ее, но надежен дом, который она несет с собою».'],
  },

  // --- 76 to 85: Street & City Life ---
  {
    cat: 'street',
    en: ['An Old Cast-Iron Street Lantern', 'Photograph a street lamp, gas lantern, or post light against the sky.', 'Capture it either unlit against dusk or burning softly.', 'Your word is a lamp for my feet, a light on my path.'],
    hy: ['Քաղաքային Լապտերասյուն', 'Լուսանկարեք հին փողոցային լապտեր երեկոյան երկնքի ֆոնին:', 'Լապտերը մթության մեջ ցույց է տալիս ճանապարհը:', '«Քո խոսքը ճրագ է իմ ոտքերին և լույս՝ իմ շավիղներին»:'],
    ru: ['Чугунный уличный фонарь', 'Сфотографируйте уличный фонарь на кованом столбе в сумерках.', 'Зажженный фонарь создает на тротуаре круг теплого уюта.', '«Слово Твое — светильник ноге моей и свет стезе моей».'],
  },
  {
    cat: 'street',
    en: ['An Ornate Cast-Iron Manhole Cover', 'Photograph an ornamental utility cover or brass plate in cobblestone.', 'Notice the circular geometry and city emblems pressed into metal.', 'Foundation stones buried deep beneath the bustling avenue.'],
    hy: ['Նախշազարդ Լյուկ Փողոցում', 'Լուսանկարեք մետաղյա դիտահորի կափարիչը սալահատակի վրա:', 'Երկրաչափական նախշեր և քաղաքային զինանշաններ:', '«Հիմնաքարեր՝ թաղված քաղաքի եռուզեռի տակ»:'],
    ru: ['Узорный чугунный люк на мостовой', 'Сфотографируйте люк с геометрическим узором или датой отливки.', 'Взгляд строго сверху выявит строгий орнамент городского подземелья.', '«И положил основание на камне, и дом устоял среди бури».'],
  },
  {
    cat: 'street',
    en: ['A Weathered Public Bench in Solitude', 'Photograph an empty park or boulevard bench with falling leaves.', 'The vacant seat awaits weary travelers to rest their thoughts.', 'Come to me, all you who are weary and burdened, and I will give you rest.'],
    hy: ['Միայնակ Նստարան Պուրակում', 'Լուսանկարեք այգու դատարկ նստարանը թափված տերևների մեջ:', 'Դատարկ նստարանը սպասում է հոգնած ճամփորդի հանգստին:', '«Եկեք ինձ մոտ, բոլոր հոգնածներդ, և ես ձեզ հանգիստ կտամ»:'],
    ru: ['Одинокая скамейка в парке', 'Сфотографируйте пустую деревянную скамью в тихом сквере.', 'Опавшие листья на сиденье навевают размышления о времени.', '«В покое и уповании крепость ваша; возвратитесь и успокойтесь».'],
  },
  {
    cat: 'street',
    en: ['An Old Street Nameplate or House Number', 'Photograph an enameled or brass street sign or vintage house numeral.', 'Observe the patina and weathered numerals identifying a location.', 'A good name is more desirable than great riches.'],
    hy: ['Տան Համարանիշ կամ Փողոցի Ցուցանակ', 'Լուսանկարեք տան հին համարը կամ փողոցի էմալապատ անվանումը:', 'Տառերն ու թվերը կրում են տասնամյակների պատմություն:', '«Լավ անունը նախընտրելի է մեծ հարստությունից»:'],
    ru: ['Старинный номер дома или табличка', 'Сфотографируйте эмалированную табличку с номером дома или названием улицы.', 'Потертые буквы хранят память о поколениях жильцов.', '«Доброе имя лучше большого богатства, и добрая слава лучше серебра и золота».'],
  },
  {
    cat: 'street',
    en: ['A Vintage Postbox or Letter Slot', 'Photograph a metal mail slot in a door or a street postal pillar.', 'Imagine the letters of love, news, and sorrow that entered here.', 'Like cold water to a weary soul is good news from a distant land.'],
    hy: ['Փոստարկղ կամ Նամակի Ճեղք', 'Լուսանկարեք փոստարկղ կամ դռան նամակի մետաղյա ճեղքը:', 'Քանի՜ սիրո և բարևի նամակներ են անցել այստեղով:', '«Ինչպես պաղ ջուրը ծարաված հոգուն, այնպես էլ բարի լուրը՝ հեռու երկրից»:'],
    ru: ['Почтовый ящик или прорезь для писем', 'Сфотографируйте винтажный почтовый ящик или медную щель для писем.', 'Сколько признаний и вестей прошло через эти створки за долгие годы.', '«Что холодная вода для истомленной жаждой души, то добрая весть из дальней страны».'],
  },
  {
    cat: 'street',
    en: ['Shop Display Window with Distant Mannequin', 'Photograph a shop window reflection blending indoor items with passersby.', 'Layer indoor silhouettes against outdoor reflections.', 'They see the form, but wisdom looks into the essence.'],
    hy: ['Խանութի Ցուցափեղկ՝ Արտացոլանքով', 'Լուսանկարեք ցուցափեղկը, որտեղ միաձուլվում են ներսի իրերն ու անցորդները:', 'Շերտավորեք իրականությունն ու ապակու արտացոլանքը:', '«Մարդիկ նայում են երեսին, իսկ իմաստունը նայում է էությանը»:'],
    ru: ['Витрина с отражением прохожих', 'Сфотографируйте витрину, в которой интерьер смешивается с отражением улицы.', 'Совмещение двух миров в одной плоскости стекла рождает загадку.', '«Человек смотрит на лице, а Господь смотрит на сердце».'],
  },
  {
    cat: 'street',
    en: ['A Cobblestone Pavement with Glistening Joints', 'Photograph rounded river cobblestones forming an old street.', 'Low light turns the polished stone surfaces into glistening spheres.', 'The path of the upright is level; you make the path of the righteous smooth.'],
    hy: ['Սալահատակ Փողոց', 'Լուսանկարեք քարե սալահատակը ցածր անկյունից:', 'Լույսը քարերի միջև ընդգծում է դարավոր ճանապարհը:', '«Արդարի շավիղն ուղիղ է, Դու հարթեցնում ես նրա ճանապարհը»:'],
    ru: ['Булыжная мостовая в косых лучах', 'Сфотографируйте старую брусчатку крупным планом с низкой точки.', 'Окатанные камни блестят в контровом свете, словно спины рыб.', '«Путь праведника прям; Ты уравниваешь стезю праведника».'],
  },
  {
    cat: 'street',
    en: ['Graffiti Stencil or Street Mural Fragment', 'Photograph a compelling piece of urban wall art, glyph, or stencil.', 'Frame a small expressive fragment rather than the whole chaotic wall.', 'The stone will cry out from the wall, and the beam from the woodwork will answer it.'],
    hy: ['Փողոցային Որմնանկար կամ Գրաֆիտի', 'Լուսանկարեք պատի հետաքրքիր նկար կամ սիմվոլ:', 'Ընտրեք արտահայտիչ մի փոքր հատված պատի վրա:', '«Քարը պատից կաղաղակի, և հեծանը փայտից նրան կպատասխանի»:'],
    ru: ['Фрагмент уличного граффити или трафарет', 'Сфотографируйте выразительный фрагмент настенной росписи или символа.', 'Ограничьте кадр одной емкой деталью городского послания.', '«Камни из стен возопиют, и перекладины из дерева будут отвечать им».'],
  },
  {
    cat: 'street',
    en: ['A Public Fountain or Basin Spout', 'Photograph a lion head spout, bronze tap, or water basin in the square.', 'Freeze the silver stream of clear water suspended in midair.', 'With joy you will draw water from the wells of salvation.'],
    hy: ['Քաղաքային Ցայտաղբյուր կամ Ծորակ', 'Լուսանկարեք պուլպուլակ, բրոնզե ծորակ կամ շատրվան:', 'Բռնեք ջրի թափանցիկ շիթը օդում:', '«Ուրախությամբ ջուր պիտի քաղեք փրկության աղբյուրներից»:'],
    ru: ['Уличный фонтанчик или чугунный кран', 'Сфотографируйте струю питьевого фонтана или бронзовый носик крана.', 'Короткая выдержка остановит водяные капли в воздухе.', '«И в радости будете черпать воду из источников спасения».'],
  },
  {
    cat: 'street',
    en: ['A Bicycle Chained to a Lamppost', 'Photograph a parked bike leaning against a fence or post.', 'A symbol of quiet personal transportation paused on a journey.', 'He rests his mount, then rides on toward dawn.'],
    hy: ['Կապված Հեծանիվը Սյան Մոտ', 'Լուսանկարեք սյանը կապված հեծանիվը քաղաքում:', 'Հանգստի կարճ պահ երկար ճանապարհին:', '«Նա հանգստացնում է նժույգը, ապա սլանում դեպի արշալույս»:'],
    ru: ['Велосипед, прикованный к столбу', 'Сфотографируйте оставленный у стены или фонаря велосипед с замком.', 'Пауза посреди суеты мегаполиса говорит о неспешном ритме жизни.', '«Остановитесь и познайте, что Я — Бог; буду превознесен в народах».'],
  },

  // --- 86 to 95: Geometry & Abstract Forms ---
  {
    cat: 'geometry',
    en: ['The Perfect Circle', 'Photograph an intentional circular form: ring, lens, washer, or hoop.', 'Center the circle in the frame to celebrate pure symmetry.', 'He drew a circle on the face of the deep.'],
    hy: ['Կատարյալ Շրջան', 'Լուսանկարեք կատարյալ կլոր առարկա՝ մատանի, օղակ կամ ոսպնյակ:', 'Տեղադրեք շրջանը կենտրոնում՝ սիմետրիան ցույց տալու համար:', '«Նա շրջան գծեց անդունդի երեսին»:'],
    ru: ['Идеальный круг', 'Сфотографируйте подчеркнуто круглый предмет: кольцо, объектив, шайбу.', 'Поместите круг строго по центру, воспевая совершенство окружности.', '«Когда Он чертил круговую черту по лицу бездны, я была там».'],
  },
  {
    cat: 'geometry',
    en: ['A Sharp Triangular Apex', 'Photograph a sharp triangular shadow, roof pediment, or geometric wedge.', 'Triangles deliver dynamic upward direction and structural stability.', 'A threefold chord is not quickly broken.'],
    hy: ['Սուր Եռանկյունի Գագաթ', 'Լուսանկարեք եռանկյունի ստվեր կամ տանիքի գագաթ:', 'Եռանկյունին ուժ և հաստատունություն է հաղորդում կադրին:', '«Եռապատիկ կապը շուտով չի խզվի»:'],
    ru: ['Четкий треугольник или клин', 'Сфотографируйте треугольную тень, фронтон крыши или клин.', 'Треугольник придает кадру мощный вектор и динамическую устойчивость.', '«И нитка, втрое скрученная, нескоро порвется».'],
  },
  {
    cat: 'geometry',
    en: ['A Sequence of Parallel Lines', 'Photograph parallel window blinds, fence pickets, or radiator fins.', 'Rhythmic repetition creates optical melody in space.', 'He sets the lines in order, measuring the span of heavens.'],
    hy: ['Զուգահեռ Գծերի Ռիթմ', 'Լուսանկարեք վարագույրի, ցանկապատի կամ ճաղերի զուգահեռ գծերը:', 'Կրկնությունը երաժշտության նման ռիթմ է տալիս կադրին:', '«Նա կարգի է բերում գծերը՝ չափելով երկնքի տարածությունը»:'],
    ru: ['Ритм параллельных линий', 'Сфотографируйте параллельные планки жалюзи, рейки забора или ступени.', 'Мерный ритм линий создает ощущение музыкального такта.', '«Кто исчерпал воды горстью своею и пядию измерил небеса».'],
  },
  {
    cat: 'geometry',
    en: ['A Natural or Mechanical Spiral', 'Photograph a coiled wire, sea shell, clock spring, or spiral pasta.', 'The spiral expands outward like cosmic galaxies.', 'The wind blows to the south and turns to the north; round and round it goes.'],
    hy: ['Պարույր (Սպիրալ)', 'Լուսանկարեք գալարված լար, խեցի կամ զսպանակ:', 'Պարույրը տիեզերական աճի և զարգացման խորհրդանիշն է:', '«Հողմը գնում է դեպի հարավ և պտտվում դեպի հյուսիս. անընդհատ պտտվում է»:'],
    ru: ['Природная или механическая спираль', 'Сфотографируйте витой провод, пружину часов, раковину или спиральную макаронину.', 'Спираль разворачивается из центра, повторяя закон галактик.', '«Идет ветер к югу, и переходит к северу, кружится, кружится на ходу своем».'],
  },
  {
    cat: 'geometry',
    en: ['Checkerboard or Grid Matrix', 'Photograph tile flooring, wire mesh, or window panes in a grid.', 'Perspective convergence turns flat squares into dimensional depth.', 'He measured the court: a square, a hundred cubits long and wide.'],
    hy: ['Շախմատաձև Ցանց կամ Վանդակներ', 'Լուսանկարեք հատակի սալիկների կամ պատուհանի վանդակավոր ցանցը:', 'Հեռանկարը քառակուսիներին տալիս է խորություն:', '«Նա չափեց գավիթը՝ հարյուր կանգուն երկարությամբ և հարյուր կանգուն լայնությամբ քառակուսի»:'],
    ru: ['Шахматная сетка или решётка', 'Сфотографируйте клетчатую плитку пола, сетку рабицу или переплет окон.', 'Уходящая вдаль сетка превращает плоскость в бесконечную глубину.', '«И измерил двор: сто локтей длины и сто локтей ширины, четырехугольный».'],
  },
  {
    cat: 'geometry',
    en: ['A Radiant Starburst or Polygon', 'Photograph a star-shaped ornament, origami polygon, or sunburst fixture.', 'Radiating spokes celebrate the dispersion of energy from a center.', 'There is one glory of the sun, and another glory of the stars.'],
    hy: ['Ճառագայթող Աստղ կամ Բազմանկյուն', 'Լուսանկարեք աստղաձև զարդ, օրիգամի կամ ճառագայթող լուսամփոփ:', 'Կենտրոնից ճառագայթող գծերը լույսի խորհրդանիշն են:', '«Արեգակի փառքն այլ է, լուսնի փառքն այլ, և աստղերի փառքն այլ»:'],
    ru: ['Лучистая звезда или многоугольник', 'Сфотографируйте звездообразный орнамент, многогранник или спицы зонта.', 'Расходящиеся лучи напоминают о сиянии света из единого центра.', '«Иная слава солнца, иная слава луны, иная звезд; и звезда от звезды разнится в славе».'],
  },
  {
    cat: 'geometry',
    en: ['A Pure Cube or Rectangular Prism', 'Photograph a wooden block, dice, sealed box, or stone block.', 'Light falling across three adjacent facets defines 3D reality.', 'Its length, width, and height were equal.'],
    hy: ['Խորանարդ կամ Ուղղանկյուն Բլոկ', 'Լուսանկարեք փայտե խորանարդ, զառ կամ տուփ:', 'Երեք նիստերի վրա ընկնող լույսը ցույց է տալիս եռաչափ ծավալը:', '«Նրա երկարությունը, լայնությունը և բարձրությունը հավասար էին»:'],
    ru: ['Куб или правильный параллелепипед', 'Сфотографируйте деревянный кубик, игральную кость или коробку.', 'Свет, падающий на три смежные грани, подчеркнет объем предмета.', '«Длина и широта и вышина его равны».'],
  },
  {
    cat: 'geometry',
    en: ['Concentric Ripples in Water', 'Photograph a single drop hitting still water creating expanding circles.', 'Capture the ephemeral circular waves before they vanish.', 'As face answers to face in water, so the heart of man to man.'],
    hy: ['Ջրի Համակենտրոն Ալիքներ', 'Լուսանկարեք ջրի կաթիլից առաջացած տարածվող շրջանները:', 'Բռնեք կլոր ալիքները նախքան նրանց մարելը:', '«Ինչպես ջրի մեջ երեսը երեսին է նայում, այնպես էլ մարդու սիրտը՝ մարդուն»:'],
    ru: ['Концентрические круги на воде', 'Сфотографируйте расходящиеся круги от упавшей в воду капли.', 'Короткая выдержка зафиксирует мимолетную геометрию всплеска.', '«Как в воде лицо — к лицу, так сердце человека — к человеку».'],
  },
  {
    cat: 'geometry',
    en: ['An Ellipse Seen in Angled Perspective', 'Photograph a circular glass or plate viewed from a low oblique angle.', 'Notice how the perfect circle transforms into a slender ellipse.', 'The eyes see by perspective what the mind understands in truth.'],
    hy: ['Էլիպս՝ Անկյունային Հայացքով', 'Լուսանկարեք կլոր ափսե կամ բաժակ թեք անկյունից:', 'Շրջանը թեքվելիս վերածվում է նուրբ էլիպսի:', '«Աչքերը հեռանկարով են տեսնում այն, ինչ միտքն ըմբռնում է ճշմարտությամբ»:'],
    ru: ['Эллипс в перспективном ракурсе', 'Сфотографируйте круглую тарелку или стакан под острым углом.', 'В перспективе круг превращается в изящный вытянутый эллипс.', '«Светло око твое, и все тело твое будет светло».'],
  },
  {
    cat: 'geometry',
    en: ['Rhombus or Diamond Silhouette', 'Photograph a diamond pattern on a sweater, argyle sock, or playing card.', 'The balanced diamond tilts balance into elegance.', 'Wisdom is more precious than diamonds.'],
    hy: ['Շեղանկյուն (Ռոմբ)', 'Լուսանկարեք շեղանկյուն նախշ գործվածքի կամ խաղաքարտի վրա:', 'Ռոմբը հավասարակշռում է երկրաչափությունը:', '«Իմաստությունը թանկ է ադամանդներից»:'],
    ru: ['Ромб или силуэт алмаза', 'Сфотографируйте узор ромба на свитере, плитке или игральной карте.', 'Поставленный на угол квадрат рождает утонченную элегантность.', '«Мудрость лучше жемчуга, и ничто из желаемого не сравнится с нею».'],
  },

  // --- 96 to 105: Human Presence, Relics & Shadows ---
  {
    cat: 'everyday',
    en: ['Two Crossed Hands or Open Palms', 'Photograph weathered hands resting on a table or held open in offering.', 'Skin lines and knuckles record a lifetime of labor and thought.', 'Commit your work to the Lord, and your plans will be established.'],
    hy: ['Խաչված Ձեռքեր կամ Բաց Ափեր', 'Լուսանկարեք սեղանին դրված աշխատավոր ձեռքեր կամ բաց ափեր:', 'Ձեռքերի կնճիռները պատմում են ապրած կյանքի մասին:', '«Քո գործերը հանձնի՛ր Տիրոջը, և քո ծրագրերը կհաստատվեն»:'],
    ru: ['Сложенные руки или открытые ладони', 'Сфотографируйте руки, лежащие на столе, или раскрытые ладони.', 'Линии на ладонях и узловатые пальцы хранят летопись трудов.', '«Предай Господу дела твои, и предприятия твои совершатся».'],
  },
  {
    cat: 'everyday',
    en: ['Reading Glasses Resting on Text', 'Photograph spectacles resting atop an open book page.', 'The convex lenses magnify and distort the printed words beneath.', 'Apply your eyes to reading, and your heart to discernment.'],
    hy: ['Ակնոց՝ Գրքի Էջի Վրա', 'Լուսանկարեք ակնոցը բաց գրքի էջի վրա:', 'Ոսպնյակները մեծացնում են տառերը՝ բացելով իմաստը:', '«Աչքերդ տուր ընթերցանությանը, իսկ սիրտդ՝ իմաստությանը»:'],
    ru: ['Очки для чтения на раскрытой книге', 'Сфотографируйте очки в оправе, лежащие поверх печатных строк.', 'Стекла линз увеличат типографский шрифт, выделив главное слово.', '«Купи истину и не продавай мудрости и учения и разума».'],
  },
  {
    cat: 'light',
    en: ['Dust Motes Dancing in a Light Beam', 'Photograph dust particles illuminated in a single ray cutting through a shutter.', 'Tiny golden motes float like miniature stars in the beam.', 'The wind blows where it pleases; you hear its sound but cannot tell where it comes from.'],
    hy: ['Փոշու Հատիկները Լույսի Շողում', 'Լուսանկարեք փոշու հատիկները, որոնք պարում են արևի շողի մեջ:', 'Մանրագույն կայծերը լույսի մեջ նման են աստղերի:', '«Քամին փչում է, որտեղ կամենում է. դու լսում ես նրա ձայնը, բայց չգիտես, որտեղից է գալիս»:'],
    ru: ['Пылинки, танцующие в луче света', 'Сфотографируйте освещенные золотые пылинки в узком луче сквозь шторы.', 'Хаотичный танец микрочастиц в воздухе напоминает созвездия.', '«Дух дышит, где хочет, и голос его слышишь, а не знаешь, откуда приходит и куда уходит».'],
  },
  {
    cat: 'artefact',
    en: ['Wax Seal or Stamped Imprint', 'Photograph a red wax seal, ink rubber stamp, or embossed emblem on paper.', 'The seal signifies finality, authenticity, and secret authority.', 'Set me as a seal upon your heart, as a seal upon your arm.'],
    hy: ['Կնիք կամ Մոմե Դրոշմ', 'Լուսանկարեք կարմիր մոմե կնիքը կամ թանաքոտ դրոշմը թղթի վրա:', 'Կնիքը խորհրդանշում է գաղտնիք, վստահություն և իշխանություն:', '«Ինձ կնիքի պես դիր քո սրտի վրա, կնիքի պես՝ քո բազկի վրա»:'],
    ru: ['Сургучная печать или оттиск штампа', 'Сфотографируйте красную сургучную печать или рельефный оттиск на конверте.', 'Печать утверждает нерушимость тайны и подлинность слова.', '«Положи меня, как печать, на сердце твое, как перстень, на руку твою».'],
  },
  {
    cat: 'light',
    en: ['A Golden Sunbeam on Floorboards', 'Photograph a patch of bright morning sunlight warming a wooden floor.', 'Contrast the radiant illuminated rhombus with surrounding dimness.', 'Light is sweet, and it pleases the eyes to see the sun.'],
    hy: ['Արևի Ոսկե Շողը Հատակին', 'Լուսանկարեք առավոտյան արևի շողը փայտե հատակի վրա:', 'Լուսավորված հատվածը ջերմություն է բերում ամբողջ սենյակին:', '«Քաղցր է լույսը, և հաճելի է աչքերին արեգակը տեսնել»:'],
    ru: ['Солнечный луч на деревянном полу', 'Сфотографируйте прямоугольник яркого солнечного света на дощатом полу.', 'Теплое сияние древесины в луче согревает комнату.', '«Сладок свет, и приятно для глаз видеть солнце».'],
  },
  {
    cat: 'everyday',
    en: ['A Solitary Sewing Needle and Thread', 'Photograph a steel needle with cotton thread passing through its eye.', 'Focus right on the needle’s eye where thread conquers the narrow passage.', 'A time to tear and a time to mend.'],
    hy: ['Ասեղ և Թել', 'Լուսանկարեք պողպատե ասեղը՝ ականջիկից անցնող թելով:', 'Կենտրոնացեք ասեղի ծայրի և թելի նրբության վրա:', '«Պատռելու ժամանակ, և կարելու ժամանակ»:'],
    ru: ['Швейная игла с нитью', 'Сфотографируйте стальную иглу с продетой в ушко нитью крупным планом.', 'Сфокусируйтесь на узком отверстии ушка и острие иглы.', '«Время раздирать, и время сшивать; время молчать, и время говорить».'],
  },
  {
    cat: 'everyday',
    en: ['Folded Umbrella Dripping after Rain', 'Photograph an umbrella resting against a door with water droplets.', 'Dark fabric with transparent water beads speaks of passed storms.', 'He sends rain on the righteous and the unrighteous.'],
    hy: ['Ծալված Անձրևանոց՝ Անձրևից Հետո', 'Լուսանկարեք անձրևանոցը՝ ծածկված անձրևի կաթիլներով:', 'Անձրևանոցը պատսպարում է փոթորկից հետո:', '«Նա անձրև է տալիս արդարներին և անարդարներին»:'],
    ru: ['Сложенный зонт с каплями дождя', 'Сфотографируйте мокрый зонт в прихожей с блестящими каплями воды.', 'Темный купол с бисером капель напоминает об утихшей непогоде.', '«Ибо Он повелевает солнцу Своему восходить над злыми и добрыми и посылает дождь на праведных и неправедных».'],
  },
  {
    cat: 'artefact',
    en: ['A Solitary Chess Piece on a Surface', 'Photograph a wooden or stone Knight or King standing solitary.', 'Side lighting casts a noble, contemplative shadow behind the piece.', 'The horse is made ready for the day of battle, but victory rests with the Lord.'],
    hy: ['Շախմատի Ֆիգուր', 'Լուսանկարեք շախմատի փայտե արքան կամ ձին մակերեսի վրա:', 'Կողային լույսը երկար, իմաստուն ստվեր է գցում ֆիգուրի հետևում:', '«Ձին պատրաստվում է պատերազմի օրվա համար, բայց հաղթանակը Տիրոջից է»:'],
    ru: ['Одинокая шахматная фигура', 'Сфотографируйте деревянного коня или ферзя на пустом столе.', 'Боковой свет отбросит длинную благородную тень.', '«Коня приготовляют на день битвы, но победа — от Господа».'],
  },
  {
    cat: 'everyday',
    en: ['A Knotted Rope or Cord', 'Photograph thick hemp or jute rope tied in an intricate sailor’s knot.', 'Tightly twisted fibers demonstrate cohesion and tensile resolve.', 'A twisted cord cannot easily be broken.'],
    hy: ['Հանգուցված Պարան', 'Լուսանկարեք հաստ պարանը՝ կապված ամուր հանգույցով:', 'Հյուսված թելերը ցույց են տալիս ամրություն և միասնություն:', '«Ոլորված պարանը հեշտությամբ չի կտրվի»:'],
    ru: ['Завязанная узлом пеньковая верёвка', 'Сфотографируйте канат или шнур, завязанный красивым морским узлом.', 'Переплетение грубых волокон олицетворяет надежность и крепость.', '«И нитка, втрое скрученная, нескоро порвется».'],
  },
  {
    cat: 'artefact',
    en: ['The Solomon Ring with Inscribed Motto', 'Photograph a signet ring, metal band, or talisman with an inscription.', 'Let raking light illuminate the engraved words circling the band.', '"This too shall pass" — the timeless inscription of King Solomon.'],
    hy: ['Սողոմոնի Մատանին', 'Լուսանկարեք մետաղյա մատանի կամ կնիք՝ փորագրված խոսքերով:', 'Լույսը ցույց է տալիս փորագրված իմաստուն խոսքերը:', '«Սա էլ կանցնի» — Սողոմոն Իմաստունի հավերժական խոսքը:'],
    ru: ['Кольцо Соломона с надписью', 'Сфотографируйте металлическое кольцо или печатку с выгравированной надписью.', 'Пусть косой свет выделит буквы, огибающие ободок.', '«И это пройдет» — вечная надпись на перстне царя Соломона.']
  }
];

// Append remaining generated tasks to reach 105
categoriesPool.forEach((item, index) => {
  const num = 16 + index;
  const id = `solomon_${String(num).padStart(3, '0')}`;
  tasks.push(t(
    id,
    item.cat,
    item.en[0], item.hy[0], item.ru[0],
    item.en[1], item.hy[1], item.ru[1],
    item.en[2], item.hy[2], item.ru[2],
    item.en[3], item.hy[3], item.ru[3]
  ));
});

console.log(`Generated ${tasks.length} total tasks!`);

const outputTs = `import type { TaskDefinition } from '../types';

export const TASKS_DATABASE: TaskDefinition[] = ${JSON.stringify(tasks, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/tasks.ts'), outputTs, 'utf-8');
console.log('Saved to src/data/tasks.ts');
