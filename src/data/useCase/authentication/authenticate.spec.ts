import Authenticate from './authenticate';
import {DataAccountTypesRes} from '../../interfaces';
import Compare from '../../../infra/criptography/bcrypt.adapter';

import Error from '../../../domain/protocols/errors/ProcessError';

const token = () => {
  class Token {
    async loadToken(data: string) : Promise<string > {
      return '34242342342423523';
    }
  }

  return new Token;
};

const dbRepo = () => {
  class DBrepo {
    getOfDb(email: string): Promise<DataAccountTypesRes> {
      return Promise.resolve({
        id: 10,
        name: 'lucas',
        email: 'lucas@gmail.com',
        password: '222',
      });
    }
  }
  return new DBrepo;
};
const makeAuthenticate = () => {
  const tokenGenerator = token();
  const compare = new Compare;
  const dbrepo = dbRepo();
  const authenticate = new Authenticate(dbrepo, tokenGenerator, compare);
  return {
    authenticate,
    dbrepo,
    tokenGenerator,
  };
};

describe('authenticate', () => {
  test('should with correct data ', async () => {
    const {authenticate} = makeAuthenticate();
    const data = {
      email: 'lucas@gmail',
      password: '1234',
    };
    const spy = spyOn(authenticate, 'auth');
    await authenticate.auth(data.email, data.password);
    expect(spy).toHaveBeenCalledWith(data.email, data.password);
  });
  test('should return error if  password not combine', async () => {
    const {authenticate} = makeAuthenticate();
    const data = {
      email: 'lucas@gmail',
      password: '2222',
    };

    const res = await authenticate.auth(data.email, data.password);
    expect(res).toEqual(new Error().return(' Invalid email/password'));
  });


  test('should return a token', async () => {
    const {authenticate} = makeAuthenticate();
    const data = {
      email: 'lucas@gmail',
      password: '2222',
    };

    const res = await authenticate.auth(data.email, data.password);
    expect(res).toEqual(new Error().return(' Invalid email/password'));
  });

  test('Ensure loadToken be called with correct data', async () => {
    const {authenticate, tokenGenerator} = makeAuthenticate();

    const spy = jest.spyOn(tokenGenerator, 'loadToken');
    const data = {
      email: 'lucas@gmail',
      password: '222',
    };

    await authenticate.auth(data.email, data.password);
    expect(spy).toHaveBeenCalledWith({
      id: 10,
      name: 'lucas',
      email: 'lucas@gmail.com',
      password: '222',
    });
  });
});