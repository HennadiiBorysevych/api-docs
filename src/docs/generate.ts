import { writeFileSync } from 'fs';
import { generateSpec } from './registry';

const spec = generateSpec();
writeFileSync('openapi.json', JSON.stringify(spec, null, 2));
console.log('openapi.json generated');
