import "server-only";
import nodemailer from "nodemailer";

import { env } from "../env";

/** @type {import("nodemailer").Transporter | undefined} */
let transporter;

function getTransporter() {
  transporter ??= nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
  });
  return transporter;
}

/**
 * @param {{ to: string, subject: string, text: string, html: string }} message
 */
export async function sendMail(message) {
  await getTransporter().sendMail({ from: env.MAIL_FROM, ...message });
}
