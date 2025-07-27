import type { Metadata } from "next";
import { Nerko_One } from "next/font/google";
import "./globals.css";

const prompt = Nerko_One({
	weight: ["400"],
	display: "swap",
	preload: true,
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "JIGZA888",
	description: "The GANGCARTOON game",
	icons:
		"https://cdn.icon-icons.com/icons2/2474/PNG/512/puzzle_icon_149707.png",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={prompt.className}>{children}</body>
		</html>
	);
}
