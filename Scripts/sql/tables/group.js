 export const CreateGroupTable=`
 CREATE TABLE IF NOT EXISTS groups(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 group_name TEXT NOT NULL,
 created_by INTEGER NOT NULL,
 craeted_at DATETIME DEFAULT CURRENT,
 FOREIGN KEY (created_by) REFERENCES users(id)
 )
 `