export type SupportedLanguage = 'en' | 'th';

type TranslationDictionary = Record<string, string>;

const dictionaries: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    login: 'Login',
    username: 'Username',
    password: 'Password',
    dashboard: 'Dashboard',
    layoutGrid: 'Layout Grid',
    imports: 'Import History',
    alerts: 'Alerts',
    operations: 'Operations',
    settings: 'Settings',
    totalStock: 'Total Stock',
    totalParts: 'Total Parts',
    belowMin: 'Below Min',
    aboveMax: 'Above Max',
    healthScore: 'Health Score',
    inbound: 'Inbound',
    outbound: 'Outbound',
    recentAlerts: 'Recent Alerts',
    minThreshold: 'Min Threshold',
    maxThreshold: 'Max Threshold',
    zone: 'Zone',
    rack: 'Rack',
    bin: 'Bin',
    status: 'Status',
    actions: 'Actions',
    export: 'Export',
    upload: 'Upload',
    preview: 'Preview',
    min: 'Min',
    max: 'Max',
    utilization: 'Utilization',
  },
  th: {
    login: 'เข้าสู่ระบบ',
    username: 'ชื่อผู้ใช้',
    password: 'รหัสผ่าน',
    dashboard: 'แดชบอร์ด',
    layoutGrid: 'ผังคลังสินค้า',
    imports: 'ประวัติการนำเข้า',
    alerts: 'การแจ้งเตือน',
    operations: 'งานปฏิบัติการ',
    settings: 'การตั้งค่า',
    totalStock: 'ยอดรวมสต็อก',
    totalParts: 'จำนวนชิ้นส่วน',
    belowMin: 'ต่ำกว่า Min',
    aboveMax: 'สูงกว่า Max',
    healthScore: 'คะแนนสุขภาพ',
    inbound: 'รับเข้า',
    outbound: 'จ่ายออก',
    recentAlerts: 'การแจ้งเตือนล่าสุด',
    minThreshold: 'ค่าต่ำสุด',
    maxThreshold: 'ค่าสูงสุด',
    zone: 'โซน',
    rack: 'ชั้นวาง',
    bin: 'บิ้น',
    status: 'สถานะ',
    actions: 'การทำงาน',
    export: 'ส่งออก',
    upload: 'อัปโหลด',
    preview: 'ตรวจสอบ',
    min: 'ต่ำสุด',
    max: 'สูงสุด',
    utilization: 'การใช้งาน',
  },
};

export const translate = (language: SupportedLanguage, key: string): string => {
  const dictionary = dictionaries[language] ?? dictionaries.en;
  return dictionary[key] ?? key;
};

export const getDictionary = (language: SupportedLanguage) => dictionaries[language];
