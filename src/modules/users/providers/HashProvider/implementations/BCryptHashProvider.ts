import { hash, compare } from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';

export default class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    const payloadHash = await hash(payload, 8);
    return payloadHash;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    const isEqual = await compare(payload, hashed);
    return isEqual;
  }
}
