export type CampaignVariant = "driver" | "passenger";

export const CAMPAIGN_REFERRAL_STORAGE_KEY = "campaign_ref";

export const CAMPAIGN_STORE_URLS: Record<
    CampaignVariant,
    { ios: string; android: string }
> = {
    driver: {
        ios: "https://apps.apple.com/app/id0000000000",
        android: "from_https://play.google.com/store/apps/details?id=com.conductor.driver",
    },
    passenger: {
        ios: "https://apps.apple.com/app/id0000000001",
        android:
            "https://play.google.com/store/apps/details?id=com.conductor.passenger",
    },
};


export const CAMPAIGN_LOCATIONS = [
    // Abule Egba Area
    { id: "6", name: "Abule Egba Bus Stop, Abule Egba" },
    { id: "7", name: "Super Bus Stop, Abule Egba" },
    { id: "8", name: "U-Turn Bus Stop, Abule Egba" },
    { id: "9", name: "Ahmadiyya Bus Stop, Abule Egba" },
    { id: "10", name: "Pleasure Bus Stop, Abule Egba" },

    // Ikorodu Area
    { id: "11", name: "Ikorodu Garage, Ikorodu" },
    { id: "12", name: "Agric Bus Stop, Ikorodu" },
    { id: "13", name: "Ogolonto Bus Stop, Ikorodu" },
    { id: "14", name: "Sabo Market, Ikorodu" },
    { id: "15", name: "Benson Bus Stop, Ikorodu" },
    { id: "16", name: "Majidun Bus Stop, Ikorodu" },

    // Ajah Area
    { id: "17", name: "Ajah Under Bridge, Ajah" },
    { id: "18", name: "Abraham Adesanya Roundabout, Ajah" },
    { id: "19", name: "Sangotedo (Novare Mall), Ajah" },
    { id: "20", name: "VGC Bus Stop, Lekki-Ajah" },
    { id: "21", name: "Ilaje Bus Stop, Ajah" },
    { id: "22", name: "Lagos Business School (LBS), Ajah" },
];

export const ISLAND_LOCATIONS = [
    { id: "101", name: "CMS Bus Stop, Lagos Island" },
    { id: "102", name: "Obalende Bus Stop, Lagos Island" },
    { id: "103", name: "Marina Bus Stop, Lagos Island" },
    { id: "104", name: "Tafawa Balewa Square (TBS), Lagos Island" },
    { id: "105", name: "Sandgrouse Market, Lagos Island" },
    { id: "106", name: "Broad Street, Lagos Island" },
    { id: "107", name: "Outer Marina, Lagos Island" },
    { id: "108", name: "Simpson Bus Stop, Lagos Island" },
    { id: "109", name: "Idumota, Lagos Island" },
    { id: "110", name: "Sura Bus Stop, Lagos Island" },
];

export const DISTANCE_MATRIX: Record<string, number> = {
    // Abule Egba Area (IDs 6-10) to Island
    "6_101": 29.0, "6_102": 30.2, "6_103": 29.3, "6_104": 29.8, "6_105": 30.5, "6_106": 29.4, "6_107": 29.6, "6_108": 31.2, "6_109": 30.0, "6_110": 30.8,
    "7_101": 28.2, "7_102": 29.4, "7_103": 28.5, "7_104": 29.0, "7_105": 29.7, "7_106": 28.6, "7_107": 28.8, "7_108": 30.4, "7_109": 29.2, "7_110": 30.0,
    "8_101": 27.5, "8_102": 28.7, "8_103": 27.8, "8_104": 28.3, "8_105": 29.0, "8_106": 27.9, "8_107": 28.1, "8_108": 29.7, "8_109": 28.5, "8_110": 29.3,
    "9_101": 30.1, "9_102": 31.3, "9_103": 30.4, "9_104": 30.9, "9_105": 31.6, "9_106": 30.5, "9_107": 30.7, "9_108": 32.3, "9_109": 31.1, "9_110": 31.9,
    "10_101": 26.8, "10_102": 28.0, "10_103": 27.1, "10_104": 27.6, "10_105": 28.3, "10_106": 27.2, "10_107": 27.4, "10_108": 29.0, "10_109": 27.8, "10_110": 28.6,

    // Ikorodu Area (IDs 11-16) to Island
    "11_101": 36.0, "11_102": 37.2, "11_103": 36.3, "11_104": 36.8, "11_105": 37.5, "11_106": 36.4, "11_107": 36.6, "11_108": 38.2, "11_109": 37.0, "11_110": 37.8,
    "12_101": 33.5, "12_102": 34.7, "12_103": 33.8, "12_104": 34.3, "12_105": 35.0, "12_106": 33.9, "12_107": 34.1, "12_108": 35.7, "12_109": 34.5, "12_110": 35.3,
    "13_101": 31.0, "13_102": 32.2, "13_103": 31.3, "13_104": 31.8, "13_105": 32.5, "13_106": 31.4, "13_107": 31.6, "13_108": 33.2, "13_109": 32.0, "13_110": 32.8,
    "14_101": 37.2, "14_102": 38.4, "14_103": 37.5, "14_104": 38.0, "14_105": 38.7, "14_106": 37.6, "14_107": 37.8, "14_108": 39.4, "14_109": 38.2, "14_110": 39.0,
    "15_101": 36.5, "15_102": 37.7, "15_103": 36.8, "15_104": 37.3, "15_105": 38.0, "15_106": 36.9, "15_107": 37.1, "15_108": 38.7, "15_109": 37.5, "15_110": 38.3,
    "16_101": 29.5, "16_102": 30.7, "16_103": 29.8, "16_104": 30.3, "16_105": 31.0, "16_106": 29.9, "16_107": 30.1, "16_108": 31.7, "16_109": 30.5, "16_110": 31.3,

    // Ajah Area (IDs 17-22) to Island
    "17_101": 24.0, "17_102": 25.2, "17_103": 24.3, "17_104": 24.8, "17_105": 25.5, "17_106": 24.4, "17_107": 24.6, "17_108": 26.2, "17_109": 25.0, "17_110": 25.8,
    "18_101": 26.5, "18_102": 27.7, "18_103": 26.8, "18_104": 27.3, "18_105": 28.0, "18_106": 26.9, "18_107": 27.1, "18_108": 28.7, "18_109": 27.5, "18_110": 28.3,
    "19_101": 32.5, "19_102": 33.7, "19_103": 32.8, "19_104": 33.3, "19_105": 34.0, "19_106": 32.9, "19_107": 33.1, "19_108": 34.7, "19_109": 33.5, "19_110": 34.3,
    "20_101": 21.0, "20_102": 22.2, "20_103": 21.3, "20_104": 21.8, "20_105": 22.5, "20_106": 21.4, "20_107": 21.6, "20_108": 23.2, "20_109": 22.0, "20_110": 22.8,
    "21_101": 25.0, "21_102": 26.2, "21_103": 25.3, "21_104": 25.8, "21_105": 26.5, "21_106": 25.4, "21_107": 25.6, "21_108": 27.2, "21_109": 26.0, "21_110": 26.8,
    "22_101": 28.5, "22_102": 29.7, "22_103": 28.8, "22_104": 29.3, "22_105": 30.0, "22_106": 28.9, "22_107": 29.1, "22_108": 30.7, "22_109": 29.5, "22_110": 30.3,
};