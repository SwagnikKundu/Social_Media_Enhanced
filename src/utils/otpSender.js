import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const generateOtp = () => {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyz';
  let otp = '';
  for (let i = 0; i < 7; i++) {
    otp += characters[Math.floor(Math.random() * characters.length)];
  }
  return otp;
};

export const sendOtpEmail = async (email, otp) => {
  try{
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_NAME,
        pass: process.env.USER_PWD,
      },
    });
  
    const mailOptions = {
      from: process.env.USER_NAME,
      to: email,
      subject: 'OTP for Password Update',
      text: `Your OTP for password update is "${otp}". It is valid for 10 minutes.`,
    };
  
    await transporter.sendMail(mailOptions);
    return { success: true, msg: "otp sent successfully"};
  }catch (error) {
    return { success: false, msg: error};
  }  
};
