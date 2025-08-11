"use client";
import AnalysisSummarised from "@/components/trades/analysis-summarised";
import FilterSelector from "@/components/trades/filter-selector";
import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import useDeleteAnalysis from "@/hooks/useDeleteAnalysis";
import { useGetUsersAnalyses } from "@/hooks/useGetUserAnalyses";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AnalysesPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<string>("");
  const [deletedID, setDeletedID] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { analyses, error, loading, getUserAnalyses, newUser } =
    useGetUsersAnalyses();
  const { deleteAnalysis, deleteError, deleteSuccess } = useDeleteAnalysis();

  useEffect(() => {
    if (user?.id) getUserAnalyses(user?.id, filter);

    if (user?.id && deletedID) getUserAnalyses(user?.id, filter);
  }, [user?.id, filter, deletedID]);

  // Handle deletion success and error
  useEffect(() => {
    if (deletedID) {
      deleteAnalysis(deletedID).then(() => {
        setDeletedID(""); // Reset deleted ID after successful deletion
      });
    }
    if (error) {
      toast.error(`Sorry, ${error}`);
    }

    if (deleteSuccess) {
      toast.success("Analysis deleted successfully.");
    }
    if (deleteError) {
      toast.error(`Error deleting analysis: ${deleteError}`);
    }
  }, [deleteSuccess, deleteError, error, deletedID]);

  // ADD LOADING AND ERROR HANDLING

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-6">
        <p className="text-8xl">😭</p>
        <h1 className="text-3xl font-extralight">Forgive us, comrade!</h1>
        <p className="text-lg">{error}</p>
        <div className="flex flex-col gap-2">
          <Button variant={"default"} className="rounded-full">
            <Link href="/analysis/new">Create New Trade Analysis</Link>
          </Button>
          <Button variant={"link"} className="rounded-full text-secondary">
            <Link href="/analysis/">Go back</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!analyses && newUser) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-6">
        <p className="text-8xl">😳</p>
        <h1 className="text-3xl font-extralight">No analyses yet.</h1>
        <p className="">Lets begin our journey, trader...</p>
        <Button variant={"default"} className="rounded-full">
          <Link href="/analysis/new">Create New Trade Analysis</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start h-screen p-8">
      <div className="w-full">
        <div className="flex flex-row justify-between mb-8">
          <div className="flex flex-row gap-2 items-center justify-start">
            <h1 className="text-3xl font-light">Analyses</h1>
            <FilterSelector onFilterChange={setFilter} />
          </div>

          <Button>
            <Link href="/analysis/new" className="flex items-center">
              <PlusCircle className="mr-2 size-4" />
              New Analysis
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
          {analyses &&
            analyses.map((analysis) => (
              <AnalysisSummarised
                key={analysis.trade_data.id}
                analysis={analysis}
                deleted={setDeletedID}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
