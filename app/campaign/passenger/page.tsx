import CampaignPage from "@/components/campaign-page/CampaignPage";
import {Suspense} from "react";

export default function PassengerCampaignPage() {
    return (<Suspense fallback={null}> <CampaignPage variant="passenger"/> </Suspense>);
}
