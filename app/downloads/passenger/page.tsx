import {Suspense} from "react";
import DownloadPage from "@/components/download-page/DownloadPage";

export default function PassengerDownloadsPage() {
    return (<Suspense fallback={null}> <DownloadPage variant="passenger"/> </Suspense>);
}
