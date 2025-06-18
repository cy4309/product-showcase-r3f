import { ReactNode } from "react";

interface Props {
  id: string;
  children: ReactNode;
  pin?: boolean;
  className?: string;
}

export default function Section({ id, children, pin, className }: Props) {
  return (
    <section
      id={id}
      className={`${pin ? "relative h-[300vh]" : "relative"} ${className}`}
    >
      <div
        className={pin ? "sticky inset-0 flex items-center justify-center" : ""}
      >
        {children}
      </div>
    </section>
  );
}
