export function formatRelativeTime(created_at: string): React.ReactNode {
  const date = new Date(created_at);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  if (diff < 604800)
    return `${Math.floor(diff / 86400)} day${
      Math.floor(diff / 86400) > 1 ? "s" : ""
    } ago`;

  return date.toLocaleDateString();
}
