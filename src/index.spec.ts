import { expect } from 'chai';
import main from './index';
import { DefaultConfig } from './app/app.config';
import { FileSystem } from './app/filesystem';

describe('index.js', () => {
  const fs = new FileSystem();
  it('main() should exsist', () => {
    expect(main).to.exist;
  });
  it('checkFile() should exsist', () => {
    expect(fs.exists).to.exist;
  });
  it('writeFile should exsist', () => {
    expect(fs.writeFile).to.exist;
  });
  it('writeAppendFile should exsist', () => {
    expect(fs.writeAppendFile).to.exist;
  });
  it('readFile should exsist', () => {
    expect(fs.readFile).to.exist;
  });
  it('delete should exsist', () => {
    expect(fs.delete).to.exist;
  });
  it('main() should return true', async () => {
    const result = await main();
    expect(result).to.true;
  });
  it('check file "dlkfsjdslfs.fdskfh" should be false', async () => {
    const result = await fs.exists('dlkfsjdslfs.fdskfh');
    expect(result).to.be.false;
  });
  it('write file "myconfigTest.json" should be true', async () => {
    const result = await fs.writeFile('myconfigTest.json', Buffer.from(JSON.stringify(DefaultConfig)));
    expect(result).to.be.true;
  });
  it('check file "myconfigTest.json" should be true', async () => {
    const result = await fs.exists('myconfigTest.json');
    expect(result).to.be.true;
  });
  it('read file "myconfigTest.json" should equal DefaultConfig', async () => {
    const result = await fs.readFile('myconfigTest.json');
    expect(result.toString()).to.equal(JSON.stringify(DefaultConfig));
  });
  it('delete file "myconfigTest.json" should equal true', async () => {
    const result = await fs.delete('myconfigTest.json');
    expect(result).to.be.true;
  });
});
