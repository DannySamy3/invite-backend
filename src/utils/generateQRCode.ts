import QRCode from "qrcode";

export const generateQRCode = async (data: any) => {
  try {
    // Convert data object to JSON string
    const jsonData = JSON.stringify(data);
    // Generate QR code as a data URL
    const qrCodeDataUrl = await QRCode.toDataURL(jsonData);
    return qrCodeDataUrl;
  } catch (err) {
    console.error("Error generating QR code:", err);
    throw new Error("Error generating QR code");
  }
};
