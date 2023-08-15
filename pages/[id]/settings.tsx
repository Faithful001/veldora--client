import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Head from "next/head";
import { DataTable } from "@/components/Table/DataTable";
import { submissionColumns } from "@/constants/mock/Columns";
import { useRouter } from "next/router";
import useBucket from "@/hooks/useBucket";
import useSubmissions from "@/hooks/useSubmissions";
import BucketAnalytics from "@/components/BucketAnalytics";
import { Copy, Trash } from "lucide-react";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/layouts/Dashboard.layout";
import SettingsLayout from "@/layouts/Settings.layout";
import DeleteBucketDialog from "@/components/dialogs/DeleteBucket.dialog";
import { BucketPage404 } from "@/components/errors/Error";
import { HowToSetup } from "@/components/HowToSetup";
import { apiUrl } from "@/constants";
import { BucketConfig } from "@/components/BucketConfig";
import { Loading } from "@/components/Loading";
import { PaginationState, Updater } from "@tanstack/react-table";
import { BucketStructure } from "@/components/BucketStructure";
import { ISubmissionData } from "@/interfaces";
import { useMutate } from "@/hooks/useMutate";
import { deleteSubmissions } from "@/services/BucketService";
import { DashboardInnerNav } from "@/components/DashboardInnerNav";

export default function Bucket() {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const bucket = useBucket(id ?? "", () => {
    // router.push("/404")
  });
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const submissions = useSubmissions({
    id: id ?? "",
    page: pageIndex,
    pageSize,
  });
  const [isCopied, setIsCopied] = useState(false);
  const { copiedText, copy } = useCopyToClipboard();
  const handleCopy = (text: string) => {
    copy(text);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const [tab, setTab] = useState(
    submissions.data?.data?.length === 0 ? "how" : "submissions",
  );
  useEffect(() => {
    setTab(submissions.data?.data?.length === 0 ? "how" : "submissions");
  }, [submissions.isLoading]);

  const deleteSubmissionsMutation = useMutate(deleteSubmissions, {
    successMessage: "Submissions Deleted",
    onSuccessFunction: () => {
      submissions.refetch();
    },
  });
  return (
    <DashboardLayout subNav={<DashboardInnerNav />}>
      <SettingsLayout id={id ?? ""}>
        <Head>
          <title>{bucket.data?.name ?? ""} - Veldora</title>

          <meta name="description" content="Form data managment made easy" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {(bucket.isError || submissions.isError) && (
          <BucketPage404 type="INVALID_BUCKET" />
        )}

        {bucket.isLoading && submissions.isLoading && (
          <div className="flex h-[85vh] items-center justify-center border">
            <div className="w-16 animate-pulse text-[#171123] text-gray-300 md:w-32">
              <Loading variant="INLINE" />
            </div>
          </div>
        )}
        {!bucket.isError &&
          !submissions.isError &&
          (!bucket.isLoading || !submissions.isLoading) && (
            <div className="flex-1 space-y-4 p-4 md:p-8">
              <div className="flex w-full justify-between">
                <div>
                  {/* <DeleteBucketDialog id={bucket?.data?._id ?? ""} name={bucket?.data?.name ?? ""}/> */}
                </div>
              </div>
              {!submissions.isLoading && <BucketConfig bucket={bucket.data} />}
            </div>
          )}
      </SettingsLayout>
    </DashboardLayout>
  );
}
