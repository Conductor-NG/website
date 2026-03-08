import CampaignPage from "@/components/campaign-page/CampaignPage";
import {Suspense} from "react";
import ReCaptchaProvider from "@/components/captcha/ReCaptchaProvider";

export default function PassengerCampaignPage() {
    return (
        <Suspense fallback={null}>
            <ReCaptchaProvider>
                <CampaignPage variant="passenger"/>
            </ReCaptchaProvider>
        </Suspense>
    );
}
