import type { Metadata } from "next";
import "./globals.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {title:"As Aventuras de Geovana",description:"Aprenda inglês enquanto vive grandes aventuras com Geovana e Pudim!",openGraph:{title:"As Aventuras de Geovana",description:"Um jogo educativo de inglês para crianças.",images:["/home-geovana.png"]}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="pt-BR"><body>{children}</body></html>}
