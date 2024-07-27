from cryptography.fernet import Fernet

class Encrypter:
    def __init__(self, data):
        key = Fernet.generate_key()
        cipher_suite = Fernet(key)
        try:
            # Encrypts unencoded data
            print("WORkds")
            encoded_data = data.encode()
            self.encrypted_data = cipher_suite.encrypt(encoded_data)
            self.decrypted_data = cipher_suite.decrypt(self.encrypted_data).decode()
        except AttributeError:
            # Decryptes encoded data
            self.decrypted_data = cipher_suite.decrypt(data).decode()

