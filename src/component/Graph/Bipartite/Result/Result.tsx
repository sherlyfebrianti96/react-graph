interface BipartiteResultProps {
  input: string;
}

export const BipartiteResult = ({ ...props }: BipartiteResultProps) => {
	/* Uppercase alphabets */
	const alphabets = Array.from({length: 26}, (_, i) => String.fromCharCode(i + 65));

  return <>RESULT!!!</>;
};
