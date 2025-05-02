export default function Footer({version}) {
  return (
    <footer className="footer">
      <div className="footer-tagline">Team of tactical nerd-genius firefighters with keyboards and caffeine.</div>
      <div className="footer-version">RapidPlan v{version}</div>
      <div className="footer-copyright">© 2025 Pennington Programming. All rights reserved.</div>
    </footer>
  );
}