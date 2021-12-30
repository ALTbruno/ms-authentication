import { Pool } from "pg";

const connectionString = ''; //COLOQUE O LINK DO SEU BANCO DE DADOS AQUI

const db = new Pool({connectionString});

export default db;