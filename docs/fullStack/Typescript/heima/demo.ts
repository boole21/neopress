type Props = { a: number; b: string; c: boolean };

type TypeA = Props["a" | "b"];
type TypeB = Props[keyof Props];
