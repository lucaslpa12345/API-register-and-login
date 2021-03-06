import LoginController from '../../../presentation/controllers/LogInController/LoginController';
import Auth from '../../../data/useCase/authentication/authenticate';
import {SqliteAccountRepo} from '../../../infra/db/sqlite/accountRepo/sqliteAccountRepo';
import {LoadToken} from '../../../infra/token/jwtokenLoadTokenAdapter';
import {Querys} from '../../../infra/db/Querys/typeOrmQuerysAccount';
import Entity from '../../../infra/db/sqlite/database/entity/Accounts.entity';
import {Encrytp} from '../../../infra/criptography/bcrypt.adapter';
import {loginValidatioComposite} from '../validatorsComposite/login-valiation-composite';
require('dotenv').config();
import s from '../../../../.authenticateKey';

export default function LoginFactory() {
  const secretKey = s;
  const compare = new Encrytp;
  const typeormrequire = new Querys(Entity);
  const token = new LoadToken(secretKey);
  const dbrepo = new SqliteAccountRepo(typeormrequire);
  const auth = new Auth(dbrepo, token, compare);
  return new LoginController(loginValidatioComposite(), auth);
}
