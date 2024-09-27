import crypto from "crypto-js";

// Encrypt data function
export const encryptData = (data: string): string => {
  const secretKey =
    process.env.SECRET_KEY ||
    "04867cc913d42a3ebd67383a8e251a9c5fad1a7910386dbce3025c61029adffe";
  return crypto.AES.encrypt(data, secretKey).toString();
};

// Decrypt data function
export const decryptData = (ciphertext: string): string => {
  const secretKey =
    process.env.SECRET_KEY ||
    "04867cc913d42a3ebd67383a8e251a9c5fad1a7910386dbce3025c61029adffe";
  const bytes = crypto.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(crypto.enc.Utf8);
};
