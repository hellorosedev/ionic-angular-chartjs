import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public getLocalData = async (key: string): Promise<any> => {
    const { value } = await Storage.get({ key });
    return value ? JSON.parse(value) : null;
  };

  public clearLocalData = async (key: string): Promise<any> => {
    await Storage.remove({ key });
  };

  public setLocalData = async (key: string, value: any): Promise<any> => {
    await Storage.set({
      key: key,
      value: JSON.stringify(value)
    });
  };


}
