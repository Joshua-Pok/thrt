import { unstable_noStore as noStore } from 'next/cache';
export const isLocalDevelopment = process.env.NODE_ENV === 'development';


export default function getEnv(name: string) {
  noStore();
  return process.env[name];
}