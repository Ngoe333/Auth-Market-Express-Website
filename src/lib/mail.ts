import {Resend} from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTowFactorTokenEmail = async (email: string, token: string) => {

    await resend.emails.send({
        from: 'info@onlineskilllovett.com',
        to: email,
        subject: '2FA code',
        html: `<p>Your 2FA code : ${token}</p>`
    });
}
    




export const sendPasswordResetEmail = async ( email: string, token: string) => {
    const resetLink = `${domain}/new-password?token=${token}`;

    await resend.emails.send({
        from: 'info@onlineskilllovett.com',
        to: email,
        subject: 'Reset your password',
        html: `<p>Click <a href="${resetLink}">here</a>To reset password!. </p>`
    });
}



export const sendVerificationEmail = async ( email: string, token: string) => {
    const confirmLink = `${domain}/new-verification?token=${token}`;

    await resend.emails.send({
        from: 'info@onlineskilllovett.com',
        to: email,
        subject: 'Confirm your email',
        html: `<p>Click <a href="${confirmLink}">here</a> To confirm email. </p>`
    });
}