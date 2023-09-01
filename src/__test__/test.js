import getLevel from '../getLevel';
import fetchData from '../http';

jest.mock('../http');

beforeEach(() => {
  jest.resetAllMocks();
});

test('call function fetchData', () => {
  fetchData.mockReturnValue({});
  getLevel(1);
  expect(fetchData).toBeCalledWith('https://server/user/1');
});

test.each([
  ['ok', 1, 'Ваш текущий уровень: 1'],
  ['no', NaN, 'Информация об уровне временно недоступна'],
])('call function getLevel with %s status', (status, level, expected) => {
  fetchData.mockReturnValue({ status, level });
  expect(getLevel(1)).toBe(expected);
});
