import listings from '../../db/listing';

describe('DB: getSimilarListingsAsync()', () => {
  const originals = { listings: {} };
  originals.listings.find = listings.find;
  listings.find = jest.fn(() => [{ similarListings: 'foo' }]);

  afterEach(() => {
    listings.find.mockClear();
  });

  afterAll(() => {
    listings.find = originals.listings.find;
  });

  it('should call .find()', async () => {
    await listings.getSimilarListingsAsync(2);
    expect(listings.find).toHaveBeenCalled();
  });

  it('should filter by the correct id', async () => {
    await listings.getSimilarListingsAsync(2);
    const expectedArgs = [{ id: 2 }];
    const expectedCalls = [expectedArgs];

    expect(listings.find.mock.calls).toEqual(expectedCalls);
  });
});
