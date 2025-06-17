import { ReactNode } from "react";

interface Props {
  id: string;
  className?: string;
  children: ReactNode;
}

export default function Section({ id, className, children }: Props) {
  return (
    <section id={id} className={`relative h-[300vh] ${className || ""}`}>
      <div className="sticky inset-0 flex items-center justify-center">
        {children}
      </div>
    </section>
  );
}
