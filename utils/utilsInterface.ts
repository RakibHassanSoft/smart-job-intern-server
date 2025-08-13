export interface ResponseOptions<T = any> {
  statusCode?: number;  
  message: string;      
  data?: T;             
  success?: boolean;    
}

export interface EnvVariables {
  jwtSecret: string;
  port: string;
  dbUri: string;
  salt: string;
  jwrtRefreshSecret?: string; 
}
