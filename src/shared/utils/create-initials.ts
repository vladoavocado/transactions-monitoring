interface ICreateInitialsProps {
  firstName: string;
  lastName: string;
  patronymic?: string;
}

const firstUppercaseLetter = (word: string, postfix: string = '.') => {
  const letter = word[0].toUpperCase();
  return `${letter}${postfix}`;
};

export const createInitials = ({
  firstName,
  lastName,
  patronymic,
}: ICreateInitialsProps) => {
  const initials = `${lastName} ${firstUppercaseLetter(firstName)}`;

  return patronymic
    ? `${initials} ${firstUppercaseLetter(patronymic)}`
    : initials;
};
