import { ConnectorModule } from './connector.module';

describe('ConnectorModule', () => {
  let connectorModule: ConnectorModule;

  beforeEach(() => {
    connectorModule = new ConnectorModule();
  });

  it('should create an instance', () => {
    expect(connectorModule).toBeTruthy();
  });
});
