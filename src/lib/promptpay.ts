/**
 * Thai PromptPay EMVCo QR Code Payload Generator
 */

function crc16(data: string): string {
  let crc = 0xffff;
  for (let i = 0; i < data.length; i++) {
    let c = data.charCodeAt(i);
    crc ^= c << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  let hex = crc.toString(16).toUpperCase();
  while (hex.length < 4) hex = "0" + hex;
  return hex;
}

function tlv(tag: string, value: string): string {
  const len = value.length < 10 ? "0" + value.length : value.length.toString();
  return `${tag}${len}${value}`;
}

export function generatePromptPayPayload(
  target: string = "0812345678", // Mobile (10 digits) or Tax ID (13 digits)
  amount?: number
): string {
  // Clean target
  const cleanTarget = target.replace(/[^0-9]/g, "");

  let subTag: string;
  let formattedTarget: string;

  if (cleanTarget.length === 13) {
    // Tax ID / National ID
    subTag = tlv("02", cleanTarget);
  } else {
    // Phone number: prefix with 0066 without leading 0
    const mobileNo = "0066" + cleanTarget.replace(/^0/, "");
    subTag = tlv("01", mobileNo);
  }

  const aid = tlv("00", "A000000677010111");
  const merchantAccountInfo = tlv("29", aid + subTag);

  let payload = "";
  payload += tlv("00", "01"); // Version
  payload += tlv("01", amount ? "12" : "11"); // Dynamic or Static
  payload += merchantAccountInfo;
  payload += tlv("53", "764"); // Currency: THB
  if (amount && amount > 0) {
    payload += tlv("54", amount.toFixed(2));
  }
  payload += tlv("58", "TH"); // Country: Thailand

  // Append checksum tag
  payload += "6304";
  const checksum = crc16(payload);

  return payload + checksum;
}
