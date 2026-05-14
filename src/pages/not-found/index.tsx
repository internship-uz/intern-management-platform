import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted-foreground">Sahifa topilmadi</p>
      <Link to="/" className="text-primary underline underline-offset-4">
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
}
