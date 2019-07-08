import { fetch } from 'cross-fetch';
import { iHomeApi, iHomeClimateResponse, iHomeDoorResponse, iHomeLightResponse, iHomeCameraResponse, iHomeAirConditionerResponse, iHomeHeaterResponse, iHomeLocationResponse } from './models/home';
const url = 'https://home.myskynet.cc/api/';

export const HomeApi: iHomeApi = {
  async getClimate(id: number): Promise<iHomeClimateResponse> {
    return fetch(`${url}climates/${id}`).then<iHomeClimateResponse>(r => r.json());
  },
  async getDoor(id: number): Promise<iHomeDoorResponse> {
    return fetch(`${url}doors/${id}`).then<iHomeDoorResponse>(r => r.json());
  },
  async getLight(id: number): Promise<iHomeLightResponse> {
    return fetch(`${url}lights/${id}`).then<iHomeLightResponse>(r => r.json());
  },
  async getCamera(id: number): Promise<iHomeCameraResponse> {
    return fetch(`${url}cameras/${id}`).then<iHomeCameraResponse>(r => r.json());
  },
  async getAirConditioner(id: number): Promise<iHomeAirConditionerResponse> {
    return fetch(`${url}airconditioners/${id}`).then<iHomeAirConditionerResponse>(r => r.json());
  },
  async getHeater(id: number): Promise<iHomeHeaterResponse> {
    return fetch(`${url}heaters/${id}`).then<iHomeHeaterResponse>(r => r.json());
  },
  async getLocation(id: number): Promise<iHomeLocationResponse> {
    return fetch(`${url}locations/${id}`).then<iHomeLocationResponse>(r => r.json());
  }
}
