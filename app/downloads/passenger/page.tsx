import {Suspense} from "react";
import DownloadPage from "@/components/download-page/DownloadPage";
import ReCaptchaProvider from "@/components/captcha/ReCaptchaProvider";

export default function PassengerDownloadsPage() {
    return (
        <Suspense fallback={null}>
            <ReCaptchaProvider>
                <DownloadPage variant="passenger"/>
            </ReCaptchaProvider>
        </Suspense>
    );
}
