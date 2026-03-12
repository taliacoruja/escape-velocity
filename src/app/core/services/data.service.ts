import { Injectable } from '@angular/core';
import data from '../../../assets/data.json';
import { Destination, CrewMember, Technology } from '../models/data.models';

@Injectable({ providedIn: 'root' })
export class DataService {
  private baseHref: string =
    document.querySelector('base')?.getAttribute('href') ?? '/';

  private resolvePaths<T>(obj: T): T {
    const str = JSON.stringify(obj);
    const resolved = str.replace(/"\//g, `"${this.baseHref}`);
    return JSON.parse(resolved);
  }

  get destinations(): Destination[] {
    return this.resolvePaths(data.destinations);
  }

  get crew(): CrewMember[] {
    return this.resolvePaths(data.crew);
  }

  get technology(): Technology[] {
    return this.resolvePaths(data.technology);
  }
}
