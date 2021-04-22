import { delay } from '../app/common/util/util';
import { sampleData } from './SampleData';

export function fetchSampleData() {
  return delay(1000).then(function () {
    return Promise.resolve(sampleData);
  });
}
