import { h } from 'preact';

export default function Schedule({ schedule }) {
  return <pre>{JSON.stringify(schedule, null, 2)}</pre>;
}
