// src/components/Link.tsx
import { useRouter } from "./Router";

export const Link = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  const { navigate } = useRouter();

  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
};
