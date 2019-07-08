export interface iHomeApi {
  getClimate(id: number): Promise<iHomeClimateResponse>;
  getDoor(id: number): Promise<iHomeDoorResponse>;
  getLight(id: number): Promise<iHomeLightResponse>;
  getCamera(id: number): Promise<iHomeCameraResponse>;
  getAirConditioner(id: number): Promise<iHomeAirConditionerResponse>;
  getHeater(id: number): Promise<iHomeHeaterResponse>;
  getLocation(id: number): Promise<iHomeLocationResponse>;
}

export interface iHomeResponse {
  saveEnabled: boolean;
  editEnabled: boolean;
}

export interface iHomeClimateResponse extends iHomeResponse {
  climate: iHomeClimate
}

export interface iHomeDoorResponse extends iHomeResponse {
  door: iHomeDoor,
}

export interface iHomeLightResponse extends iHomeResponse {
  light: iHomeLight
}

export interface iHomeCameraResponse extends iHomeResponse {
  camera: iHomeCamera
}

export interface iHomeAirConditionerResponse extends iHomeResponse {
  airconditioner: iHomeAirConditioner
}

export interface iHomeHeaterResponse extends iHomeResponse {
  heater: iHomeHeater
}

export interface iHomeLocationResponse extends iHomeResponse {
  location: iHomeLocation
}

export interface iHomeLocation {
  id: number;
  owner: number;
  name: string;
}

export interface iHomeClimate {
  id: number;
  location: number;
  name: string;
  temperature: number;
  pressure: number;
  humidity: number;
  altitude: number;
  quality: number;
  time: Date;
}

export interface iHomeDoor {
  id: number;
  location: number;
  name: string;
  powerState: 'locked' | 'unlocked';
  time: Date;
}

export interface iHomeLight {
  id: number;
  location: number;
  name: string;
  brightness: number;
  powerState: 'on' | 'off';
  type: 'white' | 'whitem' | 'color';
  color: string;
  time: Date;
}

export interface iHomeCamera {
  id: number;
  location: number;
  name: string;
  powerState: 'on' | 'off';
  time: Date;
}

export interface iHomeAirConditioner {
  id: number;
  location: number;
  name: string;
  temperature: number;
  powerState: 'on' | 'off';
  time: Date;
}

export interface iHomeHeater {
  id: number;
  location: number;
  name: string;
  powerUsage: number;
  powerState: 'on' | 'off';
  time: Date;
}