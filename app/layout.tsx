import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ModalProvider from "@/components/providers/modal-provider";
import { Toaster } from "sonner";
import SubscriptionProvider from "@/components/providers/subscription-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL('https://drive.sammi.ac'),
	title: 'Google drive',
	description: 'Google drive web application clone created by Sammi.ac',
	authors: [{ name: 'Samar Badriddinov', url: 'https://drive.sammi.ac' }],
	icons: { icon: '/logo.svg' },
	openGraph: {
		title: 'Google drive',
		description: "Google drive web application clone created by Sammi.ac",
		type: 'website',
		url: 'https://drive.sammi.ac',
		locale: 'uz_UZ',
		images: 'https://media.graphassets.com/urB1Sz4bTSmunkuO4Ujn',
		countryName: 'Uzbekistan',
		siteName: 'Sammi',
		emails: 'info@sammi.ac',
	},
	keywords: "Google Drive, Google drive web, Google drive clone, Google drive web application, samar badriddinov"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="google-drive"
          >
            <Toaster position="top-center" />
            <ModalProvider />
            <SubscriptionProvider>{children}</SubscriptionProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
