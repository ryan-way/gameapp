import { Log } from '../../src/service/logging';
import { mock, instance, when, anything } from 'ts-mockito';

const mockedLog = mock(Log);
when(mockedLog.Info(anything())).thenCall(() => console.log('something'));
const log = instance(mock(Log));

export { log };
