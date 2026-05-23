import type { EventAuthor } from "#/data/events";

type Props = {
  author: EventAuthor;
  size?: number;
};

export function Avatar({ author, size = 24 }: Props) {
  const initial = author.name?.[0] ?? "?";
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-bold shrink-0"
      style={{
        width: size,
        height: size,
        background: author.avatar,
        fontSize: size * 0.45,
      }}
    >
      {initial}
    </div>
  );
}
