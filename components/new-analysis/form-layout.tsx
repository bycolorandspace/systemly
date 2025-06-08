import {
  DEFAULT_USER_INPUTS,
  useTradeAnalysisContext,
} from "@/contexts/trade-analysis-context";
import { z } from "zod";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TradingAnalysisRequest } from "@/schema/trade-analysis-schema";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";

interface FormLayoutProps {
  children: React.ReactNode;
  schema: z.ZodType<TradingAnalysisRequest>;
  mode: "onBlur"; // Add this line
}

export default function FormLayout({
  children,
  schema,
  mode,
}: FormLayoutProps) {
  const { uploadFormData, isLoading, updateLoading } =
    useTradeAnalysisContext();
  const router = useRouter();
  const methods = useForm<TradingAnalysisRequest>({
    resolver: zodResolver(schema),
    mode: mode, // Use the mode prop here
    defaultValues: {
      userInputs: DEFAULT_USER_INPUTS,
    },
  });

  const handleSubmit = async (data: TradingAnalysisRequest) => {
    try {
      await updateLoading(true); // Set loading state to true
      console.log("Loading data: ", isLoading);
      // Generate unique ID for this analysis
      const analysisId = crypto.randomUUID();
      console.log("🔥 Generated analysis ID:", analysisId);
      // Navigate immediately with the ID
      console.log("🔥 About to navigate to:", `/analysis/${analysisId}`);
      router.push(`/analysis/${analysisId}`);
      // Start upload with the ID
      await uploadFormData(data, analysisId);
    } catch (error) {
      console.error("Error in form submission:", error);
      // Handle error (show error message, etc.)
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <FormProvider {...methods}>
        {" "}
        <Form {...methods}>
          <form noValidate onSubmit={methods.handleSubmit(handleSubmit)}>
            <div>{children}</div>
          </form>
        </Form>{" "}
      </FormProvider>
    </div>
  );
}
