class AppError extends Error {
    public statusCode: number;
  
    constructor(message: string, statusCode: number = 400) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  class NotFoundError extends AppError {
    constructor(message: string = "Not Found") {
      super(message, 404);
    }
  }
  
  class CarCreateError extends AppError {
    constructor(message: string = "Car already exists") {
      super(message, 400);
    }
  }
  
  class CarNotFoundError extends AppError {
    constructor(message: string = "Car not found") {
      super(message, 404);
    }
  }
  
  class DriverCreateError extends AppError {
    constructor(message: string = "Driver already exists") {
      super(message, 501);
    }
  }
  
  class DriverAlreadyUsingError extends AppError {
    constructor(message: string = "The driver is already using another car") {
      super(message, 400);
    }
  }
  
  const handleAppError = (error: AppError, request: any, response: any, next: any) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ message: error.message });
    }
    return response.status(500).json({
      message: "Internal server error",
    });
  };
  
  export {
    AppError,
    NotFoundError,
    CarCreateError,
    CarNotFoundError,
    DriverCreateError,
    DriverAlreadyUsingError,
    handleAppError,
  };
  