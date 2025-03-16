import "@/assets/styles/globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import type { Metadata } from "next";
import "react-image-crop/dist/ReactCrop.css";
import "react-photo-view/dist/react-photo-view.css";

export const metadata: Metadata = {
	title: "Shawano's PR Tools",
	description: "PR Tools voor de vrijwilligers van scouting groep Shawano's",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="nl" suppressHydrationWarning>
			<body className="antialiased">
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
