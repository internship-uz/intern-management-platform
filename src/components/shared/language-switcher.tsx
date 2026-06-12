import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANGUAGE_OPTIONS, useTranslation, type Language } from "@/i18n";

const FLAGS: Record<Language, string> = {
  uz: "🇺🇿",
  ru: "🇷🇺",
  en: "🇬🇧",
};

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = (i18n.language as Language) in FLAGS
    ? (i18n.language as Language)
    : "uz";

  return (
    <Select
      value={current}
      onValueChange={(value) => i18n.changeLanguage(value as Language)}
    >
      <SelectTrigger size="sm" className="gap-2">
        <SelectValue />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false}>
        {LANGUAGE_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            <span className="text-base leading-none">{FLAGS[opt.value]}</span>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
