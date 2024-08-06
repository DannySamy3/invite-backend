import QRCode from "qrcode";

export const generateQRCode = async (data: any) => {
  try {
  
    const jsonData = JSON.stringify(data);
  
    const qrCodeDataUrl = await QRCode.toDataURL(jsonData);
    return qrCodeDataUrl;
  } catch (err) {
    console.error("Error generating QR code:", err);
    throw new Error("Error generating QR code");
  }
};
