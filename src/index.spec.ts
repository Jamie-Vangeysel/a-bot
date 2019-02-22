import { expect } from 'chai';
import { main, checkFile, writeFile, readFile } from './index';
import { DefaultConfig } from './app/app.config';

describe('index.js', () => {
  it('main() should exsist', () => {
    expect(main).to.exist;
  });
  it('checkFile() should exsist', () => {
    expect(checkFile).to.exist;
  });
  it('writeFile should exsist', () => {
    expect(writeFile).to.exist;
  });
  it('readFile should exsist', () => {
    expect(readFile).to.exist;
  });
  it('main() should return true', async () => {
    const result = await main();
    expect(result).to.true;
  });
  it('check file "dlkfsjdslfs.fdskfh" should be false', async () => {
    const result = await checkFile('dlkfsjdslfs.fdskfh');
    expect(result).to.be.false;
  });
  it('write file "config.json" should be true', async () => {
    const result = await writeFile('config.json', DefaultConfig);
    expect(result).to.be.true;
  });
  it('check file "config.json" should be true', async () => {
    const result = await checkFile('config.json');
    expect(result).to.be.true;
  });
  it('read file "config.json" should equal DefaultConfig', async () => {
    const result = await readFile('config.json');
    expect(JSON.stringify(result)).to.equal(JSON.stringify(DefaultConfig));
  });
});
