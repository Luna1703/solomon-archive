import type { Achievement } from '../types';

export const ACHIEVEMENTS_LIST: Achievement[] = [
  {
    id: 'first_relic',
    icon: 'Sparkles',
    title: {
      en: 'First Shot',
      hy: 'Առաջին Կադր',
      ru: 'Первый кадр'
    },
    description: {
      en: 'Save your very first photograph into Solomon\'s Archive.',
      hy: 'Պահպանեք ձեր առաջին լուսանկարը Սողոմոնի Արխիվում:',
      ru: 'Сохраните свою первую фотографию в Архив Соломона.'
    },
    condition: {
      type: 'artifact_count',
      target: 1
    }
  },
  {
    id: 'streak_3',
    icon: 'Flame',
    title: {
      en: 'Spark of Habit',
      hy: 'Սովորության Կայծ',
      ru: 'Искра привычки'
    },
    description: {
      en: 'Maintain an uninterrupted streak of 3 days.',
      hy: 'Պահպանեք անընդմեջ 3 օրվա շարք:',
      ru: 'Удержите непрерывную серию в течение 3 дней.'
    },
    condition: {
      type: 'streak',
      target: 3
    }
  },
  {
    id: 'streak_7',
    icon: 'FlameKindling',
    title: {
      en: 'The Eternal Flame',
      hy: 'Հավերժական Կրակ',
      ru: 'Неугасимое пламя'
    },
    description: {
      en: 'Achieve a 7-day streak of daily archiving.',
      hy: 'Հասեք ամենօրյա արխիվացման 7-օրյա շարքի:',
      ru: 'Достигните серии в 7 дней ежедневных открытий.'
    },
    condition: {
      type: 'streak',
      target: 7
    }
  },
  {
    id: 'streak_14',
    icon: 'Crown',
    title: {
      en: 'Master of Fortitude',
      hy: 'Տոկունության Վարպետ',
      ru: 'Магистр стойкости'
    },
    description: {
      en: 'Keep the archive burning for 14 continuous days.',
      hy: 'Պահպանեք արխիվի կրակը անընդմեջ 14 օր:',
      ru: 'Поддерживайте огонь архива 14 дней подряд.'
    },
    condition: {
      type: 'streak',
      target: 14
    }
  },
  {
    id: 'collector_3',
    icon: 'Compass',
    title: {
      en: 'Novice Archivist',
      hy: 'Սկսնակ Արխիվարիուս',
      ru: 'Младший Архивариус'
    },
    description: {
      en: 'Catalog 3 distinct relics in the archive.',
      hy: 'Գրանցեք 3 տարբեր մասունք արխիվում:',
      ru: 'Внесите 3 реликвии в каталог архива.'
    },
    condition: {
      type: 'artifact_count',
      target: 3
    }
  },
  {
    id: 'collector_7',
    icon: 'Scroll',
    title: {
      en: 'Keeper of Records',
      hy: 'Գրառումների Պահապան',
      ru: 'Хранитель Записей'
    },
    description: {
      en: 'Assemble a collection of 7 preserved relics.',
      hy: 'Հավաքեք 7 պահպանված մասունքների հավաքածու:',
      ru: 'Соберите коллекцию из 7 сохранённых реликвий.'
    },
    condition: {
      type: 'artifact_count',
      target: 7
    }
  },
  {
    id: 'collector_15',
    icon: 'Gem',
    title: {
      en: 'Grand Curator',
      hy: 'Գլխավոր Կուրատոր',
      ru: 'Великий Куратор'
    },
    description: {
      en: 'Fill the halls with 15 unique photographs.',
      hy: 'Լցրեք սրահները 15 յուրահատուկ լուսանկարներով:',
      ru: 'Наполните залы 15 уникальными фотографиями.'
    },
    condition: {
      type: 'artifact_count',
      target: 15
    }
  },
  {
    id: 'chronicler',
    icon: 'Feather',
    title: {
      en: 'The Chronicler',
      hy: 'Տարեգիր',
      ru: 'Летописец'
    },
    description: {
      en: 'Seal a relic with an archivist log / personal note.',
      hy: 'Կնքեք մասունքը արխիվարիուսի գրառումով:',
      ru: 'Запечатайте реликвию вместе с личной заметкой архивариуса.'
    },
    condition: {
      type: 'has_note',
      target: 1
    }
  },
  {
    id: 'polymath',
    icon: 'Layers',
    title: {
      en: 'Polymath',
      hy: 'Բազմագետ',
      ru: 'Полимат'
    },
    description: {
      en: 'Photograph relics across at least 3 different categories.',
      hy: 'Լուսանկարեք մասունքներ առնվազն 3 տարբեր կատեգորիաներից:',
      ru: 'Соберите реликвии минимум из 3 разных категорий.'
    },
    condition: {
      type: 'category_count',
      target: 3
    }
  },
  {
    id: 'dawn_sage',
    icon: 'Sun',
    title: {
      en: 'Dawn Sage',
      hy: 'Արշալույսի Իմաստուն',
      ru: 'Мудрец Рассвета'
    },
    description: {
      en: 'Complete an archival quest in the morning (before 9:00 AM).',
      hy: 'Կատարեք առաքելությունը առավոտյան (մինչև ժամը 9:00):',
      ru: 'Выполните архивную миссию утром (до 09:00).'
    },
    condition: {
      type: 'time_of_day',
      target: 1,
      timeWindow: 'morning'
    }
  },
  {
    id: 'night_watch',
    icon: 'Moon',
    title: {
      en: 'Night Watcher',
      hy: 'Գիշերային Դիտորդ',
      ru: 'Ночной Страж'
    },
    description: {
      en: 'Capture a relic under the cover of night (after 8:00 PM).',
      hy: 'Լուսանկարեք մասունք գիշերվա խորհրդավոր պահին (ժամը 20:00-ից հետո):',
      ru: 'Запечатлейте реликвию под покровом ночи (после 20:00).'
    },
    condition: {
      type: 'time_of_day',
      target: 1,
      timeWindow: 'night'
    }
  }
];
