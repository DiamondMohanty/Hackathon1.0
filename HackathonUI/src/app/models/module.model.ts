export interface ModuleData {
    moduleId: number;
    path: string;
    location: string;
    moduleName: string;
    rootComponent?: string;
    description: string;
    registered?: boolean;
}