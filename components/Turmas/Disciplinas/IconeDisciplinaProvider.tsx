import IconesDisciplinas from "@/components/Turmas/Disciplinas/IconesDisciplinas";

const IconeDisciplinaProvider: React.FC<{ indice: number }> = ({ indice }) => {
  const icones = IconesDisciplinas;
  const Icone = icones[indice % icones.length];
  return <Icone height={150} width={300} className=" top-2 right-6" />;
};

export default IconeDisciplinaProvider;
