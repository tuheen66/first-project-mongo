import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: 'hassan.monirul@gmail.com',
      pass: 'hrph qgns rijh uavl',
    },
    tls: {
      rejectUnauthorized: false, // Skip certificate validation
    },
  });

  await transporter.sendMail({
    from: 'hassan.monirul@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset your password', // Subject line
    text: '', // plain text body
    html, // html body
  });
};
