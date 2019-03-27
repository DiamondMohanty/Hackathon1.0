# Importing the module
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import warnings
class OishiiMailer():

    def init_app(self,app):
        self.__app__ = app


    def initialize_mailer(self):
        # Setup the SMTP server
        self.smtpObj = smtplib.SMTP(host='smtp.gmail.com', port=587)
        if ("MAIL_CREDENTIALS" not in self.__app__.config):
            warnings.warn(
                'MAIL_CREDENTIALS not present in the Config'
            )
        else:
            creds = self.__app__.config["MAIL_CREDENTIALS"]
            username = creds.split(":")[0]
            password = creds.split(":")[1]
            self.smtpObj.ehlo()
            self.smtpObj.starttls()
            self.smtpObj.login(username, password)

    def sendOrderConfirmationMail(self, to, mealDetails):

        self.initialize_mailer()

        # Creating the message body
        htmlMessage = """\
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <title></title>
                <meta name="viewport" content="width=device-width, initial-scale=1">

                <style>

                    .footer {
                        color: gray;
                        font-size: 0.8em;
                    }

                    .container {
                        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        width: 50%;
                        padding: 20px;
                        margin: 20px auto;
                        box-shadow: 2px 3px 3px 2px lightgray;
                    }

                    table  {
                        width: 100%;
                        font-size: 14px;
                    }

                    table > tbody > tr:nth-child(2n+1) > td, table > tbody > tr:nth-child(2n+1) > th {
                        background-color: #f4f4f4;
                        padding: 5px;
                        font-weight: bold;
                    }

                    hr {
                        display: block;
                        height: 1px;
                        border: 0;
                        border-top: 1px solid #ccc;
                        margin: 1em 0;
                        padding: 0;
                    }




                </style>
            </head>
            <body>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="header">
                                <img src="
                                https://firebasestorage.googleapis.com/v0/b/oishii-91c5e.appspot.com/o/oishiiLogo.png?alt=media&token=375c72f7-920f-462c-8206-d52c43253a73" class="img img-responsive" />
                            </div>
                            <div class="body">
                                <h1>New Order Received</h1>
                                <p>
                                    Please find the details of the new order received.
                                </p>
                                <p><b>Details</b></p>
                                <table>
                                    <tr>
                                        <td>Name(Contact)</td>
                                        <td>Items Order</td>
                                        <td>Delivery Address</td>
                                        <td>Amount</td>
                                    </tr>
                                    <tr>
                                        <td>"""+mealDetails['customername']+"""(+"""+mealDetails['customerphone']+""")</td>
                                        <td>"""+mealDetails['orderedItems']+"""</td>
                                        <td>"""+mealDetails['deliveryAddr']+"""</td>
                                        <td>"""+str(mealDetails['amount'])+"""("""+mealDetails['paid']+""")</td>
                                    </tr>
                                    </table>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        """

         # Create a Message
        msg = MIMEMultipart('alternative')
        msg['Subject'] = "New Order Details"
        msg["From"] = "support@oishii.co.in"
        msg["To"] = ", ".join(to)
        message = MIMEText(htmlMessage, 'html')
        msg.attach(message)

        self.smtpObj.sendmail(msg['From'], to, msg.as_string())

        del msg


    def sendSubscriptionMail(self, to, mealObj, lunch_dinner_obj):

        self.initialize_mailer()

        lunch_dinner_str = ''
        if lunch_dinner_obj['lunch'] == 1 and lunch_dinner_obj['dinner'] == 1:
            lunch_dinner_str = ' (Lunch and Dinner) '
        elif lunch_dinner_obj['lunch'] == 1 and lunch_dinner_obj['dinner'] == 0:
            lunch_dinner_str = ' (Lunch Only) '
        elif lunch_dinner_obj['dinner'] == 1 and lunch_dinner_obj['lunch'] == 0:
            lunch_dinner_str = ' (Dinner Only) '

        # Creating the message body
        htmlMessage = """\
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <title></title>
                <meta name="viewport" content="width=device-width, initial-scale=1">

                <style>

                    .footer {
                        color: gray;
                        font-size: 0.8em;
                    }

                    .container {
                        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        width: 50%;
                        padding: 20px;
                        margin: 20px auto;
                        box-shadow: 2px 3px 3px 2px lightgray;
                    }

                    table  {
                        width: 100%;
                    }

                    table > tbody > tr:nth-child(2n+1) > td, table > tbody > tr:nth-child(2n+1) > th {
                        background-color: #f4f4f4;
                        padding: 5px;
                        font-weight: bold;
                    }

                    hr {
                        display: block;
                        height: 1px;
                        border: 0;
                        border-top: 1px solid #ccc;
                        margin: 1em 0;
                        padding: 0;
                    }




                </style>
            </head>
            <body>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="header">
                                <img src="
                                https://firebasestorage.googleapis.com/v0/b/oishii-91c5e.appspot.com/o/oishiiLogo.png?alt=media&token=375c72f7-920f-462c-8206-d52c43253a73" class="img img-responsive" />
                            </div>
                            <div class="body">
                                <h1>Thank You</h1>
                                <p>
                                    You've sucessfully subscribed to Oishii meal services.
                                </p>
                                <p><b>Details</b></p>
                                <table>
                                    <tr>
                                        <td>Name</td>
                                        <td>Meal Count</td>
                                        <td>Price</td>
                                    </tr>
                                    <tr>
                                        <td>"""+mealObj['mealName']+"""</td>
                                        <td>"""+mealObj['mealCount']+ lunch_dinner_str +"""</td>
                                        <td>"""+mealObj['mealPrice']+"""</td>
                                    </tr>
                                    </table>
                                <hr />
                                <!--<p><b>Login Details</b></p>
                                <p>
                                    <b>Username: </b> """+to+""" <br />
                                    <b>Password: </b> """ + to +""" <br />
                                    We request you to change your default password by visiting <a href="https://oishii.in/login">https://oishii.in/login</a>
                                </p>-->
                                <hr /> 

                            </div>
                            <div class="footer">
                                DISCLAIMER: This e-mail and any file(s) transmitted with it, is intended for the exclusive use by the person(s) mentioned above as recipient(s). This e-mail may contain confidential information and/or information protected by intellectual property rights or other rights. If you are not the intended recipient of this e-mail, you are hereby notified that any dissemination, distribution, copying, or action taken in relation to the contents of and attachments to this e-mail is strictly prohibited and may be unlawful. If you have received this e-mail in error, please notify the sender and delete the original and any copies of this e-mail and any printouts immediately from your system and destroy all copies of it.
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        """

         # Create a Message
        msg = MIMEMultipart('alternative')
        msg['Subject'] = "Oishii Subscription Confirmation"
        msg["From"] = "support@oishii.co.in"
        msg["To"] = to
        message = MIMEText(htmlMessage, 'html')
        msg.attach(message)

        self.smtpObj.sendmail(msg['From'], to, msg.as_string())

        del msg
