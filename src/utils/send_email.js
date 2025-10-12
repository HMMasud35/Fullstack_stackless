const nodemailer = require("nodemailer");
const sendEmailVerify = async (email, otp, name) => {
  const transporter = nodemailer.createTransport({
    host: process.env.AUTH_EMAIL,
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });

  // OTP send to email
  const info = await transporter.sendMail({
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Your OTP Verification Code ",
    html: `<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:'Helvetica Neue',Arial,sans-serif"><table cellpadding=0 cellspacing=0 role=presentation style="background-color:#f4f6f8;padding:30px 0"width=100%><tr><td align=center><table cellpadding=0 cellspacing=0 role=presentation style="width:600px;max-width:600px;background-color:#fff;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,.06);overflow:hidden"width=600 class=container><tr><td style="background:linear-gradient(90deg,#3b82f6,#6366f1);padding:22px 24px;text-align:left"><img alt=Logo src="/client/public/gg.png"style=display:block;border:0;outline:0;text-decoration:none width=140><tr><td style="padding:28px 32px;color:#0f172a;line-height:1.5"class=content><p style="margin:0 0 12px 0;font-size:16px">Hi <strong>${name}</strong>,<p style="margin:0 0 18px 0;color:#475569;font-size:15px">Verify using the OTP code below as per your request. This code will expire after <strong>5 minutes</strong>.<table cellpadding=0 cellspacing=0 role=presentation style="margin:18px 0 18px 0;width:100%"><tr><td align=center><div style="display:inline-block;padding:18px 24px;border-radius:10px;background:#f1f5f9;border:1px dashed #e2e8f0"><span class=otp style="font-size:32px;font-weight:700;letter-spacing:8px;color:#0f172a;font-family:'Courier New',Courier,monospace">${otp}</span></div></table><p style="margin:0 0 24px 0"><tr><td style="padding:18px 32px;background:#CDD3D9;text-align:center;color:#00000;font-size:13px"><div style=margin-bottom:8px>Need help? Contact <a href=mailto:support@yourdomain.com style=color:#000000;text-decoration:underline>support@yourdomain.com</a></div><div style=font-size:12px>© {{YEAR}} Your Company. All rights reserved.</div></table></table>`, // HTML body
  });
}

module.exports = sendEmailVerify