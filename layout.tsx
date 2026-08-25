import type {Metadata} from "next";import "./globals.css";
export const metadata:Metadata={title:"As Aventuras de Geovana",description:"Jogo educacional de inglês básico para crianças de 7 a 12 anos.",other:{"codex-preview":"development"},icons:{icon:"/favicon.svg"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}
