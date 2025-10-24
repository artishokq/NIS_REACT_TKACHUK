interface HeaderProps {
  title: string;
  description: string;
}

function Header({ title, description }: HeaderProps) {
  return (
    <header className="headerContainer">
      <h1 className="headerTitle">{title}</h1>
      <p className="headerDescription">{description}</p>
    </header>
  );
}

export default Header;
