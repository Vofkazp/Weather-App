export interface TemperatureContextType {
  tempMode: boolean;
  weatherData: any; // Можно заменить на точный тип, если знаешь структуру
  getStateWeatherData: (cityVal: string) => Promise<void>;
  stateWeatherData: any; // Тоже лучше типизировать
  fetchError: boolean;
}