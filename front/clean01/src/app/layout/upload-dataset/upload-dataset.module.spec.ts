import { UploadDatasetModule } from './upload-dataset.module';

describe('UploadDatasetModule', () => {
  let uploadDatasetModule: UploadDatasetModule;

  beforeEach(() => {
    uploadDatasetModule = new UploadDatasetModule();
  });

  it('should create an instance', () => {
    expect(uploadDatasetModule).toBeTruthy();
  });
});
