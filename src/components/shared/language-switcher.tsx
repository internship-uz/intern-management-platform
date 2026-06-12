import { Button } from "@/components/ui/button";
import { LANGUAGE_OPTIONS, useTranslation, type Language } from "@/i18n";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language as Language;

  return (
    <div className="flex items-center gap-1">
      {LANGUAGE_OPTIONS.map((opt) => (
        <Button
          key={opt.value}
          type="button"
          size="sm"
          variant={current === opt.value ? "default" : "ghost"}
          onClick={() => i18n.changeLanguage(opt.value)}
        >
          {opt.value.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}
