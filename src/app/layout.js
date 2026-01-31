import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ResetScroll from "./components/resetScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sharuk TA | Software Developer & Engineer",
  description:
    "Software Developer and Full-Stack Engineer experienced in building scalable applications, system-driven platforms, and modern web solutions using Next.js, MERN, and related technologies.",
  keywords: [
    "Sharuk TA",
    "Software Developer",
    "Software Engineer",
    "Full Stack Developer",
    "Web Developer",
    "Next.js Developer",
    "MERN Stack Developer",
    "Backend Developer",
    "Frontend Developer",
    "IT Professional",
    "React Developer",
    "Portfolio",
    "IT Support",
  ],
  authors: [{ name: "Sharuk TA" }],
  creator: "Sharuk TA",
  openGraph: {
    title: "Sharuk TA | Software Developer & Engineer",
    description:
      "Software Developer and Full-Stack Engineer building scalable, high-performance applications and modern software solutions.",
    url: "https://your-domain.com",
    siteName: "Sharuk Portfolio",
    images: [
      {
        url: "/metadatapic.png",
        width: 1200,
        height: 630,
        alt: "Sharuk TA Portfolio",
      },
    ],
    type: "website",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ResetScroll />
        {children}
      </body>
    </html>
  );
}
