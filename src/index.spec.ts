import { expect } from 'chai';
import main from './index';
import { DefaultConfig } from './app/app.config';
import { FileSystem } from './app/filesystem';
import { HomeApi } from './app/api/api.home';
import { Api } from './app/api/api';

describe('index.js', () => {
  const fs = new FileSystem();
  let mBot;
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
  // it('main() should return true', async () => {
  //   mBot = await main();
  //   expect(mBot).to.true;
  // });
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
  it('Api to initialize new truthy object', async () => {
    const api = new Api();
    expect(api).to.exist;
    expect(api).is.not.null.and.is.not.undefined;
  });
  it('Api\'s to exists', async () => {
    const api = new Api();
    expect(api.cravatar, 'cravatar api').to.exist;
    expect(api.home, 'home api').to.exist;
    expect(api.youtube, 'youtube api').to.exist;
    expect(api.mojang, 'mojang api').to.exist;
  });
  it('api.mojang.getuuid() to return valid uuid for user \'Simplintho\'', async () => {
    const uuid = await new Api().mojang.getuuid('Simplintho').then(r => r.id);
    expect(uuid).to.not.be.empty;
    expect(uuid).to.not.be.undefined;
    expect(uuid).to.be.length(32);
  });
  it('api.home.getClimate() to return valid climate data', async () => {
    const climate = await new Api().home.getClimate(1).then(r => r.climate);
    expect(climate.temperature).not.to.be.null;
    expect(climate.humidity).not.to.be.null;
    expect(climate.pressure).not.to.be.null;
    expect(climate.altitude).not.to.be.null;
  });
});
