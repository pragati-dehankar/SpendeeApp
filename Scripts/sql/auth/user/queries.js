
export const CREATE_USER=`
INSERT INTO users
(name,email,phone,password)
 VALUES(? ,? ,? ,? )
`;

export const GET_USER=`
SELECT id,name,email,phone from users
WHERE id=?
`

export const GET_USER_BY_EMAIL = `
SELECT id,name,email,phone,password 
FROM users 
WHERE email=?
`;
