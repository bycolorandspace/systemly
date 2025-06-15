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
import { updateUser } from "@/lib/userService";
import { useAuth } from "@/contexts/auth-context";

interface FormLayoutProps {
  children: React.ReactNode;
  schema: z.ZodType<TradingAnalysisRequest>;
  mode: "onBlur"; // Add this line
}

// FormLayout component that wraps the form and handles submission

/*
App

App/analysis/[id]/page.tsx - House the main analysis page
App/analysis/new/page.tsx - New analysis page
  |__Components/new-analysis/form-layout.tsx  - Submit form action
    |__Components/steps/upload-chart.tsx - Step 1: Upload chart images - Collect data from user
    |__Components/steps/user-trade-input.tsx - Step 2: User trade input - Collect data from user
  |__uploadFormData with: contexts/useTradeAnalysisContext.tsx - Context to manage form state and submission
  |__updateUser with: lib/userService.ts - Function to update user inputs in the database

*/

export default function FormLayout({
  children,
  schema,
  mode,
}: FormLayoutProps) {
  const { user } = useAuth(); // Import useAuth to access authentication context if needed
  const { uploadFormData, updateLoading } = useTradeAnalysisContext();
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
      const analysisId = crypto.randomUUID(); // Generate unique ID for this analysis
      router.push(`/analysis/${analysisId}`); // Start upload with the ID
      if (!user) {
        throw new Error(
          "User is not authenticated. Cannot update user inputs."
        );
      } else {
        // ONLY UPDATE USER INPUTS IF USER TICKS BOX --- ADD IN THE FORM !!!!!!!!!!!!!!!!
        await updateUser(user?.id, data.userInputs); // Update user inputs in the context
        await uploadFormData(data, analysisId); // Upload the form data with the generated ID
      }
    } catch (error) {
      console.error("Error in form submission:", error); // Handle error (show error message, etc.)
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

// console.log("🔥 Generated analysis ID:", analysisId);  // Navigate immediately with the ID
// console.log("🔥 About to navigate to:", `/analysis/${analysisId}`);
