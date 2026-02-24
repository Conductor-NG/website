import {Suspense} from "react";
import DownloadPage from "@/components/download-page/DownloadPage";

export default function DriverDownloadsPage() {
    return (<Suspense fallback={null}> <DownloadPage variant="driver"/> </Suspense>);
}
