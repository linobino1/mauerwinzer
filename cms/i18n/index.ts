import { Translations } from './translations';

const locale = 'de';

// get a translation, fallback to key
// eslint-disable-next-line @typescript-eslint/naming-convention
export const t = (key: string, replacers: Record<string, string> = {}): Record<string, string> => {
  const res: Record<string, string> = {
    en: '',
    de: '',
  };
  res.de = Translations[key]?.de || key;
  res.en = Translations[key]?.en || key;

  // treat replacers
  Object.keys(replacers).forEach((_key) => {
    res.de = res.de?.replace(`{${_key}}`, replacers[_key]);
    res.en = res.en?.replace(`{${_key}}`, replacers[_key]);
  });

  return res;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const _t = (key: string, replacers: Record<string, string> = {}): string => {
  const res = t(key, replacers);
  return res[locale] || '';
};
