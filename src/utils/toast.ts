export function showToast(text: string, className: "success" | "error" | "loading" | "error") {
  const toast = document.getElementById("toast");
  if (toast) {
    toast.textContent = text;
    toast.className = `toast show ${className}-toast`;
    setTimeout(() => {
      toast.className = toast.className.replace("show", "");
    }, 3000);
  }
}
