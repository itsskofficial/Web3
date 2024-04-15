import "./globals.css";

export const metadata = {
  title: "Payments Security Testing",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
        <body>{children}</body>
    </html>
  );
}
