const mailer = require("nodemailer");

// function for sendOtp
exports.sendMailOTP = async (email, otp) => {
  const transporter = mailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  });
  const htmlContent = `<div
        style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; text-align: center; font-family: Arial, sans-serif; background: #f9f9f9;">
        <div style="background: #fff; padding: 5px; border-radius: 10px;">
            <h2 style="color: #784ee2; font-family: Arial, Helvetica, sans-serif;">Your 6-Digit Secure OTP</h2>
            <p>Hey, <strong>${email}</strong></p>
            <p style="text-align: justify; padding: 8px; font-family: cursive ; border: 1px solid #f4e6e6;">Thank you
                for choosing OVS. Use the following OTP to complete the procedure to change your
                email address. OTP is valid for <strong>5 minutes</strong>. Do not share this code with others,
                including OVS.</p>
            <div style="padding: 20px 0; display: flex; justify-content: center; align-items: center; gap: 15px; width:90%; margin:0 auto; position:relative; left:16%; margin-left:16%;">
                <span
                    style="display: block;font-size: 32px;font-weight: bold;width: 34px;padding: 3px 5px;color: #d9534f;border: 1px solid #d9534f;text-align: center;border-radius: 5px; margin-left:8px;">${otp[0]}</span>
                <span
                    style="display: block;font-size: 32px;font-weight: bold;width: 34px;padding: 3px 5px;color: #d9534f;border: 1px solid #d9534f;text-align: center;border-radius: 5px; margin-left:8px;">${otp[1]}</span>
                <span
                    style="display: block;font-size: 32px;font-weight: bold;width: 34px;padding: 3px 5px;color: #d9534f;border: 1px solid #d9534f;text-align: center;border-radius: 5px; margin-left:8px;">${otp[2]}</span>
                <span
                    style="display: block;font-size: 32px;font-weight: bold;width: 34px;padding: 3px 5px;color: #d9534f;border: 1px solid #d9534f;text-align: center;border-radius: 5px; margin-left:8px;">${otp[3]}</span>
                <span
                    style="display: block;font-size: 32px;font-weight: bold;width: 34px;padding: 3px 5px;color: #d9534f;border: 1px solid #d9534f;text-align: center;border-radius: 5px; margin-left:8px;">${otp[4]}</span>
                <span
                    style="display: block;font-size: 32px;font-weight: bold;width: 34px;padding: 3px 5px;color: #d9534f;border: 1px solid #d9534f;text-align: center;border-radius: 5px; margin-left:8px;">${otp[5]}</span>
            </div>

        </div>
    </div>
  `;

  const mailOptions = {
    from: `'"OVS Services" ${process.env.USER_EMAIL}'`,
    to: email,
    subject: "OTP for verification",
    // text: `Your OTP is ${otp}`,
    html: htmlContent,
  };
  const info = await transporter.sendMail(mailOptions);
  console.log(info);
};
