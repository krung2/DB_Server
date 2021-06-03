import 'dotenv/config';

const getValue = (key: string): string => {
  const value = process.env[key];

  if (value === undefined) {
    const errMessage = `${key} enviroment must be defined`;

    throw new Error(errMessage);
  }

  return value;
};

export const PORT = getValue('PORT');

export const DATABASE = {
  HOST: getValue('DATABASE_HOST'),
  DBPORT: Number(getValue('DATABASE_PORT')),
  USERNAME: getValue('DATABASE_USERNAME'),
  PASSWORD: getValue('DATABASE_PASSWORD'),
  DATABASENAME: getValue('DATABASE_DATABASE_NAME'),
};