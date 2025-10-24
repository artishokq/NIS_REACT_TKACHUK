interface FooterProps {
  fullName: string;
  educationGroup: string;
  email: string;
}

function Footer({ fullName, educationGroup, email }: FooterProps) {
  return (
    <footer className="footerContainer">
      <p className="footerParagraph">
        Выполнил: {fullName}, {educationGroup}. Email: {email}
      </p>
    </footer>
  );
}

export default Footer;
