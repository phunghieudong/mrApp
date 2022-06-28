import { useAppSelector } from "@/store/hook";
import i18n from "i18n-js";

i18n.translations = {
  en: { welcome: "Hello" },
  vn: { welcome: "Xin chào" },
};
i18n.fallbacks = true;
const useTranslateLanguage = () => {
  const currentLanguage = useAppSelector((state) => state.language.current);

  const getTranslatedText = (key: "welcome") => {
    return i18n.t(key, { locale: currentLanguage });
  };
  return { getTranslatedText };
};

export default useTranslateLanguage;
