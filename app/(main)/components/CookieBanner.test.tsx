import { render, screen, fireEvent } from "@testing-library/react";
import CookieBanner from "./CookieBanner";

describe("CookieBanner", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("affiche la banniere quand aucun consentement n'est enregistre", () => {
    render(<CookieBanner />);
    expect(screen.getByText(/nous utilisons des cookies/i)).toBeInTheDocument();
  });

  it("ne s'affiche pas si un consentement existe deja", () => {
    localStorage.setItem("cookie-consent", "accepted");
    render(<CookieBanner />);
    expect(screen.queryByText(/nous utilisons des cookies/i)).not.toBeInTheDocument();
  });

  it("enregistre l'acceptation et masque la banniere au clic sur Accepter", () => {
    render(<CookieBanner />);
    fireEvent.click(screen.getByRole("button", { name: /accepter/i }));
    expect(localStorage.getItem("cookie-consent")).toBe("accepted");
    expect(screen.queryByText(/nous utilisons des cookies/i)).not.toBeInTheDocument();
  });

  it("enregistre le refus et masque la banniere au clic sur Refuser", () => {
    render(<CookieBanner />);
    fireEvent.click(screen.getByRole("button", { name: /refuser/i }));
    expect(localStorage.getItem("cookie-consent")).toBe("refused");
    expect(screen.queryByText(/nous utilisons des cookies/i)).not.toBeInTheDocument();
  });
});
