import "./globals.css";
import type {Metadata,Viewport} from "next";
export const metadata:Metadata={title:"As Aventuras de Geovana",description:"Jogo educativo de inglês"};
export const viewport:Viewport={width:"device-width",initialScale:1,maximumScale:1,viewportFit:"cover",themeColor:"#24105e"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}
