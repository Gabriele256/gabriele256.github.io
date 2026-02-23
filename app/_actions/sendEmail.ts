'use server'

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_KEY);

export async function sendEmail(formData: FormData) {
    const name = formData.get('input-name') as string;
    const surname = formData.get('input-surname') as string;
    const email = formData.get('input-email') as string;
    const number = formData.get('input-number') as string;
    const message = formData.get('input-message') as string;

    if (!name || !surname || !email || !message) {
        return { errorMessage: "All fields are required." };
    }

    try {

        const text = `
            Email: ${email}
            ${number ? `Number: ${number}` : ``}
            Message:
            ${message}
        `;

        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: process.env.EMAIL || "",
            subject: `New message from ${name} ${surname}`,
            text: text,
        });

        return { success: true, data };
    } catch (error) {
        return { error: { error }, errorMessage: "There was a problem sending the message." };
    }
}