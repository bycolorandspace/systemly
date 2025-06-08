import { TradeAnalysisProvider } from "@/contexts/trade-analysis-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TradeAnalysisProvider>{children}</TradeAnalysisProvider>;
}
