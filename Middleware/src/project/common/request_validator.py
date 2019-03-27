class RequestValidator:

    def __init__(self, request_data, required_keys):
        self.request_data = request_data
        self.request_keys = required_keys

    def has_valid_keys(self):
        for key in self.request_keys:
            if key not in self.request_data:
                return False
        return True