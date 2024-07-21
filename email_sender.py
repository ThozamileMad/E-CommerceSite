from mailjet_rest import Client


class mailSender:
    def __init__(self):
        self.API_KEY = "f7308ac663e5409bfbb10d2098cc6ab6"
        self.API_SECRET = "b098f99da8bb48f8ede29a618a3a710d"
        self.mailjet = Client(auth=(self.API_KEY, self.API_SECRET), version="v3.1")

    def send_email(self, to_email, subject, content):
        data = {
            'Messages': [
                {
                    'From': {
                        'Email': '402411681@my.richfield.ac.za',
                        'Name': 'Thozamile Madela'
                    },
                    'To': [
                        {
                            'Email': to_email,
                            'Name': 'Test'
                        }
                    ],
                    'Subject': subject,
                    'TextPart': content,
                    'HTMLPart': '<p>{}</p>'.format(content)
                }
            ]
        }

        result = self.mailjet.send.create(data=data)
        return result.status_code


# send_email(to_email="maddickinson6@gmail.com", subject="Testing Mailjet", content="This is a test email")
