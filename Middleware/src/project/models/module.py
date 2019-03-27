class Module:
    registered = False
    def __init__(self, path, location, moduleName, description):
        self.path = path
        self.location = location
        self.moduleName = moduleName
        self.description = description

    def __repr__(self):
        return {
            'path': self.path,
            'location': self.location,
            'moduleName': self.moduleName,
            'description': self.description,
            'registered': self.registered
        }