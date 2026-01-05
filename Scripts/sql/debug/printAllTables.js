import Connection from "../connection";

export const printAllTables = async () => {
  const db = await Connection.getConnection();
  const tables = [
    "users",
    "groups",
    "group_members",
    "expenses",
    "expense_splits",
    "payments",
    "activities",
  ];

  for (const table of tables) {
    const rows = await db.getAllAsync(`SELECT * FROM ${table}`);
    console.log(`\n📦 TABLE: ${table}`);
    console.log(rows);
  }
};
