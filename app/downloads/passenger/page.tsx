import {Suspense} from "react";
import DownloadsPage from "@/components/download-page/DownloadsPage";

export default function PassengerDownloadsPage() {
    return (<Suspense fallback={null}> <DownloadsPage variant="passenger"/> </Suspense>);
}
