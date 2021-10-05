import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

db.transaction((tx) => {
    tx.executeSql(
        "create table if not exists peoples (_id integer primary key not null, name text, lastName text, description text);"
    );
});

export { db }