class Response:

    def __init__(self, status=200, data=None, error=None):
        self.status = status
        self.data = data
        self.error = error

    def __repr__(self):
        return {
            'status': self.status,
            'data': self.data,
            'error': self.error
        }