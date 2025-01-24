// "2025-01-17T14:14:13+00:00"
export function getDateInfo(dateString: string): string {
  if (dateString == "") return "";
  const inputDate = new Date(dateString);
  const currentDate = new Date();

  const isSameDay =
    inputDate.getDate() === currentDate.getDate() &&
    inputDate.getMonth() === currentDate.getMonth() &&
    inputDate.getFullYear() === currentDate.getFullYear();

  if (!isSameDay) {
    return inputDate.toLocaleDateString(undefined, { weekday: "short" });
  } else {
    const hours = inputDate.getHours().toString().padStart(2, "0");
    const minutes = inputDate.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
}
