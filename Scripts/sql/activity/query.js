export const CREATE_NEW_ACTIVITY_QUERY=`
INSERT INTO activities (activity,user_id)
VALUES(?, ?)
`

export const GET_ACTIVITY_OF_USER = `
SELECT *
FROM activities
WHERE user_id = ?
ORDER BY created_at DESC
`;