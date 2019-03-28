class Module:
    registered = False
    def __init__(self, id, path, location, moduleName, description):
        self.id = id
        self.path = path
        self.location = location
        self.moduleName = moduleName
        self.description = description

    def __repr__(self):
        return {
            'moduleId': self.id,
            'path': self.path,
            'location': self.location,
            'moduleName': self.moduleName,
            'description': self.description,
            'registered': self.registered
        }