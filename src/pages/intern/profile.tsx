import { useAuth } from "@/features/auth";
import { useIntern } from "@/features/interns";
import { useTranslation } from "@/i18n";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function InternProfilePage() {
  const { t } = useTranslation();
  const { internId } = useAuth();
  const { intern, loading, error, refetch } = useIntern(internId);

  if (loading) {
    return <p className="text-muted-foreground">{t("common.loading")}</p>;
  }

  if (error || !intern) {
    return (
      <div className="flex flex-col items-start gap-3">
        <p className="text-destructive">{t("common.error")}</p>
        <Button variant="outline" size="sm" onClick={refetch}>
          {t("common.retry")}
        </Button>
      </div>
    );
  }

  const rows = [
    { label: t("auth.email"), value: intern.email },
    { label: t("intern.direction"), value: intern.direction },
    { label: t("intern.level"), value: intern.level },
    { label: t("intern.joinedAt"), value: intern.joinedAt },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{t("intern.profile")}</h1>

      <Card className="max-w-xl">
        <CardContent className="flex flex-col gap-6 pt-2">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarImage src={intern.avatar} alt={intern.name} />
              <AvatarFallback>{intern.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <span className="text-lg font-semibold">{intern.name}</span>
              <Badge
                variant={intern.status === "active" ? "default" : "secondary"}
                className="w-fit"
              >
                {intern.status}
              </Badge>
            </div>
          </div>

          <dl className="grid gap-3 sm:grid-cols-2">
            {rows.map((row) => (
              <div key={row.label} className="flex flex-col">
                <dt className="text-xs text-muted-foreground">{row.label}</dt>
                <dd className="text-sm font-medium">{row.value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
