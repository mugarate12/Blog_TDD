const { createPasswordHash } = require('./../../src/utils/hashPassword')
const cryto = require('crypto')

describe('Check password encryption', () => {
  it('should create a valid hash for password', async () => {
    let aleatoryString = cryto.randomBytes(20).toString('hex')

    let hash = await createPasswordHash(aleatoryString)

    expect(hash).toHaveLength(60)
  });
});