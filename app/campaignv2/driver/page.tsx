import CampaignPage from "@/components/campaign-page/CampaignPage";
import ReCaptchaProvider from "@/components/captcha/ReCaptchaProvider";
import {Suspense} from "react";

export default function DriverCampaignPage() {
    return (
        <Suspense fallback={null}>
            <ReCaptchaProvider>
                <CampaignPage variant="driver" version='v2'/>
            </ReCaptchaProvider>
        </Suspense>
    );
}
