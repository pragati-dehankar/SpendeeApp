
export const CREATE_USER=`
INSERT INTO users
(name,email,phone,password)
 VALUES(? ,? ,? ,? )
`;

export const GET_USER=`
SELECT * from users
WHERE id=?
`