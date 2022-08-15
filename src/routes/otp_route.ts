import { Router, Request, Response } from "express";
import axios from 'axios'
import _ from 'lodash'

export const routes = Router()

routes.post('/sendotp', async (req: Request, res: Response) => {
    const OTP_TOKEN = process.env.OTP_TOKEN
    const phoneNo: String = await _.get(req, ['body', 'phone_no'])
    console.log(phoneNo);

    const data = JSON.stringify({
        "msisdn": phoneNo,
        "sender": "OTP",
        "message": req.body.message
    });
    const sendOTP = await axios({
        method: 'POST',
        url: 'https://havesms.com/api/sms/send',
        headers: {
            'Authorization': `Bearer ${OTP_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: data
    }).then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.error == false) {
            return res.status(200).json({
                RespCode: 200,
                RespMessage: 'Success',
                Result: {
                    description: response.data.description,
                }
            })
        } else {
            return res.status(400).json({
                RespCode: 400,
                RespMessage: 'Bad: Something went wrong',
            })
        }
    }).catch((error) => {
        console.log(error);
        return res.status(400).json({
            RespCode: 400,
            RespMessage: 'Bad: Send OTP Failed',
            Log: 2
        })
    })
})