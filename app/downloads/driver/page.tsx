import {Suspense} from "react";
import DownloadsPage from "@/components/download-page/DownloadsPage";

export default function DriverDownloadsPage() {
    return (<Suspense fallback={null}> <DownloadsPage variant="driver"/> </Suspense>);
}
