import { reroute } from './navigation/reroute'
export let started = false;
export function start() {
  started = true;
  reroute();
}