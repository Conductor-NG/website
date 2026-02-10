import CampaignPage from "@/components/campaign-page/CampaignPage";
import {Suspense} from "react";

export default function DriverCampaignPage() {
    return (<Suspense fallback={null}> <CampaignPage variant="driver"/> </Suspense>);
}
