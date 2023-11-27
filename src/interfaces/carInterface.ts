export interface ICreateCarData {
    licenseplate: string;
    color: string;
    brand: string;
    model: string;
    year?: number;
  }
  
export interface ICarReturn {
    id: number;
    licenseplate: string;
    color: string;
    brand: string;
    model: string;
    year: number;
  }

export interface IUpdateCarData {
    licenseplate?: string;
    color?: string;
    brand?: string;
    model?: string;
    year?: number;
  }