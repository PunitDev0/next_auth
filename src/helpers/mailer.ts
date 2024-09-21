import nodemailer from 'nodemailer';
import User from '../models/userModels';
import bcrypt from 'bcryptjs';
export const sendEmail = async ({email, emailtype, userId}:any)=>{
    try{  

       const hashedToken =  await bcrypt.hash(userId.toString(), 10)

        if(emailtype === 'Verify'){
            await User.findByIdAndUpdate(userId,
                {verifyToken : hashedToken, verifyTokenExpiry: Date.now() + 3000});
        }else if(email.Type === 'RESET'){
            await User.findByIdAndUpdate(userId,
                {resetToken : hashedToken, resetTokenExpiry: Date.now() + 3600000});
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "5e7bf86c8d7acc",//❌
              pass: "c4fe6eea9224e7"//❌
            }
          });

        const mailOptions = {
            from: 'punitdeveloper1@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailtype === 'Verify' ? "verify your email" : "Reset your password", 
            html:`<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"> Here</a> to ${emailtype === 'verify' ? 'verify your email' : 'Reset your password'} 
            or copy and paste the link below in your browser.
            <br>${process.env.DOMAIN}
            </p>`, 
          }

          const mailResponse = await transport.sendMail(mailOptions)

    }
    catch(error:any){
        console.error('Error occurred while sending email:', error);
        throw new Error('Error occurred while sending email');
    }
}