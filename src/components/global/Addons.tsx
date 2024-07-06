import { format, parseISO } from "date-fns";
import { ka } from "date-fns/locale";

export const FormatTime = (dateString: string) => {
  const date = parseISO(dateString);
  return format(date, "dd MMM HH:mm", { locale: ka });
};
